import * as Rx from 'rxjs';

import { Observable } from 'dexie';

export function dexieToRx<T>(o: Observable<T>): Rx.Observable<T> {
  return new Rx.Observable<T>((observer) => {
    const subscription = o.subscribe({
      next: (value: any) => observer.next(value),
      error: (error: any) => observer.error(error)
    });
    return () => subscription.unsubscribe();
  });
}
