import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
// tslint:disable-next-line: max-line-length


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatGridListModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatGridListModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
  ]
})
export class AppMaterialModule { }
