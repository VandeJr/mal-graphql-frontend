export interface Picture {
    medium: string
    large: string
}

export interface Node {
    id: number
    title: string
    main_picture: Picture
}

export interface Status {
    watching: string
    completed: string
    on_hold: string
    dropped: string
    plan_to_watch: string
}

export interface AlternativeTitles {
    synonyms: string[]
    en: string
    ja: string
}

export interface Broadcast {
    day_of_the_week: string
    start_time: string
}

export interface Genre {
    id: number
    name: string
}

export interface Recommendation {
    node: Node
    num_recommendations: number
}

export interface RelatedAnime {
    node: Node
    relation_type: string
    relation_type_formatted: string
}

export interface StartSeason {
    year: number
    season: string
}

export interface Statistics {
    status: Status
    num_list_users: number
}

export interface Anime {
    id: number
    title: string
    main_picture: Picture
    alternative_titles: AlternativeTitles
    start_date: Date
    end_date: Date
    synopsis: string
    mean: number
    rank: number
    popularity: number
    num_list_users: number
    num_scoring_users: number
    nsfw: string
    created_at: Date
    updated_at: Date
    media_type: string
    status: string
    genres: Genre[]
    num_episodes: number
    start_season: StartSeason
    broadcast: Broadcast
    source: string
    average_episode_duration: number
    rating: string
    pictures: Picture[]
    background: string
    related_anime: RelatedAnime[]
    recommendations: Recommendation[]
    studios: Genre[]
    statistics: Statistics
}
