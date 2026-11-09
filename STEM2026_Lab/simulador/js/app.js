(function () {
  const en = (document.documentElement.lang || "").toLowerCase().startsWith("en");
  const L = (es, enTxt) => (en ? enTxt : es);

  const circuit = new PaperCircuit();
  const canvas = document.getElementById("lienzo");
  const errBox = document.getElementById("js-error");
  if (!canvas) return;

  let ctx;
  try {
    ctx = canvas.getContext("2d");
  } catch (e) {
    if (errBox) errBox.textContent = "No se pudo iniciar el lienzo: " + e.message;
    return;
  }

  const el = {
    kind: document.querySelectorAll('input[name="kind"]'),
    switchClosed: document.getElementById("switch-closed"),
    flipBattery: document.getElementById("flip-battery"),
    batteryHint: document.getElementById("battery-hint"),
    resistorOn: document.getElementById("resistor-on"),
    resistorOhm: document.querySelectorAll('input[name="resistor-ohm"]'),
    resistorHint: document.getElementById("resistor-hint"),
    batteryCount: document.querySelectorAll('input[name="battery-count"]'),
    ledButtons: document.getElementById("led-buttons"),
    pred: document.querySelectorAll('input[name="pred"]'),
    predBtn: document.getElementById("pred-check"),
    predResult: document.getElementById("pred-result"),
    interpretacion: document.getElementById("interpretacion"),
    reset: document.getElementById("reset"),
  };

  function resizeCanvas() {
    const wrap = canvas.parentElement;
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(520, Math.floor(rect.width || wrap.clientWidth || 720));
    const h = 680;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.dataset.logicalW = String(w);
    canvas.dataset.logicalH = String(h);
    refresh();
  }

  function getKind() {
    const checked = [...el.kind].find((r) => r.checked);
    return checked ? checked.value : CircuitKind.SIMPLE;
  }

  function rebuildLedButtons() {
    el.ledButtons.innerHTML = "";
    circuit.leds.forEach((led, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = L(`Invertir LED ${i + 1}`, `Flip LED ${i + 1}`);
      btn.addEventListener("click", () => {
        led.polarity_ok = !led.polarity_ok;
        refresh();
      });
      el.ledButtons.appendChild(btn);
    });
  }

  function refresh() {
    circuit.switch_closed = el.switchClosed.checked;
    circuit.resistors_installed = el.resistorOn.checked;
    const ohm = [...el.resistorOhm].find((r) => r.checked);
    circuit.resistor_ohm = ohm ? parseInt(ohm.value, 10) : 220;
    const bc = [...el.batteryCount].find((r) => r.checked);
    circuit.battery_count = bc ? parseInt(bc.value, 10) : 1;

    const w = Number(canvas.dataset.logicalW) || canvas.width;
    const h = Number(canvas.dataset.logicalH) || canvas.height;
    dibujarCircuito(ctx, circuit, w, h);
    el.interpretacion.textContent = circuit.explain();

    const v = circuit.supplyVoltage;
    if (circuit.battery_polarity_ok) {
      const stack = circuit.battery_count === 1
        ? L("1 pila (~3 V)", "1 coin cell (~3 V)")
        : L("2 pilas apiladas (~6 V)", "2 stacked coin cells (~6 V)");
      el.batteryHint.textContent = L(
        `${stack}. Tensión total ~${v.toFixed(0)} V.`,
        `${stack}. Supply ~${v.toFixed(0)} V.`
      );
      el.batteryHint.className = "hint ok";
    } else {
      el.batteryHint.textContent = L(
        "Pila invertida: revisa + y − en el dibujo.",
        "Battery flipped: check + and − in the diagram."
      );
      el.batteryHint.className = "hint err";
    }
    if (circuit.resistors_installed) {
      el.resistorHint.textContent = L(
        `R = ${circuit.resistor_ohm} Ω: a mayor R, menos corriente y suele bajar el brillo.`,
        `R = ${circuit.resistor_ohm} Ω: higher R lowers current and usually dims the LED.`
      );
      el.resistorHint.className = "hint ok";
    } else {
      el.resistorHint.textContent = L(
        "Sin R: comparación didáctica — posible EXCESO DE I.",
        "No R: teaching contrast — possible excess current."
      );
      el.resistorHint.className = "hint err";
    }
    if (errBox) errBox.hidden = true;
  }

  function onKindChange() {
    circuit.resetForKind(getKind());
    el.switchClosed.checked = false;
    el.resistorOn.checked = true;
    const r220 = document.querySelector('input[name="resistor-ohm"][value="220"]');
    if (r220) r220.checked = true;
    const bcEl = document.querySelector(`input[name="battery-count"][value="${circuit.battery_count}"]`);
    if (bcEl) bcEl.checked = true;
    el.predResult.textContent = "";
    [...el.pred].forEach((p) => (p.checked = false));
    rebuildLedButtons();
    refresh();
  }

  el.kind.forEach((r) => r.addEventListener("change", onKindChange));
  el.switchClosed.addEventListener("change", refresh);
  el.flipBattery.addEventListener("click", () => {
    circuit.battery_polarity_ok = !circuit.battery_polarity_ok;
    refresh();
  });
  el.resistorOn.addEventListener("change", refresh);
  el.resistorOhm.forEach((r) => r.addEventListener("change", refresh));
  el.batteryCount.forEach((r) => r.addEventListener("change", refresh));
  el.reset.addEventListener("click", onKindChange);

  el.predBtn.addEventListener("click", () => {
    const pred = [...el.pred].find((p) => p.checked)?.value;
    if (!pred) {
      el.predResult.textContent = L("Elige una predicción primero.", "Choose a prediction first.");
      return;
    }
    const br = circuit.ledBrightnesses();
    const anyOn = br.some((b) => b > 0.2);
    if (pred === "unsure") {
      el.predResult.textContent = L(
        "Válido en exploración. Cierra el doblez y comprueba.",
        "Valid while exploring. Close the fold and check."
      );
    } else if (pred === "on" && anyOn) {
      el.predResult.textContent = L("Coincide: hay encendido en el modelo.", "Match: the model shows light on.");
    } else if (pred === "off" && !anyOn) {
      el.predResult.textContent = L("Coincide: no hay encendido en el modelo.", "Match: no light in the model.");
    } else if (pred === "on" && !anyOn) {
      el.predResult.textContent = L(
        "Aún no enciende. Revisa doblez, polaridad o pilas.",
        "Not lit yet. Check fold, polarity, or batteries."
      );
    } else {
      el.predResult.textContent = L(
        "Predijiste apagado pero hay luz. ¿Qué cambió?",
        "You predicted off but there is light. What changed?"
      );
    }
  });

  window.addEventListener("resize", resizeCanvas);
  rebuildLedButtons();
  resizeCanvas();
})();
