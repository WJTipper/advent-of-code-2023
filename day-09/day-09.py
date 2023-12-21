lines = open("input.txt").readlines()

# next number in the sequence is the total of the last element of every list of differences
# next_num should be 0 when initially called
def calc_next_num(list, next_num):
    all_zero = True
    for elem in list:
        if elem != 0:
            all_zero = False
            break
    if all_zero:
        return next_num
    list_differences = []
    for i in range(len(list) - 1):
        list_differences.append(list[i + 1] - list[i])
    next_num += list[-1]
    return calc_next_num(list_differences, next_num)

# previous number in the sequence is the total of the first elements of the even-numbered lists of differences,
    # minus the total of the first elements of the odd-numbered lists of differences
    # i.e. original_list[0] - first_differences[0] + second_differences[0] - ...
# prev_num & counter should both be 0 when initially called
def calc_prev_num(list, prev_num, counter):
    all_zero = True
    for elem in list:
        if elem != 0:
            all_zero = False
            break
    if all_zero:
        return prev_num
    list_differences = []
    for i in range(len(list) - 1):
        list_differences.append(list[i + 1] - list[i])
    if counter % 2 == 0:
        prev_num += list[0]
    else:
        prev_num -= list[0]
    counter += 1
    return calc_prev_num(list_differences, prev_num, counter)

total1 = 0
total2 = 0
for i in range(len(lines)):
    line_str = lines[i].replace("\n","").split(" ")
    line_int = []
    for j in range(len(line_str)):
        line_int.append(int(line_str[j]))
    total1 += calc_next_num(line_int,0)
    total2 += calc_prev_num(line_int,0,0)
print("puzzle 1 total: " + str(total1))
print("puzzle 2 total: " + str(total2))
