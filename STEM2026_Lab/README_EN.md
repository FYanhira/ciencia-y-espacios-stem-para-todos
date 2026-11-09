# STEM2026_Lab — portable workshop kit

Open-source portable kit for the **Mujeres en la Ciencia 2026** multimodal outreach workshop on paper circuits and qualitative circuit simulation (Universidad Autónoma de Nuevo León, Mexico).

## Contents

- **Questionnaire:** embedded pre-test, phase checkpoints (C1–C3), and post-test; CSV export per anonymous participant ID.
- **Simulator:** qualitative DC models (simple, series, parallel) with optional series resistors (Spanish UI as delivered in the workshop).
- **Experience survey:** post-workshop Likert items (same anonymous ID).

## Quick start

1. Copy the entire `STEM2026_Lab` folder to each lab PC (or USB).
2. **Windows:** double-click `iniciar_lab.bat`  
   **Mac:** double-click `ABRIR_LAB.command` or run `./iniciar_lab.sh`
3. Open Chrome at `http://127.0.0.1:8765/`
4. Follow menu: knowledge sheets ? simulator ? (after the session) experience survey.

No Python install required (bundled local server binaries in `servidor/`).

## Workshop sequence

1. Pre-test (Sheet 1)  
2. Conceptual briefing  
3. Checkpoint C1 (Sheet 2)  
4. Web simulator (simple, series, parallel)  
5. Checkpoint C2 (Sheet 3)  
6. Paper circuits (series and parallel builds)  
7. Checkpoint C3 (Sheet 4)  
8. Post-test (Sheet 5)  
9. Post-workshop Likert survey (after the session)

## Facilitator materials

Answer keys for scoring exports live in `cuestionario/js/clave.js` (facilitator use only). Participant-facing pages do not embed correct answers.

## Version

Stable snapshot for citation and replication: **tag `v1.0-mujeres-2026`**  
https://github.com/FYanhira/ciencia-y-espacios-stem-para-todos/tree/v1.0-mujeres-2026/STEM2026_Lab

## Citation

If you use this kit in research or outreach reporting, please cite the associated publication and link to this repository (prefer the tagged release above).

## License

Materials are shared for educational replication. See repository root for license terms.
