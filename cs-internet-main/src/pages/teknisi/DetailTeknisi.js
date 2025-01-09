import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../hooks/AuthProvider";

export default function DetailTeknisi() {
  const { user } = useAuth();
  const [state, setState] = useState({
    form: {
      uuid: "",
      name: "",
      area: "",
      status: "",
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        uuid: user?.uuid,
        name: user?.name,
        area: user?.area,
        status: user?.status,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user_id]);

  const handleSubmit = async () => {
    try {
      console.log("Sukses");
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Detail Teknisi
        </h2>
        <div className="d-flex justify-content-center">
          <div className="card text-bg-light mb-3" style={{ width: "50%" }}>
            <div className="card-header">Detail</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Nama Teknisi :</label>
                  <span className="fw-semibold">{state.form.name}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">ID Teknisi :</label>
                  <span className="fw-semibold">{state.form.uuid}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Area Bertugas :</label>
                  <span className="fw-semibold">{state.form.area}</span>
                </div>
                <div className="mb-3">
                  <label for="status" className="form-label">
                    Status
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
                    <option disabled value={0}>
                      Pilih Status
                    </option>
                    <option value={"Available"}>Available</option>
                    <option value={"Non Available"}>Non Available</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn rounded-pill fw-semibold w-100 text-white"
                  style={{
                    backgroundColor: "#007BE5",
                    paddingLeft: "80px",
                    paddingRight: "80px",
                  }}
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
