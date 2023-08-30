import React, { useEffect } from "react";
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

 return (
  <div className="container p-5">
   <div className="table-responsive">
    <div className="gap-3 flex justify-end">
     <EditScreen />
     <AddScreen />
    </div>
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
       <td class="sorting_1">Tiger Nixon</td>
       <td>System Architect</td>
       <td>Edinburgh</td>
       <td>61</td>
       <td>2011-04-25</td>
       <td>$320,800</td>
      </tr>
      <tr>
       <td class="sorting_1">Garrett Winters</td>
       <td>Accountant</td>
       <td>Tokyo</td>
       <td>63</td>
       <td>2011-07-25</td>
       <td>$170,750</td>
      </tr>
      <tr>
       <td class="sorting_1">Ashton Cox</td>
       <td>Junior Technical Author</td>
       <td>San Francisco</td>
       <td>66</td>
       <td>2009-01-12</td>
       <td>$86,000</td>
      </tr>
      <tr>
       <td class="sorting_1">Cedric Kelly</td>
       <td>Senior Javascript Developer</td>
       <td>Edinburgh</td>
       <td>22</td>
       <td>2012-03-29</td>
       <td>$433,060</td>
      </tr>
      <tr>
       <td class="sorting_1">Airi Satou</td>
       <td>Accountant</td>
       <td>Tokyo</td>
       <td>33</td>
       <td>2008-11-28</td>
       <td>$162,700</td>
      </tr>
      <tr>
       <td class="sorting_1">Brielle Williamson</td>
       <td>Integration Specialist</td>
       <td>New York</td>
       <td>61</td>
       <td>2012-12-02</td>
       <td>$372,000</td>
      </tr>
      <tr>
       <td class="sorting_1">Donna Snider</td>
       <td>Customer Support</td>
       <td>New York</td>
       <td>27</td>
       <td>2011-01-25</td>
       <td>$112,000</td>
      </tr>
      <tr>
       <td class="sorting_1">Jonas Alexander</td>
       <td>Developer</td>
       <td>San Francisco</td>
       <td>30</td>
       <td>2010-07-14</td>
       <td>$86,500</td>
      </tr>
      <tr>
       <td class="sorting_1">Shad Decker</td>
       <td>Regional Director</td>
       <td>Edinburgh</td>
       <td>51</td>
       <td>2008-11-13</td>
       <td>$183,000</td>
      </tr>
      <tr>
       <td class="sorting_1">Michael Bruce</td>
       <td>Javascript Developer</td>
       <td>Singapore</td>
       <td>29</td>
       <td>2011-06-27</td>
       <td>$183,000</td>
      </tr>
      <tr>
       <td class="sorting_1">Donna Snider</td>
       <td>Customer Support</td>
       <td>New York</td>
       <td>27</td>
       <td>2011-01-25</td>
       <td>$112,000</td>
      </tr>
      <tr>
       <td class="sorting_1">Jonas Alexander</td>
       <td>Developer</td>
       <td>San Francisco</td>
       <td>30</td>
       <td>2010-07-14</td>
       <td>$86,500</td>
      </tr>
      <tr>
       <td>Shad Decker</td>
       <td>Regional Director</td>
       <td>Edinburgh</td>
       <td>51</td>
       <td>2008-11-13</td>
       <td>$183,000</td>
      </tr>
      <tr>
       <td>Michael Bruce</td>
       <td>Javascript Developer</td>
       <td>Singapore</td>
       <td>29</td>
       <td>2011-06-27</td>
       <td>$183,000</td>
      </tr>
      <tr>
       <td>Donna Snider</td>
       <td>Customer Support</td>
       <td>New York</td>
       <td>27</td>
       <td>2011-01-25</td>
       <td>$112,000</td>
      </tr>
      <tr>
       <td>Jonas Alexander</td>
       <td>Developer</td>
       <td>San Francisco</td>
       <td>30</td>
       <td>2010-07-14</td>
       <td>$86,500</td>
      </tr>
      <tr>
       <td>Shad Decker</td>
       <td>Regional Director</td>
       <td>Edinburgh</td>
       <td>51</td>
       <td>2008-11-13</td>
       <td>$183,000</td>
      </tr>
      <tr>
       <td>Michael Bruce</td>
       <td>Javascript Developer</td>
       <td>Singapore</td>
       <td>29</td>
       <td>2011-06-27</td>
       <td>$183,000</td>
      </tr>
      <tr>
       <td>Donna Snider</td>
       <td>Customer Support</td>
       <td>New York</td>
       <td>27</td>
       <td>2011-01-25</td>
       <td>$112,000</td>
      </tr>
      <tr>
       <td>Jonas Alexander</td>
       <td>Developer</td>
       <td>San Francisco</td>
       <td>30</td>
       <td>2010-07-14</td>
       <td>$86,500</td>
      </tr>
      <tr>
       <td>Shad Decker</td>
       <td>Regional Director</td>
       <td>Edinburgh</td>
       <td>51</td>
       <td>2008-11-13</td>
       <td>$183,000</td>
      </tr>
      <tr>
       <td>Michael Bruce</td>
       <td>Javascript Developer</td>
       <td>Singapore</td>
       <td>29</td>
       <td>2011-06-27</td>
       <td>$183,000</td>
      </tr>
      <tr>
       <td>Donna Snider</td>
       <td>Customer Support</td>
       <td>New York</td>
       <td>27</td>
       <td>2011-01-25</td>
       <td>$112,000</td>
      </tr>
     </tbody>

    </table>
   </div>
  </div>
 );
}

export default DataTables;
