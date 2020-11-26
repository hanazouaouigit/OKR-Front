import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CardTitle,
  Collapse,
  Fade,
  Row,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown
} from "reactstrap";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Progress } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import PageTitle from "../../Layout/AppMain/PageTitle";
import avatar1 from "../../assets/utils/images/avatars/1.jpg";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Objectives extends Component {
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: false,
      accordion: [false, false, false],
      custom: [true, false],
      status: "Closed",
      fadeIn: true,
      timeout: 300
    };
  }

  onEntering() {
    this.setState({ status: "Opening..." });
  }

  onEntered() {
    this.setState({ status: "Opened" });
  }

  onExiting() {
    this.setState({ status: "Closing..." });
  }

  onExited() {
    this.setState({ status: "Closed" });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  }

  toggleCustom(tab) {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      custom: state
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  render() {
    return (
      <CSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <PageTitle
          heading="Accordions"
          subheading="Accordions represent collapsable component with extended functionality."
          icon="pe-7s-diamond icon-gradient bg-warm-flame"
        />
            <h3>Your Progress</h3>
   
            <h3>Your Objectives</h3>
        <Row>
         

          <Col md="12">
            <div id="accordion" className="accordion-wrapper mb-3">
              <Card>
                <CardHeader id="headingOne">
                  <Button
                    block
                    color="link"
                    className="text-left m-0 p-0"
                    onClick={() => this.toggleAccordion(0)}
                    aria-expanded={this.state.accordion[0]}
                    aria-controls="collapseOne"
                  >
                    <h5 className="m-0 p-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat ultrices consectetur.</h5>
                  </Button>
                
                  <Button
                    block
                    color="link"
                    className="text-left m-3 p-3"
                    onClick={() => this.toggleAccordion(2)}
                    aria-expanded={this.state.accordion[2]}
                    aria-controls="collapseThree"    
                  >
                    <Progress className="mb-6" value="25" color="success" width="15px">
                      25%
                    </Progress>
                  </Button>

                  <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        className="btn-icon btn-icon-only"
                        color="link"
                        onClick={() => this.toggleAccordion(2)}
                        aria-expanded={this.state.accordion[2]}
                      >
                        <i className="lnr-cog btn-icon-wrapper" />
                      </DropdownToggle>
                    </UncontrolledButtonDropdown>
                  </div>

                  <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        className="btn-icon btn-icon-only"
                        color="link"
                        onClick={() => this.toggleAccordion(2)}
                        aria-expanded={this.state.accordion[2]}
                      >
                        <i className="lnr-cog btn-icon-wrapper" />
                      </DropdownToggle>
                    </UncontrolledButtonDropdown>
                  </div>
                  <div className="dots-separator" />
                  <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        className="btn-icon btn-icon-only"
                        color="link"
                      >
                        <i className="pe-7s-menu btn-icon-wrapper" />
                      </DropdownToggle>
                      <DropdownMenu
                        right
                        className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link"
                      >
                        <DropdownItem>
                          <i className="dropdown-icon lnr-inbox"> </i>
                          <h6>Details</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-file-empty"> </i>
                          <h6>Edit</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Link Objectives</h6>
                        </DropdownItem>

                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Archive</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Make Private</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Move to</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Copy to</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Delete</h6>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                </CardHeader>
                <Collapse
                  isOpen={this.state.accordion[0]}
                  data-parent="#accordion"
                  id="collapseOne"
                  aria-labelledby="headingOne"
                >
                  <CardBody>
                    <div className="scroll-area-sm">
                      <PerfectScrollbar>
                        <div className="chat-wrapper p-1">
                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="avatar-icon avatar-icon-lg circle">
                                  <img
                                    src={avatar1}
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>
                        </div>
                      </PerfectScrollbar>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <Collapse
                  isOpen={this.state.accordion[1]}
                  data-parent="#accordion"
                  id="collapseTwo"
                >
                  <CardBody>
                    2. Anim pariatur cliche reprehenderit, enim eiusmod high
                    life accusamus terry richardson ad squid. 3 wolf moon
                    officia aute, non cupidatat skateboard dolor brunch. Food
                    truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                    tempor, sunt aliqua put a bird on it squid single-origin
                    coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <Collapse
                  isOpen={this.state.accordion[2]}
                  data-parent="#accordion"
                  id="collapseThree"
                >
                  <CardBody>
                    3. Anim pariatur cliche reprehenderit, enim eiusmod high
                    life accusamus terry richardson ad squid. 3 wolf moon
                    officia aute, non cupidatat skateboard dolor brunch. Food
                    truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                    tempor, sunt aliqua put a bird on it squid single-origin
                    coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </Col>

          

          <Col md="12">
            <div id="accordion" className="accordion-wrapper mb-3">
              <Card>
                <CardHeader id="headingOne">
                  <Button
                    block
                    color="link"
                    className="text-left m-0 p-0"
                    onClick={() => this.toggleAccordion(0)}
                    aria-expanded={this.state.accordion[0]}
                    aria-controls="collapseOne"
                  >
                    <h5 className="m-0 p-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat ultrices consectetur. Nullam porttitor, urna id pellentesque aliquam, neque tortor elementum eros, id aliquam odio augue ac ligula. Donec ut dolor sit amet ipsum dapibus laoreet.</h5>
                  </Button>
                
                  <Button
                    block
                    color="link"
                    className="text-left m-0 p-0"
                    onClick={() => this.toggleAccordion(2)}
                    aria-expanded={this.state.accordion[2]}
                    aria-controls="collapseThree"
                  >
                    <Progress className="mb-6" value="25">
                      25%
                    </Progress>
                  </Button>

                  <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        className="btn-icon btn-icon-only"
                        color="link"
                        onClick={() => this.toggleAccordion(2)}
                        aria-expanded={this.state.accordion[2]}
                      >
                        <i className="lnr-cog btn-icon-wrapper" />
                      </DropdownToggle>
                    </UncontrolledButtonDropdown>
                  </div>
                  <div className="dots-separator" />
                  <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        className="btn-icon btn-icon-only"
                        color="link"
                      >
                        <i className="pe-7s-menu btn-icon-wrapper" />
                      </DropdownToggle>
                      <DropdownMenu
                        right
                        className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link"
                      >
                        <DropdownItem>
                          <i className="dropdown-icon lnr-inbox"> </i>
                          <h6>Details</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-file-empty"> </i>
                          <h6>Edit</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Link Objectives</h6>
                        </DropdownItem>

                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Archive</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Make Private</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Move to</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Copy to</h6>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <h6>Delete</h6>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                </CardHeader>
                <Collapse
                  isOpen={this.state.accordion[0]}
                  data-parent="#accordion"
                  id="collapseOne"
                  aria-labelledby="headingOne"
                >
                  <CardBody>
                    <div className="scroll-area-sm">
                      <PerfectScrollbar>
                        <div className="chat-wrapper p-1">
                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="avatar-icon avatar-icon-lg circle">
                                  <img
                                    src={avatar1}
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>

                          <div className="chat-box-wrapper">
                            <div>
                              <div className="avatar-icon-wrapper mr-1">
                                <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                                <div className="avatar-icon avatar-icon-lg rounded">
                                  <img src={avatar1} alt="" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="chat-box">
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system.
                              </div>
                              <small className="opacity-6">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                11:01 AM | Yesterday
                              </small>
                            </div>
                          </div>
                        </div>
                      </PerfectScrollbar>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <Collapse
                  isOpen={this.state.accordion[1]}
                  data-parent="#accordion"
                  id="collapseTwo"
                >
                  <CardBody>
                    2. Anim pariatur cliche reprehenderit, enim eiusmod high
                    life accusamus terry richardson ad squid. 3 wolf moon
                    officia aute, non cupidatat skateboard dolor brunch. Food
                    truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                    tempor, sunt aliqua put a bird on it squid single-origin
                    coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <Collapse
                  isOpen={this.state.accordion[2]}
                  data-parent="#accordion"
                  id="collapseThree"
                >
                  <CardBody>
                    3. Anim pariatur cliche reprehenderit, enim eiusmod high
                    life accusamus terry richardson ad squid. 3 wolf moon
                    officia aute, non cupidatat skateboard dolor brunch. Food
                    truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                    tempor, sunt aliqua put a bird on it squid single-origin
                    coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </Col>
        </Row>
      </CSSTransitionGroup>
    );
  }
}

export default Objectives;
