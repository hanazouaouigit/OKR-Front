import React, { Fragment, Component } from "react";
import Slider from "react-slick";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import {register} from "api/auth"
import FormField from "../../../Utils/FormField";
import EmailField from "../../../Utils/EmailField";
import PasswordField from "../../../Utils/PasswordField";

import "../../../Utils/App.scss";
import { Link } from "react-router-dom";
 
const Register = (props) => {
  const [state, setState] = React.useState({
    lastName: "",
    firstName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  function handleChangeInput({ target: { name, value , field} }) {
    setState({ ...state, [name]: value });
    if (field === "confirmPassword" || field === "password")
      this.handlePasswordChanged(state.value);
    if (state.errors.length === 0) this.setState({ [field]: state.value });
    else this.setState({ [field]: false });
  }

  const valide =
  state.email &&
  state.password &&
  state.confirmPassword &&
  state.userName &&
  state.firstName &&
  state.lastName;
const isDisabled = state.errorCpassword || !valide;

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    initialSlide: 0,
    autoplay: true,
    adaptiveHeight: true,
  };
  function handleSubmit(e) {
    e.preventDefault();
    register(state).then((res)=>{
        props.history.push("/pages/login")
    });;
  }


  return (
    <Fragment>
      <div className="h-100">
        <Row className="h-100 no-gutters">
          <Col
            lg="7"
            md="12"
            className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center"
          >
            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
              <div className="app-logo" />
              <h4>
                <div>Welcome,</div>
                <span>
                  It only takes a{" "}
                  <span className="text-success">few seconds</span> to create
                  your account
                </span>
              </h4>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row form>
                  <Col md={6}>
                      {/* <FormGroup> <Label for="exampleLastName">
                          <span className="text-danger">*</span> First name
                        </Label>
                        <Input
                          type="text"
                          name="firstName"
                          id="exampleFirstName"
                          placeholder="Last name here..."
                          onChange={handleChangeInput}
                        />

                     
                      </FormGroup> */}
                      <FormGroup>
                          <FormField
                            type="text"
                            fieldId="firstName"
                            label="First name"
                            placeholder="First name here..."
                            /*validator={validateUserName}*/
                            onChange={handleChangeInput}
                            required
                          />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                      {/* <FormGroup>
                        <Label for="exampleLastName">
                          <span className="text-danger">*</span> Last name
                        </Label>
                        <Input
                          type="text"
                          name="lastName"
                          id="exampleLastName"
                          placeholder="Last name here..."
                          onChange={handleChangeInput}
                        />
                      </FormGroup> */}
                      <FormGroup>
                          <FormField
                            type="text"
                            fieldId="lastName"
                            label="Last name"
                            placeholder="Last name here..."
                            //validator={validateUserName}
                            //onChange={this.handleChangeLastName}
                            onChange={handleChangeInput}
                            required
                          />
                        </FormGroup>
                    </Col>
                    
                    <Col md={6}>
                      {/* <FormGroup>
                        <Label for="exampleEmail">
                          <span className="text-danger">*</span> Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="Email here..."
                          onChange={handleChangeInput}
                        />
                      </FormGroup> */}
                       <FormGroup>
                          <FormField
                            type="text"
                            fieldId="userName"
                            label="User name"
                            placeholder="User name here..."
                            /*validator={validateUserName}*/
                           onChange= {handleChangeInput}
                            required
                          />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                      {/* <FormGroup>
                        <Label for="exampleUserName">User Name</Label>
                        <Input
                          type="text"
                          name="userName"
                          id="exampleUserName"
                          placeholder="Username here..."
                          onChange={handleChangeInput}
                        />
                      </FormGroup> */}
                       <FormGroup>
                          <EmailField
                            type="email"
                            fieldId="email"
                            label="Email"
                            placeholder="Email here..."
                            onChange={handleChangeInput}
                            required
                          />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                      {/* <FormGroup>
                        <Label for="examplePassword">
                          <span className="text-danger">*</span> Password
                        </Label>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Password here..."
                          onChange={handleChangeInput}
                        />
                      </FormGroup> */}
                       <FormGroup>
                          {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
                          <PasswordField
                            type="password"
                            fieldId="password"
                            label="Password"
                            placeholder="Enter Password"
                            // onChange={this.handleChangePassword}
                            onChange={handleChangeInput}
                            thresholdLength={7}
                            minStrength={3}
                            required
                          />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                      {/* <FormGroup>
                        <Label for="examplePasswordRep">
                          <span className="text-danger">*</span> Repeat Password
                        </Label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          id="examplePasswordRep"
                          placeholder="Repeat Password here..."
                          onChange={handleChangeInput}
                        />
                      </FormGroup> */}
                       <FormGroup>
                          {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
                          <PasswordField
                            type="password"
                            fieldId="confirmPassword"
                            label="Confirm Password"
                            placeholder="Confirm Password here..."
                            onChange={handleChangeInput}
                             error={state.errorCpassword}
                            validator={state.comparePassword}
                            thresholdLength={7}
                            minStrength={3}
                            required
                          />
                        </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="mt-3" check>
                    <Input type="checkbox" name="check" id="exampleCheck" />
                    <Label for="exampleCheck" check>
                      Accept our{" "}
                      <a
                        href="https://colorlib.com/"
                        onClick={(e) => e.preventDefault()}
                      >
                        Terms and Conditions
                      </a>
                      .
                    </Label>
                  </FormGroup>
                  <div className="mt-4 d-flex align-items-center">
                    <h5 className="mb-0">
                      Already have an account?{" "}
                      <Link
                        to="/pages/login"
                        className="text-primary"
                      >
                        Sign in
                      </Link>
                    </h5>
                    <div className="ml-auto">
                      <Button
                        color="primary"
                        className="btn-wide btn-pill btn-shadow btn-hover-shine"
                        size="lg"
                      >
                        Create Account
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
          </Col>
          <Col lg="5" className="d-lg-flex d-xs-none">
            <div className="slider-light">
              <Slider {...settings}>
                <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                  <div
                    className="slide-img-bg"
                    style={{
                      backgroundImage: "url(" + bg3 + ")",
                    }}
                  />
                  <div className="slider-content">
                    <h3>Scalable, Modular, Consistent</h3>
                    <p>
                      Easily exclude the components you don't require.
                      Lightweight, consistent Bootstrap based styles across all
                      elements and components
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default Register;
