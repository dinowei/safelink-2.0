import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tabs from './components/Tabs';
import UrlCheckTab from './components/UrlCheckTab';
import FileCheckTab from './components/FileCheckTab';
import TextCheckTab from './components/TextCheckTab';
import DocumentCheckTab from './components/DocumentCheckTab';
import PhoneCheckTab from './components/PhoneCheckTab';
import { ActiveTab } from './types';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.URL);

    const handleTabChange = useCallback((tab: ActiveTab) => {
        setActiveTab(tab);
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case ActiveTab.URL:
                return <UrlCheckTab />;
            case ActiveTab.DOCUMENT:
                return <DocumentCheckTab />;
            case ActiveTab.PHONE:
                return <PhoneCheckTab />;
            case ActiveTab.FILE:
                return <FileCheckTab />;
            case ActiveTab.TEXT:
                return <TextCheckTab />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-900 text-gray-200">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
                <div className="mt-8">
                    {renderTabContent()}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;