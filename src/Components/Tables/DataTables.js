import React, { useEffect, useState } from "react";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.min";

import AddScreen from './AddScreen'
import EditScreen from "./EditScreen";

const DataTables = () => {
 useEffect(() => {
  // $("#kt_datatable_example_5").DataTable({
  //  dom: 'Bfrtip',
  //  buttons: [
  //   {
  //    extend: 'copyHtml5',
  //    exportOptions: {
  //     format: {
  //      body: function (data, row, column, node) {
  //       return column === 5 ? data.replace(/[$,]/g, '') : data;
  //      },
  //     },
  //    },
  //   },
  //   {
  //    extend: 'excelHtml5',
  //    exportOptions: {
  //     format: {
  //      body: function (data, row, column, node) {
  //       return column === 5 ? data.replace(/[$,]/g, '') : data;
  //      },
  //     },
  //    },
  //   },
  //   {
  //    extend: 'pdfHtml5',
  //    exportOptions: {
  //     format: {
  //      body: function (data, row, column, node) {
  //       return column === 5 ? data.replace(/[$,]/g, '') : data;
  //      },
  //     },
  //    },
  //   },
  //  ],
  // });
  $("#kt_datatable_example_5").DataTable();
 }, []);

 const [tablename, setTablename] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tabledetails, setTabledetails] = useState([]);
  useEffect(() => {
    fetchTablename();
  }, []);
  const fetchTablename = async () => {
    try {
      const response = await fetch("/gettablename");
      const data = await response.json();
      setTablename(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTableChange = async (event) => {
    const selectedTableName = event.target.value;
    setSelectedTable(selectedTableName);
    try {
      const response = await fetch("/tablecategorieswithvalue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName: selectedTableName }),
      });
      const data = await response.json();
      console.log("Fetched data from backend:", data); 
      setTabledetails(data); 
      console.log("Updated tableCategories state:", data); 
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (tabledetails.length > 0) {
      $("#kt_datatable_example_5").DataTable().destroy(); // Destroy existing DataTable instance
      $("#kt_datatable_example_5").DataTable(); // Reinitialize DataTable with new data
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
            onChange={handleTableChange}
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
       <th class="sorting sorting_asc"
        tabindex="0"
        aria-controls="kt_datatable_example_5"
        rowspan="1"
        colspan="1"
        aria-sort="ascending"
        aria-label="Name: activate to sort column descending"
        style={{ width: "186.516px" }}>Name</th>
       <th
        class="sorting"
        tabindex="0"
        aria-controls="kt_datatable_example_5"
        rowspan="1"
        colspan="1"
        aria-label="Position: activate to sort column ascending"
        style={{ width: "294.109px" }}
       >Position</th>
       <th
        class="sorting"
        tabindex="0"
        aria-controls="kt_datatable_example_5"
        rowspan="1"
        colspan="1"
        aria-label="Salary: activate to sort column ascending"
        style={{ width: "130.844px" }}
       >Office</th>
       <th
        class="sorting"
        tabindex="0"
        aria-controls="kt_datatable_example_5"
        rowspan="1"
        colspan="1"
        aria-label="Office: activate to sort column ascending"
        style={{ width: "78.6719px" }}
       >Age</th>
       <th
        class="sorting"
        tabindex="0"
        aria-controls="kt_datatable_example_5"
        rowspan="1"
        colspan="1"
        aria-label="Extn.: activate to sort column ascending"
        style={{ width: "108.375px" }}
       >Start date</th>
       <th
        class="sorting"
        tabindex="0"
        aria-controls="kt_datatable_example_5"
        rowspan="1"
        colspan="1"
        aria-label="E-mail: activate to sort column ascending"
        style={{ width: "117.734px" }}
       >Salary</th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td class="">Tiger Nixon</td>
       <td>System Architect</td>
       <td>Edinburgh</td>
       <td>61</td>
       <td>2011-04-25</td>
       <td>$320,800</td>
      </tr>
      <tr>
       <td class="">Tiger Nixon</td>
       <td>System Architect</td>
       <td>Edinburgh</td>
       <td>61</td>
       <td>2011-04-25</td>
       <td>$320,5400</td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 );
}

export default DataTables;
