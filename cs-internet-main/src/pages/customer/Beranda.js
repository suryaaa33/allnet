import React from "react";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const menus = [
  {
    label: "Tentang Akun",
    link: "/tentang-akun",
  },
  {
    label: "Pengaduan Pelanggan",
    link: "/pengaduan-pelanggan",
  },
  {
    label: "Riwayat Pengaduan",
    link: "/riwayat-pelanggan",
  },
];

export default function BerandaCustomer() {
  return (
    <Layout withHero>
      <div className="my-5">
        <div
          className="d-flex flex-column align-items-center" style={{gap: '20px'}}
        >
          {menus.map((value, i) => (
            <Link
              key={i}
              to={value.link}
              className="btn text-white py-4 rounded-4 fs-3 fw-semibold w-50"
              style={{ backgroundColor: "#8197B3" }}
            >
              {value.label}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
