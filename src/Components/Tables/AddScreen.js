import React, { useEffect, useState } from "react";

const AddScreen = () => {
  const [tablename, setTablename] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableCategories, setTableCategories] = useState([]);
  const [formData, setFormData] = useState({}); // State to hold input values

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
      const response = await fetch("/tablenamecategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tableName: selectedTableName })
      });
      const data = await response.json();
      console.log("Fetched categories from backend:", data.categories); // Log fetched categories
  
      setTableCategories(data.categories); // This line updates the state with the fetched categories
  
      console.log("Updated tableCategories state:", tableCategories); // Log updated state
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        console.log("Form data to be submitted:", formData); // Log form data

        const dataToSend = {
          tableName: selectedTable,
          dataToInsert: formData
        };

      console.log("Data to be sent to backend:", dataToSend); // Log data with tableName

      // Send formData to your backend for database insertion
      const response = await fetch("/insertData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();
      console.log("Response from backend:", responseData); 
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };
  console.log("Rendering AddScreen component"); // Log when component renders

  return (
    <div>
      <button
        type="button"
        className="btn btn-light-primary border-1 border-dashed border-primary btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_1"
      >
        Insert
      </button>

      <div
        className="modal fade"
        tabIndex="-1"
        id="kt_modal_1"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title font-semibold text-primary">Add new</h1>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ki-duotone ki-cross fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            </div>
            <div className="modal-body scroll h-500px">
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

                {/* Render table categories here */}
                {tableCategories.map((category, index) => (
    <div key={index}>
      <label className="fs-6 fw-semibold form-label mt-3">
        <span className="required">{category}</span>
      </label>
      <input
        type="text"
        className="form-control form-control-solid"
        name={category} // Using original category name as input name
        value={formData[category] || ''} // Bind input value to state
        onChange={handleInputChange} // Handle input changes
      />
    </div>
  ))}
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleSubmit} type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*end::Add */}
    </div>
  );
};

export default AddScreen;
