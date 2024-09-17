import type { Axios } from "axios";

export default (httpClient: Axios) => ({
    getAll: async () => {
        const response = await httpClient.get('/category');

        return {
            data: response.data
        }
    },
    getById: async (id: string| string[]) => {
        const response = await httpClient.get(`/category/${id}`);

        return {
            data: response.data
        }
    },
    create: async (data: Object) => {
        const response = await httpClient.post('/category', data);

        console.log(response);

        return {
            data: response.data
        }
    },
    updateById: async (id: string, data: Object) => {
        const response = await httpClient.put(`/category/${id}`, data);

        return {
            data: response.data
        }
    },
    deleteById: async (id: string) => {
        const response = await httpClient.delete(`/category/${id}`);

        return {
            data: response.data
        }
    }
});
