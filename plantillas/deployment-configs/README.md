# Plantillas de Deployment - MCP Server Bootcamp

Este directorio contiene plantillas y configuraciones para desplegar servidores MCP en diferentes
entornos y plataformas.

## 📁 Estructura de Archivos

```
deployment-configs/
├── README.md                     # Esta documentación
├── .env.template                 # Plantilla de variables de entorno
├── Dockerfile.production         # Dockerfile optimizado para producción
├── Dockerfile.development        # Dockerfile para desarrollo
├── kubernetes.yaml               # Configuración completa de Kubernetes
├── docker-swarm.yml             # Configuración para Docker Swarm
└── nginx/                       # Configuraciones de Nginx (próximamente)
```

## 🚀 Guías de Deployment

### 1. Desarrollo Local con Docker

Para desarrollo rápido usando el Dockerfile de desarrollo:

```bash
# Construir imagen de desarrollo
docker build -f Dockerfile.development -t mcp-server:dev .

# Ejecutar contenedor
docker run -p 3000:3000 -v $(pwd):/app mcp-server:dev
```

### 2. Producción con Docker

Para deployment en producción:

```bash
# Construir imagen optimizada
docker build -f Dockerfile.production -t mcp-server:prod .

# Ejecutar con variables de entorno
docker run -d \
  --name mcp-server-prod \
  -p 3000:3000 \
  --env-file .env \
  mcp-server:prod
```

### 3. Kubernetes Deployment

Para desplegar en un cluster de Kubernetes:

```bash
# Aplicar configuración
kubectl apply -f kubernetes.yaml

# Verificar deployment
kubectl get pods -l app=mcp-server
kubectl get services

# Ver logs
kubectl logs -f deployment/mcp-server
```

**Configuración requerida antes del deployment:**

1. Actualizar el secret `mcp-server-secrets` con valores reales
2. Modificar el dominio en el Ingress
3. Configurar cert-manager para SSL automático
4. Ajustar recursos según necesidades

### 4. Docker Swarm

Para deployment en Docker Swarm:

```bash
# Inicializar swarm (si no está iniciado)
docker swarm init

# Crear secretos
echo "postgresql://user:pass@host:5432/db" | docker secret create database_url -

# Desplegar stack
docker stack deploy -c docker-swarm.yml mcp-stack

# Verificar servicios
docker stack services mcp-stack
```

## 🔧 Configuración de Variables de Entorno

### Archivo .env

1. Copia la plantilla:

   ```bash
   cp .env.template .env
   ```

2. Edita el archivo `.env` con tus valores reales
3. **IMPORTANTE**: Nunca commitees el archivo `.env` a git

### Variables Críticas

| Variable       | Descripción                  | Ejemplo                               |
| -------------- | ---------------------------- | ------------------------------------- |
| `NODE_ENV`     | Entorno de ejecución         | `production`                          |
| `DATABASE_URL` | URL de conexión a PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET`   | Secreto para tokens JWT      | `mi-secreto-super-seguro`             |
| `API_KEY`      | Clave de API del servidor    | `api-key-segura`                      |

## 🏗️ Arquitecturas Recomendadas

### Desarrollo Local

```
┌─────────────────┐
│   Desarrollador │
└─────────┬───────┘
          │
    ┌─────▼─────┐
    │  Docker   │
    │Container  │
    └───────────┘
```

### Staging/Testing

```
┌──────────┐    ┌─────────────┐    ┌──────────┐
│   Load   │────│ MCP Server  │────│Database  │
│ Balancer │    │(Multi-inst) │    │(Replica) │
└──────────┘    └─────────────┘    └──────────┘
```

### Producción Empresarial

```
┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐
│Internet │────│  Ingress/   │────│ MCP Server  │────│PostgreSQL│
│ Traffic │    │   Nginx     │    │(Auto-scaled)│    │ Cluster  │
└─────────┘    └─────────────┘    └─────────────┘    └──────────┘
                       │
                ┌─────────────┐
                │ Monitoring  │
                │ & Logging   │
                └─────────────┘
```

## 🔒 Mejores Prácticas de Seguridad

### 1. Contenedores

- ✅ Usar imágenes base alpine (menor superficie de ataque)
- ✅ Ejecutar como usuario no-root
- ✅ Usar multi-stage builds para producción
- ✅ Escanear imágenes por vulnerabilidades

### 2. Kubernetes

- ✅ Usar Security Contexts
- ✅ Implementar Network Policies
- ✅ Configurar Resource Limits
- ✅ Usar secrets para credenciales

### 3. Configuración

- ✅ Validar todas las variables de entorno
- ✅ Usar HTTPS siempre en producción
- ✅ Implementar rate limiting
- ✅ Logs estructurados para auditoría

## 📊 Monitoreo y Observabilidad

### Health Checks

Todos los deployments incluyen health checks:

- **Liveness Probe**: `/health` - Verifica si el servidor está vivo
- **Readiness Probe**: `/ready` - Verifica si puede recibir tráfico

### Métricas

- Prometheus para recolección de métricas
- Grafana para visualización
- Alertas automáticas por email/Slack

### Logs

- Logs estructurados en formato JSON
- Agregación con ELK Stack o similar
- Retención configurable

## 🚨 Troubleshooting

### Problemas Comunes

#### Contenedor no inicia

```bash
# Ver logs del contenedor
docker logs mcp-server-prod

# Verificar variables de entorno
docker exec mcp-server-prod env
```

#### Problemas de conectividad en Kubernetes

```bash
# Verificar pods
kubectl describe pod <pod-name>

# Verificar servicios
kubectl get endpoints

# Ver logs
kubectl logs -f <pod-name>
```

#### Performance Issues

```bash
# Monitorear recursos
kubectl top pods
docker stats

# Verificar conexiones de BD
# Ver métricas en Grafana dashboard
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy MCP Server
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and Deploy
        run: |
          docker build -f Dockerfile.production -t mcp-server:${{ github.sha }} .
          # Deploy to your platform
```

### GitLab CI Example

```yaml
deploy:
  stage: deploy
  script:
    - docker build -f Dockerfile.production -t mcp-server:$CI_COMMIT_SHA .
    - kubectl set image deployment/mcp-server mcp-server=mcp-server:$CI_COMMIT_SHA
```

## 📚 Referencias Adicionales

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Security](https://kubernetes.io/docs/concepts/security/)
- [Production Node.js](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [MCP Protocol Documentation](https://modelcontextprotocol.io/)

---

**💡 Nota**: Estas plantillas están diseñadas siguiendo las mejores prácticas del bootcamp. Adapta
según tus necesidades específicas de infraestructura y seguridad.
