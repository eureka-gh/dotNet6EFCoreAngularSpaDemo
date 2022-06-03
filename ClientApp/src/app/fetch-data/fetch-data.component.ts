import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiClientV1, IWeatherForecast } from '../app.api.service.client';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: IWeatherForecast[] = [];

  constructor(
    private readonly apiClient: ApiClientV1,
  ) {}

  async ngOnInit() {
    try {
      this.forecasts = (await this.apiClient.getWeatherForecast()) as IWeatherForecast[];
    } catch (err) {
      alert(`unable to fetch data, error: ${(err as HttpErrorResponse).message}`);
    }
  }
}
