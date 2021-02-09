
## Tournaments

    ✅ POST /tournaments
    ✅ GET /tournaments
    GET /tournaments?skip=0&limit=20
    GET /tournaments?playerId={player_id}
    ✅ GET /tournaments/{tournament_id}
    PUT /tournaments/{tournament_id}
    ✅ POST /tournaments/{tournament_id}/players
    ✅ GET /tournaments/{tournament_id}/players
    DELETE /tournaments/{tournament_id}/players
    
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
    }]

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

    GET /rankings/{tournament_id}

    // Response Model
    [
        {
            rank: 1,
            player: {
                name: string,
                nickname: string    //TODO
            },
            score: 1000
        },
        {
            rank: 2,
            player: {
                name: string,
                nickname: string    //TODO
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
