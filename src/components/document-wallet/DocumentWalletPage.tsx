import React, { useState } from 'react';
import { DocumentWallet } from './DocumentWallet';
import { DocumentUpload } from './DocumentUpload';
import { DocumentNotification } from './DocumentNotification';
import { mockDocumentData } from './mockDocumentData';
import { UploadIcon, BellIcon } from 'lucide-react';

export function DocumentWalletPage() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Get expiring documents
    const getExpiringDocuments = () => {
        if (!mockDocumentData) return [];
        return mockDocumentData.filter((doc) => {
            if (!doc.expiryDate) return false;
            const today = new Date();
            const expiry = new Date(doc.expiryDate);
            const diffTime = expiry.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 30 && diffDays >= 0;
        });
    };
    const expiringDocuments = getExpiringDocuments();

    return (
        <div className="space-y-0 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-gray-100 py-3 px-4 lg:px-6 border-b border-gray-200 shadow-sm">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                        Document Wallet
                    </h1>

                    {/* Notification + Upload buttons */}
                    <div className="flex flex-wrap gap-2">
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 relative"
                            >
                                <BellIcon size={20} />
                                {expiringDocuments.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {expiringDocuments.length}
                                    </span>
                                )}
                            </button>
                            {showNotifications && expiringDocuments.length > 0 && (
                                <DocumentNotification
                                    documents={expiringDocuments}
                                    onClose={() => setShowNotifications(false)}
                                />
                            )}
                        </div>

                        {/* Upload buttons (desktop + mobile) */}
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="md:flex hidden items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            <UploadIcon size={16} className="mr-1" />
                            Upload Document
                        </button>
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="flex md:hidden items-center justify-center p-2 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
                        >
                            <UploadIcon size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Document Wallet */}
            <DocumentWallet />

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <DocumentUpload
                    onClose={() => setIsUploadModalOpen(false)}
                    onUpload={(newDoc) => {
                        // Handle document upload logic here
                        setIsUploadModalOpen(false);
                    }}
                    categories={[
                        'Licensing',
                        'Legal',
                        'Certifications',
                        'Compliance',
                        'Insurance',
                        'Facilities',
                        'Tax',
                        'HR',
                    ]}
                />
            )}
        </div>
    );
}
