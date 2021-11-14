import { createReducer, on } from '@ngrx/store';
import { Planet } from './app.model';
import { getPilotAll } from './pilot.action';
import { getPlanetAll } from './planet.action';

export const initialState: readonly Planet[] = [];

export const planetReducer = createReducer(
  initialState,
  on(getPlanetAll, (state, { planets }) => planets)
);
