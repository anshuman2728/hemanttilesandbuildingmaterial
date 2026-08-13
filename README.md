# Hemant Tiles & Building Material

A modern, responsive web platform for **Hemant Tiles & Building Material**, designed to showcase tiles and building materials online while providing customers with a clean, professional, and easy-to-use browsing experience.

<p align="center">
  <a href="https://hemanttilesandbuildingmaterial.lovable.app">🌐 Live Website</a>
  ·
  <a href="https://github.com/anshuman2728/hemanttilesandbuildingmaterial">💻 GitHub Repository</a>
</p>

---

## 🏗️ About the Project

**Hemant Tiles & Building Material** is a modern business website built to bring a traditional building-material business online.

The platform provides a professional digital presence for showcasing products, communicating with customers, and creating a foundation for future features such as product management, customer inquiries, and data-driven business operations.

The application focuses on:

* Modern and premium visual design
* Responsive experience across devices
* Product-focused presentation
* Simple customer navigation
* Scalable frontend architecture
* Backend and database integration through Supabase

---

## ✨ Features

* 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
* 🧱 **Product Showcase** — Present tiles and building materials in an organized way
* 🎨 **Modern UI** — Clean, professional interface with reusable components
* ⚡ **Fast Performance** — Powered by Vite and modern React
* 🔎 **Interactive Experience** — Smooth navigation and interactive UI elements
* 🗄️ **Supabase Integration** — Backend and database-ready architecture
* 📝 **Form Handling** — Structured forms with validation
* 📊 **Data Visualization** — Support for interactive charts
* ♿ **Accessible UI Components** — Built using Radix UI primitives
* 📐 **Scalable Architecture** — Structured for future business functionality

---

## 🛠️ Tech Stack

| Technology               | Purpose                            |
| ------------------------ | ---------------------------------- |
| **React 19**             | Frontend application               |
| **TypeScript**           | Type-safe development              |
| **Vite**                 | Development server & build tooling |
| **TanStack Router**      | Application routing                |
| **TanStack React Query** | Server-state & data management     |
| **Supabase**             | Database & backend services        |
| **Tailwind CSS**         | Styling & responsive design        |
| **Radix UI**             | Accessible UI primitives           |
| **React Hook Form**      | Form management                    |
| **Zod**                  | Schema validation                  |
| **Recharts**             | Data visualization                 |
| **Lucide React**         | Icons                              |
| **ESLint**               | Code quality                       |
| **Prettier**             | Code formatting                    |

---

## 📂 Project Structure

```text
hemanttilesandbuildingmaterial/
│
├── public/                  # Static assets
│
├── src/                     # Application source code
│   ├── components/          # Reusable UI components
│   ├── pages/               # Application pages
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and configurations
│   └── ...
│
├── supabase/                # Supabase configuration
│
├── .env                     # Environment configuration
├── components.json          # UI component configuration
├── eslint.config.js         # ESLint configuration
├── package.json             # Dependencies and scripts
├── bun.lock                 # Bun lockfile
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* [Node.js](https://nodejs.org/) 18+
* npm
* Git

Bun can also be used as the package manager if preferred.

### 1. Clone the Repository

```bash
git clone https://github.com/anshuman2728/hemanttilesandbuildingmaterial.git
```

### 2. Navigate to the Project

```bash
cd hemanttilesandbuildingmaterial
```

### 3. Install Dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use the environment variables required by the project's Supabase configuration.

> ⚠️ Never commit private API keys, service-role keys, database passwords, or other sensitive credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Or:

```bash
bun run dev
```

The development server will display the local URL in the terminal.

---

## 📜 Available Scripts

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start development server      |
| `npm run build`     | Create production build       |
| `npm run build:dev` | Create development-mode build |
| `npm run preview`   | Preview production build      |
| `npm run lint`      | Run ESLint                    |
| `npm run format`    | Format project using Prettier |

---

## 🏭 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Live Website

Visit the live application:

**[https://hemanttilesandbuildingmaterial.lovable.app](https://hemanttilesandbuildingmaterial.lovable.app)**

---

## 🔮 Future Roadmap

The project can be extended with features such as:

* [ ] Complete product catalog
* [ ] Product categories and filtering
* [ ] Product search
* [ ] Product detail pages
* [ ] Customer inquiry system
* [ ] WhatsApp enquiry integration
* [ ] Contact and quotation forms
* [ ] Admin dashboard
* [ ] Product management system
* [ ] Inventory management
* [ ] Customer management
* [ ] Order/quotation tracking
* [ ] Image gallery
* [ ] Reviews and testimonials
* [ ] SEO optimization
* [ ] Analytics dashboard
* [ ] Authentication and role-based access

---

## 🎯 Project Goals

The primary goal is to transform **Hemant Tiles & Building Material** into a professional digital storefront that makes it easier for customers to:

1. Discover available products
2. Explore product categories
3. Compare suitable materials
4. Contact the business
5. Request information or quotations
6. Access the business from any device

---

## 🔐 Security

Sensitive information should **never** be committed to the repository.

Use environment variables for:

* Supabase credentials
* API keys
* Authentication secrets
* Database credentials
* Third-party service credentials

For production deployments, configure secrets through the hosting provider's environment-variable system.

---

## 🤝 Contributing

For development and improvements:

1. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

2. Make the required changes.

3. Run linting:

```bash
npm run lint
```

4. Verify the production build:

```bash
npm run build
```

5. Commit the changes:

```bash
git add .
git commit -m "feat: add your feature"
```

6. Push the branch:

```bash
git push origin feature/your-feature
```

7. Open a Pull Request.

---

## ⚡ Development with Lovable

This project was initially created with **Lovable** and can continue to be developed through the Lovable platform.

Lovable provides a visual development workflow while keeping the project source code synchronized with GitHub.

---

## 📄 License

No open-source license has currently been specified for this repository.

Unless a license is added, the project's source code, assets, branding, and other contents should be treated as proprietary and should not be reused or redistributed without permission.

---

<p align="center">

### 🧱 Hemant Tiles & Building Material

**Building better spaces, one tile at a time.**

</p>
