import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { showToast } from 'src/app/tools/message-routines';
import { Usuario } from '../model/usuario';
import { Storage } from '@ionic/storage-angular';
import { DataBaseService } from './data-base.service';

@Injectable()

export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);
  
  constructor(private router: Router, 
    private bd: DataBaseService, 
    private storage: Storage) { }

  async inicializarAutenticacion() {
    await this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario) as Usuario;
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  guardarUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }

  eliminarUsuarioAutenticado(usuario: Usuario) {
    this.storage.remove(this.keyUsuario);
    this.usuarioAutenticado.next(null);
  }

  async login(correo: string, password: string) {

    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.router.navigate(['inicio']);
      } else {
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido(a) ${usuario.nombre} ${usuario.apellido}!`);
            this.guardarUsuarioAutenticado(usuario);
            this.router.navigate(['inicio'], { queryParams: { nombre: usuario.nombre, apellido: usuario.apellido } });
          } else {
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        });
      }
    });
  }

    // De Correo a Pregunta
    async comprobarCorreo(correo: string) {
      await this.bd.validarCorreo(correo).then(async (usuario: Usuario | undefined) => {
        if (usuario) {
          this.router.navigate(['pregunta'], { queryParams: { pregunta: usuario.preguntaSecreta} });
        } else {
          this.router.navigate(['incorrecto']);
        }
      });
    }
  
    // De Preguna a correcto o incorrecto
    async comprobarRespuesta(respuestaSecreta: string) {
      await this.bd.validarRespuesta(respuestaSecreta).then(async (usuario: Usuario | undefined) => {
        if (usuario) {
          this.router.navigate(['correcto'], { queryParams: { password: usuario.password} });
        } else {
          showToast(`El correo o la password son incorrectos`);
          this.router.navigate(['incorrecto']);
        }
      });
    }
  

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.eliminarUsuarioAutenticado(usuario);
      }
      this.router.navigate(['ingreso']);
    })
  }

}
