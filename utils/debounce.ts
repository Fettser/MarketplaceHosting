/**
 * Вспомогательная функция ограничения числа вызовов слушателя событий
 * @param fn - функция-слушатель
 * @param ms - минимальное время перерыва вызовов
 */

export const debounce = (fn: (...params: any[]) => any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}
