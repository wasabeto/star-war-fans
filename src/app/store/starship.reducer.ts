import { createReducer, on } from '@ngrx/store';
import { Starship } from './app.model';
import { getStarshipAll } from './starship.action';

export const initialState: readonly Starship[] = [];

export const starshipReducer = createReducer(
  initialState,
  on(getStarshipAll, (state, { starships }) => starships)
);
