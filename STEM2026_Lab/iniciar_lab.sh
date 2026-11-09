#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8765}"

arch="$(uname -m)"
if [[ "$arch" == "arm64" ]]; then
  SWS="./servidor/lab-server-mac-arm"
else
  SWS="./servidor/lab-server-mac-intel"
fi

if [[ ! -x "$SWS" ]]; then
  echo "No se encontró servidor portable: $SWS" >&2
  echo "Copia de nuevo la carpeta STEM2026_Lab completa." >&2
  exit 1
fi

pick_ip() {
  ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true
}

echo "=== STEM 2026 Lab (sin Python) ==="
echo "En ESTA Mac: http://127.0.0.1:${PORT}/"
ip="$(pick_ip || true)"
if [[ -n "${ip:-}" ]]; then
  echo "En otras PCs (si la red lo permite): http://${ip}:${PORT}/"
fi
echo ""
echo "Deja esta ventana abierta (Ctrl+C para detener)."
echo ""

if command -v open >/dev/null 2>&1; then
  ( sleep 0.6 && open "http://127.0.0.1:${PORT}/" ) &
fi

exec "$SWS" -a 0.0.0.0 -p "$PORT" -d "$(pwd)"
