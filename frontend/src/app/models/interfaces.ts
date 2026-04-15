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

export interface Claim {
  id?: number;
  itemId: number;       // Важно: itemId (как в сериализаторе), а не item
  description: string;
  status?: 'pending' | 'approved' | 'rejected'; 
  date?: string;        // Важно: date (как в сериализаторе), а не created_at
}
