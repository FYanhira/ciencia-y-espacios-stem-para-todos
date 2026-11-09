(function () {
  const PREFIX = "stem_sat_2026_";

  const KEYS = [
    "id_anonimo",
    "brigada",
    "in1",
    "in2",
    "se2",
    "se4",
    "se5",
    "sat_con",
    "sat_sim",
    "sat_pap",
    "sat_seg",
    "sat_grat",
    "en1",
    "en4",
    "abierta",
  ];

  const CSV_HEADER = KEYS.concat(["exportado_en"]).join(",");

  function esc(s) {
    const t = String(s ?? "");
    if (/[",\n]/.test(t)) return `"${t.replace(/"/g, '""')}"`;
    return t;
  }

  function save(record) {
    const id = (record.id_anonimo || "").trim().toUpperCase();
    if (!id) throw new Error("Falta ID anónimo");
    record.id_anonimo = id;
    record.exportado_en = new Date().toISOString();
    localStorage.setItem(PREFIX + id, JSON.stringify(record));
    return record;
  }

  function toCsvRow(record) {
    return KEYS.map((k) => esc(record[k])).concat(esc(record.exportado_en)).join(",");
  }

  function downloadCsv(record) {
    const csv = CSV_HEADER + "\n" + toCsvRow(record);
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `STEM2026_SAT_${record.id_anonimo}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function loadAllRecords() {
    const records = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith(PREFIX)) continue;
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

  function downloadAllFromThisPc() {
    const records = loadAllRecords();
    if (!records.length) return 0;
    const lines = [CSV_HEADER, ...records.map((r) => toCsvRow(r))];
    const blob = new Blob(["\ufeff" + lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `STEM2026_SAT_consolidado_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    return records.length;
  }

  window.STEM_ALMACEN_SAT = {
    KEYS,
    CSV_HEADER,
    save,
    downloadCsv,
    loadAllRecords,
    downloadAllFromThisPc,
  };
})();
