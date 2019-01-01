import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  fetchData
} from '../../actions/mainActions'
import {connect} from "react-redux";
import SidebarUpperLinkChild from "./SidebarUpperLinkChild";
import GeneralUtils from "../../GeneralUtils";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    //if(this.props.configToSchemaMap.size>0){
    console.log("aaaaaaaaaaaaaaa", this.props.configurations);
    //}
  }
  
  render() {
    console.log("aaaaaaaaaaaaaaa", this.props.configurations);
    if(GeneralUtils.checkIfMapIsNotEmpty(this.props.configurationsMap)) {
      return (
          <ul>
            <li>
              <a href="">
                <i className="fa fa-home fa-2x"></i>
                <span className="nav-text">
                {this.props.text}
              </span>
              </a>
            </li>
              {this.props.configurations.map((item, index) => (
                  <SidebarUpperLinkChild text={this.props.configurations[index].elementName}
                                         index={index}
                                         schema={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                                         defaultConfig={"http://etlexporter.vip.qa.ebay.com/v1/enrichers/getDefaultSettingsSchema?enricherName=NameNormalizationEnricher"}
                  />
              ))}
          </ul>
      );
    }
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
    initializeConfigurationToSchemaMap,
    fetchData
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarUpperLinkGroup);