import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-slate-900/50 border-b border-slate-700 text-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                 <div className="flex items-center justify-center gap-4 mb-2">
                    <i className="fas fa-shield-alt text-4xl sm:text-5xl text-blue-500"></i>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
                        FraudShield
                    </h1>
                </div>
                <p className="mt-2 text-lg sm:text-xl text-slate-300">
                    Sistema completo de análise para identificação de fraudes
                </p>
            </div>
        </header>
    );
};

export default Header;