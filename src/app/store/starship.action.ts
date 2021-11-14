import { createAction, props } from '@ngrx/store';
import { Starship } from './app.model';

export const getStarshipAll = createAction('[STARSHIP] Get all starships', props<{ readonly starships: Starship[] }>());
