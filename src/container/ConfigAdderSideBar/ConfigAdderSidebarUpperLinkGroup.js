import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  fetchData,
  initializeConfigurationToSchemaMap
} from '../../actions/mainActions'
import {connect} from "react-redux";
import GeneralUtils from "../../Utils/GeneralUtils";
import ConfigAdderSidebarUpperLinkChild
  from "./ConfigAdderSidebarUpperLinkChild";

class ConfigAdderSidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);
  }
  
  addNewConfig = () => {
    console.log("add new config");
  };

  render() {
    if (GeneralUtils.checkIfMapIsNotEmpty(this.props.jsonSchemaAndDefaults) && GeneralUtils.checkIfMapIsNotEmpty(this.props.jsonSchemaAndDefaults[this.props.configGroupName])) {
      console.log("this.props.jsonSchemaAndDefaults[this.props.configGroupName]",this.props.jsonSchemaAndDefaults[this.props.configGroupName]);
      console.log("this.props.jsonSchemaAndDefaults[this.props.configGroupName]",this.props.jsonSchemaAndDefaults[this.props.configGroupName]);
      return (
          <ul>
            <li>
              <a>
                <i className="fa fa-folder fa-2x"/>
                <span className="nav-text three-dots-text">
                {this.props.configGroupName}
              </span>
              </a>
            </li>
            {(() => {
              let indents = [];
              for (let configName in this.props.jsonSchemaAndDefaults[this.props.configGroupName]) {
                  indents.push( <ConfigAdderSidebarUpperLinkChild
                      configGroupName={this.props.configGroupName}
                      configName={configName}
                      lengthOfConfigurations={this.props.jsonSchemaAndDefaults[this.props.configGroupName].length}
                      schema={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                      defaultConfig={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                  />);
                
              }
              return indents;
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
    addNewConfig: state.mainReducer.addNewConfig.isAddNewConfigOn,
    configGroupName: state.mainReducer.addNewConfig.configGroupName,
    jsonSchemaAndDefaults : state.mainReducer.jsonSchemaAndDefaults
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    initializeConfigurationToSchemaMap,
    fetchData
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ConfigAdderSidebarUpperLinkGroup);