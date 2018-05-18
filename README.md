# liri-bot
A simple node.js application that makes api requests to bring specific data to the user.
***
## Set Up
1. clone this repo onto local device. If you don't have api keys for spotify and/or twitter, go to these links.
    - **Spotify:** https://beta.developer.spotify.com/dashboard/
    - **Twitter** https://apps.twitter.com/app/new

2. create a .env file in the root of the cloned repository.
    - Your .env file should have this format with your keys for the values.

    ```
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret

    # Twitter API keys

    TWITTER_CONSUMER_KEY=your-twitter-consumer-key
    TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
    TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
    TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

    ```
3. type 'npm i' to download all package dependencies and then liri will be ready for use!

## giving Liri Commands

- To quickly refrence all commands type `node liri` into the terminal and press <ENTER>.

### Spot This Song
- ex. `node liri spot this song- Highway to Hell` searches for song titles on spotify

### Movie This
- ex. `node liri movie this- The Room` searches for movie titles using OMDB api

### My Tweets
- ex. `node liri my tweets` will show you your recent tweets from the twitter api.

### Do What It Says
- ex. `node liri do what it says- random.txt` will follow any liri command saved on a .txt file