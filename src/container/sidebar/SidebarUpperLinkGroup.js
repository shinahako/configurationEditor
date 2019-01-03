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
    this.props.addNewConfig(true,this.props.configGroupName);
  };

  render() {
    let readableConfigGroupName = GeneralUtils.makeStringReadable(this.props.configGroupName);
    if (GeneralUtils.checkIfMapIsNotEmpty(this.props.configurationsMap)) {
      console.log("this.props.configurations",this.props.configurations);
      return (
          <ul>
            <li>
              <a onClick={this.changeVisibilityOfChildren}>
                <i className="fa fa-folder fa-2x"/>
                <span className="nav-text three-dots-text">
                {readableConfigGroupName}
              </span>
              </a>
              <i onClick={this.addNewConfig} className="fa fa-plus-square-o clickable-icons"
                 aria-hidden="true"/>
            </li>
            {(() => {
              if (this.state.showChildren) {
                return this.props.configurations.map((item, index) => (
                    <SidebarUpperLinkChild
                        configGroupName={this.props.configGroupName}
                        configName={this.props.configurations[index].elementName}
                        index={index}
                        lengthOfConfigurations={this.props.configurations.length}
                        schema={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                        defaultConfig={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
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
    configurationsMap: state.mainReducer.configurationsMap
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