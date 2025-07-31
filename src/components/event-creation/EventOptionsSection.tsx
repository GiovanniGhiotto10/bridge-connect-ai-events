import { Switch } from "@/components/ui/switch";
import { Sparkles, Users } from "lucide-react";

interface EventOptionsSectionProps {
  eventData: {
    matchmakingEnabled: boolean;
    isFree: boolean;
    requiresApproval: boolean;
    capacity: string;
  };
  onChange: (updater: (prev: any) => any) => void;
}

const EventOptionsSection = ({ eventData, onChange }: EventOptionsSectionProps) => {
  const handleCapacityClick = () => {
    const capacity = prompt("Capacidade máxima:", eventData.capacity);
    if (capacity !== null) onChange(prev => ({ ...prev, capacity }));
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
          onClick={() => onChange(prev => ({ ...prev, isFree: !prev.isFree }))}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-white text-sm">Ingressos</span>
          </div>
          <span className="text-blue-400 text-sm">{eventData.isFree ? "Gratuito" : "Pago"}</span>
        </div>

        {/* Approval Required */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span className="text-white text-sm">Exigir Aprovação</span>
          </div>
          <Switch
            checked={eventData.requiresApproval}
            onCheckedChange={(checked) => onChange(prev => ({ ...prev, requiresApproval: checked }))}
          />
        </div>

        {/* Capacity */}
        <div 
          className="flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
          onClick={handleCapacityClick}
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
