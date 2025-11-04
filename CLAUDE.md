# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Argon Dashboard Angular is a free Bootstrap 4 and Angular 14 dashboard template built with over 100 individual components. It's a production-ready admin dashboard featuring a modern design system with pre-built example pages.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:4200)
ng serve

# Build for production
ng build --configuration production

# Build for development
ng build --configuration development

# Run tests with Karma
ng test

# Run linting
ng lint

# Run e2e tests with Protractor
ng e2e

# Clean install (removes node_modules and package-lock.json)
npm run install:clean
```

## Architecture

### Layout System

The application uses a two-layout architecture that separates authenticated and public pages:

1. **AdminLayout** (`src/app/layouts/admin-layout/`): Main authenticated dashboard area
   - Includes sidebar, navbar, and footer components
   - Contains pages: Dashboard, User Profile, Tables, Icons, Maps
   - Lazy-loaded via `admin-layout.module.ts`

2. **AuthLayout** (`src/app/layouts/auth-layout/`): Public authentication pages
   - Minimal layout without navigation chrome
   - Contains pages: Login, Register
   - Lazy-loaded via `auth-layout.module.ts`

**Routing Pattern**: The root `app.routing.ts` defines two parent routes (both with empty path `''`) that load different layout components. Each layout then lazy-loads its own module which contains the actual page routes.

### Module Organization

- **AppModule** (`src/app/app.module.ts`): Root module that imports layout components
- **ComponentsModule** (`src/app/components/components.module.ts`): Shared components (Sidebar, Navbar, Footer) exported for use in layouts
- **Layout Modules**: Each layout has its own module that declares and routes to page components

### Pages

All page components live in `src/app/pages/` and are organized by feature:
- `dashboard/` - Main dashboard with charts and statistics
- `user-profile/` - User profile management
- `tables/` - Data table examples
- `icons/` - Icon library showcase
- `maps/` - Google Maps integration
- `login/` - Login page
- `register/` - Registration page

### Styling Architecture

The project uses SCSS with the Argon Design System:

- **Main entry**: `src/assets/scss/argon.scss` - imported in `angular.json`
- **Structure**:
  - `core/` - Base Bootstrap 4 components with Argon customizations
  - `custom/` - Custom Argon components and utilities
  - `angular-differences/` - Angular-specific style overrides

- **Component styles**: Each component has its own `.scss` file using component-scoped styles
- **Global styles**: `src/styles.scss` serves as the global stylesheet entry point

### Chart.js Integration

Charts are powered by Chart.js 2.9.4 with custom configurations:

- **Location**: `src/app/variables/charts.ts`
- **Key features**:
  - Custom rounded bar chart rendering (extends `Chart.elements.Rectangle`)
  - Predefined color palette matching Argon theme
  - Reusable chart configurations (`chartExample1`, `chartExample2`)
  - `parseOptions()` helper for deep-merging chart options
  - `chartOptions()` factory for default chart settings

**Usage pattern**: Import chart examples and use `parseOptions()` to merge with Chart.js defaults in components.

## Key Technical Details

### Angular Configuration

- **Version**: Angular 14.2.0
- **CLI**: angular-cli
- **Routing**: Hash-based routing enabled (`useHash: true` in `app.routing.ts:43`)
- **Default project**: `argon-dashboard-angular` (defined in `angular.json:162`)
- **Component prefix**: `app`
- **Style extension**: SCSS

### Build Configuration

- **Output**: `dist/` directory
- **Production optimizations**: Bundle optimization, minification, file hashing
- **Development mode**: Vendor chunks enabled, source maps, named chunks
- **Note**: CSS minification disabled in production (`minify: false` at `angular.json:46`)

### External Dependencies

The following libraries are loaded globally via `angular.json:36-38`:
- Chart.js - `node_modules/chart.js/dist/Chart.min.js`
- Clipboard.js - `node_modules/clipboard/dist/clipboard.min.js`

Chart.js is explicitly allowed as a CommonJS dependency (`angular.json:25-26`).

### Bootstrap Integration

- Uses `@ng-bootstrap/ng-bootstrap` version 12.0.1 for Angular-compatible Bootstrap components
- Bootstrap 4.6.1 for base styles
- NgbModule imported in AppModule and available throughout the application

## Development Patterns

### Adding New Pages

1. Generate component in `src/app/pages/`
2. Add route to appropriate layout routing file (`admin-layout.routing.ts` or `auth-layout.routing.ts`)
3. Import component in the layout module if not using route-based lazy loading

### Working with Charts

1. Import chart utilities: `import { chartOptions, parseOptions, chartExample1 } from 'src/app/variables/charts'`
2. Initialize Chart.js in `ngOnInit()` with `parseOptions(Chart, chartOptions())`
3. Use predefined examples or create custom configurations
4. Reference: `src/app/pages/dashboard/dashboard.component.ts`

### Shared Components

Sidebar, Navbar, and Footer are globally available once ComponentsModule is imported. They automatically wire up to the routing system and don't require manual configuration in most cases.
