import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {
    private readonly subscriptions: Subscription[] = [];

    private destroyed = false;

    ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.destroyed = true;
    }

    protected addSubscription(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    protected async timeout(timeout?: number) {
        await this.rejectOnDestroy(new Promise(resolve => setTimeout(resolve, timeout)));
    }

    protected async rejectOnDestroy<T>(promise: Promise<T>) {
        const result = await promise;
        if (this.destroyed) {
            //throw new ExpectedError("Disposed");
            console.log("rejectOnDestroy(), this.destroyed == true");
        }
        return result;
    }
}