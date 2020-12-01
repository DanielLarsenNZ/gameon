
## Tournaments

    POST /tournaments
    GET /tournaments
    GET /tournaments?playerId={player_id}
    GET /tournaments/{id}
    PUT /tournaments/{id}

    // Tournament model
    {
        name: string,
        description: string,
        playingFor: string,
        playerCount: number,
        players: [{}]
    }

## Results

    POST /tournaments/{id}/results
    GET /tournaments/{id}/results
    GET /tournaments/{id}/results/{result_id}
    DELETE /tournaments/{id}/results


    // REQUEST model
    {
        player1: id,
        player2: id,
        result: [player1]|[player2],
        comment: string
    }

    // RESPONSE model
    {
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
    }

## Rankings

    GET /tournaments/{id}/rankings

    // Response Model
    [
        {
            rank: 1,
            player: {
                name: string,
                email: string,
                imageUrl: string,
                nickname: string    //TODO
            },
            score: 1000
        },
        {
            rank: 2,
            player: {
                name: string,
                email: string,
                imageUrl: string,
                nickname: string    //TODO
            },
            score: 900
        },
        {
            // etc...
        }
    ]

## Players

    //TODO: 
    GET /players/{id}

    [
        {
            name: string,
            email: string,
            imageUrl: string,
            nickname: string    //TODO
        }
    ]