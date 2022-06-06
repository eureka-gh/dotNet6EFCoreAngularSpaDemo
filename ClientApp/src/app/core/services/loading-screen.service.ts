import { Observable, Subject, BehaviorSubject, ConnectableObservable, timer, of, merge } from "rxjs";
import { map, distinctUntilChanged, publishBehavior, switchMap, delayWhen } from "rxjs/operators";
import { Injectable } from "@angular/core";

// setLoading(true) - increment {loading} immediately; update {loadingVisible} after delay
// setLoading(true, true) - increment {loading} immediately; update {loadingVisible} immediately
// setLoading(false) -> decrement {loading} immediately, update {loadingVisible} immediately
// setLoading(false, true) -> set {loading} to 0 immediately, update {loadingVisible} immediately
@Injectable()
export class LoadingScreenService {
    private static showTimer = timer(250);

    private loadingSubject = new BehaviorSubject(0);
    private forceSyncSubject = new Subject();

    loading: Observable<boolean>;
    loadingVisible: Observable<boolean>;

    constructor() {
        (this.loading = this.loadingSubject.pipe(
            map(x => !!x),
            distinctUntilChanged(),
            publishBehavior(false)
        ) as ConnectableObservable<boolean>).connect();

        (this.loadingVisible = this.loading.pipe(
            switchMap(loading =>
                loading
                    ? of(loading).pipe(delayWhen(() => merge(LoadingScreenService.showTimer, this.forceSyncSubject)))
                    : of(loading)
            ),
            distinctUntilChanged(),
            publishBehavior(false)
        ) as ConnectableObservable<boolean>).connect();

        // this.loading.subscribe(x => console.log(`${new Date().getTime()}: loading = ${x}`));
        // this.loadingVisible.subscribe(x => console.log(`${new Date().getTime()}: loadingVisible = ${x}`));
    }

    setLoading(loading: boolean, force = false) {
        // console.log(`${new Date().getTime()}: setLoading(${loading}, ${force})`)
        if (loading) {
            this.loadingSubject.next(this.loadingSubject.value + 1);
            if (force) {
                this.forceSyncSubject.next(null);
            }
        } else {
            this.loadingSubject.next(force ? 0 : this.loadingSubject.value && this.loadingSubject.value - 1);
        }
    }
}
