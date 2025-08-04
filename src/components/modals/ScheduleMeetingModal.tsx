
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleMeetingModal = ({ isOpen, onClose }: ScheduleMeetingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    invitees: "",
    subject: "",
    time: "",
    location: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de envio
    console.log("Enviando convites:", { ...formData, date: selectedDate });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-card-border">
        <DialogHeader>
          <DialogTitle className="text-white font-poppins font-black uppercase text-lg">
            AGENDAR NOVA REUNIÃO
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Convidar */}
          <div className="space-y-2">
            <Label htmlFor="invitees" className="text-white font-medium">
              Convidar
            </Label>
            <Input
              id="invitees"
              placeholder="Pesquisar pessoas..."
              value={formData.invitees}
              onChange={(e) => handleInputChange("invitees", e.target.value)}
              className="bg-card/50 border-card-border text-white placeholder:text-muted-foreground"
            />
          </div>

          {/* Tema da Reunião */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white font-medium">
              Tema da Reunião
            </Label>
            <Input
              id="subject"
              placeholder="Digite o título da reunião"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className="bg-card/50 border-card-border text-white placeholder:text-muted-foreground"
              required
            />
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-card/50 border-card-border text-white hover:bg-card/70",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecionar data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card border-card-border" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Horário */}
          <div className="space-y-2">
            <Label htmlFor="time" className="text-white font-medium">
              Horário
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              className="bg-card/50 border-card-border text-white"
              required
            />
          </div>

          {/* Localização */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-white font-medium">
              Localização
            </Label>
            <Input
              id="location"
              placeholder="Link da reunião virtual"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="bg-card/50 border-card-border text-white placeholder:text-muted-foreground"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">
              Descrição (Opcional)
            </Label>
            <Textarea
              id="description"
              placeholder="Detalhes adicionais..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="bg-card/50 border-card-border text-white placeholder:text-muted-foreground resize-none"
              rows={3}
            />
          </div>

          {/* Botão de Envio */}
          <Button
            type="submit"
            className="w-full btn-bridge-primary mt-6"
          >
            Enviar Convites
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetingModal;
