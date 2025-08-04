
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MapPin, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for events and meetings
const mockEvents = [
  {
    id: 1,
    name: "Tech Summit 2024",
    date: "2024-01-25",
    location: "Centro de Convenções SP",
    isPast: false
  },
  {
    id: 2,
    name: "Startup Weekend",
    date: "2024-01-28",
    location: "Hub de Inovação",
    isPast: false
  },
  {
    id: 3,
    name: "DevConf 2023",
    date: "2023-12-15",
    location: "Auditório TechPark",
    isPast: true
  }
];

const mockMeetings = [
  {
    id: 1,
    person: "Ana Silva",
    avatar: "AS",
    date: "2024-01-25",
    time: "14:00",
    status: "Confirmada",
    isPast: false
  },
  {
    id: 2,
    person: "João Santos", 
    avatar: "JS",
    date: "2024-01-26",
    time: "10:30",
    status: "Pendente",
    isPast: false
  },
  {
    id: 3,
    person: "Maria Costa",
    avatar: "MC",
    date: "2023-12-20",
    time: "16:00",
    status: "Concluída",
    isPast: true
  }
];

const Agenda = () => {
  const [activeFilter, setActiveFilter] = useState<"upcoming" | "past">("upcoming");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmada":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Pendente":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Concluída":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
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

  const filteredEvents = selectedDate 
    ? getEventsForDate(selectedDate)
    : mockEvents.filter(event => 
        activeFilter === "upcoming" ? !event.isPast : event.isPast
      );

  const filteredMeetings = selectedDate
    ? getMeetingsForDate(selectedDate)
    : mockMeetings.filter(meeting => 
        activeFilter === "upcoming" ? !meeting.isPast : meeting.isPast
      );

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-primary/5">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black text-white uppercase mb-8 text-center">
            Agenda
          </h1>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-8">
            <div className="bg-card rounded-lg p-1 border border-card-border">
              <Button
                variant={activeFilter === "upcoming" ? "default" : "ghost"}
                onClick={() => setActiveFilter("upcoming")}
                className={activeFilter === "upcoming" ? "btn-bridge-primary" : "text-muted-foreground"}
              >
                Próximos
              </Button>
              <Button
                variant={activeFilter === "past" ? "default" : "ghost"}
                onClick={() => setActiveFilter("past")}
                className={activeFilter === "past" ? "btn-bridge-primary" : "text-muted-foreground"}
              >
                Passado
              </Button>
            </div>
          </div>

          {/* Calendar */}
          <Card className="card-bridge mb-8">
            <CardHeader>
              <CardTitle className="text-white font-poppins font-black uppercase flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth('prev')}
                  className="text-white hover:bg-primary/20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth('next')}
                  className="text-white hover:bg-primary/20"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentMonth).map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square flex items-center justify-center relative cursor-pointer rounded-lg transition-all",
                      day 
                        ? "hover:bg-card/70 text-foreground" 
                        : "text-transparent cursor-default",
                      selectedDate === `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` 
                        ? "bg-primary text-primary-foreground" 
                        : ""
                    )}
                    onClick={() => day && handleDateClick(day)}
                  >
                    <span className="text-sm">{day}</span>
                    {day && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {hasEventsOnDate(day) && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                        {hasMeetingsOnDate(day) && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Eventos */}
            <Card className="card-bridge">
              <CardHeader>
                <CardTitle className="text-white font-poppins font-black uppercase flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Eventos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Nenhum evento {selectedDate ? "para esta data" : activeFilter === "upcoming" ? "próximo" : "passado"}</p>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <Link 
                      key={event.id} 
                      to={`/evento/${event.id}`}
                      className={cn(
                        "block bg-card/50 rounded-lg p-4 border transition-all hover:bg-card/70",
                        selectedDate && selectedDate === event.date 
                          ? "border-green-500 shadow-glow shadow-green-500/20" 
                          : "border-card-border"
                      )}
                    >
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">{event.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Reuniões */}
            <Card className="card-bridge">
              <CardHeader>
                <CardTitle className="text-white font-poppins font-black uppercase flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Reuniões
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredMeetings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Nenhuma reunião {selectedDate ? "para esta data" : activeFilter === "upcoming" ? "próxima" : "passada"}</p>
                  </div>
                ) : (
                  filteredMeetings.map((meeting) => (
                    <div 
                      key={meeting.id} 
                      className={cn(
                        "bg-card/50 rounded-lg p-4 border transition-all cursor-pointer hover:bg-card/70",
                        selectedDate && selectedDate === meeting.date 
                          ? "border-purple-500 shadow-glow shadow-purple-500/20" 
                          : "border-card-border"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {meeting.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-foreground">{meeting.person}</h3>
                            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(meeting.date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{meeting.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Agenda;
