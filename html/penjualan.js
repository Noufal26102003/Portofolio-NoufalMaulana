// Array untuk menyimpan data penjualan
let salesData = [];

// Ambil elemen DOM
const salesForm = document.getElementById('sales-form');
const salesTableBody = document.querySelector('#sales-table tbody');
const salesChartCanvas = document.getElementById('sales-chart').getContext('2d');

// Fungsi untuk menambah penjualan ke tabel dan array
salesForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const product = document.getElementById('product').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const total = price * quantity;

    // Tambahkan data ke tabel
    const row = salesTableBody.insertRow();
    row.insertCell(0).innerText = product;
    row.insertCell(1).innerText = `Rp ${price.toFixed(2)}`;
    row.insertCell(2).innerText = quantity;
    row.insertCell(3).innerText = `Rp ${total.toFixed(2)}`;

    // Tambahkan data ke array salesData
    salesData.push({ product, total });

    // Reset form
    salesForm.reset();

    // Update chart
    updateChart();
});

// Fungsi untuk memperbarui chart
function updateChart() {
    const products = salesData.map(sale => sale.product);
    const totals = salesData.map(sale => sale.total);

    // Hapus chart lama jika ada
    if (window.salesChart) {
        window.salesChart.destroy();
    }

    // Buat chart baru
    window.salesChart = new Chart(salesChartCanvas, {
        type: 'bar',
        data: {
            labels: products,
            datasets: [{
                label: 'Total Penjualan (Rp)',
                data: totals,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
