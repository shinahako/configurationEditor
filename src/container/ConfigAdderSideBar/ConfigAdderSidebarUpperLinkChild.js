import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentActiveConfiguration,
  changeOrder,
  orderChangerConfig,
  setIfChangeOrderModeIsOn
} from '../../actions/mainActions'
import {connect} from "react-redux";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);

  }

  addNewConfig = () => {
    if (!this.props.changeOrderModeIsOn) {
      this.props.changeCurrentActiveConfiguration(this.props.configGroupName,
          this.props.configName,this.props.index,true);
    }
  };

  render() {
    return (
        <li className={"child-link"}>
          <a onClick={this.addNewConfig}>
                <span style={{fontSize: "15px"}}
                      className="fa"> </span>
            <span className="nav-text three-dots-text">
                {this.props.configName}
              </span>
          </a>
        </li>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    changeOrderModeIsOn: state.mainReducer.orderChangerConfig.changeOrderModeIsOn,
    currentStateOfData: state.mainReducer.currentStateOfData,
    showArrows: state.mainReducer.orderChangerConfig.changeOrderModeIsOn
    && state.mainReducer.orderChangerConfig.configGroupName
    === ownProps.configGroupName
    && state.mainReducer.orderChangerConfig.configName === ownProps.configName
    && state.mainReducer.orderChangerConfig.currentIndex === ownProps.index
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentActiveConfiguration,
    setIfChangeOrderModeIsOn,
    changeOrder, orderChangerConfig

  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SidebarUpperLinkGroup);