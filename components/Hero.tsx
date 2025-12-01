import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Article } from '../types';

interface HeroProps {
  article: Article;
}

const Hero: React.FC<HeroProps> = ({ article }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800';
  };

  return (
    <div className="relative w-full h-[550px] md:h-[650px] rounded-3xl overflow-hidden group border border-white/10 shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={handleImageError}
        />
      </div>
      
      {/* Gradient Overlay - Liquid effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent opacity-60" />
      
      {/* Glass Content Card */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
        <div className="glass-card rounded-2xl p-6 md:p-10 max-w-4xl border border-white/10 backdrop-blur-2xl relative overflow-hidden group/card">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_10px_rgba(var(--primary),0.2)]">
              {article.category}
            </span>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg relative z-10">
            {article.title}
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl line-clamp-2 md:line-clamp-none relative z-10 font-light">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/20 p-0.5">
                 <div className="w-full h-full rounded-full overflow-hidden bg-white/10">
                   <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(article.author)}&background=random`} alt={article.author} className="object-cover w-full h-full" />
                 </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white tracking-wide">{article.author}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                   <Calendar className="w-3 h-3" /> {article.date}
                </p>
              </div>
            </div>

            <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-primary/20 border border-white/20 hover:border-primary/50 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium group/btn shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              Ler Notícia Completa
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-primary" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;