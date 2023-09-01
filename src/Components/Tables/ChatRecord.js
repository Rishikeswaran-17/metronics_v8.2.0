import React, { useEffect, useState } from "react";
import DataTables from "./DataTables";
const ChatRecord = () => {

  return (
    <div>
      <div id="kt_header" class="header align-items-stretch  bg-primary ">
        <div class="container-xxl d-flex align-items-stretch justify-content-between">
          <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 w-lg-225px me-5">
            <a href="../../demo1/dist/index.html" class="">
              <img
                alt="Logo"
                src="https://cdn-ehkcj.nitrocdn.com/jNvWlyDKiTewoPhgmESQyjXHnnzLhaun/assets/images/optimized/rev-95b4f45/www.techvista.com/wp-content/themes/systems/assets/images/logo-techvista.png"
                class="h-40px bg-success rounded-lg px-4"
              />
            </a>
          </div>
          <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
            <h3 className="text-hover-success flex justify-center items-center pt-4 text-6xl fs-2hx text-white fw-bolder mb-5">
              Snowflake DS Solution
            </h3>
          </div>
        </div>
      </div>
      <div
        id="kt_aside"
        class="aside aside-dark aside-hoverable h-full bg-black"
        data-kt-drawer="true"
        data-kt-drawer-name="aside"
        data-kt-drawer-activate="{default: true, lg: false}"
        data-kt-drawer-overlay="true"
        data-kt-drawer-width="{default:'200px', '300px': '250px'}"
        data-kt-drawer-direction="start"
        data-kt-drawer-toggle="#kt_aside_mobile_toggle"
      >
        <div class="aside-menu flex-column-fluid">
          <div
            class="hover-scroll-overlay-y my-5 my-lg-5"
            id="kt_aside_menu_wrapper"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-height="auto"
            data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
            data-kt-scroll-wrappers="#kt_aside_menu"
            data-kt-scroll-offset="0"
          >
            <div
              class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
              id="#kt_aside_menu"
              data-kt-menu="true"
            >
              <div class="menu-item">
                <div class="menu-content pb-2">
                  <span class="menu-section text-muted text-4xl  ls-1">
                    Dashboard
                  </span>
                </div>
              </div>
              <div class="menu-item">
                <a class="menu-link active" href="">
                  <span class="menu-icon">
                    <span class="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="black"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="black"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="black"
                        />
                        <rect
                          opacity="0.3"
                          x="2"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </span>
                  <span class="menu-title text-2xl ">Reports</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DataTables />
    </div>
  );
};
export default ChatRecord;
