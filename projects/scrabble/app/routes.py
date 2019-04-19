from flask import render_template, request
from app import app
from string import ascii_lowercase
from itertools import groupby
from operator import itemgetter
import timeit
import os

# Global Variables
score_map = dict.fromkeys(['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r', 's', 't'], 1)
score_map.update(dict.fromkeys(['d', 'g'], 2))
score_map.update(dict.fromkeys(['b', 'c', 'm', 'p'], 3))
score_map.update(dict.fromkeys(['f', 'h', 'v', 'w','y'], 4))
score_map.update(dict.fromkeys(['k'], 5))
score_map.update(dict.fromkeys(['j', 'x'], 8))
score_map.update(dict.fromkeys(['q', 'z'], 10)) 
number_of_searches = 0

# Getter and setter method for number_of_searches
def searches():
    return number_of_searches

def addToSearches():
    global number_of_searches 
    number_of_searches += 1

@app.route('/', methods=["GET","POST"])
def home():
    # Get inputs from the client side
    attached = request.args.get("attach")
    language = request.args.get("language")
    sort = request.args.get("sort")
    existing = request.args.get("existing")
    dictionary_path = get_dictionary_path(language)

    # Initialize parametric variables
    start = timeit.timeit()
    error = message = ""
    match_list = []

    # Attach to existing is selected
    if attached:
        # Existing characters are provided
        if existing:
            match_list = match_existing(existing, dictionary_path)
            end = timeit.timeit()

        # Existing characters are not provided
        else:
            error = "Match mode attached but no characters were provided.\
                 Please detatch match or insert existing characters"

    # Attach is not selected
    else:
        # Get selected characters into list
        entered_characters = ""
        for i in range(6): 
            new_character = request.args.get("c"+str(i))
            if new_character != None: entered_characters += new_character

        # No characters are selected
        if entered_characters == "" and searches() > 0:
            error = "No characters selected. Please select characters and try again."
        # One or more chracters are entered
        else:
            # Create match list with selected characters
            match_list = match_characters(entered_characters, dictionary_path)
            end = timeit.timeit()

    if (not error) and (match_list == []): error = "No matches found. Please try another combination"

    if not error: 
        time = round(start - end, 6)
        message = f'{len(match_list)} results in {time} seconds.'
        
        # Sorting options
        if sort: 
            sort = int(sort)
            match_list = sort_by_list_index(match_list, sort)[::-1]

    addToSearches()
    return render_template("index.html", error=error, message=message, dictionary=match_list)

def get_dictionary_path(language):
    '''Setup the dictionary'''
    if language == 'en-us':
        dictionary_path = 'app/data/american-english'
    elif language == 'en-uk':
        dictionary_path = 'app/data/british-english'
    else:
        dictionary_path = 'app/data/american-english'
    return dictionary_path

def sort_by_list_index(list_to_sort, list_index):
    return sorted(list_to_sort, key=itemgetter(list_index))

def match_characters(characters, dictionary_path):
    match_list = []

    '''Setup wildcard counter'''
    initial_length = len(characters)
    characters = characters.replace('*','')
    final_length = len(characters)
    number_of_wildcards =  initial_length - final_length

    '''Test Character matches''' 
    with open(dictionary_path, 'r') as dictionary:

        tester = get_powerset_tester(characters, number_of_wildcards)

        for line in dictionary:
            word = line.strip().lower()
            if tester(word):
                match_list.append(get_values_for_word(word))

    return match_list

def get_values_for_word(word):
    word_score = 0
    for letter in word:
        try:
            word_score += score_map[letter]
        except KeyError:
            pass
    return [word, len(word), word_score]

def get_powerset_tester(keys, number_of_wildcards):
    '''
    Time Complexity: 
        o(n=1) where n is the number of wildcards, 
        o(n) where n is the n is the number of characters
    
    Note: This algorithm uses iterrows groupby to first sort the repeated letters
    then one at a time, it takes the a 'word' from the dictioanry and removes evey letter
    from 'keys' it finds in the 'word'. If the length of the word is (0), it returns 'True'
    as the entire word is a match. For wildcards, it returns 'True' if the length is smaller
    than the number of wildcards'''

    char_groups = [(c, sum(1 for _ in g)) for c, g in groupby(sorted(keys))]
    def tester(target):
        '''For each element, remove element from keys one at a time'''
        for c, num in char_groups:
            target = target.replace(c, '', num)
        return len(target) <= number_of_wildcards
    return tester

def match_existing(text, dictionary_path):
    # Use the match existing algorithm to return a dictionary of words
    match_list = []
    with open(dictionary_path, 'r') as dictionary:
        for line in dictionary:
            word = line.strip().lower()
            if text in word:
                match_list.append(get_values_for_word(word))
    return match_list