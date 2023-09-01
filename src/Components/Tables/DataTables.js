import React, { useEffect, useState } from "react";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.min";

import AddScreen from './AddScreen'
import EditScreen from "./EditScreen";

const DataTables = () => {
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
    if (tabledetails.length > 0) {
      if ($.fn.DataTable.isDataTable("#kt_datatable_example_5")) {
        // DataTable already initialized, destroy it
        $("#kt_datatable_example_5").DataTable().destroy();
      }

      // Initialize DataTable with new data
      $("#kt_datatable_example_5").DataTable();
    }
  }, [tabledetails]);

 return (
  <div className="container p-5">
   <div className="table-responsive">
    <div className="gap-3 flex justify-end">
     <EditScreen />
     <AddScreen />
    </div>
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
    <table
     id="kt_datatable_example_5"
     className="display hover table table-striped gy-5 gs-7 border rounded dataTable no-footer"
     style={{ width: "100%" }}
    >
     <thead>
      <tr className="fw-bolder fs-6 text-gray-800 px-7">
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
  </div>
 );
}

export default DataTables;
