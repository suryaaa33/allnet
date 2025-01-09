import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import useComplaint from "../../hooks/Complaint";
import { useAuth } from "../../hooks/AuthProvider";

export default function DetailPenugasan() {
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
        status: "diproses",
      });

      navigate("/data-pengaduan");
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
          ...dataReal
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
          Detail Penugasan
        </h2>
        <div className="d-flex justify-content-center">
          <div className="card text-bg-light mb-3" style={{ width: "50%" }}>
            <div className="card-header">Detail</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">ID Tiket Pengaduan :</label>
                  <span className="fw-semibold">{state?.form?.complaint_id}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Tanggal Pengaduan :</label>
                  <span className="fw-semibold">{state?.form?.created_at}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Nama Pelanggan :</label>
                  <span className="fw-semibold">{state?.form?.customer_name}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">ID Pelanggan :</label>
                  <span className="fw-semibold">{state?.form?.customer_uuid}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Alamat Rumah :</label>
                  <span className="fw-semibold">{state?.form?.address}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Nomor Handphone :</label>
                  <span className="fw-semibold">{state?.form?.phone}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Nama Teknisi :</label>
                  <span className="fw-semibold">{user?.name}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">ID Teknisi :</label>
                  <span className="fw-semibold">{user?.uuid}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Area Bertugas :</label>
                  <span className="fw-semibold">{state.form.area}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Masalah selama perbaikan :</label>
                  <span className="fw-semibold">{state.form.problem}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <label className="">Status :</label>
                  <span className="fw-semibold">{state.form.status}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                  <label className="">Dokumentasi :</label>
                  <span className="fw-semibold">{state.form.documentation}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
