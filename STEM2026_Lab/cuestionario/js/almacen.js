(function () {
  const PREFIX = "stem_mujeres_2026_";

  function sessionId() {
    return localStorage.getItem(PREFIX + "session_id") || "";
  }

  function setSessionId(id) {
    localStorage.setItem(PREFIX + "session_id", id.trim());
  }

  function loadAll() {
    const id = sessionId();
    if (!id) return null;
    const raw = localStorage.getItem(PREFIX + id);
    if (!raw) return { id_anonimo: id, respuestas: {}, hojas: {} };
    try {
      return JSON.parse(raw);
    } catch {
      return { id_anonimo: id, respuestas: {}, hojas: {} };
    }
  }

  function saveHoja(numHoja, data) {
    const id = (data.id_anonimo || sessionId()).trim();
    if (!id) throw new Error("Falta ID anónimo");
    setSessionId(id);
    const prev = loadAll() || { id_anonimo: id, respuestas: {}, hojas: {}, brigada: "" };
    prev.id_anonimo = id;
    if (data.brigada !== undefined) prev.brigada = data.brigada;
    Object.assign(prev.respuestas, data.respuestas || {});
    prev.hojas[String(numHoja)] = new Date().toISOString();
    localStorage.setItem(PREFIX + id, JSON.stringify(prev));
    return prev;
  }

  function toCsvRow(record) {
    const r = record.respuestas || {};
    const keys = [
      "id_anonimo",
      "brigada",
      "k1",
      "k2",
      "k3",
      "k4",
      "k5",
      "k6",
      "k7",
      "k8",
      "c1_1",
      "c1_2",
      "c1_3",
      "c2_1",
      "c2_2",
      "c2_3",
      "c3_1",
      "c3_2",
      "c3_3",
      "p1",
      "p2",
      "p3",
      "p4",
      "p5",
      "p6",
      "p7",
      "p8",
    ];
    const esc = (s) => {
      const t = String(s ?? "");
      if (/[",\n]/.test(t)) return `"${t.replace(/"/g, '""')}"`;
      return t;
    };
    const row = keys.map((k) => {
      if (k === "id_anonimo") return esc(record.id_anonimo);
      if (k === "brigada") return esc(record.brigada);
      return esc(r[k]);
    });
    row.push(esc(new Date().toISOString()));
    return row.join(",");
  }

  const CSV_HEADER =
    "id_anonimo,brigada,k1,k2,k3,k4,k5,k6,k7,k8,c1_1,c1_2,c1_3,c2_1,c2_2,c2_3,c3_1,c3_2,c3_3,p1,p2,p3,p4,p5,p6,p7,p8,exportado_en";

  function downloadCsv(record) {
    const csv = CSV_HEADER + "\n" + toCsvRow(record);
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `STEM2026_${record.id_anonimo || "sin_id"}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /** Todos los cuestionarios guardados en esta PC (varias IDs / brigadas). */
  function loadAllRecords() {
    const records = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith(PREFIX) || k === PREFIX + "session_id") continue;
      try {
        const rec = JSON.parse(localStorage.getItem(k));
        if (rec && rec.id_anonimo) records.push(rec);
      } catch {
        /* ignore */
      }
    }
    return records.sort((a, b) =>
      String(a.id_anonimo).localeCompare(String(b.id_anonimo), "es")
    );
  }

  function downloadAllCsvFromThisPc() {
    const records = loadAllRecords();
    if (!records.length) return 0;
    const lines = [CSV_HEADER, ...records.map((r) => toCsvRow(r))];
    const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `STEM2026_PC_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    return records.length;
  }

  window.STEM_ALMACEN = {
    sessionId,
    setSessionId,
    loadAll,
    saveHoja,
    downloadCsv,
    loadAllRecords,
    downloadAllCsvFromThisPc,
    CSV_HEADER,
    toCsvRow,
  };
})();
