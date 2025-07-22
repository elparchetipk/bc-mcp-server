# 📦 Plantillas y Configuraciones - MCP Server Bootcamp

Este directorio contiene todas las plantillas, configuraciones y archivos base necesarios para crear
y desplegar servidores MCP de forma eficiente y siguiendo las mejores prácticas.

## 🗂️ Estructura

```
plantillas/
├── servidor-base/              # Plantilla base para nuevos servidores MCP
│   ├── package.json           # Configuración de dependencias
│   ├── tsconfig.json          # Configuración TypeScript
│   ├── src/index.ts           # Servidor MCP básico funcional
│   └── README.md              # Documentación y guía de uso
├── testing-setup/             # Configuración de testing
│   ├── vitest.config.ts       # Configuración de Vitest
│   └── src/test/setup.ts      # Setup global de tests
├── deployment-configs/        # Configuraciones de deployment
│   ├── README.md              # Guía completa de deployment
│   ├── .env.template          # Plantilla de variables de entorno
│   ├── Dockerfile.production  # Dockerfile optimizado para producción
│   ├── Dockerfile.development # Dockerfile para desarrollo
│   ├── kubernetes.yaml        # Configuración completa de K8s
│   └── docker-swarm.yml       # Configuración de Docker Swarm
└── docker-compose-templates/  # Plantillas de Docker Compose
    ├── README.md              # Guía de uso de Docker Compose
    ├── docker-compose.dev.yml # Entorno de desarrollo completo
    ├── docker-compose.prod.yml# Entorno de producción
    └── docker-compose.test.yml# Entorno de testing
```

## 🚀 Inicio Rápido

### 1. Crear Nuevo Servidor MCP

```bash
# Copiar plantilla base
cp -r plantillas/servidor-base mi-nuevo-servidor
cd mi-nuevo-servidor

# Instalar dependencias
pnpm install

# Inicializar git
git init

# Ejecutar servidor
pnpm run dev
```

### 2. Setup de Testing

```bash
# Copiar configuración de testing
cp plantillas/testing-setup/vitest.config.ts .
cp plantillas/testing-setup/src/test/setup.ts src/test/

# Ejecutar tests
pnpm run test
```

### 3. Desarrollo con Docker Compose

```bash
# Copiar plantilla de desarrollo
cp plantillas/docker-compose-templates/docker-compose.dev.yml .

# Levantar entorno completo
docker-compose -f docker-compose.dev.yml up -d
```

## 📋 Plantillas Disponibles

### 🎯 Servidor Base (`servidor-base/`)

**Qué incluye:**

- ✅ Estructura básica de servidor MCP
- ✅ Configuración TypeScript optimizada
- ✅ Herramienta ejemplo (`echo`) completamente funcional
- ✅ Manejo de errores robusto
- ✅ Logging estructurado
- ✅ Documentación detallada

**Cuándo usar:**

- Crear un nuevo servidor MCP desde cero
- Aprender los conceptos fundamentales
- Base para proyectos de los módulos 1-2

### 🧪 Testing Setup (`testing-setup/`)

**Qué incluye:**

- ✅ Configuración Vitest optimizada
- ✅ Setup global con mocks
- ✅ Soporte para tests unitarios e integración
- ✅ Coverage reports
- ✅ Utilidades de testing MCP

**Cuándo usar:**

- Implementar testing en cualquier proyecto
- Módulos 5+ que requieren testing robusto
- CI/CD pipelines

### 🚢 Deployment Configs (`deployment-configs/`)

**Qué incluye:**

- ✅ Dockerfiles multi-stage optimizados
- ✅ Configuraciones Kubernetes completas
- ✅ Setup Docker Swarm
- ✅ Plantilla de variables de entorno
- ✅ Guías de deployment detalladas

**Cuándo usar:**

- Desplegar en producción (módulos 6-7)
- Configurar entornos de staging
- Implementar CI/CD

### 🐳 Docker Compose (`docker-compose-templates/`)

**Qué incluye:**

- ✅ Entorno desarrollo completo (DB, Cache, Monitoring)
- ✅ Stack de producción con load balancing
- ✅ Ambiente testing aislado
- ✅ Configuraciones de seguridad

**Cuándo usar:**

- Desarrollo local con servicios externos
- Pruebas de integración
- Deployment en servidores únicos

