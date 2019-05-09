from flask import render_template, request
from app import app
import psycopg2

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")
    else:
        column,parameter = request.form.get("param").split(":")
        data_out = get_data_from_db(f"SELECT * FROM country WHERE {column} = '{parameter}' ORDER BY name;")
        return render_template("result.html", rows=data_out, display_text=parameter)

# Routes
@app.route("/country")
def country():
    all_countries = get_data_from_db("SELECT name FROM country ORDER BY name;")
    return render_template("options.html", options=all_countries, display_text="Countries", column="name")

@app.route("/continent")
def continent():
    all_continents = get_data_from_db("SELECT DISTINCT continent from country ORDER BY continent;")
    return render_template("options.html", options=all_continents, display_text="Continents", column="continent")

@app.route("/region")
def region():
    all_regions = get_data_from_db("SELECT DISTINCT region from country ORDER BY region;")
    return render_template("options.html", options=all_regions, display_text="Regions", column="region")

@app.route("/governmentform")
def governmentform():
    all_govt_forms = get_data_from_db("SELECT DISTINCT governmentform from country ORDER BY governmentform;")
    return render_template("options.html", options=all_govt_forms, display_text="Governments", column="governmentform")


# Non Routing Methods
def get_data_from_db(stmt):
    try:
        conn = psycopg2.connect(
            user="yasiro01", host="knuth.luther.edu", port=5432, dbname="world"
        )
    except:
        raise ConnectionError("could not connect to the database")
    cur = conn.cursor()
    cur.execute(stmt)
    rows = cur.fetchall()
    return rows
