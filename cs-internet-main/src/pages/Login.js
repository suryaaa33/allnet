import { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/AuthProvider";

export default function Login() {
  const auth = useAuth();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.loginAction(state);
  };

  return (
    <Layout>
      <div className="my-5">
        <img
          src={"/images/logo.png"}
          alt="image-logo"
          className="img-fluid mx-auto d-block w-25 mb-5"
        />
        <div className="d-flex justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="px-4 rounded-4 text-white w-50"
            style={{
              backgroundColor: "#002462",
              paddingTop: "50px",
              paddingBottom: "50px",
            }}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="ID Pelanggan/Username"
                id="username"
                value={state.username}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="password"
                value={state.password}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn rounded-pill fw-semibold text-uppercase"
                style={{
                  backgroundColor: "#007BE5",
                  paddingLeft: "80px",
                  paddingRight: "80px",
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
