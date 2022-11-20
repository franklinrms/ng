import React, { useContext, useEffect, useState } from "react";
import { BsCalendar3Week, BsCashCoin } from "react-icons/bs";
import UserContext from "../../context/UserContext";
import api from "../../lib/api";

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
    <div>
      <div>
        <button
          type="button"
          onClick={() => setIsFilterByDate(!isFilterByDate)}
        >
          <BsCalendar3Week />
        </button>

        <button
          onClick={() => setIsFilterByCashIn(!isFilterByCashIn)}
          type="button"
        >
          Entrada
        </button>
        <button
          onClick={() => setIsFilterByCashOut(!isFilterByCashOut)}
          type="button"
        >
          Saida
        </button>
      </div>
      <div>
        {isFilterByDate && (
          <input
            onChange={({ target }) => setSelectedDate(target.value)}
            type="date"
          />
        )}
      </div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <tbody>
            {transactions.map((transaction: ITransferData) => (
              <tr role="row" key={transaction.createdAt}>
                <td>
                  <BsCashCoin />
                </td>
                <td>
                  <p>
                    {transaction.debitedAccount &&
                      transaction.debitedAccount.user.username}
                  </p>
                  <p>
                    {transaction.creditedAccount &&
                      transaction.creditedAccount.user.username}
                  </p>
                </td>
                <td>{formattedDate(transaction.createdAt)}</td>
                <td
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{transaction.debitedAccount ? "+" : "-"}</span>
                  <p>{`R$ ${transaction.value
                    .toFixed(2)
                    .replace(".", ",")}`}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
