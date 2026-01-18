async function predict() {
  const tanggalEl = document.getElementById("tanggal");
  const jamEl = document.getElementById("jam");
  const usdEl = document.getElementById("usd");
  const idrEl = document.getElementById("idr");

  if (!tanggalEl || !jamEl || !usdEl || !idrEl) {
    alert("Elemen HTML tidak ditemukan");
    return;
  }

  const tanggal = tanggalEl.value;
  const jam = jamEl.value;

  if (!tanggal) {
    alert("Pilih tanggal terlebih dahulu!");
    return;
  }

  try {
    const response = await fetch("http://10.201.244.119:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tanggal: tanggal,
        jam: jam
      })
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    usdEl.innerText = `$${data.usd}`;
    idrEl.innerText = `Rp ${Number(data.idr).toLocaleString("id-ID")}`;

  } catch (error) {
    alert("Gagal terhubung ke server");
    console.error(error);
  }
}
