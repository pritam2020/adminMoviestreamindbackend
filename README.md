
# Movie Streaming API v1
	

## **Description** 

This is a movie streaming api. this api works like a sliding window it gives response/results for a window of 3 months and for every three month window it consists all the latest movies of hindi, bengali, english origin of the current window.

## **Features**

This movies4unow api's also used streamming along with http byte range to give the following fetures
- seeking to any point in the movies
- unecessary loading of the whole movie
- pausing and resuming
- handels in bad network condition etc.

**Sliding-window Concept** **:** [click to checkout](./docs/slidingWindow.md)

## Genres
 There are 14 genre present in the api now. Later there will also be other genre.
 - Sci-fi
 - Comedy
 - Romance
 - Thriller
 - Action
 - Horror
 - Fantasy
 - Award-winning
 - War
 - Mystery
 - Drama
 - Documentary
 - Biography
 - Adventure
---

## Endpoints 
|Routes|Description|
|--|--|
|`/protected-route/moviedetails/comedy`| Gives all the Comedy movies details including video file
|`/protected-route/moviedetails/romance`|Gives all the romance movies details including video file
|`/protected-route/moviedetails/scifi`|Gives all the sci-fi movies details including video file
|`/protected-route/moviedetails/action`|Gives all the action movies details including video file
|`/protected-route/moviedetails/adventure`|Gives all the adventure movies details including video file
|`/protected-route/moviedetails/biography`|Gives all the biography movies details including video file
|`/protected-route/moviedetails/documentary`|Gives all the documentary movies details including video file
|`/protected-route/moviedetails/drama`|Gives all the drama movies details including video file
|`/protected-route/moviedetails/horror`|Gives all the horror movies details including video file
|`/protected-route/moviedetails/mystery`|Gives all the mystery movies details including video file
|`/protected-route/moviedetails/war`|Gives all the war movies
|`/protected-route/moviedetails/awardwinning`|Gives all the award-winning movies details including video file
|`/protected-route/moviedetails/thriller`|Gives all the thriller movies details including video file
|`/protected-route/moviedetails/fantasy`|Gives all the fantasy movies details including video file
|`/protected-route/moviedetails`|Gives details of all the movies excluding the video file
|`/protected-route/moviedetails/search`|Searches the db or the given movies. **Restrictions are there** *please check below the restriction.*
|`/clientlogin`| For the user login
|`/clientsignup`| Register's the user
|`/protected-route/clientlogout`| Logout's the user
|`/protected-route/clientaccount`| Gives the User details

## Request
Request are sent as json, every endpoint has different fields or key value pair.all the routes are protected routes user cannot access the routes until and unless they login's.
[Know more about requests](./docs/request.md) 

## Response
Responses are also sent as json, every endpoint has different fields or key value pair.
[Know more about requests](./docs/response.md) 

## Restriction

There are certain restriction in the api endpoints please refer below for it.

**Restriction for search**
>/protected-route/moviedetails/search

[check more about Restriction](./docs/Restriction.md)

[Know more](./docs/knowMore.md)
