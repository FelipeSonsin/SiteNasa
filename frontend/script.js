const API_BASE_URL = "http://127.0.0.1:8000";

const form = document.getElementById("birth-form");
const dateInput = document.getElementById("birth-date");
const messageEl = document.getElementById("message");
const resultEl = document.getElementById("result");
const titleEl = document.getElementById("apod-title");
const dateEl = document.getElementById("apod-date");
const explanationEl = document.getElementById("apod-explanation");
const mediaContainer = document.getElementById("media-container");

function setMessage(text, type = "") {
  messageEl.textContent = text;
  messageEl.className = "message";
  if (type) {
    messageEl.classList.add(type);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dateValue = dateInput.value;
  if (!dateValue) {
    setMessage("Por favor, selecione uma data.", "error");
    return;
  }

  setMessage("Buscando dados na NASA...", "success");
  resultEl.classList.add("hidden");

  try {
    const url = `${API_BASE_URL}/apod?date=${encodeURIComponent(dateValue)}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const detail = errorData.detail || "Erro ao buscar dados.";
      throw new Error(detail);
    }

    const data = await response.json();

    titleEl.textContent = data.title || "Sem título";
    dateEl.textContent = `Data da imagem: ${data.date}`;
    explanationEl.textContent = data.explanation || "";

    mediaContainer.innerHTML = "";
    if (data.media_type === "image") {
      const img = document.createElement("img");
      img.src = data.hdurl || data.url;
      img.alt = data.title || "Imagem da NASA";
      mediaContainer.appendChild(img);
    } else if (data.media_type === "video") {
      const iframe = document.createElement("iframe");
      iframe.src = data.url;
      iframe.width = "100%";
      iframe.height = "400";
      iframe.allowFullscreen = true;
      mediaContainer.appendChild(iframe);
    } else {
      mediaContainer.textContent = "Tipo de mídia não suportado.";
    }

    resultEl.classList.remove("hidden");
    setMessage("Imagem carregada com sucesso!", "success");
  } catch (error) {
    console.error(error);
    setMessage(error.message || "Erro inesperado ao buscar a imagem.", "error");
  }
});

