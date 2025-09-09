import React, { useState, useCallback, useRef } from 'react';
import Spinner from './Spinner';
import ResultDisplay from './ResultDisplay';
import { AnalysisResult } from '../types';
import { analyzeImageContent } from '../services/geminiService';

const FileCheckTab: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFile: File | null) => {
        if (selectedFile) {
            // Keeping frontend validation for user experience, but backend should re-validate
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'text/plain', 'text/html', 'application/pdf', 'application/msword'];
            // A more robust check might be needed for docx, etc.
            if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.docx')) {
                setError('Tipo de arquivo não suportado. Por favor, envie uma imagem, PDF, DOCX ou arquivo de texto.');
                setFile(null);
                return;
            }
            setError(null);
            setFile(selectedFile);
        }
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleSubmit = useCallback(async () => {
        if (!file) {
            setError('Por favor, selecione um arquivo para verificar.');
            return;
        }

        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const analysisResult = await analyzeImageContent(file);
            setResult(analysisResult);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [file]);

    return (
        <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Verificar por arquivo</h2>
            <p className="mt-2 text-slate-400">Faça upload de uma imagem (screenshot), PDF, DOCX ou arquivo de texto para análise.</p>
            
            <div className="mt-6">
                 <div 
                    className={`p-6 text-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-slate-700' : 'border-slate-600 hover:border-blue-500'}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/jpeg,image/png,image/webp,text/plain,text/html,application/pdf,.doc,.docx"
                    />
                    <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-500"></i>
                    <p className="mt-2 text-sm text-slate-400">Arraste e solte o arquivo aqui, ou <span className="font-semibold text-blue-500">clique para selecionar</span></p>
                    {file && <p className="mt-2 text-sm font-medium text-slate-200">Arquivo selecionado: {file.name}</p>}
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !file}
                    className="w-full inline-flex justify-center items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                >
                    Verificar Arquivo
                </button>
            </div>
            {error && <p className="mt-3 text-red-500">{error}</p>}
            {isLoading && <Spinner message="Analisando arquivo..." />}
            {result && <ResultDisplay result={result} />}
        </div>
    );
};

export default FileCheckTab;
