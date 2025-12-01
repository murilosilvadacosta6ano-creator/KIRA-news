import React, { useState } from 'react';
import { Clock, Share2, Bookmark, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isSaved?: boolean;
  onToggleSave?: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isSaved = false, onToggleSave }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 50) + 10);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800';
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="group glass-card h-full rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] hover:-translate-y-1 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3">
           <span className="px-2.5 py-1 bg-background/60 text-white border border-white/10 text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
            {article.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary line-clamp-1 max-w-[100px]">{article.author}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1 opacity-60">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>
        
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block group-hover:text-primary transition-colors">
          <h3 className="text-lg font-bold text-foreground mb-2 leading-tight line-clamp-3">
            {article.title}
          </h3>
        </a>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 font-light leading-relaxed flex-grow">
          {article.excerpt}
        </p>
        
        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
           <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 hover:text-red-500 transition-colors ${liked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{Math.floor(likesCount / 3)}</span>
              </button>
           </div>
           
           <div className="flex items-center gap-2">
             <button 
               onClick={() => onToggleSave && onToggleSave(article)}
               className={`p-1.5 rounded-full transition-colors ${isSaved ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`} 
               title={isSaved ? "Remover dos salvos" : "Salvar para ler depois"}
             >
               <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
             </button>
             <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors" title="Compartilhar">
               <Share2 className="w-4 h-4" />
             </button>
             <a 
               href={article.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
               title="Ler no site original"
             >
               <ExternalLink className="w-4 h-4" />
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;