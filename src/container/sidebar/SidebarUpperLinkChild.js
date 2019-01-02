import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentConfigurationEdit,
  changeOrder,
  setIfChangeOrderModeIsOn,
  orderChangerConfig
} from '../../actions/mainActions'
import {connect} from "react-redux";
import OrderChangerArrow from "./OrderChangerArrow";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);

  }

  openConfiguration = () => {
    if (!this.props.changeOrderModeIsOn) {
      this.props.changeCurrentConfigurationEdit(this.props.text);
    }
  };

  handleButtonPress = () => {
    if (!this.props.changeOrderModeIsOn) {
      this.buttonPressTimer = setTimeout(
          () => this.setChangeOrderModeToOn(),
          500);
    }
  };

  setChangeOrderModeToOn = () => {
    let changeOrderModeIsOn=true;
    let configGroupName = this.props.configGroupName;
    let configName = this.props.configName;
    let currentIndex = this.props.index;
    this.props.orderChangerConfig(changeOrderModeIsOn,
        configGroupName, configName, currentIndex);
    this.props.setIfChangeOrderModeIsOn(true);
  

  };

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  };

  render() {
    console.log("this.props.configGroupName", this.props.configGroupName);
    return (
        <li className={"child-link"}>
          <a onClick={this.openConfiguration}
             onTouchStart={this.handleButtonPress}
             onTouchEnd={this.handleButtonRelease}
             onMouseDown={this.handleButtonPress}
             onMouseUp={this.handleButtonRelease}>
                <span style={{fontSize: "15px"}}
                      className="fa"> {this.props.index}</span>
            <span className="nav-text three-dots-text">
                {this.props.configName}
              </span>
            {(() => {
              if (this.props.showArrows) {
                return <OrderChangerArrow direction={"up"}
                                          index={this.props.index}
                                          configGroupName={this.props.configGroupName}
                                          configName={this.props.configName}/>
              }
            })()}
            {(() => {
              if (this.props.showArrows) {
                return <OrderChangerArrow direction={"down"}
                                          index={this.props.index}
                                          configGroupName={this.props.configGroupName}
                                          configName={this.props.configName}/>
              }
            })()}

          </a>
        </li>

    );
  }
}

function mapStateToProps(state,ownProps) {
  debugger;
  return {
    configToSchemaMap: state.mainReducer.configToSchemaMap,
    changeOrderModeIsOn: state.mainReducer.orderChangerConfig.changeOrderModeIsOn,
    currentStateOfData: state.mainReducer.currentStateOfData,
    showArrows: state.mainReducer.orderChangerConfig.changeOrderModeIsOn 
    && state.mainReducer.orderChangerConfig.configGroupName===ownProps.configGroupName
    && state.mainReducer.orderChangerConfig.currentIndex===ownProps.index
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentConfigurationEdit,
    setIfChangeOrderModeIsOn,
    changeOrder, orderChangerConfig

  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SidebarUpperLinkGroup);