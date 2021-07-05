import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TOOLTIP_CONFIG } from '@harman/mission-control/core';
import { NgMaterialModule } from '@harman/ng-material';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './store/reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('@harman/mission-control/shell').then(
            (m) => m.MissionControlShellModule
          ),
      },
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      name: 'Mission Control NgRx DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    TooltipModule.forRoot(TOOLTIP_CONFIG as TooltipOptions),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
