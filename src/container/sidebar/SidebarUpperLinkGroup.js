import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  fetchData,
  addNewConfig
} from '../../actions/mainActions'
import {connect} from "react-redux";
import SidebarUpperLinkChild from "./SidebarUpperLinkChild";
import GeneralUtils from "../../Utils/GeneralUtils";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChildren: true
    }
  }

  changeVisibilityOfChildren = () => {
    this.setState({
      showChildren: !this.state.showChildren
    });
  };

  addNewConfig = () => {
    console.log("add new config");
    this.props.addNewConfig(true, this.props.configGroupName);
  };

  render() {
    debugger;
    let readableConfigGroupName = GeneralUtils.makeStringReadable(
        this.props.configGroupName);
    if (GeneralUtils.checkIfMapIsNotEmpty(this.props.configurationsMap)) {
      console.log("this.props.configurations", this.props.configurations);
      return (
          <ul>
            <li>
              <a onClick={this.changeVisibilityOfChildren}>
                <i className="fa fa-folder fa-2x"/>
                <span className="nav-text three-dots-text">
                {readableConfigGroupName}
              </span>
              </a>
              <i onClick={this.addNewConfig}
                 className="fa fa-pencil-square-o clickable-icons"
                 aria-hidden="true"/>
            </li>
            {(() => {
              if (this.state.showChildren) {
                debugger;
                 console.log("asassasa",this.props.modifiedConfigs,this.props.configGroupName,this.props.configurations);
                return this.props.configurations.map((item, index) => (
                    <SidebarUpperLinkChild
                        configGroupName={this.props.configGroupName}
                        configName={this.props.configurations[index].elementName}
                        index={index}
                        lengthOfConfigurations={this.props.configurations.length}
                        modified={this.props.modifiedConfigs && this.props.modifiedConfigs[this.props.configGroupName+this.props.configurations[index].elementName] ? true:false}
                    />
                ))
              }
            })()}

          </ul>
      );
    }
    else {
      return <span/>
    }
  }
}

function mapStateToProps(state) {
  return {
    configurationsMap: state.mainReducer.configurationsMap,
    modifiedConfigs: state.mainReducer.modifiedConfigs
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    initializeConfigurationToSchemaMap,
    fetchData,
    addNewConfig
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SidebarUpperLinkGroup);