# Variables de Entorno para SEO

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos PostgreSQL (opcional - no se usa con localStorage)
DATABASE_URL="postgresql://qrlibre:qrlibre@localhost:5432/qrlibre?schema=public"

# URL base de la aplicación (requerido para SEO)
# Cambia esto por tu dominio real en producción
# Ejemplo: https://qrlibre.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Analytics (opcional)
# Obtén tu ID de Google Analytics 4 en: https://analytics.google.com/
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Códigos de verificación para motores de búsqueda (opcional)
# Obtén estos códigos desde:
# - Google Search Console: https://search.google.com/search-console
# - Bing Webmaster Tools: https://www.bing.com/webmasters
# - Yandex Webmaster: https://webmaster.yandex.com/

# NEXT_PUBLIC_VERIFICATION_GOOGLE=tu-codigo-google
# NEXT_PUBLIC_VERIFICATION_BING=tu-codigo-bing
# NEXT_PUBLIC_VERIFICATION_YANDEX=tu-codigo-yandex
```

## Variables Importantes para SEO

### NEXT_PUBLIC_APP_URL (Requerido)
Esta es la variable más importante para el SEO. Debe contener la URL completa de tu sitio en producción.

**Ejemplo para desarrollo:**
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Ejemplo para producción:**
```
NEXT_PUBLIC_APP_URL=https://qrlibre.com
```

Esta variable se usa para:
- Generar URLs canónicas correctas
- Crear structured data con URLs absolutas
- Configurar Open Graph images
- Generar sitemap.xml con URLs correctas

## Notas

- El archivo `.env.local` no debe ser commiteado a git (ya está en .gitignore)
- Las variables que empiezan con `NEXT_PUBLIC_` son accesibles en el cliente
- Las variables sin `NEXT_PUBLIC_` solo son accesibles en el servidor

