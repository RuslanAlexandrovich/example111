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

function SendCodeComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
                <h1 className="title_form mb-4">Введіть код</h1>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label className="App-label">
                    Код отриманий вами в електронному листі *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="******"
                    {...register("name", {
                      required: true,
                      pattern: /^[A-ZА-ЯІ][a-zа-яі]{1,}$/u,
                    })}
                  />
                  {errors.name && (
                    <Form.Text className="text-danger">
                      Ім'я має містити мінімум дві літери, з першою великою і
                      рештою малих літер.
                    </Form.Text>
                  )}
                </Form.Group>
                <Button type="submit" id="submit">
                  Надіслати
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SendCodeComp;
