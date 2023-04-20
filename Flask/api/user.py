from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import desc

from db import db
from models.schema import User, Tips

user_auth = Blueprint('user_auth', __name__)


@user_auth.route('/signup', methods=["POST"])
def user_signup():
    try:
        username = request.json.get('username', None)
        password = request.json.get('password', None)
        if not username or not password:
            return jsonify({'message': "Username & password are missing"}), 400
        # check if username already exists
        user_ = User.query.filter_by(username=username).first()
        if user_:
            return jsonify({'message': "Username already exists"}), 400
        user = User(username=username)
        user.hash_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User has added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@user_auth.route("/login", methods=["POST"])
def user_login():
    try:
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({'message': "Username & password are missing"}), 400
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message": "User doesn't exists"}), 404
        if not user or not user.verify_password(password):
            return jsonify({"message": "Bad username or password"}), 400
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@user_auth.route("/tips", methods=["GET"])
@jwt_required()
def tips():
    try:
        current_user = get_jwt_identity()
        user_id = User.query.filter_by(username=current_user).first()
        return jsonify({'data': [result.serialized for result in
                                 Tips.query.filter_by(user_id=user_id.id).order_by(desc(Tips.id))]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
