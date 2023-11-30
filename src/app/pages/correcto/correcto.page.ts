import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {
  password: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private navCtrl: NavController
  ) { 
    const navigation = this.router.getCurrentNavigation();
    this.activatedRoute.queryParams.subscribe(params => {
      this.password =params['password'];
    });
  }

  ngOnInit() {
  }
  
  //Arreglando botones
  public volverLogin(): void {
    this.router.navigate(['/ingreso']);
  }

}
