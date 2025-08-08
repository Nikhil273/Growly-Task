import { useState, useEffect, useCallback } from 'react'
import {
  Users,
  TrendingUp,
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  Trash2,
  RefreshCw,
  ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    qualifiedLeads: 0,
    closedLeads: 0
  })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    businessType: 'all'
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLeads: 0,
    hasNext: false,
    hasPrev: false
  })

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.currentPage,
        ...filters,
        limit: 10
      })

      const response = await axios.get(`${apiUrl}/api/admin/leads?${params}`)

      if (response.data.success) {
        setLeads(response.data.data.leads)
        setPagination(response.data.data.pagination)
        setStats(response.data.data.stats)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
      toast.error('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }, [filters, pagination.currentPage, apiUrl])

  useEffect(() => {
    fetchLeads()
  }, [filters, pagination.currentPage, fetchLeads])

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const response = await axios.put(`${apiUrl}/api/admin/leads/${leadId}/status`, {
        status: newStatus
      })

      if (response.data.success) {
        toast.success('Lead status updated successfully')
        fetchLeads()
      }
    } catch (error) {
      console.error('Error updating lead status:', error)
      toast.error('Failed to update lead status')
    }
  }

  const deleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) {
      return
    }

    try {
      const response = await axios.delete(`${apiUrl}/api/admin/leads/${leadId}`)

      if (response.data.success) {
        toast.success('Lead deleted successfully')
        fetchLeads()
      }
    } catch (error) {
      console.error('Error deleting lead:', error)
      toast.error('Failed to delete lead')
    }
  }

  const exportLeads = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Business Type', 'Status', 'Created Date'].join(','),
      ...leads.map(lead => [
        lead.name,
        lead.email,
        lead.phone,
        lead.businessType,
        lead.status,
        new Date(lead.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `growly-leads-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-900/30 text-blue-300'
      case 'contacted': return 'bg-yellow-900/30 text-yellow-300'
      case 'qualified': return 'bg-green-900/30 text-green-300'
      case 'closed': return 'bg-gray-900/30 text-gray-300'
      default: return 'bg-gray-900/30 text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Landing
              </Link>
              <div className="w-px h-6 bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchLeads}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <RefreshCw size={20} />
              </button>
              <button
                onClick={exportLeads}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Leads</p>
                <p className="text-3xl font-bold text-white">{stats.totalLeads}</p>
              </div>
              <Users className="w-8 h-8 text-primary-600" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">New</p>
                <p className="text-3xl font-bold text-blue-600">{stats.newLeads}</p>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Contacted</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.contactedLeads}</p>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Qualified</p>
                <p className="text-3xl font-bold text-green-600">{stats.qualifiedLeads}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Closed</p>
                <p className="text-3xl font-bold text-gray-600">{stats.closedLeads}</p>
              </div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search leads..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 pr-4 py-2 w-full border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-700 text-white"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-700 text-white"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={filters.businessType}
              onChange={(e) => setFilters({ ...filters, businessType: e.target.value })}
              className="px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-700 text-white"
            >
              <option value="all">All Business Types</option>
              <option value="Startup">Startup</option>
              <option value="Small Business">Small Business</option>
              <option value="Agency">Agency</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Consultant">Consultant</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-400 mt-2">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Business Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {lead.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {lead.email}
                          </div>
                          <div className="text-sm text-gray-400">
                            {lead.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {lead.businessType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                          className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(lead.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const message = lead.message ? `Message: ${lead.message}` : 'No message provided'
                              alert(`Lead Details:\\n\\nName: ${lead.name}\\nEmail: ${lead.email}\\nPhone: ${lead.phone}\\nBusiness Type: ${lead.businessType}\\nStatus: ${lead.status}\\n${message}\\nCreated: ${new Date(lead.createdAt).toLocaleString()}`)
                            }}
                            className="text-primary-600 hover:text-primary-900 transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => deleteLead(lead._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300">
                  Showing page {pagination.currentPage} of {pagination.totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })}
                    disabled={pagination.currentPage === 1}
                    className="px-3 py-1 border border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })}
                    disabled={!pagination.hasNext}
                    className="px-3 py-1 border border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
