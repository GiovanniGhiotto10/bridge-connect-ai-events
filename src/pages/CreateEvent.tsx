
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
import LocationSection from "@/components/event-creation/LocationSection";
import EventOptionsSection from "@/components/event-creation/EventOptionsSection";
import ThemeSelector from "@/components/event-creation/ThemeSelector";
import VisibilityDropdown from "@/components/dropdowns/VisibilityDropdown";
import ImageUploadModal from "@/components/modals/ImageUploadModal";
import CalendarModal from "@/components/modals/CalendarModal";
import TimePickerModal from "@/components/modals/TimePickerModal";
import DescriptionModal from "@/components/modals/DescriptionModal";
import TicketModal from "@/components/modals/TicketModal";
import BatchModal from "@/components/modals/BatchModal";
import CapacityModal from "@/components/modals/CapacityModal";
import LocationModal from "@/components/modals/LocationModal";

interface TicketBatch {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const CreateEvent = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("default");
  
  const [eventData, setEventData] = useState({
    name: "Nome do Evento",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    location: "",
    city: "",
    address: "",
    isFree: true,
    ticketPrice: 0,
    capacity: "",
    isPublic: true,
    matchmakingEnabled: true,
    image: null as string | null,
    ticketBatches: [] as TicketBatch[]
  });

  const [modals, setModals] = useState({
    imageUpload: false,
    calendar: false,
    timePicker: false,
    description: false,
    ticket: false,
    batch: false,
    capacity: false,
    location: false,
    dateType: "" as "start" | "end",
    timeType: "" as "start" | "end",
    locationType: "" as "location" | "city" | "address"
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

  const getThemeBackgroundColor = () => {
    switch (selectedTheme) {
      case "default":
        return "#040A1A";
      case "minimalist":
        return "#1a1a1a";
      case "vibrant":
        return "#0f172a";
      default:
        return "#040A1A";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800">
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Image and Theme Selection */}
            <div className="space-y-8">
              {/* Event Image */}
              <div className="flex justify-center items-start" style={{ minHeight: "400px" }}>
                <div className="flex flex-col items-center justify-center h-full">
                  <EventImageUpload
                    image={eventData.image}
                    onImageClick={() => openModal('imageUpload')}
                  />
                </div>
              </div>

              {/* Theme Selector */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">ESCOLHER TEMA</h3>
                <ThemeSelector
                  selectedTheme={selectedTheme}
                  onThemeSelect={setSelectedTheme}
                />
              </div>
            </div>

            {/* Right Column - Centralized Form */}
            <div className="max-w-md mx-auto space-y-6">
              {/* Visibility Dropdown */}
              <div className="flex justify-end items-center">
                <VisibilityDropdown 
                  isPublic={eventData.isPublic}
                  onChange={(isPublic) => setEventData(prev => ({ ...prev, isPublic }))}
                />
              </div>

              {/* Event Name Field */}
              <div className="text-left">
                <EventNameField
                  name={eventData.name}
                  onChange={(name) => setEventData(prev => ({ ...prev, name }))}
                />
              </div>

              {/* Date and Time Section */}
              <div className="text-left">
                <DateTimeSection
                  eventData={eventData}
                  onDateClick={(type) => openModal('calendar', { dateType: type })}
                  onTimeClick={(type) => openModal('timePicker', { timeType: type })}
                />
              </div>

              {/* Location Section */}
              <div className="text-left">
                <LocationSection
                  eventData={eventData}
                  onLocationClick={(type) => openModal('location', { locationType: type })}
                />
              </div>

              {/* Description */}
              <div className="text-left">
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => openModal('description')}
                >
                  <Edit3 className="h-4 w-4 text-blue-400" />
                  <span className="text-white text-sm">
                    {eventData.description || "Adicionar Descrição"}
                  </span>
                </div>
              </div>

              {/* Event Options Section */}
              <div className="text-left">
                <EventOptionsSection
                  eventData={eventData}
                  onChange={setEventData}
                  onTicketClick={() => openModal('ticket')}
                  onBatchClick={() => openModal('batch')}
                  onCapacityClick={() => openModal('capacity')}
                />
              </div>

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

      <TicketModal
        isOpen={modals.ticket}
        onClose={() => closeModal('ticket')}
        isFree={eventData.isFree}
        ticketPrice={eventData.ticketPrice}
        onSave={(isFree, ticketPrice) => {
          setEventData(prev => ({ ...prev, isFree, ticketPrice }));
          closeModal('ticket');
        }}
      />

      <BatchModal
        isOpen={modals.batch}
        onClose={() => closeModal('batch')}
        batches={eventData.ticketBatches}
        onSave={(batches) => {
          setEventData(prev => ({ ...prev, ticketBatches: batches }));
          closeModal('batch');
        }}
      />

      <CapacityModal
        isOpen={modals.capacity}
        onClose={() => closeModal('capacity')}
        capacity={eventData.capacity}
        onSave={(capacity) => {
          setEventData(prev => ({ ...prev, capacity }));
          closeModal('capacity');
        }}
      />

      <LocationModal
        isOpen={modals.location}
        onClose={() => closeModal('location')}
        eventData={eventData}
        locationType={modals.locationType}
        onSave={(field, value) => {
          setEventData(prev => ({ ...prev, [field]: value }));
          closeModal('location');
        }}
      />

      <Footer />
    </div>
  );
};

export default CreateEvent;
