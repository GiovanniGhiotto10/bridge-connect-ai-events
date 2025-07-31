
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
      <DialogContent className="bg-gray-900 border-gray-700 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-white">Selecionar Horário</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                className="p-3 text-white bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
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
