from flask import Flask
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from api.tips import tips_
from api.user import user_auth
from db import db

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.register_blueprint(user_auth, url_prefix='/api/v1/user')
app.register_blueprint(tips_, url_prefix='/api/v1/tips')

# extensions

db.init_app(app)
migrate = Migrate(app, db)
auth = HTTPBasicAuth()
jwt = JWTManager(app)

