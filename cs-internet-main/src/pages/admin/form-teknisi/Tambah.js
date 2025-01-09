import { useState } from "react";
import Layout from "../../../components/Layout";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/User";

export default function FormTambahTeknisi() {
  const navigate = useNavigate();
  const { createUser } = useUser();

  const [state, setState] = useState({
    form: {
      name: "",
      email: "",
      password: "",
      area: "",
      status: "",
    },
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Logic
      await createUser({
        ...state.form,
        role: "technician",
      });
      navigate("/data-teknisi");
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Form Tambah Teknisi
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-4 text-white"
          style={{ backgroundColor: "#002462" }}
        >
          <div className="mb-3">
            <label className="form-label">Nama Teknisi</label>
            <input
              type="text"
              className="form-control"
              value={state.form.name}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    name: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Teknisi</label>
            <input
              type="text"
              className="form-control"
              value={state.form.email}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    email: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={state.form.password}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    password: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Area</label>
            <input
              type="text"
              className="form-control"
              value={state.form.area}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    area: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label for="status" className="form-label">
              Status :
            </label>
            <select
              className="form-select"
              value={state.form.status}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    status: e.target.value,
                  },
                }))
              }
            >
              <option disabled value="">
                Pilih Status
              </option>
              <option value="Available">Available</option>
              <option value="Non Available">Non Available</option>
            </select>
          </div>

          <div className="d-flex justify-content-end mb-4">
            <button
              type="submit"
              className="btn rounded-pill fw-semibold"
              style={{
                backgroundColor: "#007BE5",
                paddingLeft: "80px",
                paddingRight: "80px",
              }}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
