import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const untilDestroyedSymbol = Symbol('untilDestroyed');

/**
 * RxJS operator that unsubscribe from observables on destory.
 * Code forked from https://github.com/NetanelBasal/ngx-take-until-destroy
 *
 * IMPORTANT: Add the `untilDestroyed` operator as the last one to prevent leaks with intermediate observables in the
 * operator chain.
 *
 * @param instance The parent Angular component or object instance.
 * @param destroyMethodName The method to hook on (default: 'ngOnDestroy').
 * @example
 * ```
 * import { untilDestroyed } from '@core';
 *
 * @Component({
 * selector: 'app-example',
 *   templateUrl: './example.component.html'
 * })
 * export class ExampleComponent implements OnInit, OnDestroy {
 *   ngOnInit() {
 *     interval(1000)
 *       .pipe(untilDestroyed(this))
 *       .subscribe();
 *   }
 *
 *   // This method must be present, even if empty.
 *   ngOnDestroy() {
 *     // To protect you, an error will be thrown if it doesn't exist.
 *   }
 * }
 * ```
 */
export function untilDestroyed(instance: object, destroyMethodName: string = 'ngOnDestroy') {
  return <T>(source: Observable<T>) => {
    // @ts-ignore
    const originalDestroy = instance[destroyMethodName];
    const hasDestroyFunction = typeof originalDestroy === 'function';

    if (!hasDestroyFunction) {
      throw new Error(
        `${instance.constructor.name} is using untilDestroyed but doesn't implement ${destroyMethodName}`,
      );
    }

    // @ts-ignore
    if (!instance[untilDestroyedSymbol]) {
      // @ts-ignore
      instance[untilDestroyedSymbol] = new Subject();
      // @ts-ignore
      instance[destroyMethodName] = function () {
        if (hasDestroyFunction) {
          originalDestroy.apply(this, arguments);
        }
        // @ts-ignore
        instance[untilDestroyedSymbol].next();
        // @ts-ignore
        instance[untilDestroyedSymbol].complete();
      };
    }
    // @ts-ignore
    return source.pipe(takeUntil<T>(instance[untilDestroyedSymbol]));
  };
}
