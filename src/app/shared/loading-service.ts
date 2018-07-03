/**
 * Useful when a service need to indicate to the components or other
 * service that is using it when its loading or making some network operations
 *
 * They can subscribe and know when everything is done
 */


import {filter} from 'rxjs/operators';
import { Observable ,  BehaviorSubject ,  Subject } from 'rxjs';

export class LoadingService {
  /**
   * To indicate when we are loading
   */
  protected loading: Subject<boolean>;

  /**
   * Set the behavior subject to indicate that we are loading
   */
  imLoading() {
    this.loading = new Subject<boolean>();
  }

  /**
   * The wait finished
   */
  loadingDone() {
    // Indicate that we are not longer loading
    this.loading.next(false);
    // Close the subject
    this.loading.complete();
  }

  /**
   * Observable to indicate that we are loading or fetching users.
   * This will emit something only when finish to load
   *
   * @returns {Observable<boolean>} To subscribe and know it loads
   */
  isLoading(): Observable<boolean> {
    return this.loading.asObservable().pipe(
      // Emit something only when it loads
      filter((res: boolean) => res === false));
  }
}
