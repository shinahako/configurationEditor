import React, {Component} from 'react';
import '../css/App.css';
import '../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  openRelevantRecipe,
  createConfigToSchemaMap,
  fetchData
} from '../actions/mainActions'
import {connect} from "react-redux";
import SidebarUpperLinkGroup from "./sidebar/SidebarUpperLinkGroup";
import SidebarLowerLink from "./sidebar/SidebarLowerLink";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import GeneralUtils from "../GeneralUtils";


class ConfigurationsListSideBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log("this.props.configurationsMap", this.props.configurationsMap);
    if(GeneralUtils.checkIfMapIsNotEmpty(this.props.configurationsMap))
    return (
        <div>
          <div className="area"></div>
          <nav className="main-menu">
     
            {(() => {
              let indents = [];
              for (let configuration in this.props.configurationsMap) {
                if (Array.isArray(
                    this.props.configurationsMap[configuration])) {
                  indents.push(<SidebarUpperLinkGroup text={configuration}
                                                      configurations={this.props.configurationsMap[configuration]}
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
    else return <span/>
  }
}

function mapStateToProps(state) {
  return {
    configurationsMap: state.mainReducer.configurationsMap
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openRelevantRecipe,
    initializeConfigurationToSchemaMap,
    createConfigToSchemaMap,
    fetchData
  }, dispatch)
};



export default connect(mapStateToProps, mapDispatchToProps)(
    ConfigurationsListSideBar);

