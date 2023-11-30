import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';

import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ]
})
export class CorreoPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController, private navCtrl: NavController) { }

  correo = '';

  ngOnInit() {
  }

  ingresar() {
    this.authService.comprobarCorreo(this.correo);
   }

  public volverLogin(): void {
    this.router.navigate(['/ingreso']);
  }

}
