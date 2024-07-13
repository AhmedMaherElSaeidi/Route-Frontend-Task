import "./TransactionsPage.css";
import React, { useEffect, useState } from "react";
import { fetchCustomers } from "../../services/customers";
import { fetchTransJoinedWCust } from "../../services/transactions";
import { FaFilter } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import FormInput from "../../components/Form/FormInput/FormInput";
import FormSelect from "../../components/Form/FormSelect/FormSelect";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

const TransactionsPage = () => {
  const [tablePagination, setTablePagination] = useState({
    page: 1,
    totalPages: null,
  });
  const [pageFilter, setPageFilter] = useState({
    customerID: null,
    minAmount: null,
    maxAmount: null,
  });
  const [pageData, setPageData] = useState({
    currentTransactions: [],
    transactions: [],
    customers: [],
    loading: true,
    err: null,
  });

  const handleNameFilter = (event) => {
    setPageFilter({ ...pageFilter, customerID: parseInt(event.target.value) });
  };
  const handleMinAmountFilter = (event) => {
    setPageFilter({ ...pageFilter, minAmount: parseInt(event.target.value) });
  };
  const handleMaxAmountFilter = (event) => {
    setPageFilter({ ...pageFilter, maxAmount: parseInt(event.target.value) });
  };
  const filterTransactions = () => {
    return pageData.transactions
      .filter((transaction) => {
        return pageFilter.minAmount
          ? transaction.amount >= pageFilter.minAmount
          : true;
      })
      .filter((transaction) => {
        return pageFilter.maxAmount
          ? transaction.amount <= pageFilter.maxAmount
          : true;
      })
      .filter((transaction) => {
        return pageFilter.customerID
          ? transaction.customer.id === pageFilter.customerID
          : true;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await fetchTransJoinedWCust();
        const customersResponse = await fetchCustomers();
        setPageData((prevData) => ({
          ...prevData,
          transactions: transactionsResponse.data,
          customers: customersResponse.data,
          loading: false,
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
  useEffect(() => {
    setPageData({ ...pageData, loading: true });
    const itemsPerPage = 10; // Number of items to display per page
    const filtered = filterTransactions();
    const totalTransactions = filtered.length;
    const totalPages = Math.ceil(totalTransactions / itemsPerPage);

    // Reset the current page if it exceeds the total pages after filtering
    const currentPage =
      tablePagination.page > totalPages ? 1 : tablePagination.page;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setPageData({
      ...pageData,
      loading: false,
      currentTransactions: filtered.slice(startIndex, endIndex),
    });
    setTablePagination({ page: currentPage, totalPages });
  }, [pageData.transactions, tablePagination.page, pageFilter]);

  return (
    <div className="transactions-page p-4">
      {!pageData.loading && !pageData.err && (
        <>
          <div>
            <h4 className="mb-2">
              <FaFilter /> Filter
            </h4>
            <div className="page-filter mb-4">
              <FormSelect
                defaultOption="All Customers"
                onChange={handleNameFilter}
                options={{ data: pageData.customers, key: "id", value: "name" }}
              />
              <FormInput placeholder="min" onChange={handleMinAmountFilter} />
              <FormInput placeholder="max" onChange={handleMaxAmountFilter} />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <h4 className="mb-2">
                <TbTransactionDollar /> Transactions
              </h4>
              <CustomersTable transactionsData={pageData.currentTransactions} />
            </div>
            <div>
              <Pagination
                currentPage={tablePagination.page}
                totalPages={tablePagination.totalPages}
                onPageChange={(page) =>
                  setTablePagination({ ...tablePagination, page })
                }
              />
            </div>
          </div>
        </>
      )}
      {pageData.loading && <Spinner />}
      {pageData.err && <ErrorComponent message={pageData.err}/>}
    </div>
  );
};

export default TransactionsPage;
