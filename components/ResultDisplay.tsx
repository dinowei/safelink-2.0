import React from 'react';
import { AnalysisResult, RiskLevel, CheckDetail } from '../types';

interface ResultDisplayProps {
    result: AnalysisResult;
}

const resultConfig = {
    [RiskLevel.SAFE]: {
        borderColor: 'border-green-500',
        icon: 'fa-solid fa-circle-check',
        iconColor: 'text-green-500',
        title: 'Análise Concluída: Baixo Risco',
        recommendation: 'Esta verificação parece segura. Nossa análise não detectou problemas significativos. Mantenha sempre suas defesas de segurança ativas.'
    },
    [RiskLevel.WARNING]: {
        borderColor: 'border-yellow-500',
        icon: 'fa-solid fa-triangle-exclamation',
        iconColor: 'text-yellow-500',
        title: 'Análise Concluída: Médio Risco',
        recommendation: 'Esta verificação apresenta algumas características suspeitas. Recomendamos cautela e verificação adicional antes de prosseguir.'
    },
    [RiskLevel.DANGER]: {
        borderColor: 'border-red-500',
        icon: 'fa-solid fa-shield-virus',
        iconColor: 'text-red-500',
        title: 'Análise Concluída: Alto Risco',
        recommendation: 'Esta verificação apresenta múltiplos indicadores de risco. Recomendamos fortemente evitar e, se aplicável, reportar às autoridades.'
    }
};

const CheckItem: React.FC<{ check: CheckDetail }> = ({ check }) => {
    let icon, color;

    if (check.result === true) {
        icon = 'fa-solid fa-check-circle';
        color = 'text-green-400';
    } else if (check.result === false) {
        icon = 'fa-solid fa-times-circle';
        color = 'text-red-400';
    } else {
        icon = 'fa-solid fa-question-circle';
        color = 'text-yellow-400';
    }

    return (
        <li className="flex items-start py-2">
            <i className={`${icon} ${color} mr-3 mt-1`}></i>
            <div>
                <span className="font-semibold text-slate-200">{check.name}:</span>
                <span className="ml-2 text-slate-300">{check.details}</span>
            </div>
        </li>
    );
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    const config = resultConfig[result.riskLevel] || resultConfig[RiskLevel.WARNING];

    return (
        <div className={`mt-6 p-5 border-l-4 rounded-r-lg bg-slate-800/50 ${config.borderColor}`}>
            <div className="flex items-center">
                <i className={`${config.icon} ${config.iconColor} text-2xl`}></i>
                <div className="ml-4">
                    <h3 className={`text-xl font-bold text-white`}>{config.title}</h3>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="text-lg font-semibold text-slate-200 mb-2">Detalhes da Verificação:</h4>
                <ul className="divide-y divide-slate-700">
                    {result.checks.map((check, index) => (
                        <CheckItem key={index} check={check} />
                    ))}
                </ul>
            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-700">
                 <h4 className="text-lg font-semibold text-slate-200 mb-2">Recomendações:</h4>
                 <p className="text-slate-300">{config.recommendation}</p>
            </div>
        </div>
    );
};

export default ResultDisplay;
