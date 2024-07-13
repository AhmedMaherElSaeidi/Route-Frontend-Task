import "./CustomersTable.css";
import React from "react";

const CustomersTable = ({ transactionsData }) => {
  return (
    <div className="react-table">
      <div className="table-responsive table--no-card m-b-30 p-4">
        <table className="table table-borderless table-hover table-earning m-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NAME</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">DATE</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData &&
              transactionsData.map((content, contenti) => {
                return (
                  <tr key={contenti}>
                    <th scope="row">{content.id}</th>
                    <td>{content.customer.name}</td>
                    <td>{content.amount}</td>
                    <td>{content.date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
