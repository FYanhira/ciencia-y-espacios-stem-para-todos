# Cuestionario HTML — lab UANL

Prueba de conocimiento **sin Google** (visitantes de preparatoria). Mismos ítems que `docs/Prueba_Conocimiento_Circuitos_Estudiante.pdf`.

## Uso en el lab

1. Copia la carpeta `web/cuestionario/` a las computadoras (USB, red o imagen del lab).
2. Abre **`index.html`** en Chrome o Firefox (doble clic o facilitadora proyecta el enlace).
3. Protocolo igual que en papel: *“Solo abran la Hoja X”*.
4. **Hoja 1:** ID anónimo + brigada + pre-test. Las respuestas se guardan en **esta PC** (`localStorage`).
5. **Hojas 2–4:** checkpoints (misma PC, mismo ID).
6. **Hoja 5:** post-test → se descarga automáticamente `STEM2026_<ID>.csv`.
7. Pedir guardar el CSV en la **carpeta compartida** del lab (o USB de la facilitadora).

## Facilitadora

- **`facilitador.html`**: sube todos los CSV → tabla de puntajes + export consolidado.
- No compartas `js/clave.js` con estudiantes (solo se usa en facilitador).

## Servidor local (opcional, recomendado)

Algunos navegadores restringen `file://`. En **una** PC del lab:

```bash
cd web/cuestionario
python3 -m http.server 8765
```

En cada equipo abrir: `http://127.0.0.1:8765/` (o la IP de la PC servidor si el lab lo permite).

## Respaldo

Imprime o ten a mano el PDF estudiante por si falla una máquina.

## Privacidad

No se pide nombre ni correo; solo ID anónimo acordado con el equipo.
