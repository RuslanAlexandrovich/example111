import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";

function LoginComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");

  const onSubmit = (data) => {
    fetch("https://kab.testkai.tk/api/Account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
    console.log(data);
  };

  const isAuthorized = token !== "";

  return (
    <>
      <div className="App">
        <Container>
          <Row>
            <Col className="wrapper">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="form_reg form_login"
              >
                <h1 className="title_form mb-4">Авторизація</h1>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label className="App-label">Пошта *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    })}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      Пошта має бути в схожому форматі, Email@email.ua
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="App-label">Пароль *</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="******"
                    {...register("password", {
                      required: true,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      Пароль має містити не менше 6 символів латинського
                      алфавіту, 1 велику літеру, 1 цифру.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    id="showPass"
                    label="Видимий пароль"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                </Form.Group>
                <Nav className="mb-4">
                  <Link to="/sendemail">Забули пароль?</Link>
                </Nav>
                <Button type="submit" id="submit">
                  Авторизуватися
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LoginComp;
