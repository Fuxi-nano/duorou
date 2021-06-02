import request from '@/utils/request';

export type StudentItem = {
    id: number;
    name: string;
};

export async function queryStudent() {
    return request('/api/student/list', {
        method: 'GET',
    });
}