import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { RentalRequest } from '../../../lib/content-store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Package, Calendar, User, Mail, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminRentals() {
  const { content, updateContent } = useEditor();

  const updateStatus = (id: string, newStatus: RentalRequest['status']) => {
    const newRequests = content.rentalRequests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    updateContent('rentalRequests', newRequests);
    toast.success(`Statut mis à jour : ${newStatus}`);
  };

  const getStatusColor = (status: RentalRequest['status']) => {
    switch (status) {
      case 'En attente': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Validé': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Refusé': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Demandes de Location</h1>
        <p className="text-gray-400">Gérez les demandes de devis et les réservations de matériel.</p>
      </div>

      <div className="grid gap-6">
        {content.rentalRequests.length === 0 ? (
          <Card className="bg-[#1a1a1a] border-gray-800 p-12 text-center">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucune demande de location pour le moment.</p>
          </Card>
        ) : (
          content.rentalRequests.map((request) => (
            <Card key={request.id} className="bg-[#1a1a1a] border-gray-800 overflow-hidden">
              <CardHeader className="border-b border-gray-800 bg-[#262626]/50 flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8C0343]/20 flex items-center justify-center text-[#F29F05]">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Commande #{request.id}</CardTitle>
                    <p className="text-xs text-gray-500">Reçue le {request.createdAt}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4 text-[#F29F05]" /> Client
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-white font-medium">{request.customerName}</p>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-3.5 h-3.5" /> {request.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone className="w-3.5 h-3.5" /> {request.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-3.5 h-3.5" /> Événement : {request.eventDate}
                      </div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#F29F05]" /> Matériel
                    </h4>
                    <div className="bg-[#262626] rounded-lg p-4 space-y-2">
                      {request.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-300">{item.quantity}x {item.name}</span>
                          <span className="text-white font-medium">{item.price * item.quantity}€</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gray-700 flex justify-between font-bold">
                        <span className="text-white">Total Estimé</span>
                        <span className="text-[#F29F05]">{request.totalPrice}€</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-800">
                  {request.status === 'En attente' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => updateStatus(request.id, 'Refusé')}
                        className="border-red-900/50 text-red-400 hover:bg-red-900/10 hover:text-red-300"
                      >
                        <XCircle className="w-4 h-4 mr-2" /> Refuser
                      </Button>
                      <Button
                        onClick={() => updateStatus(request.id, 'Validé')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" /> Valider le devis
                      </Button>
                    </>
                  )}
                  {request.status !== 'En attente' && (
                    <Button
                      variant="outline"
                      onClick={() => updateStatus(request.id, 'En attente')}
                      className="border-gray-700 text-gray-400 hover:bg-gray-800"
                    >
                      Remettre en attente
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
