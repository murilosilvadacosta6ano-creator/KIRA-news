
import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, X, Zap, Moon, Sun, User, Bookmark } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  onSearch: (query: string) => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ categories, activeCategory, onSelectCategory, onSearch, onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="sticky top-0 z-50 flex flex-col shadow-lg">
      {/* Top Utility Bar */}
      <nav className="glass border-b border-white/5 h-16 relative z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-muted-foreground hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div 
              className="flex items-center gap-2 group cursor-pointer" 
              onClick={() => { onSelectCategory('all'); setSearchQuery(''); }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20 group-hover:border-primary/50 transition-colors relative">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-widest font-mono text-foreground hidden sm:inline">
                KIRA<span className="text-primary">NEWS</span>
              </span>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <div className="absolute inset-0 bg-primary/5 blur-md rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar notícias, tópicos ou autores..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:bg-white/10 transition-all placeholder:text-muted-foreground/50 relative z-10 outline-none"
            />
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-white/5 rounded-full transition-all"
              aria-label="Alternar Tema"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="hidden md:flex p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            </button>

            <button 
              onClick={onLoginClick}
              className="hidden md:flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            >
              <User className="w-4 h-4" />
              <span>Entrar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Secondary Category Nav (Scrollable) */}
      <div className="bg-background/90 backdrop-blur-md border-b border-white/5 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 h-12 min-w-max">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                activeCategory === 'all' 
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.4)]' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              Início
            </button>
             <button
              onClick={() => onSelectCategory('saved')}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all flex items-center gap-1 ${
                activeCategory === 'saved' 
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.4)]' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              <Bookmark className="w-3 h-3" /> Salvos
            </button>
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                  activeCategory === cat.slug
                    ? 'bg-white/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.1)]' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden glass fixed inset-0 top-16 z-40 p-4 animate-in slide-in-from-left duration-300 flex flex-col h-[calc(100vh-4rem)]">
          <form onSubmit={(e) => { handleSearchSubmit(e); setIsMenuOpen(false); }} className="mb-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-foreground focus:border-primary/50 outline-none"
            />
          </form>
          
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Navegação</h3>
           <div className="grid grid-cols-2 gap-2 mb-4">
             <button 
               onClick={() => { onSelectCategory('all'); setIsMenuOpen(false); }}
               className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-primary/20 text-primary border border-primary/20'
                    : 'bg-white/5 text-foreground hover:bg-white/10'
                }`}
            >
              Início
            </button>
             <button 
               onClick={() => { onSelectCategory('saved'); setIsMenuOpen(false); }}
               className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === 'saved'
                    ? 'bg-primary/20 text-primary border border-primary/20'
                    : 'bg-white/5 text-foreground hover:bg-white/10'
                }`}
            >
              <Bookmark className="w-3 h-3 inline mr-2" /> Salvos
            </button>
           </div>

          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Categorias</h3>
          <div className="grid grid-cols-2 gap-2 overflow-y-auto pb-20">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => { onSelectCategory(cat.slug); setIsMenuOpen(false); }}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-primary/20 text-primary border border-primary/20'
                    : 'bg-white/5 text-foreground hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
            <button 
              onClick={() => { setIsMenuOpen(false); onLoginClick(); }}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold shadow-lg shadow-primary/20"
            >
              Fazer Login / Criar Conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
