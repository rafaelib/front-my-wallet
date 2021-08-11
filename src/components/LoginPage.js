import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

const LoginPage = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push("/history");
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const promise = axios.post("http://localhost:4000/sign-in", {
      email: email,
      password: password,
    });
    promise.then((response) => {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoading(false);
      history.push("/history");
    });
    promise.catch(() => {
      alert("Dados inválidos. Por favor, tente novamente.");
      setIsLoading(false);
    });
  }

  return (
    <Body>
      <Content>
        <h1>MyWallet</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button disabled={isLoading} type="submit">
            Entrar
          </button>
        </form>
        <Link to="/signup">
          <span>Primeira vez? Cadastre-se!</span>
        </Link>
      </Content>
    </Body>
  );
};

export default LoginPage;

const Body = styled.div`
  font-family: "Raleway", sans-serif;
  width: 100%;
  min-height: 100vh;
  background: #8c11be;
  padding-top: 149px;
`;

const Content = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-family: "Saira Stencil One", cursive;
    font-size: 32px;
    font-weight: 400;
    line-height: 50px;
    color: #ffffff;
  }

  form {
    margin-top: 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      height: 46px;
      width: 326px;
      border-radius: 5px;
      background: #a328d6;
      border: none;
      outline: none;
      cursor: pointer;
      font-family: "Raleway", sans-serif;
      font-size: 20px;
      font-weight: 700;
      line-height: 23px;
      color: #ffffff;
    }

    input {
      height: 58px;
      width: 326px;
      border-radius: 5px;
      outline: none;
      border: none;
      padding-top: 12px;
      padding-left: 8px;
      margin-bottom: 12px;
    }

    input::placeholder {
      font-size: 20px;
      font-weight: 400;
      line-height: 23px;
    }
  }

  span {
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    margin-top: 36px;
    margin-bottom: 100px;
    color: #ffffff;
  }
`;
