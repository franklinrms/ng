import React, { useContext, useEffect, useState } from "react";
import { BsDownload, BsUpload } from "react-icons/bs";
import UserContext from "../../context/UserContext";
import api from "../../lib/api";
import * as S from "./style";

interface IUser {
  user: {
    username: string;
  };
}

interface ITransferData {
  value: number;
  createdAt: string;
  creditedAccount?: IUser;
  debitedAccount?: IUser;
}

export default function Extract() {
  const [transactions, setTransactions] = useState([]);
  const [isFilterByDate, setIsFilterByDate] = useState(false);
  const [isFilterByCashIn, setIsFilterByCashIn] = useState(false);
  const [isFilterByCashOut, setIsFilterByCashOut] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token, user } = useContext(UserContext);

  const formattedDate = (date: string) => {
    const createdAt = new Date(date);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
      .format(createdAt)
      .split("de");
  };

  const getUrl = () => {
    const urls = {
      cashIn: "/cashIn/",
      cashOut: "/cashOut/",
      date: `?date=${selectedDate}`,
    };
    if (isFilterByDate) return urls.date;
    if (isFilterByCashIn) return urls.cashIn;
    if (isFilterByCashOut) return urls.cashOut;
    if (isFilterByCashIn && isFilterByDate) return `${urls.cashIn}${urls.date}`;
    if (isFilterByCashOut && isFilterByDate) {
      return `${urls.cashOut}${urls.date}`;
    }
    return "";
  };
  const getTransactions = async () => {
    setIsLoading(true);
    const { data } = await api.get(`/transfer${getUrl()}`, {
      headers: { authorization: token },
    });
    setTransactions(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getTransactions();
  }, [user.balance, selectedDate, isFilterByCashIn, isFilterByCashOut]);
  return (
    <S.Container>
      <div className="containerFilters">
        <h3>Extrato</h3>
        <div className="wrapperFilters">
          <input
            type="date"
            onChange={({ target }) => setSelectedDate(target.value)}
            onClick={() => setIsFilterByDate(!isFilterByDate)}
          />
          <S.FilterButton
            onClick={() => setIsFilterByCashIn(!isFilterByCashIn)}
            type="button"
            active={isFilterByCashIn}
          >
            Entrada
          </S.FilterButton>
          <S.FilterButton
            active={isFilterByCashOut}
            onClick={() => setIsFilterByCashOut(!isFilterByCashOut)}
            type="button"
          >
            Saida
          </S.FilterButton>
        </div>
      </div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <S.WrapperTable>
          <tbody>
            {transactions.map((transaction: ITransferData) => (
              <tr role="row" key={transaction.createdAt}>
                <td>
                  <span>
                    {transaction.debitedAccount ? <BsDownload /> : <BsUpload />}
                  </span>
                  <p>
                    {transaction.debitedAccount &&
                      transaction.debitedAccount.user.username}
                    {transaction.creditedAccount &&
                      transaction.creditedAccount.user.username}
                  </p>
                </td>
                <td>{formattedDate(transaction.createdAt)}</td>
                <td>
                  <span
                    className={
                      transaction.debitedAccount
                        ? "debitedAccount"
                        : "creditedAccount"
                    }
                  >
                    {transaction.debitedAccount ? "+" : "-"}
                  </span>
                  <p>{`R$ ${transaction.value
                    .toFixed(2)
                    .replace(".", ",")}`}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </S.WrapperTable>
      )}
    </S.Container>
  );
}
