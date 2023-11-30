import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  respuesta = '';
  public pregunta = '';


  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    { 
      const navigation = this.router.getCurrentNavigation();
      this.activatedRoute.queryParams.subscribe(params => {
        this.pregunta =params['pregunta'];
      });
      
  }

  ngOnInit() {
  }

  ingresar() {
    this.authService.comprobarRespuesta(this.respuesta);
   }

    //Arreglando botones
    public volverLogin(): void {
      this.router.navigate(['/ingreso']);
    }

}
