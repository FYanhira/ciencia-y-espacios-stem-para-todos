(function () {
  const hojaNum = parseInt(document.body.dataset.hoja, 10);
  const cfg = window.STEM_PREGUNTAS.hojas.find((h) => h.num === hojaNum);
  if (!cfg) return;

  const meta = window.STEM_PREGUNTAS.meta;
  document.getElementById("titulo-doc").textContent = meta.titulo;
  document.getElementById("subtitulo-doc").textContent = meta.subtitulo;
  document.getElementById("hoja-titulo").textContent = `Hoja ${cfg.num} — ${cfg.etapa}`;
  document.getElementById("hoja-instruccion").textContent = cfg.instruccion;
  document.getElementById("hoja-tiempo").textContent = cfg.tiempo ? `Tiempo sugerido: ${cfg.tiempo}` : "";

  const form = document.getElementById("form-hoja");
  const metaBox = document.getElementById("meta-box");
  const avisoId = document.getElementById("aviso-id");

  function showSession() {
    const id = window.STEM_ALMACEN.sessionId();
    if (id && hojaNum > 1) {
      avisoId.hidden = false;
      avisoId.textContent = `ID en esta computadora: ${id}. Si no es el tuyo, avisa a la facilitadora.`;
    }
  }

  if (cfg.camposMeta) {
    cfg.camposMeta.forEach((campo) => {
      const wrap = document.createElement("div");
      wrap.className = "campo-meta";
      const lab = document.createElement("label");
      lab.textContent = campo.label;
      lab.htmlFor = campo.id;
      wrap.appendChild(lab);
      let input;
      if (campo.type === "select") {
        input = document.createElement("select");
        campo.options.forEach((o) => {
          const opt = document.createElement("option");
          opt.value = o.value;
          opt.textContent = o.text;
          input.appendChild(opt);
        });
      } else {
        input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Ej. B1-07";
      }
      input.id = campo.id;
      input.name = campo.id;
      input.required = campo.required;
      wrap.appendChild(input);
      metaBox.appendChild(wrap);
    });
  } else {
    metaBox.hidden = true;
  }

  cfg.items.forEach((item, idx) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "item";
    const legend = document.createElement("legend");
    legend.textContent = item.label;
    fieldset.appendChild(legend);
    item.options.forEach((op) => {
      const id = `${item.id}_${op.v}`;
      const label = document.createElement("label");
      label.className = "opcion";
      label.htmlFor = id;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = item.id;
      input.id = id;
      input.value = op.v;
      input.required = true;
      label.appendChild(input);
      const span = document.createElement("span");
      span.textContent = `${op.v}) ${op.t}`;
      label.appendChild(span);
      fieldset.appendChild(label);
    });
    form.insertBefore(fieldset, form.querySelector(".acciones"));
  });

  const prev = window.STEM_ALMACEN.loadAll();
  if (prev && hojaNum > 1) {
    Object.entries(prev.respuestas || {}).forEach(([name, val]) => {
      const el = form.querySelector(`input[name="${name}"][value="${val}"]`);
      if (el) el.checked = true;
    });
  }

  showSession();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const respuestas = {};
    cfg.items.forEach((it) => {
      respuestas[it.id] = fd.get(it.id);
    });
    const payload = { respuestas };
    if (hojaNum === 1) {
      payload.id_anonimo = String(fd.get("id_anonimo") || "").trim();
      payload.brigada = String(fd.get("brigada") || "");
      if (!payload.id_anonimo || !payload.brigada) {
        alert("Escribe tu ID anónimo y elige brigada.");
        return;
      }
    } else if (!window.STEM_ALMACEN.sessionId()) {
      alert("Primero completa la Hoja 1 en esta computadora (ID anónimo).");
      return;
    }
    const record = window.STEM_ALMACEN.saveHoja(hojaNum, payload);
    const msg = document.getElementById("mensaje-ok");
    msg.hidden = false;
    if (hojaNum === 5) {
      msg.innerHTML =
        "<strong>¡Listo!</strong> Descarga tu archivo de respuestas y entrégalo a la facilitadora (o guárdalo en la carpeta indicada).";
      window.STEM_ALMACEN.downloadCsv(record);
    } else {
      msg.textContent = "Respuestas guardadas en esta computadora. Cierra esta página y espera la siguiente hoja.";
    }
    form.querySelector('button[type="submit"]').disabled = true;
  });
})();
