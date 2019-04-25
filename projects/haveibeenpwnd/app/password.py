import requests

useragent = {'User-Agent' : 'LutherCollege'}
password_request_url = 'https://api.pwnedpasswords.com/range/'

def get_request(url, parameter):
    rqst = requests.get(url+parameter, headers=useragent, verify=True)
    return rqst

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

    }

    print(match_string)

    return data_out


def main():
    password = "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"
    fd = get_password(password)
    print(fd)

main()