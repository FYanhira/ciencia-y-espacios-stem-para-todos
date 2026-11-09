const recs = window.STEM_ALMACEN_SAT.loadAllRecords();
const ul = document.getElementById("lista");
if (!recs.length) {
  ul.innerHTML = "<li>Ninguna encuesta en el almacenamiento de esta PC.</li>";
} else {
  recs.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = r.id_anonimo + " (brigada " + r.brigada + ") - " + (r.exportado_en || "");
    ul.appendChild(li);
  });
}
document.getElementById("btn-all").onclick = function () {
  const n = window.STEM_ALMACEN_SAT.downloadAllFromThisPc();
  document.getElementById("status").textContent = n
    ? "Descargadas " + n + " respuestas."
    : "No hay respuestas en esta PC.";
};
