# Simulador web (HTML) — sin Python

Misma **lógica** que `simulador/circuit_model.py` y controles equivalentes a la GUI Tkinter. Para **lab UANL** sin Python instalado.

## Abrir en el lab

1. Copia la carpeta **`web/simulador/`** (junto con `web/cuestionario/` si quieres).
2. En cada PC: abre **`index.html`** en Chrome o Edge.
3. O en una PC servidor: `cd web/simulador && python3 -m http.server 8766` → `http://127.0.0.1:8766/`

**Enlace tipo “liga”:** puede ser un acceso directo al archivo o a la URL del servidor local. No requiere internet ni cuentas Google.

## Controles

- Plantillas simple / serie / paralelo  
- Doblez cerrado, invertir pila y LEDs  
- Resistencia 100–1000 Ω, 1 o 2 pilas  
- Predicción + interpretación  

## Nota

El dibujo es una versión web simplificada del simulador de escritorio; el **comportamiento eléctrico cualitativo** está alineado con el modelo Python.
