import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, MapPin, Clock, User, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import ScheduleMeetingModal from "@/components/modals/ScheduleMeetingModal";

// Mock data for events and meetings
const mockEvents = [{
  id: 1,
  name: "Tech Summit 2024",
  date: "2024-01-25",
  location: "Centro de Convenções SP",
  isPast: false
}, {
  id: 2,
  name: "Startup Weekend",
  date: "2024-01-28",
  location: "Hub de Inovação",
  isPast: false
}, {
  id: 3,
  name: "DevConf 2023",
  date: "2023-12-15",
  location: "Auditório TechPark",
  isPast: true
}];
const mockMeetings = [{
  id: 1,
  person: "Ana Silva",
  avatar: "AS",
  date: "2024-01-25",
  time: "14:00",
  status: "Confirmada",
  isPast: false
}, {
  id: 2,
  person: "João Santos",
  avatar: "JS",
  date: "2024-01-26",
  time: "10:30",
  status: "Pendente",
  isPast: false
}, {
  id: 3,
  person: "Maria Costa",
  avatar: "MC",
  date: "2023-12-20",
  time: "16:00",
  status: "Concluída",
  isPast: true
}];
const Agenda = () => {
  const [activeFilter, setActiveFilter] = useState<"upcoming" | "past">("upcoming");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isScheduleMeetingModalOpen, setIsScheduleMeetingModalOpen] = useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const formatTime = (time: string) => {
    return time;
  };
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };
  const getEventsForDate = (date: string) => {
    return mockEvents.filter(event => event.date === date);
  };
  const getMeetingsForDate = (date: string) => {
    return mockMeetings.filter(meeting => meeting.date === date);
  };
  const hasEventsOnDate = (day: number) => {
    if (!day) return false;
    const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getEventsForDate(dateString).length > 0;
  };
  const hasMeetingsOnDate = (day: number) => {
    if (!day) return false;
    const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getMeetingsForDate(dateString).length > 0;
  };
  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
  };
  const handleDateClick = (day: number) => {
    if (!day) return;
    const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateString);
  };
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };
  const filteredEvents = selectedDate ? getEventsForDate(selectedDate) : mockEvents.filter(event => activeFilter === "upcoming" ? !event.isPast : event.isPast);
  const filteredMeetings = selectedDate ? getMeetingsForDate(selectedDate) : mockMeetings.filter(meeting => activeFilter === "upcoming" ? !meeting.isPast : meeting.isPast);
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-primary/5">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-black uppercase mb-8 text-center">
            Agenda
          </h1>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Column - Calendar (40%) */}
            <div className="lg:col-span-2 my-[77px]">
              <Card className="card-bridge">
                <CardHeader className="pb-4">
                  <CardTitle className="text-black font-poppins font-black uppercase text-xl">
                    CALENDÁRIO
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')} className="text-black hover:bg-primary/20 h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-black font-poppins font-bold text-lg">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')} className="text-black hover:bg-primary/20 h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
                        {day}
                      </div>)}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((day, index) => <div key={index} className={cn("aspect-square flex items-center justify-center relative cursor-pointer rounded text-xs transition-all border", day ? "hover:bg-card/70 text-foreground border-card-border" : "text-transparent cursor-default border-transparent", isToday(day) ? "bg-white text-black font-bold" : "", selectedDate === `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` && !isToday(day) ? "bg-primary text-primary-foreground" : "")} onClick={() => day && handleDateClick(day)}>
                        <span className="z-10">{day}</span>
                        {day && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                            {hasEventsOnDate(day) && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
                            {hasMeetingsOnDate(day) && <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>}
                          </div>}
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Lists (60%) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Filter Buttons */}
              <div className="flex justify-center">
                <div className="bg-card rounded-lg p-1 border border-card-border">
                  <Button variant={activeFilter === "upcoming" ? "default" : "ghost"} onClick={() => setActiveFilter("upcoming")} className={cn("text-sm px-4 py-2", activeFilter === "upcoming" ? "btn-bridge-primary" : "text-muted-foreground")}>
                    Próximos
                  </Button>
                  <Button variant={activeFilter === "past" ? "default" : "ghost"} onClick={() => setActiveFilter("past")} className={cn("text-sm px-4 py-2", activeFilter === "past" ? "btn-bridge-primary" : "text-muted-foreground")}>
                    Passado
                  </Button>
                </div>
              </div>

              {/* Eventos */}
              <Card className="card-bridge">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-black font-poppins font-black uppercase text-lg">
                      EVENTOS
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-black hover:bg-primary/20">
                          <Plus className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover border-card-border" align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/criar-evento" className="flex items-center cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />
                            Criar Evento
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/eventos" className="flex items-center cursor-pointer">
                            <Search className="mr-2 h-4 w-4" />
                            Descobrir
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredEvents.length === 0 ? <div className="text-center py-6 text-muted-foreground">
                      <Calendar className="h-8 w-8 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">
                        Nenhum evento {selectedDate ? "para esta data" : activeFilter === "upcoming" ? "próximo" : "passado"}
                      </p>
                    </div> : filteredEvents.map(event => <Link key={event.id} to={`/evento/${event.id}`} className={cn("block bg-card/50 rounded-lg p-4 border transition-all hover:bg-card/70", selectedDate && selectedDate === event.date ? "border-green-500 shadow-glow shadow-green-500/20" : "border-card-border")}>
                        <div className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="space-y-2 min-w-0">
                            <h3 className="font-semibold text-foreground text-base line-clamp-2">{event.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </Link>)}
                </CardContent>
              </Card>

              {/* Reuniões */}
              <Card className="card-bridge">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-black font-poppins font-black uppercase text-lg">
                      REUNIÕES
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="text-black hover:bg-primary/20" onClick={() => setIsScheduleMeetingModalOpen(true)}>
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredMeetings.length === 0 ? <div className="text-center py-6 text-muted-foreground">
                      <User className="h-8 w-8 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">
                        Nenhuma reunião {selectedDate ? "para esta data" : activeFilter === "upcoming" ? "próxima" : "passada"}
                      </p>
                    </div> : filteredMeetings.map(meeting => <div key={meeting.id} className={cn("bg-card/50 rounded-lg p-4 border transition-all cursor-pointer hover:bg-card/70", selectedDate && selectedDate === meeting.date ? "border-purple-500 shadow-glow shadow-purple-500/20" : "border-card-border")}>
                        <div className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="space-y-2 min-w-0 flex-1">
                            <h3 className="font-semibold text-foreground text-base">
                              Reunião com {meeting.person}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span>{formatDate(meeting.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span>{formatTime(meeting.time)}</span>
                            </div>
                          </div>
                          <Badge className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/30">
                            {meeting.status}
                          </Badge>
                        </div>
                      </div>)}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Schedule Meeting Modal */}
      <ScheduleMeetingModal isOpen={isScheduleMeetingModalOpen} onClose={() => setIsScheduleMeetingModalOpen(false)} />
    </div>;
};
export default Agenda;