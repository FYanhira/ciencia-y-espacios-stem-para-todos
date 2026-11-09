# STEM 2026 — Lab (una liga, modo app)

## La liga que compartes

### Opción A — una liga **en cada** PC (la más confiable en labs)

En **cada** computadora (solo necesita Python en cada una, o copiar la carpeta `web`):

- **Mac/Linux:** doble clic o Terminal → `./iniciar_lab.sh`
- **Windows:** doble clic → `iniciar_lab.bat`

En **esa misma** PC abre Chrome:

```
http://127.0.0.1:8765/
```

Cada estudiante usa **su** `127.0.0.1` — no depende de la red entre PCs.

### Opción B — **un** servidor para todas (a veces el lab lo bloquea)

1. En **solo una** PC del lab ejecuta `./iniciar_lab.sh` (Mac) o `iniciar_lab.bat` (Windows).
2. El script imprime IPs tipo `http://192.168.x.x:8765/` — esa liga van en **las demás** PCs.
3. En la PC servidor también funciona `http://127.0.0.1:8765/`.

**Importante:** usar `--bind 0.0.0.0` (ya incluido en los scripts). Sin eso, otras PCs no entran.

### Si la opción B da error

| Mensaje en Chrome | Causa habitual | Qué hacer |
|-------------------|----------------|-----------|
| **No se puede acceder / connection refused** | Servidor apagado, IP mal, o puerto cerrado | Verifica que el script sigue corriendo; repite la IP que imprime el script |
| **Tarda mucho y falla / timed out** | **Firewall** o **red aislada** (muy común en universidad) | Usa **opción A** en cada PC, o pide a TI abrir puerto **8765** en la PC servidor |
| **Página en blanco** | URL sin `/` final o carpeta equivocada | Usa exactamente `http://IP:8765/` |

En muchos labs **no dejan** que una PC vea a otra (aislamiento Wi‑Fi). Ahí **solo funciona la opción A**.

Esa liga abre el menú con **Prueba** y **Simulador**.

## Instalar como app (ventana propia)

Con la liga abierta en **http://127.0.0.1:8765/** (no funciona con doble clic en archivo):

1. Chrome → menú **⋮** → **Instalar Mujeres en la Ciencia 2026…**
2. O botón **Instalar ahora** en la página si aparece.

Queda un icono como aplicación, sin pestañas del navegador.

## Atajo en el escritorio del lab

Crea un acceso directo de Chrome con URL:

```
http://127.0.0.1:8765/
```

Nombre: **STEM 2026 Lab**.

## Nota

Abrir `index.html` con doble clic (`file://`) **no** permite instalar como app ni PWA; usa siempre la liga **http://** del paso 2.

## Celular (misma red que el lab)

1. La PC servidor ejecuta `./iniciar_lab.sh` (muestra una IP, ej. `192.168.1.45`).
2. El celular debe usar la **misma Wi‑Fi** (no solo datos móviles).
3. En Chrome del celular abre: `http://192.168.1.45:8765/`
4. Desde ahí entran a **Prueba** o **Simulador** (se puede **Instalar** como app en Android/iPhone).

Cada celular guarda sus respuestas **en ese teléfono** (igual que en PC); el CSV se descarga al teléfono.

## Liga pública (cualquier celular con internet)

Hay que **subir la carpeta `web/`** a un hospedaje de archivos estáticos (sin servidor propio):

| Opción | Resultado |
|--------|-----------|
| **GitHub Pages** | Liga tipo `https://tu-usuario.github.io/stem2026/` |
| **Netlify / Cloudflare Pages** | Arrastrar la carpeta `web` → te dan un `https://…` |
| **Sitio UANL** | Si TI te da espacio web, sube `web/` ahí |

No hace falta base de datos: solo HTML, CSS y JS. Tras publicar, compartes **un solo enlace** por WhatsApp o correo.

**Prueba en celular:** el cuestionario va muy bien; el simulador es usable en horizontal; en pantalla chica conviene zoom o girar el teléfono.
