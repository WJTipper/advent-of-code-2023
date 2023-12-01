lines = open("input.txt").readlines()
total = 0

for line in lines:
    # forward search
    for char in line:
        if char.isdigit():
            total += (int(char) * 10)
            break
    # backward search
    for index in range(len(line)):
        if line[len(line) - 1 - index].isdigit():
            total += int(line[len(line) - 1 - index])
            break

print("total: " + str(total))