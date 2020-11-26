import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions/";

import Profile from "components/wall/Profile/index";
import PostList from "components/wall/PostList/index";
import Interests from "components/wall/Interests/index";
import Photos from "components/wall/Photos/index";
import Friends from "components/wall/Friends/index";
import CustomScrollbars from "util/CustomScrollbars";
import {
  communitiesList,
  friendList,
  interestList,
  photoList,
  postList,
  recentActivity,
  user,
  userInfo,
} from "./data";
import Communities from "components/wall/Communities/index";
import { PostProvider, usePostContext } from "./context/PostContext";
import { useQueryOrganisation } from "./post.hooks";
import OrganisationList from "./components/OrganisationList";
const WallContainer = ({ match }) => {
    const {data} =usePostContext();
    const {data:organisations} =useQueryOrganisation();
    console.log({list:organisations})
  return (
    <Fragment>
      <ThemeOptions />
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="jr-main-content">
              <div className="row">
                <div className="d-none d-sm-block col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <CustomScrollbars className="jr-wall-scroll scrollbar">
                    <Profile user={user} userInfo={userInfo} />
                    <OrganisationList data={organisations}/>

          
                  </CustomScrollbars>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <CustomScrollbars className="jr-wall-scroll scrollbar">
                    <div className="jr-wall-postlist">
                      <PostList postList={data} user={user} />
                    </div>
                  </CustomScrollbars>
                </div>
                <div className="d-none d-lg-block col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <CustomScrollbars className="jr-wall-scroll scrollbar">
                    <Communities communitiesList={communitiesList} />
                    <span className="text-primary jr-fs-md pointer d-block mb-4">
                      See All Communities{" "}
                      <i
                        className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-flex align-middle`}
                      />
                    </span>
                    {/* <RecentActivity recentList={recentActivity} shape="square"/> */}
                  </CustomScrollbars>
                </div>
              </div>
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};
const Hachtag = (props) => {
    const {tag,selectedProject} =props.match.params;
  return (
    <PostProvider tag={tag} selectedProject={selectedProject}>
      <WallContainer />
    </PostProvider>
  );
};
export default Hachtag;
