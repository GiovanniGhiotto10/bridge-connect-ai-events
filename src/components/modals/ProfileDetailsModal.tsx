import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    name: string;
    company: string;
    position: string;
    avatar: string;
    whatOffers?: string;
    interests?: string;
    lookingFor?: string;
  };
}

const ProfileDetailsModal = ({ isOpen, onClose, profile }: ProfileDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold text-gray-900">
            Detalhes do Perfil
          </DialogTitle>
        </DialogHeader>

        {/* Seção de Identificação */}
        <div className="flex flex-col items-center text-center py-4 md:py-6">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-3 md:mb-4">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-xl md:text-2xl">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            {profile.name}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-1">{profile.position}</p>
          <p className="text-sm md:text-base text-gray-600">{profile.company}</p>
        </div>

        {/* Seção de Perguntas */}
        <div className="space-y-4 pb-4">
          {/* Bloco 1: O que oferece? */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              O que oferece?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profile.whatOffers || "Experiência em investimentos e mercado financeiro"}
            </p>
          </div>

          {/* Bloco 2: Área de interesse para networking */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Área de interesse para networking
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profile.interests || "Tecnologia, Finanças, Educação, Saúde"}
            </p>
          </div>

          {/* Bloco 3: O que mais precisa em uma conexão agora? */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              O que mais precisa em uma conexão agora?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profile.lookingFor || "conhecer novas pessoas"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetailsModal;
