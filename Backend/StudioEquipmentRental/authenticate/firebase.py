import firebase_admin
from firebase_admin import credentials
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(BASE_DIR, "firebase_key.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(path)
    firebase_admin.initialize_app(cred)