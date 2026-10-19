# Mi Ciclo 4.0 — Actualización PWA

Actualización sobre la versión 3.2, manteniendo `localStorage` (`mi_ciclo_v3_encrypted`) y formato cifrado `version:3`. No elimina, reinicializa ni envía registros a ningún servidor.

## Instalación en GitHub Pages

1. Antes de actualizar, **abre la versión 3.2 en cada teléfono y descarga un respaldo cifrado**; verifica que esté guardado y conserva la contraseña.
2. Ve al repositorio `mi-ciclo-app` de GitHub y reemplaza los archivos `index.html`, `app.js`, `sw.js` y `manifest.webmanifest` con los de este ZIP (los iconos pueden subirse también).
3. Confirma el commit en `main`, espera el despliegue en **Actions** o **Settings → Pages**.
4. En Android y iPhone, abre Mi Ciclo y cierra y reabre si sigue mostrando 3.2. Si es necesario recarga la web desde el navegador (sin borrar datos).
5. Comprueba versión 4.0, historial, estadísticas, desbloqueo y respaldo.

Los cálculos no incluyen intervalos inferiores a 15 ni superiores a 60 días para estimar duración del ciclo. Las estadísticas de flujo y síntomas se basan en los registros diarios guardados. No hay sincronización entre teléfonos. Las notificaciones no funcionan programadas con la app cerrada.

No subas respaldos ni datos de salud a un repositorio público. La contraseña no puede restablecerse sin acceso a un respaldo recuperable.
