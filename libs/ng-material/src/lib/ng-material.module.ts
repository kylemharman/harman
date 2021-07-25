import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

const modules = [
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDatepickerModule,
  MatMomentDateModule,
  LayoutModule,
  FlexLayoutModule,
  MatButtonToggleModule,
  MatAutocompleteModule,
  MatSelectModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class NgMaterialModule {}
