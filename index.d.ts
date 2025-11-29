/**
 * TypeScript definitions for USA Cities Database
 */

export interface City {
  state_name: string;
  state_id: string;
  county_name: string;
  city_ascii: string;
  zips: string;
  lat: string;
  lng: string;
  population: string;
  density: string;
  timezone: string;
}

export interface State {
  state_id: string;
  state_name: string;
}

export interface County {
  state_id: string;
  state_name: string;
  county_name: string;
}

export const cities: City[];
export const states: State[];
export const counties: County[];

export function getAllCities(): City[];
export function getAllStates(): State[];
export function getAllCounties(): County[];
export function getCitiesByState(stateId: string): City[];
export function getCitiesByStateName(stateName: string): City[];
export function getCountiesByState(stateId: string): County[];
export function searchCities(cityName: string): City[];
export function getCity(cityName: string, stateId: string): City | null;
export function getCitiesByZip(zipCode: string): City[];
export function getCitiesNearby(lat: number, lng: number, radiusMiles: number): City[];
export function getState(stateId: string): State | null;
export function getStateByName(stateName: string): State | null;
