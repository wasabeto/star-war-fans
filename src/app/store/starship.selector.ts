import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Starship } from './app.model';

export const starshipFeature = createFeatureSelector<readonly Starship[]>('starships');
export const selectStarshipAllSelector = createSelector(starshipFeature, (starship) => starship);
