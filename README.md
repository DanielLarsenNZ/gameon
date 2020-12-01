# Game On!

A simple Ladder app for intra-office tournaments like Table Tennis, Chess, Pool and so on.

## Table tennis tournament rules example
	
* If you challenge a player they have to play in within 5 working days (leave excluded), or forfeit the match
*	A forfeit or refusal to play is the same as a loss
*	Players choose the scoring/serves at the time they play, e.g. each game is first to 11 points, game must be won by two points, match is best of 5 games. [US rules](https://www.pongfit.org/official-rules-of-table-tennis) are good
*	If you beat a player, you move up the ladder based on the [ELO ranking algorithm](https://dotnetcoretutorials.com/2018/09/18/calculating-elo-in-c/)
*	There are no draws
*	New players start with a ranking score of 400
*	Doubles teams are separate to singles. Doubles can only challenge doubles, and individuals on a winning doubles team cannot claim a doubles match win as a singles match win
*	Top of the ladder buys first round at the after Christmas party

## Links & references

[Calculating ELO in C#](https://dotnetcoretutorials.com/2018/09/18/calculating-elo-in-c/)

[Dapr ASP.NET Core Controller Sample](https://github.com/dapr/dotnet-sdk/tree/master/samples/AspNetCore/ControllerSample)

[Dapr Hellow K8s sample](https://github.com/dapr/quickstarts/tree/master/hello-kubernetes)
