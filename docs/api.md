# API Documentation

Welcome to the Game On! API documentation. This page lists endpoints (including their request and response schema) available for use by client applications

Production Base URL: https://api.gameon.nz

> ❗ Important
>
> **All Endpoints Require a Bearer Token Authorization Header**

## Table of Contents

- [Obtaining an Access Token](#obtaining-an-access-token)
- [Auth / User Endpoints](#me-/-user-endpoints)
- [Tournament Endpoints](#tournament-endpoints)
- [Player Endpoints](#player-endpoints)
- [Result Endpoints](#result-endpoints)

## Obtaining an Access Token
Your access token can be retrieved from the Game On! [developer portal](https://gameon.nz/developer) and must be supplied as a Bearer Token with each API call. Please note that requests made against this API are not sandboxed and thus may affect your personal rankings and public Game On! profile.

    Authorization: Bearer {{accessToken}}

## Me / User Endpoints

| Status | Method | Endpoint | Description  |
|:----:|:----:|:-----|:--------|
| ✔️ | `POST` | `/me`   | Registers a new user. |
| ✔️ | `GET` |`/me`   | Returns the currently authenticated user.  |
| 🔴 | `GET` |`/me/photos[?size=120x120]`   | Returns the avatar of the current user.  |
| 🔴 | `PUT` |`/me`   | Updates the currently authenticated user's details.  |

## Tournament Endpoints

| Status | Method | Endpoint | Description  |
|:----:|:----:|:-----|:--------|
| ✔️ | `POST` |`/tournaments`   | Creates a new tournament. |
| ✔️ | `GET` |`/tournaments`   | Retrieves all tournaments in the user's tenant. |
| ✔️ | `GET` |`/tournaments/{id}`   | Retrieves a specific tournament in the user's tenant by ID. |
| 🔴 | `PUT` |`/tournaments/{id}`   | Updates a specific tournament in the user's tenant by ID. |
| 🔴 | `DELETE` |`/tournaments/{id}`   | Ends or deletes a specific tournament in the user's tenant by ID. |

## Player Endpoints

| Status | Method | Endpoint | Description  |
|:----:|:----:|:-----|:--------|
| ✔️ |`POST` |`/tournaments/{id}/players`   | Adds one or more players to the given tournament. |
| ✔️ | `GET`|`/tournaments/{id}/players`   | Retrieves all players in the given tournament (by rank). |
| ✔️ | `GET`|`/tournaments/{id}/players/{id}`   | Retrieves a specific player in the given tournament. |

## Result Endpoints

| Status | Method | Endpoint | Description  |
|:----:|:----:|:-----|:--------|
| 🔴 |`POST` |`/results/{tournament_id}`   | Submits a new score for a given tournament ID. |
| 🔴 |`GET` |`/results/{tournament_id}`   | Retrieves all scores for a given tournament ID. |

## Tournaments

    ✅ POST /tournaments
    ✅ GET /tournaments
    GET /tournaments?skip=0&limit=20
    GET /tournaments?playerId={player_id}
    ✅ GET /tournaments/{tournament_id}
    PUT /tournaments/{tournament_id}
    
    // Tournaments model
    [{
        id: Id,                 # required
        name: string,           # required
        description: string,
        location: string,
        playingFor: string,
        playerCount: number,    # readonly, derived from players.length
        players: Player[],        # Ignored in POST model
        startDate: Date (nullable),
        endDate: Date (nullable),
        TimeOfPlayDescription: String (default: 'Anytime', e.g: 'Mondays 9-10am')
        maxPlayers: Integer (nullable) (default: null = no limit), only a number greater than 1 is valid
        owner: User
        rulesLink: string
    }]

## Tournaments / Players

### ✅ Add Player(s) to a Tournament

Accepts an `AddPlayersModel` with three optional properties: `playerId` (a string), `playerIds` (an array of strings) or `addMe` (a boolean, defaults to `false`). At least one of these properties must be set. Any combination is accepted. Returns the `Tournament` after any players have been added.

    POST /tournaments/{tournament_id}/players
    Content-Type: application/json
    Authorization: Bearer {{accessToken}}

    {
        "playerId": String?,
        "playerIds": String[]?,
        "addMe": Bool?
    }

Example:

    POST http://localhost:5000/tournaments/de0bf26e422c4137a537a4794113f3da/players
    Content-Type: application/json
    Authorization: Bearer {{accessToken}}

    {
        "playerIds": ["E4B9CCAB54357895680E535E7DCB431EE73613FA91A10B5A8D87DE10A2588B86", "6411ACC82C7255873B7E34E0FD08D6B6A4B87C8757F167B8D48824964C686801"],
        "addMe": true
    }

## Results

    POST /results/{tournament_id}
    GET /results/{tournament_id}
    GET /results/{tournament_id}/results/{result_id}
    DELETE /results/{tournament_id}/results/{result_id}


    // POST model
    {
        player1: id,
        player2: id,
        result: [player1]|[player2],
        comment: string
    }

    // GET results model
    [{
        player1: {
            name: string,
            oldRankScore: 400 
            newRankScore: 420,
            rank: 1
        },
        player2: {
            name: string,
            oldRankScore: 400,
            newRankScore: 380,
            rank: 2
        }
    }]

## Rankings

    GET /tournaments/{tournament_id}/rankings

    // Response Model
    [
        {
            rank: 1,
            player: {
                name: string
            },
            score: 1000
        },
        {
            rank: 2,
            player: {
                name: string
            },
            score: 900
        },
        {
            // etc...
        }
    ]

## Me (Users)

    GET /me
    GET /me/photos[?size=120x120]
    POST /me
    PUT /me

# Users

    GET /users
    GET /users/{user_id}/photos[?size=120x120]
    POST /users
    PUT /users
