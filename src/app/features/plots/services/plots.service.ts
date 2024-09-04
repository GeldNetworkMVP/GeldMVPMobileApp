import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllPlotsSuccessfulResponseDto } from '../dto/get-all-plots-successful-response.dto';

@Injectable({
  providedIn: 'root',
})
export class PlotsService {
  private readonly apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getAllPlots() {
    return this.http.get<GetAllPlotsSuccessfulResponseDto>(
      `${this.apiUrl}/plotrecord`
    );
  }
}
