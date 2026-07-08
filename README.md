📊 FX Budget Dashboard — Intelligent Trading Journal

A modern, dark-themed, and interactive dashboard designed for independent traders (Forex, Crypto, and Stocks). This application helps you monitor your trading performance in real time, manage risk efficiently, and visualize your account growth through a professional interface inspired by platforms like TradingView.

🚀 Live Demo: https:[//fratboy-techcon.vercel.app](https://traders-ledger.vercel.app/)

📸 Interface Preview

Insert a high-quality screenshot or an animated GIF showcasing your application in action here!

🔥 Key Features
📈 Dynamic Performance Tracking: Integrated real-time line chart powered by Chart.js to display the cumulative profit and loss curve.
🧠 Automatic Risk Calculator: Instantly analyzes your overall account balance and calculates your Win Rate (%) based on your trading history.
💾 Data Persistence (No Data Loss): Automatically saves all trading sessions using the LocalStorage API, ensuring your data remains available even after refreshing or closing the browser.
❌ Trade History Management: Quickly add trading sessions with automatic currency pair normalization (uppercase), color-coded profit/loss feedback (green/red), and remove trades instantly with automatic dashboard recalculation.
🌙 Interactive User Guide: Built-in informational modal accessible through a moon icon, providing step-by-step guidance on how to use the application.
🛠️ Architecture & Technologies

The goal of this project was to build a fast, lightweight, and high-performance application without relying on heavy front-end frameworks.

HTML5: Semantic structure optimized for accessibility and efficient DOM manipulation.
CSS3 (Variables & Grid): Modern dark-themed interface built with CSS variables for maintainability, CSS Grid for responsive layouts, and Flexbox for dynamic UI components.
Modern JavaScript (ES6+):
Safe and asynchronous script initialization using DOMContentLoaded.
Advanced manipulation of complex object arrays.
Extensive use of native array methods:
.reduce() for cumulative calculations.
.filter() for statistics and trade deletion.
.forEach() for dynamic rendering.
Chart.js: Interactive charts rendered using the HTML5 <canvas> API.
📂 Project Structure
├── index.html      # Application structure and CDN integrations
├── style.css       # Dark theme styling and responsive layout
├── dashboard.js    # Application logic (calculations, charts, local storage)
└── README.md       # Project documentation
