lines = open("input.txt").readlines()
numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
total = 0

for line in lines:
    # forward search
    for i in range(len(line)):    
        # check for number as digit
        if line[i].isdigit():
            total += (int(line[i]) * 10)
            break
        # check for number as string
        num_str_found = False
        for num_str in numbers:
            if line[i:(i + len(num_str))] == num_str:
                total += (numbers.index(num_str) * 10)
                num_str_found = True
                break
        if num_str_found == True:
            break
    # backward search
    for i in range(len(line)):
        # check for number as digit
        if line[len(line) - 1 - i].isdigit():
            total += (int(line[len(line) - 1 - i]))
            break
        # check for number as string
        num_str_found = False
        for num_str in numbers:
            if line[(len(line) - 1 - i - len(num_str)):(len(line) - 1 - i)] == num_str:
                total += (numbers.index(num_str))
                num_str_found = True
                break
        if num_str_found == True:
            break

print("total: " + str(total))