export interface RsvpData {
  id?: string;
  name: string;
  status: 'hadir' | 'tidak_hadir' | 'ragu';
  guestsCount: number;
  message: string;
  createdAt: number;
}

export interface WishData {
  id?: string;
  name: string;
  message: string;
  createdAt: number;
}

export interface LoveStoryEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface WeddingEvent {
  title: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  dressCode?: string;
  notes?: string;
}
