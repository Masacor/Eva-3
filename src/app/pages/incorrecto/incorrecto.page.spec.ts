import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { IncorrectoPage } from './incorrecto.page'; // Asegúrate de importar IncorrectoPage

describe('IncorrectoPage', () => {
  let component: IncorrectoPage;
  let fixture: ComponentFixture<IncorrectoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [/* Elimina IncorrectoPage de aquí */],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        IncorrectoPage // Agrega IncorrectoPage a imports en lugar de declarations
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IncorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Deberia crearse esta pagina', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica que funcione volverLogin', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.volverLogin();
    expect(routerSpy).toHaveBeenCalledWith(['ingreso']);
  });
});
