import { CurrentLocation } from './current-location.model';
import { CurrentWeather } from './current-weather.model';

export interface WeatherData {
  location: CurrentLocation;
  current: CurrentWeather;
}
