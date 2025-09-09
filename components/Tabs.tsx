import React from 'react';
import { ActiveTab } from '../types';

interface TabsProps {
    activeTab: ActiveTab;
    onTabChange: (tab: ActiveTab) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: ActiveTab.URL, label: 'Sites', icon: 'fa-solid fa-link' },
        { id: ActiveTab.DOCUMENT, label: 'Documentos', icon: 'fa-solid fa-id-card' },
        { id: ActiveTab.PHONE, label: 'Telefones', icon: 'fa-solid fa-phone' },
        { id: ActiveTab.FILE, label: 'Arquivos', icon: 'fa-solid fa-file-arrow-up' },
        { id: ActiveTab.TEXT, label: 'Textos', icon: 'fa-solid fa-file-lines' }
    ];

    return (
        <div className="border-b border-slate-700">
            <nav className="-mb-px flex flex-wrap justify-center sm:space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                            }
                            group inline-flex items-center justify-center py-4 px-1 border-b-2 font-medium text-base transition-all duration-200 ease-in-out
                        `}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                    >
                         <i className={`${tab.icon} -ml-0.5 mr-2 h-5 w-5`}></i>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Tabs;