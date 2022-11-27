from flask import Blueprint, render_template
from flask_login import login_required, current_user

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/profile')
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