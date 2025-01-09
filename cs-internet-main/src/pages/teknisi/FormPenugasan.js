import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import useComplaint from "../../hooks/Complaint";
import { useAuth } from "../../hooks/AuthProvider";

export default function FormPenugasan() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const complaint_id = searchParams.get("complaint_id");

  const [state, setState] = useState({
    form: {
      complaint_id: "",
      area: "",
      technician_id: "",
      status: "",
      problem: "",
      documentation: "",
    },
  });

  const { updateComplaint, findComplaintByID } = useComplaint();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateComplaint(complaint_id, {
        ...state.form,
      });

      navigate("/data-penugasan");
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const complaintData = await findComplaintByID(complaint_id);
      const dataReal = complaintData?.data ?? {};

      setState((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          complaint_id: dataReal.complaint_id,
          created_at: dataReal?.created_at?.split(" ")[0],
          name: dataReal.name,
          uuid: dataReal.uuid,
          address: dataReal.address,
          phone: dataReal.phone,
          service_type: dataReal.service_type,
          complaint: dataReal.complaint,
          area: dataReal.area,
          status: dataReal.status,
          problem: dataReal.problem,
          documentation: dataReal.documentation,
          technician_id: dataReal.technician_id,
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
          Data Penugasan
        </h2>
        <div className="d-flex justify-content-center">
          <div className="card text-bg-light mb-3" style={{ width: "50%" }}>
            <div className="card-header">Detail</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="text-center">
                  <label className="form-label">ID Tiket Pengaduan</label>
                  <p className="fw-semibold">{state?.form?.complaint_id}</p>
                </div>
                <div className="mb-3">
                  <span>Site Area : {state?.form.area}</span>
                  <br />
                  <span>ID Technician : {user?.uuid}</span>
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
                    <option value={"diproses"}>Diproses</option>
                    <option value={"selesai"}>Selesai</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="problem" className="form-label">
                    Masalah selama perbaikan
                  </label>
                  <textarea
                    className="form-control"
                    id="problem"
                    rows="3"
                    value={state.form.problem}
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        form: {
                          ...prevState.form,
                          problem: e.target.value,
                        },
                      }))
                    }
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label for="documentation" className="form-label">
                    Dokumentasi
                  </label>
                  <textarea
                    className="form-control"
                    id="documentation"
                    rows="3"
                    value={state.form.documentation}
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        form: {
                          ...prevState.form,
                          documentation: e.target.value,
                        },
                      }))
                    }
                  ></textarea>
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
