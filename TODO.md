# NEXT
  - working on server side session storage: maybe need a semipermanent storage mechanism
    - issue with saving friends as new users in memory
 
## Client to Server Messages
  - register: {handle: HANDLE, name: NAME, friends: FRIENDS}
  - locationNotification: {from: HANDLE, position: POSITION}
 
## Server to Client Messages
  - pushFriends: {handle, name, position}
   
## Server
 - stores hash of clientIds and handles


## Making a Location Request
  1. select friend and click location button
  2. sends locationRequest message to server
  3. server sends email to specified handle
  4. friend receives email
  5. friend clicks url to bring them to app, with their handle encoded in url
  6. app saves their handle into myinfo
  7. location send to server in locationResponse message
  8. server saves location information for user
  9. server updates all friends who have user as friend using locationResponse message