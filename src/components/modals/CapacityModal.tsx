
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CapacityModalProps {
  isOpen: boolean;
  onClose: () => void;
  capacity: string;
  onSave: (capacity: string) => void;
}

const CapacityModal = ({ isOpen, onClose, capacity, onSave }: CapacityModalProps) => {
  const [currentCapacity, setCurrentCapacity] = useState(capacity);

  const handleSave = () => {
    onSave(currentCapacity);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md" style={{ backgroundColor: '#040A1A' }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Definir Capacidade</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-white">Número máximo de participantes</Label>
            <Input
              id="capacity"
              type="number"
              value={currentCapacity}
              onChange={(e) => setCurrentCapacity(e.target.value)}
              placeholder="Ex: 100"
              className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
            />
            <p className="text-sm text-gray-300">
              Deixe em branco para capacidade ilimitada
            </p>
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
            Concluído
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CapacityModal;
