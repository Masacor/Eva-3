import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController  } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresoPage implements OnInit {

  correo = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController)  { }

  ngOnInit() {
  }

  ingresar() {
    this.authService.login(this.correo, this.password);
  }

  public ingresarPaginaValidarCorreo(): void {
    this.router.navigate(['/correo']);
  }

  public xd(): void {
    this.router.navigate(['/registro']);
  }

}



