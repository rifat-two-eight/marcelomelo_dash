'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Groups');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleGroupStatus = async (groupId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'inactive' : 'active';
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/groups/status/${groupId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data?.message || `Group status changed to ${newStatus}`);
      
      const updatedGroup = response.data?.data;
      
      setGroups(prevGroups => prevGroups.map(group => {
        if (group._id === groupId) {
          return updatedGroup ? { ...group, ...updatedGroup } : { ...group, status: newStatus };
        }
        return group;
      }));
    } catch (error) {
      console.error("Error updating group status", error);
      toast.error("Failed to update group status");
    }
  };

  useEffect(() => {
    setLoading(true); // Instant loading feedback

    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        const queryParams: any = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' };

        if (search) queryParams.search = search;

        if (activeTab === 'Active') queryParams.status = 'active';
        else if (activeTab === 'Inactive') queryParams.status = 'inactive';
        else if (activeTab === 'Private') queryParams.isPublic = false;
        else if (activeTab === 'Public') queryParams.isPublic = true;

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/groups`, {
          headers: { Authorization: `Bearer ${token}` },
          params: queryParams
        });
        setGroups(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching groups", error);
        toast.error("Failed to load groups");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchGroups();
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [search, activeTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Group Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all groups on the platform</p>
        </div>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search groups..."
                className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm w-64"
              />
            </div>
            <div className="flex items-center gap-1">
              {['All Groups', 'Active', 'Inactive', 'Private', 'Public'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveTab(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === filter ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-500">Loading groups...</td>
                </tr>
              ) : groups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-500">No groups found.</td>
                </tr>
              ) : (() => {
                const filteredGroups = groups.filter(group => {
                  if (search && !group.groupName?.toLowerCase().includes(search.toLowerCase())) return false;
                  
                  const type = group.isPublic ? 'Public' : 'Private';
                  const status = group.status 
                    ? (group.status.toLowerCase() === 'active' ? 'Active' : 'Inactive') 
                    : (group.isArchived ? 'Inactive' : group.isBlocked ? 'Blocked' : 'Active');
                  
                  if (activeTab === 'Active' && status !== 'Active') return false;
                  if (activeTab === 'Inactive' && status !== 'Inactive') return false;
                  if (activeTab === 'Private' && type !== 'Private') return false;
                  if (activeTab === 'Public' && type !== 'Public') return false;
                  
                  return true;
                });

                if (filteredGroups.length === 0) {
                  return (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-gray-500">No groups match your filter.</td>
                    </tr>
                  );
                }

                return filteredGroups.map((group) => {
                  const type = group.isPublic ? 'Public' : 'Private';
                  const status = group.status 
                    ? (group.status.toLowerCase() === 'active' ? 'Active' : 'Inactive') 
                    : (group.isArchived ? 'Inactive' : group.isBlocked ? 'Blocked' : 'Active');
                  return (
                    <tr key={group._id} className="py-3">
                      <td className="py-4 text-sm font-medium text-gray-800 flex items-center gap-3">
                        {group.groupImage ? (
                          <img src={group.groupImage} alt={group.groupName} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold uppercase">
                            {group.groupName?.charAt(0)}
                          </div>
                        )}
                        {group.groupName}
                      </td>
                      <td className="py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${type === 'Public'
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {type}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{group.totalMembers || 0}</td>
                      <td className="py-4 text-sm text-gray-600">
                        {new Date(group.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-4 relative">
                        <button 
                          onClick={() => setOpenDropdownId(openDropdownId === group._id ? null : group._id)}
                          className="text-gray-400 hover:text-gray-600 relative z-10"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {openDropdownId === group._id && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setOpenDropdownId(null)} 
                            />
                            <div 
                              className="absolute right-8 top-1/2 -translate-y-1/2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden"
                            >
                              <button 
                                onClick={() => { toggleGroupStatus(group._id, status); setOpenDropdownId(null); }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                              >
                                Mark as {status === 'Active' ? 'Inactive' : 'Active'}
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
