import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {MarkersComponent} from './pages/markers/markers.component';
import {CreateEditMarkerComponent} from './components/create-edit-marker/create-edit-marker.component';
import {SatDatepickerModule} from 'saturn-datepicker';


@NgModule({
  declarations: [
    MarkersComponent,
    CreateEditMarkerComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SatDatepickerModule,
    RouterModule.forChild([
      {
        path: '',
        component: MarkersComponent,
      }
    ])
  ]
})
export class MarkersModule {
}
