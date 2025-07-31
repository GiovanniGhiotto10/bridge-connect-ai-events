
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (image: string) => void;
}

const ImageUploadModal = ({ isOpen, onClose, onImageSelect }: ImageUploadModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("tecnologia");

  const predefinedImages = {
    tecnologia: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400",
    ],
    negocios: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400",
      "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400",
    ],
    festa: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    ]
  };

  const categories = [
    { id: "tecnologia", name: "Tecnologia" },
    { id: "negocios", name: "Negócios" },
    { id: "festa", name: "Festa" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Adicionar Imagem do Evento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-white mb-2">Arrastar e soltar ou clique aqui para enviar</p>
            <p className="text-gray-400 text-sm">PNG, JPG até 5MB</p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ou escolha uma imagem padrão</h3>
            <div className="flex gap-4 mb-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-white"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-4 gap-4">
              {predefinedImages[selectedCategory as keyof typeof predefinedImages]?.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video bg-gray-800 rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all overflow-hidden"
                  onClick={() => onImageSelect(image)}
                >
                  <img src={image} alt={`Template ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
