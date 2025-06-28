// Dados de treino por dia com vídeos do YouTube
const treinos = {
    "Segunda-feira": [
      { nome: "Desenvolvimento militar", series: "3x8-10", video: "https://www.youtube.com/embed/zpOULjyy-n8" },
      { nome: "Elevação frontal", series: "3x10-12", video: "https://www.youtube.com/embed/mRntR0x2r80" },
      { nome: "Elevação lateral", series: "3x10-12", video: "https://www.youtube.com/embed/3VcKaXpzqRo" },
      { nome: "Rosca direta", series: "3x10-12", video: "https://www.youtube.com/embed/kwG2ipFRgfo" },
      { nome: "Tríceps pulley", series: "3x10-12", video: "https://www.youtube.com/embed/2-LAMcpzODU" },
      { nome: "Rosca martelo", series: "3x10-12", video: "https://www.youtube.com/embed/zC3nLlEvin4" },
      { nome: "Tríceps testa", series: "3x10-12", video: "https://www.youtube.com/embed/d_KZxkY_0cM" },        
    ],
    "Terça-feira": [
      { nome: "Supino reto", series: "3x8-10", video: "https://www.youtube.com/embed/gRVjAtPip0Y" },
      { nome: "Supino inclinado com halteres", series: "3x10-12", video: "https://www.youtube.com/embed/8iPEnn-ltC8" },
      { nome: "Crucifixo reto", series: "3x10-12", video: "https://www.youtube.com/embed/eozdVDA78K0" },
      { nome: "Remada na máquina", series: "3x10-12", video: "https://www.youtube.com/embed/GZbfZ033f74" },
      { nome: "Puxada na barra fixa", series: "3x8-10", video: "https://www.youtube.com/embed/eGo4IYlbE5g" },
      { nome: "Pulldown", series: "3x10-12", video: "https://www.youtube.com/embed/CAwf7n6Luuc" },    
    ],
    // Continue para os outros dias com links reais do YouTube...
    "Quarta-feira": [
      { nome: "Agachamento", series: "3x8-10", video: "https://www.youtube.com/embed/aclHkVaku9U" },
      { nome: "Leg press", series: "3x10-12", video: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
      { nome: "Cadeira extensora", series: "3x12-15", video: "https://www.youtube.com/embed/mF70k8xWd3o" },
      { nome: "Cadeira flexora", series: "3x12-15", video: "https://www.youtube.com/embed/-Vao6Zea3hE" },
      { nome: "Panturrilha no leg press", series: "3x15-20", video: "https://www.youtube.com/embed/5kLZ9QKZjGY" },
      { nome: "Prancha abdominal", series: "3x30-60s", video: "https://www.youtube.com/embed/pSHjTRCQxIw" },
      { nome: "Russian twist", series: "3x12-15", video: "https://www.youtube.com/embed/wkD8rjkodUI" },    
    ],
    "Quinta-feira": [
        { nome: "Desenvolvimento militar", series: "3x8-10", video: "https://www.youtube.com/embed/zpOULjyy-n8" },
        { nome: "Elevação frontal", series: "3x10-12", video: "https://www.youtube.com/embed/mRntR0x2r80" },
        { nome: "Elevação lateral", series: "3x10-12", video: "https://www.youtube.com/embed/3VcKaXpzqRo" },
        { nome: "Rosca direta", series: "3x10-12", video: "https://www.youtube.com/embed/kwG2ipFRgfo" },
        { nome: "Tríceps pulley", series: "3x10-12", video: "https://www.youtube.com/embed/2-LAMcpzODU" },
        { nome: "Rosca martelo", series: "3x10-12", video: "https://www.youtube.com/embed/zC3nLlEvin4" },
        { nome: "Tríceps testa", series: "3x10-12", video: "https://www.youtube.com/embed/d_KZxkY_0cM" }, 
    ],
    "Sexta-feira": [
        { nome: "Supino reto", series: "3x8-10", video: "https://www.youtube.com/embed/gRVjAtPip0Y" },
        { nome: "Supino inclinado com halteres", series: "3x10-12", video: "https://www.youtube.com/embed/8iPEnn-ltC8" },
        { nome: "Crucifixo reto", series: "3x10-12", video: "https://www.youtube.com/embed/eozdVDA78K0" },
        { nome: "Remada na máquina", series: "3x10-12", video: "https://www.youtube.com/embed/GZbfZ033f74" },
        { nome: "Puxada na barra fixa", series: "3x8-10", video: "https://www.youtube.com/embed/eGo4IYlbE5g" },
        { nome: "Pulldown", series: "3x10-12", video: "https://www.youtube.com/embed/CAwf7n6Luuc" },    
    ],
    "Sábado": [
      // Pode repetir ou personalizar
    ],
    "Domingo": [], // descanso
  };
  
  const modal = document.getElementById("modal");
  const dayTitle = document.getElementById("dayTitle");
  const exerciseList = document.getElementById("exerciseList");
  const completedMsg = document.getElementById("completedMsg");
  let concluido = [];
  
  const PROGRESS_KEY = "progressoTreino";
  
  function carregarProgresso() {
    const dados = localStorage.getItem(PROGRESS_KEY);
    if (dados) return JSON.parse(dados);
    return {};
  }
  
  function salvarProgresso(progresso) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progresso));
  }
  
  function verificarResetSemanal() {
    const hoje = new Date();
    const domingo = 0;
    const lastResetStr = localStorage.getItem("lastResetTreino");
    let precisaResetar = false;
  
    if (!lastResetStr) {
      precisaResetar = true;
    } else {
      const lastReset = new Date(lastResetStr);
      if (hoje.getDay() === domingo && hoje.toDateString() !== lastReset.toDateString()) {
        precisaResetar = true;
      }
      if (!precisaResetar) {
        let dataCheck = new Date(lastReset);
        dataCheck.setDate(dataCheck.getDate() + 7);
        if (hoje >= dataCheck) {
          precisaResetar = true;
        }
      }
    }
  
    if (precisaResetar) {
      localStorage.removeItem(PROGRESS_KEY);
      localStorage.setItem("lastResetTreino", hoje.toDateString());
    }
  }
  
  verificarResetSemanal();
  
  let progressoTreino = carregarProgresso();
  
  function carregarTreinosLocalStorage() {
    const dados = localStorage.getItem("treinos");
    if (dados) {
      return JSON.parse(dados);
    } else {
      return treinos; // padrão inicial
    }
  }
  
  function salvarTreinosLocalStorage(dados) {
    localStorage.setItem("treinos", JSON.stringify(dados));
  }
  
  function atualizarStatusDias() {
    const treinosAtualizados = carregarTreinosLocalStorage();
    Object.keys(treinosAtualizados).forEach(dia => {
      const btn = document.querySelector(`#daysContainer button:nth-child(${diaIndex(dia)})`);
      if (!btn) return;
  
      const lista = treinosAtualizados[dia];
      if (!lista || lista.length === 0) {
        btn.textContent = dia;
        return;
      }
  
      const concluidosDoDia = progressoTreino[dia] || [];
      const completo = concluidosDoDia.length === lista.length;
      btn.textContent = completo ? `${dia} ✅` : dia;
    });
  }
  
  function diaIndex(dia) {
    const ordem = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
    return ordem.indexOf(dia) + 1;
  }
  
  function openDay(dia) {
    const treinosAtualizados = carregarTreinosLocalStorage();
    const lista = treinosAtualizados[dia] || [];
  
    dayTitle.textContent = dia;
    exerciseList.innerHTML = "";
    concluido = [];
  
    if (lista.length === 0) {
      exerciseList.innerHTML = "<p>Dia de descanso 💤</p>";
      completedMsg.classList.add("hidden");
    } else {
      lista.forEach((ex, index) => {
        const item = document.createElement("li");
        item.className = "p-4 bg-white bg-opacity-10 rounded-lg";
  
        const marcado = progressoTreino[dia]?.includes(index);
  
        item.innerHTML = `
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-bold text-lg">${ex.nome}</h3>
              <p>${ex.series}</p>
            </div>
            <button onclick="marcar(${index}, '${dia}')" id="check-${index}" class="text-xl cursor-pointer">${marcado ? "✅" : "⬜"}</button>
          </div>
          <iframe class="mt-2 w-full rounded-md" height="200" src="${ex.video}" frameborder="0" allowfullscreen></iframe>
        `;
        exerciseList.appendChild(item);
  
        if (marcado) concluido.push(index);
      });
      completedMsg.classList.toggle("hidden", concluido.length !== lista.length);
    }
    modal.classList.remove("hidden");
    atualizarStatusDias();
  }
  
  function marcar(i, dia) {
    const btn = document.getElementById(`check-${i}`);
    if (!concluido.includes(i)) {
      concluido.push(i);
      btn.textContent = "✅";
    } else {
      concluido = concluido.filter(x => x !== i);
      btn.textContent = "⬜";
    }
  
    progressoTreino[dia] = [...concluido];
    salvarProgresso(progressoTreino);
  
    completedMsg.classList.toggle("hidden", concluido.length !== exerciseList.children.length);
    atualizarStatusDias();
  }
  
  document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");
  
  // Configurações
  const settingsModal = document.getElementById("settingsModal");
  const closeSettings = document.getElementById("closeSettings");
  const settingsBtn = document.getElementById("settingsBtn");
  const exercisesByDayDiv = document.getElementById("exercisesByDay");
  const addExerciseForm = document.getElementById("addExerciseForm");
  let treinosStorage = carregarTreinosLocalStorage();
  
  function atualizarListaConfig() {
    exercisesByDayDiv.innerHTML = "";
    Object.keys(treinosStorage).forEach(dia => {
      const container = document.createElement("div");
      container.className = "border border-white border-opacity-20 rounded p-3";
      container.innerHTML = `<h4 class="font-semibold mb-2">${dia}</h4>`;
  
      if (treinosStorage[dia].length === 0) {
        container.innerHTML += "<p class='text-gray-400 italic'>Nenhum exercício</p>";
      } else {
        treinosStorage[dia].forEach((ex, i) => {
          const exDiv = document.createElement("div");
          exDiv.className = "flex justify-between items-center mb-1";
  
          exDiv.innerHTML = `
            <div>
              <input type="text" class="bg-transparent border-b border-white border-opacity-30 w-48 text-sm text-white" value="${ex.nome}" data-dia="${dia}" data-index="${i}" data-campo="nome"/>
              <input type="text" class="bg-transparent border-b border-white border-opacity-30 w-24 text-sm ml-2 text-white" value="${ex.series}" data-dia="${dia}" data-index="${i}" data-campo="series"/>
              <input type="url" class="bg-transparent border-b border-white border-opacity-30 w-48 text-sm ml-2 text-white" value="${ex.video}" data-dia="${dia}" data-index="${i}" data-campo="video"/>
            </div>
            <button data-dia="${dia}" data-index="${i}" class="text-red-500 font-bold text-lg">🗑️</button>
          `;
  
          exDiv.querySelectorAll("input").forEach(input => {
            input.addEventListener("change", (e) => {
              const d = e.target.dataset.dia;
              const idx = e.target.dataset.index;
              const campo = e.target.dataset.campo;
              treinosStorage[d][idx][campo] = e.target.value;
              salvarTreinosLocalStorage(treinosStorage);
            });
          });
  
          exDiv.querySelector("button").addEventListener("click", (e) => {
            const d = e.target.dataset.dia;
            const idx = e.target.dataset.index;
            treinosStorage[d].splice(idx, 1);
            salvarTreinosLocalStorage(treinosStorage);
            atualizarListaConfig();
            atualizarStatusDias();
          });
  
          container.appendChild(exDiv);
        });
      }
      exercisesByDayDiv.appendChild(container);
    });
  }
  
  settingsBtn.addEventListener("click", () => {
    treinosStorage = carregarTreinosLocalStorage();
    atualizarListaConfig();
    settingsModal.classList.remove("hidden");
  });
  
  closeSettings.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
  });
  
  addExerciseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("exerciseName").value.trim();
    const series = document.getElementById("exerciseSeries").value.trim();
    const video = document.getElementById("exerciseVideo").value.trim();
    const dia = document.getElementById("exerciseDay").value;
  
    if (!nome || !series || !video || !dia) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
  
    if (!treinosStorage[dia]) treinosStorage[dia] = [];
  
    treinosStorage[dia].push({ nome, series, video });
    salvarTreinosLocalStorage(treinosStorage);
    atualizarListaConfig();
    atualizarStatusDias();
    addExerciseForm.reset();
  });
  
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  saveSettingsBtn.addEventListener("click", () => {
    salvarTreinosLocalStorage(treinosStorage);
    atualizarStatusDias();
    alert("Alterações salvas com sucesso!");
  });
  