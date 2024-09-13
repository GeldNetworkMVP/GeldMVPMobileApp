import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { WeatherDataService } from '@weather-data/services/weather-data.service';

import { PreparedWeatherData } from '../../models/prepared-weather-data.model';
``
@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [DatePipe, IonContent, ProgressSpinnerModule],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
})
export class WeatherDisplayComponent implements OnDestroy {
  private readonly weatherDataService = inject(WeatherDataService);
  private readonly takeUntilRef = new Subject<void>();

  weatherData = signal<PreparedWeatherData | null>(null);
  isWeatherDataLoading = signal<boolean>(false);
  weatherDataError = signal<string | null>(null);

  constructor() {
    this.isWeatherDataLoading.set(true);
    this.weatherDataService
      .setupPeriodicallyUpdatingWeatherDataSubscription(
        environment.weatherRefreshInterval,
        this.takeUntilRef
      )
      .then((subscription) => {
        subscription
          .pipe(map((data) => this.weatherDataService.prepareWeatherData(data)))
          .subscribe({
            next: (value) => {
              if (!this.weatherData()) {
                this.isWeatherDataLoading.set(false);
              }
              this.weatherData.set(value);
              this.weatherDataError.set(null);
            },
            error: (error) => {
              this.weatherDataError.set(error.message);
              this.isWeatherDataLoading.set(false);
            },
          });
      });
  }

  public ngOnDestroy() {
    this.takeUntilRef.next();
    this.takeUntilRef.complete();
  }
}
