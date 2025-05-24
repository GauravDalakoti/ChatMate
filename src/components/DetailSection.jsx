import React from 'react'
import {
    User,
    Users,
    Plus,
    Link,
    ChevronUp
} from 'lucide-react';

const DetailSection = () => {
    return (
        <div className="w-full max-w-sm bg-white p-4 space-y-4  ">
            <div className="space-y-4">
                <div className="flex justify-between items-center px-8">
                    <span className="text-sm text-gray-700">Assignee</span>
                    <div className="flex items-center gap-2">
                        <img src="https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740" className='rounded-full border border-black' alt="" width={23} />
                        <span className="text-sm font-medium text-gray-900">Brian Byrne</span>
                    </div>
                </div>
                <div className="flex justify-between items-center px-8">
                    <span className="text-sm text-gray-900">Team</span>
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-5 text-gray-900" />
                        <span className="text-sm font-medium text-gray-900">Unassigned</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-gray-900 mt-6 mb-3 uppercase px-8">Links</h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 px-8">
                            <Link className="w-4 h-4 text-gray-700" />
                            <span className="text-sm text-gray-800">Tracker ticket</span>
                        </div>
                        <button className="bg-gray-100 p-1 rounded-full mr-8">
                            <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 px-8">
                            <Link className="w-4 h-4 text-gray-700" />
                            <span className="text-sm text-gray-800">Back-office tickets</span>
                        </div>
                        <button className="bg-gray-100 p-1 rounded-full mr-8">
                            <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 px-8">
                            <Link className="w-4 h-4 text-gray-700" />
                            <span className="text-sm text-gray-800">Side conversations</span>
                        </div>
                        <button className="bg-gray-100 p-1 rounded-full mr-8">
                            <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-1 divide-y divide-gray-200 px-7">
                {[
                    'User Data',
                    'Conversation Attributes',
                    'Company Details',
                    'Salesforce',
                    'Stripe',
                    'Jira for Tickets',
                ].map((section) => (
                    <div
                        key={section}
                        className="flex items-center justify-between text-sm font-medium text-gray-900 py-3 cursor-pointer hover:bg-gray-50 px-2 rounded-md"
                    >
                        <span>{section.toUpperCase()}</span>
                        <ChevronUp className="w-4 h-4 text-gray-800" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DetailSection