import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  openRelevantRecipe,
  fetchData
} from '../../actions/mainActions'
import {connect} from "react-redux";

class SidebarLowerLink extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
    //if(this.props.configToSchemaMap.size>0){
      console.log("this.props.configToSchemaMap",this.props.configToSchemaMap);
    //}
  }
  

  render() {
    return (
        <ul className="logout">
          <li>
            <a href="#">
              <i className="fa fa-floppy-o fa-2x"></i>
              <span className="nav-text">
                            Save work
                        </span>
            </a>
          </li>
        </ul>
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
    fetchData
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps) (SidebarLowerLink);