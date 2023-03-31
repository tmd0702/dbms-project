from flask import Flask, request, jsonify
import codecs
import cx_Oracle
from flask_cors import CORS, cross_origin
import datetime
from utils import *
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

db_login = {
'user_manager': {
    'username': 'user_manager',
    'password': 'sa123456'
},
'knowledge_manager': {
    'username': 'knowledge_manager',
    'password': 'sa123456'
},
'dns': 'localhost:1521/orcl',
'encoding': 'UTF-16'
}

@app.route('/login')
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    if validate_username(username) and validate_password(password):

        sql = ('select password from register where id = :username')

        try:
            with cx_Oracle.connect(db_login['user_manager']['username'],
                            db_login['user_manager']['password'],
                            db_login['dns'],
                            encoding=db_login['encoding']) as connection:
            # create a cursor
                with connection.cursor() as cursor:
                    # execute the insert statement
                    cursor.execute(sql, username = username)
                    db_password = cursor.fetchone()
                    print(db_password[0], password)
                    if password != db_password[0]:
                        return 'login failed, pls sign up'

                    # commit work
                    connection.commit()
                    return 'login success'
    
        except cx_Oracle.Error as error:
            print('Error occurred:')
            print(error)
            raise error
    else:
        return "Login failed"


@app.route('/signup')
def sign_up():
    username = request.args.get('username')
    password = request.args.get('password')
    last_name = request.args.get('last_name')
    first_name = request.args.get('first_name')
    password = request.args.get('password')
    dob = request.args.get('dob')
    gender = request.args.get('gender')
    phone = request.args.get('phone')
    email = request.args.get('email')

    if not validate_username(username):
        raise Exception('Username error')
    if not validate_password(password):
        raise Exception('Password error')
    if not validate_email(email):
        raise Exception('Email error')

    sql = ("insert into register(id, last_name, first_name, password, gender, dob, phone, email) "
    "values(:username,:last_name,:first_name,:password, :gender, TO_DATE(:dob, 'YYYY-MM-DD'), :phone, :email)")
    print(sql, [username, last_name, first_name, password, gender, dob, phone, email])
    print(datetime.datetime.now())
    try:
        with cx_Oracle.connect(db_login['user_manager']['username'],
                            db_login['user_manager']['password'],
                            db_login['dns'],
                            encoding=db_login['encoding']) as connection:
        # create a cursor
            with connection.cursor() as cursor:
                # execute the insert statement
                cursor.execute(sql, [username, last_name, first_name, password, gender, dob, phone, email])
                # commit work
                connection.commit()

                return 'sign up success'

    except cx_Oracle.Error as error:
        print('Error occurred:')
        print(error)
        raise error

@app.route('/add-chapter')
def add_chapter():
    pass

@app.route('/add-lesson')
def add_lesson():
    pass

@app.route('/add-knowledge')
def add_knowledge():
    pass


app.run(debug=False, port=8081)