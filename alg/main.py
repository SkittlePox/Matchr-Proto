import json
import os

def main():
    data = readArtistData()
    # data = readTrackData()
    # print(data.keys())
    # vals = list(data.values())
    # vvv = list(map(lambda x: [x[0], x[1], popScore(int(x[1]))], vals[0]))
    # print(vvv)
    # print(popSimilarity(vals[3], vals[5]))
    # print(setSimilarity())
    print(popScore(50))

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

def popScore(pop):
    return (110 - pop)/10.0

def popSimilarity(entry1, entry2):
    score = 0
    breakdown = []

    for a in entry1:
        for b in entry2:
            if a[0] == b[0]:
                breakdown.append(a)
                score += popScore(a[1])
    print(breakdown)


if __name__ == "__main__":
    main()
