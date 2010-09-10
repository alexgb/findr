Create Channel (Party)
 - anyone on channel can make a request for a user location
 - anyone on channel can see location of anybody else
 
 
Node Server

FRONTEND
========

- Sproutcore
- Two panels; friends and map.
- Add friend to list, fires off request to server through ws


BACKEND
=======

- When receiving userLocationRequest from client
  - fires off email to user with link
- Respond to generated links for users
  - when link received ws location info back to client

SOCKET.IO
=========

- hello… wait
- client request { actions: "pollUser", params: "alex.gibbons@gmail.com" }
  - sends email to client with link to url /respond/md5(email)