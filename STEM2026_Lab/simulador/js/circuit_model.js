/** Modelo cualitativo — port de simulador/circuit_model.py */
(function (global) {
  const CircuitKind = { SIMPLE: "simple", SERIES: "series", PARALLEL: "parallel" };
  const ALLOWED_RESISTORS = [100, 220, 470, 1000];

  class LedState {
  constructor() {
    this.polarity_ok = true;
  }
  brightness(branchOn, voltageOk) {
    if (!branchOn || !this.polarity_ok) return 0;
    if (!voltageOk) return 0.15;
    return 1;
  }
}

  class PaperCircuit {
  constructor() {
    this.kind = CircuitKind.SIMPLE;
    this.switch_closed = false;
    this.battery_count = 1;
    this.battery_polarity_ok = true;
    this.resistors_installed = true;
    this.resistor_ohm = 220;
    this.V_CELL = 3.0;
    this.V_LED_NOM = 2.0;
    this.R_REFERENCE_OHM = 220;
    this.leds = [new LedState()];
  }

  ledCount() {
    return this.kind === CircuitKind.SIMPLE ? 1 : 2;
  }

  resetForKind(kind) {
    this.kind = kind;
    this.switch_closed = false;
    this.battery_count = kind === CircuitKind.SERIES ? 2 : 1;
    this.battery_polarity_ok = true;
    this.resistors_installed = true;
    this.resistor_ohm = 220;
    this.leds = Array.from({ length: this.ledCount() }, () => new LedState());
  }

  resistorBrightnessFactor() {
    const r = Math.max(1, this.resistor_ohm);
    const ref = this.R_REFERENCE_OHM;
    return Math.max(0.35, Math.min(1.08, (ref / r) ** 0.55));
  }

  get supplyVoltage() {
    if (!this.battery_polarity_ok) return 0;
    return this.V_CELL * Math.max(1, this.battery_count);
  }

  rawBrightnesses() {
    if (!this.switch_closed) return this.leds.map(() => 0);
    const v = this.supplyVoltage;
    const n = this.leds.length;

    if (this.kind === CircuitKind.SIMPLE) {
      return [this.leds[0].brightness(true, v >= this.V_LED_NOM * 0.85)];
    }
    if (this.kind === CircuitKind.SERIES) {
      if (!this.leds.every((led) => led.polarity_ok)) return this.leds.map(() => 0);
      const need = this.V_LED_NOM * n;
      if (v >= need * 0.9) return [1, 1];
      if (v >= this.V_LED_NOM * 1.05) return [0.35, 0.35];
      return [0, 0];
    }
    return this.leds.map((led) => led.brightness(true, v >= this.V_LED_NOM * 0.85));
  }

  ledBrightnesses() {
    const raw = this.rawBrightnesses();
    if (!this.switch_closed) return raw;

    if (this.resistors_installed) {
      const factor = this.resistorBrightnessFactor();
      return raw.map((b) => (b > 0 ? Math.round(b * factor * 1000) / 1000 : 0));
    }
    const v = this.supplyVoltage;
    return raw.map((b) => {
      if (b <= 0) return 0;
      if (this.kind === CircuitKind.SERIES) return Math.min(1, b * 1.05);
      if (v >= 5) return 1;
      return Math.min(1, b * 1.22);
    });
  }

  ledOvercurrent(index) {
    if (!this.switch_closed) return false;
    if (this.resistors_installed) {
      if (this.resistor_ohm <= 100 && this.supplyVoltage >= 5) {
        const br = this.ledBrightnesses();
        return index < br.length && br[index] >= 0.55;
      }
      return false;
    }
    const br = this.ledBrightnesses();
    if (index >= br.length || br[index] < 0.4) return false;
    const v = this.supplyVoltage;
    if (this.kind === CircuitKind.SERIES && v <= 4) return br[index] >= 0.9;
    return (
      v >= 4.5 ||
      ((this.kind === CircuitKind.SIMPLE || this.kind === CircuitKind.PARALLEL) && br[index] >= 0.85)
    );
  }

  explainEn() {
    if (!this.switch_closed) {
      return "OPEN circuit: the fold does not complete the path to the battery. No current flows.";
    }
    if (!this.battery_polarity_ok) {
      return "Battery REVERSED: + does not match the template. The LED would not light correctly on the card.";
    }
    if (!this.resistors_installed) {
      const risk = this.leds.some((_, i) => this.ledOvercurrent(i));
      if (risk) {
        return `NO series resistor: too much current. Add ~${this.R_REFERENCE_OHM} Ω in series with each LED.`;
      }
      return "Without a resistor the LED may light, but current is not limited. Use a series resistor in practice.";
    }
    const r = this.resistor_ohm;
    let rNote;
    if (r >= 470) rNote = "High R limits current: the LED may look dimmer but is protected.";
    else if (r <= 100) rNote = "Low R allows more current: brighter LED; watch heating.";
    else rNote = "Typical value balancing brightness and LED protection.";
    const base = `${r} Ω in series limits current. ${rNote}`;
    const br = this.ledBrightnesses();
    if (this.kind === CircuitKind.SIMPLE) {
      if (!this.leds[0].polarity_ok) {
        return "LED polarity WRONG: long leg (+) must face the positive side of the circuit.";
      }
      if (br[0] >= 0.7) return base + " The LED is adequately bright.";
      if (br[0] > 0) return "Low voltage: very dim (check batteries or open path).";
      return "Off: check polarity or battery.";
    }
    if (this.kind === CircuitKind.SERIES) {
      if (!this.leds.every((led) => led.polarity_ok)) {
        const bad = this.leds.map((led, i) => (!led.polarity_ok ? i + 1 : null)).filter(Boolean);
        return `LED(s) ${bad.join(", ")} reversed: check long leg (+) on the template.`;
      }
      if (br.every((b) => b >= 0.7)) {
        return base + ` Two cells (~${this.supplyVoltage.toFixed(0)} V) feed two series LEDs.`;
      }
      if (br.some((b) => b > 0)) {
        return "One cell (~3 V) may be insufficient for two series LEDs. Template suggests 2 cells. " + base;
      }
      return "Series: check polarity, cells, and resistors.";
    }
    const msgs = [base];
    this.leds.forEach((led, i) => {
      const b = br[i];
      if (!led.polarity_ok) msgs.push(`LED ${i + 1} reversed.`);
      else if (b >= 0.7) msgs.push(`LED ${i + 1} on in its branch.`);
      else msgs.push(`LED ${i + 1} off or dim.`);
    });
    return msgs.join(" ");
  }

  explain() {
    if (
      typeof document !== "undefined" &&
      (document.documentElement.lang || "").toLowerCase().startsWith("en")
    ) {
      return this.explainEn();
    }
    if (!this.switch_closed) {
      return "Circuito ABIERTO: el contacto del doblez (+) no cierra con la pila. No circula corriente.";
    }
    if (!this.battery_polarity_ok) {
      return "Pila INVERTIDA: el signo + no queda donde la plantilla lo necesita. En la tarjeta real el LED no encendería bien.";
    }
    if (!this.resistors_installed) {
      const risk = this.leds.some((_, i) => this.ledOvercurrent(i));
      if (risk) {
        return `SIN resistencia en serie: circula demasiada corriente (I alta). Coloca una resistencia (p. ej. ~${this.R_REFERENCE_OHM} Ω) en serie con cada LED.`;
      }
      return "Sin resistencia: el LED puede encender, pero la corriente no está limitada. En práctica conviene una resistencia en serie.";
    }
    const r = this.resistor_ohm;
    let rNote;
    if (r >= 470) rNote = "Con R alta, la corriente es pequeña: el LED puede verse más tenue pero protegido.";
    else if (r <= 100) rNote = "Con R baja, pasa más corriente: el LED brilla más; vigila sobrecalentamiento.";
    else rNote = "Valor típico para equilibrar brillo y protección del LED.";
    const base = `Resistencia ${r} Ω en serie: limita la corriente I. ${rNote}`;
    const br = this.ledBrightnesses();

    if (this.kind === CircuitKind.SIMPLE) {
      if (!this.leds[0].polarity_ok) {
        return "LED con polaridad INCORRECTA: la pata larga (+) debe ir hacia el polo positivo del circuito.";
      }
      if (br[0] >= 0.7) return base + " El LED enciende con brillo adecuado.";
      if (br[0] > 0) return "Poca tensión: brillo muy bajo (revisa pilas o circuito abierto).";
      return "No enciende: revisa polaridad o batería.";
    }
    if (this.kind === CircuitKind.SERIES) {
      if (!this.leds.every((led) => led.polarity_ok)) {
        const bad = this.leds.map((led, i) => (!led.polarity_ok ? i + 1 : null)).filter(Boolean);
        return `LED(s) ${bad.join(", ")} invertido(s): revisa la pata larga (+) según la plantilla.`;
      }
      if (br.every((b) => b >= 0.7)) return base + ` Dos pilas (~${this.supplyVoltage.toFixed(0)} V) alimentan dos LEDs en serie.`;
      if (br.some((b) => b > 0)) {
        return "Con una pila (~3 V) suele faltar tensión para dos LEDs en serie. La plantilla sugiere 2 pilas. " + base;
      }
      return "Serie: revisa polaridad, pilas y resistencias.";
    }
    const msgs = [base];
    this.leds.forEach((led, i) => {
      const b = br[i];
      if (!led.polarity_ok) msgs.push(`LED ${i + 1} invertido.`);
      else if (b >= 0.7) msgs.push(`LED ${i + 1} enciende en su rama.`);
      else msgs.push(`LED ${i + 1} apagado o tenue.`);
    });
    return msgs.join(" ");
  }
  }

  global.CircuitKind = CircuitKind;
  global.ALLOWED_RESISTORS = ALLOWED_RESISTORS;
  global.LedState = LedState;
  global.PaperCircuit = PaperCircuit;
})(window);
