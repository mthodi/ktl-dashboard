# KTL Metrics Dashboard

A Vite-powered React dashboard for visualizing internet traffic locality metrics from the Keeping Traffic Local (KTL) Metrics API.

## Overview

The KTL Metrics Dashboard provides an intuitive interface for exploring country-level internet traffic patterns, including:
- Traffic locality scores
- CDN distribution analysis
- ASN hosting data
- Cross-border traffic flows
- Historical trend analysis

Built with the Wieldy v4 template system and modern web technologies.

## Technology Stack

- **Vite 6.x** - Fast build tool and dev server
- **React 19.0** - UI framework
- **React Router 7.x** - Client-side routing
- **Ant Design 5.x** - UI component library
- **Recharts 3.x** - Data visualization
- **Tailwind CSS 3.x** - Utility-first CSS
- **react-country-flag 3.x** - Country flag icons

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- KTL Metrics Django API running on `http://localhost:8000` (or configure a different URL)

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

**Note:** Vite requires environment variables to be prefixed with `VITE_` to be exposed to client code.

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── pages/                    # Application pages
│   │   └── dashboards/
│   │       └── countries/        # Countries dashboard
│   │           ├── index.jsx     # Countries list page
│   │           └── CountryDetail.jsx  # Country detail page
│   ├── _components/              # Reusable UI components
│   │   └── CountryFlag.jsx       # Country flag component
│   ├── _utilities/               # Utility functions
│   │   ├── api.js                # API service layer
│   │   └── formatters.js         # Data formatting utilities
│   ├── _hooks/                   # Custom React hooks
│   ├── _routes/                  # Routing configuration
│   ├── _layouts/                 # Layout components
│   ├── _themes/                  # Theme configuration
│   ├── _config/                  # App configuration
│   └── App.jsx                   # Root component
├── main.jsx                      # Application entry point
└── index.css                     # Global styles
public/                           # Static assets
```

## Features

### Countries Dashboard (`/countries`)

- Overview of all countries with traffic metrics
- Search and filter functionality
- Sortable columns (locality score, snapshot date, region)
- Summary statistics (total countries, average locality score)
- Country flags for visual identification

### Country Detail Page (`/countries/:code`)

- Comprehensive metrics for a specific country
- Key statistics: locality score, hosting countries, ASNs, CDNs
- Top countries, ASNs, and CDNs by traffic
- Locality matrix with ASN distribution
- Interactive pie charts (local vs external traffic)
- Historical trend analysis with line charts
- Snapshot date selector for viewing historical data

## API Integration

The dashboard consumes the KTL Metrics Django API. See `src/app/_utilities/api.js` for the service layer implementation.

### API Endpoints

- `GET /api/metrics/countries/` - List all countries
- `GET /api/metrics/countries/:code/` - Get country metrics
- `GET /api/metrics/countries/:code/history/` - Get historical snapshots
- `GET /api/metrics/countries/:code/:date/` - Get specific snapshot

All endpoints are public and require no authentication.

## Development Guidelines

- Use functional components with React hooks
- Leverage Ant Design components (avoid custom UI from scratch)
- Use Tailwind CSS utilities for styling
- Handle loading and error states appropriately
- Follow the existing code style and patterns

See `CLAUDE.md` for comprehensive development guidelines and best practices.

## Contributing

This project uses:
- ESLint for code linting
- Vite's Fast Refresh for hot module replacement during development
- Wieldy v4 template conventions

## License

[Add your license information here]

## Documentation

- [Wieldy Template Docs](https://docs-wieldy.g-axon.work/)
- [Vite Documentation](https://vite.dev/guide/)
- [React Documentation](https://react.dev/)
- [Ant Design Components](https://ant.design/components/overview/)
- [Recharts API](https://recharts.org/en-US/api)
