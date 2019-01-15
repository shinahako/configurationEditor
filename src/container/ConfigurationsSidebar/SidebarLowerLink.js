import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  initializeConfigurationToSchemaMap,
  openRelevantRecipe,
  fetchData,
  saveToCurrentState,
  postNewConfiguration
} from '../../actions/mainActions'
import {connect} from "react-redux";

class SidebarLowerLink extends Component {
  constructor(props) {
    super(props);
  }

  saveChangesToOrder = () => {
    this.props.saveToCurrentState(this.props.currentStateOfData);
  };

  postAllChanges= () => {
    this.props.postNewConfiguration(this.props.currentStateOfData);
  };
  
  render() {
    return (
        <div className="bottom-link">
          <ul>
            {(() => {
              if (this.props.changeOrderModeIsOn) {
                return <span>
                <li>                 
                   <span>
                    <a onClick={() => {
                      this.saveChangesToOrder()
                    }}>
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
                    <a onClick={() => {
                      this.postAllChanges()
                    }}>
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
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    changeOrderModeIsOn: state.mainReducer.orderChangerConfig.changeOrderModeIsOn,
    currentStateOfData: state.mainReducer.currentStateOfData

  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openRelevantRecipe,
    initializeConfigurationToSchemaMap,
    fetchData,
    saveToCurrentState,
    postNewConfiguration
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLowerLink);