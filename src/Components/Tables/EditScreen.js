import React, { useEffect, useState } from "react";
const EditScreen = () => {
  const [tablename, setTablename] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableCategories, setTableCategories] = useState([]);
  const [formData, setFormData] = useState({}); // State to hold input values
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); // State to track selected checkboxes
  const [checkboxValues, setCheckboxValues] = useState({}); // State to hold checkbox input values

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName: selectedTableName }),
      });
      const data = await response.json();
      console.log("Fetched categories from backend:", data.categories); // Log fetched categories

      setTableCategories(data.categories); // This line updates the state with the fetched categories

      console.log("Updated tableCategories state:", tableCategories); // Log updated state
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckboxChange = (event) => {
    const category = event.target.name;
    const isChecked = event.target.checked;

    // Update the selected checkboxes state
    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, category]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((item) => item !== category)
      );
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input change:", name, value); // Add this line for debugging
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        console.log("Form data to be submitted:", formData); // Log form data

        const dataToSend = {
          tableName: selectedTable,
          dataToUpdate: formData
        };

      console.log("Data to be sent to backend:", dataToSend); // Log data with tableName

      // Send formData to your backend for database insertion
      const response = await fetch("/updateData", {
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
        class="btn btn-light-danger border-danger border-dashed border-1 btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_2"
      >
        Update
      </button>

      <div
        class="modal fade"
        tabindex="-1"
        id="kt_modal_2"
        data-bs-backdrop="static"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title font-semibold text-primary">
                Edit Screen
              </h1>

              {/*begin::Close*/}
              <div
                class="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="ki-duotone ki-cross fs-1">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              {/*end::Close*/}
            </div>

            <div class="modal-body scroll h-500px px-5">
              <form>
                {/* Check box */}
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
                {tableCategories.map((category, index) => (
          <div
            className="fs-6 form-check form-check-custom form-check-solid form-check-success mt-3 d-flex justify-between"
            key={index}
          >
            <div>
              <label className="form-check form-check-sm me-5" htmlFor={category}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={category}
                  value={checkboxValues[category] || ""}
                  onChange={handleCheckboxChange}
                  id={category}
                />
                <span className="form-check-label">{category}</span>
              </label>
            </div>
            {selectedCheckboxes.includes(category) && (
              <div className="mr-16">
                <label className="fs-6 fw-semibold form-label mt-5 ">
                  <span className="required">{category}</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-solid w-fit"
                  name={category}
                  value={formData[category] || ""}
                  onChange={handleInputChange}
                />
              </div>
            )}
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
              <button  onClick={handleSubmit} type="button" class="btn btn-primary">
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

export default EditScreen;
