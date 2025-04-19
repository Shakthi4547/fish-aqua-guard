export interface TemperatureData {
  time: string;
  value: number;
}

export interface PhHistoryData {
  time: string;
  value: number;
}

export interface Notification {
  id: string;
  type: 'temperature' | 'ph' | 'feed' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface AquariumData {
  temperatureHistory: TemperatureData[];
  currentTemperature: number;
  feedLevel: number;
  phValue: number;
  phHistory: PhHistoryData[];
  notifications: Notification[];
}