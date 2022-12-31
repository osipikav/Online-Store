function create404() {
  const main = document.querySelector('.main');
  main.innerHTML = `
    <h2 class="not-found">page not found (404)</h2>`;
}
export { create404 };
