
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Upload, 
  ChevronDown,
  Edit3,
  Image as ImageIcon,
  Sparkles
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImageUploadModal from "@/components/modals/ImageUploadModal";
import CalendarModal from "@/components/modals/CalendarModal";
import TimePickerModal from "@/components/modals/TimePickerModal";
import DescriptionModal from "@/components/modals/DescriptionModal";
import VisibilityDropdown from "@/components/dropdowns/VisibilityDropdown";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "Nome do Evento",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    isFree: true,
    requiresApproval: false,
    capacity: "",
    isPublic: true,
    matchmakingEnabled: true,
    image: null as string | null
  });

  const [modals, setModals] = useState({
    imageUpload: false,
    calendar: false,
    timePicker: false,
    description: false,
    dateType: "" as "start" | "end",
    timeType: "" as "start" | "end"
  });

  const openModal = (modalName: string, extra?: any) => {
    setModals(prev => ({ ...prev, [modalName]: true, ...extra }));
  };

  const closeModal = (modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const handleSubmit = () => {
    toast({
      title: "Evento Criado com Sucesso! 🎉",
      description: "Seu evento foi publicado e está disponível para participantes.",
    });
    navigate("/eventos");
  };

  const formatDate = (date: string) => {
    if (!date) return "Selecionar data";
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatTime = (time: string) => {
    if (!time) return "Selecionar horário";
    return time;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Criar Evento
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Event Image */}
            <div className="space-y-6">
              <div 
                className="aspect-video bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 hover:border-blue-400 transition-colors cursor-pointer flex items-center justify-center group"
                onClick={() => openModal('imageUpload')}
              >
                {eventData.image ? (
                  <img src={eventData.image} alt="Event" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4 group-hover:text-blue-400 transition-colors" />
                    <p className="text-gray-400 group-hover:text-blue-400 transition-colors">
                      Clique para adicionar imagem do evento
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="space-y-8">
              {/* Visibility Toggle */}
              <div className="flex justify-end">
                <VisibilityDropdown 
                  isPublic={eventData.isPublic}
                  onChange={(isPublic) => setEventData(prev => ({ ...prev, isPublic }))}
                />
              </div>

              {/* Event Name */}
              <div 
                className="group cursor-pointer p-4 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => {
                  const name = prompt("Nome do evento:", eventData.name);
                  if (name) setEventData(prev => ({ ...prev, name }));
                }}
              >
                <h2 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-3">
                  {eventData.name}
                  <Edit3 className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
              </div>

              {/* Date and Time */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Data e Horário</h3>
                
                {/* Start Date/Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                    onClick={() => openModal('calendar', { dateType: 'start' })}
                  >
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Início</p>
                      <p className="text-white">{formatDate(eventData.startDate)}</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                    onClick={() => openModal('timePicker', { timeType: 'start' })}
                  >
                    <Clock className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Horário</p>
                      <p className="text-white">{formatTime(eventData.startTime)}</p>
                    </div>
                  </div>
                </div>

                {/* End Date/Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                    onClick={() => openModal('calendar', { dateType: 'end' })}
                  >
                    <Calendar className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Fim</p>
                      <p className="text-white">{formatDate(eventData.endDate)}</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                    onClick={() => openModal('timePicker', { timeType: 'end' })}
                  >
                    <Clock className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Horário</p>
                      <p className="text-white">{formatTime(eventData.endTime)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div 
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                onClick={() => openModal('description')}
              >
                <Edit3 className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <p className="text-white">
                    {eventData.description || "Adicionar Descrição"}
                  </p>
                  {eventData.description && (
                    <p className="text-sm text-gray-400 mt-1">{eventData.description.substring(0, 100)}...</p>
                  )}
                </div>
              </div>

              {/* Event Options */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Opções do Evento</h3>
                
                {/* Matchmaking IA - DESTAQUE */}
                <div className="flex items-center justify-between p-6 rounded-lg border-2 border-blue-500 bg-blue-500/10">
                  <div>
                    <p className="text-white font-semibold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-400" />
                      Ativar Matchmaking IA
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      Conecte automaticamente participantes com interesses similares
                    </p>
                  </div>
                  <Switch
                    checked={eventData.matchmakingEnabled}
                    onCheckedChange={(checked) => setEventData(prev => ({ ...prev, matchmakingEnabled: checked }))}
                    className="scale-125"
                  />
                </div>

                {/* Tickets */}
                <div 
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => setEventData(prev => ({ ...prev, isFree: !prev.isFree }))}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <p className="text-white">Ingressos</p>
                  </div>
                  <p className="text-blue-400">{eventData.isFree ? "Gratuito" : "Pago"}</p>
                </div>

                {/* Approval Required */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <p className="text-white">Exigir Aprovação</p>
                  </div>
                  <Switch
                    checked={eventData.requiresApproval}
                    onCheckedChange={(checked) => setEventData(prev => ({ ...prev, requiresApproval: checked }))}
                  />
                </div>

                {/* Capacity */}
                <div 
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => {
                    const capacity = prompt("Capacidade máxima:", eventData.capacity);
                    if (capacity !== null) setEventData(prev => ({ ...prev, capacity }));
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-400" />
                    <p className="text-white">Capacidade</p>
                  </div>
                  <p className="text-blue-400">{eventData.capacity || "Definir limite"}</p>
                </div>
              </div>

              {/* Create Button */}
              <div className="pt-8">
                <Button
                  onClick={handleSubmit}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-none"
                >
                  Criar Evento
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <ImageUploadModal
        isOpen={modals.imageUpload}
        onClose={() => closeModal('imageUpload')}
        onImageSelect={(image) => {
          setEventData(prev => ({ ...prev, image }));
          closeModal('imageUpload');
        }}
      />
      
      <CalendarModal
        isOpen={modals.calendar}
        onClose={() => closeModal('calendar')}
        onDateSelect={(date) => {
          const field = modals.dateType === 'start' ? 'startDate' : 'endDate';
          setEventData(prev => ({ ...prev, [field]: date }));
          closeModal('calendar');
        }}
      />
      
      <TimePickerModal
        isOpen={modals.timePicker}
        onClose={() => closeModal('timePicker')}
        onTimeSelect={(time) => {
          const field = modals.timeType === 'start' ? 'startTime' : 'endTime';
          setEventData(prev => ({ ...prev, [field]: time }));
          closeModal('timePicker');
        }}
      />
      
      <DescriptionModal
        isOpen={modals.description}
        onClose={() => closeModal('description')}
        description={eventData.description}
        onSave={(description) => {
          setEventData(prev => ({ ...prev, description }));
          closeModal('description');
        }}
      />

      <Footer />
    </div>
  );
};

export default CreateEvent;
