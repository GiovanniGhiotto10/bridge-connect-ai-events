
import { ImageIcon } from "lucide-react";

interface EventImageUploadProps {
  image: string | null;
  onImageClick: () => void;
}

const EventImageUpload = ({ image, onImageClick }: EventImageUploadProps) => {
  return (
    <div 
      className="aspect-square w-64 h-64 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 hover:border-blue-400 transition-colors cursor-pointer flex items-center justify-center group"
      onClick={onImageClick}
    >
      {image ? (
        <img src={image} alt="Event" className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="text-center">
          <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2 group-hover:text-blue-400 transition-colors" />
          <p className="text-gray-400 group-hover:text-blue-400 transition-colors text-xs px-4">
            Clique para adicionar imagem do evento
          </p>
        </div>
      )}
    </div>
  );
};

export default EventImageUpload;
