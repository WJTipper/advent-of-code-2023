lines = open("input.txt").readlines()
for i in range(len(lines)):
    lines[i] = lines[i].replace("\n","")

# finding start location
for i in range(len(lines)):
    if lines[i].find("S") >= 0:
        start_row = i
start_col = lines[start_row].index("S")

# finding first step from start location
if lines[start_row][start_col - 1] == "-" or lines[start_row][start_col - 1] == "L" or lines[start_row][start_col - 1] == "F":
    current_row = start_row
    current_col = start_col - 1
    move = "W"
elif lines[start_row][start_col + 1] == "-" or lines[start_row][start_col + 1] == "J" or lines[start_row][start_col + 1] == "7":
    current_row = start_row
    current_col = start_col + 1
    move = "E"
elif lines[start_row - 1][start_col] == "|" or lines[start_row - 1][start_col] == "F" or lines[start_row - 1][start_col] == "7":
    current_row = start_row - 1
    current_col = start_col
    move = "N"
elif lines[start_row + 1][start_col] == "|" or lines[start_row + 1][start_col] == "L" or lines[start_row + 1][start_col] == "J":
    current_row = start_row + 1
    current_col = start_col
    move = "S"

# defining next direction based on current location & previous move
next_direction = {
    "|": {
        "S":"S",
        "N":"N"
    },
    "-": {
        "W":"W",
        "E":"E"
    }, 
    "L": {
        "S":"E",
        "W":"N"
    },
    "J": {
        "S":"W",
        "E":"N"
    },
    "7": {
        "E":"S",
        "N":"W"
    },
    "F": {
        "W":"S",
        "N":"E"
    }
}

at_start = False
counter = 1
while not at_start:
    if lines[current_row][current_col] == "S":
        at_start = True
    else:
        move = next_direction[lines[current_row][current_col]][move]
        counter += 1
        if move == "N":
            current_row -= 1
        elif move == "S":
            current_row += 1
        elif move == "E":
            current_col += 1
        elif move == "W":
            current_col -= 1
print("puzzle 1 answer = " + str(round((counter / 2))))