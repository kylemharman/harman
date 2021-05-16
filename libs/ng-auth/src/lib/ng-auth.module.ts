import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

export const ngAuthRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, AngularFireAuth],
})
export class NgAuthModule {}
