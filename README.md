# Diario de Salud

Aplicación web tipo diario para que una persona enferma registre por día: síntomas (CRUD), toma de medicación (mañana/noche) y comentarios en texto libre. Incluye **menú de navegación**, **historial de días**, **análisis** (estadísticas) y **recordatorios** por notificación. Pensada para usarse desde el navegador en iPhone (Safari) sin pasar por App Store.

## Funcionalidades

- **Hoy / Diario**: selector de día y formulario (síntomas, medicación mañana/noche, comentarios).
- **Historial**: lista de días con registro; al tocar un día se abre el diario de esa fecha con lo que se marcó.
- **Análisis**: número de días registrados, días con síntomas, total de síntomas, días con medicación tomada/olvidada (mañana y noche), días con al menos un olvido, días con comentarios.
- **Recordatorios**: activar avisos y elegir hora de recordatorio mañana y noche; si no has marcado la toma cuando llega la hora, se muestra una notificación (cuando la app está abierta o en primer plano).

## Tecnologías

- **Vite** – Build rápido y moderno
- **Vue 3** (Composition API) + **Vue Router** – Navegación y componentes
- **Tailwind CSS** – Estilos con utilidades (diseño actual y fácil de mantener)
- **localStorage** – Persistencia en el dispositivo (sin backend)
- **Notification API** – Recordatorios de medicación

## Requisitos

- Node.js 18+

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador (o la URL que indique Vite).

## Build para producción

```bash
npm run build
```

La salida queda en la carpeta `dist/`.

## Despliegue en GitHub Pages

### Opción 1: GitHub Actions (recomendado)

1. Crea un repositorio en GitHub (ej. `diario-salud`).
2. En el repo: **Settings → Pages** → Source: **GitHub Actions**.
3. Ajusta la base en `vite.config.js` al nombre de tu repositorio:
   ```js
   base: process.env.NODE_ENV === 'production' ? '/diario-salud/' : '/'
   ```
   (cambia `'/diario-salud/'` por `'/tu-repo/'` si el repo tiene otro nombre).
4. Sube el código y haz push a la rama `main`. El workflow `.github/workflows/deploy.yml` construirá y desplegará en Pages.

La app quedará en: `https://tu-usuario.github.io/diario-salud/` (o la URL de tu repo).

### Opción 2: Rama `gh-pages` manual

1. Ejecuta `npm run build`.
2. En `vite.config.js` usa `base: '/diario-salud/'` (o tu nombre de repo).
3. Sube el contenido de `dist/` a la rama `gh-pages` o a la carpeta que uses para Pages (según la configuración del repo).

## Uso en iPhone (Safari)

- Abre la URL de GitHub Pages en Safari.
- Opcional: **Compartir → Añadir a pantalla de inicio** para tener un icono como una app y mejor experiencia (modo “web app”).
- Los datos se guardan en el dispositivo (localStorage). No hay servidor; si borras datos del sitio o cambias de navegador, se pierden.

## Estructura del proyecto

```
diario-salud/
├── .github/workflows/  # Deploy a GitHub Pages
├── public/             # Estáticos (favicon, .nojekyll)
├── src/
│   ├── assets/        # CSS global (Bulma + temas)
│   ├── components/    # DayPicker, SymptomsForm, MedicationCheck, CommentsField, NavBar
│   ├── composables/   # useDiary, useAnalytics, useReminders
│   ├── router/        # Rutas: /diario, /historial, /analisis, /recordatorios
│   ├── views/         # DiarioView, HistorialView, AnalisisView, RecordatoriosView
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

## Buenas prácticas aplicadas

1. **Componentes por responsabilidad**: un componente por bloque (día, síntomas, medicación, comentarios).
2. **Estado centralizado en un composable** (`useDiary`): lógica de datos y persistencia en un solo sitio, fácil de testear y reutilizar.
3. **Datos en localStorage**: clave versionada (`diario-salud-v1`) para poder cambiar el formato en el futuro sin romper datos antiguos.
4. **Sin backend**: adecuado para GitHub Pages; todo es estático + JS en el cliente.
5. **Responsive y táctil**: tamaños mínimos (~44px) en controles para uso en móvil, `viewport` y safe areas para iPhone.
6. **Base path configurable**: mismo código para desarrollo (base `/`) y producción en GitHub Pages (base `'/repo/'`).
7. **`.nojekyll`** en `public/`: evita que GitHub trate el sitio como Jekyll y oculte carpetas que empiezan por `_`.
8. **Semántica y accesibilidad**: labels, `id` en inputs, estructura clara en el HTML.

## Recordatorios en móvil

- En **Recordatorios** activa los avisos y configura las horas. La primera vez tendrás que aceptar los permisos de notificación.
- En iPhone/Safari las notificaciones pueden mostrarse solo cuando la pestaña está abierta o la app está en primer plano. Para mejorar la experiencia, añade la web a la **pantalla de inicio** (Compartir → Añadir a pantalla de inicio).

## Posibles mejoras

- Exportar/importar datos (JSON o CSV).
- Gráficas o resumen de síntomas por período (con una lib ligera).
- PWA con Service Worker para uso offline y notificaciones en segundo plano (según soporte del navegador).

## Licencia

Proyecto de ejemplo; usa la licencia que prefieras.
