# equinorte-factura-app

Frontend de la prueba técnica para Equinorte.
Construido con **Angular 17 + PrimeNG**.

> Backend: https://github.com/brayantorre3/equinorte-factura-api

---

## Tecnologías

- Angular 17
- PrimeNG 17
- TypeScript
- SCSS

---

## Requisitos previos

- Node.js 18+
- npm
- Angular CLI 17

> El backend debe estar corriendo en `http://localhost:8080` antes de iniciar el frontend.

---

## Instalación y ejecución

```bash
git clone https://github.com/brayantorre3/equinorte-factura-app.git
cd equinorte-factura-app
npm install
ng serve
```

La aplicación abre en: `http://localhost:4200`

---

## Funcionalidades

- **Listado de facturas** — tabla con todas las facturas registradas
- **Detalle de factura** — vista con los productos y valores actuales
- **Recálculo proporcional** — formulario para ingresar nuevo subtotal y tipo de usuario
- **Validaciones** — mensajes de error según las reglas de negocio (Tipo A / Tipo B)
- **Notificaciones toast** — confirmación visual del resultado del recálculo

---

## Estructura del proyecto

```
src/app/
├── components/
│   └── factura/
│       ├── factura.component.ts
│       ├── factura.component.html
│       └── factura.component.scss
├── services/
│   └── factura.service.ts
├── app.routes.ts
└── app.config.ts
```

---

## Conexión con el backend

La URL base de la API está configurada en `factura.service.ts`:

```typescript
private apiUrl = 'http://localhost:8080/api/facturas';
```

Si el backend corre en un puerto diferente, actualiza esta línea.

---

## Docker

Para correr el frontend con Docker de forma independiente:

```bash
docker build -t equinorte-frontend .
docker run -p 80:80 equinorte-frontend
```

> Se recomienda usar el `docker-compose` del repositorio del backend para levantar ambos servicios juntos.

---

## Autor

**Brayan Torres** — [@brayantorre3](https://github.com/brayantorre3)
