import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useService from "../hooks/Service";
import { useNavigate } from "react-router-dom";

export default function PaketInternet() {
  const navigate = useNavigate();
  const [serviceArea, setServiceArea] = useState([]);

  const { getAllServiceArea, getAllServicesByArea } = useService();

  const formatter = new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
    trailingZeroDisplay: 'stripIfInteger'
  });

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
        console.error("Error: ", error?.message);
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {serviceArea.map((area, index) => (
        <div className="position-relative mb-5" key={index}>
          <img
            src={"/images/banner-2.png"}
            className="card-img"
            alt="img-banner"
          />
          <div
            className="text-white position-absolute"
            style={{ marginRight: "50px", top: "10%", left: "5%" }}
          >
            <h5 style={{ fontSize: "40px" }}>
              SITE {area?.area_name?.toUpperCase()}
            </h5>
            <div className="row gap-3 justify-content-center">
              {area?.services?.map((service, index) => (
                <div
                  className="col-3"
                  onClick={() =>
                    navigate(
                      "/pendaftaran-pelanggan" +
                        "?service_id=" +
                        service?.service_id +
                        "&service_area_id=" +
                        area?.service_area_id
                    )
                  }
                >
                  <button
                    key={index}
                    className="bg-white text-dark rounded-4 text-center border border-4 border-opacity-50 border-info"
                    style={{ width: "200px" }}
                  >
                    <span style={{ fontSize: "13px" }}>{service?.name}</span>
                    <p className="fs-3 fw-semibold mb-0">{service?.speed}</p>
                    <p className="mb-0" style={{ fontSize: "13px" }}>
                      {formatter.format(service?.price)}/Bulan
                    </p>
                    <p className="text-secondary" style={{ fontSize: "13px" }}>
                      {service?.description}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
}
