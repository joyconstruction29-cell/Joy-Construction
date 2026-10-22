document.addEventListener("DOMContentLoaded", function () {
  const areaInput = document.getElementById("area");
  const packageSelect = document.getElementById("package");

  // Find the result area on your website.
  const totalElement =
    document.getElementById("totalAmount") ||
    document.getElementById("estimateTotal");

  const noteElement =
    document.getElementById("calculationNote") ||
    document.getElementById("rateText");

  const errorElement = document.getElementById("calcError");

  function formatRupees(amount) {
    return "₹" + Math.round(amount).toLocaleString("en-IN");
  }

  function calculateCost() {
    if (!areaInput || !packageSelect || !totalElement) {
      console.error(
        "Calculator elements not found. Check the IDs in index.html."
      );
      return;
    }

    const area = Number(areaInput.value);
    const rate = Number(packageSelect.value);

    if (
      !Number.isFinite(area) ||
      area <= 0 ||
      !Number.isFinite(rate) ||
      rate <= 0
    ) {
      totalElement.textContent = "Enter valid area";

      if (noteElement) {
        noteElement.textContent =
          "Please enter an area greater than zero.";
      }

      if (errorElement) {
        errorElement.hidden = false;
      }

      return;
    }

    if (errorElement) {
      errorElement.hidden = true;
    }

    const total = area * rate;

    totalElement.textContent = formatRupees(total);

    if (noteElement) {
      noteElement.textContent =
        area.toLocaleString("en-IN") +
        " sq.ft. × " +
        formatRupees(rate) +
        "/sq.ft.";
    }
  }

  // Recalculate when the area changes.
  if (areaInput) {
    areaInput.addEventListener("input", calculateCost);
    areaInput.addEventListener("change", calculateCost);
  }

  // Recalculate when the package changes.
  if (packageSelect) {
    packageSelect.addEventListener("change", calculateCost);
    packageSelect.addEventListener("input", calculateCost);
  }

  // Calculate once when the page loads.
  calculateCost();
});
