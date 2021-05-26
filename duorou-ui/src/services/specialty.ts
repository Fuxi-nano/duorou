import request from '@/utils/request';

export type SpecialtyListItem = {
    id: number;
    name: string;
};

export async function querySpecialty() {
    return request('/api/specialty/list', {
        method: 'GET',
    });
}