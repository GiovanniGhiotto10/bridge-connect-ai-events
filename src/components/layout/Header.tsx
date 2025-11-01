import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import bridgeLogo from "@/assets/logo-Bridge.svg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut, Menu, X, Calendar, Search, Plus, Bell } from "lucide-react";

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
    { label: "Meus Eventos", path: "/meus-eventos", icon: Calendar }
  ] : [
    { label: "Como Funciona", path: "#como-funciona", onClick: handleComoFuncionaClick },
    { label: "Para Organizadores", path: "#organizadores" }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'header-scrolled' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={bridgeLogo} alt="Bridge Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={link.onClick} 
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1 ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button (for logged in users) */}
        {isLoggedIn && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-black hover:bg-primary/20" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {isLoggedIn ? (
            <>
              {/* Desktop Icons */}
              <div className="hidden md:flex items-center space-x-2">
                {/* Create Event Button */}
                <Button variant="ghost" asChild className="text-black hover:bg-primary/20 flex items-center space-x-1">
                  <Link to="/criar-evento">
                    <Plus className="h-4 w-4" />
                    <span>Criar Evento</span>
                  </Link>
                </Button>
                
                {/* Notifications Icon */}
                <Button variant="ghost" size="icon" className="text-black hover:bg-primary/20">
                  <Bell className="h-5 w-5" />
                </Button>
                
                {/* User Menu - Desktop */}
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
                  <DropdownMenuContent className="w-56 bg-white border-card-border z-[100]" align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/perfil" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/meus-eventos" className="flex items-center cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" />
                        Meus Eventos
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
              
              {/* Mobile Icons - Always visible */}
              <div className="flex md:hidden items-center space-x-2">
                {/* Notifications Icon */}
                <Button variant="ghost" size="icon" className="text-black hover:bg-primary/20">
                  <Bell className="h-5 w-5" />
                </Button>
                
                {/* User Menu Mobile */}
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
                  <DropdownMenuContent className="w-56 bg-white border-card-border z-[100]" align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/perfil" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/meus-eventos" className="flex items-center cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" />
                        Meus Eventos
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
            </>
          ) : (
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

      {/* Mobile Menu - Not Logged In */}
      {isMobileMenuOpen && !isLoggedIn && (
        <div className="md:hidden border-t border-card-border bg-white backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigationLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={e => {
                    if (link.onClick) {
                      link.onClick(e);
                    }
                    setIsMobileMenuOpen(false);
                  }} 
                  className="block text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
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

      {/* Mobile Menu - Logged In */}
      {isMobileMenuOpen && isLoggedIn && (
        <div className="md:hidden border-t border-card-border bg-white backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigationLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`block transition-colors flex items-center space-x-2 p-2 rounded ${
                    isActive(link.path) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            
            <div className="pt-3 border-t border-card-border">
              <Button variant="outline" asChild className="w-full justify-start text-black border-primary hover:bg-primary hover:text-white">
                <Link to="/criar-evento" onClick={() => setIsMobileMenuOpen(false)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Criar Evento
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
