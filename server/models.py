from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)



class User(db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    _password = Column("password", String(255), nullable=False)
    articles = relationship("Article", secondary="user_article", back_populates="users")

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext):
        self._password = generate_password_hash(plaintext)

    def check_password(self, plaintext):
        return check_password_hash(self._password, plaintext)

class UserArticle(db.Model):
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    article_id = Column(Integer, ForeignKey('article.id'), primary_key=True)
    relationship_type = Column(String(50), nullable=False)

    user = relationship("User", back_populates="articles")
    article = relationship("Article", back_populates="users")



class Article(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    category_id = Column(Integer, ForeignKey('category.id'))
    
    category = relationship("Category", back_populates="articles")
    users = relationship("User", secondary="user_article", back_populates="articles")

class Category(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    
    articles = relationship("Article", back_populates="category")

# Create tables
