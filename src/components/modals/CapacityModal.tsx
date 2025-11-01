
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
      <DialogContent className="bg-white border-gray-300 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Definir Capacidade</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-foreground">Número máximo de participantes</Label>
            <Input
              id="capacity"
              type="number"
              value={currentCapacity}
              onChange={(e) => setCurrentCapacity(e.target.value)}
              placeholder="Ex: 100"
              className="bg-white border-gray-300 text-foreground focus:border-primary"
            />
            <p className="text-sm text-muted-foreground">
              Deixe em branco para capacidade ilimitada
            </p>
          </div>
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
            Concluído
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CapacityModal;
