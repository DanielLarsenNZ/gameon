#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["GameOn.Tournaments/GameOn.Tournaments.csproj", "GameOn.Tournaments/"]
COPY ["GameOn.Common/GameOn.Common.csproj", "GameOn.Common/"]
COPY ["GameOn.CommonCore/GameOn.CommonCore.csproj", "GameOn.Common/"]
RUN dotnet restore "GameOn.Tournaments/GameOn.Tournaments.csproj"
COPY . .
WORKDIR "/src/GameOn.Tournaments"
RUN dotnet build "GameOn.Tournaments.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GameOn.Tournaments.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GameOn.Tournaments.dll"]