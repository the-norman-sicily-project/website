import { withLeaflet, MapControl } from 'react-leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
import SearchProvider from '../containers/search_provider';

class Search extends MapControl {
  initProvider(sites) {
    this.provider = new SearchProvider(sites);
  }

  createLeafletElement({ sites }) {
    this.initProvider(sites);

    return GeoSearchControl({
      provider: this.provider,
      showMarker: false,
      showPopup: true,
      searchLabel: 'search',
      autoClose: true,
      keepResult: true,
    });
  }
}

const SearchBar = withLeaflet(Search);
export default SearchBar;
