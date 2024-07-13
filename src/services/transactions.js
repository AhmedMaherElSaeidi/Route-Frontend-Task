import axios from "axios";
import SERVERHOST from "./enviroment";

export const fetchTransactions = async () => {
  return await axios.get(`${SERVERHOST}/transactions`);
};

export const fetchTransJoinedWCust = async () => {
  return await axios.get(`${SERVERHOST}/transactions/joined`);
};
