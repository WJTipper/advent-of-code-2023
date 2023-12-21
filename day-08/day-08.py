lines = open("input.txt").readlines()
directions = lines[0]
locations = []
left = []
right = []
current_locations = []

for i in range(2,len(lines)):
    trimmed_line = lines[i].replace("\n", "").replace("=", "").replace("(", "").replace(")", "").replace(",", "").split(" ")
    locations.append(trimmed_line[0])
    left.append(trimmed_line[2])
    right.append(trimmed_line[3])
    if trimmed_line[0][2] == "A":
        current_locations.append(trimmed_line[0])

# *** PUZZLE 1 ***
current_location = "AAA"
counter1 = 0
at_ZZZ = False
while not at_ZZZ:
    i = counter1 % (len(directions) - 1)
    if directions[i] == "L":
        current_location = left[locations.index(current_location)]
    elif directions[i] == "R":
        current_location = right[locations.index(current_location)]
    else:
        print("ERROR: direction not L or R")
        continue
    counter1 += 1
    if current_location == "ZZZ":
        at_ZZZ = True
print("puzzle 1 answer: " + str(counter1))

# *** PUZZLE 2 ***
"""
# manual approach doesn't seem to be practical
counter2 = 0
all_end_in_Z = False
while not all_end_in_Z:
    i = counter2 % (len(directions) - 1)
    for j in range(len(current_locations)):
        if directions[i] == "L":
            current_locations[j] = left[locations.index(current_locations[j])]
        elif directions[i] == "R":
            current_locations[j] = right[locations.index(current_locations[j])]
        else:
            print("ERROR: direction not L or R")
            continue
    counter2 += 1
    all_end_in_Z = True
    print(current_locations)
    for j in range(len(current_locations)):
        if current_locations[j][2] != "Z":
            all_end_in_Z = False
            print(current_locations[j] + " ends in NOT Z")
            break
print("puzzle 2 answer: " + str(counter2))
"""
# new approach, build list of points where output ends in Z until sequence repeats, then calc LCM
# print(current_locations)

"""
behaviour: reaches a location ending in Z then loops

for KLA:
loop until starting location is KLA, output is list of counter when location ends in Z

then do this for all 6 starting locations
"""

"""# current_location = "QVA"
counter2 = 0
counter_list = []

for location in current_locations:
    print(location)
    ends_in_Z = False
    while not ends_in_Z:
        i = counter2 % (len(directions) - 1)
        if directions[i] == "L":
            location = left[locations.index(location)]
        elif directions[i] == "R":
            location = right[locations.index(location)]
        else:
            print("ERROR: direction not L or R")
            continue
        counter2 += 1
        if location[2] == "Z":
            print(location + " at counter " + str(counter2))
            counter_list.append(counter2)
            ends_in_Z = True
print(counter_list)

# This function computes GCD 
def compute_gcd(x, y):
   while(y):
       x, y = y, x % y
   return x

# This function computes LCM
def compute_lcm(x, y):
   lcm = (x*y)//compute_gcd(x,y)
   return lcm

while len(counter_list) > 1:
    counter_list.append(compute_lcm(counter_list[0], counter_list[1]))
    counter_list.pop(1)
    counter_list.pop(0)

print(counter_list)"""

# behaviour observed doesn't make sense: for KLA, reaches SNZ at regular intervals,
# but cannot be the case since next step after SNZ cannot be KLA, need to rethink strategy