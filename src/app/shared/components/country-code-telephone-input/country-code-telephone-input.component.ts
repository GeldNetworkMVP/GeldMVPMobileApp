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

  ngOnInit() {
    const countryCodeControl = this.form().get('countryCode');
    const numberControl = this.form().get('number');
    console.log(countryCodeControl, numberControl);

    this.form().valueChanges.subscribe((value) => {
      console.log(value);
    });
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
