
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
        players: User[],        # Ignored in POST model
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
