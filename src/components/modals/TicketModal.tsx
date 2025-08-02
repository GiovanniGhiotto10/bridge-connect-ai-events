
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFree: boolean;
  ticketPrice: number;
  onSave: (isFree: boolean, ticketPrice: number) => void;
}

const TicketModal = ({ isOpen, onClose, isFree, ticketPrice, onSave }: TicketModalProps) => {
  const [selectedType, setSelectedType] = useState<'free' | 'paid'>(isFree ? 'free' : 'paid');
  const [price, setPrice] = useState(ticketPrice.toString());

  const handleSave = () => {
    const isEventFree = selectedType === 'free';
    const eventPrice = isEventFree ? 0 : parseFloat(price) || 0;
    onSave(isEventFree, eventPrice);
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    return numericValue;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md" style={{ backgroundColor: '#040A1A' }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Configurar Ingressos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Free Option */}
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedType === 'free' 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => setSelectedType('free')}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedType === 'free' ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
              }`} />
              <div>
                <p className="font-medium text-white">Gratuito</p>
                <p className="text-sm text-gray-300">Evento sem cobrança de ingresso</p>
              </div>
            </div>
          </div>

          {/* Paid Option */}
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedType === 'paid' 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => setSelectedType('paid')}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedType === 'paid' ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-white">Pago</p>
                <p className="text-sm text-gray-300">Definir valor do ingresso</p>
              </div>
            </div>
          </div>

          {/* Price Input - Only visible when paid is selected */}
          {selectedType === 'paid' && (
            <div className="space-y-2 ml-7">
              <Label htmlFor="price" className="text-white">Valor do Ingresso</Label>
              <div className="flex items-center gap-2">
                <span className="text-white">R$</span>
                <Input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(formatCurrency(e.target.value))}
                  placeholder="50,00"
                  className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
