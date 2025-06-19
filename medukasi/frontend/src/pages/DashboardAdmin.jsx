import React, { useState } from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import SidebarAdmin from '../components/SidebarAdmin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardAdmin = () => {
  const [activeMenu, setActiveMenu] = useState('Jumlah Pendaftar');
  const [searchQuery, setSearchQuery] = useState('');

  // Data contoh untuk grafik dan tabel
  const monthlyData = [
    { month: 'Jan', pendaftar: 45 },
    { month: 'Feb', pendaftar: 32 },
    { month: 'Mar', pendaftar: 67 },
    { month: 'Apr', pendaftar: 23 },
    { month: 'May', pendaftar: 89 },
    { month: 'Jun', pendaftar: 54 },
    { month: 'Jul', pendaftar: 76 },
    { month: 'Aug', pendaftar: 45 },
    { month: 'Sep', pendaftar: 32 },
    { month: 'Oct', pendaftar: 67 },
    { month: 'Nov', pendaftar: 23 },
    { month: 'Dec', pendaftar: 89 }
  ];

  const [students] = useState([
    {
      id: 'I001',
      name: 'Nisoyu Alcainti',
      program: 'Media Course',
      bukti: 'bukti_001.pdf',
      status: 'Aktif'
    },
    {
      id: 'I001',
      name: 'Nisoyu Alcainti',
      program: 'Media Course',
      bukti: 'bukti_001.pdf',
      status: 'Aktif'
    },
    {
      id: 'I001',
      name: 'Nisoyu Alcainti',
      program: 'Media Course',
      bukti: 'bukti_001.pdf',
      status: 'Aktif'
    },
    {
      id: 'I002',
      name: 'Mbwar Li alahi',
      program: 'Private Class',
      bukti: 'bukti_002.pdf',
      status: 'Pending'
    },
    {
      id: 'I003',
      name: 'Pifuku Hassam',
      program: 'UX Research',
      bukti: 'bukti_003.jpg',
      status: 'Tidak Aktif'
    },

  ]);

  const [paymentConfirmations] = useState([
    {
      id: '001',
      name: 'Naeya Adeani',
      metode: 'Transfer Bank Mandiri',
    },
    {
      id: '002',
      name: 'Mawar Lestari',
      metode: 'Transfer Bank BCA',
    },
    // ... tambahkan data lainnya
  ]);
  // Di bawah state
  const visibleStudents = students.slice(0, 10); // Potong array siswa hanya 10 baris

  // Dummy data Materi
  const [materis] = useState([
    { materi_id: 1, produk_id: 1, nama_materi: 'Matematika Dasar', deskripsi: 'Materi pengenalan konsep dasar matematika untuk OSN.', urutan: 1 },
    { materi_id: 2, produk_id: 1, nama_materi: 'Logika & Penalaran', deskripsi: 'Melatih kemampuan berpikir logis dalam menyelesaikan soal olimpiade.', urutan: 2 },
    // ...tambahkan data lain sesuai kebutuhan
  ]);

  // Dummy data Submateri
  const [subMateris] = useState([
    { sub_materi_id: 1, materi_id: 1, judul_sub_materi: 'Pengantar Aritmetika', tipe_materi: 'video', durasi: 400, konten_path: 'https://itb.ac.id', urutan: 1 },
    { sub_materi_id: 2, materi_id: 1, judul_sub_materi: 'Latihan Aritmetika Dasar', tipe_materi: 'teks', konten_path: 'https://upi.edu', urutan: 2 },
    // ...tambahkan data lain sesuai kebutuhan
  ]);

  // Data dummy users (daftar siswa)
  const [users] = useState([
    {
      user_id: 1,
      nama_lengkap: 'coba99',
      email: 'coba99@gmail.com',
      no_hp: '85774548657',
      role: 'siswa',
      created_at: '2025-05-21 08:17:30',
    },
    {
      user_id: 4,
      nama_lengkap: 'bintang',
      email: 'bintang@gmail.com',
      no_hp: '25542655',
      role: 'siswa',
      created_at: '2025-05-22 09:11:58',
    },
    // ...tambahkan data siswa lain sesuai kebutuhan
  ]);

  // Data dummy produk
  const [produkList] = useState([
    { produk_id: 1, nama_produk: 'Media Course', harga: 350000, deskripsi: 'Kelas online interaktif untuk persiapan UTBK.' },
    { produk_id: 2, nama_produk: 'Private Class', harga: 160000, deskripsi: 'Bimbingan belajar privat dengan mentor berpengalaman.' },
    { produk_id: 3, nama_produk: 'Tryout UTBK', harga: 50000, deskripsi: 'Simulasi UTBK dengan pembahasan soal.' },
    // ...tambahkan produk lain sesuai kebutuhan
  ]);

  // Data dummy pendaftaran (join user + produk)
  const [pendaftaran] = useState([
    {
      pendaftaran_id: 1,
      user_id: 1,
      produk_id: 1,
      asal_sekolah: 'SMA 1 Bandung',
      no_ortu: '08123456789',
    },
    {
      pendaftaran_id: 2,
      user_id: 4,
      produk_id: 2,
      asal_sekolah: 'SMA 2 Jakarta',
      no_ortu: '08234567890',
    },
    // ...tambahkan data pendaftaran lain sesuai kebutuhan
  ]);

  // Data dummy pembayaran (join pembayaran + users + pendaftaran)
  const [pembayaran] = useState([
    {
      pembayaran_id: 2,
      pendaftaran_id: 1,
      user_id: 1,
      produk_id: 1,
      nama_lengkap: 'coba99',
      email: 'coba99@gmail.com',
      metode_pembayaran: 'transfer_bri',
      jumlah_pembayaran: 350000.00,
      tanggal_pembayaran: '2025-05-22',
      bukti_pembayaran: 'bukti_pembayaran/bukti_2_1747930253.png',
      status_konfirmasi: 'menunggu',
    },
    {
      pembayaran_id: 4,
      pendaftaran_id: 2,
      user_id: 4,
      produk_id: 2,
      nama_lengkap: 'bintang',
      email: 'bintang@gmail.com',
      metode_pembayaran: 'transfer_bri',
      jumlah_pembayaran: 160000.00,
      tanggal_pembayaran: '2025-05-29',
      bukti_pembayaran: 'bukti_pembayaran/bukti_4_1748519960.png',
      status_konfirmasi: 'sukses',
    },
    // ...tambahkan data pembayaran lain sesuai kebutuhan
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      <HeaderAdmin />
      <div className="flex flex-1 overflow-auto">
        <div className="w-64 min-w-64 overflow-auto">
          <SidebarAdmin activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
        <main className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FC] p-6">
          {activeMenu === 'Jumlah Pendaftar' && (
            <>
              {/* Header Section */}
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#3B2E55]">Jumlah Pendaftar</h1>
              </div>

              {/* Grafik Pendaftaran */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-[#2E2344]">Statistik Pendaftaran Bulanan</h2>
                <div className="h-64">
                  <ResponsiveContainer width="90%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: '#2E2344' }}
                      />
                      <YAxis
                        tick={{ fill: '#2E2344' }}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="pendaftar"
                        name="2020"
                        fill="#9E92FE"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* cari nama */}
              <div className="relative w-96 mb-6">
                <input
                  type="text"
                  placeholder="Cari nama..."
                  className="w-full px-4 py-2 rounded-lg border border-[#D5CEE5] focus:outline-none focus:ring-2 focus:ring-[#6D6DB0]"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-3 top-2.5 text-[#6D6DB0]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </>
          )}

          {/* Menu Materi */}
          {activeMenu === 'Materi' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#3B2E55]">Daftar Materi</h1>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">Tambah Materi</button>
              </div>
              <div className="rounded-xl shadow-lg border border-indigo-200 bg-white">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-500 sticky top-0 divide-x divide-white">
                      <tr className="divide-x divide-white">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Nama Materi</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Deskripsi</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Urutan</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materis.map((materi, idx) => (
                        <tr
                          key={materi.materi_id}
                          className={idx % 2 === 0 ? "bg-gray-100 divide-x divide-indigo-200" : "bg-indigo-50 divide-x divide-indigo-200"}
                        >
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{materi.materi_id}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{materi.nama_materi}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{materi.deskripsi}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{materi.urutan}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md mr-2">Edit</button>
                            <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-md">Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Menu Submateri */}
          {activeMenu === 'Submateri' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#3B2E55]">Daftar Submateri</h1>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">Tambah Submateri</button>
              </div>
              <div className="rounded-xl shadow-lg border border-indigo-200 bg-white">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-500 sticky top-0 divide-x divide-white">
                      <tr className="divide-x divide-white">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Materi</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Judul Submateri</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Tipe</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Konten</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Durasi (detik)</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Urutan</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subMateris.map((sub, idx) => (
                        <tr
                          key={sub.sub_materi_id}
                          className={idx % 2 === 0 ? "bg-gray-100 divide-x divide-indigo-200" : "bg-indigo-50 divide-x divide-indigo-200"}
                        >
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{sub.sub_materi_id}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">
                            {materis.find(m => m.materi_id === sub.materi_id)?.nama_materi || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{sub.judul_sub_materi}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{sub.tipe_materi}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">
                            {sub.konten_path ? (
                              <a
                                href={sub.konten_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 underline hover:text-indigo-800"
                              >
                                Lihat Konten
                              </a>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{sub.durasi || '-'}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{sub.urutan}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md mr-2">Edit</button>
                            <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-md">Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TABEL PENDAFTAR (DAFTAR SISWA) */}
          {activeMenu === 'Jumlah Pendaftar' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#3B2E55]">Daftar Siswa</h1>
              </div>
              <div className="rounded-xl shadow-lg border border-indigo-200 bg-white">
                <div className="max-h-[500px] min-h-[200px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-500 sticky top-0">
                      <tr className="divide-x divide-white">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">No HP</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Nama Produk</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Asal Sekolah</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">No Ortu</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendaftaran.map((daftar, idx) => {
                        const user = users.find(u => u.user_id === daftar.user_id);
                        const produk = produkList.find(p => p.produk_id === daftar.produk_id);
                        return (
                          <tr
                            key={daftar.pendaftaran_id}
                            className={idx % 2 === 0 ? "bg-gray-100 divide-x divide-indigo-200" : "bg-indigo-50 divide-x divide-indigo-200"}
                          >
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{user?.nama_lengkap || '-'}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{user?.email || '-'}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{user?.no_hp || '-'}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{produk?.nama_produk || '-'}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{daftar.asal_sekolah}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{daftar.no_ortu}</td>
                            <td className="px-6 py-4">
                              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md mr-2">Edit</button>
                              <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-md">Hapus</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TABEL PEMBAYARAN */}
          {activeMenu === 'Pembayaran' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#4A3A6A]">Konfirmasi Pembayaran</h1>
                <div className="relative w-96">
                  <input
                    type="text"
                    placeholder="Cari peserta..."
                    className="w-full px-4 py-2 rounded-lg border border-[#D5CEE5] focus:outline-none focus:ring-2 focus:ring-[#6D6DB0]"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute right-3 top-2.5 text-[#6D6DB0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="rounded-xl shadow-lg border border-indigo-200 bg-white">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-500 sticky top-0">
                      <tr className="divide-x divide-white">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Email</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Nama Produk</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Metode Pembayaran</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Jumlah</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Tanggal</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Bukti</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pembayaran.map((bayar, idx) => {
                        const produk = produkList.find(p => p.produk_id === bayar.produk_id);
                        return (
                          <tr
                            key={bayar.pembayaran_id}
                            className={idx % 2 === 0 ? "bg-gray-100 divide-x divide-indigo-200" : "bg-indigo-50 divide-x divide-indigo-200"}
                          >
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{bayar.nama_lengkap}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{bayar.email}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{produk?.nama_produk || '-'}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{bayar.metode_pembayaran}</td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">
                              {bayar.jumlah_pembayaran?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                            </td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55]">{bayar.tanggal_pembayaran}</td>
                            <td className="px-6 py-4">
                              {bayar.bukti_pembayaran ? (
                                <a
                                  href={`/${bayar.bukti_pembayaran}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 underline hover:text-indigo-800"
                                >
                                  Lihat Bukti
                                </a>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-[#3B2E55] capitalize">{bayar.status_konfirmasi}</td>
                            <td className="px-6 py-4">
                              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md mr-2">Terima</button>
                              <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-md">Tolak</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TABEL PRODUK */}
          {activeMenu === 'Produk' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#3B2E55]">Daftar Produk</h1>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">Tambah Produk</button>
              </div>
              <div className="rounded-xl shadow-lg border border-indigo-200 bg-white">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-500 sticky top-0 divide-x divide-white">
                      <tr className="divide-x divide-white">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama Produk</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Harga</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Deskripsi</th>
                        <th className="px-6 py-4 text-left textsm font-semibold text-white">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {produkList.map((produk, idx) => (
                        <tr
                          key={produk.produk_id}
                          className={idx % 2 === 0 ? "bg-gray-100 divide-x divide-indigo-200" : "bg-indigo-50 divide-x divide-indigo-200"}
                        >
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{produk.produk_id}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{produk.nama_produk}</td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">
                            {produk.harga?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#3B2E55]">{produk.deskripsi}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600">Edit</button>
                            <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600">Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ...existing menu... */}
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
