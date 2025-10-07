# Invoicing ROI Simulator (HTML + Flask + SQLite)

Lightweight single-page app that simulates ROI, payback and savings when switching from manual to automated invoicing.
This deliverable matches the 3-hour PRD: frontend (HTML/JS/CSS), backend (Flask), SQLite persistence, scenario CRUD,
and an email-gated HTML report generator.

## Quick start (Local)

Requirements:
- Python 3.8+
- pip

1. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate    # macOS/Linux
   venv\\Scripts\\activate     # Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Initialize DB (creates `db.sqlite` and sample data):
   ```bash
   python init_db.py
   ```

4. Run the Flask app:
   ```bash
   python app.py
   ```

5. Open the frontend in your browser:
   ```
   http://127.0.0.1:5000/
   ```

## What’s included
- `app.py` - Flask backend with endpoints: `/simulate`, `/scenarios`, `/scenarios/<id>`, `/report/generate`
- `static/index.html` - Single-page frontend that talks to API
- `static/style.css` - Basic styling
- `static/app.js` - Frontend JS logic
- `templates/report_template.html` - HTML report template
- `db.sqlite` - created at runtime; `init_db.py` will create sample scenarios
- `requirements.txt` - Python deps
- `README.md` - This file

## Notes
- Server-side internal constants (automated cost, bias factors, etc.) are stored in `app.py` and NEVER exposed to the client.
- Reports are HTML snapshots and require an email before generation (lead capture). The app saves leads into the DB.
- This project favors automation (bias factor applied) as requested in PRD.

If you want a PDF report instead of HTML, install `pdfkit` and `wkhtmltopdf` and modify `generate_report` in `app.py`.
