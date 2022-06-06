import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from "@angular/core";

import { LoadingScreenService } from "../../services/loading-screen.service";
import { BaseComponent } from "../base.component";

@Component({
  selector: "em-loading-screen",
  templateUrl: "./loading-screen.component.html",
  styleUrls: ["./loading-screen.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingScreenComponent extends BaseComponent implements OnInit {
  loading = false;
  loadingVisible = false;

  constructor(
    private readonly loadingScreenService: LoadingScreenService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.loadingScreenService.loading.subscribe(x => {
          this.loading = x;
          this.changeDetectorRef.detectChanges();
      })
    );
    this.addSubscription(
      this.loadingScreenService.loadingVisible.subscribe(x => {
          this.loadingVisible = x;
          this.changeDetectorRef.detectChanges();
      })
    );
  }
}