import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import bridgeLogo from "@/assets/logo-Bridge.svg";
const Footer = () => {
  return <footer className="border-t border-card-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={bridgeLogo} alt="Bridge Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gradient-primary">Bridge</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Conectando pessoas através de eventos inteligentes com o poder da Inteligência Artificial.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 Bridge. Todos os direitos reservados.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sobre Nós
              </Link>
              <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contato
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/ajuda" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Central de Ajuda
              </Link>
            </nav>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Legal & Social</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/termos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Termos de Serviço
              </Link>
              <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Cookies
              </Link>
            </nav>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-2">
              <a href="https://linkedin.com/company/bridge" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/bridge.ev/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-card-border mt-8 pt-8">
          
        </div>
      </div>
    </footer>;
};
export default Footer;