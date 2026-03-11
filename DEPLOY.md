# Hosting en GitHub Pages

Pasos para alojar la app en GitHub y que se sirva en la URL que genera Pages. Después podrás proteger el acceso para usuarios concretos.

---

## Paso 1: Repositorio en GitHub

1. Entra en [github.com](https://github.com) e inicia sesión.
2. **+** (arriba derecha) → **New repository**.
3. **Repository name**: el que quieras (ej. `Tratamiento`). **Public**.
4. No marques "Add a README" ni .gitignore.
5. **Create repository**.

---

## Paso 2: Subir el código

En la carpeta del proyecto:

```bash
cd c:\Cursor\diario-salud

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git
git push -u origin main
```

Sustituye `TU_USUARIO` y `NOMBRE_REPO` por tu usuario y el nombre del repo (ej. `DaniFCCN` y `Tratamiento`).

Si ya tenías `origin`:

```bash
git remote set-url origin https://github.com/TU_USUARIO/NOMBRE_REPO.git
git push -u origin main
```

---

## Paso 3: Activar GitHub Pages

1. En el repo → **Settings**.
2. Menú izquierdo → **Pages**.
3. **Build and deployment** → **Source**: elige **GitHub Actions**.
4. No hace falta guardar nada más.

Con esto, cada **push a `main`** dispara el workflow y publica la app en Pages.

---

## Paso 4: Base URL del proyecto

La app debe conocer el nombre del repo para que rutas y recursos carguen bien. En **`vite.config.js`** la línea `base` debe usar ese nombre:

```js
base: process.env.NODE_ENV === 'production' ? '/NOMBRE_REPO/' : '/',
```

Ejemplo: si el repo es `Tratamiento`, debe ser `'/Tratamiento/'`. Si cambias el nombre del repo, cambia esta línea y haz push.

---

## Paso 5: URL de la app

Cuando el workflow termine (1–2 min tras el primer push), la app estará en:

**`https://TU_USUARIO.github.io/NOMBRE_REPO/`**

Ejemplo: `https://DaniFCCN.github.io/Tratamiento/`

Esa es la URL que usarás para acceder a la app. Más adelante podrás restringir el acceso a usuarios concretos.

---

## Resumen

| # | Qué hacer |
|---|-----------|
| 1 | Crear repo en GitHub (Public, sin README). |
| 2 | `git init` → `git add .` → `git commit` → `git remote add origin ...` → `git push -u origin main`. |
| 3 | Settings → Pages → Source: **GitHub Actions**. |
| 4 | En `vite.config.js`, `base: '/NOMBRE_REPO/'` (mismo nombre que el repo). |
| 5 | Abrir `https://TU_USUARIO.github.io/NOMBRE_REPO/` cuando el workflow termine. |

Actualizaciones: cualquier cambio que subas a `main` se desplegará solo al hacer **push**.

---

## Si “la página ya estaba ocupada” (usar esta app en la URL principal)

En GitHub solo puede haber **un sitio en la raíz**: `https://TU_USUARIO.github.io/`. Ese sitio **solo** puede publicarse desde un repositorio que se llame exactamente **`TU_USUARIO.github.io`** (ej. `DaniFCCN.github.io`).

Tienes dos opciones:

### Opción A: App en la URL del repo (recomendado para empezar)

- **No toques** el repo que ya usas para `usuario.github.io`.
- En el repo **Tratamiento**: Settings → Pages → Source: **GitHub Actions**.
- La app queda en: **`https://DaniFCCN.github.io/Tratamiento/`**

Así no cambias la página principal; solo añades esta app en una ruta.

### Opción B: Esta app como página principal (usuario.github.io)

Para que **`https://DaniFCCN.github.io/`** sea esta app:

1. Crea un repositorio nuevo que se llame exactamente **`DaniFCCN.github.io`** (vacío, sin README).
2. En **Settings → Pages** de ese repo, Source: **GitHub Actions**.
3. En el repo **Tratamiento**, tras hacer `npm run build`, copia **todo el contenido** de la carpeta `dist/` al repo `DaniFCCN.github.io` (por ejemplo subiendo los ficheros o haciendo push desde tu PC).  
   Importante: en ese repo la app se sirve en la **raíz**, así que en `vite.config.js` para ese despliegue la `base` debería ser `'/'`. Puedes tener un build “para Pages raíz” solo para ese repo (por ejemplo con `base: '/'` y subiendo ese `dist` a `DaniFCCN.github.io`).

Si quieres, en un siguiente paso se puede automatizar: que el workflow de Tratamiento haga build y suba el `dist` al repo `DaniFCCN.github.io` usando un token, para no copiar a mano.
