import math

ALL_TRACKS_WEIGHT = 1.0
TOP_TRACKS_WEIGHT = 1.0
ARTISTS_WEIGHT = 1.0

def sigmoidalPopularityScore(popScore):
    z = 64.0
    b = 5.0
    a = 12.0
    denom = 1.0+math.exp((popScore/a)-b)
    return z/denom

class NewProfile:
    def __init__(self, id, name, email, artists, topTracks, allTracks):
        self.id = id
        self.name = name
        self.email = email
        ####
        self.artists = artists
        self.topTracks = topTracks
        self.allTracks = allTracks
        ####
        self.matches = []

    def similarity(self, other):
        score = 0.0

        artistScore = 0.0
        for a_name, a_id, a_pop in self.artists:
            for b_name, b_id, b_pop in other.artists:
                if a_id == b_id:
                    match_score = sigmoidalPopularityScore(a_pop)
                    artistScore += match_score

        topTrackScore = 0.0
        for a_name, a_id, a_pop in self.topTracks:
            for b_name, b_id, b_pop in other.topTracks:
                if a_id == b_id:
                    match_score = sigmoidalPopularityScore(a_pop)
                    artistScore += match_score

        allTrackScore = 0.0
        for a_name, a_id, a_pop in self.allTracks:
            for b_name, b_id, b_pop in other.allTracks:
                if a_id == b_id:
                    match_score = sigmoidalPopularityScore(a_pop)
                    artistScore += match_score

        print("a", artistScore)
        print("b", topTrackScore)
        print("c", allTrackScore)
        score = ARTISTS_WEIGHT * artistScore + ALL_TRACKS_WEIGHT * allTrackScore + TOP_TRACKS_WEIGHT * topTrackScore
                    # print(a_pop, a_name, match_score)
        # print(self.name, other.name, score)
        return score
    def __str__(self):
        return f"<{self.id} {self.name} {self.email}>"











id = 0

def popScore(pop):
    return (110 - pop)/10.0

class Profile:
    def __init__(self, name, artists):
        self.name = name
        self.artists = artists
        global id
        self.id = id
        id += 1

    def popSimilarity(self, other):
        score = 0
        breakdown = []
        for a in self.artists:
            for b in other.artists:
                if a[0] == b[0]:
                    score += popScore(a[1])
                    breakdown.append(a[0])
        return score, breakdown

    def __str__(self):
        return f"[{self.id}] {self.name}"
