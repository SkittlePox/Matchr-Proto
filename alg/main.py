import json
import os
from fire_query import *
from Profile import *

def main():
    # data = readTrackData()
    # data = readArtistData()
    # profiles = []
    # for k, v in data.items():
    #     prof = Profile(k.split("/")[-1], v)
    #     profiles.append(prof)
    #
    # print(profiles[0])
    # u1 = profiles[4]
    # u2 = profiles[1]
    #
    # for i in range(0, len(profiles)):
    #     print(profiles[i], u1.popSimilarity(profiles[i]))
    users = retrieveUsers() # list of user Profile objects
    # print(users[0])
    # for i in range(0, 101):
    #     print(i, sigmoidalPopularityScore(i))
    # print(list(map(lambda x: x.name, users)))
    b = users[1]
    c = users[3]
    print(b.similarity(c))


def multitest(entries):
    for a in entries:
        for b in entries:
            if a is not b:
                print(popSimilarity(a, b))


def readArtistData():
    directory = "/Users/Benjamin/MTG/HackatBrown2020/Matchr/alg/data/topartists"
    files = []
    # r=root, d=directories, f = files
    for r, d, f in os.walk(directory):
        for file in f:
            if '.txt' in file:
                files.append(os.path.join(r, file))
    data = {}
    for f in files:
        with open(f) as json_file:
            subdata = json.load(json_file)
            data.update({f: subdata})
    return data

def readTrackData():
    directory = "/Users/Benjamin/MTG/HackatBrown2020/Matchr/alg/data/toptracks"
    files = []
    # r=root, d=directories, f = files
    for r, d, f in os.walk(directory):
        for file in f:
            if '.txt' in file:
                files.append(os.path.join(r, file))
    data = {}
    for f in files:
        with open(f) as json_file:
            subdata = json.load(json_file)
            data.update({f: subdata})
    return data

def setSimilarity(entry1, entry2):
    #[[song, pop], [song,pop]]
    set1 = set(list(map(lambda x: x[0], entry1)))
    set2 = set(list(map(lambda x: x[0], entry2)))
    z = set1.intersection(set2)
    return z

def popSimilarity(entry1, entry2):
    score = 0
    breakdown = []

    for a in entry1:
        for b in entry2:
            if a[0] == b[0]:
                breakdown.append(a)
                score += popScore(a[1])
    return score


if __name__ == "__main__":
    main()
