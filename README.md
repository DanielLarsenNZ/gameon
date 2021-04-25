![Game On! Logo](https://i.imgur.com/Nw251pk.png)
[![API Deployment](https://github.com/DanielLarsenNZ/gameon/actions/workflows/dotnet.yml/badge.svg)](https://github.com/DanielLarsenNZ/gameon/actions/workflows/dotnet.yml)
[![Web App Deployment](https://github.com/DanielLarsenNZ/gameon/actions/workflows/client-spa.yml/badge.svg)](https://github.com/DanielLarsenNZ/gameon/actions/workflows/client-spa.yml)

Organising ladder tournaments has never been easier for anyone or any game! Create or join tournaments for free, to liven up your day and enjoy endless fun.

## Table Tennis Tournament Rules Example

* If you challenge a player they have to play in within 5 working days (leave excluded), or forfeit the match
* A forfeit or refusal to play is the same as a loss
* Players choose the scoring/serves at the time they play, e.g. each game is first to 11 points, game must be won by two points, match is best of 5 games. [US rules](https://www.pongfit.org/official-rules-of-table-tennis) are good
* If you beat a player, you move up the ladder based on the [ELO ranking algorithm](https://dotnetcoretutorials.com/2018/09/18/calculating-elo-in-c/)
* There are no draws
* New players start with a ranking score of 400
* Doubles teams are separate to singles. Doubles can only challenge doubles, and individuals on a winning doubles team cannot claim a doubles match win as a singles match win
* Top of the ladder buys first round at the after Christmas party

## Help us Translate

Are you fluent in a language that isn't currently supported? Help us translate Game On! into your language in minutes. Simply [create an issue](https://github.com/DanielLarsenNZ/gameon/issues/new/choose) referencing your language or create a [create a pull request](https://github.com/DanielLarsenNZ/gameon/compare) if you already know how i18n works.

## Contributors

![Contributors](https://contrib.rocks/image?repo=DanielLarsenNZ/gameon)

## Developer Documentation

* [Game On! API, Technical and Product Docs](/docs)
* [Deployment Docs](/deploy/README.md)
* [Client-side Dev](/client/README.md)
* [Server-side Dev](/server/README.md)

## Links & References

[Calculating ELO in C#](https://dotnetcoretutorials.com/2018/09/18/calculating-elo-in-c/)

[Dapr ASP.NET Core Controller Sample](https://github.com/dapr/dotnet-sdk/tree/master/examples/AspNetCore/ControllerSample)

[Dapr Hello K8s Sample](https://github.com/dapr/quickstarts/tree/master/hello-kubernetes)

[Detailed information on the Azure CosmosDB State Store Component](https://docs.dapr.io/operations/components/setup-state-store/supported-state-stores/setup-azure-cosmosdb/)
