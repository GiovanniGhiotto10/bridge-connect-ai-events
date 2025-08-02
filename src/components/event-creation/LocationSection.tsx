
import { MapPin, Building, Navigation } from "lucide-react";

interface LocationSectionProps {
  eventData: {
    location: string;
    city: string;
    address: string;
  };
  onLocationClick: (type: 'location' | 'city' | 'address') => void;
}

const LocationSection = ({ eventData, onLocationClick }: LocationSectionProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">LOCALIZAÇÃO</h3>
      
      <div className="space-y-2">
        {/* Location */}
        <div 
          className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => onLocationClick('location')}
        >
          <MapPin className="h-4 w-4 text-blue-400" />
          <div className="flex-1">
            <p className="text-xs text-gray-400">Local</p>
            <p className="text-white text-sm">
              {eventData.location || "Nome do local ou link virtual"}
            </p>
          </div>
        </div>

        {/* City */}
        <div 
          className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => onLocationClick('city')}
        >
          <Building className="h-4 w-4 text-blue-400" />
          <div className="flex-1">
            <p className="text-xs text-gray-400">Cidade</p>
            <p className="text-white text-sm">
              {eventData.city || "Definir cidade"}
            </p>
          </div>
        </div>

        {/* Address */}
        <div 
          className="flex items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => onLocationClick('address')}
        >
          <Navigation className="h-4 w-4 text-blue-400" />
          <div className="flex-1">
            <p className="text-xs text-gray-400">Endereço</p>
            <p className="text-white text-sm">
              {eventData.address || "Endereço (opcional)"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
