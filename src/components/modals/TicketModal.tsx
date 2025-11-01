
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
      <DialogContent className="bg-white border-gray-300 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Configurar Ingressos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Free Option */}
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedType === 'free' 
                ? 'border-primary bg-primary/10' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setSelectedType('free')}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedType === 'free' ? 'bg-primary border-primary' : 'border-gray-400'
              }`} />
              <div>
                <p className="font-medium text-foreground">Gratuito</p>
                <p className="text-sm text-muted-foreground">Evento sem cobrança de ingresso</p>
              </div>
            </div>
          </div>

          {/* Paid Option */}
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedType === 'paid' 
                ? 'border-primary bg-primary/10' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setSelectedType('paid')}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedType === 'paid' ? 'bg-primary border-primary' : 'border-gray-400'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-foreground">Pago</p>
                <p className="text-sm text-muted-foreground">Definir valor do ingresso</p>
              </div>
            </div>
          </div>

          {/* Price Input - Only visible when paid is selected */}
          {selectedType === 'paid' && (
            <div className="space-y-2 ml-7">
              <Label htmlFor="price" className="text-foreground">Valor do Ingresso</Label>
              <div className="flex items-center gap-2">
                <span className="text-foreground">R$</span>
                <Input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(formatCurrency(e.target.value))}
                  placeholder="50,00"
                  className="bg-white border-gray-300 text-foreground focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
