import axios from "axios";
import SERVERHOST from "./enviroment";

export const fetchCustomers = async () => {
  return await axios.get(`${SERVERHOST}/customers`);
};

export const fetchCustJoinedWTrans = async () => {
  return await axios.get(`${SERVERHOST}/customers/joined`);
};