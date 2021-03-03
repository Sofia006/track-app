import {APP_INITIALIZER, InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Router, RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ActionReducerMap, Store, StoreModule} from '@ngrx/store';
import {IAppState} from './core/store/state/app.state';
import {appReducers} from './core/store/reducers/app.reducers';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {AuthEffects} from './core/store/effects/auth.effects';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Interceptor} from './core/interceptors/interceptor';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppInitializer} from './core/app-initializer';
import {LocalstorageService} from './core/services/localstorage/localstorage.service';
import {TripEffects} from './core/store/effects/trip.effects';
import {MarkerEffects} from './core/store/effects/marker.effects';
import {ToastrModule} from 'ngx-toastr';
import {ErrorEffects} from './core/store/effects/error.effects';
import {AppMaterialModule} from './app-material/app-material.module';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';


export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<IAppState>>('Registered Reducers');

export function getReducers(someService: any) {
  return appReducers;
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcqNfOL6PKP2cZVjly7344q5Rz7fvQh4w',
    }),
    // HereMapsModule.forRoot({
    //   apiKey: '',
    //   appId: 'qYSaY00fGInURJB2XavL',
    //   apiVersion: '3.0',
    //   libraries: ['core', 'service']
    // }),
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot([
      AuthEffects,
      TripEffects,
      MarkerEffects,
      ErrorEffects,
    ]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument({}) : [],
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    AppMaterialModule,
    SatDatepickerModule,
    SatNativeDateModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: REDUCER_TOKEN,
      deps: [],
      useFactory: getReducers,
    },
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializer,
      multi: true,
      deps: [Router, LocalstorageService, Store],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
