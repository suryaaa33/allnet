import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import useComplaint from "../../hooks/Complaint";
import { useEffect, useState } from "react";

export default function DataPengaduan() {
  const [complaints, setComplaints] = useState([]);

  const { getAllComplaints, deleteComplaint } = useComplaint();
  useEffect(() => {
    getAllComplaints().then((data) => {
      setComplaints(data.data || []);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (complaint_id) => {
    deleteComplaint(complaint_id).then(() => {
      getAllComplaints().then((data) => {
        setComplaints(data.data || []);
      });
    });
  };

  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Data Pengaduan
        </h2>
        <div className="d-flex c gap-2 mt-3">
          <Link
            to={"/form-tambah-pengaduan"}
            className="btn btn-primary text-uppercasse"
          >
            Tambah
          </Link>
        </div>
        <table className="table shadow mt-2">
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                ID Tiket Pengaduan
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Tanggal Pengaduan
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Nama Pelanggan
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                ID
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Alamat Rumah
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                No. HP
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Jenis Layanan
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Masalah yang Dialami
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Status
              </th>
              {/* <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Tanggal di Proses
              </th> */}
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Petugas yang Menangani
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((value, i) => (
              <tr key={i}>
                <td>{value.complaint_id}</td>
                <td>{value.created_at}</td>
                <td>{value.name ?? value.customer_name}</td>
                <td>{value.uuid ?? value.customer_uuid}</td>
                <td>{value.address ?? value.customer_address}</td>
                <td>{value.phone ?? value.customer_phone}</td>
                <td>{value.service_name}</td>
                <td>{value.complaint}</td>
                <td>{value.status}</td>
                {/* <td>{value.tanggal_proses}</td> */}
                <td className="d-flex gap-2">
                  {value.technician_name}
                  <Link
                    to={"/penugasan-teknisi?complaint_id=" + value.complaint_id}
                    class="btn btn-primary btn-sm"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <g data-name="search" id="search-2">
                        <path d="M14.07,8.63H11.93a2.53,2.53,0,0,0-2.61,2.42v2.83a1.93,1.93,0,0,0,1.07,1.69v3.35a1.59,1.59,0,0,0,1.54,1.64h2.14a1.59,1.59,0,0,0,1.54-1.64V15.57a1.93,1.93,0,0,0,1.07-1.69V11.05A2.53,2.53,0,0,0,14.07,8.63Zm-.46,9.93H12.39V13.83H11.32V11.05c0-.2.25-.42.61-.42h2.14c.36,0,.61.22.61.42l0,2.75s0,0-.09,0h-1v4.73Z" />
                        <path d="M13,8.18a1.37,1.37,0,1,0-1.37-1.36A1.37,1.37,0,0,0,13,8.18Z" />
                        <path d="M29.16,24.71l-3.44-3.44a1.82,1.82,0,0,0-1.41-.59,2,2,0,0,0-1.42.59l-.1.11-.86-.87A11.49,11.49,0,0,0,21.25,5,11.48,11.48,0,0,0,5,5,11.48,11.48,0,0,0,20.51,21.93l.87.86-.11.1a2,2,0,0,0,0,2.83l3.44,3.44a2,2,0,0,0,2.82,0l1.63-1.63A2,2,0,0,0,29.16,24.71ZM6.44,19.84a9.48,9.48,0,1,1,13.4,0A9.48,9.48,0,0,1,6.44,19.84Zm19.68,7.91-3.44-3.44,1.63-1.63,3.44,3.44Z" />
                      </g>
                    </svg>
                  </Link>
                </td>
                <td className="d-flex gap-2">
                  <Link
                    to={"/form-edit-pengaduan?complaint_id=" + value.complaint_id}
                    className="btn btn-primary text-uppercasse"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger text-uppercasse"
                    onClick={() => handleDelete(value.complaint_id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
