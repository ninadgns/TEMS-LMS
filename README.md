# TEMS Academy - Learning Management System

A modern web application for managing educational content, exams, and student data for TEMS Academy of Olympiad Math.

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [Supabase](https://supabase.com/)
- **PDF Generation**: [PDF-lib](https://pdf-lib.js.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Data Tables**: [TanStack Table](https://tanstack.com/table/v8)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📋 Features

- **Student Management**: Track student information and performance
- **Exam System**: Create, manage, and evaluate exams
- **PDF Generation**: Generate exam reports and certificates
- **Responsive Design**: Mobile-friendly interface
- **Dark/Light Mode**: Theme switching support
- **Real-time Data**: Powered by Supabase for live updates

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tems
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
tems/
├── src/
│   ├── app/                 # App Router pages and layouts
│   │   ├── (private)/       # Protected routes
│   │   ├── api/            # API routes
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable UI components
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Utility functions and configurations
│   │   ├── logo.ts        # Logo/branding assets
│   │   ├── comicsans.ts   # Custom font configuration
│   │   └── data.tsx       # Data utilities
│   └── utils/             # Helper functions
│       └── supabase/      # Supabase client configuration
├── public/                # Static assets
├── .next/                 # Next.js build output
└── ...config files
```

## 🔧 Configuration Files

- **`components.json`**: shadcn/ui configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration
- **`next.config.mjs`**: Next.js configuration
- **`tsconfig.json`**: TypeScript configuration
- **`.eslintrc.json`**: ESLint configuration

## 📦 Key Dependencies

### Core
- `next`: React framework
- `react` & `react-dom`: React library
- `typescript`: Type safety

### UI & Styling
- `tailwindcss`: Utility-first CSS framework
- `@radix-ui/*`: Headless UI components
- `lucide-react`: Icon library
- `next-themes`: Theme management

### Data & Forms
- `@supabase/supabase-js`: Database client
- `react-hook-form`: Form management
- `zod`: Schema validation
- `@tanstack/react-table`: Data tables

### Utilities
- `pdf-lib`: PDF generation
- `date-fns`: Date utilities
- `clsx` & `tailwind-merge`: Conditional styling
- `sonner`: Toast notifications

## 🚀 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## 🌟 Key Features Breakdown

### PDF Generation
The application includes a robust PDF generation system using `pdf-lib` for creating exam reports and certificates with custom fonts (Comic Sans) and branding.

### Authentication & Database
Integrated with Supabase for:
- User authentication
- Real-time database operations
- Secure data management

### Responsive Design
Built with mobile-first approach using Tailwind CSS, ensuring optimal experience across all devices.

### Type Safety
Full TypeScript implementation with strict type checking for better development experience and fewer runtime errors.

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to TEMS Academy.

## 🆘 Support

For support and questions, please contact the development team.

---

**TEMS Academy of Olympiad Math** - Empowering students through quality education and innovative technology.