import { HttpClient, HttpParams } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Coordinate } from '../models/coordinate.model';
import { WeatherApiSuccessfulResponseDto } from '../dto/wether-api-successful-response.dto';
import { Subject, interval, switchMap, takeUntil, timer } from 'rxjs';

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
