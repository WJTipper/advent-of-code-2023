import math
lines = open("input.txt").readlines()

"""
if time holding down button = speed = x,
and time limit = a
then total distance travelled = speed * time travelling = x*(a-x) = a*x - x**2

if record distance = b
then the 2 speeds that will equal the record distance exactly are when
    a*x - x**2 = b
using the quadratic formula we can rearrange to
    x = (a +- sqrt(a**2 - 4*b))/2
"""
def calc_ways_to_beat_record(time_limit, record_distance):
    max_time = math.floor((time_limit + math.sqrt(time_limit**2 - 4*record_distance)) / 2)
    min_time = math.ceil((time_limit - math.sqrt(time_limit**2 - 4*record_distance)) / 2)
    return max_time - min_time + 1

# *** PUZZLE 1 ***
times_str = lines[0][lines[0].index(":") + 1:].split()
distances_str = lines[1][lines[1].index(":") + 1:].split()
times = list(map(int, times_str))
distances = list(map(int, distances_str))

ways_to_beat_record = []
for i in range(len(times)):
    ways_to_beat_record.append(calc_ways_to_beat_record(times[i], distances[i]))
print("puzzle 1 answer = " + str(math.prod(ways_to_beat_record)))

# *** PUZZLE 2 ***
time = int(lines[0][lines[0].index(":") + 1:].replace(" ", ""))
distance = int(lines[1][lines[1].index(":") + 1:].replace(" ", ""))
print("puzzle 2 answer = " + str(calc_ways_to_beat_record(time, distance)))
