
import { MapPin } from "lucide-react";

interface LocationSectionProps {
  location: string;
  city: string;
  onLocationClick: () => void;
  onCityClick: () => void;
}

const LocationSection = ({ location, city, onLocationClick, onCityClick }: LocationSectionProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-black mx-[10px]">LOCALIZAÇÃO</h3>
      
      <div className="space-y-2">
        {/* Location */}
        <div 
          onClick={onLocationClick}
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all mx-[10px]"
        >
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-black text-sm">
            {location || "Local (Nome do espaço ou link virtual)"}
          </span>
        </div>

        {/* City */}
        <div 
          onClick={onCityClick}
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all mx-[10px]"
        >
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-black text-sm">
            {city || "Cidade"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
