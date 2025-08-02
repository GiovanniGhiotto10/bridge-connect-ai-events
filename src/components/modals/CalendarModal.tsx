
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

const CalendarModal = ({ isOpen, onClose, onDateSelect }: CalendarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date.toISOString().split('T')[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700" style={{ backgroundColor: '#040A1A' }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Selecionar Data</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border border-gray-700 bg-gray-800 text-white pointer-events-auto"
            disabled={(date) => date < new Date()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
