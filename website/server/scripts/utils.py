import re, string
def validate_password(password):
    # min length is 8 and max length is 25
    # at least include a digit number,
    # at least a upcase and a lowcase letter
    # at least a special characters
    if len(password) < 8 or len(password) > 25:
        print("Make sure your password is at lest 8 letters")
        return False
    elif re.search('[0-9]',password) is None:
        print("Make sure your password has a number in it")
        return False
    elif re.search('[A-Z]',password) is None: 
        print("Make sure your password has a upcase letter in it")
        return False
    elif re.search('[a-z]',password) is None:
        print("Make sure your password has a lowcase letter in it")
        return False
    elif re.search('[^a-zA-Z0-9]',password) is None:
        print("Make sure your password has a special character in it")
        return False 
    else:
        print("Your password seems fine")
        return True
    

def validate_email(email):
 
    if(re.fullmatch(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', email)):
        return True
 
    else:
        return False

def validate_username(username):
    # The username is between 4 and 25 characters.
    # It must start with a letter.
    # It can only contain letters, numbers, and the underscore character.
    # It cannot end with an underscore character.
    match=string.ascii_letters + string.digits + '_'
    if not all([x in match for x in username]):
        return False
    if not (len(username) >=4 and len(username) <=25):
        return False
    if not username[0].isalpha():
        return False
    if username[-1:] == '_':
        return False
    return True
    