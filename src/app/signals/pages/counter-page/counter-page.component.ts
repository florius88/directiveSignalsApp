import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {

  public counter = signal(10)
  // Esta es una señal de sólo lectura
  public squareCounter = computed(() => this.counter() * this.counter())

  /**
   * Hace un update de la señal
   * @param value
   */
  increaseBy(value: number) {
    /* Esta es una forma de hacerlo, pero más "fea"
    this.counter.set(this.counter() + value) */
    this.counter.update(current => current + value)
  }

}
