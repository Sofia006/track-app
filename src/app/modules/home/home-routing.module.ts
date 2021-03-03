import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'trip',
        loadChildren: () => import('./modules/trip/trip.module').then(m => m.TripModule),
      },
      {
        path: 'history',
        loadChildren: () => import('./modules/history/history.module').then(m => m.HistoryModule),
      },
      {
        path: 'markers',
        loadChildren: () => import('./modules/markers/markers.module').then(m => m.MarkersModule),
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'trip',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
