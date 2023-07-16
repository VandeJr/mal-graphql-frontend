import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client/core/index.js";
import type { Anime } from "./models/Anime";

function getClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
      addTypename: false 
    }),
  });

  return client;
}

export async function getAnimeDetails(id: string): Promise<Anime> {
  const query = gql`{
    getAnimeDetail(id: ${id}) {
        id,
        title,
        alternative_titles {
            en, ja, synonyms
        },
        pictures {
            medium
        },
        main_picture {
            large
        },
        start_date, end_date,
        synopsis,
        mean,
        rank,
        popularity,
        num_list_users,
        nsfw,
        genres {
            name
        },
        media_type,
        status,
        num_episodes,
        start_season {
            season, year
        },
        source,
        average_episode_duration,
        rating,
        studios {
            name
        }
    }
  }`
  const { data } = await getClient().query({query})

  return data.getAnimeDetail as Anime
}

export async function getAnimeList(search: string, limit = 28, offset = 0): Promise<Anime[]> {
  const query = gql`{
    getAnimeList(search: "${search}", limit: ${limit}, offset: ${offset}) {
      id,
      title,
      mean,
      num_list_users,
      rank,
      main_picture {
        medium
      }
    }
  }`
  const { data } = await getClient().query({query})

  return data.getAnimeList as Anime[]
}

export async function getAnimeRanking(rankingType: string, limit = 28, offset = 0): Promise<Anime[]> {
  const query = gql`{
    getAnimeRanking(rankingType: "${rankingType}", limit: ${limit}, offset: ${offset}) {
      id,
      title,
      mean,
      rank,
      num_list_users,
      main_picture {
          medium
      }
    }
  }`

  const { data } = await getClient().query({query})

  return data.getAnimeRanking as Anime[]
}

export async function getSeasonalAnime(sort: string, season: string, year: string, limit = 28, offset = 0): Promise<Anime[]> {
  const query = gql`{
    getSeasonalAnime(sort: "${sort}", season: "${season}", year: ${year}, limit: ${limit}, offset: ${offset}) {
      id,
      title,
      mean,
      rank,
      num_list_users,
      main_picture {
          medium
      }
    }
  }`
  const { data } = await getClient().query({query})

  return data.getSeasonalAnime as Anime[]
}