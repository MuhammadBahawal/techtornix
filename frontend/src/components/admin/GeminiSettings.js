import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api, { API_ENDPOINTS } from '../../config/api';

const GeminiSettings = () => {
    const [activeTab, setActiveTab] = useState('settings');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        api_key: '',
        enabled: false,
        status: 'unconfigured',
        config: {
            model_name: 'gemini-pro',
            temperature: 0.7,
            top_k: 40,
            top_p: 0.95,
            max_output_tokens: 1024,
            system_prompt: ''
        }
    });
    const [logs, setLogs] = useState([]);
    const [testResponse, setTestResponse] = useState('');
    const [testMessage, setTestMessage] = useState('Hello, this is a test message from TechTornix admin panel.');
    const [newApiKey, setNewApiKey] = useState('');

    // Fetch status and configuration
    const fetchStatus = async () => {
        try {
            setLoading(true);
            console.log('Fetching Gemini status...');

            const response = await api.get(API_ENDPOINTS.GEMINI_STATUS);
            console.log('Status response:', response.data);

            if (response.data.success) {
                setStatus(response.data.data);
                setNewApiKey(response.data.data.api_key || '');
            } else {
                throw new Error(response.data.error || 'Failed to fetch status');
            }
        } catch (error) {
            console.error('Error fetching status:', error);
            toast.error('Failed to fetch Gemini status: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Fetch logs
    const fetchLogs = async () => {
        try {
            console.log('Fetching Gemini logs...');

            const response = await api.get(API_ENDPOINTS.GEMINI_LOGS);
            console.log('Logs response:', response.data);

            if (response.data.success) {
                setLogs(response.data.data || []);
            } else {
                throw new Error(response.data.error || 'Failed to fetch logs');
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
            toast.error('Failed to fetch logs: ' + (error.response?.data?.error || error.message));
        }
    };

    // Update API key
    const handleUpdateApiKey = async () => {
        if (!newApiKey.trim()) {
            toast.error('Please enter an API key');
            return;
        }

        try {
            setLoading(true);
            console.log('Updating API key...');

            const response = await api.post(API_ENDPOINTS.GEMINI_ADMIN, {
                action: 'update_key',
                api_key: newApiKey.trim()
            });

            console.log('Update key response:', response.data);

            if (response.data.success) {
                toast.success('API key updated successfully');
                await fetchStatus();
            } else {
                throw new Error(response.data.error || 'Failed to update API key');
            }
        } catch (error) {
            console.error('Error updating API key:', error);
            toast.error('Failed to update API key: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Test API key
    const handleTestApiKey = async () => {
        if (!newApiKey.trim()) {
            toast.error('Please enter an API key to test');
            return;
        }

        try {
            setLoading(true);
            console.log('Testing API key...');

            const response = await api.post(API_ENDPOINTS.GEMINI_ADMIN, {
                action: 'test_key',
                api_key: newApiKey.trim()
            });

            console.log('Test key response:', response.data);

            if (response.data.success) {
                toast.success('API key is valid!');
                setTestResponse('✅ API key test successful');
            } else {
                toast.error('API key test failed: ' + (response.data.error || 'Unknown error'));
                setTestResponse('❌ API key test failed: ' + (response.data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error testing API key:', error);
            const errorMsg = error.response?.data?.error || error.message;
            toast.error('API key test failed: ' + errorMsg);
            setTestResponse('❌ API key test failed: ' + errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Toggle Gemini enabled/disabled
    const handleToggleEnabled = async () => {
        try {
            setLoading(true);
            console.log('Toggling Gemini enabled status...');

            const response = await api.post(API_ENDPOINTS.GEMINI_ADMIN, {
                action: 'update_settings',
                enabled: !status.enabled
            });

            console.log('Toggle response:', response.data);

            if (response.data.success) {
                toast.success(`Gemini AI ${!status.enabled ? 'enabled' : 'disabled'} successfully`);
                await fetchStatus();
            } else {
                throw new Error(response.data.error || 'Failed to update settings');
            }
        } catch (error) {
            console.error('Error toggling enabled:', error);
            toast.error('Failed to update settings: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Update configuration
    const handleUpdateConfig = async () => {
        try {
            setLoading(true);
            console.log('Updating configuration...');

            const response = await api.post(API_ENDPOINTS.GEMINI_ADMIN, {
                action: 'update_config',
                config: status.config
            });

            console.log('Update config response:', response.data);

            if (response.data.success) {
                toast.success('Configuration updated successfully');
                await fetchStatus();
            } else {
                throw new Error(response.data.error || 'Failed to update configuration');
            }
        } catch (error) {
            console.error('Error updating config:', error);
            toast.error('Failed to update configuration: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Send test message
    const handleTestMessage = async () => {
        if (!testMessage.trim()) {
            toast.error('Please enter a test message');
            return;
        }

        try {
            setLoading(true);
            console.log('Sending test message...');

            const response = await api.post(API_ENDPOINTS.GEMINI_ADMIN, {
                action: 'test_message',
                message: testMessage.trim()
            });

            console.log('Test message response:', response.data);

            if (response.data.success) {
                setTestResponse(response.data.response);
                toast.success('Test message sent successfully');
            } else {
                const errorMsg = response.data.error || 'Unknown error';
                setTestResponse(response.data.fallback_response || `Error: ${errorMsg}`);
                toast.error('Test message failed: ' + errorMsg);
            }
        } catch (error) {
            console.error('Error sending test message:', error);
            const errorMsg = error.response?.data?.error || error.message;
            toast.error('Failed to send test message: ' + errorMsg);
            setTestResponse(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    // Update config field
    const updateConfigField = (field, value) => {
        setStatus(prev => ({
            ...prev,
            config: {
                ...prev.config,
                [field]: value
            }
        }));
    };

    // Load data on component mount
    useEffect(() => {
        fetchStatus();
        fetchLogs();
    }, []);

    const tabs = [
        { id: 'settings', label: 'API Settings', icon: '🔑' },
        { id: 'config', label: 'Configuration', icon: '⚙️' },
        { id: 'test', label: 'Test & Debug', icon: '🧪' },
        { id: 'logs', label: 'API Logs', icon: '📋' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gemini AI Settings</h2>
                <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${status.enabled
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {status.enabled ? '✅ Enabled' : '❌ Disabled'}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${status.status === 'configured'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {status.status === 'configured' ? '🔑 Configured' : '⚠️ Using Fallback'}
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'settings' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Google Gemini API Key
                            </label>
                            <div className="flex space-x-3">
                                <input
                                    type="password"
                                    value={newApiKey}
                                    onChange={(e) => setNewApiKey(e.target.value)}
                                    placeholder="Enter your Gemini API key..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleTestApiKey}
                                    disabled={loading || !newApiKey.trim()}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '⏳' : '🧪'} Test
                                </button>
                                <button
                                    onClick={handleUpdateApiKey}
                                    disabled={loading || !newApiKey.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '⏳' : '💾'} Save
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Get your API key from the <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>
                            </p>
                        </div>

                        <div>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={status.enabled}
                                    onChange={handleToggleEnabled}
                                    disabled={loading}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Enable Gemini AI Chatbot
                                </span>
                            </label>
                            <p className="mt-1 text-sm text-gray-500">
                                When disabled, the chatbot will use fallback responses
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'config' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Model Name
                                </label>
                                <select
                                    value={status.config.model_name}
                                    onChange={(e) => updateConfigField('model_name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="gemini-pro">Gemini Pro</option>
                                    <option value="gemini-pro-vision">Gemini Pro Vision</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Temperature ({status.config.temperature})
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={status.config.temperature}
                                    onChange={(e) => updateConfigField('temperature', parseFloat(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Top K
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={status.config.top_k}
                                    onChange={(e) => updateConfigField('top_k', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Top P
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={status.config.top_p}
                                    onChange={(e) => updateConfigField('top_p', parseFloat(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Output Tokens
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="8192"
                                    value={status.config.max_output_tokens}
                                    onChange={(e) => updateConfigField('max_output_tokens', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                System Prompt
                            </label>
                            <textarea
                                value={status.config.system_prompt}
                                onChange={(e) => updateConfigField('system_prompt', e.target.value)}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter system prompt for the AI..."
                            />
                        </div>

                        <button
                            onClick={handleUpdateConfig}
                            disabled={loading}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '⏳ Updating...' : '💾 Update Configuration'}
                        </button>
                    </div>
                )}

                {activeTab === 'test' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Test Message
                            </label>
                            <div className="flex space-x-3">
                                <textarea
                                    value={testMessage}
                                    onChange={(e) => setTestMessage(e.target.value)}
                                    rows="3"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter a test message..."
                                />
                                <button
                                    onClick={handleTestMessage}
                                    disabled={loading || !testMessage.trim()}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '⏳' : '🚀'} Send Test
                                </button>
                            </div>
                        </div>

                        {testResponse && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Response
                                </label>
                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-800">
                                        {testResponse}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'logs' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-800">Recent API Logs</h3>
                            <button
                                onClick={fetchLogs}
                                disabled={loading}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                            >
                                {loading ? '⏳' : '🔄'} Refresh
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Timestamp
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Request
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tokens
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Response Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {logs.length > 0 ? (
                                        logs.map((log, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(log.created_at).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                                    {log.request_text}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'success'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {log.tokens_used || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {log.response_time ? `${log.response_time}ms` : 'N/A'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No logs available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeminiSettings;
