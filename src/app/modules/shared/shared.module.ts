import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalDatePipe} from '../../core/pipes/local-date.pipe';
import {TripListViewComponent} from './components/trip-list-view/trip-list-view.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [
    LocalDatePipe,
    TripListViewComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    LocalDatePipe,
    TripListViewComponent,
    IonicModule,
  ]
})
export class SharedModule {
}
