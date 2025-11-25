# Responsible Gambling Tracker

A comprehensive web application for tracking gambling sessions, managing budgets, analyzing performance, and generating tax reports. Built with modern web technologies and a privacy-first approach.

![Dark Mode Interface](https://img.shields.io/badge/Theme-Dark%20Mode-000000?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)

## 🎯 Features

### Core Functionality
- **Session Tracking**: Record gambling sessions with detailed information (game type, location, money in/out, duration)
- **Real-time Timer**: Auto-start timer for active gambling sessions
- **Quick Entry**: Entry-first design that captures data immediately
- **Financial Analytics**: Track net results, return rates, and performance over time
- **Budget Management**: Set and monitor spending limits with visual indicators
- **Tax Reporting**: Generate year-by-year reports with CSV export capability
- **Search & Filter**: Advanced filtering by game type, result (win/loss), and search functionality

### User Experience
- **Dark Mode First**: Eye-friendly dark interface with high-contrast accents
- **Mobile Responsive**: Fully optimized for mobile devices with touch-friendly controls
- **Entry-First Flow**: Start tracking before authentication required
- **Real-time Updates**: Instant data synchronization across all views
- **Data Visualization**: Interactive charts and graphs using Recharts
- **Secure Authentication**: Email-based authentication via Supabase Auth

## 🚀 Live Demo

**Production URL**: [https://x80ja5iduyxm.space.minimax.io](https://x80ja5iduyxm.space.minimax.io)

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - Modern React with hooks
- **TypeScript 5.6** - Type-safe development
- **Vite 6.0** - Lightning-fast build tool
- **TailwindCSS 3.4** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **Recharts 2.12** - Data visualization
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Authentication
  - RESTful APIs

### Development Tools
- **pnpm** - Fast, disk-efficient package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **date-fns** - Date manipulation

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account (free tier available)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/etaionline/responsible-gambling-tracker.git
   cd responsible-gambling-tracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run the migrations in your Supabase project (in order):
   ```sql
   -- File: supabase/migrations/1763723603_setup_rls_and_indexes.sql
   -- File: supabase/migrations/1763724781_update_schema_for_money_tracking.sql
   ```
   
   Or use the Supabase CLI:
   ```bash
   supabase db push
   ```

5. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🗄️ Database Schema

### Tables

#### `profiles`
- User profile information
- Linked to Supabase Auth users
- Auto-created on signup

#### `gambling_entries`
- Session records with detailed tracking
- Fields: `game_type`, `location`, `money_spent_in`, `money_pulled_out`, `duration_minutes`, `notes`
- Calculated: `net_result` (virtual column)

#### `budgets`
- User-defined spending limits
- Period-based budgeting (daily/weekly/monthly)

#### `goals`
- Financial goals and targets
- Progress tracking

### Security
- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Secure authentication via Supabase Auth

## 🎨 Design System

The application uses a **Dark Mode First** design philosophy:

- **Color Scheme**: 70% dark neutrals, 20% vibrant accents, 10% high-contrast text
- **Typography**: Inter font family for clarity
- **Components**: Custom-built with Radix UI primitives
- **Spacing**: Consistent 8px grid system
- **Animations**: Subtle micro-interactions for enhanced UX

Design tokens available in `docs/design-tokens.json`

## 📱 Key Pages

### Landing (Quick Entry)
Entry-first design that starts the session timer immediately

### Home Dashboard
- Budget widget with progress visualization
- Key metrics: Net Result, Money Spent, Money Pulled Out, Return Rate
- 30-day performance chart
- Recent activity feed
- Nested navigation: Dashboard View ↔ Analytics View

### Entries Management
- Full CRUD operations (Create, Read, Update, Delete)
- Search and filter functionality
- Sortable columns
- Inline editing with modal dialogs

### Analytics
- Game breakdown charts (pie chart)
- Win/loss distribution
- Performance trends over time
- Session statistics tables

### Tax Reports
- Year-by-year financial summaries
- CSV export for tax preparation
- Detailed transaction breakdowns

### Settings
- Profile management
- Account preferences
- Data export options

## 🔒 Privacy & Security

- **Local-first data**: All data stored in your Supabase instance
- **Encrypted connections**: HTTPS/TLS for all communications
- **Row-level security**: Database-level access control
- **No third-party tracking**: Privacy-respecting analytics only
- **Data ownership**: Full control and export capabilities

## 🚀 Deployment

### Build for production
```bash
pnpm build
# or
npm run build
```

Output will be in the `dist/` directory.

### Deploy to popular platforms

**Vercel**
```bash
vercel --prod
```

**Netlify**
```bash
netlify deploy --prod --dir=dist
```

**Static hosting** (any provider)
Upload the contents of `dist/` directory

### Environment Variables
Ensure the following are set in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📊 Project Structure

```
responsible-gambling-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BudgetWidget.tsx
│   │   ├── MainContent.tsx
│   │   ├── Sidebar.tsx
│   │   └── ui/              # Base UI primitives
│   ├── contexts/            # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useTimer.ts
│   ├── lib/                 # Utilities
│   │   ├── supabase.ts      # Supabase client
│   │   └── utils.ts
│   ├── pages/               # Page components
│   │   ├── QuickEntry.tsx   # Landing page
│   │   ├── Home.tsx         # Main app wrapper
│   │   ├── DashboardView.tsx
│   │   ├── AnalyticsView.tsx
│   │   ├── Entries.tsx
│   │   ├── TaxReports.tsx
│   │   ├── Settings.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── supabase/
│   └── migrations/          # Database migrations
├── docs/                    # Design documentation
│   ├── content-structure-plan.md
│   ├── design-specification.md
│   └── design-tokens.json
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting (use ESLint)
- Write meaningful commit messages
- Test thoroughly before submitting PRs
- Update documentation as needed

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Supabase** - For providing an excellent backend platform
- **Radix UI** - For accessible component primitives
- **Lucide** - For beautiful SVG icons
- **Recharts** - For powerful data visualization
- **TailwindCSS** - For rapid UI development

## 📧 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Check existing documentation in `/docs`
- Review Supabase setup guides

## ⚠️ Responsible Gambling

This tool is designed to promote **responsible gambling** through awareness and accountability. If you or someone you know has a gambling problem, please seek help:

- **National Council on Problem Gambling**: 1-800-522-4700
- **Gamblers Anonymous**: https://www.gamblersanonymous.org
- **SAMHSA National Helpline**: 1-800-662-4357

---

**Built with ❤️ for responsible gambling awareness**