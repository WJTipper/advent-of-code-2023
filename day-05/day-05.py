lines = open("input.txt").readlines()

def convert_seed_to_location(current_num):
    # seed-to-soil
    for j in range(3,25):
        current_map_range_str = lines[j].split()
        current_map_range = list(map(int, current_map_range_str))
        if current_num >= current_map_range[1] and current_num < current_map_range[1] + current_map_range[2]:
            current_num += (current_map_range[0] - current_map_range[1])
            break

    # soil-to-fertilizer
    for j in range(27,55):
        current_map_range_str = lines[j].split()
        current_map_range = list(map(int, current_map_range_str))
        if current_num >= current_map_range[1] and current_num < current_map_range[1] + current_map_range[2]:
            current_num += (current_map_range[0] - current_map_range[1])
            break

    # fertilizer-to-water
    for j in range(57,105):
        current_map_range_str = lines[j].split()
        current_map_range = list(map(int, current_map_range_str))
        if current_num >= current_map_range[1] and current_num < current_map_range[1] + current_map_range[2]:
            current_num += (current_map_range[0] - current_map_range[1])
            break

    # water-to-light
    for j in range(107,145):
        current_map_range_str = lines[j].split()
        current_map_range = list(map(int, current_map_range_str))
        if current_num >= current_map_range[1] and current_num < current_map_range[1] + current_map_range[2]:
            current_num += (current_map_range[0] - current_map_range[1])
            break

    # light-to-temperature
    for j in range(147,194):
        current_map_range_str = lines[j].split()
        current_map_range = list(map(int, current_map_range_str))
        if current_num >= current_map_range[1] and current_num < current_map_range[1] + current_map_range[2]:
            current_num += (current_map_range[0] - current_map_range[1])
            break

    # temperature-to-humidity
    for j in range(196,236):
        current_map_range_str = lines[j].split()
        current_map_range = list(map(int, current_map_range_str))
        if current_num >= current_map_range[1] and current_num < current_map_range[1] + current_map_range[2]:
            current_num += (current_map_range[0] - current_map_range[1])
            break

    # humidity-to-location
    for j in range(238,261):
        current_map_range_str = lines[j].split()
        current_map_range = list(map(int, current_map_range_str))
        if current_num >= current_map_range[1] and current_num < current_map_range[1] + current_map_range[2]:
            current_num += (current_map_range[0] - current_map_range[1])
            break
    
    return current_num
    
# *** PUZZLE 1 ***
seed_numbers_str = lines[0][lines[0].index(":") + 1:].split()
seed_numbers = list(map(int, seed_numbers_str))
min_seed_num_1 = 999999999

for i in range(len(seed_numbers)):
    location_num = convert_seed_to_location(seed_numbers[i])
    if location_num < min_seed_num_1:
        min_seed_num_1 = location_num

print("Puzzle 1: " + str(min_seed_num_1))

# *** PUZZLE 2 ***
# Solution in this form would take about a week to finish running
"""
min_seed_num_2 = 999999999
progress_counter = 0
total_checks = seed_numbers[1] + seed_numbers[3] + seed_numbers[5] + seed_numbers[7] + seed_numbers[9] + seed_numbers[11] + seed_numbers[13] + seed_numbers[15] + seed_numbers[17] + seed_numbers[19]

for i in range(int(len(seed_numbers) / 2)):
    for j in range(seed_numbers[2*i], (seed_numbers[2*i] + seed_numbers[2*i + 1])):
        location_num = convert_seed_to_location(j)
        progress_counter += 1
        print(progress_counter / total_checks)
        if location_num < min_seed_num_2:
            min_seed_num_2 = location_num

print("Puzzle 2: " + str(min_seed_num_2))
"""