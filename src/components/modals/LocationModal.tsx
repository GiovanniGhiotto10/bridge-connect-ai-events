
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: {
    location: string;
    city: string;
    address: string;
  };
  locationType: 'location' | 'city' | 'address';
  onSave: (field: string, value: string) => void;
}

const LocationModal = ({ isOpen, onClose, eventData, locationType, onSave }: LocationModalProps) => {
  const getInitialValue = () => {
    switch (locationType) {
      case 'location': return eventData.location;
      case 'city': return eventData.city;
      case 'address': return eventData.address;
      default: return '';
    }
  };

  const [currentValue, setCurrentValue] = useState(getInitialValue());

  const getTitle = () => {
    switch (locationType) {
      case 'location': return 'Definir Localização';
      case 'city': return 'Definir Cidade';
      case 'address': return 'Definir Endereço';
      default: return 'Definir Localização';
    }
  };

  const getLabel = () => {
    switch (locationType) {
      case 'location': return 'Nome do local ou link virtual';
      case 'city': return 'Cidade do evento';
      case 'address': return 'Endereço completo (opcional)';
      default: return 'Localização';
    }
  };

  const getPlaceholder = () => {
    switch (locationType) {
      case 'location': return 'Ex: Centro de Convenções ou https://meet.google.com';
      case 'city': return 'Ex: São Paulo';
      case 'address': return 'Ex: Rua das Flores, 123 - Centro';
      default: return '';
    }
  };

  const handleSave = () => {
    onSave(locationType, currentValue);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="locationValue" className="text-white">{getLabel()}</Label>
            <Input
              id="locationValue"
              type="text"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder={getPlaceholder()}
              className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
