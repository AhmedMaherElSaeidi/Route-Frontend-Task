import "./ChartPage.css";
import React, { useEffect, useState } from "react";
import { fetchCustJoinedWTrans } from "../../services/customers";
import { PiGraph } from "react-icons/pi";
import Spinner from "../../components/Spinner/Spinner";
import FormSelect from "../../components/Form/FormSelect/FormSelect";
import TransLineChart from "../../components/TransLineChart/TransLineChart";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

const ChartPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [pageData, setPageData] = useState({
    customers: [],
    loading: true,
    err: null,
  });
  const handleCustomerChange = (event) => {
    const customer = pageData.customers.find(
      (customer) => customer.id === parseInt(event.target.value)
    );
    setSelectedCustomer(customer);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCustJoinedWTrans();
        setPageData((prevData) => ({
          ...prevData,
          loading: false,
          customers: response.data,
        }));
      } catch (err) {
        console.log(err);
        setPageData((prevData) => ({
          ...prevData,
          loading: false,
          err: err.message,
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-page p-4">
      {!pageData.loading && !pageData.err && (
        <div className="mb-5">
          <FormSelect
            defaultOption="Select a Customer"
            options={{ data: pageData.customers, key: "id", value: "name" }}
            onChange={handleCustomerChange}
          />
        </div>
      )}
      {selectedCustomer && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3 className="mb-3 fw-bold">
            <PiGraph />
            {` ${selectedCustomer.name}`}
          </h3>
          <TransLineChart customer={selectedCustomer} />
        </div>
      )}
      {pageData.loading && <Spinner />}
      {pageData.err && <ErrorComponent message={pageData.err} />}
    </div>
  );
};

export default ChartPage;
