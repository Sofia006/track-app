import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home.component';

import {HomeRoutingModule} from './home-routing.module';
import {AgmCoreModule} from '@agm/core';
import {HereMapsModule} from 'ng2-heremaps';
import {SatDatepickerModule} from 'saturn-datepicker';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    AgmCoreModule,
    SatDatepickerModule,
    HereMapsModule.forRoot({
      apiKey: 'oG7GKVVDp8hN0CjOQZxa7Ixz1cbAj0wRvSXxKu2JCrw',
      appId: 'qYSaY00fGInURJB2XavL',
      apiVersion: '3.0',
      libraries: ['core', 'service'],
    }),
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule {
}
