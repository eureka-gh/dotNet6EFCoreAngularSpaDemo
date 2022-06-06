import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

import { InformationBoxService } from "../../services/information-box.service";
import { BaseComponent } from "../base.component";

@Component({
    selector: "em-information-box",
    templateUrl: "./information-box.component.html",
    styleUrls: ["./information-box.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationBoxComponent extends BaseComponent {
    visible: boolean = false;

    constructor(public informationBoxService: InformationBoxService, changeDetectorRef: ChangeDetectorRef) {
        super();
        this.addSubscription(
            informationBoxService.visible.subscribe(x => {
                this.visible = x;
                changeDetectorRef.markForCheck();
            })
        );
    }
}