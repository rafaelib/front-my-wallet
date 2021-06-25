import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

const MakeTransaction = () => {
  const location = useLocation();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  let type = location.pathname==="/income" ? "income" : "outcome";

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    if (!description) {
      alert("Por favor, adicione uma descrição");
      setIsLoading(false);
      return;
    }

    if (amount <= 0 || isNaN(amount)) {
      alert("Por favor, escolha uma valor válido.");
      setIsLoading(false);
      return;
    }
    
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const promise = axios.post(
      "http://localhost:4000/transactions",
      { amount, type, description },
      config
    );
    promise.then(() => {

      history.push("/history");
      setIsLoading(false);
    });
    promise.catch(() => {
      alert("Algo deu errado. Tente novamente.");
      setIsLoading(false);
    });
  }

  return (
    <Body>
      <Content>
        <h2>{location.pathname==="/income" ? "Nova entrada" : "Nova saída"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            required
          />
          <button type="submit">Salvar Entrada</button>
        </form>
      </Content>
    </Body>
  );
};

export default MakeTransaction;

const Body = styled.div`
  font-family: "Raleway", sans-serif;
  width: 100%;
  background: #8c11be;
  padding-top: 25px;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
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
`;
