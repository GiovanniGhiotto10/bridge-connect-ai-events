import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock data - substituir com dados reais do backend
const userEvents = [
  {
    id: 1,
    title: "Tech Summit 2024",
    date: "15 de Março, 2024",
    location: "São Paulo, SP",
    image: "/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png"
  },
  {
    id: 2,
    title: "Startup Meetup",
    date: "20 de Março, 2024",
    location: "Rio de Janeiro, RJ",
    image: "/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png"
  },
  {
    id: 3,
    title: "Design Conference",
    date: "25 de Março, 2024",
    location: "Belo Horizonte, MG",
    image: "/lovable-uploads/8a9f4ef8-de41-4a07-b941-952b39e77564.png"
  }
];

const MyEvents = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-8">Meus Eventos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userEvents.map((event) => (
            <Card key={event.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-black mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-black text-black hover:bg-gray-100"
                  asChild
                >
                  <Link to={`/evento/${event.id}`}>Pagina do Evento</Link>
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  asChild
                >
                  <Link to={`/matches?event=${event.id}`}>Conexoes</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyEvents;