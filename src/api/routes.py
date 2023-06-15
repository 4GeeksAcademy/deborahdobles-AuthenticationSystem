"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route('/signup', methods=['POST'])
# def user_signup():
#     body = request.json
#     new_user = User(
#         email=body["email"],
#         password=body["password"],
#         is_active=body["is_active"],
#         type_id=body["user_type"]
#     )
#     db.session.add(new_user)
#     db.session.commit()
#     response_body = {"Users": "User created successfully"}

#     return jsonify(response_body), 200


# @api.route('/user', methods=['GET'])
# def get_users():
#     all_users = User.query.all()
#     result = list(map(lambda item: item.serialize(), all_users))
#     return jsonify(all_users), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    print(user)

    if user == None:
        return jsonify({"msg": "could not find user with email"}), 401
 
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)