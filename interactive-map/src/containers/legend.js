import { connect } from 'react-redux';
import Legend from '../components/legend';

const mapStateToProps = state => {
  return {
    loading: state.loading,
    sites: state.sites,
  };
};

const LegendContainer = connect(mapStateToProps)(Legend);

export default LegendContainer;
