#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["WoDevServer/WoDevServer.csproj", "WoDevServer/"]
RUN dotnet restore "WoDevServer/WoDevServer.csproj"
COPY . .
WORKDIR "/src/WoDevServer"
RUN dotnet build "WoDevServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WoDevServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish . 
ENTRYPOINT ["dotnet", "WoDevServer.dll"]