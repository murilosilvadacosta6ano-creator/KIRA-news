import React, { useState, useEffect } from 'react';
import { TrendingUp, Hash, Zap, Radio, Clock } from 'lucide-react';
import { TrendingItem, Category, Article } from '../types';

interface SidebarProps {
  trending: TrendingItem[];
  categories: Category[];
  latestNews: Article[];
}

const Sidebar: React.FC<SidebarProps> = ({ trending, categories, latestNews }) => {
  const [displayNews, setDisplayNews] = useState<Article[]>([]);

  // Simulate updating news feed
  useEffect(() => {
    setDisplayNews(latestNews.slice(0, 5));
    
    const interval = setInterval(() => {
      // Shuffle slightly to simulate live updates
      setDisplayNews(prev => {
        const shuffled = [...latestNews].sort(() => 0.5 - Math.random()).slice(0, 5);
        return shuffled;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [latestNews]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800';
  };

  return (
    <div className="space-y-8 sticky top-36">
      
      {/* Latest News (Live Feed) */}
      <div className="glass-card rounded-xl p-0 overflow-hidden border-t-4 border-t-primary">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
          <h2 className="font-bold text-foreground flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            Últimas Notícias
          </h2>
          <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20 animate-pulse">AO VIVO</span>
        </div>
        <div className="divide-y divide-white/5">
          {displayNews.map((news) => (
            <div key={news.id} className="p-4 hover:bg-white/5 transition-colors group cursor-pointer flex gap-3 items-start">
              {/* Thumbnail Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 relative">
                <img 
                  src={news.imageUrl} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1">
                  <Clock className="w-3 h-3" />
                  <span>Agora</span>
                  <span className="text-primary truncate max-w-[80px]">{news.category}</span>
                </div>
                <h3 className="text-sm font-medium text-foreground/90 group-hover:text-primary leading-snug line-clamp-2">
                  {news.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-black/20 text-center">
          <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
            Ver feed completo
          </button>
        </div>
      </div>

      {/* Trending Widget */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Mais Lidas</h2>
        </div>
        
        <div className="space-y-5">
          {trending.map((item) => (
            <div key={item.id} className="group cursor-pointer flex items-start gap-4">
              <span className="text-2xl font-black text-white/10 group-hover:text-primary/50 transition-colors font-mono leading-none mt-1">
                {String(item.rank).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                   <Zap className="w-3 h-3 text-primary/70" /> {item.views} leituras
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Tags */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Tópicos</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span 
              key={cat.id} 
              className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;