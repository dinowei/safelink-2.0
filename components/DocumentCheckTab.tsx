import React, { useState, useCallback } from 'react';
import Spinner from './Spinner';
import ResultDisplay from './ResultDisplay';
import { AnalysisResult } from '../types';
import { analyzeDocument } from '../services/geminiService';

const DocumentCheckTab: React.FC = () => {
    const [docNumber, setDocNumber] = useState('');
    const [docType, setDocType] = useState('CPF');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const docTypes = ['CPF', 'CNPJ', 'RG', 'CNH'];

    const handleSubmit = useCallback(async () => {
        if (!docNumber.trim()) {
            setError('Por favor, digite o número do documento para verificar.');
            return;
        }

        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const analysisResult = await analyzeDocument(docNumber, docType);
            setResult(analysisResult);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [docNumber, docType]);

    return (
        <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Verificar por Documento</h2>
            <p className="mt-2 text-slate-400">Selecione o tipo e digite o número do documento para análise de fraude.</p>
            
            <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Documento:</label>
                <div className="flex flex-wrap gap-3">
                    {docTypes.map(type => (
                        <button 
                            key={type}
                            onClick={() => setDocType(type)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${docType === type ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="doc-input" className="block text-sm font-medium text-slate-300 sr-only">Número do Documento</label>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        id="doc-input"
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        placeholder={`Digite o número do ${docType}`}
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
            {isLoading && <Spinner message="Analisando documento..." />}
            {result && <ResultDisplay result={result} />}
        </div>
    );
};

export default DocumentCheckTab;