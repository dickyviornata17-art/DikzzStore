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

// ====== KERANJANG ======
function tambahKeKeranjang(id) {
  const produk = produkData.find(p => p.id === id);
  const item = keranjang.find(i => i.id === id);
  if (item) item.jumlah++;
  else keranjang.push({ ...produk, jumlah: 1 });
  updateKeranjang();
}

function hapusDariKeranjang(id) {
  keranjang = keranjang.filter(i => i.id !== id);
  updateKeranjang();
}

function updateKeranjang() {
  const list = document.getElementById("keranjangList");
  list.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  keranjang.forEach(i => {
    const subtotal = i.harga * i.jumlah;
    total += subtotal;
    totalItems += i.jumlah;
    list.innerHTML += `
      <tr>
        <td>${i.nama}</td>
        <td><input type="number" min="1" value="${i.jumlah}" onchange="ubahJumlah(${i.id}, this.value)"></td>
        <td>Rp ${i.harga.toLocaleString()}</td>
        <td>Rp ${subtotal.toLocaleString()}</td>
        <td><button onclick="hapusDariKeranjang(${i.id})">Hapus</button></td>
      </tr>
    `;
  });

  document.getElementById("totalBayar").textContent = total.toLocaleString();
  document.getElementById("cart-badge").textContent = totalItems;
}

function ubahJumlah(id, jumlah) {
  const item = keranjang.find(i => i.id === id);
  if (item) item.jumlah = parseInt(jumlah);
  updateKeranjang();
}
// ====== CHECKOUT ======
document.getElementById("checkoutForm").addEventListener("submit", e => {
  e.preventDefault();
  if (keranjang.length === 0) return alert("Keranjang kosong!");

  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const total = document.getElementById("totalBayar").textContent;

  // Buat pesan WhatsApp
  let pesan = `Halo, saya ingin memesan:\n\n`;
  keranjang.forEach(item => {
    pesan += `${item.nama} - Jumlah: ${item.jumlah} - Harga: Rp ${item.harga.toLocaleString()}\n`;
  });
  pesan += `\nTotal: Rp ${total}\nNama: ${nama}\nAlamat: ${alamat}\n\nMohon konfirmasi pesanan saya.`;

  // Encode pesan untuk URL WhatsApp
  const encodedPesan = encodeURIComponent(pesan);
  const waUrl = `https://wa.me/6287865548076?text=${encodedPesan}`;

  // Buka WhatsApp
  window.open(waUrl, '_blank');

  // Reset keranjang setelah checkout
  keranjang = [];
  updateKeranjang();
  e.target.reset();

  // Tutup modal
  document.getElementById("cartModal").style.display = "none";
});