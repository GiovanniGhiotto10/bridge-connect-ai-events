import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut, Menu, X, Calendar, Search, Plus, Handshake, Bell, MessageCircle } from "lucide-react";

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header = ({ isLoggedIn = false }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleComoFuncionaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('como-funciona');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationLinks = isLoggedIn ? [
    { label: "Descobrir", path: "/eventos", icon: Search },
    { label: "Conexões", path: "/matches", icon: Handshake },
    { label: "Agenda", path: "/agenda", icon: Calendar },
    { label: "Criar Evento", path: "/criar-evento", icon: Plus }
  ] : [
    { label: "Como Funciona", path: "#como-funciona", onClick: handleComoFuncionaClick },
    { label: "Para Organizadores", path: "#organizadores" }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'header-scrolled' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-bold text-white">Bridge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={link.onClick}
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1 ${
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            /* Logged In State */
            <div className="flex items-center space-x-2">
              {/* Notifications Icon */}
              <Button variant="ghost" size="icon" className="text-white hover:bg-primary/20">
                <Bell className="h-5 w-5" />
              </Button>
              
              {/* Chat Icon */}
              <Button variant="ghost" size="icon" className="text-white hover:bg-primary/20">
                <MessageCircle className="h-5 w-5" />
              </Button>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover border-card-border" align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/matches" className="flex items-center cursor-pointer">
                      <Handshake className="mr-2 h-4 w-4" />
                      Minhas Conexões
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/agenda" className="flex items-center cursor-pointer">
                      <Calendar className="mr-2 h-4 w-4" />
                      Minha Agenda
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/configuracoes" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-card-border" />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* Not Logged In State */
            <>
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="outline" className="btn-bridge-outline" asChild>
                  <Link to="/cadastro">Cadastre-se</Link>
                </Button>
                <Button className="btn-bridge-primary" asChild>
                  <Link to="/login">Fazer Login</Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && !isLoggedIn && (
        <div className="md:hidden border-t border-card-border bg-card/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  if (link.onClick) {
                    link.onClick(e);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="block text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-card-border">
              <Button variant="outline" className="btn-bridge-outline w-full" asChild>
                <Link to="/cadastro">Cadastre-se</Link>
              </Button>
              <Button className="btn-bridge-primary w-full" asChild>
                <Link to="/login">Fazer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
