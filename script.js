const photos = window.PHOTOS || [];
const grid = document.querySelector("[data-photo-grid]");
const dialog = document.querySelector("[data-print-dialog]");
let activePhoto = null;

const money = (amount) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
}).format(amount);

function renderPhotos() {
  grid.innerHTML = photos.map((photo) => `
    <button class="photo-card" type="button" data-photo-id="${photo.id}" data-category="${photo.category}">
      <span class="photo-card__image"><img src="${photo.image}" alt="${photo.alt}" loading="lazy" /><span class="preview-notice">Resolution increases after buying</span></span>
      <span class="photo-card__meta"><span class="photo-card__title">${photo.title}</span><span class="photo-card__price">${money(photo.sizes[0].price)}</span></span>
      <span class="photo-card__location">${photo.location}</span>
    </button>`).join("");
}

function updateDialog() {
  if (!activePhoto) return;
  const sizeIndex = Number(document.querySelector("[data-dialog-size]").value);
  const buyButton = document.querySelector("[data-dialog-add]");
  const message = document.querySelector("[data-dialog-message]");
  const price = activePhoto.sizes[sizeIndex].price;
  document.querySelector("[data-dialog-price]").textContent = money(price);
  message.textContent = "";
  buyButton.disabled = !activePhoto.payhipUrl;
  buyButton.textContent = activePhoto.payhipUrl ? `Buy & download — ${money(price)}` : "Available soon";
}

function openDialog(photo) {
  activePhoto = photo;
  document.querySelector("[data-dialog-image]").src = photo.image;
  document.querySelector("[data-dialog-image]").alt = photo.alt;
  document.querySelector("[data-dialog-location]").textContent = photo.location;
  document.querySelector("[data-dialog-title]").textContent = photo.title;
  document.querySelector("[data-dialog-description]").textContent = photo.description;
  const select = document.querySelector("[data-dialog-size]");
  select.innerHTML = photo.sizes.map((size, index) => `<option value="${index}">${size.label} — ${money(size.price)}</option>`).join("");
  updateDialog();
  dialog.showModal();
}

renderPhotos();
document.querySelector("[data-year]").textContent = new Date().getFullYear();

grid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-photo-id]");
  if (!card) return;
  openDialog(photos.find((photo) => photo.id === card.dataset.photoId));
});

document.querySelectorAll(".filter").forEach((filter) => filter.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach((button) => button.classList.toggle("is-active", button === filter));
  document.querySelectorAll(".photo-card").forEach((card) => card.classList.toggle("is-hidden", filter.dataset.filter !== "all" && card.dataset.category !== filter.dataset.filter));
}));

document.querySelector("[data-dialog-size]").addEventListener("change", updateDialog);
document.querySelector("[data-dialog-add]").addEventListener("click", () => {
  if (!activePhoto?.payhipUrl) return;
  window.location.href = activePhoto.payhipUrl;
});
document.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
