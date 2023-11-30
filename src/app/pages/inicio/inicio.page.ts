// import { AuthService } from 'src/app/services/auth.service';
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { QrComponent } from 'src/app/components/qr/qr.component';
// import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
// import { ForoComponent } from 'src/app/components/foro/foro.component';
// import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
// import { DataBaseService } from 'src/app/services/data-base.service';
// import { APIClientService } from 'src/app/services/apiclient.service';

// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-inicio',
//   templateUrl: './inicio.page.html',
//   styleUrls: ['./inicio.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule, FormsModule,
//     QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent]
// })
// export class InicioPage implements OnInit {

//   componente_actual = 'qr';

//   nombre = '';
//   apellido ='';

//   constructor(
//     private authService: AuthService, 
//     private bd: DataBaseService,
//     private activatedRoute: ActivatedRoute, 

//     private api: APIClientService) {
//       this.activatedRoute.queryParams.subscribe(params => {
//         this.nombre = params['nombre'];
//         this.apellido = params['apellido'];
//       });

//      }

//   ngOnInit() {
//     this.componente_actual = 'qr';
//     this.bd.datosQR.next('');
//   }

//   cambiarComponente(nombreComponente: string) {
//     this.componente_actual = nombreComponente;
//     if (this.componente_actual === 'foro') this.api.cargarPublicaciones();
//     if (this.componente_actual === 'misdatos') this.authService.leerUsuarioAutenticado();
//   }

//   cerrarSesion() {
//     this.authService.logout();
//   }

// }

import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { DataBaseService } from 'src/app/services/data-base.service';
import { APIClientService } from 'src/app/services/apiclient.service';
import { Usuario } from 'src/app/model/usuario';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent, AdminComponent]
})
export class InicioPage implements OnInit {

  componente_actual = 'qr';
  usuario: any = {};  // Asegúrate de que esta propiedad tenga un tipo adecuado
  adm=false;

  nombre = '';
  apellido ='';

  constructor(
    private authService: AuthService,
    private bd: DataBaseService,
    private activatedRoute: ActivatedRoute,

    private api: APIClientService) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.nombre = params['nombre'];
        this.apellido = params['apellido'];
      });

     }

     ngOnInit() {
      if (this.nombre.toLowerCase() === 'admin') {
        this.componente_actual = 'admin';
      } else {
        this.componente_actual = 'qr';
        this.bd.datosQR.next('');
        this.leerDatosUsuario();
      }
    }


  async leerDatosUsuario() {
    const usuario = await this.authService.leerUsuarioAutenticado();
    if (usuario) {
      this.usuario = usuario;
    }
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (this.componente_actual === 'foro') this.api.cargarPublicaciones();
    if (this.componente_actual === 'misdatos') this.authService.leerUsuarioAutenticado();
    // Solo carga el componente admin si el usuario es admin
    if (this.componente_actual === 'admin') {
      this.authService.leerUsuarioAutenticado();
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }

}
