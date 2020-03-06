import { connect } from 'react-redux';
import SearchBar from '../components/search_bar';

const mapStateToProps = state => {
  return {
    sites: state.sites,
  };
};

const SearchBarContainer = connect(mapStateToProps)(SearchBar);

export default SearchBarContainer;
