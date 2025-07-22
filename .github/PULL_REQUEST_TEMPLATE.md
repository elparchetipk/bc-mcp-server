# Pull Request - Bootcamp MCP Server

## 📋 Descripción

### ¿Qué hace este PR?

<!-- Describe brevemente los cambios que introduces -->

### ¿Por qué es necesario?

<!-- Explica la motivación detrás de estos cambios -->

### ¿Cómo resuelve el problema?

<!-- Describe la solución implementada -->

---

## 🎯 Tipo de Cambio

- [ ] 🐛 **Bugfix** - Corrección de error
- [ ] ✨ **Feature** - Nueva funcionalidad o ejemplo
- [ ] 📚 **Documentation** - Mejoras en documentación
- [ ] 🎓 **Educational** - Nuevo ejercicio o mejora pedagógica
- [ ] 🧪 **Testing** - Agregar o mejorar tests
- [ ] 🔧 **Tooling** - Herramientas, scripts o configuración
- [ ] ♻️ **Refactor** - Refactorización de código
- [ ] 🎨 **Style** - Formateo, organización
- [ ] 📦 **Dependencies** - Actualización de dependencias

---

## 📍 Módulo(s) Afectado(s)

- [ ] Módulo 1: Fundamentos y Conceptos Base
- [ ] Módulo 2: Herramientas Avanzadas y Recursos
- [ ] Módulo 3: Persistencia y Bases de Datos
- [ ] Módulo 4: Seguridad y Autenticación
- [ ] Módulo 5: Testing y Calidad
- [ ] Módulo 6: Arquitecturas Avanzadas
- [ ] Módulo 7: Proyecto Final
- [ ] 🌐 **Transversal** - Afecta múltiples módulos
- [ ] 🔧 **Infraestructura** - Scripts, CI/CD, configuración

---

## 🎓 Valor Educativo

### Objetivos de Aprendizaje

<!-- ¿Qué aprenderán los estudiantes con estos cambios? -->

### Nivel de Dificultad

- [ ] 🟢 **Principiante** (Módulos 1-2)
- [ ] 🟡 **Intermedio** (Módulos 3-4)
- [ ] 🔴 **Avanzado** (Módulos 5-7)

### Conceptos MCP Involucrados

- [ ] Herramientas (Tools)
- [ ] Recursos (Resources)
- [ ] Prompts
- [ ] Transporte (stdio, HTTP)
- [ ] Manejo de errores
- [ ] Configuración de servidor
- [ ] Integración con APIs
- [ ] Persistencia de datos
- [ ] Autenticación/Autorización
- [ ] Testing de servidores MCP

---

## 💻 Cambios Técnicos

### Archivos Principales Modificados

<!-- Lista los archivos más importantes que cambiaste -->

- `ruta/archivo1.ts` - [descripción del cambio]
- `ruta/archivo2.md` - [descripción del cambio]

### Nuevas Dependencias

- [ ] No hay nuevas dependencias
- [ ] Nuevas dependencias NPM: <!-- lista las dependencias -->
- [ ] Nuevas herramientas: <!-- lista las herramientas -->

### Breaking Changes

- [ ] ❌ No hay breaking changes
- [ ] ⚠️ **SÍ hay breaking changes** - <!-- describe qué se rompe y cómo migrar -->

---

## 🧪 Testing

### Tests Incluidos

- [ ] ✅ Tests unitarios
- [ ] ✅ Tests de integración
- [ ] ✅ Tests end-to-end
- [ ] ✅ Tests de ejemplos/ejercicios
- [ ] ❌ No requiere tests adicionales

### Verificación Manual

- [ ] ✅ He probado los cambios localmente
- [ ] ✅ Los ejemplos funcionan correctamente
- [ ] ✅ La documentación es precisa
- [ ] ✅ No hay errores en consola

### Comandos de Testing

```bash
# Comando(s) para probar estos cambios
pnpm test
pnpm run verify-examples
```

---

## 📚 Documentación

### Documentación Actualizada

- [ ] ✅ README actualizado
- [ ] ✅ Documentación de módulo actualizada
- [ ] ✅ Comentarios en código actualizados
- [ ] ✅ Ejemplos de uso incluidos
- [ ] ❌ No requiere actualización de documentación

### Cambios en Copilot Instructions

- [ ] ❌ No afecta las copilot-instructions
- [ ] ✅ Actualicé las copilot-instructions según sea necesario

