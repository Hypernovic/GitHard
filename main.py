from flask import Blueprint, render_template
from flask_login import login_required, current_user
from flask import jsonify, request
from files import createUserFolder,createUserRepo
from models import User,Repo,AllowList
from flask_sqlalchemy import SQLAlchemy
from app import db

main = Blueprint('main', __name__)
@main.route('/')
def index():
    return render_template('base.html')

@main.route(f'/{current_user.userName}')
@login_required
def profile():
    return render_template('profile.html', 
    name=current_user.userName,
    pic=current_user.pic,
    bio=current_user.bio)


@main.route('/Editor')
@login_required
def editor():
    return render_template('textEditor.html')

@main.route('/Designer')
@login_required
def designer():
    return render_template('pageGrid.html',name=current_user.userName)

@main.route('/Flasher')
@login_required
def flasher():
    return render_template('arduino.html')


# @main.route('/Flasher')
# @login_required
# def flasher():
#     return render_template('arduino.html')


@main.route('/insertRepo',methods=["POST"])
@login_required
def insertRepo():
    who=current_user.userName
    title=(request.get_json("title")).get('title')
    desc=(request.get_json("desc")).get('desc')
    allowAccess=(request.get_json("allowAccess")).get('allowAccess')
    fname=createUserRepo(who,title)
    if who=="hypernovic":
        no=1
        access=2
    else:
        no=2
        access=1
    db.session.add(Repo(title=title,desc=desc,repoOwner=no,repoLocation=fname))
    last=db.session.query(Repo).order_by(Repo.repoId.desc()).first()
    if allowAccess:
        db.session.add(AllowList(userId=access,repoId=last.repoId))
    db.session.commit()
    return jsonify(status=200)


@main.route('/getRepo',methods=["GET"])
@login_required
def getRepo():
    username=current_user.userName
    userId=User.query.filter_by(userName=username).first().id
    checkquery = Repo.query.filter_by(repoOwner=userId).all()
    userDict = []
    for i in checkquery:
        userDict.append(i.toDict())
    return jsonify({"users":userDict})