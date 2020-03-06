import { connect } from 'react-redux';
import InteractiveMap from '../components/interactive_map';

const mapStateToProps = state => {
  return {
    loading: state.loading,
  };
};

const InteractiveMapContainer = connect(mapStateToProps)(InteractiveMap);

export default InteractiveMapContainer;
