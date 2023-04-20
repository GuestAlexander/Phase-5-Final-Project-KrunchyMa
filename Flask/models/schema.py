from werkzeug.security import generate_password_hash, check_password_hash

from db import db

from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True,
                         unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    tips = db.relationship('Tips', backref='users', lazy='dynamic')

    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


class Tips(db.Model):
    __tablename__ = 'tips'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    desc = db.Column(db.TEXT)

    @property
    def serialized(self):
        """Return object data in serializeable format"""
        return {'id': self.id, 'desc': self.desc}


class Category(db.Model):
    tablename = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), unique=True, nullable=False)
    tips = db.relationship('Tips', backref='category', lazy='dynamic')

    def repr(self):
        return f'<Category {self.name}>'

    @property
    def serialized(self):
        """Return object data in serializeable format"""
        return {'id': self.id, 'name': self.name}


class Comment(db.Model):
    tablename = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tip_id = db.Column(db.Integer, db.ForeignKey('tips.id'))
    content = db.Column(db.TEXT, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    @property
    def serialized(self):
        """Return object data in serializeable format"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tip_id': self.tip_id,
            'content': self.content,
            'timestamp': self.timestamp.isoformat()
        }
