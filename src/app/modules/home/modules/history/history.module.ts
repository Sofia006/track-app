import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HistoryComponent} from './pages/history/history.component';
import {IonicModule} from '@ionic/angular';
import {SatDatepickerModule} from 'saturn-datepicker';
import {AppMaterialModule} from '../../../../app-material/app-material.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HistoryComponent,
      },
    ]),
    SatDatepickerModule,
    FormsModule,
  ]
})
export class HistoryModule {
}
