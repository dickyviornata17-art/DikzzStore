// ====== DATA PRODUK ======
const produkData = [
  { id: 1, nama: "Baju Muslim Pria Premium", harga: 180000, img: "img/produk1.avif" },
  { id: 2, nama: "Gamis Muslimah Elegan", harga: 200000, img: "img/produk2.jpg" },
  { id: 3, nama: "Kaos Distro Streetwear", harga: 120000, img: "img/produk3.jpg" },
  { id: 4, nama: "Koko Modern Lengan Panjang", harga: 150000, img: "img/produk4.jpg" },
  { id: 5, nama: "Hijab Casual Harian", harga: 95000, img: "img/produk5.jpg" },
  { id: 6, nama: "Kaos Oversize Trendy", harga: 85000, img: "img/produk6.webp" },
  { id: 7, nama: "Sandal Slop Pria", harga: 130000, img: "img/produk7.webp" },
  { id: 8, nama: "Abaya Dubai Turkey Kaftan", harga: 450000, img: "img/produk8.jpg" },
  
];

let keranjang = [];

// ====== RENDER PRODUK ======
const produkList = document.getElementById("produkList");
produkData.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("produk-card");
  card.innerHTML = `
    <img src="${p.img}" alt="${p.nama}">
    <h3>${p.nama}</h3>
    <p>Rp ${p.harga.toLocaleString()}</p>
    <button class="add-btn" onclick="tambahKeKeranjang(${p.id})">Tambah</button>
  `;
  produkList.appendChild(card);
});