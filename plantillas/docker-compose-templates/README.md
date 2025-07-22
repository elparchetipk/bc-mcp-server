# Plantillas Docker Compose - MCP Server Bootcamp

Este directorio contiene plantillas de Docker Compose para diferentes entornos de desarrollo y
deployment de servidores MCP.

## 📁 Archivos Incluidos

```
docker-compose-templates/
├── README.md                    # Esta documentación
├── docker-compose.dev.yml       # Entorno de desarrollo completo
├── docker-compose.prod.yml      # Entorno de producción
└── docker-compose.test.yml      # Entorno de testing y CI/CD
```

## 🚀 Guías de Uso

### 1. Desarrollo Local (`docker-compose.dev.yml`)

**Características:**

- Hot reload activado
- Debugging habilitado (puerto 9229)
- PostgreSQL y Redis locales
- Adminer para gestión de BD
- Nginx para pruebas frontend
- Prometheus para monitoreo básico

**Uso:**

```bash
# Levantar entorno completo de desarrollo
docker-compose -f docker-compose.dev.yml up -d

# Ver logs en tiempo real
docker-compose -f docker-compose.dev.yml logs -f mcp-server

# Ejecutar comandos en el contenedor
docker-compose -f docker-compose.dev.yml exec mcp-server pnpm run test

# Parar todos los servicios
docker-compose -f docker-compose.dev.yml down
```

**Puertos Expuestos:**

- `3000`: Servidor MCP principal
- `9229`: Puerto de debugging Node.js
- `5432`: PostgreSQL
- `6379`: Redis
- `8080`: Adminer (gestión de BD)
- `8000`: Nginx (frontend)
- `9090`: Prometheus

**Accesos Rápidos:**

- Servidor MCP: http://localhost:3000
- Adminer: http://localhost:8080 (user: postgres, pass: password)
- Prometheus: http://localhost:9090

### 2. Producción (`docker-compose.prod.yml`)

**Características:**

- Configuración optimizada para producción
- 3 réplicas del servidor MCP
- Nginx como reverse proxy con SSL
- Backup automático de PostgreSQL
- Monitoreo completo (Prometheus + Grafana)
- Health checks configurados

**Preparación:**

1. Crear archivo `.env` con variables de producción:

   ```bash
   cp ../deployment-configs/.env.template .env
   # Editar .env con valores de producción
   ```

2. Configurar certificados SSL:

   ```bash
   mkdir -p ssl
   # Copiar cert.pem y key.pem a la carpeta ssl/
   ```

3. Configurar archivos de configuración:
   ```bash
   # Nginx config, Redis config, scripts de backup, etc.
   ```

**Uso:**

```bash
# Levantar entorno de producción
docker-compose -f docker-compose.prod.yml up -d

# Verificar salud de los servicios
docker-compose -f docker-compose.prod.yml ps

# Ver logs de producción
docker-compose -f docker-compose.prod.yml logs --tail=100 mcp-server

# Escalar servicios
docker-compose -f docker-compose.prod.yml up -d --scale mcp-server=5
```

**Puertos Expuestos:**

- `80`: HTTP (redirige a HTTPS)
- `443`: HTTPS (Nginx + SSL)
- `3001`: Grafana dashboard
- `9090`: Prometheus (interno)

### 3. Testing (`docker-compose.test.yml`)

**Características:**

- Entorno aislado para tests
- Base de datos en memoria (tmpfs)
- Selenium para tests E2E
- Mock server para APIs externas
- K6 para tests de performance

**Uso:**

```bash
# Ejecutar suite completa de tests
docker-compose -f docker-compose.test.yml up --abort-on-container-exit

# Ejecutar solo tests unitarios
docker-compose -f docker-compose.test.yml run --rm mcp-server-test pnpm run test:unit

# Ejecutar tests E2E con Selenium
docker-compose -f docker-compose.test.yml run --rm mcp-server-test pnpm run test:e2e

# Tests de performance con K6
docker-compose -f docker-compose.test.yml run --rm k6

# Limpiar entorno de test
docker-compose -f docker-compose.test.yml down -v
```

**Puertos Expuestos:**

- `3001`: Servidor MCP de testing
- `4444`: Selenium WebDriver
- `7900`: Selenium VNC (debugging visual)
- `1080`: Mock server

## 🔧 Configuración Personalizada

### Variables de Entorno

Cada compose file soporta variables de entorno. Crear archivo `.env` en el directorio del proyecto:

