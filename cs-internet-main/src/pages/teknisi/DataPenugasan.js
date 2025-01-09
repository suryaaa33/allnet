import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useComplaint from "../../hooks/Complaint";
import { useAuth } from "../../hooks/AuthProvider";

export default function DataPenugasan() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const { getAllComplaints } = useComplaint();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllComplaints();
      setComplaints(data?.data ?? []);
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
        <table className="table shadow mt-2">
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                ID Tiket Pengaduan
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Area
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                technician_id
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Status
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Masalah Selama Perbaikan
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Dokumentasi
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints
              ?.filter((v) => v.technician_id === parseInt(token))
              .map((value, i) => (
                <tr key={i}>
                  <td>{value.complaint_id}</td>
                  <td>{value.area}</td>
                  <td>{value.technician_id}</td>
                  <td>{value.status}</td>
                  <td>{value.problem}</td>
                  <td>{value.documentation}</td>
                  <td className="d-flex gap-2">
                    {value?.status !== "selesai" && (
                      <Link
                        to={
                          "/form-penugasan?complaint_id=" + value.complaint_id
                        }
                        className="btn btn-primary text-uppercasse"
                      >
                        Edit
                      </Link>
                    )}
                    <Link
                      to={
                        "/detail-penugasan?complaint_id=" + value.complaint_id
                      }
                      className="btn btn-success text-uppercasse"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
