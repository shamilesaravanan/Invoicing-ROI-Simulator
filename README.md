🧾 Invoicing ROI Simulator

A full-stack ROI calculator that helps businesses visualize cost savings, payback period, and ROI when switching from manual to automated invoicing.

🎯 Purpose

This project simulates and compares manual vs automated invoice processing to demonstrate the financial advantage of automation.
It allows users to:

Input basic business metrics

Instantly view ROI, monthly savings, and payback period

Save and reload multiple simulation scenarios

Generate a downloadable PDF report (email required)

Goal: Deliver a complete working prototype (frontend + backend + database + PDF generation) in 3 hours.

⚙️ Tech Stack
Layer	Technology	Description
Frontend	React.js (Vite)	Fast, modern UI framework
Styling	Tailwind CSS	Clean, responsive design
Backend	Node.js + Express.js	REST API server
Database	SQLite (better-sqlite3)	Store simulation scenarios and leads
Validation	Joi	Input validation for API data
PDF Generation	Puppeteer	Generate PDF reports from HTML
HTTP Communication	Fetch API	Frontend ↔ Backend requests
CORS	Express Middleware	Allow cross-origin requests
Dev Tools	Vite, Nodemon	Fast builds and live reload
Deployment	Render (Backend) + Vercel (Frontend)	Optional cloud hosting
