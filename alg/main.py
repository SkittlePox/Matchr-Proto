import json

def main():
    # txtfiles = ["austen", "becky", "ben", "dante", "gary", "neil"]
    # allData = {}
    # for name in txtfiles:
    #     with open(name+ '.txt') as json_file:
    #         data = json.load(json_file)
    #         allData.update({name: data})
    # # print(allData)
    # z = setSimilarity(allData["neil"], allData["dante"])
    # print(z)
    vectorize_users()

def setSimilarity(entry1, entry2):
    set1 = set(list(map(lambda x: x[0], entry1)))
    set2 = set(list(map(lambda x: x[0], entry2)))
    z = set1.intersection(set2)
    return z

def vectorize_users():
    dicts = []
    # danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration_ms
    with open("becky_features.txt") as f:
        dicts = eval(f.read())
    danceability = 0
    energy = 0
    loudness = 0
    speechiness = 0
    acousticness = 0
    instrumentalness = 0
    liveness = 0
    valence = 0
    tempo = 0
    duration_ms = 0
    for dict in dicts:


if __name__ == "__main__":
    main()
