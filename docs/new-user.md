# New user workflow

1. Use MSAL to obtain a token
1. POST with token in header and no body to https://api.gameon.nz/me. 
   1. If the User already exists in GameOn the endpoint will return `200 OK` with the User in the response body. The User will not be updated.
   1. If the User does not already exist, the endpoint will create a User in GameOn using the AAD profile information contained in the claims of the token. Then will return `201 Created` with the User in the response body.

An example using VSCode Rest client:

    @accessToken = eyJ0eXAiOiJKV1Q...

    ### POST User
    POST https://api.gameon.nz/me
    Authorization: Bearer {{accessToken}}

And the response:

    HTTP/1.1 200 OK
    Date: Tue, 09 Feb 2021 06:13:50 GMT
    Content-Type: application/json; charset=utf-8
    Transfer-Encoding: chunked
    Connection: close
    Strict-Transport-Security: max-age=15724800; includeSubDomains

    {
    "givenName": "Daniel",
    "name": "Daniel Larsen (NZ)",
    "surname": "Larsen (NZ)",
    "id": "E4B9CCAB54357895680E535E7DCB431EE73613FA91A10B5A8D87DE10A2588B86"
    }

Note:

* Email address is not saved in the GameOn DB for PII reasons
* `id` is a SHA256 Hash of the User's AAD Object Id (in upper-case)
* Tenant Id is not returned as it is retrieved from the User's claims

## Get a User

GET https://api.gameon.nz/me. This will return the user object.

    ### GET User
    GET https://api.gameon.nz/me
    Authorization: Bearer {{accessToken}}

## Get the User's profile pic

A `/me/photos` endpoint is provided for profile pics. Valid `size` values are: "48X48", "64X64", "96X96", "120x120", "240X240", "360X360", "432X432", "504X504", "648X648". User profile pics may be cached by the Users Service for up to 1 day.

    ### GET User photo
    GET https://api.gameon.nz/me/photos?size=120x120
    Authorization: Bearer {{accessToken}}

## Create a Tournament

If this User is creating a new Tournament (of which they will be the owner), `POST` a `Tournament` model to https://api.gameon.nz/tournaments. This will create a new Tournament for the Tenant and make the current User the owner and first player. e.g.

    ### POST Tournament PROD
    POST https://api.gameon.nz/tournaments
    Content-Type: application/json
    Authorization: Bearer {{accessToken}}

    {
        "name": "Auckland Office - Table Tennis - Singles",
        "description": "Singles tournament 2020",
        "location": "The Hub on L6 Auckland",
        "playingFor": "Beers 🍻"
    } 

Response:

    HTTP/1.1 201 Created
    Date: Tue, 09 Feb 2021 06:25:22 GMT
    Content-Type: application/json; charset=utf-8
    Transfer-Encoding: chunked
    Connection: close
    Location: http://api.gameon.nz/tournaments/81d4bb733bc14500a6fbd0b7645788dc
    Strict-Transport-Security: max-age=15724800; includeSubDomains

    {
        "description": "Singles tournament 2020",
        "location": "The Hub on L6 Auckland",
        "name": "Auckland Office - Table Tennis - Singles",
        "owner": {
            "givenName": "Daniel",
            "name": "Daniel Larsen (NZ)",
            "surname": "Larsen (NZ)",
            "id": "E4B9CCAB54357895680E535E7DCB431EE73613FA91A10B5A8D87DE10A2588B86"
        },
        "playerCount": 1,
        "playingFor": "Beers \uD83C\uDF7B",
        "players": [
            {
            "givenName": "Daniel",
            "name": "Daniel Larsen (NZ)",
            "surname": "Larsen (NZ)",
            "id": "E4B9CCAB54357895680E535E7DCB431EE73613FA91A10B5A8D87DE10A2588B86"
            }
        ],
        "id": "81d4bb733bc14500a6fbd0b7645788dc"
    }

## Join a Tournament

`POST /tournaments/players` takes an array of User Ids in the body. Any User Id that is not found in the collection of Players on the Tournament will cause the User with that Id to be copied into the Tournament's Players collection. Note that Players is a Collection of Users.

    ### Add Players to Tournament
    POST http://api.gameon.nz/tournaments/04022d7e841f46d58f7b056b5d18e6d3/players
    Content-Type: application/json
    Authorization: Bearer {{accessToken}}

    {
        "playerIds": ["E4B9CCAB54357895680E535E7DCB431EE73613FA91A10B5A8D87DE10A2588B86", "6411ACC82C7255873B7E34E0FD08D6B6A4B87C8757F167B8D48824964C686801"]
    }

Response:

    HTTP/1.1 200 OK
    Date: Tue, 09 Feb 2021 06:28:32 GMT
    Content-Type: application/json; charset=utf-8
    Transfer-Encoding: chunked
    Connection: close
    Strict-Transport-Security: max-age=15724800; includeSubDomains

    {
        "description": "Singles tournament 2020",
        "location": "The Hub on L6 Auckland",
        "name": "Auckland Office - Table Tennis - Singles",
        "owner": {
            "givenName": "Daniel",
            "name": "Daniel Larsen (NZ)",
            "surname": "Larsen (NZ)",
            "id": "E4B9CCAB54357895680E535E7DCB431EE73613FA91A10B5A8D87DE10A2588B86"
        },
        "playerCount": 2,
        "playingFor": "Beers \uD83C\uDF7B",
        "players": [
            {
            "givenName": "Daniel",
            "name": "Daniel Larsen (NZ)",
            "surname": "Larsen (NZ)",
            "id": "E4B9CCAB54357895680E535E7DCB431EE73613FA91A10B5A8D87DE10A2588B86"
            },
            {
            "givenName": "TEST",
            "name": "TEST USER",
            "surname": "USER",
            "id": "6411ACC82C7255873B7E34E0FD08D6B6A4B87C8757F167B8D48824964C686801"
            }
        ],
        "id": "04022d7e841f46d58f7b056b5d18e6d3"
    }