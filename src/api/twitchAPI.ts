import axios from 'axios';

export const twitchAPI = {
    search: (token: string, channel: string) => {
        return axios.get<FoundedChannels>(`https://api.twitch.tv/helix/search/channels?query=${channel}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb',
                }
            }
        )
    }
}


export type DataSearch = {
    broadcaster_language: string;
    broadcaster_login: string;
    display_name: string;
    game_id: string;
    game_name: string;
    id: string;
    is_live: boolean;
    tag_ids: any[];
    tags: string[];
    thumbnail_url: string;
    title: string;
    started_at: string;
}

export type Pagination = {
    cursor: string;
}

export type FoundedChannels = {
    data: DataSearch[];
    pagination: Pagination;
}