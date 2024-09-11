import { DatePipe } from '@angular/common';
import { Component, inject, input, OnDestroy, signal } from '@angular/core';
import { WeatherData } from '@app/features/weather-data/models/weather-data.model';
import { WeatherDataService } from '@app/features/weather-data/services/weather-data.service';
import { IonContent } from '@ionic/angular/standalone';
import { Subject, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [DatePipe, IonContent],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
})
export class WeatherDisplayComponent implements OnDestroy {
  private readonly weatherDataService = inject(WeatherDataService);
  private readonly takeUntilRef = new Subject<void>();

  weatherData = signal<WeatherData | null>(null);
  isWeatherDataLoading = signal<boolean>(false);
  weatherDataError = signal<string | null>(null);
  currentDate = signal<Date>(new Date());
  private dateUpdateSubscription: Subscription;

  constructor() {
    this.isWeatherDataLoading.set(true);
    this.weatherDataService
      .setupPeriodicallyUpdatingWeatherDataSubscription(
        15 * 60 * 1000 /* 15 minutes */,
        this.takeUntilRef
      )
      .then((subscription) => {
        subscription.subscribe({
          next: (value) => {
            if (!this.weatherData()) {
              this.isWeatherDataLoading.set(false);
            }
            console.log(value);
            this.weatherData.set(value);
          },
          error: (error) => {
            this.weatherDataError.set(error.message);
            this.isWeatherDataLoading.set(false);
          },
        });
      });

    this.dateUpdateSubscription = timer(0, 1000).subscribe(() => {
      this.currentDate.set(new Date());
    });
  }

  public ngOnDestroy() {
    this.takeUntilRef.next();
    this.takeUntilRef.complete();

    if (this.dateUpdateSubscription) {
      this.dateUpdateSubscription.unsubscribe();
    }
  }
}
