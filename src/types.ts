export type EventCategory = 'all' | 'weddings' | 'barmitzvah' | 'corporate' | 'memorials';

export interface GalleryEventItem {
  id: string;
  title: string;
  location: string;
  date?: string;
  description?: string;
  categories: string; // Comma-separated category names (e.g. "טקסים לעיריית ירושלים, הנחיית מופעים")
  folder?: string;
  images: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category?: EventCategory;
  categoryLabel?: string;
  subtitle: string;
  fullDescription: string;
  imageUrl: string;
  images: string[];
  date: string;
  location: string;
  isHighlight?: boolean;
  aspectRatio?: 'square' | 'tall' | 'wide';
  tags: string[];
}

export interface SpeechParagraph {
  text: string;
  cue?: string;
}

export interface SpeechSample {
  id: string;
  title: string;
  category: EventCategory;
  categoryLabel: string;
  targetAudience: string;
  estimatedDurationMin: number;
  wordCount: number;
  excerpt: string;
  paragraphs: SpeechParagraph[];
  authorNote: string;
  structureHighlights: {
    stage: string;
    explanation: string;
  }[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  eventType: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  date: string;
}

export interface SpeechItem {
  id: string;
  title: string;
  category: string;
  subject: string;
  authorNote?: string;
  content: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  date?: string;
  content: string;
  rating?: number;
  avatarUrl?: string;
  subject?: string;
  attachment?: string | {
    type?: 'pdf' | 'image';
    url: string;
    title?: string;
  };
}

export interface ContactMessageData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  message: string;
}
