import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

function RegisterComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = (data) => {
    fetch("https://kab.testkai.tk/api/Account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Registration failed");
      })
      .then((data) => {
        // Обробка успішної відповіді
        console.log("Registration successful:", data);
      })
      .catch((error) => {
        // Обробка помилки
        console.error("Registration error:", error);
      });
  };

  const onSubmit = (data) => {
    console.log(data);
    handleRegistration(data);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="wrapper mb-4">
            <Form onSubmit={handleSubmit(onSubmit)} className="form_reg">
              <h1 className="title_form">Реєстрація</h1>
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label className="App-label">Ім'я *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ім'я"
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
              <Form.Group className="mb-2" controlId="formBasicSurname">
                <Form.Label className="App-label">Прізвище *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Прізвище"
                  {...register("surName", {
                    required: true,
                    pattern: /^[A-ZА-ЯІ][a-zа-яі]{1,}$/u,
                  })}
                />
                {errors.surName && (
                  <Form.Text className="text-danger">
                    Прізвище має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
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
                <Form.Label className="App-label">Номер телефону</Form.Label>
                <Form.Control
                  type="text"
                  id="phone"
                  placeholder="+380 (необов'язково)"
                  {...register("phone", { pattern: /^$|^\+380\d{9}$/ })}
                />
                {errors.phone && (
                  <Form.Text className="text-danger">
                    Будь ласка, введіть номер телефону у форматі +380 і 9 цифр
                    вашого телефону.
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
                    Пароль має містити не менше 6 символів латинського алфавіту,
                    1 велику літеру, 1 цифру.
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
              <Button type="submit" id="submit">
                Зареєструвати
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterComp;
