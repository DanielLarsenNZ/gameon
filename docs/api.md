
## Tournaments

    POST /tournaments
    GET /tournaments
    GET /tournaments?playerId={player_id}
    GET /tournaments/{tournament_id}
    PUT /tournaments/{tournament_id}

    {
        name: string,
        description: string,
        playingFor: string,
        playerCount: number,
        players: [{}]
    }

## Results

    POST /tournaments/{tournament_id}/results
    GET /tournaments/{tournament_id}/results
    GET /tournaments/{tournament_id}/results/{result_id}
    DELETE /tournaments/{tournament_id}/results


    REQUEST
    {
        player1: id,
        player2: id,
        result: [player1]|[player2],
        comment: string
    }

    RESPONSE
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

## Players

[
    {
        name: string,
        email: string,
        imageUrl: string,
        nickname: string    //TODO
    }
]