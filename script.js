const photos = window.PHOTOS || [];
const grid = document.querySelector("[data-photo-grid]");
const cartPanel = document.querySelector("[data-cart-panel]");
const overlay = document.querySelector("[data-overlay]");
const dialog = document.querySelector("[data-print-dialog]");
let activePhoto = null;
let cart = JSON.parse(localStorage.getItem("william-photo-cart") || "[]");

const money = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

function renderPhotos() {
  grid.innerHTML = photos.map((photo) => `
    <button class="photo-card" type="button" data-photo-id="${photo.id}" data-category="${photo.category}">
      <span class="photo-card__image"><img src="${photo.image}" alt="${photo.alt}" loading="lazy" /><span class="preview-notice">Resolution increases after buying</span></span>
      <span class="photo-card__meta"><span class="photo-card__title">${photo.title}</span><span class="photo-card__price">from ${money(photo.sizes[0].price)}</span></span>
      <span class="photo-card__location">${photo.location}</span>
    </button>`).join("");
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
  updateDialogPrice();
  dialog.showModal();
}

function updateDialogPrice() {
  if (!activePhoto) return;
  const index = Number(document.querySelector("[data-dialog-size]").value);
  document.querySelector("[data-dialog-price]").textContent = money(activePhoto.sizes[index].price);
}

function addToCart(photo, sizeIndex) {
  const size = photo.sizes[sizeIndex];
  cart.push({ key: `${photo.id}-${size.label}`, photoId: photo.id, title: photo.title, image: photo.image, size: size.label, price: size.price });
  localStorage.setItem("william-photo-cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const items = document.querySelector("[data-cart-items]");
  const empty = document.querySelector("[data-cart-empty]");
  const summary = document.querySelector("[data-cart-summary]");
  const count = document.querySelector("[data-cart-count]");
  count.textContent = cart.length;
  items.innerHTML = cart.map((item, index) => `
    <article class="cart-item">
      <img src="${item.image}" alt="" />
      <div><h3>${item.title}</h3><p>${item.size} · ${money(item.price)}</p></div>
      <button class="remove-item" type="button" data-remove-item="${index}">Remove</button>
    </article>`).join("");
  empty.classList.toggle("is-hidden", cart.length > 0);
  summary.classList.toggle("is-empty", cart.length === 0);
  document.querySelector("[data-cart-subtotal]").textContent = money(cart.reduce((total, item) => total + item.price, 0));
}

function setCartOpen(open) {
  cartPanel.classList.toggle("is-open", open);
  cartPanel.setAttribute("aria-hidden", String(!open));
  overlay.classList.toggle("is-visible", open);
  document.body.style.overflow = open ? "hidden" : "";
}

function checkout() {
  if (!cart.length) return;
  document.querySelector("[data-checkout-message]").textContent = "Automatic checkout will be added after the payment and download service is set up.";
}

renderPhotos();
renderCart();
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

document.querySelector("[data-dialog-size]").addEventListener("change", updateDialogPrice);
document.querySelector("[data-dialog-add]").addEventListener("click", () => {
  addToCart(activePhoto, Number(document.querySelector("[data-dialog-size]").value));
  dialog.close();
  setCartOpen(true);
});
document.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
document.querySelector("[data-cart-toggle]").addEventListener("click", () => setCartOpen(true));
document.querySelectorAll("[data-cart-close]").forEach((button) => button.addEventListener("click", () => setCartOpen(false)));
overlay.addEventListener("click", () => setCartOpen(false));
document.querySelector("[data-cart-items]").addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-item]");
  if (!button) return;
  cart.splice(Number(button.dataset.removeItem), 1);
  localStorage.setItem("william-photo-cart", JSON.stringify(cart));
  renderCart();
});
document.querySelector("[data-checkout]").addEventListener("click", checkout);
