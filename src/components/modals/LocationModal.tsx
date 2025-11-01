
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "location" | "city";
  value: string;
  onSave: (value: string) => void;
}

const LocationModal = ({ isOpen, onClose, type, value, onSave }: LocationModalProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    onSave(currentValue);
  };

  const getTitle = () => {
    return type === 'location' ? 'Local do Evento' : 'Cidade do Evento';
  };

  const getLabel = () => {
    return type === 'location' 
      ? 'Nome do espaço ou link virtual' 
      : 'Cidade onde o evento acontece';
  };

  const getPlaceholder = () => {
    return type === 'location' 
      ? 'Ex: Centro de Convenções São Paulo ou https://meet.google.com/abc-def-ghi' 
      : 'Ex: São Paulo';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-gray-300 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="locationInput" className="text-foreground">{getLabel()}</Label>
            <Input
              id="locationInput"
              type="text"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder={getPlaceholder()}
              className="bg-white border-gray-300 text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-gray-300 hover:bg-gray-100 hover:text-foreground"
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

export default LocationModal;
