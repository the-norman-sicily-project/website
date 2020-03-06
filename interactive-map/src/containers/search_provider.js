class SearchProvider {
  constructor(sites) {
    this.sites = sites;
  }

  async search({ query }) {
    const lowerCaseQuery = query.toLowerCase();
    const matches = this.sites.filter(
      feature =>
        feature.geometry &&
        feature.geometry.coordinates &&
        feature.geometry.coordinates.length >= 2 &&
        feature.properties.english_place_name
          .toLowerCase()
          .indexOf(lowerCaseQuery) > -1
    );

    if (matches && matches.length > 0) {
      return matches.map(feature => ({
        x: feature.geometry.coordinates[1],
        y: feature.geometry.coordinates[0],
        label: feature.properties.english_place_name,
      }));
    }
    return [];
  }
}

export default SearchProvider;
