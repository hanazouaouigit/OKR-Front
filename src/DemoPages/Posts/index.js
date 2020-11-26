import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions/";
import { Card } from "@material-ui/core";
import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from "reactstrap";
import * as Icons from "react-feather";
import { PostProvider, usePostContext } from "./context/PostContext";
const PostItem = () => {
  return (
    <div className="mt-2">
      <Row>
        <Col>
          <div className="mb-1">
            <span>Riadh Abdennadher</span>
          </div>
        </Col>
        <Col />
      </Row>
      <Card className="p-2">
        <Row className="align-items-center">
          <Col>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </span>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button color="white">
              <Icons.Heart size={15} color="gray" />
            </Button>
            <Button color="white">
              <Icons.MessageCircle size={15} color="gray" />
            </Button>
            <Button color="white">
              <Icons.MoreVertical size={15} color="gray" />
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const PostsContainer = ({ match }) => {
    const {data} =usePostContext();
    
    return (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Breadcrumb>
            <BreadcrumbItem active>Posts</BreadcrumbItem>
          </Breadcrumb>
          <PostItem />
          <PostItem />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
)};
const Posts = () => {
  return (
    <PostProvider>
      <PostsContainer />
    </PostProvider>
  );
};
export default Posts;
