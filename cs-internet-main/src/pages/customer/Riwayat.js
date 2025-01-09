import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../hooks/AuthProvider";
import useComplaint from "../../hooks/Complaint";

export default function Riwayat() {
  const { user } = useAuth();
  const { getHistoryComplaints } = useComplaint();
  const [dataRiwayat, setDataRiwayat] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (user.user_id) {
        const data = await getHistoryComplaints(user.user_id);
        setDataRiwayat(data?.data);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user_id]);
  return (
    <Layout withHero>
      <div className="my-5">
        <h2 className="fs-1 fw-semibold">Riwayat Pengaduan</h2>
        <table className="table shadow mt-5">
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Tanggal
              </th>
              <th
                scope="col"
                className="w-75"
                style={{ backgroundColor: "#cbd5e1" }}
              >
                Keluhan
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {dataRiwayat?.map((value, i) => (
              <tr key={i}>
                <td>{value.created_at}</td>
                <td>{value.complaint}</td>
                <td>
                  <span
                    className={`badge bg-opacity-75 ${
                      value.status === "new"
                        ? "text-bg-success"
                        : value.status === "in progress"
                        ? "text-bg-danger"
                        : "text-bg-secondary"
                    }`}
                  >
                    {value.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
