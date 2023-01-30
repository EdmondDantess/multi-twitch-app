import {instance} from './instance';

export const twitchAPI = {
    searchChannel(token: string, channel: string) {
        return instance.get<FoundedChannels>(`helix/search/channels?query=${channel}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb',
                }
            }
        )
    },
    getUserInfo(token: string) {
        return instance.get<UserInfo>('helix/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb',
            }
        })
    },
    getMyFollowsApi(token: string, userID: string) {
        return instance.get<MyFollows>(`helix/users/follows?from_id=${userID}&first=100`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb',
            }
        })
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

export type UserDataInfo = {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
    created_at: string;
}

export type UserInfo = {
    data: UserDataInfo[];
}

export type DataFollows = {
    from_id: string;
    from_login: string;
    from_name: string;
    to_id: string;
    to_login: string;
    to_name: string;
    followed_at: string;
}

export type PaginationFollows = {}

export type MyFollows = {
    total: number;
    data: DataFollows[];
    pagination: PaginationFollows;
}