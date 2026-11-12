import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { type AxiosError, type AxiosInstance } from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';
const clientConfig = {
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
};

const api = axios.create(clientConfig);
const publicApi = axios.create(clientConfig);

type ApiErrorResponse = {
  message?: string;
  mensagem?: string;
  erro?: string;
  error?: string;
};

type ApiError = AxiosError<ApiErrorResponse> & { userMessage: string };
type EntityId = string | number;

function addErrorMessageInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (!axios.isAxiosError<ApiErrorResponse>(error)) {
        return Promise.reject(error);
      }

      const data = error.response?.data;
      const message =
        data?.message ||
        data?.mensagem ||
        data?.erro ||
        data?.error ||
        'Erro de conexão com o servidor';

      return Promise.reject(Object.assign(error, { userMessage: message }) as ApiError);
    },
  );
}

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

addErrorMessageInterceptor(api);
addErrorMessageInterceptor(publicApi);

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (error as ApiError).userMessage || 'Erro de conexão com o servidor';
  }
  return error instanceof Error ? error.message : 'Erro inesperado';
}

export const getAuthToken = () => AsyncStorage.getItem('@token');
export const saveAuthToken = (token: string) => AsyncStorage.setItem('@token', token);
export const clearAuthToken = () => AsyncStorage.removeItem('@token');

export const login = (email: string, senha: string) =>
  api.post<{ token: string }>('/api/usuario/login', { email, senha });

export const getMe = () => api.get('/api/usuario/me');

export const getPessoasFisicas = () => api.get('/api/pessoaFisica');
export const getPessoaFisica = (id: EntityId) => api.get(`/api/pessoaFisica/${id}`);
export const cadastroPF = (data: unknown) => publicApi.post('/api/pessoaFisica', data);
export const createPessoaFisica = (data: unknown) => api.post('/api/pessoaFisica', data);
export const updatePessoaFisica = (id: EntityId, data: unknown) =>
  api.put(`/api/pessoaFisica/${id}`, data);
export const deletePessoaFisica = (id: EntityId) => api.delete(`/api/pessoaFisica/${id}`);

export const getPessoasJuridicas = () => api.get('/api/pessoa-juridica');
export const getPessoaJuridica = (id: EntityId) => api.get(`/api/pessoa-juridica/${id}`);
export const cadastroPJ = (data: unknown) => publicApi.post('/api/pessoa-juridica', data);
export const createPessoaJuridica = (data: unknown) => api.post('/api/pessoa-juridica', data);
export const updatePessoaJuridica = (id: EntityId, data: unknown) =>
  api.put(`/api/pessoa-juridica/${id}`, data);
export const deletePessoaJuridica = (id: EntityId) => api.delete(`/api/pessoa-juridica/${id}`);

export const getEnderecos = () => api.get('/api/endereco');
export const getEndereco = (id: EntityId) => api.get(`/api/endereco/${id}`);
export const createEndereco = (data: unknown) => api.post('/api/endereco', data);
export const updateEndereco = (id: EntityId, data: unknown) =>
  api.put(`/api/endereco/${id}`, data);
export const deleteEndereco = (id: EntityId) => api.delete(`/api/endereco/${id}`);

export const getTelefones = () => api.get('/api/telefones');
export const getTelefone = (id: EntityId) => api.get(`/api/telefones/${id}`);
export const createTelefone = (data: unknown) => api.post('/api/telefones', data);
export const updateTelefone = (id: EntityId, data: unknown) =>
  api.put(`/api/telefones/${id}`, data);
export const deleteTelefone = (id: EntityId) => api.delete(`/api/telefones/${id}`);

export const getProdutos = () => api.get('/api/produto');
export const getProduto = (id: EntityId) => api.get(`/api/produto/${id}`);
export const createProduto = (data: unknown) => api.post('/api/produto', data);
export const updateProduto = (id: EntityId, data: unknown) =>
  api.put(`/api/produto/${id}`, data);
export const deleteProduto = (id: EntityId) => api.delete(`/api/produto/${id}`);

export const getPedidos = () => api.get('/api/pedido');
export const getPedido = (id: EntityId) => api.get(`/api/pedido/${id}`);
export const getMeusPedidos = () => api.get('/api/pedido/meus-pedidos');
export const createPedido = (data: unknown) => api.post('/api/pedido', data);
export const updatePedido = (id: EntityId, data: unknown) => api.put(`/api/pedido/${id}`, data);
export const deletePedido = (id: EntityId) => api.delete(`/api/pedido/${id}`);

export const getItensPedido = () => api.get('/api/itens-pedido');
export const getItemPedido = (id: EntityId) => api.get(`/api/itens-pedido/${id}`);
export const createItemPedido = (data: unknown) => api.post('/api/itens-pedido', data);
export const updateItemPedido = (id: EntityId, data: unknown) =>
  api.put(`/api/itens-pedido/${id}`, data);
export const deleteItemPedido = (id: EntityId) => api.delete(`/api/itens-pedido/${id}`);

export const getVeiculos = () => api.get('/api/veiculo');
export const getVeiculo = (id: EntityId) => api.get(`/api/veiculo/${id}`);
export const createVeiculo = (data: unknown) => api.post('/api/veiculo', data);
export const updateVeiculo = (id: EntityId, data: unknown) => api.put(`/api/veiculo/${id}`, data);
export const deleteVeiculo = (id: EntityId) => api.delete(`/api/veiculo/${id}`);

export const getStatusFabricacao = (veiculoId: EntityId) =>
  api.get(`/api/veiculo/${veiculoId}/status`);
export const createStatusFabricacao = (veiculoId: EntityId, status: unknown) =>
  api.post(`/api/veiculo/${veiculoId}/status`, JSON.stringify(status), {
    headers: { 'Content-Type': 'application/json' },
  });

export default api;
