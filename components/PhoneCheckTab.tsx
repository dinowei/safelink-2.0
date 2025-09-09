import React, { useState, useCallback } from 'react';
import Spinner from './Spinner';
import ResultDisplay from './ResultDisplay';
import { AnalysisResult } from '../types';
import { analyzePhoneNumber } from '../services/geminiService';

const PhoneCheckTab: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async () => {
        if (!phoneNumber.trim()) {
            setError('Por favor, digite um número de telefone para verificar.');
            return;
        }
        
        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const analysisResult = await analyzePhoneNumber(phoneNumber);
            setResult(analysisResult);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [phoneNumber]);

    return (
        <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Verificar por Telefone</h2>
            <p className="mt-2 text-slate-400">Digite o número de telefone que deseja verificar:</p>
            <div className="mt-6">
                <label htmlFor="phone-input" className="block text-sm font-medium text-slate-300 sr-only">Número de Telefone:</label>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="tel"
                        id="phone-input"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(11) 99999-9999"
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
            {isLoading && <Spinner message="Analisando telefone..." />}
            {result && <ResultDisplay result={result} />}
        </div>
    );
};

export default PhoneCheckTab;
