import { ImageIcon } from "lucide-react";
interface EventImageUploadProps {
  image: string | null;
  onImageClick: () => void;
}
const EventImageUpload = ({
  image,
  onImageClick
}: EventImageUploadProps) => {
  return <div onClick={onImageClick} className="aspect-square w-80 h-80 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 hover:border-blue-400 transition-colors cursor-pointer flex items-center justify-center group mx-[200px] my-[80px]">
      {image ? <img src={image} alt="Event" className="w-full h-full object-cover rounded-lg" /> : <div className="text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3 group-hover:text-blue-400 transition-colors" />
          <p className="text-gray-400 group-hover:text-blue-400 transition-colors text-sm">
            Clique para adicionar imagem do evento
          </p>
        </div>}
    </div>;
};
export default EventImageUpload;