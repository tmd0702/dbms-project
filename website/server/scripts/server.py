from flask import Flask, request, jsonify
import codecs
import cx_Oracle
from flask_cors import CORS, cross_origin
import datetime
from utils import *
import json
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

db_login = {
'user_manager': {
    'username': 'user_manager',
    'password': 'sa123456'
},
'knowledge_manager': {
    'username': 'knowledge_admin',
    'password': 'sa123456'
},
'dns': 'localhost:1521/orcl',
'encoding': 'UTF-16'
}

try:
    um_connection = cx_Oracle.connect(db_login['user_manager']['username'],
                                db_login['user_manager']['password'],
                                db_login['dns'],
                                encoding=db_login['encoding'])
    um_cursor = um_connection.cursor()
except cx_Oracle.Error as error:
    print('Error occurred:')
    print(error)
    raise error

try:
    km_connection = cx_Oracle.connect(db_login['knowledge_manager']['username'],
                                db_login['knowledge_manager']['password'],
                                db_login['dns'],
                                encoding=db_login['encoding'])
    km_cursor = km_connection.cursor()
except cx_Oracle.Error as error:
    print('Error occurred:')
    print(error)
    raise error

@app.route('/login')
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    if validate_username(username) and validate_password(password):

        sql = ('select password from register where id = :username')

        um_cursor.execute(sql, username = username)
        db_password = um_cursor.fetchone()
        print(db_password[0], password)
        if password != db_password[0]:
            return 'login failed, pls sign up'

        # commit work
        um_connection.commit()
        return 'login success'
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

    um_cursor.execute(sql, [username, last_name, first_name, password, gender, dob, phone, email])
    # commit work
    um_connection.commit()

    return 'sign up success'

@app.route('/add-chapter')
def add_chapter():
    chapter_title = request.args.get('chapter_title')
    sql = ("insert into chapter(title) "
    "values(:chapter_title)")
    km_cursor.execute(sql, [chapter_title])
    # commit work
    km_connection.commit()

    return 'add chapter success'

@app.route('/add-lesson')
def add_lesson():
    lesson_title = request.args.get('lesson_title')
    chapter_id = request.args.get('chapter_id')

    sql = ("insert into lesson(title, chapter_id) "
    "values(:lesson_title, :chapter_id)")
    km_cursor.execute(sql, [lesson_title, chapter_id])
    # commit work
    km_connection.commit()

    return 'add lesson success'

@app.route('/add-knowledge')
def add_knowledge():
    pass

@app.route('/chapter-list')
def get_chapter_list():
    sql = 'SELECT * FROM CHAPTER'
    # execute the insert statement
    km_cursor.execute(sql)
    km_cursor.rowfactory = lambda *args: dict(zip([d[0] for d in km_cursor.description], args))
    chapter_list = km_cursor.fetchall()
    print(chapter_list)
    # commit work
    km_connection.commit()

    return json.dumps(chapter_list)

@app.route('/chapter-lesson-list')
def get_lesson_list_with_chapter_id():
    chapter_id = request.args.get('chapter_id')
    sql = ("SELECT * FROM LESSON WHERE CHAPTER_ID = :chapter_id")
    km_cursor.execute(sql, [chapter_id])
    km_cursor.rowfactory = lambda *args: dict(zip([d[0] for d in km_cursor.description], args))
    lesson_list = km_cursor.fetchall()
    # commit work
    km_connection.commit()

    return json.dumps(lesson_list)


@app.route('/delete-lesson')
def delete_lesson():
    lesson_id = request.args.get('lesson_id')
    sql = ("DELETE FROM LESSON WHERE ID = :lesson_id")
    try:
        km_cursor.execute(sql, [lesson_id])
        km_connection.commit()
        return "delete lesson success"
    except cx_Oracle.Error as error:
        print('Error occurred:')
        print(error)
        raise error

@app.route('/delete-chapter')
def delete_chapter_with_chapter_id():
    chapter_id = request.args.get('chapter_id')
    delete_lesson_sql = ("DELETE FROM LESSON WHERE CHAPTER_ID = :chapter_id")
    delete_chapter_sql = ("DELETE FROM CHAPTER WHERE ID = :chapter_id")
    try:
        km_cursor.execute(delete_lesson_sql, [chapter_id])
        km_connection.commit()
        print("delete lesson success")
    except cx_Oracle.Error as error:
        print('Error occurred:')
        print(error)
        raise error
    try:
        km_cursor.execute(delete_chapter_sql, [chapter_id])
        km_connection.commit()
        return "delete chapter success"
    except cx_Oracle.Error as error:
        print('Error occurred:')
        print(error)
        raise error

    
app.run(debug=False, port=8081)