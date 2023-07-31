export interface Forecast {
  location: string;
  temperature: number;
  description: string;
  feelsLike: number;
  wind: string;
  visibility: string;
  humidity: number;
  pressure: number;
  icon: string;
  dewPoint: number;
}

export type Location = { title: string; id: number };
