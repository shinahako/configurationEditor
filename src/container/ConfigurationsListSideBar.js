import React, {Component} from 'react';
import '../css/App.css';
import '../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  fetchData,
  initializeConfigurationToSchemaMap,
  openRelevantRecipe
} from '../actions/mainActions'
import {connect} from "react-redux";
import SidebarUpperLinkGroup from "./sidebar/SidebarUpperLinkGroup";
import SidebarLowerLink from "./sidebar/SidebarLowerLink";
import GeneralUtils from "../Utils/GeneralUtils";
import SidebarUpperSearchBar from "./sidebar/SidebarUpperSearchBar";

class ConfigurationsListSideBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    //if(this.props.configToSchemaMap.size>0){
    console.log("bbbbbbb", this.props.currentActiveConfiguration);
    console.log("current state", this.props.currentStateOfData);
    //}
  }


  render() {
    return (
        <div>
          <div className="area"/>
          <nav className="main-menu">
     <SidebarUpperSearchBar/>
            {(() => {
              let indents = [];
              for (let configGroupName in this.props.configurationsMap) {
                if (Array.isArray(
                    this.props.configurationsMap[configGroupName])) {
                  indents.push(<SidebarUpperLinkGroup configGroupName={configGroupName}
                                                      configurations={this.props.configurationsMap[configGroupName]}
                                                      schema={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                                                      defaultConfig={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                  />);
                }
              }
              return indents;
            })()}

            <SidebarLowerLink/>
          </nav>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    configurationsMap: state.mainReducer.configurationsMap,
    currentActiveConfiguration: state.mainReducer.currentActiveConfiguration,
    currentStateOfData: state.mainReducer.currentStateOfData
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openRelevantRecipe,
    initializeConfigurationToSchemaMap,
    fetchData
  }, dispatch)
};



export default connect(mapStateToProps, mapDispatchToProps)(
    ConfigurationsListSideBar);

