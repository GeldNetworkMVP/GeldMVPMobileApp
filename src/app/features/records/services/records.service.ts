import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetRecordByIdSuccessfulResponseDto } from '../dto/get-record-by-id-successful-response.dto';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private readonly apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getRecordById(recordId: string) {
    return this.http.get<GetRecordByIdSuccessfulResponseDto>(
      `${this.apiUrl}/records/${recordId}`
    );
  }
}
