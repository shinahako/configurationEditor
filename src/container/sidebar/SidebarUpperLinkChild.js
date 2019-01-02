import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentConfigurationEdit,
  setIfChangeOrderModeIsOn
} from '../../actions/mainActions'
import {connect} from "react-redux";
import {Col} from "react-bootstrap";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.state = {
      showArrows: false
    }
  }
  
  openConfiguration = ()=>  {
    this.props.changeCurrentConfigurationEdit(this.props.text);
};

  handleButtonPress () {
    if(!this.props.changeOrderModeIsOn) {
      this.setState({
        showArrows: true
      });
      this.props.setIfChangeOrderModeIsOn(true);
      this.buttonPressTimer = setTimeout(() => alert('long press activated'),
          500);
    }
  }

  handleButtonRelease () {
    clearTimeout(this.buttonPressTimer);
  }


  render() {
    return (
          <li className={"child-link"}>
            <Col>
            <  onClick={this.openConfiguration}  onTouchStart={this.handleButtonPress} onTouchEnd={this.handleButtonRelease} onMouseDown={this.handleButtonPress} onMouseUp={this.handleButtonRelease}>
              <span style={{fontSize:"15px"}} className="fa"> {this.props.index}</span>
              <span className="nav-text">
                {this.props.text}
              </span>
            </Col>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarUpperLinkGroup);