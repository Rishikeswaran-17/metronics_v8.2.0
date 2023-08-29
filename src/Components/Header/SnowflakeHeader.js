import React from "react";
import SnowflakeAside from "../Aside/SnowflakeAside";

const SnowflakeHeader = () => {
  return (
    <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <SnowflakeAside/>
      <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
        <div
          id="kt_app_header"
          class="app-header bg-black"
          data-kt-sticky="true"
          data-kt-sticky-activate="{default: true, lg: true}"
          data-kt-sticky-name="app-header-minimize"
          data-kt-sticky-offset="{default: '200px', lg: '0'}"
          data-kt-sticky-animation="false"
        >
          <div
            class="app-container container-fluid d-flex align-items-stretch justify-content-between"
            id="kt_app_header_container"
          >
            <div
              class="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2"
              title="Show sidebar menu"
            >
              <div
                class="btn btn-icon btn-active-color-primary w-35px h-35px"
                id="kt_app_sidebar_mobile_toggle"
              >
                <i class="ki-duotone ki-abstract-14 fs-2 fs-md-1">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
            </div>
            <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
              <a href="../../demo1/dist/index.html" class="d-lg-none">
                <img
                  alt="Logo"
                  src="assets/media/logos/default-small.svg"
                  class="h-30px"
                />
              </a>
            </div>
            <div
              class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
              id="kt_app_header_wrapper"
            >
              <div
                class="app-header-menu app-header-mobile-drawer align-items-stretch"
                data-kt-drawer="true"
                data-kt-drawer-name="app-header-menu"
                data-kt-drawer-activate="{default: true, lg: false}"
                data-kt-drawer-overlay="true"
                data-kt-drawer-width="250px"
                data-kt-drawer-direction="end"
                data-kt-drawer-toggle="#kt_app_header_menu_toggle"
                data-kt-swapper="true"
                data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
              >
                <div
                  class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
                  id="kt_app_header_menu"
                  data-kt-menu="true"
                >
                  <div
                    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                    data-kt-menu-placement="bottom-start"
                    class="menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2"
                  >
                    <span class="menu-link">
                      <span class="menu-title">Dashboards</span>
                      <span class="menu-arrow d-lg-none"></span>
                    </span>
                  </div>
                  <div
                    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                    data-kt-menu-placement="bottom-start"
                    class="menu-item menu-lg-down-accordion me-0 me-lg-2"
                  >
                    <span class="menu-link">
                      <span class="menu-title">Pages</span>
                      <span class="menu-arrow d-lg-none"></span>
                    </span>
                  </div>

                  <div
                    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                    data-kt-menu-placement="bottom-start"
                    class="menu-item menu-lg-down-accordion menu-sub-lg-down-indention me-0 me-lg-2"
                  >
                    <span class="menu-link">
                      <span class="menu-title">Apps</span>
                      <span class="menu-arrow d-lg-none"></span>
                    </span>
                  </div>

                  <div
                    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                    data-kt-menu-placement="bottom-start"
                    class="menu-item menu-lg-down-accordion me-0 me-lg-2"
                  >
                    <span class="menu-link">
                      <span class="menu-title">Layouts</span>
                      <span class="menu-arrow d-lg-none"></span>
                    </span>
                  </div>
                  <div
                    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                    data-kt-menu-placement="bottom-start"
                    class="menu-item menu-lg-down-accordion menu-sub-lg-down-indention me-0 me-lg-2"
                  >
                    <span class="menu-link">
                      <span class="menu-title">Help</span>
                      <span class="menu-arrow d-lg-none"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnowflakeHeader;
