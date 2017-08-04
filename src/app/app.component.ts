import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; 

@Component({
  /**
   *  selector indiquer à Angular ce qu’il faudra chercher dans nos pages HTML. 
   *  A chaque fois que le sélecteur défini sera trouvé dans
   *  notre HTML, Angular remplacera l’élément sélectionné par notre composant :
   */
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ng4JobBoard';

  constructor(private authService: AuthService) {}
}
