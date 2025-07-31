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
import EventImageUpload from "@/components/event-creation/EventImageUpload";
import EventNameField from "@/components/event-creation/EventNameField";
import DateTimeSection from "@/components/event-creation/DateTimeSection";
import EventOptionsSection from "@/components/event-creation/EventOptionsSection";
import VisibilityDropdown from "@/components/dropdowns/VisibilityDropdown";
import ImageUploadModal from "@/components/modals/ImageUploadModal";
import CalendarModal from "@/components/modals/CalendarModal";
import TimePickerModal from "@/components/modals/TimePickerModal";
import DescriptionModal from "@/components/modals/DescriptionModal";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Event Image */}
            <div className="space-y-4">
              <EventImageUpload
                image={eventData.image}
                onImageClick={() => openModal('imageUpload')}
              />
            </div>

            {/* Right Column - Form */}
            <div className="space-y-6">
              {/* Visibility Dropdown - moved to top without title */}
              <div className="flex justify-end items-center">
                <VisibilityDropdown 
                  isPublic={eventData.isPublic}
                  onChange={(isPublic) => setEventData(prev => ({ ...prev, isPublic }))}
                />
              </div>

              {/* Event Name Field */}
              <EventNameField
                name={eventData.name}
                onChange={(name) => setEventData(prev => ({ ...prev, name }))}
              />

              {/* Date and Time Section */}
              <DateTimeSection
                eventData={eventData}
                onDateClick={(type) => openModal('calendar', { dateType: type })}
                onTimeClick={(type) => openModal('timePicker', { timeType: type })}
              />

              {/* Description */}
              <div 
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                onClick={() => openModal('description')}
              >
                <Edit3 className="h-4 w-4 text-blue-400" />
                <span className="text-white text-sm">
                  {eventData.description || "Adicionar Descrição"}
                </span>
              </div>

              {/* Event Options Section */}
              <EventOptionsSection
                eventData={eventData}
                onChange={setEventData}
              />

              {/* Create Button */}
              <div className="pt-4">
                <Button
                  onClick={handleSubmit}
                  className="w-full py-4 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-none"
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
