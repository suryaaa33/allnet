import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const pengaduan = [
  {
    tanggal_pengaduan: "08-07-2000",
    nama_pelanggan: "Jarwo",
    id: "09",
    alamat_rumah: "Jln. Mangga",
    no_hp: "0876463743838",
    jenis_layanan: "bulanan",
    masalah: "patah hati",
    status: "pending",
    tanggal_proses: "20-07-2000",
    petugas: "Sopo",
  },
];

export default function DataPengaduanTeknisi() {
  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Data Pengaduan Untuk Teknisi
        </h2>
        <div className="d-flex c gap-2 mt-3">
          <Link
            to={"/pengaduan-pelanggan"}
            className="btn btn-primary text-uppercasse"
          >
            Tambah
          </Link>
          <Link
            to={"/pengaduan-pelanggan"}
            className="btn btn-primary text-uppercasse"
          >
            Edit
          </Link>
        </div>
        <table className="table shadow mt-2">
          <thead>
            <tr>
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
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Tanggal di Proses
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Petugas yang Menangani
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {pengaduan.map((value, i) => (
              <tr key={i}>
                <td>{value.tanggal_pengaduan}</td>
                <td>{value.nama_pelanggan}</td>
                <td>{value.id}</td>
                <td>{value.alamat_rumah}</td>
                <td>{value.no_hp}</td>
                <td>{value.jenis_layanan}</td>
                <td>{value.masalah}</td>
                <td>{value.status}</td>
                <td>{value.tanggal_proses}</td>
                <td className="d-flex gap-2">
                  {value.petugas}
                  <Link to={"/"} className="btn btn-primary btn-sm">
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
                <td>
                  <button
                    type="button"
                    className="btn btn-danger text-uppercasse"
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
