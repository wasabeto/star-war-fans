import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Planet } from './app.model';

export const planetFeature = createFeatureSelector<readonly Planet[]>('planets');
export const selectPlanetAllSelector = createSelector(planetFeature, (planet) => planet);
