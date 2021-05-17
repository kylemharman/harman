import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { TOOLTIP_CONFIG } from '@harman/mission-control/core';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    TooltipModule.forRoot(TOOLTIP_CONFIG as TooltipOptions),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
