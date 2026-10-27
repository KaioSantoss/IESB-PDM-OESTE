export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

export async function fetchNotices() {
  const response = await fetch(`${API_BASE_URL}/posts?_limit=10`);

  if (!response.ok) {
    throw new Error(`Falha ao carregar avisos (${response.status})`);
  }

  return response.json();
}
