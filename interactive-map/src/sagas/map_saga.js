import { all, call, put, takeEvery } from 'redux-saga/effects';
import set from 'lodash/fp/set';
import _ from 'lodash';
import config from '../config';
import {
  INIT_MAP,
  LOAD_SITES_SUCCESS,
  LOAD_SITES_FAILURE,
  loadSitesBegin,
} from '../actions';

export function* fetchSites() {
  const path =
    process.env.NODE_ENV === 'production' ? '/places/map/data' : '/data';
  const endpoint = `${path}/${config.dataFile}`;
  try {
    yield put(loadSitesBegin());
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    const features = data.features ? data.features : [];
    const sites = features.map(feature =>
      set('id', _.uniqueId('site_'), feature)
    );
    yield put({ type: LOAD_SITES_SUCCESS, sites });
  } catch (e) {
    yield put({ type: LOAD_SITES_FAILURE, error: e.message });
  }
}

export function* initMap() {
  yield takeEvery(INIT_MAP, () => fetchSites());
}

export default function* mapSaga() {
  yield all([initMap()]);
}
