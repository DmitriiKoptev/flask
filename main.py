import os
import collections
from flask import Flask, render_template, request, send_from_directory, url_for, flash, redirect
import pathlib
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)



class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False)
    works = db.Column(db.Integer, nullable=False)
    group = db.Column(db.Integer, nullable=False)
    subject =  db.Column(db.String(64), nullable=False)
    date = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Student {self.username}"

class Subjects(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(64), nullable=False)
    string = db.Column(db.String(64), nullable=False)

    def __repr__(self):
        return f"Subject {self.string}"

with app.app_context():
    db.create_all()

@app.route("/")
@app.route("/index.html")
def index():
    return render_template('index.html')

@app.route("/info.html")
def info():
    return render_template('info.html')

@app.route("/materials.html")
def materials():
    return render_template('materials.html')

@app.route("/values", methods=['GET', 'POST'])
def values():
    group = request.form.get('group')
    date = request.form.get('date')
    short_subject = request.form.get('subject')
    select = Students.query.filter(Students.group == group, Students.subject == short_subject, Students.date == date).order_by(Students.works).all() 
    # sub = Subjects.query.filter(Subjects.subject == short_subject).first() 
    sub = Subjects.query.filter(Subjects.subject == short_subject).first()
    sub = sub.string
    for i in range(0, len(select)):
        select[i] = f"{i+1}) {select[i].username} - выполнено: {select[i].works}"
    select.extend([""] * 30)
    if date == "1":
        date = "ближайшее"
    elif date == "2":
        date = "следующее"
    elif date == "3":
        date = "затем"
    return render_template('queue.html', select=select, subject=sub, date=date, group=group)


@app.route("/upload", methods=['GET', 'POST'])
def upload():
    # if request.method == 'POST':
    upload_file()
    make_list()
    list_to_dict()
    dict_to_db()
    return render_template('queue.html', select="", subject='', date='', group='')

def upload_file():
    the_file = request.files['file']
    the_file.save(f'uploads/the_file.txt')

def make_list():
    the_file = open("uploads/the_file.txt", encoding='utf-8', mode='r')
    data = the_file.read()
    data_list = data.split("\n")
    the_file.close()
    info = data_list[0:3]
    names = data_list[3:]
    print(info)
    print(names)
    return [info, names]

def list_to_dict():
    names = make_list()[1]
    d = {}
    for x in names:
        i =  x.split(" -")[0]
        d[i] = int(x.split("- ")[1])
    od = sorted(d.items(), key=lambda x:x[1])
    od = dict(od)    
    return od

def dict_to_db():
    info = make_list()[0]
    od = list_to_dict()
    print(od)
    for x in od:
        select = Students.query.filter(Students.group == int(info[1]), Students.subject == info[0], Students.date == int(info[2]), Students.username == x).first() 
        if select is None:
            w = Students(username=x, works=od[x], group=int(info[1]), subject=info[0], date=int(info[2]))
            print(w)
            db.session.add(w)
        else:
            select.works=od[x]
            select.group=int(info[1])
            select.subject=info[0]
            select.date=int(info[2])
    
    db.session.commit()    

@app.route("/queue.html")
def opener():  
    return render_template('queue.html', select="", subject='', date='', group='')  
           
if __name__ == "__main__":
    app.run(debug=True)
