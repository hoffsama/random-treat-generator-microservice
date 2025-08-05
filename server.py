#
#   Hello World server in Python
#   Binds REP socket to tcp://*:5555
#   Expects b"Hello" from client, replies with b"World"
#

import time
import zmq
import random

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")

def generateRandomCoffee ():
    randomNumber = random.randrange(0,99)
    print("Coffee random number (0-99): ", randomNumber)
    if randomNumber < 25:
        return 1
    elif randomNumber < 50:
        return 2
    elif randomNumber < 65:
        return 3
    elif randomNumber < 73:
        return 4
    elif randomNumber < 80:
        return 5
    elif randomNumber < 86:
        return 6
    elif randomNumber < 90:
        return 7
    elif randomNumber < 93:
        return 8
    elif randomNumber < 96:
        return 9
    elif randomNumber < 97:
        return 10
    elif randomNumber < 98:
        return 11
    else:
        return 12
        
def generateRandomPastry ():
    randomNumber = random.randrange(0,99)
    print("Pastry random number (0-99): ", randomNumber)
    if randomNumber < 24:
        return "P1"
    elif randomNumber < 48:
        return "P2"
    elif randomNumber < 72:
        return "P3"
    elif randomNumber < 96:
        return "P4"
    else:
        return "P5"



while True:
    # Wait for next request from client
    message = socket.recv_string()
    print("Received from client: '%s'" % message)

    # Generate random coffee and pastry
    coffee = generateRandomCoffee()
    pastry = generateRandomPastry()
    message = "Reward: " + str(coffee) + " " + str(pastry)
    print("Sending to client: %s" % message, "\n")

    # Send reply back to client
    socket.send_string(message)
