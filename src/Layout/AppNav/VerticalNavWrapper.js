import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MetisMenu from "react-metismenu";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";
import {
  MainNav,
 
  
  WidgetsNav,
 
  PostNav
} from "./NavItems";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import cx from "classnames";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 240
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    height: 10,
    width: 10
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSearch: false
    };
  }

  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {
    return (
      <Fragment>
        <br></br>
        <div
          className={cx("search-wrapper", {
            active: this.state.activeSearch
          })}
        >
          <div className="input-holder">
            <input
              type="text"
              className="search-input"
              placeholder="Type to search"
            />
            <button
              onClick={() =>
                this.setState({ activeSearch: !this.state.activeSearch })
              }
              className="search-icon"
            >
              <span />
            </button>
          </div>
          <button
            onClick={() =>
              this.setState({ activeSearch: !this.state.activeSearch })
            }
            className="close"
          />
        </div>


        <h5 className="app-sidebar__heading">Post</h5>
        <MetisMenu
          content={PostNav}
          onSelected={this.toggleMobileSidebar}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        /> 
       
        <hr></hr>
        <h5 className="app-sidebar__heading">Menu</h5>
        <MetisMenu
          content={MainNav}
          onSelected={this.toggleMobileSidebar}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
        
        <h5 className="app-sidebar__heading">Dashboard Widgets</h5>
        <MetisMenu
          content={WidgetsNav}
          onSelected={this.toggleMobileSidebar}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
        
    
          </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}
const mapStateToProps = state => ({
  enableMobileMenu: state.ThemeOptions.enableMobileMenu
});

const mapDispatchToProps = dispatch => ({
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable))
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
