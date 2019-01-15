import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import {bindActionCreators} from "redux";
import {
  changeCurrentEtl,
  fetchData,
  setIfEtlIsLoading
} from '../../actions/mainActions'
import {connect} from "react-redux";
import {Col, Form, FormControl, FormGroup} from "react-bootstrap";
import Loader from 'react-loader-spinner';

class SidebarUpperSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ""
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.props.setIfEtlIsLoading(true);
      this.props.changeCurrentEtl(e.target.value);
      this.props.fetchData(e.target.value);
    }
  };

  render() {
    return (
        <li style={{width: '100%', fontFamily: "'Titillium Web', sans-serif"}}>
          <Form horizontal>
            <FormGroup controlId="searchBar">
              <Col className={"search-string"} sm={2}>
                ETL
              </Col>
              <Col className={"search-bar"} sm={8}>
                <FormControl preventDefault type="ETL"
                             placeholder="enter ETL name"
                             onKeyPress={this.handleKeyPress}/>
              </Col>
              <Col className={"search-bar-preloader"} sm={2}>
                {(() => {
                  if (this.props.isEtlLoading) {
                    return <Loader
                        type="Puff"
                        color="#00BFFF"
                        height="25"
                        width="25"
                    />
                  }
                })()}
              </Col>
            </FormGroup>
          </Form>

        </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    isEtlLoading: state.mainReducer.preLoaders.isEtlLoading
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentEtl,
    fetchData,
    setIfEtlIsLoading
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SidebarUpperSearchBar);