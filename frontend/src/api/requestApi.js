const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unexpected error' }));
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const fetchRequests = async () => {
  const response = await fetch(`${API_URL}/requests`);
  return handleResponse(response);
};

export const fetchStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  return handleResponse(response);
};

export const createRequest = async (payload) => {
  const response = await fetch(`${API_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const updateRequestStatus = async (id, payload) => {
  const response = await fetch(`${API_URL}/requests/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};
