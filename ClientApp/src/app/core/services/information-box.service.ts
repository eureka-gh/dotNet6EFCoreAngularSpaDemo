import { Observable, Subject, Subscription, timer } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class InformationBoxService {
    static hideDelay = 5000;

    private _message: string = "";
    private _alertClass: string = "";
    private visibleSubject = new Subject<boolean>();
    private hideSubscription = Subscription.EMPTY;

    get message() {
        return this._message;
    }
    get alertClass() {
        return this._alertClass;
    }
    visible: Observable<boolean>;

    constructor() {
        this.visible = this.visibleSubject;
        // this.visible.subscribe(x => console.log(`visible = ${x}`));
    }

    show(
        message: string,
        alertClass: "alert-info" | "alert-danger" | "alert-success" | "alert-warning" = "alert-info"
    ) {
        this._message = message;
        this._alertClass = alertClass;
        this.visibleSubject.next(true);

        this.hideSubscription.unsubscribe();
        this.hideSubscription = timer(InformationBoxService.hideDelay).subscribe(() => {
            this.visibleSubject.next(false);
        });
    }

    hide() {
        this.visibleSubject.next(false);

        this.hideSubscription.unsubscribe();
    }
}