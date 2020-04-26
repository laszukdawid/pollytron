import { bindActionCreators, Dispatch } from 'redux';
import { connect } from "react-redux";
import Home from '../components/Home';
import { setReadText } from '../actions/reader';
import { stateType } from "../reducers/types";

const mapStateToProps = (state: stateType) => {
  return {
    reader: state.reader,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ setReadText, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
