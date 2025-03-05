
export interface UserProfile {
  name: string;
  email: string;
  favoriteCount: number;
  searchCount: number;
  recentSearches: {
    id: string;
    query: string;
    date: string;
  }[];
  recentViews: {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    price: number;
  }[];
  notifications: {
    id: string;
    message: string;
    date: string;
    read: boolean;
  }[];
  memberSince: string;
  lastLogin: string;
}
