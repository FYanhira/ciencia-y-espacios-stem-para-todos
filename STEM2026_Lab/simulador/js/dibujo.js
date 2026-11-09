(function (global) {
  const CircuitKind = global.CircuitKind;

  function isEnUI() {
    return (document.documentElement.lang || "").toLowerCase().startsWith("en");
  }
  function L(es, en) {
    return isEnUI() ? en : es;
  }

const COPPER = "#C56A1A";
const COPPER_DIM = "#8B4513";
const STATE_ON = "#1B5E20";
const STATE_OFF = "#B71C1C";
const STATE_DIM = "#E65100";

/** Tamaño de texto legible (alineado al simulador de escritorio). */
function fs(u, base) {
  return Math.max(13, Math.round(base * (0.55 + u * 0.38)));
}

function dibujarCircuito(ctx, circuit, w, h) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#FAFAFA";
  ctx.fillRect(0, 0, w, h);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const u = Math.max(2.05, Math.min(w / 340, h / 290, 3.35));
  const marginX = w * 0.06;
  const footerH = 20;
  const legendBlock = u * 62;
  const y0 = Math.max(h * 0.12, 36 + u * 32);
  const maxY1 = h - footerH - legendBlock - u * 6;
  let boxH = Math.min(h * 0.62, maxY1 - y0);
  boxH = Math.max(boxH, h * 0.48);
  const x0 = marginX;
  const x1 = w - marginX;
  const y1 = y0 + boxH;
  const track = x1 - x0;
  const titleY = y1 + u * 14;
  const legendSep = y1 + u * 28;
  const legendTop = y1 + u * 38;
  const pathW = Math.max(18, u * 11);
  const midY = (y0 + y1) / 2;
  const parallel = circuit.kind === CircuitKind.PARALLEL;
  const ledPos =
    circuit.kind === CircuitKind.SIMPLE
      ? [0.5]
      : circuit.kind === CircuitKind.SERIES
        ? [0.2, 0.8]
        : [0.26, 0.52];

  line(ctx, x0, y1, x1, y1, pathW);
  line(ctx, x0, y0, x0, y1, pathW);
  line(ctx, x1, y0, x1, y1, pathW);
  line(ctx, x0, y0, x1, y0, pathW);
  if (parallel) line(ctx, x0, midY, x1, midY, pathW);

  const bx = x1 - u * 42;
  drawBatteryStack(ctx, circuit, bx, y1, u);

  const px = x1 - u * 10;
  const py = y1 + u * 12;
  const pr = u * 12;
  ctx.beginPath();
  ctx.arc(px, py, pr, 0, Math.PI * 2);
  ctx.strokeStyle = COPPER;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#222";
  ctx.font = `bold ${fs(u, 13)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("+", px, py + 4);

  const br = circuit.ledBrightnesses();
  const resShift = track * 0.1;
  const ledShift = track * 0.1;
  ledPos.forEach((frac, idx) => {
    const anchor = x0 + track * frac;
    const ly = !parallel || idx === 0 ? y0 : midY;
    const branch = !parallel || idx === 0 ? "upper" : "lower";
    const shift = parallel && idx === 1 ? track * 0.06 : ledShift;
    const rShift = parallel && idx === 1 ? track * 0.06 : resShift;
    const rX = anchor - rShift;
    const ledX = anchor + shift;
    drawResistor(ctx, circuit, rX, ly, idx, branch, u);
    line(ctx, rX + u * 20, ly, ledX - u * 16, ly, Math.max(6, u * 4), COPPER_DIM);
    const b = br[idx] ?? 0;
    drawLed(ctx, circuit, ledX, ly, b, idx, branch, u);
  });

  ctx.fillStyle = "#222";
  ctx.font = `bold ${fs(u, 16)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.textAlign = "center";
  const titles = isEnUI()
    ? {
        [CircuitKind.SIMPLE]: "Simple circuit",
        [CircuitKind.SERIES]: "Series circuit",
        [CircuitKind.PARALLEL]: "Parallel circuit",
      }
    : {
        [CircuitKind.SIMPLE]: "Circuito simple",
        [CircuitKind.SERIES]: "Circuito en serie",
        [CircuitKind.PARALLEL]: "Circuito en paralelo",
      };
  ctx.fillText(titles[circuit.kind], w / 2, titleY);

  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.moveTo(marginX, legendSep);
  ctx.lineTo(w - marginX, legendSep);
  ctx.stroke();
  drawBatteryLegend(ctx, circuit, x0 + 8, legendTop, u);
}

function line(ctx, x0, y0, x1, y1, width, color = COPPER) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function drawBatteryStack(ctx, circuit, bx, y1, u) {
  const ok = circuit.battery_polarity_ok;
  const count = Math.max(1, circuit.battery_count);
  const cx = bx + u * 30;
  const r = u * 26;
  const bottomCy = y1 - u * 28;
  if (count === 1) {
    coinCell(ctx, cx, bottomCy, r, ok, u, "only");
  } else {
    const topCy = bottomCy - u * 46;
    coinCell(ctx, cx, bottomCy, r, ok, u, "bottom");
    coinCell(ctx, cx, topCy, r, ok, u, "top");
    ctx.strokeStyle = "#616161";
    ctx.lineWidth = Math.max(2, u * 0.8);
    ctx.setLineDash([u * 2, u * 1.5]);
    ctx.beginPath();
    ctx.moveTo(cx, bottomCy - r * 0.92);
    ctx.lineTo(cx, topCy + r * 0.92);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#1565C0";
    ctx.font = `bold ${fs(u, 9)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(L("2.ª encima", "2nd on top"), cx - u * 34, (bottomCy + topCy) / 2);
  }
}

/** Coin cell (CR2032) con aspecto metálico; face = only | bottom | top */
function coinCell(ctx, cx, cy, r, ok, u, face) {
  const ringColor = ok ? "#2E7D32" : "#C62828";

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx + u * 1.2, cy + u * 2.2, r * 1.05, r * 0.26, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.14)";
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.05, 0, Math.PI * 2);
  const edgeGrad = ctx.createRadialGradient(cx, cy, r * 0.75, cx, cy, r * 1.05);
  edgeGrad.addColorStop(0, "#7A7A7A");
  edgeGrad.addColorStop(1, "#3D3D3D");
  ctx.fillStyle = edgeGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.9, 0, Math.PI * 2);
  const faceGrad = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.32, r * 0.08, cx, cy, r * 0.9);
  faceGrad.addColorStop(0, "#FFFFFF");
  faceGrad.addColorStop(0.35, "#D8D8D8");
  faceGrad.addColorStop(0.75, "#A8A8A8");
  faceGrad.addColorStop(1, "#787878");
  ctx.fillStyle = faceGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.68, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = Math.max(1, u * 0.35);
  ctx.stroke();

  const bumpCy = cy - r * 0.42;
  const bumpR = r * 0.24;
  ctx.beginPath();
  ctx.arc(cx, bumpCy, bumpR, 0, Math.PI * 2);
  const bumpGrad = ctx.createRadialGradient(cx - bumpR * 0.3, bumpCy - bumpR * 0.3, 0, cx, bumpCy, bumpR);
  bumpGrad.addColorStop(0, "#F0F0F0");
  bumpGrad.addColorStop(1, "#757575");
  ctx.fillStyle = bumpGrad;
  ctx.fill();
  ctx.strokeStyle = "#5C5C5C";
  ctx.lineWidth = Math.max(1, u * 0.25);
  ctx.stroke();

  const plusChar = ok ? "+" : "−";
  const minusChar = ok ? "−" : "+";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ok ? "#B71C1C" : "#0D47A1";
  ctx.font = `bold ${fs(u, 10)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillText(plusChar, cx, bumpCy);
  ctx.fillStyle = "#1565C0";
  ctx.font = `bold ${fs(u, 13)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillText(minusChar, cx, cy + r * 0.12);

  ctx.fillStyle = "#555";
  ctx.font = `${fs(u, 7)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillText("CR2032", cx, cy + r * 0.38);

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = Math.max(2.5, u * 1.15);
  ctx.stroke();

  if (face === "bottom" || face === "only") {
    ctx.fillStyle = "#666";
    ctx.font = `${fs(u, 8)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.fillText(L("cara al papel", "face to paper"), cx, cy + r + u * 9);
  }
}

function drawBatteryLegend(ctx, circuit, x, y, u) {
  const ok = circuit.battery_polarity_ok;
  const count = Math.max(1, circuit.battery_count);
  const v = ok ? circuit.supplyVoltage : 0;
  const pol = ok ? L("Polaridad OK", "Polarity OK") : L("PILA INVERTIDA", "BATTERY REVERSED");
  ctx.font = `bold ${fs(u, 12)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.textAlign = "left";
  ctx.fillStyle = "#222";
  ctx.fillText(L("PILAS:", "CELLS:"), x, y);
  ctx.font = `${fs(u, 12)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillStyle = ok ? STATE_ON : STATE_OFF;
  ctx.fillText(
    L(`${count} pila(s)  ~${v.toFixed(0)} V  |  ${pol}`, `${count} cell(s)  ~${v.toFixed(0)} V  |  ${pol}`),
    x + u * 38,
    y
  );
}

function drawResistor(ctx, circuit, x, y, index, branch, u) {
  const labelUp = u * (branch === "upper" ? 22 : 18);
  if (circuit.resistors_installed) {
    const zigW = u * 44;
    const amp = u * 12;
    ctx.strokeStyle = "#6A1B9A";
    ctx.lineWidth = Math.max(4, u * 3);
    ctx.beginPath();
    for (let i = 0; i <= 7; i++) {
      const xi = x - zigW / 2 + (zigW / 7) * i;
      const yi = y + (i % 2 ? amp : -amp);
      if (i === 0) ctx.moveTo(xi, yi);
      else ctx.lineTo(xi, yi);
    }
    ctx.stroke();
    const labelY = branch === "upper" ? y - amp - labelUp : y + amp + labelUp;
    ctx.fillStyle = "#4A148C";
    ctx.font = `bold ${fs(u, 12)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(`R${index + 1}  ${circuit.resistor_ohm} Ω`, x, labelY);
    ctx.font = `${fs(u, 10)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.fillText(
      L("limita I", "limits I"),
      x,
      labelY + (branch === "upper" ? u * 13 : -u * 13)
    );
  } else {
    ctx.strokeStyle = STATE_OFF;
    ctx.setLineDash([6, 4]);
    line(ctx, x - u * 30, y, x + u * 30, y, 4, STATE_OFF);
    ctx.setLineDash([]);
    ctx.fillStyle = STATE_OFF;
    ctx.font = `bold ${fs(u, 13)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.fillText(L(`SIN R${index + 1}`, `NO R${index + 1}`), x, y - labelUp);
  }
}

function drawLed(ctx, circuit, x, y, brightness, index, branch, u) {
  const led = circuit.leds[index];
  const isOn = brightness > 0.2;
  const isDim = isOn && brightness < 0.75;
  const overI = circuit.ledOvercurrent(index);
  const triH = u * 12;
  const bodyHalf = u * 16;

  if (isOn) {
    const scale = Math.max(0.25, brightness);
    const layers = overI
      ? [62 * scale, 48 * scale, 32 * scale]
      : isDim
        ? [22 * scale, 14 * scale]
        : [58 * scale, 44 * scale, 30 * scale];
    const colors = overI ? ["#FFCDD2", "#FF5252", "#FF1744"] : isDim ? ["#FFCC80", "#FF9800"] : ["#FFF9C4", "#FFEE58", "#FFEB3B"];
    layers.forEach((rad, i) => {
      ctx.beginPath();
      ctx.arc(x, y, Math.min(rad, u * 22), 0, Math.PI * 2);
      ctx.fillStyle = colors[Math.min(i, colors.length - 1)];
      ctx.fill();
    });
  }

  const bodyFill = !isOn ? "#3D3D3D" : isDim ? "#FF9800" : "#FFEB3B";
  ctx.fillStyle = bodyFill;
  ctx.strokeStyle = !led.polarity_ok ? STATE_OFF : isOn ? "#F57F17" : "#1A1A1A";
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (led.polarity_ok) {
    ctx.moveTo(x - bodyHalf, y - triH);
    ctx.lineTo(x + bodyHalf, y);
    ctx.lineTo(x - bodyHalf, y + triH);
  } else {
    ctx.moveTo(x + bodyHalf, y - triH);
    ctx.lineTo(x - bodyHalf, y);
    ctx.lineTo(x + bodyHalf, y + triH);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  let stateTxt, stateColor, hint;
  if (!led.polarity_ok) {
    stateTxt = L("APAGADO", "OFF");
    stateColor = STATE_OFF;
    hint = L("Por polaridad del LED", "LED polarity");
  } else if (isOn && overI) {
    stateTxt = L("EXCESO DE I", "EXCESS I");
    stateColor = STATE_OFF;
    hint = circuit.resistors_installed
      ? L("R muy baja o sin R", "R too low or missing")
      : L("Falta resistencia en serie", "Need series resistor");
  } else if (isOn && isDim) {
    stateTxt = L("BRILLO BAJO", "DIM");
    stateColor = STATE_DIM;
    hint = L("(poca tensión)", "(low voltage)");
  } else if (isOn) {
    stateTxt = L("BRILLO OK", "BRIGHT OK");
    stateColor = STATE_ON;
    hint = circuit.resistors_installed
      ? L("(con resistencia)", "(with resistor)")
      : L("(sin limitar I)", "(unlimited I)");
  } else {
    stateTxt = L("APAGADO", "OFF");
    stateColor = STATE_OFF;
    hint = "";
  }

  const tx = x;
  const stackAbove = branch === "upper";
  const nameY = stackAbove ? y - u * 52 : y + u * 26;
  const stateY = stackAbove ? y - u * 38 : y + u * 40;
  const hintY = stackAbove ? y - u * 26 : y + u * 52;
  ctx.textAlign = "center";
  ctx.fillStyle = "#222";
  ctx.font = `bold ${fs(u, 12)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillText(`LED ${index + 1}`, tx, nameY);
  ctx.fillStyle = stateColor;
  ctx.font = `bold ${fs(u, 14)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillText(stateTxt, tx, stateY);
  if (hint) {
    ctx.fillStyle = isDim && isOn ? STATE_DIM : STATE_OFF;
    ctx.font = `bold ${fs(u, 11)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.fillText(hint, tx, hintY);
  }
  const barHalf = u * 28;
  const barY = stackAbove ? y - u * 14 : y + u * (hint ? 64 : 52);
  const barH = Math.max(10, u * 6);
  ctx.fillStyle = "#eee";
  ctx.strokeStyle = "#999";
  ctx.fillRect(tx - barHalf, barY, barHalf * 2, barH);
  ctx.strokeRect(tx - barHalf, barY, barHalf * 2, barH);
  if (brightness > 0.05) {
    ctx.fillStyle = isDim ? "#FF9800" : "#FFEB3B";
    ctx.fillRect(tx - barHalf, barY, barHalf * 2 * brightness, barH);
  }
  ctx.fillStyle = "#222";
  ctx.font = `bold ${fs(u, 11)}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillText(
    `${L("Brillo", "Brightness")} ${Math.round(brightness * 100)} %`,
    tx,
    barY + (stackAbove ? -u * 10 : u * 16)
  );
}

  global.dibujarCircuito = dibujarCircuito;
})(window);
