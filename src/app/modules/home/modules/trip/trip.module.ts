import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripComponent} from './pages/trip/trip.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {MapComponent} from './components/map/map.component';
import {TripSavedPlacesComponent} from './components/trip-saved-places/trip-saved-places.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [
    TripComponent,
    MapComponent,
    TripSavedPlacesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TripComponent,
      }
    ]),
    FormsModule
  ]
})
export class TripModule {
}
