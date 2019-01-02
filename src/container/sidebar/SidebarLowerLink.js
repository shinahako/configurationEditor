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

  componentDidUpdate() {
    //if(this.props.configToSchemaMap.size>0){
    console.log("this.props.configToSchemaMap", this.props.configToSchemaMap);
    //}
  }

  render() {
    return (
        <ul className="logout">
          {(() => {
            if (this.props.changeOrderModeIsOn) {
              return <span>
                           <li>                 
                      <span>
                    <a href="#">
                      <i className="fa fa-floppy-o fa-2x"/>
                      <span className="nav-text">
                            Cancel
                        </span>
                    </a>
                    </span>
              </li>
                <li>                 
                      <span>
                    <a href="#">
                      <i className="fa fa-floppy-o fa-2x"/>
                      <span className="nav-text">
                            Save changes to order
                        </span>
                    </a>
                    </span>
              </li>
   
              </span>
            }
            else {
              return <li>
                 <span>
                    <a href="#">
                      <i className="fa fa-floppy-o fa-2x"/>
                      <span className="nav-text">
                            Save all work
                        </span>
                    </a>
                    </span>
              </li>
            }
          })()}
        </ul>
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
    openRelevantRecipe,
    initializeConfigurationToSchemaMap,
    fetchData
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLowerLink);