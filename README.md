![Game On! Logo](https://i.imgur.com/Nw251pk.png)

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

## Help us translate Game On!
Are you fluent in a language that isn't currently supported? Help us translate Game On! into your language in minutes. Simply [create an issue](https://github.com/DanielLarsenNZ/gameon/issues/new/choose) referencing your language or create a [create a pull request](https://github.com/DanielLarsenNZ/gameon/compare) if you already know how i18n works.

## Links & References

[Calculating ELO in C#](https://dotnetcoretutorials.com/2018/09/18/calculating-elo-in-c/)

[Dapr ASP.NET Core Controller Sample](https://github.com/dapr/dotnet-sdk/tree/master/samples/AspNetCore/ControllerSample)

[Dapr Hellow K8s sample](https://github.com/dapr/quickstarts/tree/master/hello-kubernetes)

[Detailed information on the Azure CosmosDB state store component](https://docs.dapr.io/operations/components/setup-state-store/supported-state-stores/setup-azure-cosmosdb/)

[How to configure Azure Key Vault and Kubernetes to use Azure Managed Identities to access secrets](https://docs.dapr.io/operations/components/setup-secret-store/supported-secret-stores/azure-keyvault-managed-identity/)

[Running your first app in Kubernetes](https://yourazurecoach.com/2019/12/30/exploring-dapr-running-your-first-dapr-app-in-kubernetes/)

[Dapr K8s annotations](https://docs.dapr.io/operations/hosting/kubernetes/kubernetes-annotations/)
