
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onSave: (description: string) => void;
}

const DescriptionModal = ({ isOpen, onClose, description, onSave }: DescriptionModalProps) => {
  const [currentDescription, setCurrentDescription] = useState(description);

  const handleSave = () => {
    onSave(currentDescription);
  };

  const handleAISuggestion = () => {
    const aiSuggestion = "Este evento proporcionará uma experiência única de networking e aprendizado, conectando profissionais e entusiastas em um ambiente colaborativo e inspirador. Prepare-se para discussões enriquecedoras, apresentações inovadoras e oportunidades de crescimento pessoal e profissional.";
    setCurrentDescription(aiSuggestion);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Descrição do Evento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Descreva seu evento, objetivos, agenda e o que os participantes podem esperar..."
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            className="min-h-[200px] bg-gray-800 border-gray-600 text-white resize-none"
          />

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleAISuggestion}
              className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Sugerir com IA
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} className="text-white border-gray-600">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                Concluído
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionModal;
