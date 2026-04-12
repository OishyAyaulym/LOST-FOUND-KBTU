export interface Category {
  id: number;
  name: string;
  icon?: string; 
}

export interface Item {
  id?: number;
  title: string;
  description: string;
  location: string;
  status: 'lost' | 'found' | 'returned';
  category: number;
  image_url?: string;
  created_at?: string;
}