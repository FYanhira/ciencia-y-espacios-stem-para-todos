(function () {
  const cfg = window.STEM_ENCUESTA_SAT;
  document.getElementById("titulo-doc").textContent = cfg.meta.titulo;
  document.getElementById("subtitulo-doc").textContent = cfg.meta.subtitulo;
  document.getElementById("escala-leyenda").textContent = cfg.meta.escala;
  const box = document.getElementById("items-box");
  let bloqueActual = "";
  cfg.items.forEach((item) => {
    if (item.bloque !== bloqueActual) {
      bloqueActual = item.bloque;
      const h = document.createElement("p");
      h.className = "bloque-titulo";
      h.textContent = bloqueActual;
      box.appendChild(h);
    }
    const fieldset = document.createElement("fieldset");
    fieldset.className = "item";
    const legend = document.createElement("legend");
    legend.textContent = item.label;
    fieldset.appendChild(legend);
    const row = document.createElement("div");
    row.className = "likert-row";
    cfg.likert.forEach((op) => {
      const id = item.id + "_" + op.v;
      const lab = document.createElement("label");
      lab.htmlFor = id;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = item.id;
      input.id = id;
      input.value = op.v;
      input.required = true;
      lab.appendChild(input);
      lab.appendChild(document.createTextNode(op.t));
      row.appendChild(lab);
    });
    fieldset.appendChild(row);
    box.appendChild(fieldset);
  });
  document.getElementById("form-encuesta").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const record = {};
    window.STEM_ALMACEN_SAT.KEYS.forEach((k) => {
      if (k === "exportado_en") return;
      record[k] = fd.get(k) || "";
    });
    try {
      window.STEM_ALMACEN_SAT.save(record);
      window.STEM_ALMACEN_SAT.downloadCsv(record);
      const ok = document.getElementById("mensaje-ok");
      ok.hidden = false;
      ok.innerHTML =
        "Gracias. Se descargó <strong>STEM2026_SAT_" +
        record.id_anonimo +
        ".csv</strong>. Si la facilitadora lo pidió, envíale ese archivo por el medio acordado (correo, Drive, etc.).";
      e.target.querySelector(".acciones").hidden = true;
      window.scrollTo(0, 0);
    } catch (err) {
      alert(err.message || "Error al guardar");
    }
  });
})();
