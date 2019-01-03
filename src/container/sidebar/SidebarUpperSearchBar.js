import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentEtl,
  fetchData
} from '../../actions/mainActions'
import {connect} from "react-redux";
import {Col, Form, FormControl, FormGroup} from "react-bootstrap";

class SidebarUpperSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString:""
    }
  }

  handleKeyPress = (e)=>  {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      console.log('do validate');
      this.props.changeCurrentEtl(e.target.value);
      this.props.fetchData(e.target.value);
    }
  };
  
  render() {
      return (
          <li style={{width:'300px', fontFamily: "'Titillium Web', sans-serif"}}>
            <Form horizontal>
              <FormGroup controlId="searchBar">
                <Col className={"search-string"} sm={2}>
                  ETL
                </Col>
                <Col  className={"search-bar"} sm={10}>
                  <FormControl preventDefault type="ETL" placeholder="enter ETL name" onKeyPress={this.handleKeyPress}/>
                </Col>
              </FormGroup>
            </Form>
          </li>
         
      );
    }
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentEtl,
    fetchData
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarUpperSearchBar);