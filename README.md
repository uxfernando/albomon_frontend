# Albomon Frontend

Este servicio se encarga de la interfaz de usuario del juego, mostrando los enfrentamientos en tiempo real, el estado de los jugadores y la experiencia visual de cada batalla.

---

## ✅ Requisitos Previos

| Herramienta | Versión |
| ----------- | ------- |
| Node.js     | 22.15.0 |
| npm         | 11.11.0 |

> Verifica tus versiones con `node -v` y `npm -v`

---

## 📦 Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/uxfernando/albomon_frontend.git
cd albomon_frontend

# 2. Instala las dependencias
npm install
```

---

## ▶️ Levantar en Local

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 📜 Scripts Disponibles

| Script            | Descripción                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Inicia la app en modo desarrollo con hot-reload |
| `npm run build`   | Genera el build de producción en `/dist`        |
| `npm run preview` | Previsualiza el build de producción localmente  |

---

## 🐛 Problemas Comunes

**`Error: Cannot find module '...'`**

> Asegúrate de haber ejecutado `npm install` antes de levantar el proyecto.