---

## 🔗 Contexto Adicional

### Issues Relacionados

<!-- Usa "Fixes #123" o "Closes #123" para auto-cerrar issues -->

- Fixes #
- Related to #

### Pull Requests Relacionados

- Depends on #
- Blocked by #

### Referencias Externas

<!-- Enlaces a documentación, RFCs, etc. -->

- [Documentación MCP](https://modelcontextprotocol.io/)
- [Issue/Discussion relevante]()

---

## 🎯 Checklist de Calidad

### Estándares del Proyecto

- [ ] ✅ Sigue las convenciones de naming del proyecto
- [ ] ✅ Usa Conventional Commits para los mensajes
- [ ] ✅ Respeta la estructura de carpetas establecida
- [ ] ✅ Incluye comentarios en español donde sea apropiado
- [ ] ✅ Sigue las copilot-instructions del proyecto

### Calidad de Código

- [ ] ✅ El código es limpio y legible
- [ ] ✅ No hay código duplicado innecesario
- [ ] ✅ Las funciones tienen responsabilidad única
- [ ] ✅ Manejo de errores apropiado
- [ ] ✅ Performance considerada

### Aspectos Pedagógicos

- [ ] ✅ Los ejemplos son claros y educativos
- [ ] ✅ La documentación explica el "por qué", no solo el "qué"
- [ ] ✅ Los ejercicios tienen dificultad apropiada
- [ ] ✅ Se incluyen casos de error comunes
- [ ] ✅ Facilita el aprendizaje progresivo

---

## 🔍 Testing del Reviewer

### Para el Reviewer

```bash
# Comandos para probar este PR
git checkout [rama-del-pr]
pnpm install
pnpm test
pnpm run verify-setup

# Si incluye nuevos ejemplos
cd ejemplos/[modulo-x]/[nuevo-ejemplo]
pnpm install
pnpm run dev
```

### Aspectos a Verificar

- [ ] **Funcionalidad**: ¿Los cambios hacen lo que dicen?
- [ ] **Calidad**: ¿El código es mantenible y limpio?
- [ ] **Pedagogía**: ¿Facilita el aprendizaje de MCP?
- [ ] **Consistencia**: ¿Sigue los estándares del proyecto?
- [ ] **Documentación**: ¿Está bien documentado?
- [ ] **Testing**: ¿Incluye pruebas suficientes?

---

## 📸 Screenshots (si aplica)

<!-- Si tu PR incluye cambios visuales, agrega screenshots -->

### Antes

<!-- Screenshot o descripción del estado anterior -->

### Después

<!-- Screenshot o descripción del nuevo estado -->

---

## 🚀 Deployment

### Impacto en Despliegue

- [ ] ❌ No afecta despliegue
- [ ] ✅ Requiere actualización de dependencias
- [ ] ✅ Requiere cambios en configuración
- [ ] ✅ Requiere migración de datos

### Instrucciones Especiales

<!-- Si hay pasos especiales para desplegar estos cambios -->

---

## 🤝 Información del Contribuidor

### Mi Experiencia

- [ ] 🆕 Primera contribución al proyecto
- [ ] 🔄 Contribuidor ocasional
- [ ] 🏆 Contribuidor frecuente
- [ ] 👑 Mantenedor del proyecto

### Área de Expertise

- [ ] Frontend/UI
- [ ] Backend/Servidores MCP
- [ ] DevOps/Infraestructura
- [ ] Documentación
- [ ] Testing
- [ ] Diseño pedagógico

### ¿Necesitas Ayuda?

- [ ] ❌ Todo listo para review
- [ ] 🤝 Me gustaría feedback sobre [aspecto específico]
- [ ] ❓ Tengo preguntas sobre [tema específico]

---

## 📝 Notas para el Reviewer

<!-- Información adicional que ayude al review -->
<!-- ¿Hay algo específico en lo que te gustaría que se enfoque el reviewer? -->
<!-- ¿Hay decisiones de diseño que quieres explicar? -->

---

**¡Gracias por contribuir al Bootcamp MCP Server!** 🚀

<!--
Tips para un buen PR:
1. Mantén los cambios enfocados y cohesivos
2. Incluye tests y documentación
3. Sigue las convenciones del proyecto
4. Considera el valor educativo de tus cambios
5. Sé paciente con el proceso de review
-->
