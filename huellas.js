const btn = document.getElementById("perro-btn");
let modoHuellas = false;

// Activar/desactivar modo huellas
btn.addEventListener("click", () => {
  modoHuellas = !modoHuellas;
});

// Agregar huella al hacer clic en la página
document.addEventListener("click", (e) => {
  if (!modoHuellas) return;

  // Crear elemento de huella
  const huella = document.createElement("div");
  huella.className = "huella";
  huella.textContent = ["🐾", "🐕", "🦴", "💩"][Math.floor(Math.random() * 4)]; // Huellas aleatorias

  // Posicionar en el lugar del clic
  huella.style.left = `${e.clientX - 15}px`; // Ajuste para centrar
  huella.style.top = `${e.clientY - 15}px`;

  // Agregar al body
  document.body.appendChild(huella);

  // Remover después de 3 segundos para no sobrecargar
  setTimeout(() => {
    huella.remove();
  }, 3000);
});
