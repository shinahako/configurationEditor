import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/NavigationBar.css';
import {bindActionCreators} from "redux";
import {changeCurrentEtl, setIfEtlIsLoading, fetchData
} from '../../actions/mainActions'
import {connect} from "react-redux";
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import Loader from 'react-loader-spinner';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  onClick = (e) => {
    console.log("onClick",e);
  };

  onSelect = (eventKey,event) => {
    console.log("onSelect",eventKey,event);
    this.props.setIfEtlIsLoading(true);
    this.props.changeCurrentEtl(eventKey);
    this.props.fetchData(eventKey);
  };
  

  render() {
    return (
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img className={"icon"} src={require(
                  '../../resources/images/logo.png')}/>
              <p className={"name-of-app"}>
                Exporter
              </p>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {/* <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>*/}
              <NavDropdown eventKey={3} title="ETLs"
                           id="basic-nav-dropdown">
                {(() => {
                  if (this.props.listOfEtlsAreLoading) {
                    return <span className={"etls-list-preloader"}>
                      <Loader
                          type="Puff"
                          color="#00BFFF"
                          height="25"
                          width="25"
                      /><span className={"etls-list-preloader-text"}> Loading ...</span></span>
                  }
                  else {
                    let indents = [];
                    for (let etl in this.props.allEtlsList) {
                      if (this.props.allEtlsList.hasOwnProperty(etl)) {
                        indents.push(
                            <MenuItem
                                eventKey={etl}
                                onClick={() => {
                                  this.onClick()
                                }}
                                onSelect={(eventKey,event) => {
                                  this.onSelect(eventKey,event)
                                }}>
                              {etl}
                            </MenuItem>);
                      }
                    }
                    return indents;
                  }
                })()}


                {/*                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey={3.3}>Separated link</MenuItem>*/}
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Link Right
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link Right
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentStateOfData: state.mainReducer.currentStateOfData,
    allEtlsList: state.mainReducer.allEtlsList,
    listOfEtlsAreLoading: state.mainReducer.preLoaders.listOfEtlsAreLoading
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
    NavigationBar);