import React, { useState, useCallback } from 'react';
import Spinner from './Spinner';
import ResultDisplay from './ResultDisplay';
import { AnalysisResult } from '../types';
import { analyzeTextContent } from '../services/geminiService';

const TextCheckTab: React.FC = () => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async () => {
        if (!text.trim()) {
            setError('Por favor, cole algum texto para verificar.');
            return;
        }

        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const analysisResult = await analyzeTextContent(text);
            setResult(analysisResult);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [text]);

    return (
        <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Verificar por texto</h2>
            <p className="mt-2 text-slate-400">Cole abaixo o texto suspeito (ex: email, mensagem) ou informações sobre o site:</p>
            <div className="mt-6">
                <label htmlFor="text-input" className="block text-sm font-medium text-slate-300 sr-only">Texto para análise:</label>
                <textarea
                    id="text-input"
                    rows={8}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Cole aqui o texto suspeito..."
                    className="w-full px-4 py-3 border border-slate-600 bg-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base text-white placeholder-slate-400"
                    disabled={isLoading}
                />
            </div>
            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                >
                    Verificar Texto
                </button>
            </div>
            {error && <p className="mt-3 text-red-500">{error}</p>}
            {isLoading && <Spinner message="Analisando texto..." />}
            {result && <ResultDisplay result={result} />}
        </div>
    );
};

export default TextCheckTab;
