import { createAction, props } from '@ngrx/store';
import { Planet } from './app.model';

export const getPlanetAll = createAction('[PLANET] Get all planets', props<{ readonly planets: Planet[] }>());
