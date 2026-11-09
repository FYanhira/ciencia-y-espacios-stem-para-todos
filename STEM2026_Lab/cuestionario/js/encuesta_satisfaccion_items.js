/* Encuesta de satisfacción / percepción - post-taller (Likert 1-5)
   Mismo ID anónimo que la prueba (ej. B1-07) para vincular datos. */
window.STEM_ENCUESTA_SAT = {
  meta: {
    titulo: "Encuesta de experiencia del taller",
    subtitulo: "STEM Mujeres 2026 - Circuitos en papel (después del taller)",
    escala:
      "1 = Totalmente en desacuerdo | 2 | 3 | 4 | 5 = Totalmente de acuerdo",
  },
  items: [
    {
      id: "in1",
      bloque: "Interés",
      label:
        "IN1. Esta actividad despertó mi curiosidad por aprender más sobre electricidad.",
    },
    {
      id: "in2",
      bloque: "Interés",
      label:
        "IN2. Me gustaría participar en otro taller parecido de ciencia o tecnología.",
    },
    {
      id: "se2",
      bloque: "Confianza (autoeficacia)",
      label:
        "SE2. Puedo conectar una batería y un LED respetando la polaridad.",
    },
    {
      id: "se4",
      bloque: "Confianza (autoeficacia)",
      label:
        "SE4. Puedo corregir un circuito en papel que no enciende el LED.",
    },
    {
      id: "se5",
      bloque: "Confianza (autoeficacia)",
      label:
        "SE5. Puedo explicar con mis palabras qué hace la batería en el circuito.",
    },
    {
      id: "sat_con",
      bloque: "Experiencia del taller",
      label:
        "SAT1. La explicación inicial me dio claridad antes de practicar.",
    },
    {
      id: "sat_sim",
      bloque: "Experiencia del taller",
      label:
        "SAT2. El simulador me ayudó a predecir qué ocurriría en el circuito.",
    },
    {
      id: "sat_pap",
      bloque: "Experiencia del taller",
      label:
        "SAT3. Armar el circuito en papel aumentó mi confianza para hacerlo.",
    },
    {
      id: "sat_seg",
      bloque: "Experiencia del taller",
      label: "SAT4. Me sentí cómoda participando en el taller.",
    },
    {
      id: "sat_grat",
      bloque: "Experiencia del taller",
      label:
        "SAT5. En general, estoy satisfecha con la experiencia de este taller.",
    },
    {
      id: "en1",
      bloque: "Participación",
      label:
        "EN1. Durante el taller estuve concentrada en lo que estábamos aprendiendo.",
    },
    {
      id: "en4",
      bloque: "Participación",
      label: "EN4. Durante el taller me sentí satisfecha con lo que logré.",
    },
  ],
  likert: [
    { v: "1", t: "1" },
    { v: "2", t: "2" },
    { v: "3", t: "3" },
    { v: "4", t: "4" },
    { v: "5", t: "5" },
  ],
};
