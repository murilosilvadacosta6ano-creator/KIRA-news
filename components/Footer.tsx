import React from 'react';
import { Zap, Twitter, Github, Linkedin, Mail, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl mt-24 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-primary rounded-lg">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-bold tracking-widest font-mono text-foreground">
                KIRA<span className="text-primary">NEWS</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-sm">
              O portal de notícias do futuro. Trazendo informações em tempo real com uma experiência visual imersiva e tecnologia de ponta. Conectando você ao mundo de 2025.
            </p>
            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-black transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-foreground mb-6">Editorial</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Brasil</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mundo</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tecnologia</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Economia</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Institucional</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Expediente</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Anuncie</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-foreground mb-6">Legal</h4>
             <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Código de Ética</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2025 KIRA News Mídia e Tecnologia. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Sistemas Operacionais</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;