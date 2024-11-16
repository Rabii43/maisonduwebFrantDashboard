import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import {StoreModule} from "@ngrx/store";
import {widgetReducer} from "../store/widgets/widget.reducer";
import {EffectsModule} from "@ngrx/effects";
import {WidgetEffects} from "../store/widgets/widget.effects";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('widgets', widgetReducer),
    EffectsModule.forFeature([WidgetEffects]),
    FormsModule,
    RouterModule.forChild(PagesRoutes),
  ],
})
export class PagesModule {}
