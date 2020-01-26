import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from Profile import *

def retrieveUsers():
    # Use the application default credentials
    cred = credentials.Certificate("/Users/Benjamin/MTG/HackatBrown2020/auth.json")
    firebase_admin.initialize_app(cred, {
      'projectId': 'musical-buddies',
    })
    db = firestore.client()
    users = db.collection(u'users')
    userItems = list(users.stream())

    def castUser(x):
        id = x.id
        p = x.to_dict()
        artists = json.loads(p['artists'])
        topTracks = json.loads(p['topTracks'])
        allTracks = json.loads(p['allTracks'])
        name = p['name']
        email = p['email']
        return NewProfile(id, name, email, artists, topTracks, allTracks)

    z = list(map(castUser, userItems))
    return z
# print(z[0])




# print(name, email)
# user_jsons = []
# for doc in docs:
#     # print(u'{} => {}'.format(doc.id, doc.to_dict()))
#     print(doc.to_dict())
#     print("\n")
#     doc_json = json.dumps(doc.to_dict())
#     user_jsons.append(doc_json)
