import React, { useState, useCallback } from 'react';
import Spinner from './Spinner';
import ResultDisplay from './ResultDisplay';
import { AnalysisResult } from '../types';
import { analyzeUrl } from '../services/geminiService';

const UrlCheckTab: React.FC = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async () => {
        if (!url.trim()) {
            setError('Por favor, digite uma URL para verificar.');
            return;
        }
        
        // Basic URL validation
        try {
             // A more lenient check for URLs that might not have a protocol yet
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                new URL('https://' + url);
            } else {
                new URL(url);
            }
        } catch (_) {
            setError('Por favor, insira uma URL válida (ex: exemplo.com).');
            return;
        }

        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const analysisResult = await analyzeUrl(url);
            setResult(analysisResult);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [url]);

    return (
        <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Verificar site por URL</h2>
            <p className="mt-2 text-slate-400">Digite o endereço do site que deseja verificar:</p>
            <div className="mt-6">
                <label htmlFor="url-input" className="block text-sm font-medium text-slate-300 sr-only">URL do site:</label>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="url"
                        id="url-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="exemplo.com"
                        className="flex-grow w-full px-4 py-3 border border-slate-600 bg-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg text-white placeholder-slate-400"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                    >
                        Verificar
                    </button>
                </div>
            </div>
            {error && <p className="mt-3 text-red-500">{error}</p>}
            {isLoading && <Spinner message="Analisando URL..." />}
            {result && <ResultDisplay result={result} />}
        </div>
    );
};

export default UrlCheckTab;
