import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { GetStageByNameSuccessfulResponseDto } from '../dto/get-stage-by-name-successful-response.dto';

@Injectable({
  providedIn: 'root',
})
export class StagesService {
  private readonly apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getStageByName(stageName: string) {
    return this.http.get<GetStageByNameSuccessfulResponseDto>(
      `${this.apiUrl}/stagename/${stageName}`
    );
  }

  getExistingStages(stages: string[]) {
    return this.http.post<string[]>(
      `${this.apiUrl}/stage/exists`,
      {
        stagearray: stages,
      }
    );
  }
}
