import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
const GeminiSettings = () => {
    const [settings, setSettings] = useState({
        enabled: false,
        apiKey: '',
        status: 'not_configured'
    });
    const [config, setConfig] = useState({
        model_name: 'gemini-pro',
        temperature: 0.7,
        top_k: 40,
        top_p: 0.95,
        max_output_tokens: 1024,
        system_prompt: ''
    });
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [testMessage, setTestMessage] = useState('Hello, this is a test message from TechTornix admin panel.');
    const [testResponse, setTestResponse] = useState('');
    const [activeTab, setActiveTab] = useState('settings');

    useEffect(() => {
        fetchStatus();
        fetchLogs();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await fetch('/api/gemini/admin?action=status');
            const data = await response.json();

            if (data.success) {
                setSettings({
                    enabled: data.data.enabled,
                    apiKey: data.data.api_key,
                    status: data.data.status
                });
                setConfig(data.data.config);
            }
        } catch (error) {
            console.error('Failed to fetch status:', error);
            toast.error('Failed to fetch Gemini status');
        }
    };

    const fetchLogs = async () => {
        try {
            const response = await fetch('/api/gemini/admin?action=logs&limit=20');
            const data = await response.json();

            if (data.success) {
                setLogs(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error);
        }
    };

    const handleUpdateApiKey = async () => {
        if (!settings.apiKey.trim()) {
            toast.error('API key is required');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/gemini/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update_key',
                    api_key: settings.apiKey
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('API key updated successfully');
                fetchStatus();
            } else {
                toast.error(data.error || 'Failed to update API key');
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleTestApiKey = async () => {
        if (!settings.apiKey.trim()) {
            toast.error('API key is required');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/gemini/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'test_key',
                    api_key: settings.apiKey
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('API key test successful!');
                setTestResponse(data.response);
            } else {
                toast.error(data.error || 'API key test failed');
                setTestResponse(data.error);
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleEnabled = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/gemini/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update_settings',
                    enabled: !settings.enabled
                })
            });

            const data = await response.json();

            if (data.success) {
                setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
                toast.success(`Gemini ${!settings.enabled ? 'enabled' : 'disabled'} successfully`);
            } else {
                toast.error(data.error || 'Failed to update settings');
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateConfig = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/gemini/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update_config',
                    config: config
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Configuration updated successfully');
                fetchStatus();
            } else {
                toast.error(data.error || 'Failed to update configuration');
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleTestMessage = async () => {
        if (!testMessage.trim()) {
            toast.error('Test message is required');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/gemini/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'test_message',
                    message: testMessage
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Test message sent successfully!');
                setTestResponse(data.response);
                fetchLogs(); // Refresh logs
            } else {
                toast.error(data.error || 'Test message failed');
                setTestResponse(data.fallback_response || data.error);
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = () => {
        const statusConfig = {
            configured: { color: 'bg-green-100 text-green-800', text: 'Configured' },
            using_fallback: { color: 'bg-yellow-100 text-yellow-800', text: 'Using Fallback' },
            not_configured: { color: 'bg-red-100 text-red-800', text: 'Not Configured' }
        };

        const config = statusConfig[settings.status] || statusConfig.not_configured;

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Gemini AI Settings</h2>
                            <p className="text-gray-600">Manage your Google Gemini API integration</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            {getStatusBadge()}
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.enabled}
                                    onChange={handleToggleEnabled}
                                    disabled={loading}
                                    className="sr-only"
                                />
                                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.enabled ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.enabled ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </div>
                                <span className="ml-2 text-sm text-gray-700">
                                    {settings.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 px-6">
                        {[
                            { id: 'settings', name: 'API Settings' },
                            { id: 'config', name: 'Configuration' },
                            { id: 'test', name: 'Test & Debug' },
                            { id: 'logs', name: 'API Logs' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    API Key
                                </label>
                                <div className="flex space-x-3">
                                    <input
                                        type="password"
                                        value={settings.apiKey}
                                        onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                                        placeholder="Enter your Gemini API key"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleTestApiKey}
                                        disabled={loading}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                    >
                                        Test
                                    </button>
                                    <button
                                        onClick={handleUpdateApiKey}
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Update
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Current: {settings.apiKey || 'Using fallback key'}
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'config' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Model Name
                                    </label>
                                    <select
                                        value={config.model_name}
                                        onChange={(e) => setConfig(prev => ({ ...prev, model_name: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="gemini-pro">gemini-pro</option>
                                        <option value="gemini-pro-vision">gemini-pro-vision</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Temperature ({config.temperature})
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={config.temperature}
                                        onChange={(e) => setConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Top K
                                    </label>
                                    <input
                                        type="number"
                                        value={config.top_k}
                                        onChange={(e) => setConfig(prev => ({ ...prev, top_k: parseInt(e.target.value) }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Max Output Tokens
                                    </label>
                                    <input
                                        type="number"
                                        value={config.max_output_tokens}
                                        onChange={(e) => setConfig(prev => ({ ...prev, max_output_tokens: parseInt(e.target.value) }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    System Prompt
                                </label>
                                <textarea
                                    value={config.system_prompt}
                                    onChange={(e) => setConfig(prev => ({ ...prev, system_prompt: e.target.value }))}
                                    rows={10}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter the system prompt for Gemini..."
                                />
                            </div>
                            <button
                                onClick={handleUpdateConfig}
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                Update Configuration
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
                                        rows={3}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter a test message..."
                                    />
                                    <button
                                        onClick={handleTestMessage}
                                        disabled={loading}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Send Test
                                    </button>
                                </div>
                            </div>
                            {testResponse && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Response
                                    </label>
                                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                                        <pre className="whitespace-pre-wrap text-sm">{testResponse}</pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'logs' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">Recent API Logs</h3>
                                <button
                                    onClick={fetchLogs}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                >
                                    Refresh
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Request
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Response
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tokens
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {logs.map((log) => (
                                            <tr key={log.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(log.created_at).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                                    {log.request_text}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                                    {log.response_text}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'success'
                                                            ? 'bg-green-100 text-green-800'
                                                            : log.status === 'error'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {log.tokens_used}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeminiSettings;
