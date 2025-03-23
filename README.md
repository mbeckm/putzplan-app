# 🧹 Putzplan

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-2.0-3ecf8e)

A modern web application that helps couples organize and manage their household cleaning tasks efficiently. Built with Next.js 14, TypeScript, and Supabase.

## ✨ Features

- 📱 **Modern UI**: Clean, responsive design built with TailwindCSS
- 🔄 **Task Management**: Create, edit, and track cleaning tasks
- 📅 **Smart Scheduling**: Automatic task scheduling based on recurrence patterns
- 👥 **Multi-user Support**: Designed for couples to manage tasks together
- 📊 **Task Metrics**: Track duration and "disgust level" for better task distribution
- 🔐 **Secure Authentication**: Email/password authentication with Supabase

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works great)

### Setup

1. Clone the repository
```bash
git clone https://github.com/mbeckm/putzplan-app.git
cd putzplan-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 🏗️ Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Supabase](https://supabase.com/) - Backend & Authentication
- [React](https://reactjs.org/) - UI Components

## 📖 Documentation

- [Requirements Document](docs/REQUIREMENTS.md)
- [Codebase Documentation](docs/CODEBASE.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need to fairly distribute household tasks
- Built with modern web technologies for optimal user experience
- Designed with scalability and maintainability in mind
