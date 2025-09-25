# 🔄 QuickSync - Gestión Inteligente para Negocios de Comida

Una aplicación innovadora diseñada para optimizar la gestión de datos en negocios de comida rápida, construida con React, TypeScript, Tailwind CSS y Supabase.

## ✨ Características Principales

### Misión
Facilitar y automatizar la gestión de pedidos, inventario y facturación en negocios de comida rápida, ofreciendo una solución tecnológica eficiente que mejore los procesos internos y reduzca el tiempo destinado a tareas administrativas.

### Visión
Ser la aplicación líder en gestión de datos para negocios de comida rápida en la región, reconocida por su eficiencia, confiabilidad y aporte a la transformación digital del sector gastronómico.

### Para Compradores 👥
- **Registro de pedidos móvil** - Interfaz intuitiva para empleados desde dispositivos móviles
- **Sincronización automática** - Datos de pedidos sincronizados con caja e inventario
- **Gestión de inventario** - Control automático de stock con cada pedido
- **Facturación electrónica** - Generación automática de facturas desde el pedido
- **Reportes en tiempo real** - Monitoreo de ventas, gastos y ganancias

### Para Dueños de Restaurantes 🏪
- **Panel administrativo completo** - Dashboard con métricas y estadísticas
- **Automatización de procesos** - Registro automático de pedidos y afectación de inventario
- **Reportes diarios** - Ventas, gastos, ganancias y cantidad de pedidos
- **Gestión de empleados** - Control de registros y actividades del personal
- **Analytics avanzados** - Estadísticas detalladas y tendencias de negocio
- **Facturación integrada** - Sistema completo de facturación electrónica

## 🎨 Identidad Visual
## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Iconos**: Lucide React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS con sistema de colores personalizado

## 🚀 Configuración del Proyecto

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/quicksync.git
   cd quicksync
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura Supabase**
   - Crea un nuevo proyecto en [Supabase](https://supabase.com)
   - Copia las variables de entorno:
   ```bash
   cp .env.example .env
   ```
   - Agrega tus credenciales de Supabase en `.env`:
   ```
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

4. **Ejecuta las migraciones de base de datos**
   - Ve a tu proyecto de Supabase
   - Ejecuta las queries SQL en los archivos de migración:
     - `supabase/migrations/create_initial_schema.sql`
     - `supabase/migrations/seed_sample_data.sql`

5. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 📊 Base de Datos

### Esquema Principal

- **users** - Usuarios (compradores y dueños)
- **restaurants** - Información de restaurantes
- **menu_items** - Platos del menú
- **orders** - Pedidos de clientes
- **reviews** - Reseñas y calificaciones

### Características de Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- **Políticas de acceso** basadas en roles de usuario
- **Autenticación** integrada con Supabase Auth
- **Validación de datos** en el backend

## 🎨 Diseño y UX

### Sistema de Colores
- **Primario**: Naranja (#F97316) - Energético y apetitoso
- **Secundario**: Rojo (#EF4444) - Para acentos importantes
- **Éxito**: Verde (#10B981) - Estados positivos
- **Advertencia**: Amarillo (#F59E0B) - Alertas
- **Error**: Rojo (#EF4444) - Estados de error
- **Neutral**: Grises - Textos y fondos

### Características de Diseño
- **Diseño Minimalista** - Interfaz limpia y profesional con paleta azul pastel
- **Responsive Design** - Optimizado para todos los dispositivos
- **Micro-interacciones** - Animaciones sutiles con transiciones suaves
- **Tipografía Inter** - Fuente moderna y legible
- **Sistema de Sombras** - Efectos de profundidad con tonos azules
- **Accesibilidad** - Alto contraste y navegación intuitiva

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📱 Responsive Design

La aplicación está completamente optimizada para:

- **Móvil** (< 768px): Navegación optimizada para touch
- **Tablet** (768px - 1024px): Layout adaptativo
- **Desktop** (> 1024px): Experiencia completa

## 🔐 Autenticación y Roles

### Tipos de Usuario

1. **Buyer (Comprador)**
   - Puede explorar restaurantes
   - Realizar pedidos
   - Dejar reseñas
   - Gestionar perfil

2. **Owner (Dueño)**
   - Gestionar restaurante
   - Administrar menú
   - Ver pedidos
   - Responder reseñas
   - Acceso a analytics

## 🚀 Deploy

El proyecto está configurado para deploy fácil en:

- **Vercel** - Deploy automático desde GitHub
- **Netlify** - Integración continua
- **Supabase Hosting** - Todo en un lugar

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Pexels** - Por las imágenes stock de alta calidad
- **Lucide** - Por el excelente set de iconos
- **Tailwind CSS** - Por el framework de CSS utility-first
- **Supabase** - Por la plataforma backend completa

---

¡QuickSync - Optimizando tu negocio con tecnología inteligente! 🚀