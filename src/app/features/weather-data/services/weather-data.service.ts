import { HttpClient, HttpParams } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Subject, interval, switchMap, takeUntil, timer } from 'rxjs';

import { WeatherApiSuccessfulResponseDto } from '../dto/wether-api-successful-response.dto';
import { Coordinate } from '../models/coordinate.model';
import { PreparedWeatherData } from '../models/prepared-weather-data.model';
import { WeatherData } from '../models/weather-data.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private readonly httpClient = inject(HttpClient);
  private readonly weatherApiUrl = 'https://api.weatherapi.com/v1/current.json';
  private readonly apiKey = '136be96ca18c448abf7110222242008';

  private getWeatherData(coordinate: Coordinate) {
    const queryParams = new HttpParams()
      .set('key', this.apiKey)
      .set('q', `${coordinate.lat},${coordinate.lon}`)
      .set('aqi', 'no');

    return this.httpClient.get<WeatherApiSuccessfulResponseDto>(
      this.weatherApiUrl,
      { params: queryParams }
    );
  }

  public prepareWeatherData(data: WeatherData): PreparedWeatherData {
    return {
      location: data.location,
      current: {
        ...data.current,
        last_updated_as_date: new Date(data.current.last_updated),
      },
    };
  }

  public async setupPeriodicallyUpdatingWeatherDataSubscription(
    period: number,
    takeUntilDestroyed: Subject<void>
  ) {
    const position = await Geolocation.getCurrentPosition();
    const coordinate = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    const weatherDataSubscription = timer(0, period).pipe(
      takeUntil(takeUntilDestroyed),
      switchMap(() => this.getWeatherData(coordinate))
    );

    return weatherDataSubscription;
  }
}
