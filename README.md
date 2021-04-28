<p align="center">
  <img height=100 src="https://i.imgur.com/Nw251pk.png"/>
</p>

<p align="center">
  <strong>A ladder tournament tracker for anyone and any sport 🏓</strong>
</p>

<p align="center">
  <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/DanielLarsenNZ/gameon"/>
  <img alt="Project License" src="https://img.shields.io/github/license/DanielLarsenNZ/gameon"/>
  <img alt="GitHub API Deploy Status" src="https://img.shields.io/github/workflow/status/DanielLarsenNZ/gameon/Deploy%20API?label=Deploy%20API">
  <img alt="GitHub App Deploy Status" src="https://img.shields.io/github/workflow/status/DanielLarsenNZ/gameon/Deploy%20Web%20App?label=Deploy%20Web%20App">
</p>
<br />

# About

GameOn! is a website for organising ladder tournaments, regardless of the sport. It has never been easier to create, manage, and run ladder tournaments for anyone or any game!

👉 Check it out at [gameon.nz](https://gameon.nz)

# Motivation

When chalkboards didn't cut it, the word just wasn't getting out, and colleagues walked by a desolate Ping Pong table day after day.. that's when [@DanielLarsenNZ](https://github.com/DanielLarsenNZ) and [@olafwrieden](https://github.com/olafwrieden) conceptualised the ladder tournament tracker GameOn!

__Our mantra:__ "It shouldn't be a hassle to organise, manage, compete, and win office tournaments." We exist to simplify your tournament management and discovery so you can (quite literally) GameOn!

A side-effect of this project is the incredible continuous learning we undertake as we build out this examplary full-stack architecture, using best practices and proven software engineering methodologies.

# Contribution

We recognise that the best projects aren't built alone. If you would like to contribute, __we would love to hear from you__. The following individuals have already made valuable contributions to GameOn!

![Contributors](https://contrib.rocks/image?repo=DanielLarsenNZ/gameon)

# Example: Table Tennis Rules

* If you challenge a player they have to play in within 5 working days (leave excluded), or forfeit the match
* A forfeit or refusal to play is the same as a loss
* Players choose the scoring/serves at the time they play, e.g. each game is first to 11 points, game must be won by two points, match is best of 5 games. [US rules](https://www.pongfit.org/official-rules-of-table-tennis) are good
* If you beat a player, you move up the ladder based on the [ELO ranking algorithm](https://dotnetcoretutorials.com/2018/09/18/calculating-elo-in-c/)
* There are no draws
* New players start with a ranking score of 400
* Doubles teams are separate to singles. Doubles can only challenge doubles, and individuals on a winning doubles team cannot claim a doubles match win as a singles match win
* Top of the ladder buys first round at the after Christmas party

# Useful Resources

## Developer Docs

* [Game On! API, Technical and Product Docs](/docs)
* [Deployment Docs](/deploy/README.md)
* [Client-side Dev](/client/README.md)
* [Server-side Dev](/server/README.md)

## Links & References

* [Calculating ELO in C#](https://dotnetcoretutorials.com/2018/09/18/calculating-elo-in-c/)
* [Dapr ASP.NET Core Controller Sample](https://github.com/dapr/dotnet-sdk/tree/master/examples/AspNetCore/ControllerSample)
* [Dapr Hello K8s Sample](https://github.com/dapr/quickstarts/tree/master/hello-kubernetes)
* [Detailed information on the Azure CosmosDB State Store Component](https://docs.dapr.io/operations/components/setup-state-store/supported-state-stores/setup-azure-cosmosdb/)