```env
# Versión de la imagen a usar
VERSION=1.2.0

# Configuración de base de datos
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydatabase

# Secretos de aplicación
JWT_SECRET=mi-secreto-super-seguro
API_KEY=mi-api-key-secreta
```

### Volúmenes Persistentes

**Desarrollo:**

- Código fuente montado como volumen para hot reload
- Datos de BD persisten entre reinicios

**Producción:**

- Volúmenes nombrados para persistencia
- Backups automáticos configurados

**Testing:**

- tmpfs para máxima velocidad
- Datos se limpian después de cada ejecución

### Redes

Cada entorno usa redes aisladas:

- `mcp-network` (desarrollo/producción)
- `mcp-test-network` (testing)

## 🏗️ Patrones de Arquitectura

### Microservicios

```yaml
services:
  api-gateway:
    # Punto de entrada único
  auth-service:
    # Servicio de autenticación
  mcp-server:
    # Servidor MCP principal
  notification-service:
    # Servicio de notificaciones
```

### Monolito Modular

```yaml
services:
  mcp-server:
    # Aplicación única con módulos internos
  postgres:
    # Base de datos principal
  redis:
    # Cache y sesiones
```

## 🔒 Consideraciones de Seguridad

### Desarrollo

- ✅ Puertos expuestos solo para desarrollo
- ✅ Credenciales de desarrollo (no usar en prod)
- ⚠️ Debug habilitado (no usar en prod)

### Producción

- ✅ Nginx como proxy con rate limiting
- ✅ SSL/TLS obligatorio
- ✅ Secrets gestionados externamente
- ✅ Health checks y auto-restart
- ✅ Logs estructurados

### Testing

- ✅ Entorno completamente aislado
- ✅ Datos temporales en memoria
- ✅ Mock de servicios externos
- ✅ Sin exposición de puertos innecesarios

## 📊 Monitoreo Incluido

### Métricas Automáticas

- **Aplicación**: Tiempo de respuesta, errores, throughput
- **Base de datos**: Conexiones, queries lentas, locks
- **Sistema**: CPU, memoria, disco, red

### Dashboards Predefinidos

- Panel general de salud del sistema
- Métricas específicas de MCP
- Alertas por email/Slack

### Logs Centralizados

- Formato JSON estructurado
- Correlación por request ID
- Filtros por nivel de log

## 🚨 Troubleshooting

### Problemas Comunes

#### Servicios no inician

```bash
# Verificar logs
docker-compose logs <servicio>

# Verificar configuración
docker-compose config

# Verificar puertos en uso
netstat -tlnp | grep <puerto>
```

#### Problemas de conectividad

```bash
# Verificar redes
docker network ls
docker network inspect <red>

# Verificar DNS interno
docker-compose exec mcp-server nslookup postgres
```

#### Performance Issues

```bash
# Monitorear recursos
docker stats

# Verificar logs de aplicación
docker-compose logs --tail=100 mcp-server

# Verificar métricas en Prometheus
curl http://localhost:9090/metrics
```

### Debugging Avanzado

#### Acceso a Contenedores

```bash
# Shell en contenedor de desarrollo
docker-compose exec mcp-server sh

# Shell en contenedor específico
docker-compose exec postgres psql -U postgres -d mcp_dev
```

#### Análisis de Logs

```bash
# Filtrar logs por servicio
docker-compose logs mcp-server | grep ERROR

# Seguir logs en tiempo real
docker-compose logs -f --tail=50
```

## 🔄 Integración CI/CD

### GitHub Actions

```yaml
name: Test with Docker Compose
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

### GitLab CI

```yaml
test:
  script:
    - docker-compose -f docker-compose.test.yml up --abort-on-container-exit
  services:
    - docker:dind
```

## 📈 Escalabilidad

### Escalar Servicios

```bash
# Escalar servidor MCP
docker-compose up -d --scale mcp-server=3

# Verificar balanceador de carga
docker-compose exec nginx nginx -t
```

### Migrar a Kubernetes

Usa las configuraciones como base para generar manifiestos de Kubernetes:

```bash
# Convertir usando kompose
kompose convert -f docker-compose.prod.yml
```

## 📚 Referencias

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Production Best Practices](https://docs.docker.com/compose/production/)
- [Docker Networking](https://docs.docker.com/network/)

---

**💡 Tip**: Empieza con `docker-compose.dev.yml` para desarrollo, luego adapta las configuraciones
para tus necesidades específicas de producción.
