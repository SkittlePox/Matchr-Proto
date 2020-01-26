import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

# Use the application default credentials
cred = credentials.Certificate("C:\\Users\\CodeB\\Downloads\\musical-buddies-firebase-adminsdk-juqly-4d874c5941.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'musical-buddies',
})

db = firestore.client()

# /users-top-artists/kasaract

users = db.collection(u'users')
docs = users.stream()
for doc in docs:
    # print(u'{} => {}'.format(doc.id, doc.to_dict()))
    print(doc.to_dict())
    print("\n")
    doc_json = json.dumps(doc.to_dict())
