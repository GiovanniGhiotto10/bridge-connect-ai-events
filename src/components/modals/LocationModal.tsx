
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
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md" style={{ backgroundColor: '#040A1A' }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="locationInput" className="text-white">{getLabel()}</Label>
            <Input
              id="locationInput"
              type="text"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder={getPlaceholder()}
              className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
            />
          </div>
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

export default LocationModal;
