import { Users, UserCheck, CreditCard, DollarSign, FileText, ShieldCheck, UserPlus, Clock } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Users', value: '12,453', icon: Users, bgColor: 'bg-blue-50', iconColor: 'text-blue-500' },
    { label: 'Active Users', value: '8,921', icon: UserCheck, bgColor: 'bg-green-50', iconColor: 'text-green-500' },
    { label: 'Total Groups', value: '342', icon: Users, bgColor: 'bg-purple-50', iconColor: 'text-purple-500' },
    { label: 'Active Groups', value: '289', icon: UserCheck, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { label: 'Pending Groups', value: '18', icon: Clock, bgColor: 'bg-orange-50', iconColor: 'text-orange-500' },
    { label: 'Total Subscriptions', value: '5,634', icon: CreditCard, bgColor: 'bg-blue-50', iconColor: 'text-indigo-500' },
    { label: 'Active Subscriptions', value: '4,892', icon: CreditCard, bgColor: 'bg-teal-50', iconColor: 'text-teal-500' },
    { label: 'Monthly Revenue', value: '$48,920', icon: DollarSign, bgColor: 'bg-green-50', iconColor: 'text-green-500' },
    { label: 'New Users This Month', value: '1,234', icon: UserPlus, bgColor: 'bg-blue-50', iconColor: 'text-blue-500' },
    { label: 'New Subscriptions This Month', value: '456', icon: CreditCard, bgColor: 'bg-purple-50', iconColor: 'text-purple-500' },
  ];

  const quickActions = [
    {
      title: 'Create New Group',
      description: 'Add a new group to the platform',
      icon: UserPlus,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Create Subscription Plan',
      description: 'Set up a new subscription tier',
      icon: CreditCard,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'View Pending Requests',
      description: 'Review pending group approvals',
      icon: Clock,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Edit Terms & Conditions',
      description: 'Update legal agreements',
      icon: FileText,
      bgColor: 'bg-green-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Edit Privacy Policy',
      description: 'Manage privacy information',
      icon: ShieldCheck,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Overview Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">Central control panel for managing groups, subscriptions, and platform settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <div className={`${stat.bgColor} ${stat.iconColor} p-2 rounded-lg`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-6">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 border border-gray-200 flex items-start gap-4">
              <div className={`${action.bgColor} ${action.iconColor} p-2.5 rounded-lg shrink-0`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800">{action.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{action.description}</p>
                <button className="mt-3 px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
                  Go to Action
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

