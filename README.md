# Mi Ciclo 4.5.8 — actualización visual de Estadísticas

Subir todos los archivos del paquete a la raíz del repositorio de GitHub Pages. No desinstalar la PWA ni borrar datos. Realizar respaldo cifrado antes de actualizar.

- Ícono Estadísticas reemplazado por gráfico de barras SVG.
- Anillos: promedio de intervalos entre inicios, diferencia entre máximo y mínimo cuando hay al menos dos intervalos válidos y duración media del sangrado. Anillos decorativos, no proporciones clínicas.
- Matriz de flujo por día con máximo de seis períodos y diez días; SOLO pinta valores diarios guardados. Un período con flujo predominante, pero sin registro por día, tendrá celdas sin color.
- Mantiene las estadísticas existentes, privacidad local y clave de almacenamiento.
- No añade servicios externos, ni cambia estructura de datos, contraseña o respaldo cifrado.

Pendiente: probar en iPhone/Android con los registros cifrados reales y comprobar edición, respaldo y visualización.
