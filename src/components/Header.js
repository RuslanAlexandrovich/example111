import React, { Component } from "react";
import {
  Button,
  Container,
  FormControl,
  Form,
  Nav,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { Link, Outlet } from "react-router-dom";
import logo from "./logo192.png";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SendEmail from "../pages/SendEmail";
import SendCode from "../pages/SendCode";
import AboutUser from "../pages/AboutUser.js";

export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <NavbarBrand href="/">
              <img
                src={logo}
                height="30"
                width="30"
                className="d-inline-block"
                alt="Logo"
              />
            </NavbarBrand>
            <NavbarToggle aria-controls="responsive-navbar-nav" />
            <NavbarCollapse id="responsive-navbar-nav">
              <Nav className="me-auto header_button">
                <Link to="/">Home</Link>
                <Link to="/registration">Registration</Link>
                <Link to="/login">LogIn</Link>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sendemail" element={<SendEmail />} />
          <Route path="/sendcode" element={<SendCode />} />
          <Route path="/aboutuser" element={<AboutUser />} />
        </Routes>
      </>
    );
  }
}
