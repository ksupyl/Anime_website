const modal = document.querySelector('.search-model');
const modalBtn = document.querySelector('.icon_search');
const modalClose = modal.querySelector('.search-close-switch');
const modalInput = modal.querySelector('.search-model-form > input')

modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
})

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
})

modalInput.addEventListener("input", (e) => {
    console.log(modalInput.value);
})