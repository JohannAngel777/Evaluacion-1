# API REST - Evaluación 1

API REST desarrollada con **Express** para administrar solicitudes de soporte técnico dentro de una empresa, implementando lógica de negocio, validaciones y una estructura modular en Node.js.

## Integrantes
* **José Andrés Calles Ramírez** - `00054525`
* **Jeffrey Alessandro Guevara Batres** - `00388525`
* **Daniel Alexander Avelar Orellana** - `00089625`
* **Johann André Angel Menjivar** - `00071625`

---

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura modular para separar responsabilidades:

```text
Evaluacion-1/
├── controllers/
│   └── incidenciasControllers.js    # Lógica de negocio y manejo de peticiones
├── routes/
│   └── incidencias.js               # Definición de rutas y endpoints de la API
└── utils/
    └── helpers.js                   # Funciones reutilizables y utilidades
├── app.js                           # Configuración principal del servidor Express
└── package.json                     # Dependencias y scripts del proyecto
```

---

## Requisitos Previos

instalado en tu equipo:
* [Node.js](https://nodejs.org/) (Versión 16 o superior recomendada)
* [npm](https://www.npmjs.com/) (Gestor de paquetes de Node)

---

## ⚙️ Instalación y Configuración

1. Clona este repositorio o descarga los archivos del proyecto:
   ```bash
   git clone https://github.com/JohannAngel777/Evaluacion-1.git
   cd Evaluacion-1
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Inicia el servidor en modo de desarrollo (o producción):
   ```bash
   npm start
   ```
   *(O si cuentas con nodemon configurado: `npm run dev`)*

El servidor se ejecutará en el puerto asignado (`http://localhost:3124`).

---

## Tecnologías y Herramientas

* **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
* **Express**: Framework minimalista y flexible para Node.js para la creación de la API REST.
* **Git & GitHub**: Control de versiones y colaboración en equipo.