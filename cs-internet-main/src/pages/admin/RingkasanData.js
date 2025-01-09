import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useUser from "../../hooks/User";
import useComplaint from "../../hooks/Complaint";

function JumlahPelangganCard({ title, value, borderColor, textColor }) {
  return (
    <div className="col">
      <div className={`card border-${borderColor} mb-3 w-100`}>
        <div className="card-header">Jumlah Pelanggan</div>
        <div className={`card-body text-${textColor}`}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function RingkasanData() {
  const [countCustomer, setCountCustomer] = useState({
    active: 0,
    inactive: 0,
    new: 0,
  });

  const [countComplaint, setCountComplaint] = useState(0);

  const { countCustomers } = useUser();
  const { countNewComplaints } = useComplaint();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await countCustomers();
        const countComplaints = await countNewComplaints();

        setCountCustomer(data.data);
        setCountComplaint(countComplaints?.data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Ringkasan Data
        </h2>
        <div className="row gap-2 mt-4">
          <JumlahPelangganCard
            title="Pelanggan Aktif"
            value={countCustomer.active}
            borderColor="success"
            textColor="success"
          />
          <JumlahPelangganCard
            title="Pelanggan Tidak Aktif"
            value={countCustomer.inactive}
            borderColor="danger"
            textColor="danger"
          />
          <JumlahPelangganCard
            title="Pelanggan Baru"
            value={countCustomer.new}
            borderColor="primary"
            textColor="primary"
          />
        </div>
        <div className="card text-bg-primary mb-3">
          <div className="card-header">Ringkasan Data</div>
          <div className="card-body d-flex justify-content-between align-items-center">
            <span className="card-text">Tiket Masuk Keluhan Pelanggan</span>
            <span className="fs-2">{countComplaint}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
