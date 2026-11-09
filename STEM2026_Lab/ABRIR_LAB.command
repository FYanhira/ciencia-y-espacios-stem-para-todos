#!/bin/bash
cd "$(dirname "$0")"
chmod +x ./iniciar_lab.sh ./servidor/lab-server-mac-* 2>/dev/null || true
exec ./iniciar_lab.sh
