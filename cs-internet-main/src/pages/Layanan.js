import Layout from "../components/Layout";

export default function Layanan() {
  return (
    <Layout>
      <div className="my-5">
        <h1 className="fs-1">Layanan Kami</h1>
        <div className="position-relative">
          <img
            src={"/images/banner-2.png"}
            className="card-img"
            alt="img-banner"
          />
          <div
            className="text-end text-white position-absolute"
            style={{ marginRight: "50px", bottom: "10%", right: "5%" }}
          >
            <h5 style={{ fontSize: "40px" }}>INTERNET DEDICATED</h5>
            <p style={{ fontSize: "18px" }}>
              layanan koneksi internet yang didedikasikan untuk satu pengguna
              <br />
              atau perusahaan, sehingga tidak dibagi dengan pengguna lain.
            </p>
            <p style={{ fontSize: "18px" }}>Daftar Sekarang!</p>
          </div>
        </div>
        <div className="position-relative mt-5">
          <img
            src={"/images/banner-3.png"}
            className="card-img"
            alt="img-banner"
          />
          <div
            className="text-white position-absolute"
            style={{ marginRight: "50px", bottom: "10%", left: "5%" }}
          >
            <h5 style={{ fontSize: "40px" }}>INTERNET BROADBRAND</h5>
            <p style={{ fontSize: "18px" }}>
              koneksi internet berkecepatan tinggi yang memungkinkan pengguna
              <br/>
              untuk mengakses dan mentransmisikan data dengan cepat dan efisien.
            </p>
            <p style={{ fontSize: "18px" }}>Daftar Sekarang!</p>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column align-items-center mb-3 mt-5">
            <h3>Layanan Tersedia di Allnetwork</h3>
            <div
              className="rounded-bottom-pill"
              style={{
                width: "25%",
                height: "20px",
                backgroundColor: "#06326C",
              }}
            ></div>
          </div>
          <div className="container text-center mt-5">
            <div className="row">
              <div className="col">
                <p className="text-primary">
                  Tersedia Beberapa Paket Sesuai Kebutuhan
                </p>
                <img
                  src={"/images/icon-1.png"}
                  alt="image-icon"
                  width={100}
                  height={100}
                  style={{ backgroundSize: "cover" }}
                  className="img-fluid"
                />
              </div>
              <div className="col">
                <p className="text-primary">Pelayanan Customer Service 24/7</p>
                <img
                  src={"/images/icon-2.png"}
                  alt="image-icon"
                  width={100}
                  height={100}
                  style={{ backgroundSize: "cover" }}
                  className="img-fluid"
                />
              </div>
              <div className="col">
                <p className="text-primary">Kecepatan Mencapai 100 Mbps</p>
                <img
                  src={"/images/icon-3.png"}
                  alt="image-icon"
                  width={100}
                  height={100}
                  style={{ backgroundSize: "cover" }}
                  className="img-fluid"
                />
              </div>
              <div className="col">
                <p className="text-primary">Quote Tidak Terbatas UNLIMITED</p>
                <img
                  src={"/images/icon-4.png"}
                  alt="image-icon"
                  width={100}
                  height={100}
                  style={{ backgroundSize: "cover" }}
                  className="img-fluid mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
