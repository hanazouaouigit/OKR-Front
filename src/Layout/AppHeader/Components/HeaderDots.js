import React, { Fragment } from "react";

// import Ionicon from 'react-ionicons';
import { IoIosNotificationsOutline } from "react-icons/io";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  Button,
  NavItem,
  DropdownItem
} from "reactstrap";

import city2 from "../../../assets/utils/images/dropdown-header/city2.jpg";
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";

import Flag from "react-flagkit";

import Tabs from "react-responsive-tabs";

// Dropdown Tabs Content
import ChatExample from "./TabsContent/ChatExample";
import TimelineEx from "./TabsContent/TimelineExample";
import SysErrEx from "./TabsContent/SystemExample";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  useMutationNotifications,
  useQueryNotifications
} from "DemoPages/Wall/post.hooks";
const UnreadedCount = () => {
  const { data } = useQueryNotifications();
  const unreaded = data?.filter(it => it?.readed === false);
  if (unreaded?.length == 0) return null;

  return (
    <span
      className="badge badge-danger"
      style={{
        position: "absolute",
        left: 12,
        top: 0,
        right: 0
      }}
    >
      {unreaded?.length}
    </span>
  );
};
const NotificationList = () => {
  const { data } = useQueryNotifications();

  return (
    <VerticalTimeline layout="1-column" className="vertical-without-time">
      {data?.map(notif => (
        <VerticalTimelineElement
          className="vertical-timeline-item"
          icon={<i className="badge badge-dot badge-dot-xl badge-success"> </i>}
        >
          <h4 className="timeline-title">{notif?.project?.name}</h4>
          <p>
            {notif?.body}
            <a href="https://colorlib.com/" onClick={e => e.preventDefault()}>
              {moment(notif?.createdAt).format("HH:mm")}
            </a>
          </p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

const Notifications = () => {
  const { readNotification } = useMutationNotifications();

  return (
    <UncontrolledDropdown>
      <DropdownToggle
        className="p-0 mr-2"
        color="link"
        onClick={() => readNotification()}
      >
        <div className="icon-wrapper icon-wrapper-alt rounded-circle">
          <div className="icon-wrapper-bg bg-happy-itmeo" />

          <IoIosNotificationsOutline color="#d92550" fontSize="23px" />
          <UnreadedCount />
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl rm-pointers">
        <div className="dropdown-menu-header mb-0">
          <div className="dropdown-menu-header-inner bg-malibu-beach">
            <div
              className="menu-header-image opacity-1"
              style={{
                backgroundImage: "url(" + city3 + ")"
              }}
            />
            <div className="menu-header-content text-dark">
              <h5 className="menu-header-title">Notifications</h5>
            </div>
          </div>
        </div>
        <div className="scroll-area-sm">
          <PerfectScrollbar>
            <div className="p-3">
              <NotificationList />
            </div>
          </PerfectScrollbar>
        </div>
        <Nav vertical>
          <NavItem className="nav-item-divider" />
          <NavItem className="nav-item-btn text-center">
            <Button
              size="sm"
              className="btn-shadow btn-wide btn-pill"
              color="focus"
            >
              View Latest Changes
            </Button>
          </NavItem>
        </Nav>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
class HeaderDots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    return (
      <Fragment>
        <div className="header-dots">
          <UncontrolledDropdown>
            <DropdownToggle className="p-0 mr-2" color="link">
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                <div className="icon-wrapper-bg bg-happy-itmeo" />
                <div className="language-icon">
                  <Flag className="mr-3 opacity-8" country="FR" size="40" />
                </div>
              </div>
            </DropdownToggle>
            <DropdownMenu right className="rm-pointers">
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner pt-4 pb-4 bg-malibu-beach">
                  <div
                    className="menu-header-image opacity-05"
                    style={{
                      backgroundImage: "url(" + city2 + ")"
                    }}
                  />
                  <div className="menu-header-content text-center text-white">
                    <h4 className="menu-header-subtitle mt-0">
                      Choose Language
                    </h4>
                  </div>
                </div>
              </div>
              <DropdownItem header>Popular Languages</DropdownItem>
              <DropdownItem>
                <Flag className="mr-3 opacity-8" country="US" />
                USA
              </DropdownItem>
              <DropdownItem>
                <Flag className="mr-3 opacity-8" country="CH" />
                Switzerland
              </DropdownItem>
              <DropdownItem active>
                <Flag className="mr-3 opacity-8" country="FR" />
                France
              </DropdownItem>
              <DropdownItem>
                <Flag className="mr-3 opacity-8" country="ES" />
                Spain
              </DropdownItem>
              <DropdownItem>
                <Flag className="mr-3 opacity-8" country="DE" />
                Germany
              </DropdownItem>
              <DropdownItem>
                <Flag className="mr-3 opacity-8" country="IT" />
                Italy
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <Notifications />
        </div>
      </Fragment>
    );
  }
}
export default HeaderDots;
