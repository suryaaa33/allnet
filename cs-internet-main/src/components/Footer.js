import { Link } from "react-router-dom";

export default function Footer() {
  const socialMedias = [
    {
      label: "Instagram kami : ",
      value: "@Allnetwork.digital",
    },
    {
      label: "Whatsapp kami : ",
      value: "089648828750",
    },
    {
      label: "Kirim Email : ",
      value: "@Allnetwork.business@gmail.com",
    },
  ];

  const officeDetails = [
    {
      label: "Head Office Panongan :",
      value:
        "Jl. Raya Curug, Kp. Babakan Ruko No.207 RT.013/001, Kec.  Panongan, Kabupaten Tangerang, Banten 15710.",
    },
    {
      label: "Head Office Pasirandu :",
      value:
        "Jl. Pasirandu, Desa Kadu Kec. Curug, Kabupaten Tangerang, Banten 15810.",
    },
    {
      label: "Head Office Ranca Kelapa : :",
      value:
        "Kp. Korelet RT 01/03, Desa Ranca Kelapa, Kec. Panongan, Kabupaten Tangerang, Banten 15710.",
    },
    {
      label: "Head Office Tigaraksa :",
      value:
        "Jl. Haji Kanung, Desa Matagara RT 03/01, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720.",
    },
    {
      label: "Head Office Balaraja :",
      value:
        "Kp. Iwul RT001/002, Desa Tobat, Kec. Balaraja, Kabupaten Tangerang, Banten 15610.",
    },
  ];

  const menus = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Paket Internet",
      link: "/paket-internet",
    },
    {
      label: "Pengaduan Pelanggan",
      link: "/pengaduan-pelanggan",
    },
    {
      label: "FAQ",
      link: "/faq",
    },
  ];

  return (
    <div className="container-fluid bg-main">
      <div className="row">
        <div className="col px-0">
          <div className="row">
            <div
              style={{
                width: "400px",
                height: "fit-content",
                left: "0",
                marginRight: "22px",
                borderBottomRightRadius: "50px",
              }}
              className="bg-white py-5"
            >
              <img
                src={"/images/logo.png"}
                alt="image-logo"
                className="mx-auto d-block img-fluid w-75"
              />
            </div>
            <div
              style={{
                margin: "24px 0 0 32px",
                lineHeight: "0.8",
              }}
            >
              {socialMedias.map((sm, i) => (
                <div key={i} style={{ margin: "32px 0 0 0" }}>
                  <p className="text-white">{sm.label}</p>
                  <p className="text-white">{sm.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col align-self-center" style={{ marginLeft: "16px" }}>
          <div className="row gy-3" style={{ fontSize: "14px" }}>
            {officeDetails.map((od, i) => (
              <div key={i}>
                <span className="text-white">{od.label}</span>
                <p className="text-white">{od.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col align-self-center" style={{ marginLeft: "80px" }}>
          <div className="row gy-4">
            {menus.map((menu, i) => (
              <Link
                key={i}
                to={menu.link}
                className="text-white text-decoration-none"
              >
                {menu.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-3 mt-2">
        <p className="text-center text-white mb-0">
          CopyRight - 2024 PT. Allnetwork Digital Indonesia
        </p>
      </div>
    </div>
  );
}
