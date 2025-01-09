import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { useAuth } from "../hooks/AuthProvider";
import { useState } from "react";

const menus = [
  {
    label: "Tentang Kami",
    link: "/tentang-kami",
  },
  {
    label: "Layanan",
    link: "/layanan",
  },
  {
    label: "Paket Internet",
    link: "/paket-internet",
  },
  {
    label: "FAQ",
    link: "/faq"
  }
];

export default function Navbar() {
  const location = useLocation();
  const auth = useAuth();
  const [state, setState] = useState({
    openCekArea: false,
  });

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="text-center">
          <a className="navbar-brand" href="/">
            <img
              src={"/images/logo.png"}
              alt="image-logo"
              width="150"
              height="150"
              className="d-inline-block align-text-top img-fluid"
            />
          </a>
          <div>
            {!auth.token && (
              <>
                <Link
                  to={"/login"}
                  type="button"
                  className="btn text-white rounded-pill text-uppercase btn-sm px-3 me-3"
                  style={{ backgroundColor: "#06326C" }}
                >
                  Login
                </Link>
                {/* <Link
                  to={"/"}
                  className="btn text-white rounded-pill text-uppercase btn-sm px-3"
                  style={{ backgroundColor: "#06326C" }}
                >
                  Beranda
                </Link> */}
              </>
            )}
          </div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          {auth.token ? (
            <div className="d-flex align-items-center justify-content-between w-100">
              <span
                className="py-2 px-4 rounded-pill text-white"
                style={{ backgroundColor: "#06326C" }}
              >
                Selamat Datang, {auth.user?.name}!
              </span>
              {/* <div className="d-flex flex-column" style={{ gap: "20px" }}>
                <button
                  onClick={() => auth.logOut()}
                  type="button"
                  className="btn text-white rounded-pill text-uppercase btn-sm px-3"
                  style={{ backgroundColor: "#06326C" }}
                >
                  Logout
                </button>
                <Link
                  to={"/"}
                  className="btn text-white rounded-pill text-uppercase btn-sm px-3"
                  style={{ backgroundColor: "#06326C" }}
                >
                  Beranda
                </Link>
              </div> */}
            </div>
          ) : (
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {menus.map((value, i) => (
                <li key={i} className="nav-item">
                  <Link
                    to={value.link}
                    className={`nav-link ${
                      location.pathname === value.link ? "text-dark" : ""
                    }`}
                  >
                    {value.label}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link"
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      openCekArea: true,
                    }))
                  }
                >
                  Cek Area
                </button>
                <div className="position-relative">
                  <div
                    className={`card text-bg-light mb-3 position-absolute top-0 start-100 ${
                      state.openCekArea ? "" : "d-none"
                    }`}
                    style={{ width: "20rem", zIndex: "100" }}
                  >
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <span>List Cek Area</span>
                      <button
                        onClick={() =>
                          setState((prevState) => ({
                            ...prevState,
                            openCekArea: false,
                          }))
                        }
                      >
                        close
                      </button>
                    </div>
                    <div className="card-body border-bottom">
                      <ul>
                        <li>PANONGAN</li>
                        <li>PASIR RANDU</li>
                        <li>TIGARAKSA</li>
                        <li>BALARAJA</li>
                        <li>RANCA KELAPA</li>
                        <li>CIRINTEN-LEBAK</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
