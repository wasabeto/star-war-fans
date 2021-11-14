import { createReducer, on } from '@ngrx/store';
import { Pilot } from './app.model';
import { getPilotAll } from './pilot.action';

export const initialState: readonly Pilot[] = [];

export const pilotReducer = createReducer(
  initialState,
  on(getPilotAll, (state, { pilots }) => pilots)
);
