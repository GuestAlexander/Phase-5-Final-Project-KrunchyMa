from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import desc

from db import db
from models.schema import User, Tips

tips_ = Blueprint('tips', __name__)


@tips_.route('/add', methods=["POST"])
@jwt_required()
def add_new_tip():
    try:
        desc = request.json.get('desc', None)
        if not desc:
            return jsonify({'error': 'desc can not be null'}), 400
        current_user = get_jwt_identity()
        user_ = User.query.filter_by(username=current_user).first()
        tip = Tips(desc=desc)
        user_.tips.append(tip)
        db.session.add(user_)
        db.session.commit()
        return jsonify({'message': 'Tip added successfully '}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@tips_.route('/get', methods=["GET"])
@tips_.route('/get/<int:tip_id>', methods=["GET"])
@jwt_required()
def get_tips(tip_id=None):
    try:
        if tip_id:
            tip_obj = Tips.query.filter_by(id=tip_id).first()
            return jsonify({'data': tip_obj.serialized})
        return jsonify({'data': [result.serialized for result in Tips.query.order_by(desc(Tips.id))]}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@tips_.route('/update/<int:tip_id>', methods=["PUT"])
@jwt_required()
def update_tip(tip_id):
    try:
        current_user = get_jwt_identity()
        desc = request.json.get('desc', None)
        if not desc:
            return jsonify({'message': 'desc can not be null'}), 400
        user_obj = User.query.filter_by(username=current_user).first()
        tip_id = Tips.query.filter_by(id=tip_id, user_id=user_obj.id).first()
        if not tip_id:
            return jsonify({'message': 'you are not authorize to change any tips expect your own ones'}), 401
        tip_id.desc = desc
        db.session.commit()
        return jsonify({'message': 'Tip updated successfully'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500
