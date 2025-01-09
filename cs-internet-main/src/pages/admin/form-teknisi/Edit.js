import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import useUser from "../../../hooks/User";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FormEditTeknisi() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const user_id = searchParams.get("user_id");

  const { updateUser, findUserById } = useUser();
  const [state, setState] = useState({
    form: {
      uuid: "",
      name: "",
      email: "",
      area: "",
      status: "",
    },
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Logic
      await updateUser(user_id, {
        ...state.form,
        role: "technician",
      });
      navigate("/data-teknisi");
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await findUserById(user_id);
      setState((prevState) => ({
        ...prevState,
        form: {
          uuid: data.data.uuid,
          name: data.data.name,
          email: data.data.email,
          area: data.data.area,
          status: data.data.status,
        },
      }));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Form Edit Teknisi
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-4 text-white"
          style={{ backgroundColor: "#002462" }}
        >
          <div className="mb-3 text-center fs-4">
            <label className="form-label">ID Teknisi</label>
            <br />
            <span>{state.form.uuid}</span>
          </div>
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
