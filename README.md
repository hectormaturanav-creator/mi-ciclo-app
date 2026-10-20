# Mi Ciclo 4.1 — PWA con pestañas inferiores

## Actualizar desde 4.0

1. En **cada dispositivo**, descarga un respaldo cifrado y conserva la contraseña.
2. No desinstales la PWA ni borres los datos del sitio.
3. En el repositorio `mi-ciclo-app`, sube el contenido de esta carpeta (archivos en la raíz). Asegúrate de incluir el archivo **nuevo `nav.js`**.
4. Confirma los cambios y espera que GitHub Pages publique la nueva versión.
5. Abre la dirección HTTPS de Mi Ciclo y verifica que se muestre `v4.1`, las cuatro pestañas y tu historial anterior.
6. Si sigue mostrando 4.0, cierra y vuelve a abrir la app con conexión; no limpies el almacenamiento.

### Navegación
- **Inicio:** resumen, accesos rápidos, recordatorios y privacidad.
- **Calendario:** vista mensual y ambos historiales; al seleccionar fecha puedes ir a Registrar.
- **Registrar:** período y registro diario, edición desde historiales.
- **Estadísticas:** gráficos y tendencias existentes.

### Privacidad
Mantiene `mi_ciclo_v3_encrypted`, el mismo cifrado y formato de respaldo de 4.0. Los datos siguen separados por dispositivo; GitHub aloja solo código público, nunca el respaldo cifrado ni la contraseña.

## Personalización
El encabezado muestra el nombre de usuario debajo de Mi Ciclo. La opción Personalizar nombre guarda el nombre dentro del mismo registro cifrado AES-GCM. El nombre se conserva en los respaldos y puede cambiarse desde la aplicación.


## Corrección de posición del encabezado
Se corrigió la estructura HTML: el encabezado queda al principio del área principal, antes de Inicio, Calendario, Registrar y Estadísticas. La navegación inferior permanece fija. No se modificó el formato de datos cifrados.
