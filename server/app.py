from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Article, Category
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['id']).first()
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return make_response(jsonify({'message': 'All fields are required'}), 400)

    if User.query.filter_by(username=username).first():
        return make_response(jsonify({'message': 'Username already exists'}), 400)

    if User.query.filter_by(email=email).first():
        return make_response(jsonify({'message': 'Email already exists'}), 400)

    new_user = User(username, email, password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return make_response(jsonify({'message': 'All fields are required'}), 400)

    user = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return make_response(jsonify({'message': 'Invalid credentials'}), 401)

    token = jwt.encode({
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({'token': token})

@app.route('/logout')
@token_required
def logout(current_user):
    return jsonify({'message': 'User logged out'})

# Articles routes
@app.route('/articles', methods=['GET'])
@token_required
def get_articles(current_user):
    articles = Article.query.all()
    output = []

    for article in articles:
        article_data = {
            'id': article.id,
            'title': article.title,
            'content': article.content,
            'category_id': article.category_id
        }
        output.append(article_data)

    return jsonify({'articles': output})

@app.route('/articles/<int:article_id>', methods=['GET'])
@token_required
def get_article(current_user, article_id):
    article = Article.query.get_or_404(article_id)
    return jsonify({
        'id': article.id,
        'title': article.title,
        'content': article.content,
        'category_id': article.category_id
    })

@app.route('/articles', methods=['POST'])
@token_required
def create_article(current_user):
    data = request.get_json()
    new_article = Article(title=data['title'], content=data['content'], category_id=data['category_id'])
    db.session.add(new_article)
    db.session.commit()

    return jsonify({'message': 'Article created'}), 201

@app.route('/articles/<int:article_id>', methods=['PUT'])
@token_required
def update_article(current_user, article_id):
    data = request.get_json()
    article = Article.query.get_or_404(article_id)

    article.title = data['title']
    article.content = data['content']
    article.category_id = data['category_id']

    db.session.commit()

    return jsonify({'message': 'Article updated'})

@app.route('/articles/<int:article_id>', methods=['DELETE'])
@token_required
def delete_article(current_user, article_id):
    article = Article.query.get_or_404(article_id)
    db.session.delete(article)
    db.session.commit()

    return jsonify({'message': 'Article deleted'})

# Categories routes
@app.route('/categories', methods=['GET'])
@token_required
def get_categories(current_user):
    categories = Category.query.all()
    output = []

    for category in categories:
        category_data = {
            'id': category.id,
            'name': category.name
        }
        output.append(category_data)

    return jsonify({'categories': output})

@app.route('/categories', methods=['POST'])
@token_required
def create_category(current_user):
    data = request.get_json()
    new_category = Category(name=data['name'])
    db.session.add(new_category)
    db.session.commit()

    return jsonify({'message': 'Category created'}), 201

# ... (previous code)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)


