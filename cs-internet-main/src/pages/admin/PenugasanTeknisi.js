import {  useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useUser from "../../hooks/User";
import { useNavigate, useSearchParams } from "react-router-dom";
import useComplaint from "../../hooks/Complaint";

export default function PenugasanTeknisi() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const complaint_id = searchParams.get("complaint_id");

  const [state, setState] = useState({
    form: {
      id_pengaduan: "",
      area: "Site Panongan",
      technician_id: "",
      status: "",
      problem: "",
      documentation: "",
    },
  });

  const { getAllTechnicians } = useUser();
  const { updateComplaint, findComplaintByID } = useComplaint();

  const [technicians, setTechnicians] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateComplaint(complaint_id, {
        ...state.form,
        status: "diproses",
      });

      navigate("/data-pengaduan");
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTechnicians();

      const complaintData = await findComplaintByID(complaint_id);
      const dataReal = complaintData?.data ?? {};

      setState((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          id_pengaduan: dataReal.id_pengaduan,
          created_at: dataReal?.created_at?.split(" ")[0],
          name: dataReal.name,
          uuid: dataReal.uuid,
          address: dataReal.address,
          phone: dataReal.phone,
          service_type: dataReal.service_type,
          complaint: dataReal.complaint,
          area: dataReal.area ||  "Site Panongan",
          status: dataReal.status,
          problem: dataReal.problem,
          documentation: dataReal.documentation,
          technician_id: dataReal.technician_id ?? data?.data[0]?.user_id,
        },
      }));
      setTechnicians(data.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Penugasan Teknisi
        </h2>
        <div className="d-flex justify-content-center">
          <div className="card text-bg-light mb-3" style={{ width: "50%" }}>
            <div className="card-header">Detail</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="text-center">
                  <label className="form-label">ID Tiket Pengaduan</label>
                  <p className="fw-semibold">{state.form.id_pengaduan}</p>
                </div>
                <div className="mb-3">
                  <label for="area" className="form-label">
                    Site Area
                  </label>
                  <select
                    className="form-select"
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
                  >
                    <option disabled value={0}>
                      Pilih Site Area
                    </option>
                    <option value={"Site Panongan"}>Site Panongan</option>
                    <option value={"Site Pasir Randu"}>Site Pasir Randu</option>
                    <option value={"Site Ranca Kelapa"}>
                      Site Ranca Kelapa
                    </option>
                    <option value={"Site Tigaraksa"}>Site Tigaraksa</option>
                    <option value={"Site balaraja"}>Site balaraja</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="area" className="form-label">
                    Teknisi
                  </label>
                  <select
                    className="form-select"
                    value={state.form.technician_id}
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        form: {
                          ...prevState.form,
                          technician_id: e.target.value,
                        },
                      }))
                    }
                  >
                    <option disabled value={0}>
                      Pilih Teknisi
                    </option>
                    {technicians.map((value, i) => (
                      <option key={i} value={value.user_id}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <span>Status : {state?.form.status}</span>
                  <br />
                  <span>Masalah selama perbaikan : {state?.form.problem}</span>
                  <br />
                  <span>Dokumentasi : {state?.form.documentation}</span>
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
