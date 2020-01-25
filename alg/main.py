import json

def main():
    txtfiles = ["austen", "becky", "ben", "dante", "gary", "neil"]
    allData = {}
    for name in txtfiles:
        with open(name+ '.txt') as json_file:
            data = json.load(json_file)
            allData.update({name: data})
    # print(allData)
    z = setSimilarity(allData["neil"], allData["dante"])
    print(z)

def setSimilarity(entry1, entry2):
    set1 = set(list(map(lambda x: x[0], entry1)))
    set2 = set(list(map(lambda x: x[0], entry2)))
    z = set1.intersection(set2)
    return z


if __name__ == "__main__":
    main()
