import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  openRelevantRecipe,
  createConfigToSchemaMap,
  fetchData
} from '../../actions/mainActions'
import {connect} from "react-redux";

class SidebarUpperLinkGroup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    //if(this.props.configToSchemaMap.size>0){
    console.log("this.props.configToSchemaMap", this.props.configToSchemaMap);
    //}
  }

  openConfiguration = ()=>  {
    
    this.props.text;
  };


  render() {
    return (
          <li>
            <a onClick={this.openConfiguration}>
              <span style={{fontSize:"15px"}} className="fa"> {this.props.index}</span>
              <span className="nav-text">
                {this.props.text}
              </span>
            </a>
          </li>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    configToSchemaMap: state.mainReducer.configToSchemaMap
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarUpperLinkGroup);