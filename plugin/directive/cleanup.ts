import type { Cleanup } from '../type';

const elementCleanups = new WeakMap<HTMLElement, Cleanup[]>();

export const addElementCleanup = (el: HTMLElement, cleanup: Cleanup): void => {
  const cleanups = elementCleanups.get(el) || [];
  cleanups.push(cleanup);
  elementCleanups.set(el, cleanups);
};

export const cleanupElement = (el: HTMLElement): void => {
  const cleanups = elementCleanups.get(el);
  if (!cleanups) return;

  cleanups.forEach((cleanup) => cleanup());
  elementCleanups.delete(el);
};

