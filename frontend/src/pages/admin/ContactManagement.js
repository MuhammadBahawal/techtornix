import React, { useState, useEffect } from 'react';
import { FiMail, FiUser, FiPhone, FiBriefcase, FiMessageSquare, FiTrash2, FiEye, FiClock, FiStar } from 'react-icons/fi';
import adminDataManager from '../../utils/adminData';

const ContactManagement = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('all'); // all, unread, read, starred

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = () => {
        try {
            const contactsData = adminDataManager.getAll('contacts');
            console.log('Loaded contacts:', contactsData);
            setContacts(contactsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error('Error loading contacts:', error);
            setContacts([]);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            adminDataManager.delete('contacts', id);
            loadContacts();
        }
    };

    const markAsRead = (contact) => {
        if (!contact.isRead) {
            adminDataManager.update('contacts', contact.id, { isRead: true });
            loadContacts();
        }
    };

    const toggleStar = (contact) => {
        adminDataManager.update('contacts', contact.id, { isStarred: !contact.isStarred });
        loadContacts();
    };

    const openModal = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
        markAsRead(contact);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    const getFilteredContacts = () => {
        switch (filter) {
            case 'unread':
                return contacts.filter(contact => !contact.isRead);
            case 'read':
                return contacts.filter(contact => contact.isRead);
            case 'starred':
                return contacts.filter(contact => contact.isStarred);
            default:
                return contacts;
        }
    };

    const filteredContacts = getFilteredContacts();
    const unreadCount = contacts.filter(contact => !contact.isRead).length;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {unreadCount > 0 && `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`}
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex space-x-2">
                    {['all', 'unread', 'read', 'starred'].map((filterType) => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === filterType
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                            {filterType === 'unread' && unreadCount > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Messages List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {filteredContacts.length === 0 ? (
                    <div className="text-center py-12">
                        <FiMail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {filter === 'all' ? 'No Messages Yet' : `No ${filter} messages`}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {filter === 'all'
                                ? 'Contact form submissions will appear here.'
                                : `You don't have any ${filter} messages.`
                            }
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredContacts.map((contact) => (
                            <div
                                key={contact.id}
                                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${!contact.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                    }`}
                                onClick={() => openModal(contact)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="flex items-center space-x-2">
                                                <FiUser className="w-4 h-4 text-gray-500" />
                                                <span className={`font-medium ${!contact.isRead ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                                                    {contact.name}
                                                </span>
                                            </div>
                                            {!contact.isRead && (
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            )}
                                            {contact.isStarred && (
                                                <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center space-x-2">
                                                <FiMail className="w-4 h-4" />
                                                <span>{contact.email}</span>
                                            </div>
                                            {contact.phone && (
                                                <div className="flex items-center space-x-2">
                                                    <FiPhone className="w-4 h-4" />
                                                    <span>{contact.phone}</span>
                                                </div>
                                            )}
                                            {contact.company && (
                                                <div className="flex items-center space-x-2">
                                                    <FiBriefcase className="w-4 h-4" />
                                                    <span>{contact.company}</span>
                                                </div>
                                            )}

                                        </div>

                                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                                            {contact.message}
                                        </p>

                                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <FiClock className="w-3 h-3" />
                                                <span>{new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}</span>
                                            </div>
                                            {contact.service && (
                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                                                    {contact.service}
                                                </span>
                                            )}
                                            {contact.budget && (
                                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                                                    Budget: {contact.budget}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 ml-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleStar(contact);
                                            }}
                                            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 ${contact.isStarred ? 'text-yellow-500' : 'text-gray-400'
                                                }`}
                                        >
                                            <FiStar className={contact.isStarred ? 'fill-current' : ''} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(contact.id);
                                            }}
                                            className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Message Detail Modal */}
            {showModal && selectedContact && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Message from {selectedContact.name}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Name
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{selectedContact.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Email
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{selectedContact.email}</p>
                                    </div>
                                    {selectedContact.phone && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Phone
                                            </label>
                                            <p className="text-gray-900 dark:text-white">{selectedContact.phone}</p>
                                        </div>
                                    )}
                                    {selectedContact.company && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Company
                                            </label>
                                            <p className="text-gray-900 dark:text-white">{selectedContact.company}</p>
                                        </div>
                                    )}
                                    {selectedContact.service && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Service Interested In
                                            </label>
                                            <p className="text-gray-900 dark:text-white">{selectedContact.service}</p>
                                        </div>
                                    )}
                                    {selectedContact.budget && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Budget
                                            </label>
                                            <p className="text-gray-900 dark:text-white">{selectedContact.budget}</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Message
                                    </label>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                                            {selectedContact.message}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <p>Received on {new Date(selectedContact.createdAt).toLocaleDateString()} at {new Date(selectedContact.createdAt).toLocaleTimeString()}</p>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => toggleStar(selectedContact)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedContact.isStarred
                                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {selectedContact.isStarred ? 'Unstar' : 'Star'} Message
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactManagement;
