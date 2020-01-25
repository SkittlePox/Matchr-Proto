import json
import os

def main():
    # txtfiles = ["austen", "becky", "ben", "dante", "gary", "neil"]
    # allData = {}
    # for name in txtfiles:
    #     with open("data/"+name+ '.txt') as json_file:
    #         data = json.load(json_file)
    #         allData.update({name: data})
    # # print(allData)
    # z = setSimilarity(allData["neil"], allData["dante"])
    # print(z)
    data = readArtistData()
    # print(setSimilarity())

def readArtistData():
    directory = "/Users/Benjamin/MTG/HackatBrown2020/Matchr/alg/data/topartists"
    files = []
    # r=root, d=directories, f = files
    for r, d, f in os.walk(directory):
        for file in f:
            if '.txt' in file:
                files.append(os.path.join(r, file))
    data = []
    for f in files:
        with open(f) as json_file:
            subdata = json.load(json_file)
            data.append(subdata)
    return data


def setSimilarity(entry1, entry2):
    set1 = set(list(map(lambda x: x[0], entry1)))
    set2 = set(list(map(lambda x: x[0], entry2)))
    z = set1.intersection(set2)
    return z


if __name__ == "__main__":
    main()
