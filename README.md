# Cultiva

Cultiva is an AI-powered data analysis platform that transforms raw spreadsheet data into meaningful insights, visualizations, and statistical workflows.

Upload your Excel or CSV dataset, and Cultiva will:

- analyze your data intelligently,
- generate key insights,
- create visualizations,
- and provide a ready-to-run R script for deeper statistical analysis.

Built for researchers, analysts, students, and data-driven teams who want fast, intelligent analysis without complex setup.

# Features

- Upload Excel and CSV datasets
- AI-powered dataset analysis using Gemini API
- Automatic insight generation
- Data visualization support
- Smart summaries and trend detection
- Auto-generated R scripts for advanced analysis
- Fast and responsive user experience
- Clean modern UI

# Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Google Gemini API

# ⚙️ Installation

## Clone Repository

```bash
git clone <https://github.com/Nnenna-udefi/cultiva.git>
cd cultiva
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

# ▶️ Run Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:3000
```

---

# 🏗 Production Build

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## Supported File Formats

Cultiva currently supports:

```
csv
.xlsx
.xls
```

## 🤖 How Cultiva Works

1. Upload Dataset

Upload an Excel or CSV file containing your dataset.

2. AI Analysis

Cultiva uses the Gemini API to:

inspect the dataset,
identify trends,
detect patterns,
summarize important findings.

3. Visualization

The platform generates visual insights from the uploaded data.

4. R Script Generation

Cultiva produces a ready-to-run R script for:

- statistical analysis,
- regression,
- hypothesis testing,
- deeper exploratory analysis.
- 📊 Example Use Cases
- Research data analysis
- Laboratory datasets
- Survey analysis
- Business intelligence
- Academic projects
- Sales reporting
- Experimental data interpretation

## 🎨 UI & Design

- Design Style
- Clean dashboard interface
- Modern AI-inspired layout
- Responsive across devices
- Minimal and intuitive user experience
- Styling
- Tailwind CSS utility-first styling
- Responsive layouts
- Soft shadows and rounded cards
- 📱 Responsive Design

## Optimized for:

- Mobile devices
- Tablets
- Desktop screens

# 🚀 Deployment

- [Cultiva](https://cultiva-one.vercel.app/)

Recommended frontend hosting:

- [Vercel](https://vercel.com?utm_source=chatgpt.com)

---

# 🔧 Deploy on Vercel

## Install Vercel CLI

```bash
npm install -g vercel
```

## Deploy

```bash
vercel
```

---

# 🔑 Production Environment Variable

Add this in your Vercel project settings:

```env
GEMINI_API_KEY=your_production_api_key
```

---

# 📌 Future Improvements

- Multi-file analysis
- Exportable reports
- Interactive dashboards
- AI chat assistant for datasets
- Python script generation
- Real-time collaborative analysis
- More chart customization
- Cloud dataset storage

---

# 🤝 Contribution

## Fork the repository

```bash
git fork
```

## Create feature branch

```bash
git checkout -b feature-name
```

## Commit changes

```bash
git commit -m "Added new feature"
```

## Push changes

```bash
git push origin feature-name
```

## Open Pull Request

---

# 📄 License

MIT License

---

# 👨‍💻 Author

- [Nnenna Udefi](https://github.com/Nnenna-udefi)
