# Rade: Tu Diario Digital de Hábitos

Una plataforma moderna diseñada para ayudarte a tomar el control de tus hábitos de bienestar sin la complejidad de las herramientas de *tracking* tradicionales. **Wellness Tracker** te permite monitorizar tu ejercicio, sueño y dieta de forma sencilla e intuitiva.

Construido con una arquitectura robusta: **Angular** para un *frontend* rápido y reactivo, **Tailwind CSS** para un diseño limpio y moderno, y **Spring Boot** para un *backend* seguro y escalable.

## Tecnologías Utilizadas

Este proyecto está dividido en dos partes principales:

### Frontend (Cliente Web)

| Tecnología | Descripción |
| :--- | :--- |
| **Angular 20** | Framework principal para construir la interfaz de usuario (SPA). |
| **TypeScript** | Lenguaje para una base de código más limpia y mantenible. |
| **Tailwind CSS** | Framework de CSS *utility-first* para un diseño rápido y responsive. |
| **npm** | Gestor de paquetes y automatización de tareas. |

### Backend (Servicio API)

| Tecnología | Descripción | |
| :--- | :--- | :--- |
| **Spring Boot 3.2** | Framework para el desarrollo de la API REST robusta y con configuración mínima. |
| **Spring Security** | Manejo de autenticación (JWT/OAuth2) y autorización. |
| **Java 17** | Lenguaje de programación principal. |
| **Gradle** | Herramienta de gestión de dependencias y construcción de proyectos. |
| **PostgreSQL** | Base de datos relacional para almacenamiento de datos de hábitos y usuarios. |

Encuentra el repositorio del back-end [aquí](https://github.com/RubFajardo/RadeAPI).

## Configuración y Ejecución Local

Sigue estos pasos para poner en marcha el proyecto en tu entorno de desarrollo.

### 1\. Requisitos Previos

Asegúrate de tener instalado:

  * **Node.js & npm** (para Angular)
  * **Java 17 o superior** (para Spring Boot)
  * **Gradle** 
  * Una instancia de **PostgreSQL** 

### 2\. Configuración del Backend (Spring Boot)

1.  Clona el repositorio:
    ```bash
    git clone github.com/RubFajardo/Rade.git
    ```
2.  **Configura la Base de Datos:**
      * Crea una base de datos llamada `rade_db`.
      * Edita el archivo `src/main/resources/application.properties` con tus credenciales:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/rade_db
        spring.datasource.username=tu_usuario_bd
        spring.datasource.password=tu_contraseña_bd
        spring.jpa.hibernate.ddl-auto=update
        ```
3.  **Ejecuta el Backend:**
    ```bash
    mvn spring-boot:run
    ```
    El API estará disponible en `http://localhost:8080`.

### 3\. Configuración del Frontend (Angular)

1.  Navega al directorio del *frontend*:
    ```bash
    cd ../frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el Servidor de Desarrollo:
    ```bash
    ng serve -o
    ```
    La aplicación se abrirá automáticamente en tu navegador en `http://localhost:4200`.

## Contribuciones

¡Las contribuciones son bienvenidas\! Si deseas mejorar el código, añadir nuevas características o reportar *bugs*, por favor sigue los pasos a continuación:

1.  Haz un *Fork* del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Haz tus cambios y *commit* (`git commit -m 'feat: Añadir X'`).
4.  Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5.  Abre un *Pull Request*.
