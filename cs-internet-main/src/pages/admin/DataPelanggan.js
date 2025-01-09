import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import useUser from "../../hooks/User";
import { useEffect, useState } from "react";
import useCustomer from "../../hooks/Customer";

export default function DataPelanggan() {
  const navigate = useNavigate();
  const { getAllCustomers, deleteUser } = useUser();
  const customer = useCustomer();
  const [customers, setCustomers] = useState([]);
  const [newCustomers, setNewCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCustomers();
      const dataNewCustomers = await customer.getAllCustomers();
      setCustomers(data.data);
      setNewCustomers(dataNewCustomers.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUserHandler = async (user_id) => {
    try {
      const data = await deleteUser(user_id);
      if (data.status === "success") {
        alert(data.message);
        const newData = await getAllCustomers();
        setCustomers(newData.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const editUserHandler = async (user_id) => {
    navigate("/form-edit-pelanggan?user_id=" + user_id);
  };

  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Data Pelanggan
        </h2>
        <div className="d-flex c gap-2 mt-3">
          <Link
            to={"/form-tambah-pelanggan"}
            className="btn btn-primary text-uppercasse"
          >
            Tambah
          </Link>
        </div>
        <table className="table shadow mt-2">
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                No
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                ID Pelanggan
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Nama
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Kontak
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Alamat
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Email
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Status
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Tanggal Daftar
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Paket Internet
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((value, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{value.user_id}</td>
                <td>{value.name}</td>
                <td>{value.phone}</td>
                <td>{value.address}</td>
                <td>{value.email}</td>
                <td>{value.status}</td>
                <td>{value.created_at}</td>
                <td>
                  {value.service_name &&
                    `${value.service_name} (${value.service_speed})`}
                </td>
                <td>
                  <button
                    onClick={() => editUserHandler(value.user_id)}
                    className="btn btn-primary text-uppercasse"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger text-uppercasse"
                    onClick={() => deleteUserHandler(value.user_id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "80px" }}>
          <h2 className="fs-1 text-center fw-semibold text-uppercase">
            Data Pelanggan Baru
          </h2>
          <table className="table shadow mt-2">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  NO
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  Nama Lengkap
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  NIK/KTP
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  Email
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  Alamat Rumah Lengkap
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  Nomor Whatsapp
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  Paket Internet
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  Area
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  Jenis Pembayaran
                </th>
                <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                  Metode Pembayaran
                </th>
              </tr>
            </thead>
            <tbody>
              {newCustomers.map((value, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{value.name}</td>
                  <td>{value.nik}</td>
                  <td>{value.email}</td>
                  <td>{value.address}</td>
                  <td>{value.phone}</td>
                  <td>{value.service_name}</td>
                  <td>{value.area ?? value.area_name}</td>
                  <td>{value.payment_type}</td>
                  <td>{value.payment_method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
