import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentConfigurationEdit,
  setIfChangeOrderModeIsOn
} from '../../actions/mainActions'
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.state = {
      showArrows: false
    }
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
    this.props.setIfChangeOrderModeIsOn(true);
    this.setState({
      showArrows: true
    });
  };

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  };

  render() {
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
                {this.props.text}
              </span>
            {(() => {
              if (this.state.showArrows) {
                return <i className="fa fa-arrow-up" aria-hidden="true" />
              }
            })()}
            {(() => {
              if (this.state.showArrows) {
                return <i className="fa fa-arrow-down" aria-hidden="true"/>
              }
            })()}

          </a>
        </li>

    );
  }
}

function mapStateToProps(state) {
  return {
    configToSchemaMap: state.mainReducer.configToSchemaMap,
    changeOrderModeIsOn: state.mainReducer.changeOrderModeIsOn
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentConfigurationEdit,
    setIfChangeOrderModeIsOn
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SidebarUpperLinkGroup);