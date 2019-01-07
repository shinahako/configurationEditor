import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentActiveConfiguration,
  createNewConfig,
  addNewConfig
} from '../../actions/mainActions'
import {connect} from "react-redux";
import GeneralUtils from "../../Utils/GeneralUtils";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);

  }

  addNewConfig = () => {
    this.props.createNewConfig(this.props.configGroupName,
        this.props.configName, this.props.configuration.defaultSettings,
        this.props.currentStateOfData);
    this.props.addNewConfig(false,"");

  };

  render() {
    let readableConfigName = GeneralUtils.makeStringReadable(this.props.configName);
    return (
        <li className={"child-link"}>
          <a onClick={this.addNewConfig}>
                <span style={{fontSize: "15px"}}
                      className="fa"> </span>
            <span className="nav-text three-dots-text">
                {readableConfigName}
              </span>
          </a>
        </li>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentStateOfData: state.mainReducer.currentStateOfData
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentActiveConfiguration,
    createNewConfig,
    addNewConfig
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SidebarUpperLinkGroup);