import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useService from "../hooks/Service";
import useCustomer from "../hooks/Customer";
import { useNavigate } from "react-router-dom";

export default function PendaftaranPelanggan() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    form: {
      name: "",
      nik: "",
      email: "",
      address: "",
      phone: "",
      service_area_id: 0,
      service_id: 0,
      service_type: "",
      payment_type: 0,
      payment_method: 0,
      checkTerms: false,
    },
  });
  const [serviceArea, setServiceArea] = useState([]);
  const { getAllServiceArea, getAllServicesByArea } = useService();
  const { createCustomer } = useCustomer();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Logic
      await createCustomer(state.form);
      navigate("/");
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const serviceAreaData = await getAllServiceArea();

        const serviceAreasPromise = serviceAreaData?.data?.map(async (area) => {
          const services = await getAllServicesByArea(area.service_area_id);
          return {
            ...area,
            services: services?.data || [],
          };
        });

        const serviceAreas = await Promise.all(serviceAreasPromise);

        setServiceArea(serviceAreas);
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
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-4 text-white"
          style={{ backgroundColor: "#002462" }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={state.form.name}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    name: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nik" className="form-label">
              NIK KTP
            </label>
            <input
              type="text"
              className="form-control"
              id="nik"
              value={state.form.nik}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    nik: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={state.form.email}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    email: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Alamat Rumah Lengkap
            </label>
            <textarea
              className="form-control"
              id="address"
              rows="3"
              value={state.form.address}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    address: e.target.value,
                  },
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
              value={state.form.phone}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    phone: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="service_area_id" className="form-label">
              Site Area
            </label>
            <select
              className="form-select"
              value={state.form.service_area_id}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    service_area_id: e.target.value,
                  },
                }))
              }
            >
              <option disabled value={0}>
                Pilih Site Area
              </option>
              {serviceArea.map((v, i) => (
                <option key={i} value={v.service_area_id}>
                  {v.area_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="service_id" className="form-label">
              Paket Internet yang dipilih :
            </label>
            <select
              disabled={state.form.service_area_id === 0}
              className="form-select"
              value={state.form.service_id}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    service_id: e.target.value,
                  },
                }))
              }
            >
              <option disabled value={0}>
                Pilih Paket Internet
              </option>
              {serviceArea
                ?.find((v) => v.service_area_id === state.form.service_area_id)
                ?.services.map((v, i) => (
                  <option key={i} value={v.service_id}>
                    {v.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="service_type" className="form-label">
              Tipe Layanan :
            </label>
            <select
              className="form-select"
              value={state.form.service_type}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  form: {
                    ...prevState.form,
                    service_type: e.target.value,
                  },
                }))
              }
            >
              <option disabled value="">
                Pilih Tipe Layanan
              </option>
              <option value="Internet Dedicated">Internet Dedicated</option>
              <option value="Internet Broadbrand">Internet Broadbrand</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="payment_type" className="form-label">
              Jenis Pembayaran :
            </label>
            <div className="d-flex">
              <div>
                <input
                  className="btn-check"
                  type="radio"
                  name="payment_type"
                  id="bulanan"
                  autoComplete="off"
                  value={"bulanan"}
                  checked={state.form.payment_type === "bulanan"}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      form: {
                        ...prevState.form,
                        payment_type: e.target.value,
                      },
                    }))
                  }
                />
                <label className="btn btn-outline-light" htmlFor="bulanan">
                  Bulanan
                </label>
              </div>
              <div className="form-check">
                <input
                  className="btn-check"
                  type="radio"
                  name="payment_type"
                  id="tahunan"
                  autoComplete="off"
                  value={"tahunan"}
                  checked={state.form.payment_type === "tahunan"}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      form: {
                        ...prevState.form,
                        payment_type: e.target.value,
                      },
                    }))
                  }
                />
                <label className="btn btn-outline-light" htmlFor="tahunan">
                  Tahunan
                </label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="payment_method" className="form-label">
              Metode Pembayaran :
            </label>
            <div className="d-flex gap-2">
              <div>
                <input
                  type="radio"
                  className="btn-check"
                  name="payment_method"
                  id="transfer_bank"
                  autoComplete="off"
                  value={"Transfer Bank"}
                  checked={state.form.payment_method === "Transfer Bank"}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      form: {
                        ...prevState.form,
                        payment_method: e.target.value,
                      },
                    }))
                  }
                />
                <label
                  className="btn btn-outline-light"
                  htmlFor="transfer_bank"
                >
                  Transfer Bank
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="btn-check ms-2"
                  name="payment_method"
                  id="e_wallet"
                  autoComplete="off"
                  value={"E-wallet"}
                  checked={state.form.payment_method === "E-wallet"}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      form: {
                        ...prevState.form,
                        payment_method: e.target.value,
                      },
                    }))
                  }
                />
                <label className="btn btn-outline-light" htmlFor="e_wallet">
                  E-wallet (Gopay, Dana, OVO)
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="ket_masalah" className="form-label">
              Persetujuan dan Ketentuan :
            </label>
            <div className="bg-light px-3 pt-3 pb-1 text-dark rounded-3">
              <ul>
                <li>
                  Saya telah membaca dan menyetujui syarat & ketentuan layanan
                  internet.
                </li>
                <li>
                  Data yang saya isikan adalah benar dan dapat
                  dipertanggungjawabkan.
                </li>
              </ul>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkTerms"
                value={state.form.checkTerms}
                onClick={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    form: {
                      ...prevState.form,
                      checkTerms: e.target.checked,
                    },
                  }))
                }
              />
              <label className="form-check-label" htmlFor="checkTerms">
                Saya Setuju
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end mb-4">
            <button
              type="submit"
              disabled={!state.form.checkTerms}
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
