import React, { useEffect, useState, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArticleCard from './components/ArticleCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HeadlineCarousel from './components/HeadlineCarousel';
import LoginModal from './components/LoginModal';
import { Article, TrendingItem, Category } from './types';
import { fetchNews } from './lib/api';
import { Loader2, Bookmark } from 'lucide-react';

const categories: Category[] = [
  { id: 'cat-br', name: 'Brasil', slug: 'brasil', count: 0 },
  { id: 'cat-world', name: 'Mundo', slug: 'mundo', count: 0 },
  { id: 'cat-eco', name: 'Economia', slug: 'economia', count: 0 },
  { id: 'cat-tech', name: 'Tecnologia', slug: 'tecnologia', count: 0 },
  { id: 'cat-games', name: 'Jogos', slug: 'jogos', count: 0 },
  { id: 'cat-ent', name: 'Entretenimento', slug: 'entretenimento', count: 0 },
  { id: 'cat-sport', name: 'Esportes', slug: 'esportes', count: 0 },
  { id: 'cat-pol', name: 'Política', slug: 'política', count: 0 },
  { id: 'cat-sci', name: 'Ciência', slug: 'ciência', count: 0 },
  { id: 'cat-health', name: 'Saúde', slug: 'saúde', count: 0 },
  { id: 'cat-op', name: 'Opinião', slug: 'opinião', count: 0 },
];

const trending: TrendingItem[] = [
  { id: 't1', rank: 1, title: 'IA Generativa transforma mercado de trabalho', views: '245k' },
  { id: 't2', rank: 2, title: 'Novo PS6: Rumores e expectativas para 2026', views: '189k' },
  { id: 't3', rank: 3, title: 'Eleições 2026: Cenário político esquenta', views: '150k' },
  { id: 't4', rank: 4, title: 'Dólar atinge nova cotação histórica', views: '120k' },
];

const App: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Ref for intersection observer
  const observer = useRef<IntersectionObserver | null>(null);

  // Toggle Save Function
  const handleToggleSave = (article: Article) => {
    setSavedArticles(prev => {
      const isSaved = prev.some(a => a.id === article.id);
      if (isSaved) {
        return prev.filter(a => a.id !== article.id);
      } else {
        return [...prev, article];
      }
    });
  };

  // Reset function when category or search changes
  useEffect(() => {
    setPage(1);
    setNews([]);
    setFeatured(null);
    setHasMore(true);
    setLoading(true);
  }, [activeCategory, searchQuery]);

  // Main data fetching effect
  useEffect(() => {
    const loadNews = async () => {
      if (activeCategory === 'saved') {
        setNews(savedArticles);
        setFeatured(null);
        setLoading(false);
        setHasMore(false); // No infinite scroll for saved for now
        return;
      }

      try {
        // Determine if we are loading initial data or more data
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const articles = await fetchNews(activeCategory, searchQuery, page);
        
        if (articles.length === 0) {
          setHasMore(false);
        } else {
          if (page === 1) {
            setFeatured(articles[0]);
            setNews(articles.slice(1));
          } else {
            setNews(prev => [...prev, ...articles]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch news", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    loadNews();
  }, [activeCategory, searchQuery, page, savedArticles.length]);

  // Infinite Scroll Observer Callback
  const lastNewsElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || loadingMore || activeCategory === 'saved') return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore, activeCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory('all');
  };

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden relative selection:bg-primary/30 selection:text-white">
      
      {/* Ambient Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-blob"></div>
         <div className="absolute top-[20%] right-[-10%] w-[35%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <Navbar 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelectCategory={handleSelectCategory}
        onSearch={handleSearch}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      
      {/* Headline Carousel - Visible on all pages */}
      {!loading && (news.length > 0 || featured) && activeCategory !== 'saved' && (
         <HeadlineCarousel articles={[featured, ...news].filter((a): a is Article => a !== null)} />
      )}

      <main className="container mx-auto px-4 py-8 flex-grow relative z-10">
        
        {loading && page === 1 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] animate-pulse">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
              <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
            </div>
            <p className="mt-4 text-primary/80 font-mono tracking-widest text-sm">CARREGANDO FEED...</p>
          </div>
        ) : (
          <>
            {/* Featured Hero Section - Only show if we have a featured article and on page 1 */}
            {featured && !searchQuery && activeCategory !== 'saved' && (
              <section className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <Hero article={featured} />
              </section>
            )}

            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Main Article Grid */}
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <h2 className="text-2xl font-bold tracking-tight text-white border-l-4 border-primary pl-4 flex items-center gap-2">
                    {activeCategory === 'saved' && <Bookmark className="w-6 h-6 text-primary fill-current" />}
                    {searchQuery ? `Resultados para: "${searchQuery}"` : activeCategory === 'all' ? 'Destaques do Feed' : activeCategory === 'saved' ? 'Notícias Salvas' : categories.find(c => c.slug === activeCategory)?.name || activeCategory}
                  </h2>
                  <span className="text-xs text-muted-foreground font-mono">
                    {activeCategory === 'saved' ? news.length : 'Ao Vivo'} 
                  </span>
                </div>
                
                {news.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {news.map((article, index) => {
                      if (news.length === index + 1) {
                         // Last element, attach ref
                         return (
                            <div 
                              key={`${article.id}-${index}`}
                              ref={lastNewsElementRef}
                              className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                            >
                              <ArticleCard 
                                article={article} 
                                isSaved={savedArticles.some(a => a.id === article.id)}
                                onToggleSave={handleToggleSave}
                              />
                            </div>
                         );
                      } else {
                        return (
                          <div 
                            key={`${article.id}-${index}`}
                            className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                          >
                            <ArticleCard 
                              article={article} 
                              isSaved={savedArticles.some(a => a.id === article.id)}
                              onToggleSave={handleToggleSave}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground text-lg">
                      {activeCategory === 'saved' ? 'Você ainda não salvou nenhuma notícia.' : 'Nenhuma notícia encontrada nesta categoria.'}
                    </p>
                    {activeCategory === 'saved' && (
                      <p className="text-sm text-muted-foreground/60 mt-2">Clique no ícone de bandeira em qualquer notícia para salvá-la aqui.</p>
                    )}
                    <button onClick={() => handleSelectCategory('all')} className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">
                      Voltar ao Início
                    </button>
                  </div>
                )}
                
                {/* Infinite Scroll Loader */}
                {loadingMore && (
                  <div className="mt-12 flex flex-col items-center justify-center py-4">
                     <Loader2 className="w-8 h-8 text-primary animate-spin" />
                     <span className="text-xs text-muted-foreground mt-2">Carregando mais...</span>
                  </div>
                )}
                
                {!hasMore && news.length > 0 && activeCategory !== 'saved' && (
                  <div className="mt-12 text-center text-muted-foreground text-sm py-4 border-t border-white/5">
                    Você chegou ao fim do feed.
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:w-1/3 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                 <Sidebar trending={trending} categories={categories} latestNews={news.length > 0 ? news : savedArticles} />
              </aside>

            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;