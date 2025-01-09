import { useState } from "react";
import Layout from "../../../components/Layout";
import useComplaint from "../../../hooks/Complaint";
import { useNavigate } from "react-router-dom";

export default function FormTambahPengaduan() {
  const { createComplaint } = useComplaint();
  const navigate = useNavigate();

  const [state, setState] = useState({
    created_at: new Date().toISOString().split("T")[0],
    name: "",
    uuid: "",
    address: "",
    phone: "",
    service_type: "",
    complaint: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComplaint(state);

      navigate("/data-pengaduan");
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return (
    <Layout>
      <div className="my-5">
        <h1>Form Tambah Pengaduan Pelanggan</h1>
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-4 text-white"
          style={{ backgroundColor: "#002462" }}
        >
          <div className="mb-3">
            <label htmlFor="created_at" className="form-label">
              Tanggal Pengaduan
            </label>
            <input
              type="date"
              className="form-control"
              id="created_at"
              value={state.created_at}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  created_at: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nama Pelanggan
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={state.name}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">
              ID Pelanggan
            </label>
            <input
              type="text"
              className="form-control"
              id="user_id"
              value={state.uuid}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  uuid: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Alamat Rumah
            </label>
            <textarea
              className="form-control"
              id="address"
              rows="3"
              value={state.address ?? ""}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="nomor_wa" className="form-label">
              Nomor Whatsapp
            </label>
            <input
              type="text"
              className="form-control"
              id="nomor_wa"
              value={state.phone}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  phone: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="service_type" className="form-label">
              Jenis Layanan
            </label>
            <input
              type="text"
              className="form-control"
              id="service_type"
              value={state.service_type}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  service_type: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ket_complaint" className="form-label">
              Complaint yang dialami
            </label>
            <textarea
              className="form-control"
              id="ket_complaint"
              rows="3"
              value={state.complaint}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  complaint: e.target.value,
                }))
              }
            ></textarea>
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
              Kirim
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
