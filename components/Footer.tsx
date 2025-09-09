import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-400 text-sm">
                <p>FraudShield - Ferramenta de verificação de fraudes online</p>
                <p className="mt-1">Este é um protótipo. Para uma análise completa, utilize serviços profissionais de segurança.</p>
            </div>
        </footer>
    );
};

export default Footer;