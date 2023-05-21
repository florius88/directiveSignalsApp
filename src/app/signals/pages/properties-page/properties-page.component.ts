import { Component, computed, signal } from '@angular/core';

import { User } from '../../interfaces/user-request.interface';


@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent {

  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  })

  public fullName = computed(() => `${this.user()?.first_name} ${this.user()?.last_name}`)


  onFieldUpdated(field: keyof User, value: string) {
    // console.log(field, value);

    /* Esto es potencialmente inseguro ya que, si le paso una propiedad nueva
    que no exista, la va a crear
    Para solucionar esto, vamos a recibir en field, en vez de un string,
    un keyof User */
    /* Pero aún así, hay una manera más "elegante" de hacerlo
    this.user.set({
      ...this.user(),
      [field]: value,
    }) */

    /* Cualquier mutación que suceda en este objeto current,
      va a disparar un nuevo valor en la señal */
    this.user.mutate(current => {
      // current.first_name = 'Hola Mundo'

      switch (field) {
        case 'id':
          current.id = Number(value)
          break

        case 'email':
          current.email = value
          break

        case 'first_name':
          current.first_name = value
          break

        case 'last_name':
          current.last_name = value
          break
      }

    })

    /* Esta sería otra opción, pero no es del todo correcta ya que,
    si mando el campo id y el value es string, nos daría un error
    porque el id es un number
    this.user.update( current => {
      return {
        ...current,
        [field]: value
      }
    }) */

  }

}
