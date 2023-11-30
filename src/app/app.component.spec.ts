import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'; // Agrega la importación de ActivatedRoute
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [], // No declarer AppComponent
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('Se debe crear la app', () => {
    expect(component).toBeTruthy();
  });


});
