import React from 'react';
import {
    FileTextIcon,
    ClockIcon,
    AlertTriangleIcon,
    CheckCircleIcon,
} from 'lucide-react';
export function DocumentDashboard({ stats, onFilterByStatus, activeFilter }) {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div
                    className={`bg-white rounded-lg border ${activeFilter === null ? 'border-gray-200' : 'border-blue-300 shadow-sm'} p-4 flex items-center cursor-pointer transition-all hover:border-blue-300 hover:shadow-sm`}
                    onClick={() => onFilterByStatus(null)}
                >
                    <div className="rounded-full bg-blue-100 p-3 mr-3 flex-shrink-0">
                        <FileTextIcon size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total</p>
                        <p className="text-xl font-semibold">{stats.total}</p>
                    </div>
                </div>
                <div
                    className={`bg-white rounded-lg border ${activeFilter === 'active' ? 'border-green-300 shadow-sm' : 'border-gray-200'} p-4 flex items-center cursor-pointer transition-all hover:border-green-300 hover:shadow-sm`}
                    onClick={() => onFilterByStatus('active')}
                >
                    <div className="rounded-full bg-green-100 p-3 mr-3 flex-shrink-0">
                        <CheckCircleIcon size={20} className="text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active</p>
                        <p className="text-xl font-semibold">{stats.active}</p>
                    </div>
                </div>
                <div
                    className={`bg-white rounded-lg border ${activeFilter === 'expiring' ? 'border-yellow-300 shadow-sm' : 'border-gray-200'} p-4 flex items-center cursor-pointer transition-all hover:border-yellow-300 hover:shadow-sm`}
                    onClick={() => onFilterByStatus('expiring')}
                >
                    <div className="rounded-full bg-yellow-100 p-3 mr-3 flex-shrink-0">
                        <ClockIcon size={20} className="text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Expiring</p>
                        <p className="text-xl font-semibold">{stats.expiring}</p>
                    </div>
                </div>
                <div
                    className={`bg-white rounded-lg border ${activeFilter === 'expired' ? 'border-red-300 shadow-sm' : 'border-gray-200'} p-4 flex items-center cursor-pointer transition-all hover:border-red-300 hover:shadow-sm`}
                    onClick={() => onFilterByStatus('expired')}
                >
                    <div className="rounded-full bg-red-100 p-3 mr-3 flex-shrink-0">
                        <AlertTriangleIcon size={20} className="text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Expired</p>
                        <p className="text-xl font-semibold">{stats.expired}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
