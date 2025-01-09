import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Beranda,
  TentangKami,
  Layanan,
  PaketInternet,
  PengaduanPelanggan,
  Login,
  BerandaCustomer,
  TentangAkun,
  Riwayat,
  PendaftaranPelanggan,
  RingkasanData,
  DataPengaduan,
  PenugasanTeknisi,
  DataPelanggan,
  DataTeknisi,
  DetailTeknisi,
  DataPenugasan,
  DetailPenugasan,
  FAQ,
  FormPenugasan,
  FormTambahPengaduan,
  FormEditPengaduan,
  FormTambahPelanggan,
  FormTambahTeknisi,
  FormEditPelanggan,
} from "./pages";
import AuthProvider from "./hooks/AuthProvider";
import CustomerRoute from "./router/CustomerRoute";
import AdminRoute from "./router/AdminRoute";
import TeknisiRoute from "./router/TeknisiRoute";
import FormEditTeknisi from "./pages/admin/form-teknisi/Edit";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/paket-internet" element={<PaketInternet />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/pendaftaran-pelanggan"
              element={<PendaftaranPelanggan />}
            />
            <Route element={<CustomerRoute />}>
              <Route path="/customer" element={<BerandaCustomer />} />
              <Route path="/riwayat-pelanggan" element={<Riwayat />} />
              <Route path="/tentang-akun" element={<TentangAkun />} />
              <Route
                path="/pengaduan-pelanggan"
                element={<PengaduanPelanggan />}
              />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/ringkasan-data" element={<RingkasanData />} />
              <Route path="/data-pengaduan" element={<DataPengaduan />} />
              <Route
                path="/penugasan-teknisi"
                element={<PenugasanTeknisi />}
              />
              <Route path="/data-teknisi" element={<DataTeknisi />} />
              <Route path="/data-pelanggan" element={<DataPelanggan />} />
              <Route
                path="/form-tambah-pengaduan"
                element={<FormTambahPengaduan />}
              />
              <Route
                path="/form-edit-pengaduan"
                element={<FormEditPengaduan />}
              />
              <Route
                path="/form-tambah-pelanggan"
                element={<FormTambahPelanggan />}
              />
              <Route
                path="/form-edit-pelanggan"
                element={<FormEditPelanggan />}
              />
              <Route
                path="/form-tambah-teknisi"
                element={<FormTambahTeknisi />}
              />
              <Route path="/form-edit-teknisi" element={<FormEditTeknisi />} />
            </Route>
            <Route element={<TeknisiRoute />}>
              {/* <Route path="/form-teknisi" element={<FormTeknisi />} /> */}
              <Route path="/detail-teknisi" element={<DetailTeknisi />} />
              <Route path="/data-penugasan" element={<DataPenugasan />} />
              <Route path="/detail-penugasan" element={<DetailPenugasan />} />
            </Route>
            <Route path="/form-penugasan" element={<FormPenugasan />} />{" "}
            {/* <Route
              path="/data-pengaduan-teknisi"
              element={<DataPengaduanTeknisi />}
            /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
