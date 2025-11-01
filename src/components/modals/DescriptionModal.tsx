
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
      <DialogContent className="max-w-2xl bg-white border-gray-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Descrição do Evento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Descreva seu evento, objetivos, agenda e o que os participantes podem esperar..."
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            className="min-h-[200px] bg-white border-gray-300 text-foreground resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
          />

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleAISuggestion}
              className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Sugerir com IA
            </Button>

            <div className="flex gap-2">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionModal;
