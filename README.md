# QR Libre

Aplicación web para generar códigos QR de forma gratuita y libre. Permite crear, almacenar y gestionar códigos QR fácilmente.

## 🚀 Características

- ✅ Generación de códigos QR a partir de URLs
- ✅ Almacenamiento persistente en base de datos PostgreSQL
- ✅ Interfaz moderna y responsive con shadcn/ui
- ✅ Descarga de códigos QR generados
- ✅ Listado de todos los QR codes generados
- ✅ Acceso libre sin autenticación

## 🛠️ Tecnologías

- **Frontend/Backend**: Next.js 14 (App Router)
- **Base de datos**: PostgreSQL con Prisma ORM
- **UI**: shadcn/ui + Tailwind CSS
- **Generación QR**: qrcode

## 📋 Prerrequisitos

- Node.js 18+ 
- Docker y Docker Compose (para la base de datos)

## 🔧 Instalación

1. **Clonar el repositorio** (si aplica)

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
cp .env.example .env.local
```

Edita `.env.local` y asegúrate de que `DATABASE_URL` apunte a tu base de datos PostgreSQL.

4. **Iniciar PostgreSQL con Docker**:
```bash
docker-compose up -d
```

5. **Configurar la base de datos**:
```bash
# Generar el cliente de Prisma
npm run db:generate

# Aplicar el esquema a la base de datos
npm run db:push
```

6. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run db:generate` - Genera el cliente de Prisma
- `npm run db:push` - Aplica el esquema a la base de datos
- `npm run db:migrate` - Ejecuta migraciones de Prisma
- `npm run db:studio` - Abre Prisma Studio para gestionar la base de datos

## 🗄️ Estructura de la Base de Datos

La aplicación utiliza una tabla `QrCode` con los siguientes campos:
- `id`: Identificador único (CUID)
- `url`: URL almacenada en el QR code
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

## 📄 Licencia

Ver archivo LICENSE para más detalles.

