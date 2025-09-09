import { AnalysisResult } from '../types';

const API_BASE_URL = '/api'; // Assumes the backend is served from the same origin

const handleApiResponse = async (response: Response): Promise<AnalysisResult> => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro de comunicação com o servidor.' }));
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }
    return response.json();
};

const callApi = async (endpoint: string, body: object): Promise<AnalysisResult> => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return handleApiResponse(response);
    } catch (error) {
        console.error(`Error calling API endpoint ${endpoint}:`, error);
        throw new Error('Não foi possível conectar ao serviço de análise. Verifique sua conexão e tente novamente.');
    }
};

export const analyzeUrl = async (url: string): Promise<AnalysisResult> => {
    return callApi('/check-url', { url });
};

export const analyzeTextContent = async (text: string): Promise<AnalysisResult> => {
    return callApi('/check-text', { text });
};

export const analyzeDocument = async (docNumber: string, docType: string): Promise<AnalysisResult> => {
    return callApi('/check-document', { number: docNumber, type: docType });
};

export const analyzePhoneNumber = async (phoneNumber: string): Promise<AnalysisResult> => {
    return callApi('/check-phone', { phoneNumber });
};

export const analyzeImageContent = async (file: File): Promise<AnalysisResult> => {
     try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/check-file`, {
            method: 'POST',
            body: formData,
        });
        return handleApiResponse(response);
    } catch (error) {
        console.error('Error calling API endpoint /check-file:', error);
        throw new Error('Não foi possível conectar ao serviço de análise de arquivos. Verifique sua conexão e tente novamente.');
    }
};
