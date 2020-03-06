export const INIT_MAP = 'INIT_MAP';
export const LOAD_SITES_BEGIN = 'LOAD_SITES_BEGIN';
export const LOAD_SITES_SUCCESS = 'LOAD_SITES_SUCCESS';
export const LOAD_SITES_FAILURE = 'LOAD_SITES_SUCCESS';

export function initMap() {
  return {
    type: INIT_MAP,
  };
}
export function loadSitesBegin() {
  return {
    type: LOAD_SITES_BEGIN,
  };
}
