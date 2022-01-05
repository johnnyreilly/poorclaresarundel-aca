FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Mailer.csproj", "./"]
RUN dotnet restore "Mailer.csproj"
COPY . .
WORKDIR "/src/Mailer"
RUN dotnet build "Mailer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Mailer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mailer.dll"]