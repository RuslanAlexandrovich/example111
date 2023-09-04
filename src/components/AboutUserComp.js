import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import authHeader from "../helpers/auth-header";

function AboutUserComp() {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [showForm, setShowForm] = useState(false); // Додаємо стан для відображення/приховування форми

  const [userName, setName] = useState(""); // Створюємо стан для зберігання імені
  const [email, setEmail] = useState(""); // Створюємо стан для зберігання email
  const [phoneNumber, setPhone] = useState(""); // Створюємо стан для зберігання телефону

  const [showPassword, setShowPassword] = useState(false);

  const UserInfo = async (data) => {
    try {
      const response = await axios.get(
        "http://kab.testkai.tk/api/User/userinfo",
        {
          params: data,
          headers: authHeader(),
          // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSdXNsYW4iLCJlbWFpbCI6IncwcmtwMHN0Zmlyc3RAZ21haWwuY29tIiwianRpIjoiOTQ0MDYxNzktZDFjYy00MzU2LWE0NzMtY2RiZTE1N2FjMWQ0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsIm5iZiI6MTY5MzgyOTk4MywiZXhwIjoxNjkzODQ3OTgzLCJpc3MiOiJTZXJ2aWNlQXV0aFNlcnZlciIsImF1ZCI6IlNlcnZpY2VBdXRoQ2xpZW50In0.3UOUh6QBHSI9kGkjbENEgk7IVYpI22aozBN-jiTU09s",
        }
      );

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        const responseData = response.data; // Отримуємо дані відповіді
        // Обробка успішної відповіді
        console.log("Successful:", responseData);

        const userName = responseData.userName;
        const email = responseData.email;
        const phoneNumber = responseData.phoneNumber;

        setName(userName);
        setEmail(email);
        setPhone(phoneNumber);
        console.log(userName);
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  //   const onSubmit = (data) => {
  //     console.log(data);
  //   };

  useEffect(() => {
    // Виконати запит при завантаженні сторінки
    UserInfo({}); // Можливо, вам потрібно передати необов'язкові дані
  }, []); // Пустий масив залежностей означає, що цей ефект виконається тільки при монтажі компонента

  const toggleForm = () => {
    setShowForm(!showForm); // Перемикач для відображення/приховування форми
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="userInfo d-flex flex-column mb-4">
            <span>Ім'я: {userName}</span>
            <span>Пошта: {email}</span>
            <span>Телефон: {phoneNumber}</span>
            <Button onClick={toggleForm}>Редагувати дані</Button>
            {showForm && (
              <Form className="form_reg">
                <h1 className="title_form">Редагування</h1>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label className="App-label">Ім'я</Form.Label>
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
                  <Form.Label className="App-label">Прізвище</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Прізвище"
                    {...register("surname", {
                      required: true,
                      pattern: /^[A-ZА-ЯІ][a-zа-яі]{1,}$/u,
                    })}
                  />
                  {errors.surName && (
                    <Form.Text className="text-danger">
                      Прізвище має містити мінімум дві літери, з першою великою
                      і рештою малих літер.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label className="App-label">Пошта</Form.Label>
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
                  <Form.Label className="App-label">Пароль</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="******"
                    {...register("password", {
                      required: true,
                      // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      Пароль має містити не менше 6 символів латинського
                      алфавіту, 1 велику літеру, 1 цифру.
                    </Form.Text>
                  )}
                </Form.Group>
                <Button type="submit" id="submit">
                  Зберегти
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUserComp;
