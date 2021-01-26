const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

const registrosPorPagina = 40;
let totalPaginas;
let iterador;

window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();

  // Recuperamos lo escrito en el input
  const terminoBusqueda = document.querySelector("#termino").value;

  if (terminoBusqueda === "") {
    mostrarAlerta("Agregue un término de búsqueda");
    return;
  }

  buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector(".bg-red-100");

  // Si no existe una alerta previa,la creas.
  if (!existeAlerta) {
    const alerta = document.createElement("p");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">${mensaje}</span>
    `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes(termino) {
  const key = "19999827-6936fcb4bc8ae9bb201d064ec";
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;

  console.log(termino);

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      totalPaginas = calcularPaginas(resultado.totalHits);
      mostrarImagenes(resultado.hits);
    });
}

// Generador que va a registrar la cantidad de elementos de acuerdo a las páginas
function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registrosPorPagina));
}

function mostrarImagenes(imagenes) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  imagenes.forEach((img) => {
    const { previewURL, likes, views, largeImageURL } = img;

    resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
        <div class="bg-white">
          <img class="w-full" src="${previewURL}">
          <div class="p-4">
            <p class="font-bold">${likes}<span class="font-light"> Me Gusta</span></p>
            <p class="font-bold">${views}<span class="font-light"> Veces Vista</span></p>

            <a class="block w-gull bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer"> Ver Imagen</a>
          </div>
        </div>
      </div>
    `;
  });
  imprimirPaginador();
}

function imprimirPaginador() {
  iterador = crearPaginador(totalPaginas);
}
