import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Pilot } from './app.model';

export const pilotFeature = createFeatureSelector<readonly Pilot[]>('pilots');
export const selectPilotAllSelector = createSelector(pilotFeature, (pilot) => pilot);
