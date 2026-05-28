import React, { createContext, useContext, useState, useEffect } from "react";
import { InventoryItem, RentalPack, RentalRequest } from "../lib/content-store";
import { toast } from "sonner";
import { useEditor } from "./EditorContext";

export type CartItem = (InventoryItem | RentalPack) & { quantity: number; isPack?: boolean };

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: InventoryItem | RentalPack, isPack?: boolean) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  submitQuote: (form: { name: string; email: string; phone: string; eventDate: string; message: string }) => void;
  cancelLastRequest: () => Promise<void>;
  isSubmitted: boolean;
  lastRequestId: string | null;
  setIsSubmitted: (val: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastRequestId, setLastRequestId] = useState<string | null>(null);
  const { content, updateContent, saveChanges } = useEditor();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("dds_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("dds_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: InventoryItem | RentalPack, isPack = false) => {
    const existingItem = cart.find((i) => i.id === item.id);
    
    // Check stock for individual items
    if (!isPack) {
      const invItem = item as InventoryItem;
      const currentInCart = existingItem?.quantity || 0;
      if (currentInCart >= invItem.stock) {
        toast.error(`Stock insuffisant pour ${item.name} (${invItem.stock} max)`);
        return;
      }
    }

    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1, isPack }]);
    }
    toast.success(`${item.name} ajouté au devis`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id && delta > 0 && !item.isPack) {
            const invItem = content.inventory?.find(i => i.id === id);
            if (invItem && item.quantity + delta > invItem.stock) {
              toast.error(`Stock insuffisant (${invItem.stock} max)`);
              return item;
            }
          }
          return item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("Article retiré du devis");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("dds_cart");
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const submitQuote = async (form: { name: string; email: string; phone: string; eventDate: string; message: string }) => {
    if (cart.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    const newRequest: RentalRequest = {
      id: `req-${Date.now()}`,
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      eventDate: form.eventDate,
      message: form.message,
      status: "En attente",
      totalPrice: getTotalPrice(),
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: new Date().toLocaleDateString("fr-FR"),
    };

    // Update inventory stock
    let updatedInventory = [...(content.inventory || [])];
    
    cart.forEach(cartItem => {
      if (cartItem.isPack) {
        const pack = cartItem as RentalPack;
        pack.items.forEach(packItem => {
          const invItemIndex = updatedInventory.findIndex(i => i.id === packItem.equipmentId);
          if (invItemIndex !== -1) {
            const invItem = { ...updatedInventory[invItemIndex] };
            invItem.stock = Math.max(0, invItem.stock - (packItem.quantity * cartItem.quantity));
            if (invItem.stock === 0) {
              invItem.status = "Indisponible";
            }
            updatedInventory[invItemIndex] = invItem;
          }
        });
      } else {
        const invItemIndex = updatedInventory.findIndex(i => i.id === cartItem.id);
        if (invItemIndex !== -1) {
          const invItem = { ...updatedInventory[invItemIndex] };
          invItem.stock = Math.max(0, invItem.stock - cartItem.quantity);
          if (invItem.stock === 0) {
            invItem.status = "Indisponible";
          }
          updatedInventory[invItemIndex] = invItem;
        }
      }
    });

    const currentRequests = content.rentalRequests || [];
    const updatedContent = {
      ...content,
      inventory: updatedInventory,
      rentalRequests: [newRequest, ...currentRequests]
    };
    
    // 1. On attend impérativement que la sauvegarde soit confirmée
    await saveChanges(updatedContent);
    setLastRequestId(newRequest.id);

    // 2. On prépare le mail
    const rentalEmail = content.settings.rental.rentalEmail || content.settings.contact.email;
    const subject = encodeURIComponent(`Demande de devis - ${form.name}`);
    const itemsList = cart.map(item => `- ${item.name} (x${item.quantity}) : ${item.price * item.quantity}€`).join('\n');
    const body = encodeURIComponent(
      `Bonjour,\n\n` +
      `Une nouvelle demande de devis a été effectuée sur le site :\n\n` +
      `Client : ${form.name}\n` +
      `Email : ${form.email}\n` +
      `Téléphone : ${form.phone || 'Non renseigné'}\n` +
      `Date de l'événement : ${form.eventDate}\n\n` +
      `Articles demandés :\n${itemsList}\n\n` +
      `Total estimé : ${getTotalPrice()}€\n\n` +
      `Message du client :\n${form.message || 'Aucun message'}\n\n` +
      `Cordialement,\nLe site Dons Du Son`
    );

    // 3. On ouvre le mail dans une fenêtre séparée pour ne pas bloquer le site
    window.open(`mailto:${rentalEmail}?subject=${subject}&body=${body}`, '_blank');

    // 4. On confirme le succès visuellement sur la page
    setIsSubmitted(true);
    clearCart();
  };

  const cancelLastRequest = async () => {
    if (!lastRequestId) return;

    if (window.confirm("Voulez-vous vraiment annuler votre demande de devis ?")) {
      const currentRequests = content.rentalRequests || [];
      const updatedRequests = currentRequests.filter(r => r.id !== lastRequestId);
      const updatedContent = updateContent("rentalRequests", updatedRequests);
      
      try {
        await saveChanges(updatedContent);
        setLastRequestId(null);
        setIsSubmitted(false);
        toast.info("Demande annulée avec succès");
      } catch (e) {
        toast.error("Erreur lors de l'annulation");
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        submitQuote,
        cancelLastRequest,
        isSubmitted,
        lastRequestId,
        setIsSubmitted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
