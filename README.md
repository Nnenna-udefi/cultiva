File Upload & Parsing — Securely upload Excel (via OpenPyxl or SheetJS) or CSV files via drag-and-drop. The backend will parse and prepare the data for analysis.
Data Preview — Display a tabular preview of the uploaded data to allow users to verify its structure and content before proceeding with analysis.
Automated Summarization — The backend will process the uploaded data using Pandas to generate key summary statistics and preliminary insights.
Interactive Data Visualizations — Display relevant charts and visualizations (e.g., histograms, bar charts, box plots) generated from the summary data using Chart.js, Recharts, or Plotly.js.
Generative R Script Tool
— Leverage a generative AI tool to interpret the analyzed data (e.g., lab sensitivity results) and suggest an appropriate R design (script) for further, in-depth analysis.
R Script Display & Download — Present the generated R script in a syntax-highlighted editor, allowing users to review, copy, and download the R code for execution.
Color
Layout
Employ a responsive, dashboard-like layout using Tailwind CSS, featuring distinct panels for data upload, summary visualizations, and R script generation, optimized for clarity and user flow.
Typography
Headline and body font: 'Inter' (sans-serif) for its modern, clear, and objective readability across all content. Code font: 'Source Code Pro' (monospace sans-serif) specifically for displaying R script snippets with excellent legibility.
Iconography
Use clear, minimalistic line icons that convey actions related to file management, data analysis, and coding, consistent with a clean technical aesthetic.
Animation
Incorporate subtle loading animations and transitions to provide feedback during file uploads, data processing, and R script generation, enhancing the user experience.
AI
Gemini, Genkit
Gemini: A powerful AI model capable of understanding and generating various forms of input, including text, code, audio, images, and video. Learn more
Genkit: An open-source framework from Google that provides a unified API to access AI models and streamlines AI logic, tool use, image generation, and more. Learn more
UI
TypeScript, NextJS, Tailwind CSS
TypeScript: A popular programming language that adds type safety to JavaScript.
NextJS: A popular web framework built on React with support for client- and server-side rendering.
Tailwind CSS: A popular CSS framework that lets you style components inline with your HTML and maintain UI consistency across your app.
