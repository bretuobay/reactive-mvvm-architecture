import { ref, onUnmounted } from 'vue';
import { Observable } from 'rxjs';

export function useObservable<T>(observable: Observable<T>) {
  const value = ref<T | undefined>(undefined);
  const subscription = observable.subscribe({
    next: (val) => {
      value.value = val;
    },
    // TODO: Consider error handling for the observable
  });

  onUnmounted(() => {
    subscription.unsubscribe();
  });

  return value;
}
