import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonGrid, IonRow, IonCard } from '@ionic/angular/standalone';
import { Asistencia } from 'src/app/model/asistencia';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonGrid, IonCard, IonRow, IonCol, CommonModule, FormsModule],
})
export class MiclaseComponent {

  asistencia= new Asistencia();

  constructor(private bd: DataBaseService) {
    this.bd.datosQR.subscribe((datosQR) => {
      this.asistencia = new Asistencia().obtenerAsistenciaDesdeQR(datosQR);
    })
  }

}
