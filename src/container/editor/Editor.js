import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/SidebarMenu.css';
import '../../css/Editor.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentConfigurationEdit
} from '../../actions/mainActions'
import {connect} from "react-redux";

class Editor extends Component {
  constructor(props) {
    super(props);
  }
  
  
  
  openConfiguration = ()=>  {
    this.props.changeCurrentConfigurationEdit(this.props.text);
};


  render() {
    return (
<div className={"container"} style={{backgroundColor:'blue'}}>
  asassasasasa
</div>
      
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
    changeCurrentConfigurationEdit
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);