import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import useUser from "../../hooks/User";
import { useEffect, useState } from "react";

export default function DataTeknisi() {
  const navigate = useNavigate();
  const { getAllTechnicians, deleteUser } = useUser();

  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTechnicians();
      setTechnicians(data.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUserHandler = async (user_id) => {
    try {
      const data = await deleteUser(user_id);
      if (data.status === "success") {
        alert(data.message);
        const newData = await getAllTechnicians();
        setTechnicians(newData.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const editUserHandler = async (user_id) => {
    navigate("/form-edit-teknisi?user_id=" + user_id);
  };
  return (
    <Layout>
      <div className="my-5">
        <h2 className="fs-1 text-center fw-semibold text-uppercase">
          Data Teknisi
        </h2>
        <Link
          to={"/form-tambah-teknisi"}
          className="btn btn-primary text-uppercasse mt-3"
        >
          Tambah
        </Link>
        <table className="table shadow mt-2">
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                No
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                ID Teknisi
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Nama Teknisi
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Area
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Status
              </th>
              <th scope="col" style={{ backgroundColor: "#cbd5e1" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((value, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{value.user_id}</td>
                <td>{value.name}</td>
                <td>{value.area}</td>
                <td>{value.status}</td>
                <td className="d-flex gap-2">
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
      </div>
    </Layout>
  );
}
