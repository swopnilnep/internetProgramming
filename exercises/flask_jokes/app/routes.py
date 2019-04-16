import pyjokes
from flask import render_template, request
from app import app

@app.route('/', methods=["GET"])
def home():
    language = request.args.get("language")
    category = request.args.get("type")
    home = request.args.get("home")
    
    if language and category:
        error = None
        try:
            joke_dict = joke(language=language, category=category)
        except (pyjokes.pyjokes.LanguageNotFoundError\
            ,pyjokes.pyjokes.CategoryNotFoundError):
            joke_dict = invalid_combination_error(language=language, category=category)
            error=True
        return render_template("joke.html", joke=joke_dict, error=error)
    else:
        return render_template("form.html")

def joke(language, category):
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
