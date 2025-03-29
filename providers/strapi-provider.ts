import axios, { AxiosInstance } from 'axios';

// Strapi API configuration
const STRAPI_API_URL =
  process.env.EXPO_PUBLIC_STRAPI_API_URL || 'https://5fce-45-112-40-146.ngrok-free.app/api'; // Update if deployed
const STRAPI_API_TOKEN = process.env.EXPO_PUBLIC_STRAPI_API_TOKEN!; // From Strapi admin

// Create an Axios instance for Strapi
const strapiClient: AxiosInstance = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Interface for query parameters (optional filtering, sorting, etc.)
interface QueryParams {
  filters?: Record<string, any>; // e.g., { "title": { "$contains": "test" } }
  populate?: string | string[]; // e.g., "author" or ["author", "comments"]
  sort?: string | string[]; // e.g., "title:asc" or ["title:asc", "createdAt:desc"]
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

// Strapi provider functions
export const strapiProvider = {
  // Fetch all items from a collection with optional query params
  async getList<T>(endpoint: string, params: QueryParams = {}): Promise<T[]> {
    const response = await strapiClient.get(`/${endpoint}`, { params });
    return response.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  },

  // Fetch a single item by ID with optional query params
  async getOne<T>(endpoint: string, id: string, params: QueryParams = {}): Promise<T> {
    const response = await strapiClient.get(`/${endpoint}/${id}`, { params });
    return { id: response.data.data.id, ...response.data.data.attributes };
  },

  // Create a new item in a collection
  async create<T>(endpoint: string, data: Partial<T>): Promise<T> {
    const response = await strapiClient.post(`/${endpoint}`, { data });
    return { id: response.data.data.id, ...response.data.data.attributes };
  },

  // Update an existing item by ID
  async update<T>(endpoint: string, id: string, data: Partial<T>): Promise<T> {
    const response = await strapiClient.put(`/${endpoint}/${id}`, { data });
    return { id: response.data.data.id, ...response.data.data.attributes };
  },

  // Delete an item by ID
  async delete<T>(endpoint: string, id: string): Promise<T> {
    const response = await strapiClient.delete(`/${endpoint}/${id}`);
    return { id: response.data.data.id, ...response.data.data.attributes };
  },

  // Fetch multiple items by IDs (using filters)
  async getByIds<T>(endpoint: string, ids: string[]): Promise<T[]> {
    const params: QueryParams = {
      filters: { id: { $in: ids } },
    };
    const response = await strapiClient.get(`/${endpoint}`, { params });
    return response.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  },

  // Count items in a collection with optional filters
  async count(endpoint: string, filters: Record<string, any> = {}): Promise<number> {
    const response = await strapiClient.get(`/${endpoint}/count`, {
      params: { filters },
    });
    return response.data; // Strapi returns a number for /count
  },

  // Bulk create items
  async bulkCreate<T>(endpoint: string, items: Partial<T>[]): Promise<T[]> {
    const response = await strapiClient.post(`/${endpoint}`, { data: items });
    return response.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  },

  // Bulk update items (requires custom Strapi controller if not natively supported)
  async bulkUpdate<T>(endpoint: string, items: { id: string; data: Partial<T> }[]): Promise<T[]> {
    const promises = items.map((item) =>
      strapiClient.put(`/${endpoint}/${item.id}`, { data: item.data })
    );
    const responses = await Promise.all(promises);
    return responses.map((response) => ({
      id: response.data.data.id,
      ...response.data.data.attributes,
    }));
  },

  // Bulk delete items by IDs
  async bulkDelete<T>(endpoint: string, ids: string[]): Promise<T[]> {
    const promises = ids.map((id) => strapiClient.delete(`/${endpoint}/${id}`));
    const responses = await Promise.all(promises);
    return responses.map((response) => ({
      id: response.data.data.id,
      ...response.data.data.attributes,
    }));
  },
};
