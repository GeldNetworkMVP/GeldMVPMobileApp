import { Component, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICountry, NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { commonModules } from '@shared/common.modules';

@Component({
  standalone: true,
  selector: 'app-country-code-telephone-input',
  templateUrl: './country-code-telephone-input.component.html',
  styleUrls: ['./country-code-telephone-input.component.scss'],
  imports: [NgxCountriesDropdownModule, InputTextModule, ...commonModules],
})
export class CountryCodeInputComponent implements OnInit {
  form = input.required<
    FormGroup<{
      countryCode: FormControl<string | null>;
      number: FormControl<string | null>;
    }>
  >();

  defaultCountryCode = input<string>('GB');

  ngOnInit() {
    if (!this.form().get('countryCode')?.value) {
      this.form().get('countryCode')?.setValue(this.defaultCountryCode());
    }
  }

  onCountryChange(country: ICountry) {
    const code = country.dialling_code;
    this.form()
      .get('countryCode')
      ?.setValue(code ?? null);
  }

  onNumberChange(event: Event) {
    const number = (event.target as HTMLInputElement).value;
    this.form().get('number')?.setValue(number);
  }
}
