lines = open("input.txt").readlines()
hands_list = []
hands_list_to_sort_1 = []
hands_list_to_sort_2 = []
joker_list = []
for i in range(len(lines)):
    hands_list.append(lines[i].split(" ")[0])
    hands_list_to_sort_1.append(lines[i].split(" ")[0])
    hands_list_to_sort_2.append(lines[i].split(" ")[0])
    if lines[i].split(" ")[0].find("J") >= 0:
        joker_list.append(lines[i].split(" ")[0])

# *** PUZZLE 1 ***
cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

def hand_category(hand):
    for card in cards:
        if hand.count(card) == 5:
            # five of a kind
            return 6
        elif hand.count(card) == 4:
            # four of a kind
            return 5
    for card in cards:
        if hand.count(card) == 3:
            remaining_cards = hand.replace(card, "")
            if remaining_cards[0] == remaining_cards[1]:
                # full house
                return 4
            else:
                # three of a kind
                return 3
    for card in cards:
        if hand.count(card) == 2:
            remaining_cards = hand.replace(card, "")
            for card in cards:
                if remaining_cards.count(card) == 2:
                    # two pair
                    return 2
            # one pair
            return 1
    # high card
    return 0
        
def higher_ranked_hand(hand_1, hand_2):
    if hand_category(hand_1) > hand_category(hand_2):
        return hand_1
    elif hand_category(hand_1) < hand_category(hand_2):
        return hand_2
    else:
        for i in range(5):
            if cards.index(hand_1[i]) < cards.index(hand_2[i]):
                return hand_1
            elif cards.index(hand_1[i]) > cards.index(hand_2[i]):
                return hand_2
    return hand_1

def bubble_sort_hands(list_of_hands):
    for i in range(len(list_of_hands)):
        already_sorted = True
        for j in range(len(list_of_hands) - i - 1):
            if higher_ranked_hand(list_of_hands[j], list_of_hands[j + 1]) == list_of_hands[j]:
                list_of_hands[j], list_of_hands[j + 1] = list_of_hands[j + 1], list_of_hands[j]
                already_sorted = False
        if already_sorted:
            break
    return list_of_hands

sorted_hands_list = bubble_sort_hands(hands_list_to_sort_1)

total = 0
for i in range(len(sorted_hands_list)):
    # hands have been sorted lowest to highest rank, so rank = i+1
    # the bid associated with the current hand is found by retrieving its index in the original list of hands
    total += (i + 1) * int(lines[hands_list.index(sorted_hands_list[i])].split(" ")[1])
print("puzzle 1 answer = " + str(total))

# *** PUZZLE 2 ***
cards_joker = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

def hand_category_joker(hand):
    for card in cards_joker:
        if card == "J":
            if hand.count(card) == 5:
                # five of a kind
                return 6
            elif hand.count(card) == 4:
                # four of a kind
                return 5
        else:
            if hand.count(card) + hand.count("J") == 5:
                # five of a kind
                return 6
            elif hand.count(card) + hand.count("J") == 4:
                # four of a kind
                return 5
    for card in cards_joker:
        if card == "J":
            if hand.count(card) == 3:
                remaining_cards = hand.replace(card, "")
                if remaining_cards[0] == remaining_cards[1]:
                    # full house
                    return 4
                else:
                    # three of a kind
                    return 3
        else:
            if hand.count(card) + hand.count("J") == 3:
                remaining_cards = hand.replace(card, "").replace("J","")
                if remaining_cards[0] == remaining_cards[1]:
                    # full house
                    return 4
                else:
                    # three of a kind
                    return 3
    for card in cards_joker:
        if card == "J":
            if hand.count(card) == 2:
                remaining_cards = hand.replace(card, "")
                for card in cards_joker:
                    if remaining_cards.count(card) == 2:
                        # two pair
                        return 2
                # one pair
                return 1
        else:
            if hand.count(card) + hand.count("J") == 2:
                remaining_cards = hand.replace(card, "").replace("J","")
                for card in cards_joker:
                    if remaining_cards.count(card) == 2:
                        # two pair
                        return 2
                # one pair
                return 1
    # high card
    return 0

def higher_ranked_hand_joker(hand_1, hand_2):
    if hand_category_joker(hand_1) > hand_category_joker(hand_2):
        return hand_1
    elif hand_category_joker(hand_1) < hand_category_joker(hand_2):
        return hand_2
    else:
        for i in range(5):
            if cards_joker.index(hand_1[i]) < cards_joker.index(hand_2[i]):
                return hand_1
            elif cards_joker.index(hand_1[i]) > cards_joker.index(hand_2[i]):
                return hand_2
    return hand_1

def bubble_sort_hands_joker(list_of_hands):
    for i in range(len(list_of_hands)):
        already_sorted = True
        for j in range(len(list_of_hands) - i - 1):
            if higher_ranked_hand_joker(list_of_hands[j], list_of_hands[j + 1]) == list_of_hands[j]:
                list_of_hands[j], list_of_hands[j + 1] = list_of_hands[j + 1], list_of_hands[j]
                already_sorted = False
        if already_sorted:
            break
    return list_of_hands

# Solution is incomplete, does not currently give the correct answer
"""
sorted_hands_list_joker = bubble_sort_hands_joker(hands_list_to_sort_2)

total_joker = 0
for i in range(len(sorted_hands_list_joker)):
    # hands have been sorted lowest to highest rank, so rank = i+1
    # the bid associated with the current hand is found by retrieving its index in the original list of hands
    total_joker += (i + 1) * int(lines[hands_list.index(sorted_hands_list_joker[i])].split(" ")[1])
print("puzzle 2 answer = " + str(total_joker))
"""
