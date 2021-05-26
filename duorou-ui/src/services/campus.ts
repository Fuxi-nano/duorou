import request from '@/utils/request';

export type CampusListItem = {
    id: number;
    name: string;
};

export async function queryCampus() {
    return request('/api/campus/list', {
        method: 'GET',
    });
}