import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>
  private _color: string = 'red'
  private _errors?: ValidationErrors | null | undefined

  @Input() set color(value: string) {
    this._color = value
    this.setStyle()
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value
    this.setErrorMessage()
  }

  constructor(private element: ElementRef<HTMLElement>) {
    // console.log('Constructor de la directiva');
    // console.log(element);
    this.htmlElement = element
    // this.htmlElement.nativeElement.innerHTML = 'Hola Mundo'
  }

  ngOnInit(): void {
    // console.log('Directiva - NgOnInit');
    this.setStyle()
  }

  setStyle(): void {
    if (!this.htmlElement) return
    this.htmlElement!.nativeElement.style.color = this._color
  }

  setErrorMessage() {
    if (!this.htmlElement) return
    /* Si no hay errores */
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores'
      return
    }

    const errors = Object.keys(this._errors)
    // console.log(errors);
    /* Si el error es por campo requerido */
    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido'
      return
    }

    /* Si el error es por formato email */
    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'No tiene formato email'
      return
    }

    /* Si el error es por minLength */
    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength']
      const current = this._errors!['minlength']['actualLength']

      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres`
      return
    }

  }

}
