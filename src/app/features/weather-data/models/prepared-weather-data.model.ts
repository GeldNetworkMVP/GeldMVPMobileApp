import { CurrentLocation } from './current-location.model';
import { PreparedWeather } from './prepared-weather.model';

export type PreparedWeatherData = {
  location: CurrentLocation;
  current: PreparedWeather;
};
