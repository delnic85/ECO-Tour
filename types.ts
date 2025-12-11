export enum ViewState {
  HOME = 'HOME',
  MAP = 'MAP',
  ITINERARIES = 'ITINERARIES',
  RULES = 'RULES',
  PRODUCTS = 'PRODUCTS',
  ABOUT = 'ABOUT'
}

export interface POI {
  id: string;
  title: string;
  description: string;
  ecoTip: string;
  image: string;
  category: 'historic' | 'nature' | 'production';
  lat: number;
  lng: number;
}

export interface GreenRule {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sustainabilityFactor: string;
  image: string;
}
