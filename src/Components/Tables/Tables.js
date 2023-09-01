import React, { useEffect, useState } from "react";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.min";

import AddScreen from "./AddScreen";
import EditScreen from "./EditScreen";

const Tables = () => {
  const [tablename, setTablename] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tabledetails, setTabledetails] = useState([]);
  useEffect(() => {
    console.log("Fetching table names...");
    fetchTablename();
  }, []);
  useEffect(() => {
    if (selectedTable) {
      console.log("Fetching table data for selected table:", selectedTable);
      fetchTableData(selectedTable);
    }
  }, [selectedTable]);
  const fetchTablename = async () => {
    try {
      const response = await fetch("/gettablename");
      const data = await response.json();
      console.log("Fetched table names:", data);
      setTablename(data);
    } catch (error) {
      console.error("Error fetching table names:", error);
    }
  };
  const fetchTableData = async (tableName) => {
    try {
      const response = await fetch("/tablecategorieswithvalue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName }),
      });
      const data = await response.json();
      console.log("Fetched table data for", tableName, ":", data);
      setTabledetails(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };
  useEffect(() => {
    console.log("Selected table:", selectedTable);
    console.log("Table details:", tabledetails);
  }, [selectedTable, tabledetails]);

  return (
    <div class="container p-5">
      <div class="my-5">
        <div className="gap-3 flex justify-end">
          <EditScreen />
          <AddScreen />
        </div>
        <div class="row mt-5">
        <div>
          <form>
            <label className="fs-6 fw-semibold form-label mt-3">
              <span className="required">Select Table</span>
            </label>
            <select
              className="form-select form-select-solid required"
              aria-label="Select example"
              onChange={(event) => setSelectedTable(event.target.value)}
              value={selectedTable}
            >
              <option value=""></option>
              {tablename.map((table, index) => (
                <option key={index} value={table.TABLE_NAME}>
                  {table.TABLE_NAME}
                </option>
              ))}
            </select>
          </form>
        </div>
          <div class="col-sm-6 d-flex align-items-center justify-conten-start">
            <div class="dataTables_length" id="kt_datatable_example_5_length">
              <label>
                Show{" "}
                <select
                  name="kt_datatable_example_5_length"
                  aria-controls="kt_datatable_example_5"
                  class="form-select form-select-sm form-select-solid"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </label>
            </div>
          </div>
          <div class="col-sm-6 d-flex align-items-center justify-content-end">
            <div id="kt_datatable_example_5_filter" class="dataTables_filter">
              <label>
                Search:
                <input
                  type="search"
                  class="form-control form-control-sm form-control-solid"
                  placeholder=""
                  aria-controls="kt_datatable_example_5"
                />
              </label>
            </div>
          </div>
        </div>
        
        <div class="dataTables_wrapper dt-bootstrap4 no-footer">
          <div class="table-responsive">
          <table
  id="kt_datatable_example_5"
  class="table gy-5 gs-7 border rounded dataTable no-footer"
  aria-describedby="kt_datatable_example_5_info"
>
  <thead>
    <tr class="fw-bold fs-7 text-gray-600 uppercase px-7">
      {selectedTable &&
        tabledetails &&
        tabledetails.length > 0 &&
        Object.keys(tabledetails[0]).map((column, index) => (
          <th
            class="sorting sorting_asc"
            tabindex="0"
            aria-controls="kt_datatable_example_5"
            rowspan="1"
            colspan="1"
            aria-sort="ascending"
            aria-label="Name: activate to sort column descending"
            style={{ width: "186.516px" }}
            key={index}
          >
            {column}
          </th>
        ))}
    </tr>
  </thead>
  <tbody>
    {selectedTable &&
      tabledetails &&
      tabledetails.length > 0 &&
      tabledetails.map((row, rowIndex) => (
        <tr
          style={{
            backgroundColor: rowIndex % 2 === 0 ? "#f2f2f2" : "#ffffff", // Alternating row colors
          }}
          key={rowIndex}
        >
          {Object.values(row).map((value, colIndex) => (
            <td class="sorting_1" key={colIndex}>
              {value}
            </td>
          ))}
        </tr>
      ))}
  </tbody>
</table>

          </div>
          {/* <div class="row">
            <div class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
              <div
                class="dataTables_info"
                id="kt_datatable_example_5_info"
                role="status"
                aria-live="polite"
              >
                Showing 1 to 10 of 57 records
              </div>
            </div>
            <div class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
              <div
                class="dataTables_paginate paging_simple_numbers"
                id="kt_datatable_example_5_paginate"
              >
                <ul class="pagination">
                  <li
                    class="paginate_button page-item previous disabled"
                    id="kt_datatable_example_5_previous"
                  >
                    <a
                      href="#"
                      aria-controls="kt_datatable_example_5"
                      data-dt-idx="0"
                      tabindex="0"
                      class="page-link"
                    >
                      <i class="previous"></i>
                    </a>
                  </li>
                  <li class="paginate_button page-item active">
                    <a
                      href="#"
                      aria-controls="kt_datatable_example_5"
                      data-dt-idx="1"
                      tabindex="0"
                      class="page-link"
                    >
                      1
                    </a>
                  </li>
                  <li class="paginate_button page-item ">
                    <a
                      href="#"
                      aria-controls="kt_datatable_example_5"
                      data-dt-idx="2"
                      tabindex="0"
                      class="page-link"
                    >
                      2
                    </a>
                  </li>
                  <li class="paginate_button page-item ">
                    <a
                      href="#"
                      aria-controls="kt_datatable_example_5"
                      data-dt-idx="3"
                      tabindex="0"
                      class="page-link"
                    >
                      3
                    </a>
                  </li>
                  <li class="paginate_button page-item ">
                    <a
                      href="#"
                      aria-controls="kt_datatable_example_5"
                      data-dt-idx="4"
                      tabindex="0"
                      class="page-link"
                    >
                      4
                    </a>
                  </li>
                  <li class="paginate_button page-item ">
                    <a
                      href="#"
                      aria-controls="kt_datatable_example_5"
                      data-dt-idx="5"
                      tabindex="0"
                      class="page-link"
                    >
                      5
                    </a>
                  </li>
                  <li class="paginate_button page-item ">
                    <a
                      href="#"
                      aria-controls="kt_datatable_example_5"
                      data-dt-idx="6"
                      tabindex="0"
                      class="page-link"
                    >
                      6
                    </a>
                  </li>
                  <li
                    class="paginate_button page-item next"
                    id="kt_datatable_example_5_next"
                  >
                    <a
                      href="#"
                      aria-controls="kt_datatable_example_5"
                      data-dt-idx="7"
                      tabindex="0"
                      class="page-link"
                    >
                      <i class="next"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Tables;