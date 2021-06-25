import React, { useContext, useEffect, useState } from "react";
import { BiExit } from "react-icons/bi";
import styled from "styled-components";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import UserContext from "../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Transaction from "./Transaction";

const History = () => {
  const [userHistory, setUserHistory] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);

  let history = useHistory();

  const { user, setUser } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const request = axios.get("http://localhost:4000/transactions", config);
    request.then((response) => {
      setUserHistory(response.data);
      setTotalBalance(calculateBalance(response.data));
    });
    request.catch(() => {
      alert("Algo deu errado. Tente novamente.");
    });
  }, []);

  function logout() {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const promise = axios.post("http://localhost:4000/sign-out", {}, config);
    promise.then(() => {
      localStorage.clear();
      setUser(null);
      history.push("/");
    });
    promise.catch(() => alert("Algo deu errado. Tente novamente."));
  }

  function calculateBalance(arr) {
    let totalAmount = 0;

    arr.forEach((i) => {
      i.type === "outcome"
        ? (totalAmount = totalAmount - i.amount)
        : (totalAmount = totalAmount + i.amount);
    });

    return totalAmount;
  }

  return (
    <Body>
      <Content>
        <div className="container-name">
          <h2>Olá, {user?.name}</h2>
          <BiExit onClick={logout} className="exit-icon" />
        </div>
        <div className="container-history">
          {userHistory.length === 0 ? (
            <span className="no-history-disclaimer">
              Não há registro de entrada ou saída
            </span>
          ) : (
            <div className="container-transactions">
              {userHistory
                .map((t) => (
                  <Transaction
                    amount={t.amount}
                    description={t.description}
                    date={t.date}
                    type={t.type}
                  />
                ))
                .reverse()}
            </div>
          )}
          {userHistory.length > 0 ? (
            <div className="container-saldo">
              <span>Saldo</span>
              {totalBalance > 0 ? (
                <span className="num-balance green">{totalBalance}</span>
              ) : (
                <span className="num-balance red">{totalBalance}</span>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="container-buttons">
          <Link className="link-operation" to="/income">
            <AiOutlinePlusCircle className="reg-icon" />
            <span>Nova entrada</span>
          </Link>
          <Link className="link-operation" to="/outcome">
            <AiOutlineMinusCircle className="reg-icon" />
            <span>Nova saída</span>
          </Link>
        </div>
      </Content>
    </Body>
  );
};

export default History;

const Body = styled.div`
  font-family: "Raleway", sans-serif;
  width: 100%;
  background: #8c11be;
  padding-top: 25px;
`;

const Content = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .no-history-disclaimer {
    margin: 0 auto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    text-align: center;
    color: #868686;
  }

  .container-name {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    align-items: center;

    .exit-icon {
      font-size: 36px;
      cursor: pointer;
    }
  }

  .container-history {
    height: 446px;
    width: 100%;
    background: #ffffff;
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .container-saldo {
      font-size: 17px;
      font-weight: 700;
      line-height: 20px;
      color: #000000;
      display: flex;
      justify-content: space-between;
      padding: 15px;
      height: 26px;
      align-items: center;

      span {
        font-size: 17px;
        font-weight: 700;
        line-height: 20px;
      }
    }
    .container-transactions {
      padding: 15px;
      height: 420px;
      overflow-y: scroll;
    }
    .num-balance {
      font-size: 17px;
      font-weight: 700;
      line-height: 20px;
      text-align: right;
    }
  }

  .container-buttons {
    margin-top: 13px;
    margin-bottom: 16px;
    display: flex;
    width: 100%;
    border-radius: 5px;
    justify-content: space-between;

    .link-operation {
      background: #a328d6;
      height: 114px;
      width: 49%;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      padding: 15px;
      font-weight: 700;
      font-size: 17px;
      justify-content: space-between;
      color: #ffffff;

      .reg-icon {
        font-size: 28px;
      }
    }
  }

  .green{
    color: green;
}

.red{
    color: red;
}
`;
