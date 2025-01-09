import React from "react";
import Layout from "../components/Layout";

export default function Beranda() {
  return (
    <Layout withHero>
      <div className="my-5">
        <div className="d-flex flex-column align-items-center">
          <div
            className="card mb-3 rounded-4 w-75"
            style={{ backgroundColor: "#06326C" }}
          >
            <div className="card-body">
              <p className="card-text text-white">
                Allnetwork ( PT. AllNETWORK DIGITAL INDONESIA ) Bergerak di
                bidang jasa jual kembali telekomunikasi atau wifi untuk
                kebutuhan internet rumahan, sekolah, dan perkantoran. didirikan
                tahun 2023 untuk memberikan akses internet berkualitas dan
                terjangkau di wilayah panongan, legok, pasirandu, balaraja,
                ranca kelapa, dan sekitarnya. Dengan insfrastruktur fiber optik
                yang handal, kami menjamin layanan prima. Tim teknisi
                berpengalaman siap membantu anda dengan masalah internet.
              </p>
            </div>
          </div>
          <div className="row gap-x-3" style={{ width: "60%" }}>
            <div className="col">
              <div
                className="card h-100 rounded-4 border-0"
                style={{ backgroundColor: "#BFC9D7" }}
              >
                <div className="card-body">
                  <h5 className="card-title fs-3">
                    INTERNET <br /> BROADBRAND
                  </h5>
                  <p className="card-text">
                    koneksi internet berkecepatan tinggi yang memungkinkan
                    pengguna untuk mengakses dan mentransmisikan data dengan
                    cepat dan efisien. Daftar Sekarang!
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div
                className="card h-100 rounded-4 border-0"
                style={{ backgroundColor: "#BFC9D7" }}
              >
                <div className="card-body text-end">
                  <h5 className="card-title fs-3">
                    INTERNET <br /> DEDICATED
                  </h5>
                  <p className="card-text">
                    layanan koneksi internet yang didedikasikan untuk satu
                    pengguna atau perusahaan, sehingga tidak dibagi dengan
                    pengguna lain.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="d-flex flex-column align-items-center mb-3">
              <h3>Kenapa Harus AllnetWork?</h3>
              <div
                className="rounded-bottom-pill"
                style={{
                  width: "25%",
                  height: "20px",
                  backgroundColor: "#06326C",
                }}
              ></div>
            </div>
            <div>
              <div className="row justify-content-around">
                <div className="col-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Kecepatan Stabil
                      </h5>
                      <p className="card-text">
                        Allnetwork menawarkan kecepatan tinggi yang stabil,
                        cocok untuk streaming, gaming, hingga kebutuhan kerja
                        profesional.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Harga Terjangkau
                      </h5>
                      <p className="card-text">
                        Allnetwork menawarkan berbagai paket dengan harga
                        bersaing, sehingga anda bisa menikmati koneksi cepat
                        tanpa harus menguras kantong.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-around">
                <div className="col-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Jangkauan Luas
                      </h5>
                      <p className="card-text">
                        Dengan Jaringan yang luas, allnetwork memastikan layanan
                        mencakup banyak area, termasuk daerah terpencil.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Promo Menarik</h5>
                      <p className="card-text">
                        Pelanggan dapat menikmati berbagai promo, diskon, dan
                        program loyalitas, membuat lebih hemat di kantong.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-around">
                <div className="col-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Paket Flexible
                      </h5>
                      <p className="card-text">
                        Ada Banyak pilihan paket yang bisa di sesuaikan dengan
                        kebutuhan, dari pengguna rumahan hingga bisnis.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Layanan Pelanggan 24/7
                      </h5>
                      <p className="card-text">
                        Daptakan bantuan kapan saja dengan tim customer service
                        yang siap membantu 24 jam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <img
              src={"/images/banner.png"}
              alt="image-banner"
              className="img-fluid mx-auto d-block w-100"
            />
          </div>
          <div className="mt-5 d-grid w-75">
            <button
              className="btn text-white p-5 rounded-4 fs-3 text-uppercase fw-semibold"
              style={{ backgroundColor: "#06326C" }}
              type="button"
            >
              Daftar Sekarang!
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
