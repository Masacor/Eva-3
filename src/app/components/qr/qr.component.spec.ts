import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrComponent } from './qr.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { SQLiteService } from 'src/app/services/sqlite.service';
import { Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { APIClientService } from 'src/app/services/apiclient.service';

describe('QrComponent', () => {
  let component: QrComponent;
  let fixture: ComponentFixture<QrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService, APIClientService,
         DataBaseService, SQLiteService, { provide: Storage, useValue: {} }, ],
        imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse componente qr correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería detener el escaneo al llamar a detenerEscaneoQR', () => {
    component.escaneando = true;
    component.detenerEscaneoQR();
    expect(component.escaneando).toBeFalse();
  });


});
