import React from 'react';
import { Article } from '../types';

interface HeadlineCarouselProps {
  articles: Article[];
}

const HeadlineCarousel: React.FC<HeadlineCarouselProps> = ({ articles }) => {
  // Use first 5 articles for ticker
  const headlines = articles.slice(0, 5);

  return (
    <div className="bg-primary/5 border-b border-primary/10 overflow-hidden py-2 relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>
      
      <div className="flex whitespace-nowrap animate-marquee hover:pause">
        {/* Duplicate content to create seamless loop */}
        {[...headlines, ...headlines].map((article, idx) => (
          <div key={`${article.id}-${idx}`} className="inline-flex items-center mx-8">
            <span className="w-2 h-2 rounded-full bg-primary mr-3 animate-pulse"></span>
            <span className="text-xs font-bold text-primary mr-2 uppercase tracking-wider">URGENTE:</span>
            <span className="text-sm text-foreground/90 hover:text-primary cursor-pointer transition-colors">
              {article.title}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default HeadlineCarousel;