import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  openRelevantRecipe,
  fetchData,
  saveAllOrderChanges,
  cancelChanges
} from '../../actions/mainActions'
import {connect} from "react-redux";

class SidebarLowerLink extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
  }

  saveChangesToOrder = () => {
//this.props.saveAllOrderChanges(this.props.currentStateOfData);
  };

  cancelChangesToOrder = () => {
    this.props.cancelChanges(this.props.originalStateOfData);
  };

  render() {
    return (
        <ul className="logout">
          {(() => {
            if (this.props.changeOrderModeIsOn) {
              return <span>
                           <li>                 
                      <span>
                    <a onClick={() => {this.cancelChangesToOrder()}}>
                      <i className="fa fa-floppy-o fa-2x"/>
                      <span className="nav-text">
                            Cancel
                        </span>
                    </a>
                    </span>
              </li>
                <li>                 
                   <span>
                    <a onClick={() => {this.saveChangesToOrder()}}>
                      <i className="fa fa-floppy-o fa-2x"/>
                      <span className="nav-text">
                           Accept Changes
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
    changeOrderModeIsOn: state.mainReducer.changeOrderModeIsOn,
    currentStateOfData: state.mainReducer.currentStateOfData,
    originalStateOfData: state.mainReducer.originalStateOfData
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openRelevantRecipe,
    initializeConfigurationToSchemaMap,
    fetchData,
    saveAllOrderChanges,
    cancelChanges
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLowerLink);