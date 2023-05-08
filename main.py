import os
from sqlalchemy import desc
from sqlalchemy import func
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


if __name__ == '__main__':
  app.run(port=5000)



class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False)
    works = db.Column(db.Integer, nullable=False)
    group = db.Column(db.Integer, nullable=False)
    subject =  db.Column(db.String(64), nullable=False)
    priority =  db.Column(db.Integer)
    # date = db.Column(db.Integer, nullable=False)

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
    type = request.form.get('type')
    short_subject = request.form.get('subject')
    if type == "up":
        type = "По возрастанию"
        select = Students.query.filter(Students.group == group, Students.subject == short_subject).order_by(Students.works, desc(Students.priority)).all() 
        stud = Students.query.filter(Students.group == group, Students.subject == short_subject).order_by(Students.works, desc(Students.priority)).all() 
        # select = Students.query.filter(Students.group == group, Students.subject == short_subject).order_by(func.random()).all() 
        
    else:
        type = "По убыванию"
        select = Students.query.filter(Students.group == group, Students.subject == short_subject).order_by(desc(Students.works), desc(Students.priority)).all() 
        stud = Students.query.filter(Students.group == group, Students.subject == short_subject).order_by(Students.works, desc(Students.priority)).all() 
    sub = Subjects.query.filter(Subjects.subject == short_subject).first()
    sub = sub.string
    for i in range(0, len(select)):
        select[i] = f"{i+1}) {select[i].username} - выполнено: {select[i].works}"
        stud[i] = f"приоритет: {stud[i].priority}"
    select.extend([""] * 30)
    stud.extend([""] * 30)
    
    return render_template('queue.html', select=select, subject=sub, type=type, group=group, plus=f"plus-{sub}-{type}-{group}-", minus=f"minus-{sub}-{type}-{group}-", student=stud)

@app.route("/remove_priority", methods=['GET', 'POST'])
def remove_priority():
    group = request.form['group']
    subject = request.form['subject']
    subject = Subjects.query.filter(Subjects.string == subject).first()
    subject = subject.subject
    remove_priority = Students.query.filter(Students.group == group, Students.subject == subject).all() 
    for i in remove_priority:
        # print(i)
        # print(i.priority)
        # # select.works=od[x]
        i.priority = 0
    db.session.commit()  
    return render_template('queue.html', select="", subject='', type='', group='', student="")

@app.route("/change", methods=['GET', 'POST'])
def change():
    radio = []
    for i in range(1, 30):
        radio.append(request.form.getlist(f"group{i}"))
    print(radio)
    if request.method == 'POST':
        for i in radio:
            for m in i:
                m = m.split("-")
                m[4] = m[4].split(")")[1][1:-1]
                sub = Subjects.query.filter(Subjects.string == m[1]).first()
                m[1] = sub.subject
                print(i)
                select = Students.query.filter(Students.group == int(m[3]), Students.subject == m[1], Students.username == m[4]).first()
                print(select)
                if m[0][0] == 'p':
                    select.works=(select.works + 1)
                    select.priority = 0
                elif m[0][0] == 'm':
                    if select.works == 0:
                        pass
                    else:
                        select.works=(select.works - 1)
        select2 = Students.query.filter(Students.group == int(m[3]), Students.subject == m[1]).all()
        print(select2)
        for i in select2:
            i.priority += 1
        db.session.commit()  
    # for i in range(0, len(select)):
    #     select[i] = f"{i+1}) {select[i].username} - выполнено: {select[i].works}"
    # return render_template('queue.html', select=select, subject=argument[1], type=argument[2], group=argument[3], plus=f"plus-{argument[1]}-{type}-{group}-", minus=f"minus-{sub}-{type}-{group}-")
    return render_template('queue.html', select="", subject='', type='', group='', student="")

@app.route("/upload", methods=['GET', 'POST'])
def upload():
    # if request.method == 'POST':
    upload_file()
    make_list()
    list_to_dict()
    dict_to_db()
    return render_template('queue.html', select="", subject='', type='', group='', plus="", minus="", student="")

def upload_file():
    the_file = request.files['file']
    the_file.save(f'uploads/the_file.txt')

def make_list():
    the_file = open("uploads/the_file.txt", encoding='utf-8', mode='r')
    data = the_file.read()
    data_list = data.split("\n")
    the_file.close()
    info = data_list[0:2]
    names = data_list[2:]
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
        select = Students.query.filter(Students.group == int(info[1]), Students.subject == info[0], Students.username == x).first() 
        if select is None:
            w = Students(username=x, works=od[x], group=int(info[1]), subject=info[0], priority=0)
            db.session.add(w)
        else:
            select.works=od[x]
            select.group=int(info[1])
            select.subject=info[0]
    
    db.session.commit()    

@app.route("/queue.html")
def opener():  
    return render_template('queue.html', select="", subject='', date='', group='', student="")  
           
if __name__ == "__main__":
    app.run(debug=True)
