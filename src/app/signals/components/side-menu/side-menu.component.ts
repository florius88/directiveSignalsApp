import { Component, signal } from '@angular/core';


interface MenuItem {
  title: string,
  route: string,
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  /* Esta es la manera tradicional
  public menuItems: MenuItem[] = [
    {title: 'Contador', route: 'counter'},
    {title: 'Usuario', route: 'user-info'},
    {title: 'Mutaciones', route: 'properties'},
  ] */

  // Esta es una signal
  public menuItems = signal<MenuItem[]>([
    {title: 'Contador', route: 'counter'},
    {title: 'Usuario', route: 'user-info'},
    {title: 'Mutaciones', route: 'properties'},
  ])

}
