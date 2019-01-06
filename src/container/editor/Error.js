import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import '../../css/Editor.css';
import {bindActionCreators} from "redux";
import {
  changeConfig,
  changeCurrentActiveConfiguration
} from '../../actions/mainActions'
import {connect} from "react-redux";
import Form from "react-jsonschema-form";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.hasErrorOccurred)
    return (
        <div className={"container"}>
          {this.props.errorMessage}
        </div>);
    else return <span/>
  }
}

function mapStateToProps(state) {
  return {
    hasErrorOccurred: state.mainReducer.errorHandel.hasErrorOccurred,
    errorMessage: state.mainReducer.errorHandel.errorMessage
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentActiveConfiguration,
    changeConfig
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);