import { Switch } from "@/components/ui/switch";
import { Sparkles, Users, Ticket } from "lucide-react";

interface EventOptionsSectionProps {
  eventData: {
    matchmakingEnabled: boolean;
    isFree: boolean;
    ticketPrice: number;
    capacity: string;
    ticketBatches: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
  };
  onChange: (updater: (prev: any) => any) => void;
  onTicketClick: () => void;
  onBatchClick: () => void;
  onCapacityClick: () => void;
}

const EventOptionsSection = ({ eventData, onChange, onTicketClick, onBatchClick, onCapacityClick }: EventOptionsSectionProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">OPÇÕES DO EVENTO</h3>
      
      {/* Matchmaking IA - Destaque */}
      <div className="flex items-center justify-between p-4 rounded-lg border-2 border-blue-500 bg-blue-500/10">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-blue-400" />
          <div>
            <p className="text-white font-medium">Ativar Matchmaking IA</p>
            <p className="text-xs text-gray-300">
              Conecte automaticamente participantes com interesses similares
            </p>
          </div>
        </div>
        <Switch
          checked={eventData.matchmakingEnabled}
          onCheckedChange={(checked) => onChange(prev => ({ ...prev, matchmakingEnabled: checked }))}
          className="scale-110"
        />
      </div>

      {/* Other Options */}
      <div className="space-y-2">
        {/* Tickets */}
        <div 
          className="flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
          onClick={onTicketClick}
        >
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-blue-400" />
            <span className="text-white text-sm">Ingressos</span>
          </div>
          <span className="text-blue-400 text-sm">
            {eventData.isFree ? "Gratuito" : formatPrice(eventData.ticketPrice)}
          </span>
        </div>

        {/* Virada de Lote - Only visible if tickets are paid */}
        {!eventData.isFree && (
          <div 
            className="flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
            onClick={onBatchClick}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-white text-sm">Virada de Lote</span>
            </div>
            <span className="text-blue-400 text-sm">
              {eventData.ticketBatches.length > 0 ? `${eventData.ticketBatches.length} lotes` : "Configurar"}
            </span>
          </div>
        )}

        {/* Capacity */}
        <div 
          className="flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
          onClick={onCapacityClick}
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-white text-sm">Capacidade</span>
          </div>
          <span className="text-blue-400 text-sm">{eventData.capacity || "Definir limite"}</span>
        </div>
      </div>
    </div>
  );
};

export default EventOptionsSection;
