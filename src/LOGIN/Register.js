import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [bgVideo, setBgVideo] = useState(true);
  const register = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", passwordHash);
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, passwordHash }),
      });
      if (response.ok) {
        const isAdmin = email === "shahul@hotmail.com"; // Check if the user is an admin based on the email
        if (isAdmin) {
          console.log("Redirecting to admin_page...");
          navigate("/admin_page"); // Redirect admin to admin_homepage
        } else {
          const itdPattern = /^[a-zA-Z]+\.itd@gmail\.com$/i;
          const snowflakePattern = /\.snowflake\.com$/i;
          const businessPandPPattern = /\.business\.pandp@gmail\.com$/i;
          const businessFinancePattern = /\.business\.finance@gmail\.com$/i;
          const businessAccountsPattern = /\.business\.accounts@gmail\.com$/i;
          const businessAuditPattern = /\.business\.audit@gmail\.com$/i;
          const hrPattern = /\.hr@gmail\.com$/i;
          const customerpattern = /\.@gmail\.com$/i;

          if (itdPattern.test(email)) {
            console.log("Redirecting to ITDstaff page...");
            navigate("/itdstaff"); // Redirect ITD staff to ITDstaff page
          } else if (snowflakePattern.test(email)) {
            console.log("Redirecting to Snowflake staff page...");
            navigate("/snowflakestaff"); // Redirect Snowflake staff to Snowflakestaff page
          } else if (businessPandPPattern.test(email)) {
            console.log("Redirecting to policy and procedure page...");
            navigate("/pandpprocedure"); // Redirect to finance page
          } else if (businessFinancePattern.test(email)) {
            console.log("Redirecting to finance page...");
            navigate("/finance"); // Redirect to finance page
          } else if (businessAccountsPattern.test(email)) {
            console.log("Redirecting to accounts page...");
            navigate("/accounts"); // Redirect to accounts page
          } else if (businessAuditPattern.test(email)) {
            console.log("Redirecting to audit page...");
            navigate("/audit"); // Redirect to audit page
          } else if (hrPattern.test(email)) {
            console.log("Redirecting to hrpage...");
            navigate("/HRpage"); // Redirect to hrpage
          } else if (customerpattern.test(email)) {
            console.log("Redirecting to customerpage...");
            navigate("/snowflake"); // Redirect to hrpage
          } else {
            if (location.pathname === "/homepage") {
              console.log("You are not authorized to access this page.");
            } else {
              const { from } = location.state || {
                from: { pathname: "/homepage" },
              };
              console.log("Redirecting to:", from);
              navigate(from); // Redirect regular user to the previous page or /homepage
            }
          }
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const bgThemeSwitch = () => {
    setBgVideo(!bgVideo);
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div id="kt_body" class="bg-body">
      <div class="d-flex flex-column flex-root">
        <div class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
          <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
            <a href="../../demo1/dist/index.html" class="mb-12">
              <img
                alt="Logo"
                src="https://cdn-ehkcj.nitrocdn.com/jNvWlyDKiTewoPhgmESQyjXHnnzLhaun/assets/images/optimized/rev-95b4f45/www.techvista.com/wp-content/themes/systems/assets/images/logo-techvista.png"
                class="h-40px bg-danger rounded-lg px-4  "
              />
            </a>
            <div class="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
              <form
                class="form w-100"
                novalidate="novalidate"
                id="kt_sign_up_form"
              >
                <div class="mb-10 text-center">
                  <h1 class="text-dark mb-3">Create an Account</h1>
                  <div class="text-gray-400 fw-bold fs-4">
                    Already have an account?
                    <a href="/login" class="link-primary fw-bolder">
                      Sign in here
                    </a>
                  </div>
                </div>
                <div class="row fv-row mb-7">
                  <div class="">
                    <label class="form-label fw-bolder text-dark fs-6">
                      User Name
                    </label>
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="johndoe@company.com"
                      autocomplete="off"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    
                  </div>
                </div>
                <div class="fv-row mb-7">
                  <label class="form-label fw-bolder text-dark fs-6">
                    Email
                  </label>
                  <input
                    class="form-control form-control-lg form-control-solid"
                    type="email"
                    name="EmailID"
                    id="EmailID"
                    placeholder="johndoe@company.com"
                    autocomplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="fv-row mb-5">
                  <label class="form-label fw-bolder text-dark fs-6">
                    Password
                  </label>
                  <input
                    class="form-control form-control-lg form-control-solid"
                    type="password"
                    name="Password"
                    id="Password"
                    placeholder="••••••••"
                    autocomplete="off"
                    value={passwordHash}
                    onChange={(e) => setPasswordHash(e.target.value)}
                    required
                  />
                </div>
                <div class="text-center">
                  <button
                    type="button"
                    id="kt_sign_up_submit"
                    class="btn btn-lg btn-primary"
                    onClick={register}
                  >
                    <span class="indicator-label">Submit</span>
                    <span class="indicator-progress">
                      Please wait...
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="d-flex flex-center flex-column-auto p-10">
            <div class="d-flex align-items-center fw-bold fs-6">
              <a
                href="https://keenthemes.com"
                class="text-muted text-hover-primary px-2"
              >
                About
              </a>
              <a
                href="mailto:support@keenthemes.com"
                class="text-muted text-hover-primary px-2"
              >
                Contact
              </a>
              <a
                href="https://1.envato.market/EA4JP"
                class="text-muted text-hover-primary px-2"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
