import { Plus, Search, MoreVertical } from 'lucide-react';

const groups = [
  {
    name: 'Tech Enthusiasts',
    type: 'Public',
    members: 1234,
    created: '2025-01-15',
    status: 'Active',
  },
  {
    name: 'Photography Club',
    type: 'Private',
    members: 567,
    created: '2025-02-20',
    status: 'Active',
  },
  {
    name: 'Gaming Community',
    type: 'Public',
    members: 2341,
    created: '2025-03-10',
    status: 'Active',
  },
  {
    name: 'Book Lovers',
    type: 'Private',
    members: 432,
    created: '2024-12-05',
    status: 'Inactive',
  },
  {
    name: 'Fitness Fanatics',
    type: 'Public',
    members: 891,
    created: '2025-01-28',
    status: 'Active',
  },
];

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Group Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all groups on the platform</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          Create Group
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        {/* Filters */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-gray-700">Groups List</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search groups..."
                className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm w-64"
              />
            </div>
            <div className="flex items-center gap-1">
              {['All Groups', 'Active', 'Inactive', 'Private', 'Public'].map((filter, i) => (
                <button
                  key={i}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    i === 0 ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-xs font-semibold text-gray-600">Group Name</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Group Type</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Total Members</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Created Date</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Status</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {groups.map((group, index) => (
                <tr key={index} className="py-3">
                  <td className="py-4 text-sm font-medium text-gray-800">{group.name}</td>
                  <td className="py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        group.type === 'Public'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {group.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{group.members}</td>
                  <td className="py-4 text-sm text-gray-600">{group.created}</td>
                  <td className="py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        group.status === 'Active'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {group.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
