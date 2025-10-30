
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Users, Upload, ChevronDown, Edit3, Image as ImageIcon, Sparkles, Palette } from "lucide-react";
import Header from "@/components/layout/Header";
import EventImageUpload from "@/components/event-creation/EventImageUpload";
import EventNameField from "@/components/event-creation/EventNameField";
import DateTimeSection from "@/components/event-creation/DateTimeSection";
import LocationSection from "@/components/event-creation/LocationSection";
import EventOptionsSection from "@/components/event-creation/EventOptionsSection";
import VisibilityDropdown from "@/components/dropdowns/VisibilityDropdown";
import ImageUploadModal from "@/components/modals/ImageUploadModal";
import CalendarModal from "@/components/modals/CalendarModal";
import TimePickerModal from "@/components/modals/TimePickerModal";
import DescriptionModal from "@/components/modals/DescriptionModal";
import TicketModal from "@/components/modals/TicketModal";
import BatchModal from "@/components/modals/BatchModal";
import CapacityModal from "@/components/modals/CapacityModal";
import LocationModal from "@/components/modals/LocationModal";
import ThemeEditor from "@/components/theme-editor/ThemeEditor";
import { useTheme, Theme } from "@/hooks/useTheme";

interface TicketBatch {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const CreateEvent = () => {
  const navigate = useNavigate();
  const { selectedTheme, updateTheme } = useTheme();
  
  const [eventData, setEventData] = useState({
    name: "Nome do Evento",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    location: "",
    city: "",
    isFree: true,
    ticketPrice: 0,
    capacity: "",
    isPublic: true,
    matchmakingEnabled: true,
    image: null as string | null,
    ticketBatches: [] as TicketBatch[],
    theme: selectedTheme
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
    themeEditor: false,
    dateType: "" as "start" | "end",
    timeType: "" as "start" | "end",
    locationType: "" as "location" | "city"
  });

  const openModal = (modalName: string, extra?: any) => {
    setModals(prev => ({
      ...prev,
      [modalName]: true,
      ...extra
    }));
  };

  const closeModal = (modalName: string) => {
    setModals(prev => ({
      ...prev,
      [modalName]: false
    }));
  };

  const handleThemeChange = (theme: Theme) => {
    updateTheme(theme);
    setEventData(prev => ({
      ...prev,
      theme
    }));
  };

  const handleSubmit = () => {
    // Simular salvamento do evento
    const eventId = Math.random().toString(36).substr(2, 9);
    
    // Salvar dados do evento (em uma aplicação real, isso seria uma chamada para API)
    const newEvent = {
      id: eventId,
      ...eventData,
      createdAt: new Date().toISOString()
    };
    
    // Simular salvamento no localStorage para demonstração
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    existingEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(existingEvents));
    
    toast({
      title: "Evento Criado com Sucesso! 🎉",
      description: "Seu evento foi publicado e está disponível para participantes."
    });
    
    // Redirecionar para a página de detalhes do evento criado
    navigate(`/evento/${eventId}`);
  };

