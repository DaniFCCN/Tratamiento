# Publicar en GitHub Pages (y abrirlo en Safari)

## 1. Subir el proyecto a GitHub

### Crear el repositorio en GitHub
1. Entra en [github.com](https://github.com) e inicia sesión.
2. Clic en **+** (arriba derecha) → **New repository**.
3. **Repository name**: por ejemplo `diario-salud` (o el que quieras).
4. Elige **Public**.
5. No marques "Add a README" (ya tienes código local).
6. Clic en **Create repository**.

### Subir el código desde tu PC
Abre una terminal en la carpeta del proyecto (`diario-salud`) y ejecuta:

```bash
cd c:\Cursor\diario-salud

git init
git add .
git commit -m "Initial commit: Diario de Salud"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/diario-salud.git
git push -u origin main
```

Sustituye `TU_USUARIO` por tu usuario de GitHub y `diario-salud` por el nombre del repo si lo cambiaste.

---

## 2. Activar GitHub Pages

1. En tu repositorio de GitHub, ve a **Settings** (Configuración).
2. En el menú izquierdo, entra en **Pages** (dentro de "Code and automation").
3. En **Build and deployment** → **Source**, elige **GitHub Actions** (no "Deploy from a branch").
4. Guarda si hace falta.

Con eso, cada vez que hagas **push a la rama `main`**, se ejecutará el workflow y se publicará la web automáticamente.

---

## 3. Ajustar la URL si el repo tiene otro nombre

Si el repositorio **no** se llama `diario-salud`, edita `vite.config.js` y cambia la línea `base`:

```js
base: process.env.NODE_ENV === 'production' ? '/NOMBRE-DE-TU-REPO/' : '/',
```

Por ejemplo, si el repo es `mi-diario`, pon `'/mi-diario/'`.

---

## 4. Ver tu sitio y abrirlo en Safari

- La URL será: **`https://TU_USUARIO.github.io/diario-salud/`**  
  (o `https://TU_USUARIO.github.io/NOMBRE-DE-TU-REPO/` si cambiaste el nombre).

- La primera vez puede tardar 1–2 minutos después del push.

- **En iPhone (Safari):**
  1. Abre esa URL en Safari.
  2. Para tenerlo como app: **Compartir** (cuadrado con flecha) → **Añadir a pantalla de inicio**.
  3. Los datos se guardan en el dispositivo (localStorage).

---

## Resumen rápido

| Paso | Acción |
|------|--------|
| 1 | Crear repo en GitHub (sin README) |
| 2 | `git init`, `git add .`, `git commit`, `git remote add origin ...`, `git push -u origin main` |
| 3 | Settings → Pages → Source: **GitHub Actions** |
| 4 | Si el repo no se llama `diario-salud`, cambiar `base` en `vite.config.js` |
| 5 | Abrir `https://TU_USUARIO.github.io/diario-salud/` en Safari y, si quieres, "Añadir a pantalla de inicio" |
