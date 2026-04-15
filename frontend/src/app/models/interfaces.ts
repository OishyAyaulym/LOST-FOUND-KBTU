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
  status: 'available' | 'under_review' | 'returned';
  type: 'Lost' | 'Found';
  category: string;
  imageUrl: string;
  date: string;
  postedBy: string;
}