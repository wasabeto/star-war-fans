import { createAction, props } from '@ngrx/store';
import { Pilot } from './app.model';

export const getPilotAll = createAction('[PILOT] Get all pilots', props<{ readonly pilots: Pilot[] }>());
