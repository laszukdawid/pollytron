import { bindActionCreators, Dispatch } from 'redux';
import { connect } from "react-redux";
import Config from "../components/Config";
import { updateAwsConfig } from "../actions/config";
import { counterStateType } from "../reducers/types";

const mapStateToProps = (state: counterStateType) => {
  return {
    awsConfig: state.awsConfig,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ updateAwsConfig, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
