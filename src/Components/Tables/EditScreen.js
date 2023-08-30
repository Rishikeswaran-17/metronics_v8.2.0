import React, { useEffect, useState } from "react";
const EditScreen = () => {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
                  <div class="fs-6 form-check form-check-custom form-check-solid form-check-success mt-3 d-flex align-items-center gap-14">
                    <div>
                      <label class="form-check form-check-sm me-5" for={category}>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name={category} // Using original category name as input name
                          value={formData[category] || ""} // Bind input value to state
                          onChange={handleInputChange} // Handle input changes
                          id={category}
                        />
                        <span class="form-check-label">{category}</span>
                      </label>
                    </div>
                    
                  </div>
                ))}
                
                <label class="fs-6 fw-semibold form-label mt-5">
                  <span class="required">Country</span>
                </label>

                <input
                  type="text"
                  class="form-control form-control-solid"
                  name="country"
                />

                <label class="fs-6 fw-semibold form-label mt-3">
                  <span class="required">City</span>
                </label>

                <input
                  type="text"
                  class="form-control form-control-solid"
                  name="city"
                />

                <label class="fs-6 fw-semibold form-label mt-3">
                  <span class="required">Currency</span>
                </label>

                <input
                  type="text"
                  class="form-control form-control-solid"
                  name="currency"
                />

                <label class="fs-6 fw-semibold form-label mt-3">
                  <span class="required">Latitude</span>
                </label>

                <input
                  type="text"
                  class="form-control form-control-solid"
                  name="latitude"
                />

                <label class="fs-6 fw-semibold form-label mt-3">
                  <span class="required">Longitude</span>
                </label>

                <input
                  type="text"
                  class="form-control form-control-solid"
                  name="longitude"
                />

                <label class="fs-6 fw-semibold form-label mt-3">
                  <span class="required">Phone Code</span>
                </label>

                <input
                  type="text"
                  class="form-control form-control-solid"
                  name="phone"
                />

                <label class="fs-6 fw-semibold form-label mt-3">
                  <span class="required">Capital</span>
                </label>

                <input
                  type="text"
                  class="form-control form-control-solid"
                  name="capital"
                />
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
              <button type="button" class="btn btn-primary">
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
