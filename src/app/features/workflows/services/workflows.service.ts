import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { GetAllWorkflowsSuccessfulResponseDto } from '../dto/get-all-workflows-successful-response.dto';

@Injectable({
  providedIn: 'root',
})
export class WorkflowsService {
  private readonly apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getAllWorkflows() {
    return this.http.get<GetAllWorkflowsSuccessfulResponseDto>(
      `${this.apiUrl}/workflows`
    );
  }
}
