import requests
import json
from flask import render_template, request, abort
from app import app
import hashlib

useragent = {'User-Agent' : 'LutherCollege'}
email_request_url = 'https://haveibeenpwned.com/api/v2/breachedaccount/'
password_request_url = 'https://api.pwnedpasswords.com/range/'

@app.route('/')
def home():
    return render_template('index.html', home=True)

@app.route('/search', methods=["POST"])
def search():
    email = request.form.get("email")
    raw_password = request.form.get("password")
    password = hashlib.sha1(raw_password.encode('utf-8')).hexdigest() if raw_password else None

    password_response = None
    email_response = None
    error = None

    if email:
        email_response = get_email(email)
    if password:
        password_response = get_password(password)

    if not (password_response or email_response):
        error = "Please enter either (or both) email or password to begin"

    return render_template('index.html', email=email_response, password=password_response, error=error, search=True)

def get_request(url, parameter):
    rqst = requests.get(url+parameter, headers=useragent, verify=True)
    return rqst

def get_email(address):
    response = get_request(email_request_url, address)
    status = int(response.status_code)
    breaches = []
    data = {}

    # Verify According to Status
    if status < 300:
        data_in = response.content.decode('utf-8','ignore')
        breaches = json.loads(data_in)
        content = []
        for raw in breaches:
            
            breach = {
                'name': raw['Name'],
                'domain': raw['Domain'],
                'date': raw['BreachDate'],
                'scope' : '{:,}'.format(raw['PwnCount']),
                'types': ', '.join(raw['DataClasses']),
                # 'description': raw['Description']
            }

            content.append(breach)
    else:
        content = None
    
    data['content'] = content
    data['pawned'] = status < 400
    data['text'] = f'Warning! Your email has been found in {len(content)} leak(s)' if data['pawned'] \
        else 'No Worries! Your email has not been found in any leaked data' 
    
    return data


def get_password(password):
    rqst = get_request(password_request_url, password[:5])
    match_string = password[5:].upper()

    found = False
    frequency = 0

    for line in rqst.content.decode().split():
        encoded_string, count = line.split(':')
        if match_string == encoded_string:
            found = True
            frequency = count
            break

    data_out = {

        "status":int(rqst.status_code),
        "found":found,
        "frequncy":frequency,
        "text": f'Warning! Your password was found {frequency} times in recent leaks. Consider changing this password' if found\
            else 'No worries! Your password was not found in recent leaks'

    }

    return data_out