import { bindActionCreators, Dispatch } from 'redux';
import { connect } from "react-redux";
import Home from '../components/Home';
import { setReaderText } from '../actions/readerText';
import { setReaderConfig } from '../actions/readerConfig';
import { stateType } from "../reducers/types";

const mapStateToProps = (state: stateType) => {
  return {
    readerConfig: state.readerConfig,
    readerText: state.readerText,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ setReaderConfig, setReaderText }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