## 🎯 Uso por Módulo

### Módulos 1-2 (Fundamentos)

```bash
# Solo plantilla base
cp -r plantillas/servidor-base mi-servidor-m1
```

### Módulos 3-4 (Intermedio)

```bash
# Base + testing + docker desarrollo
cp -r plantillas/servidor-base mi-servidor-m3
cp plantillas/testing-setup/vitest.config.ts mi-servidor-m3/
cp plantillas/docker-compose-templates/docker-compose.dev.yml mi-servidor-m3/
```

### Módulos 5-7 (Avanzado)

```bash
# Setup completo para producción
cp -r plantillas/servidor-base mi-servidor-m5
cp -r plantillas/testing-setup/* mi-servidor-m5/
cp plantillas/deployment-configs/.env.template mi-servidor-m5/.env
cp plantillas/docker-compose-templates/* mi-servidor-m5/
```

## ⚙️ Configuraciones Incluidas

### Variables de Entorno

La plantilla `.env.template` incluye más de 50 variables categorizadas:

- 🔧 **Configuración general** (NODE_ENV, PORT, LOG_LEVEL)
- 🗄️ **Base de datos** (PostgreSQL, pools de conexión)
- 🔴 **Cache** (Redis, configuraciones)
- 🔐 **Seguridad** (JWT, API keys, CORS)
- 🌐 **APIs externas** (OpenAI, Anthropic, Google)
- ☁️ **Cloud providers** (AWS, Azure)
- 📊 **Monitoreo** (Grafana, Prometheus, Sentry)

### Dockerfile Multi-stage

```dockerfile
# Desarrollo: hot reload + debugging
FROM node:18-alpine AS development

# Producción: optimizado + seguridad
FROM node:18-alpine AS production
```

### Kubernetes Ready

- **Deployments** con auto-scaling
- **Services** y **Ingress** configurados
- **Secrets** y **ConfigMaps**
- **Health checks** y **probes**
- **RBAC** y **Security policies**

## 🔧 Personalización

### Modificar Plantillas

1. **Servidor Base**: Edita `servidor-base/src/index.ts` para cambiar funcionalidad por defecto
2. **Testing**: Ajusta `testing-setup/vitest.config.ts` según necesidades
3. **Docker**: Modifica Dockerfiles para dependencias específicas
4. **K8s**: Actualiza recursos y límites en `kubernetes.yaml`

### Crear Nuevas Plantillas

```bash
# Crear nueva plantilla
mkdir plantillas/mi-nueva-plantilla
cd plantillas/mi-nueva-plantilla

# Desarrollar contenido
# ...

# Documentar en README.md
# Actualizar este archivo principal
```

## 🔒 Mejores Prácticas Incluidas

### Seguridad

- ✅ Usuarios no-root en contenedores
- ✅ Secrets gestionados externamente
- ✅ HTTPS por defecto en producción
- ✅ Validación de inputs
- ✅ Rate limiting configurado

### Performance

- ✅ Imágenes Docker optimizadas (Alpine)
- ✅ Multi-stage builds
- ✅ Connection pooling
- ✅ Caching strategies
- ✅ Resource limits definidos

### Observabilidad

- ✅ Logging estructurado
- ✅ Health checks
- ✅ Métricas de Prometheus
- ✅ Dashboards de Grafana
- ✅ Alerting automático

## 📚 Documentación Adicional

- [📖 Guía de Deployment](deployment-configs/README.md)
- [🐳 Docker Compose Guide](docker-compose-templates/README.md)
- [🧪 Testing Strategies](../docs/testing-strategies.md)
- [🔒 Security Best Practices](../docs/security-best-practices.md)

## 🤝 Contribución

### Agregar Nueva Plantilla

1. Crear directorio en `plantillas/`
2. Desarrollar contenido siguiendo estándares del bootcamp
3. Incluir README.md con documentación completa
4. Actualizar este archivo principal
5. Crear PR con descripción detallada

### Mejorar Plantilla Existente

1. Seguir principios de backward compatibility
2. Documentar cambios en README específico
3. Actualizar ejemplos de uso
4. Testear en múltiples escenarios

---

**💡 Consejo**: Estas plantillas evolucionan con el bootcamp. Mantente actualizado con los últimos
cambios y mejores prácticas.
