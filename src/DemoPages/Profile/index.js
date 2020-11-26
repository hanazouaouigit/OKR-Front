import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions/";
import Auxiliary from "util/Auxiliary";
import About from "./component/About";
import Biography from "components/profile/Biography";
import Contact from "components/profile/Contact";
import Friends from "components/profile/Friends";
import Photos from "components/profile/Photos";
import Events from "components/profile/Events"
import { friendList } from "./data";
import { photoList } from "DemoPages/Wall/data";

import ProfileHeader from "components/profile/ProfileHeader";
const ProfileContainer = ({ match }) => {
  return (
    <Fragment>
      <ThemeOptions />
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Auxiliary>
              <ProfileHeader />
              <div className="jr-profile-content">
                <div className="row">
                  <div className="col-xl-8 col-lg-8 col-md-7 col-12">
                    <About />
                    <Biography />
                    <Events />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-5 col-12">
                    <Contact />
                    <div className="row">
                      <div className="col-12">
                        <Friends friendList={friendList} />
                      </div>
                      <div className="col-12">
                        <Photos photoList={photoList} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Auxiliary>
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};
const Profile = () => {
  return <ProfileContainer />;
};
export default Profile;
