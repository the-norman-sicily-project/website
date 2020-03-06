import { connect } from 'react-redux';
import Markers from '../components/markers';

const mapStateToProps = state => {
  const { sites } = state;
  return { sites };
};

const MarkersContainer = connect(mapStateToProps)(Markers);

export default MarkersContainer;
