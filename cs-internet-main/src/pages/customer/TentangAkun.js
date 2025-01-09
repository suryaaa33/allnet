import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../hooks/AuthProvider";

export default function TentangAkun() {
  const { user } = useAuth();
  return (
    <Layout>
      <div className="my-5 d-flex justify-content-center">
        <div
          className="p-5 rounded-4 w-75"
          style={{ backgroundColor: "#06326C" }}
        >
          <h3 className="text-uppercase text-white text-center mb-4">
            Ringkasan Akun
          </h3>
          <div className="bg-white p-2 rounded-3 fw-semibold">
            <div>
              <span>Nama Pelanggan : {user?.name}</span>
              <br />
              <span>ID Akun : {user?.uuid}</span>
            </div>
            <div className="my-3">
              <label>Paket Berlangganan : {user?.payment_type}</label>
              <br />
              <label>Nama Paket : {user?.service_name}</label>
              <br />
              <label>
                Kecepatan Kuota : {user?.speed} / {user?.description}
              </label>
            </div>
            <div>
              <label>Tagihan Bulanan Aktif : RP. {user?.price}</label>
              <br />
              <label>
                Tagihan Berjalan Sampai Jatuh Tempo :{" "}
                {user?.next_payment_at}
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
