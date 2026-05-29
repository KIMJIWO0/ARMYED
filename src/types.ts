export interface Clue {
  id: string;
  title: string;
  room: string;
  text: string;
  details?: string;
  dateCollected?: string;
}

export interface Room {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  unlocked: boolean;
  time: string;
  description: string;
  required: string | null;
}

export interface InvestigationPoint {
  id: string;
  name: string;
  x: string; // Tailwind percentage position, e.g., '12%'
  y: string; // Tailwind percentage position, e.g., '28%'
  clueId: string;
  hint: string;
  description: string;
}

export type PageType = 'home' | 'roomSelect' | 'room1' | 'room2' | 'devNote' | 'settings' | 'menu' | 'accusation' | 'ending';
