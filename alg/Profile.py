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
