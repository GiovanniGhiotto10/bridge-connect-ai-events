
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
}

const TimePickerModal = ({ isOpen, onClose, onTimeSelect }: TimePickerModalProps) => {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 max-h-[80vh]" style={{ backgroundColor: '#040A1A' }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Selecionar Horário</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                className="p-3 text-white bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 rounded-lg transition-colors border border-gray-600"
                onClick={() => onTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimePickerModal;