  const pageBackground = '#FFFFFF';

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        background: pageBackground
      }}
    >
      <Header isLoggedIn={true} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Event Image and Theme */}
            <div className="space-y-4">
              <EventImageUpload image={eventData.image} onImageClick={() => openModal('imageUpload')} />
              
              {/* Theme Button */}
              <div className="mx-[200px]">
                <Button
                  onClick={() => openModal('themeEditor')}
                  variant="outline"
                  className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-blue-400 transition-all"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Tema ({selectedTheme.name})
                </Button>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="space-y-6">
              {/* Visibility Dropdown - moved to top without title */}
              <div className="flex justify-end items-center">
                <VisibilityDropdown isPublic={eventData.isPublic} onChange={isPublic => setEventData(prev => ({
                  ...prev,
                  isPublic
                }))} />
              </div>

              {/* Event Name Field */}
              <EventNameField name={eventData.name} onChange={name => setEventData(prev => ({
                ...prev,
                name
              }))} />

              {/* Date and Time Section */}
              <DateTimeSection eventData={eventData} onDateClick={type => openModal('calendar', {
                dateType: type
              })} onTimeClick={type => openModal('timePicker', {
                timeType: type
              })} />

              {/* Location Section */}
              <LocationSection 
                location={eventData.location}
                city={eventData.city}
                onLocationClick={() => openModal('location', { locationType: 'location' })}
                onCityClick={() => openModal('location', { locationType: 'city' })}
              />

              {/* Description */}
              <div onClick={() => openModal('description')} className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-blue-400 cursor-pointer hover:bg-white/5 transition-all mx-[10px]">
                <Edit3 className="h-4 w-4 text-blue-400" />
                <span className="text-white text-sm">
                  {eventData.description || "Adicionar Descrição"}
                </span>
              </div>

              {/* Event Options Section */}
              <EventOptionsSection 
                eventData={eventData} 
                onChange={setEventData} 
                onTicketClick={() => openModal('ticket')} 
                onBatchClick={() => openModal('batch')}
                onCapacityClick={() => openModal('capacity')}
              />

              {/* Create Button */}
              <div className="pt-4">
                <Button onClick={handleSubmit} className="w-full py-4 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-none mx-[10px]">
                  Criar Evento
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Theme Editor */}
      <ThemeEditor
        isOpen={modals.themeEditor}
        onClose={() => closeModal('themeEditor')}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
      />

      {/* Modais existentes */}
      <ImageUploadModal isOpen={modals.imageUpload} onClose={() => closeModal('imageUpload')} onImageSelect={image => {
        setEventData(prev => ({
          ...prev,
          image
        }));
        closeModal('imageUpload');
      }} />
      
      <CalendarModal isOpen={modals.calendar} onClose={() => closeModal('calendar')} onDateSelect={date => {
        const field = modals.dateType === 'start' ? 'startDate' : 'endDate';
        setEventData(prev => ({
          ...prev,
          [field]: date
        }));
        closeModal('calendar');
      }} />
      
      <TimePickerModal isOpen={modals.timePicker} onClose={() => closeModal('timePicker')} onTimeSelect={time => {
        const field = modals.timeType === 'start' ? 'startTime' : 'endTime';
        setEventData(prev => ({
          ...prev,
          [field]: time
        }));
        closeModal('timePicker');
      }} />
      
      <DescriptionModal isOpen={modals.description} onClose={() => closeModal('description')} description={eventData.description} onSave={description => {
        setEventData(prev => ({
          ...prev,
          description
        }));
        closeModal('description');
      }} />

      <TicketModal isOpen={modals.ticket} onClose={() => closeModal('ticket')} isFree={eventData.isFree} ticketPrice={eventData.ticketPrice} onSave={(isFree, ticketPrice) => {
        setEventData(prev => ({
          ...prev,
          isFree,
          ticketPrice
        }));
        closeModal('ticket');
      }} />

      <BatchModal isOpen={modals.batch} onClose={() => closeModal('batch')} batches={eventData.ticketBatches} onSave={batches => {
        setEventData(prev => ({
          ...prev,
          ticketBatches: batches
        }));
        closeModal('batch');
      }} />

      <CapacityModal 
        isOpen={modals.capacity} 
        onClose={() => closeModal('capacity')} 
        capacity={eventData.capacity}
        onSave={(capacity) => {
          setEventData(prev => ({
            ...prev,
            capacity
          }));
          closeModal('capacity');
        }} 
      />

      <LocationModal 
        isOpen={modals.location} 
        onClose={() => closeModal('location')} 
        type={modals.locationType}
        value={modals.locationType === 'location' ? eventData.location : eventData.city}
        onSave={(value) => {
          const field = modals.locationType === 'location' ? 'location' : 'city';
          setEventData(prev => ({
            ...prev,
            [field]: value
          }));
          closeModal('location');
        }} 
      />
    </div>
  );
};

export default CreateEvent;
