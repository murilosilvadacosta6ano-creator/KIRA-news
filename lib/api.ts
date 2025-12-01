import { Article } from '../types';

const API_KEY = 'a6df5bc37b6387800d4bd46a9903f33f';
const BASE_URL = 'https://newsapi.org/v2';

// Reliable placeholder images for when API images are missing or fallback is needed
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=800'
];

// Fallback data in case API limit is reached or fails (CORS issues common with NewsAPI)
const FALLBACK_ARTICLES: Article[] = [
  {
    id: 'fallback-1',
    title: 'Reativo Motta cria armadilha para Lula em sua busca por surfar a onda da segurança pública',
    excerpt: 'Análise política sobre os movimentos recentes do governo na área de segurança pública e seus impactos.',
    category: 'Política',
    author: 'Estadão',
    date: '10 Nov 2025',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5963631df?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min',
    url: '#',
    sourceUrl: 'https://estadao.com.br'
  },
  {
    id: 'fallback-2',
    title: 'Novo PS6: Rumores e expectativas para o lançamento em 2026',
    excerpt: 'Sony prepara terreno para a próxima geração de consoles com hardware revolucionário.',
    category: 'Jogos',
    author: 'IGN Brasil',
    date: '12 Nov 2025',
    imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min',
    url: '#',
    sourceUrl: '#'
  },
  {
    id: 'fallback-3',
    title: 'Dólar atinge nova cotação histórica com incertezas no mercado global',
    excerpt: 'Moeda americana sobe diante de novos dados de inflação nos Estados Unidos.',
    category: 'Economia',
    author: 'InfoMoney',
    date: '12 Nov 2025',
    imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min',
    url: '#',
    sourceUrl: '#'
  },
  {
    id: 'fallback-4',
    title: 'Microsoft revela detalhes de sua busca por superinteligência após acordo com a OpenAI',
    excerpt: 'Parceria visa acelerar o desenvolvimento de AGI segura e benéfica para a humanidade.',
    category: 'Tecnologia',
    author: 'Cryptopolitan',
    date: '06 Nov 2025',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min',
    url: '#',
    sourceUrl: '#'
  },
  {
    id: 'fallback-5',
    title: 'Verstappen Escapa de Suspensão: Uma Mudança de Jogo na F1',
    excerpt: 'Decisão da FIA gera polêmica nos bastidores e pode definir o campeonato.',
    category: 'Esportes',
    author: 'SAPO',
    date: '27 Oct 2025',
    imageUrl: 'https://images.unsplash.com/photo-1574516709324-747d6d542034?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min',
    url: '#',
    sourceUrl: '#'
  }
];

// Map app categories to NewsAPI parameters
const mapCategoryToApi = (slug: string): { param: string, value: string } => {
  switch (slug) {
    case 'brasil': return { param: 'country', value: 'br' }; // Handled by default usually
    case 'mundo': return { param: 'q', value: 'mundo' }; // NewsAPI has no 'world' category, use search
    case 'economia': return { param: 'category', value: 'business' };
    case 'tecnologia': return { param: 'category', value: 'technology' };
    case 'entretenimento': return { param: 'category', value: 'entertainment' };
    case 'esportes': return { param: 'category', value: 'sports' };
    case 'ciência': return { param: 'category', value: 'science' };
    case 'saúde': return { param: 'category', value: 'health' };
    case 'política': return { param: 'q', value: 'política' };
    case 'jogos': return { param: 'q', value: 'games' };
    case 'opinião': return { param: 'q', value: 'opinião' };
    default: return { param: 'country', value: 'br' };
  }
};

// Map NewsAPI response to App Article type
const mapNewsApiToArticle = (item: any, index: number): Article => {
  return {
    id: `newsapi-${index}-${Date.now()}-${Math.random()}`,
    title: item.title,
    excerpt: item.description || item.content || 'Clique para ler a notícia completa.',
    category: 'Notícias', // NewsAPI doesn't return category field in response
    author: item.source.name || 'Desconhecido',
    date: new Date(item.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
    // NewsAPI uses 'urlToImage'
    imageUrl: item.urlToImage || PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)],
    readTime: `${Math.ceil(Math.random() * 5 + 2)} min`,
    url: item.url,
    sourceUrl: item.url // source.url is not always available in NewsAPI, use article url
  };
};

export const fetchNews = async (categoryFilter: string = 'all', searchQuery: string = '', page: number = 1): Promise<Article[]> => {
  if (categoryFilter === 'saved') {
    return [];
  }

  try {
    const pageSize = 12; // Adjusted page size for better infinite scroll experience
    // Default endpoint: top-headlines with country=br
    let url = `${BASE_URL}/top-headlines?country=br&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;

    if (searchQuery) {
      // Search endpoint
      url = `${BASE_URL}/everything?q=${encodeURIComponent(searchQuery)}&language=pt&sortBy=publishedAt&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
    } else if (categoryFilter !== 'all') {
      const { param, value } = mapCategoryToApi(categoryFilter);
      
      if (categoryFilter === 'brasil') {
         // Default is already top-headlines?country=br
         url = `${BASE_URL}/top-headlines?country=br&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
      } else if (param === 'q') {
         // For categories not natively supported, search within Brazil context
         url = `${BASE_URL}/top-headlines?country=br&q=${encodeURIComponent(value)}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
      } else {
         // Native categories (technology, sports, etc)
         url = `${BASE_URL}/top-headlines?country=br&category=${value}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
      }
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`NewsAPI Error: ${response.status} ${response.statusText}. Using fallback data.`);
      // If page 1 fails, return fallback. If page > 1 fails, return empty to stop scroll.
      return page === 1 ? FALLBACK_ARTICLES : [];
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      return page === 1 ? FALLBACK_ARTICLES : [];
    }

    const articles = data.articles.map((item: any, index: number) => {
      const article = mapNewsApiToArticle(item, index);
      
      // Assign category label for UI
      if (categoryFilter !== 'all') {
        const catName = categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1);
        article.category = catName;
      } else {
        article.category = 'Destaque';
      }
      return article;
    });

    // Remove articles without images to maintain quality if possible, or keep them if too few
    const validArticles = articles.filter((a: Article) => a.imageUrl && a.title !== '[Removed]');
    
    return validArticles.length > 0 ? validArticles : articles;

  } catch (error) {
    console.warn("Using fallback news due to fetch error:", error);
    return page === 1 ? FALLBACK_ARTICLES : [];
  }
};