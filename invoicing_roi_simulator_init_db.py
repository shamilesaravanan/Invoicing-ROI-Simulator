import sqlite3, os, json, datetime

DB_PATH = 'db.sqlite'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
    CREATE TABLE IF NOT EXISTS scenarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        payload TEXT,
        created_at TEXT
    )''')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        scenario_name TEXT,
        created_at TEXT
    )''')
    # sample scenario
    sample = {
        "scenario_name": "Q4_Pilot",
        "monthly_invoice_volume": 2000,
        "num_ap_staff": 3,
        "avg_hours_per_invoice": 0.1667,
        "hourly_wage": 30,
        "error_rate_manual": 0.5,
        "error_cost": 100,
        "time_horizon_months": 36,
        "one_time_implementation_cost": 50000
    }
    cur.execute('INSERT INTO scenarios (name, payload, created_at) VALUES (?, ?, ?)',
                (sample['scenario_name'], json.dumps(sample), datetime.datetime.utcnow().isoformat()))
    conn.commit()
    conn.close()
    print('Initialized DB and added sample scenario.')

if __name__ == '__main__':
    init_db()
