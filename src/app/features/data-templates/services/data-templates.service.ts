import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";

import { GetDataTemplatesOfLoggedInUserSuccessfulResponseDto } from "@data-templates/dto/get-data-templates-of-logged-in-user-successful-response.dto";

@Injectable({providedIn: 'root'})
export class DataTemplatesService {
    private readonly apiUrl = environment.apiUrl;

    http = inject(HttpClient);

    getDataTemplatesOfLoggedInUser() {
        const tempUserId = "0110" 
        return this.http.get<GetDataTemplatesOfLoggedInUserSuccessfulResponseDto>(
            `${this.apiUrl}/geldtemplate/user/${tempUserId}`
          );
    }
    saveDataTemplate(templateData: any) {
        return this.http.post(`${this.apiUrl}/geldtemplate/save`, templateData);
    }
}