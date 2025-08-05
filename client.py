#
#   Reward client in Python
#   Connects REQ socket to tcp://localhost:5555
#   Sends "Requesting reward" to server, expects "Reward: <coffee> <pastry>" back
#

import zmq

context = zmq.Context()

# Socket to talk to server
print("Connecting to reward server…")
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:5555")

# Do 10 requests, waiting each time for a response
for request in range(10):
    print("Sending test request #%s …" % request)
    socket.send_string("Requesting reward")

    # Get the reply.
    message = socket.recv_string()
    print("Received reply %s '%s'" % (request, message))
    print("\n")
