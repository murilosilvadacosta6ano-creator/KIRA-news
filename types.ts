export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string; // Used as Source
  date: string;
  imageUrl: string;
  readTime: string;
  url: string;
  sourceUrl?: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface TrendingItem {
  id: string;
  rank: number;
  title: string;
  views: string;
}