import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiClientV1, IStudentDto } from '../app.api.service.client';

@Component({
  selector: 'app-db-demo-component',
  templateUrl: './db-demo.component.html'
})
export class DbDemoComponent {
  public currentCount = 0;
  public allStudents: IStudentDto[] = [];

  constructor(
    private readonly apiClient: ApiClientV1
  ) {}

  async ngOnInit() {
    try {
      this.allStudents = (await this.apiClient.getAllStudents()) as IStudentDto[];
      console.log(`get # of students: ${this.allStudents.length}.`);

      //var resp = (await this.apiClient.getStudent(9)) as IStudentDto;
      //console.log(`get student: ${resp}.`);
    } catch (err) {
      console.error((err as HttpErrorResponse).message);
    }
  }

  public incrementCounter() {
    this.currentCount++;
  }
}
