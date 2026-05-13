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
  isSubmitted: boolean;
  setIsSubmitted: (val: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
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

    const currentRequests = content.rentalRequests || [];
    const updatedContent = updateContent("rentalRequests", [newRequest, ...currentRequests]);
    
    // 1. On attend impérativement que la sauvegarde soit confirmée
    await saveChanges(updatedContent);

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
        isSubmitted,
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
