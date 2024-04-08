/**
 * Sorts a HTML table.
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // Sort each row
  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  // Remove all existing TRs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  // Re-add the newly sorted rows
  tBody.append(...sortedRows);

  // Remove sorting indicator classes from all header cells
  table.querySelectorAll("th").forEach((th) => {
    th.classList.remove("th-sort-asc", "th-sort-desc");
  });

  // Add the sorting indicator to the clicked header cell
  const clickedHeaderCell = table.querySelector(`th:nth-child(${column + 1})`);
  clickedHeaderCell.classList.toggle("th-sort-asc", asc);
  clickedHeaderCell.classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".sortr th").forEach((headerCell) => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(
      headerCell.parentElement.children,
      headerCell
    );
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);

    // Remove sorting indicators after sorting
    setTimeout(() => {
      tableElement.querySelectorAll("th").forEach((th) => {
        th.classList.remove("th-sort-asc", "th-sort-desc");
      });
    }, 3000); // Adjust the timeout value as needed
  });
});

var previewButtons = document.querySelectorAll(".preview-button");
previewButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah perilaku bawaan dari tautan

    // Ambil URL gambar dari atribut data-src
    var imageUrl = this.getAttribute("data-src");

    // Tampilkan gambar dalam popup
    var popupImage = document.getElementById("popup-image");
    popupImage.src = imageUrl;

    // Tampilkan popup
    document.getElementById("popup").style.display = "block";
  });
});

// Tangkap tombol tutup popup
document
  .getElementById("close-popup")
  .addEventListener("click", function (event) {
    // Sembunyikan popup saat tombol ditutup
    document.getElementById("popup").style.display = "none";
  });
// Fungsi untuk menampilkan tabel berdasarkan nomor tabel yang diberikan
function showTable(tableNumber) {
  if (tableNumber === 1) {
    document.getElementById("table1").style.display = "block"; // Menampilkan tabel 1
    document.getElementById("table2").style.display = "none"; // Menyembunyikan tabel 2
    document.getElementById("textAboveTable").innerText = "Member Inti"; // Mengubah teks di atas tabel
  } else if (tableNumber === 2) {
    document.getElementById("table1").style.display = "none"; // Menyembunyikan tabel 1
    document.getElementById("table2").style.display = "block"; // Menampilkan tabel 2
    document.getElementById("textAboveTable").innerText = "Trainee"; // Mengubah teks di atas tabel
  }
}

// Menangkap event keyboard
document.addEventListener('keydown', function(event) {
  // Jika tombol panah kiri ditekan
  if (event.key === 'ArrowLeft') {
    showTable(1); // Memanggil fungsi showTable untuk menampilkan tabel sebelumnya
  }
  // Jika tombol panah kanan ditekan
  else if (event.key === 'ArrowRight') {
    showTable(2); // Memanggil fungsi showTable untuk menampilkan tabel selanjutnya
  }
});
