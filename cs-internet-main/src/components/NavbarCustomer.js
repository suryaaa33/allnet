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
  },
  {
    label: "Pengaduan Pelanggan",
    link: "/pengaduan-pelanggan",
  },
];

export default function NavbarCustomer() {
  const location = useLocation();
  const auth = useAuth();
  const { notifications } = auth;
  const [state, setState] = useState({
    openNotif: false,
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
                <Link
                  to={"/"}
                  className="btn text-white rounded-pill text-uppercase btn-sm px-3"
                  style={{ backgroundColor: "#06326C" }}
                >
                  Beranda
                </Link>
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
          <div className="d-flex align-items-center justify-content-between w-100">
            <div>
              <span
                className="py-2 px-4 rounded-pill text-white"
                style={{ backgroundColor: "#06326C" }}
              >
                Selamat Datang, {auth.user?.name}!
              </span>
              <button
                type="button"
                className="btn btn-primary position-relative ms-3"
                style={{
                  backgroundColor: "#06326C",
                }}
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    openNotif: true,
                  }))
                }
              >
                <svg
                  data-name="Layer 1"
                  id="Layer_1"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <title />
                  <path d="M40.62,28.34l-.87-.7A2,2,0,0,1,39,26.08V18A15,15,0,0,0,26.91,3.29a3,3,0,0,0-5.81,0A15,15,0,0,0,9,18v8.08a2,2,0,0,1-.75,1.56l-.87.7a9,9,0,0,0-3.38,7V37a4,4,0,0,0,4,4h8.26a8,8,0,0,0,15.47,0H40a4,4,0,0,0,4-4V35.36A9,9,0,0,0,40.62,28.34ZM24,43a4,4,0,0,1-3.44-2h6.89A4,4,0,0,1,24,43Zm16-6H8V35.36a5,5,0,0,1,1.88-3.9l.87-.7A6,6,0,0,0,13,26.08V18a11,11,0,0,1,22,0v8.08a6,6,0,0,0,2.25,4.69l.87.7A5,5,0,0,1,40,35.36Z" />
                </svg>
                {/* <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
                  <span className="visually-hidden">unread messages</span>
                </span> */}
              </button>
              <div className="position-relative">
                <div
                  className={`card text-bg-light mb-3 position-absolute top-0 start-100 ${
                    state.openNotif ? "" : "d-none"
                  }`}
                  style={{ width: "20rem", zIndex: "100" }}
                >
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <span>Notifikasi</span>
                    <button
                      onClick={() =>
                        setState((prevState) => ({
                          ...prevState,
                          openNotif: false,
                        }))
                      }
                    >
                      close
                    </button>
                  </div>
                  {notifications.map((value, i) => (
                    <div key={i} className="card-body border-bottom">
                      <p className="card-text fs-7">{value.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
            </ul>
            <div className="d-flex flex-column" style={{ gap: "20px" }}>
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}