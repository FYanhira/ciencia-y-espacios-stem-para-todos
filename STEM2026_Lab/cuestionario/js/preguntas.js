/* Ítems alineados con docs/Prueba_Conocimiento_Circuitos.md (2026) */
window.STEM_PREGUNTAS = {
  meta: {
    titulo: "Prueba de conocimiento — Circuitos en papel",
    subtitulo: "STEM Mujeres 2026 · UANL (lab)",
  },
  hojas: [
    {
      num: 1,
      etapa: "Pre-test",
      instruccion:
        "No avances por tu cuenta. Responde una opción por pregunta. Esta prueba no afecta tu calificación escolar.",
      tiempo: "5 min",
      camposMeta: [
        { id: "id_anonimo", label: "ID anónimo (ej. B1-07)", type: "text", required: true },
        {
          id: "brigada",
          label: "Brigada",
          type: "select",
          required: true,
          options: [
            { value: "", text: "Elige…" },
            { value: "1", text: "1" },
            { value: "2", text: "2" },
          ],
        },
      ],
      items: [
        {
          id: "k1",
          label:
            "K1. Para que un LED encienda en el modelo que usaremos hoy, el circuito debe estar:",
          options: [
            { v: "A", t: "Abierto" },
            { v: "B", t: "Cerrado" },
            { v: "C", t: "Polarizado hacia el LED" },
            { v: "D", t: "Sin batería en la tarjeta" },
          ],
        },
        {
          id: "k2",
          label:
            "K2. Un LED no enciende. La batería funciona y hay cinta conductora formando un camino. Lo más probable es que:",
          options: [
            { v: "A", t: "Falte una segunda pila en la tarjeta" },
            { v: "B", t: "El LED esté colocado al revés" },
            { v: "C", t: "La resistencia sea demasiado pequeña" },
            { v: "D", t: "La cinta no esté pegada al borde del papel" },
          ],
        },
        {
          id: "k3",
          label:
            "K3. Un circuito con batería y LED enciende con normalidad. Se corta la cinta en un punto del camino (queda un hueco). ¿Qué ocurre?",
          options: [
            { v: "A", t: "El LED brilla más" },
            { v: "B", t: "Sigue igual de encendido" },
            { v: "C", t: "Deja de encender" },
            { v: "D", t: "La pila se recarga en ese punto" },
          ],
        },
        {
          id: "k4",
          label:
            "K4. Observa el esquema (circuito con un hueco abierto): (+ Batería -) → LED → (GAP) → vuelta a batería. ¿Con el GAP, el LED encenderá?",
          options: [
            { v: "A", t: "Sí" },
            { v: "B", t: "No" },
          ],
        },
        {
          id: "k5",
          label: "K5. En el modelo simple del taller, la batería principalmente:",
          options: [
            { v: "A", t: "Guarda energía química para alimentar el circuito" },
            { v: "B", t: "Hace circular la corriente cuando hay camino completo" },
            { v: "C", t: "Baja el voltaje del LED a cero" },
            { v: "D", t: "Produce luz sin necesidad del LED" },
          ],
        },
        {
          id: "k6",
          label:
            "K6. Hay un circuito cerrado y el LED está bien orientado. Solo volteas la pila; el LED no se mueve. Lo más esperable es:",
          options: [
            { v: "A", t: "Sigue encendiendo igual" },
            { v: "B", t: "Brilla el doble de fuerte" },
            { v: "C", t: "Deja de encender" },
            { v: "D", t: "Cambia de color sin apagarse" },
          ],
        },
        {
          id: "k7",
          label:
            "K7. Dos LEDs en serie con la misma pila pequeña, comparado con un solo LED:",
          options: [
            { v: "A", t: "Los dos brillan siempre mucho más que uno" },
            { v: "B", t: "Siempre enciende solo uno de los dos" },
            { v: "C", t: "Pueden brillar menos o no encender si la pila no alcanza" },
            { v: "D", t: "El segundo LED bloquea por completo al primero" },
          ],
        },
        {
          id: "k8",
          label: "K8. Tu circuito en papel no enciende. ¿Qué revisarías primero?",
          options: [
            { v: "A", t: "Si la cinta tiene burbujas o dobleces" },
            { v: "B", t: "Si el camino está completo y cómo va puesto el LED" },
            { v: "C", t: "Si el marcador usado es permanente o borrable" },
            { v: "D", t: "Si la tarjeta es más grande que la plantilla" },
          ],
        },
      ],
    },
    {
      num: 2,
      etapa: "Checkpoint C1",
      instruccion: "Después de la explicación conceptual (Fase 1). Solo esta hoja.",
      tiempo: "2–3 min",
      items: [
        {
          id: "c1_1",
          label: "C1-1. En nuestro modelo, la corriente puede circular solo si:",
          options: [
            { v: "A", t: "Hay dos o más LEDs en la misma tarjeta" },
            { v: "B", t: "Hay un camino de vuelta entre los polos de la pila" },
            { v: "C", t: "La cinta cubre todo el contorno del papel" },
            { v: "D", t: "La pila está apoyada sobre otra pila" },
          ],
        },
        {
          id: "c1_2",
          label:
            "C1-2. La pata larga del LED suele conectarse al terminal positivo de la batería porque:",
          options: [
            { v: "A", t: "Así el LED brilla aunque el circuito esté abierto" },
            { v: "B", t: "Es el sentido en que el LED suele dejar pasar la corriente" },
            { v: "C", t: "Evita que la pila se descargue en un día" },
            { v: "D", t: "Hace que ambas patas del LED sean iguales" },
          ],
        },
        {
          id: "c1_3",
          label:
            "C1-3. Un circuito cerrado funciona bien. Al desconectar un tramo de cinta (queda abierto). Predices que el LED:",
          options: [
            { v: "A", t: "Brillará más" },
            { v: "B", t: "Parpadeará más rápido" },
            { v: "C", t: "Se apagará" },
            { v: "D", t: "Seguirá encendido pero más tenue" },
          ],
        },
      ],
    },
    {
      num: 3,
      etapa: "Checkpoint C2",
      instruccion: "Después de la actividad visual / simulador (Fase 2). Solo esta hoja.",
      tiempo: "2–3 min",
      items: [
        {
          id: "c2_1",
          label:
            "C2-1. En el esquema, el circuito está cerrado (sin huecos): batería → LED → cinta → vuelta. ¿El LED encenderá?",
          options: [
            { v: "A", t: "Sí" },
            { v: "B", t: "No" },
          ],
        },
        {
          id: "c2_2",
          label:
            "C2-2. En la simulación viste un circuito cerrado con un LED. Si añades un corte en un solo punto del conductor, lo más probable es:",
          options: [
            { v: "A", t: "Pasa la misma corriente que antes" },
            { v: "B", t: "Deja de haber corriente en el circuito" },
            { v: "C", t: "La pila almacena la corriente sobrante" },
            { v: "D", t: "El LED recibe más voltaje en los extremos" },
          ],
        },
        {
          id: "c2_3",
          label:
            "C2-3. El LED parece invertido respecto a la batería (pata larga hacia −), pero el circuito está cerrado. Lo más probable es:",
          options: [
            { v: "A", t: "Enciende igual que si estuviera bien puesto" },
            { v: "B", t: "Permanece apagado" },
            { v: "C", t: "Destella y luego se daña" },
            { v: "D", t: "Brilla más que con la orientación correcta" },
          ],
        },
      ],
    },
    {
      num: 4,
      etapa: "Checkpoint C3",
      instruccion: "Después de armar circuitos en papel (Fase 3). Solo esta hoja.",
      tiempo: "2–3 min",
      items: [
        {
          id: "c3_1",
          label:
            "C3-1. Armaste un circuito en papel. La batería calienta levemente y el LED enciende. En el modelo del taller, la batería está:",
          options: [
            { v: "A", t: "Midiendo cuánto papel queda libre en la tarjeta" },
            { v: "B", t: "Suministrando energía al circuito" },
            { v: "C", t: "Almacenando carga para usar otro día" },
            { v: "D", t: "Enviando señales de radio al LED" },
          ],
        },
        {
          id: "c3_2",
          label:
            "C3-2. Dos LEDs en serie con una pila del taller. Comparado con un solo LED, es más probable que:",
          options: [
            { v: "A", t: "Brillen más que nunca" },
            { v: "B", t: "Uno encienda y el otro actúe como batería" },
            { v: "C", t: "Brillen menos o no enciendan si la pila no alcanza" },
            { v: "D", t: "Cada LED necesita su propia pila obligatoriamente" },
          ],
        },
        {
          id: "c3_3",
          label:
            "C3-3. Tu LED no enciende. Ya revisaste que la batería tiene carga. El siguiente paso más lógico es:",
          options: [
            { v: "A", t: "Cambiar el tipo de marcador del contorno" },
            { v: "B", t: "Revisar el trazo completo y cómo va colocado el LED" },
            { v: "C", t: "Quitar toda la cinta conductora" },
            { v: "D", t: "Esperar unos minutos sin tocar nada" },
          ],
        },
      ],
    },
    {
      num: 5,
      etapa: "Post-test",
      instruccion: "Al terminar todas las fases del taller. Solo esta hoja.",
      tiempo: "5 min",
      items: [
        {
          id: "p1",
          label:
            "P1. En el modelo usado hoy, una condición necesaria para que circule corriente es:",
          options: [
            { v: "A", t: "Tener dos pilas en paralelo en la tarjeta" },
            { v: "B", t: "Tener un camino conductor entre los polos de la pila" },
            { v: "C", t: "Usar solo papel de un color oscuro" },
            { v: "D", t: "Dejar siempre un tramo sin cinta" },
          ],
        },
        {
          id: "p2",
          label:
            "P2. En un circuito cerrado el LED no enciende. La batería es nueva. ¿Qué causa es más plausible?",
          options: [
            { v: "A", t: "El aire de la sala es muy seco" },
            { v: "B", t: "El LED está mal orientado en la tarjeta" },
            { v: "C", t: "Cualquier LED enciende en ambos sentidos" },
            { v: "D", t: "La cinta solo conduce con luz solar directa" },
          ],
        },
        {
          id: "p3",
          label:
            "P3. Un circuito funcionaba bien. Se retira un pedazo de cinta y queda un espacio sin conductor. Predices:",
          options: [
            { v: "A", t: "Más brillo" },
            { v: "B", t: "Sin cambio" },
            { v: "C", t: "El LED se apaga" },
            { v: "D", t: "La pila se recarga por completo" },
          ],
        },
        {
          id: "p4",
          label:
            "P4. Circuito cerrado; LED con pata larga hacia el polo positivo de la batería. ¿El LED encenderá?",
          options: [
            { v: "A", t: "Sí" },
            { v: "B", t: "No" },
          ],
        },
        {
          id: "p5",
          label: "P5. En este taller, el LED convierte parte de la energía eléctrica en:",
          options: [
            { v: "A", t: "Calor únicamente en la pila" },
            { v: "B", t: "Luz visible y algo de calor en el LED" },
            { v: "C", t: "Magnetismo permanente en la cinta" },
            { v: "D", t: "Color fijo en el papel sin corriente" },
          ],
        },
        {
          id: "p6",
          label:
            "P6. Circuito cerrado con LED bien orientado. Volteas la pila sin mover el LED. Lo más esperable es:",
          options: [
            { v: "A", t: "Sigue encendiendo igual" },
            { v: "B", t: "El LED se daña al instante" },
            { v: "C", t: "Deja de encender" },
            { v: "D", t: "Gira como un motor pequeño" },
          ],
        },
        {
          id: "p7",
          label:
            "P7. Dos LEDs en serie con una misma pila pequeña. Respecto a un circuito con un LED:",
          options: [
            { v: "A", t: "Siempre hay más brillo" },
            { v: "B", t: "Es igual en todos los casos" },
            { v: "C", t: "A veces hay menos luz o no encienden por limitación de la pila" },
            { v: "D", t: "La serie impide que pase cualquier corriente" },
          ],
        },
        {
          id: "p8",
          label:
            "P8. Durante el taller armaste un circuito que no funcionaba. La estrategia más efectiva fue o sería:",
          options: [
            { v: "A", t: "Tirar la tarjeta y no intentar de nuevo" },
            { v: "B", t: "Comprobar camino y orientación del LED, luego volver a probar" },
            { v: "C", t: "Ignorar la batería y probar solo la cinta" },
            { v: "D", t: "Conectar ambas patas del LED al mismo polo" },
          ],
        },
      ],
    },
  ],
};
