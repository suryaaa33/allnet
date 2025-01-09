import Layout from "../components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/Accordion.js";

const dataFAQ = [
  {
    title: "Dimana saja layanan Allnetwork tersebar?",
    desc: "Layanan Allnetwork tersebar di beberapa wilayah Kabupaten Tangerang, seperti Panongan, Pasir Randu, Ranca Kelapa, Tigaraksa, Balaraja, dan Cirinten-Lebak",
  },
  {
    title: "Pembayaran layanan bisa menggunakan apa saja?",
    desc: "Pembayaran layanan dapat dilakukan melalui transfer dan Payment Gateway, dan untuk Payment Gateway yang digunakan adalah Xendit",
  },
  {
    title: "Paket apa saja yang disediakan?",
    desc: "Allnetwork menyediakan Layanan Internet Broadband dan Layanan Internet Dedicated",
  },
  {
    title: "Apa diarea saya sudah tersedia jaringan allnetwork?",
    desc: "Anda dipersilahkan untuk menghubungi kami via WhatsApp agar dapat mengetahui informasi tersebut",
  },
  {
    title: "Bagaimana saya mendaftar?",
    desc: "Anda dapat mendaftar dengan meng-klik paket yang anda inginkan di laman 'Area'. Pada laman tersebut anda juga dapat melihat-lihat pricelist dari layanan yang ditawarkan oleh Allnetwork",
  },
  {
    title: "Setelah saya mendaftar layanan melalui form, bagaimana tahap selanjutnya?",
    desc: "Setelah anda mendaftar layanan melalui form, selanjutnya anda akan dihubungi oleh admin via WhatsApp untuk mengonfirmasi pendaftaran anda, cek area, serta mendapatkan instruksi pembayaran layanan",
  },
];

export default function FAQ() {
  return (
    <Layout>
      <div className="my-4">
        <h1 className="text-center mb-4">FAQ</h1>
        <Accordion type="single" collapsible className="w-full">
          {dataFAQ.map((value, i) => (
            <AccordionItem key={i} value={`item-${i + 1}`} className="">
              <AccordionTrigger className="px-3 border rounded-3 border-dark">
                {value.title}
              </AccordionTrigger>
              <AccordionContent
                className="border px-2 pt-3 border-dark fs-6 border border-dark text-white"
                style={{ backgroundColor: "#06326C", borderRadius: "8px" }}
              >
                {value.desc}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
