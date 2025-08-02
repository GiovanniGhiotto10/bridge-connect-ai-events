
import { Edit3 } from "lucide-react";

interface EventNameFieldProps {
  name: string;
  onChange: (name: string) => void;
}

const EventNameField = ({ name, onChange }: EventNameFieldProps) => {
  const handleClick = () => {
    const newName = prompt("Nome do evento:", name);
    if (newName) onChange(newName);
  };

  return (
    <div 
      className="group cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-gray-700"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 text-left">
        <h2 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors flex-1">
          {name}
        </h2>
        <Edit3 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
      </div>
    </div>
  );
};

export default EventNameField;
