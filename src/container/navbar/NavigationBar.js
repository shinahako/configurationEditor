import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/NavigationBar.css';
import {bindActionCreators} from "redux";
import {
  changeOrder,
  setIfChangeOrderModeIsOn,
  orderChangerConfig
} from '../../actions/mainActions'
import {connect} from "react-redux";
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img className={"icon"} src={require(
                  '../../resources/images/logo.png')}/>
              <p className={"name-of-app"}>
              Name Of App
              </p>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
              <NavDropdown eventKey={3} title="Dropdown"
                           id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
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
    currentStateOfData: state.mainReducer.currentStateOfData
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeOrder,
    setIfChangeOrderModeIsOn,
    orderChangerConfig
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(
    NavigationBar);