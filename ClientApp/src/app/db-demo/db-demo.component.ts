import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiClientV1, IStudentDto } from '../app.api.service.client';
import { InformationBoxService } from '../core/services/information-box.service';
import { LoadingScreenService } from '../core/services/loading-screen.service';

@Component({
  selector: 'app-db-demo-component',
  templateUrl: './db-demo.component.html'
})
export class DbDemoComponent {
  public currentCount = 0;
  public allStudents: IStudentDto[] = [];

  constructor(
    private readonly apiClient: ApiClientV1,
    private readonly loadingScreenService: LoadingScreenService,
    private readonly informationBoxService: InformationBoxService
  ) {}

  async ngOnInit() {
    try {
      this.loadingScreenService.setLoading(true);

      this.allStudents = await this.apiClient.getAllStudents() as IStudentDto[];
      this.informationBoxService.show(`get # of students: ${this.allStudents.length}.`);
    } catch (err) {
      var errMsg = (err as HttpErrorResponse).message;
      this.informationBoxService.show(errMsg, "alert-danger");
      console.error(errMsg);
    } finally {
      this.loadingScreenService.setLoading(false);
    }
  }

  public incrementCounter() {
    this.currentCount++;
  }
}
