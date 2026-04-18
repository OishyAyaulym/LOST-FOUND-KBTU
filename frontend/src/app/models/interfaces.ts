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
  images:ItemImage[];
  date: string;
  postedBy: string;
}

export interface ItemImage{
  image_url:string;
}


export interface Claim {
  id?: number;     
  description: string;
  item: number;  
  status?: 'pending' | 'approved' | 'rejected'; 
  user?:number;
  created_at?: string; 

}

export interface User {
  id: number;
  email: string;
  fullName: string;
  studentId: string;
}

export interface Comment {
  id: number;
  itemId: number;
  authorName: string;
  text: string;
  createdAt: string;
}