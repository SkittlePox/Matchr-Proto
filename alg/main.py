import json
import os
from fire_query import *
from Profile import *
from queue import PriorityQueue
import requests

def main():
    users = retrieveUsers() # list of user Profile objects
    # print(users[0])
    # for i in range(0, 101):
    #     print(i, sigmoidalPopularityScore(i))
    # print(list(map(lambda x: x.name, users)))
    b = users[1]
    c = users[3]
    print(b.similarity(c))
    # print(b.similarity(users[2]))
    # print(get_matches(b, users))
    # print(get_matches(b, users))
    # populateMatches(users)
    # print(users[4].matches)

def postMatches(users):
    url = ""
    for u in users:
        data = {"matches": str(u.matches)}
        r = requests.post(url, data)

def populateMatches(users):
    def popMatch(t):
        t.matches = list(map(lambda x: x.id, get_matches(t, users)))
    for u in users:
        popMatch(u)

def get_matches(target, users):
    max_size = 2
    matches = PriorityQueue()    ## max is 2 (6)
    for u in users:
        if not target.id == u.id:
            if matches.qsize() < max_size:
                matches.put((target.similarity(u), u))
            else:
                min_score = matches.get()
                sim_score = target.similarity(u)
                if sim_score > min_score[0]:
                    matches.put((sim_score, u))
                else:
                    matches.put(min_score)

    ls = list(map(lambda x: (x[0], str(x[1])), list(matches.queue)))
    ls.reverse()
    return ls

if __name__ == "__main__":
    main()
