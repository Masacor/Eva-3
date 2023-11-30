//admin.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class AdminComponent  implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private servicioBD: DataBaseService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.servicioBD.obtenerUsuarios().then((usuarios) => {
      // Filtra los usuarios que no se llamen "admin"
      this.usuarios = usuarios.filter(usuario => usuario.nombre.toLowerCase() !== 'admin');
    }).catch((error) => {
      console.error('Error al cargar la lista de usuarios:', error);
    });
  }
  
  async eliminarUsuario(correo: string) {
    await this.servicioBD.eliminarUsuarioUsandoCorreo(correo);
    this.cargarUsuarios();
  }

}
