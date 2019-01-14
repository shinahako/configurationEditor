import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {removeConfig,setIfChangeOrderModeIsOn,orderChangerConfig} from '../../actions/mainActions'
import {connect} from "react-redux";

class OrderChangerArrow extends Component {
  constructor(props) {
    super(props);
  }

  deleteConfig= (index) => {
    let configGroupName = this.props.configGroupName;
    let currentStateOfData = this.props.currentStateOfData;
    this.props.removeConfig(configGroupName, index,
        currentStateOfData);
  };

  render() {
    return (
        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => {this.deleteConfig(this.props.index)}}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentStateOfData: state.mainReducer.currentStateOfData
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    removeConfig,
    setIfChangeOrderModeIsOn,
    orderChangerConfig
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    OrderChangerArrow);