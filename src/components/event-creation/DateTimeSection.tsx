import { Calendar, Clock } from "lucide-react";
interface DateTimeSectionProps {
  eventData: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };
  onDateClick: (type: 'start' | 'end') => void;
  onTimeClick: (type: 'start' | 'end') => void;
}
const DateTimeSection = ({
  eventData,
  onDateClick,
  onTimeClick
}: DateTimeSectionProps) => {
  const formatDate = (date: string) => {
    if (!date) return "Selecionar data";
    return new Date(date).toLocaleDateString('pt-BR');
  };
  const formatTime = (time: string) => {
    if (!time) return "Selecionar horário";
    return time;
  };
  return <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mx-[10px]">DATA E HORÁRIO</h3>
      
      {/* Start Date/Time */}
      <div className="grid grid-cols-2 gap-3">
        <div onClick={() => onDateClick('start')} className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all mx-[10px]">
          <Calendar className="h-4 w-4 text-blue-400" />
          <div>
            <p className="text-xs text-gray-400">Início</p>
            <p className="text-white text-sm">{formatDate(eventData.startDate)}</p>
          </div>
        </div>
        
        <div onClick={() => onTimeClick('start')} className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all mx-[10px]">
          <Clock className="h-4 w-4 text-blue-400" />
          <div>
            <p className="text-xs text-gray-400">Horário</p>
            <p className="text-white text-sm">{formatTime(eventData.startTime)}</p>
          </div>
        </div>
      </div>

      {/* End Date/Time */}
      <div className="grid grid-cols-2 gap-3">
        <div onClick={() => onDateClick('end')} className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all mx-[10px]">
          <Calendar className="h-4 w-4 text-green-400" />
          <div>
            <p className="text-xs text-gray-400">Fim</p>
            <p className="text-white text-sm">{formatDate(eventData.endDate)}</p>
          </div>
        </div>
        
        <div onClick={() => onTimeClick('end')} className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all mx-[10px]">
          <Clock className="h-4 w-4 text-green-400" />
          <div>
            <p className="text-xs text-gray-400">Horário</p>
            <p className="text-white text-sm">{formatTime(eventData.endTime)}</p>
          </div>
        </div>
      </div>
    </div>;
};
export default DateTimeSection;