
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface TicketBatch {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  batches: TicketBatch[];
  onSave: (batches: TicketBatch[]) => void;
}

const BatchModal = ({ isOpen, onClose, batches, onSave }: BatchModalProps) => {
  const [currentBatches, setCurrentBatches] = useState<TicketBatch[]>(
    batches.length > 0 ? batches : [{
      id: '1',
      name: 'Lote 1',
      quantity: 0,
      price: 0
    }]
  );

  const addNewBatch = () => {
    const newBatch: TicketBatch = {
      id: (currentBatches.length + 1).toString(),
      name: `Lote ${currentBatches.length + 1}`,
      quantity: 0,
      price: 0
    };
    setCurrentBatches([...currentBatches, newBatch]);
  };

  const removeBatch = (id: string) => {
    if (currentBatches.length > 1) {
      setCurrentBatches(currentBatches.filter(batch => batch.id !== id));
    }
  };

  const updateBatch = (id: string, field: keyof TicketBatch, value: string | number) => {
    setCurrentBatches(currentBatches.map(batch => 
      batch.id === id ? { ...batch, [field]: value } : batch
    ));
  };

  const handleSave = () => {
    onSave(currentBatches);
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    return numericValue;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Configurar Lotes de Ingressos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {currentBatches.map((batch, index) => (
            <div key={batch.id} className="p-4 border border-gray-600 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{batch.name}</h3>
                {currentBatches.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeBatch(batch.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Quantidade</Label>
                  <Input
                    type="number"
                    value={batch.quantity}
                    onChange={(e) => updateBatch(batch.id, 'quantity', parseInt(e.target.value) || 0)}
                    placeholder="Ex: 100"
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Valor (R$)</Label>
                  <Input
                    type="text"
                    value={batch.price}
                    onChange={(e) => updateBatch(batch.id, 'price', parseFloat(formatCurrency(e.target.value)) || 0)}
                    placeholder="Ex: 50,00"
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={addNewBatch}
            variant="outline"
            className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar novo lote
          </Button>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Salvar Lotes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BatchModal;
