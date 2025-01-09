import Layout from "../components/Layout";

export default function TentangKami() {
  return (
    <Layout>
      <div className="row my-5">
        <div className="col-sm-6">
          <h1 className="text-center">Tentang Kami</h1>
          <img
            src={"/images/logo.png"}
            alt="image-logo"
            className="img-fluid mx-auto d-block w-50"
          />
        </div>
        <div className="col-sm-6">
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
        </div>
      </div>
    </Layout>
  );
}
