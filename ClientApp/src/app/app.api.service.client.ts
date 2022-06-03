import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../environments/environment";

export interface IWeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
};

export interface IStudentDto {
  id: number;
  lastName: string;
  firstMidName: string;
  enrollmentDate: Date;
};

@Injectable()
export class ApiClientV1 {
  private apiPath: string;
  constructor(
    private readonly httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.apiPath = baseUrl + "api/v1"
  }

  async getWeatherForecast() {
    return this.httpClient.get(`${this.apiPath}/weatherForecast`).toPromise();
  }

  async getAllStudents() {
    return this.httpClient.get(`${this.apiPath}/schoolDemo/student/all`).toPromise();
  }

  async getStudent(id: number) {
    return this.httpClient.get(`${this.apiPath}/schoolDemo/student/${id}`).toPromise();
  }
}
