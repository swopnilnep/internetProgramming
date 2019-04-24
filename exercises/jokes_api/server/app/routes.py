import pyjokes
from flask import render_template, request, jsonify, abort
from flask_cors import cross_origin
from app import app

@app.route("/api/v1/jokes")
@cross_origin()
def api():
    return jsonify(joke=pyjokes.get_joke())

@app.route("/api/v1/jokes/<joke_id>")
@cross_origin()
def api_by_id(joke_id):
    try:
        joke_id = int(joke_id)
        joke = pyjokes.get_jokes()[joke_id]
        return jsonify(joke=joke)
    except (ValueError, IndexError):
        return abort(404)

@app.route('/', methods=["GET"])
def home():
    language = request.args.get("language")
    category = request.args.get("type")
    
    if language and category:
        error = None
        try:
            joke_dict = get_joke_dict(language=language, category=category)
        except (pyjokes.pyjokes.LanguageNotFoundError\
            ,pyjokes.pyjokes.CategoryNotFoundError):
            joke_dict = invalid_combination_error(language=language, category=category)
            error=True
        return render_template("joke.html", joke=joke_dict, error=error)
    else:
        return render_template("form.html")

def get_joke_dict(language, category):
    content = pyjokes.get_joke(language, category)
    
    joke_dict = {
        "language" : language,
        "category"  : category,
        "content" : content
    }

    return joke_dict

def invalid_combination_error(language, category):
    error_dict = {
    "language" : language,
    "category"  : category,
    "content" : "Invalid Combination. Select another combination and try again"
    }

    return error_dict
