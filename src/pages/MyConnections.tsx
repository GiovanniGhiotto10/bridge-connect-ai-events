
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, User, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

// Mock data for demonstration
const mockMatches = [
  {
    id: 1,
    name: "Ana Silva",
    title: "Diretora de Marketing",
    matchPercentage: 92,
    event: "Tech Summit 2024",
    avatar: "AS",
    company: "TechCorp"
  },
  {
    id: 2,
    name: "João Santos",
    title: "CEO Startup",
    matchPercentage: 87,
    event: "Startup Weekend",
    avatar: "JS",
    company: "InnovaTech"
  },
  {
    id: 3,
    name: "Maria Costa",
    title: "Investidora",
    matchPercentage: 84,
    event: "Investor Day",
    avatar: "MC",
    company: "Venture Capital"
  }
];

const mockMeetings = [
  {
    id: 1,
    person: "Ana Silva",
    date: "2024-01-25",
    time: "14:00",
    status: "Confirmada",
    location: "Café Central"
  },
  {
    id: 2,
    person: "João Santos",
    date: "2024-01-26",
    time: "10:30",
    status: "Pendente",
    location: "Escritório Bridge"
  }
];

const MyConnections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const filteredMatches = mockMatches.filter(match =>
    match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmada":
        return "bg-success text-success-foreground";
      case "Pendente":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black text-white uppercase mb-8 text-center animate-fade-in-up">
            Minhas Conexões e Agenda
          </h1>

          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="matches">Minhas Conexões</TabsTrigger>
              <TabsTrigger value="meetings">Minhas Reuniões</TabsTrigger>
              <TabsTrigger value="calendar">Minha Agenda</TabsTrigger>
            </TabsList>

            {/* Minhas Conexões Tab */}
            <TabsContent value="matches" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou evento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatches.map((match) => (
                  <Card key={match.id} className="card-bridge-interactive">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {match.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{match.name}</h3>
                          <p className="text-sm text-muted-foreground">{match.title}</p>
                          <p className="text-xs text-muted-foreground">{match.company}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Match:</span>
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            {match.matchPercentage}%
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{match.event}</span>
                        </div>
                        
                        <Button className="w-full btn-bridge-outline" size="sm">
                          Ver Perfil
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Minhas Reuniões Tab */}
            <TabsContent value="meetings" className="space-y-6">
              <div className="space-y-4">
                {mockMeetings.map((meeting) => (
                  <Card key={meeting.id} className="card-bridge">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <User className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-foreground">{meeting.person}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{new Date(meeting.date).toLocaleDateString('pt-BR')}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{meeting.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{meeting.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Minha Agenda Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="card-bridge">
                    <CardHeader>
                      <CardTitle className="text-white font-poppins font-black uppercase">Calendário</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border-0"
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <Card className="card-bridge">
                    <CardHeader>
                      <CardTitle className="text-lg text-white font-poppins font-black uppercase">Próximos Eventos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Reunião com Ana Silva</p>
                          <p className="text-xs text-muted-foreground">Hoje, 14:00</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 rounded-full bg-warning"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Tech Summit 2024</p>
                          <p className="text-xs text-muted-foreground">Amanhã, 09:00</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyConnections;
