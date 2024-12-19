"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/test', methods=['GET'])
def test():
    return jsonify({"msg": "OK"}), 200

@api.route('/register', methods=['POST'])
def register():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": 'Todos los datos son necesarios'}), 400

    if not isinstance(email, str) or not isinstance(password, str):
        return jsonify({"msg": "Datos inválidos"}), 400
    
    exists = Users.query.filter_by(email=email).first()
    if exists:
        return jsonify({"msg": 'El correo ya existe!'}), 409
    
    hashed_password = generate_password_hash(password)
    new_user = Users(
        email=email,
        password=hashed_password,
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=str(new_user.id), additional_claims={"email": email})
    return jsonify({"msg": 'Usuario registrado exitosamente', "user_id": new_user.id, "token": token}), 201


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Todos los datos son necesarios"}), 400

    if not isinstance(email, str) or not isinstance(password, str):
        return jsonify({"msg": "Datos inválidos"}), 400

    user = Users.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        # Mensaje genérico para evitar enumeración de usuarios
        return jsonify({"msg": "Credenciales inválidas"}), 401

    token = create_access_token(identity=str(user.id), additional_claims={"email": email})
    return jsonify({"msg": "Inicio de sesión exitoso", "user_id": user.id, "token": token}), 200
