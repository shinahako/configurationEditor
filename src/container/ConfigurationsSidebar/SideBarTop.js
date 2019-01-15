import React, {Component} from 'react';
import '../../css/SidebarMenu.css';
import Loader from 'react-loader-spinner';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import '../../css/App.css';
import '../../css/NavigationBar.css';
import {connect} from "react-redux";
import {
  changeCurrentEtl,
  fetchData,
  setIfEtlIsLoading
} from "../../actions/mainActions";
import {bindActionCreators} from "redux";

class SideBarTop extends Component {
  constructor(props) {
    super(props);
  }

  onSelect = (eventKey,event) => {
    console.log("onSelect",eventKey,event);
    this.props.setIfEtlIsLoading(true);
    this.props.changeCurrentEtl(eventKey);
    this.props.fetchData(eventKey);
  };


  render() {
      return (
          <li className={"sidebar-title"}>
{/*            <span>{this.props.title ? this.props.title: "Please choose ETL"}</span>*/}
            <Navbar.Collapse>
              <Nav>
                {/* <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>*/}
                <NavDropdown eventKey={3} title={this.props.title ? this.props.title: "Please choose ETL"}
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
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <span className={"configurations-list-preloader"} sm={2}>
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
            </span>
          </li>
      );
    }
}

function mapStateToProps(state) {
  return {
    currentStateOfData: state.mainReducer.currentStateOfData,
    allEtlsList: state.mainReducer.allEtlsList,
    listOfEtlsAreLoading: state.mainReducer.preLoaders.listOfEtlsAreLoading,
    isEtlLoading: state.mainReducer.preLoaders.isEtlLoading,
    currentEtl:state.mainReducer.currentEtl
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentEtl,
    fetchData,
    setIfEtlIsLoading
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarTop);