import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {changeOrder,setIfChangeOrderModeIsOn,orderChangerConfig} from '../../actions/mainActions'
import {connect} from "react-redux";

class OrderChangerArrow extends Component {
  constructor(props) {
    super(props);
  }
  
  changeOrder= (newIndex) => {
    let configGroupName = this.props.configGroupName;
    let configName = this.props.configName;
    let currentStateOfData = this.props.currentStateOfData;
    let oldIndex = this.props.index;
    this.props.changeOrder(configGroupName, configName,
        currentStateOfData,
        newIndex, oldIndex);
  };

  render() {
    return (
        <i className="fa fa-trash-o" onClick={deleteConfiguration} aria-hidden="true"/>
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
    changeOrder,
    setIfChangeOrderModeIsOn,
    orderChangerConfig
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    OrderChangerArrow);