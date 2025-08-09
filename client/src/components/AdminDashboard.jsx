import { useState, useEffect, useCallback } from 'react'
import { Eye, } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL || 'https://growly-task.onrender.com'
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/api/admin/leads`)
      if (response.data.success) {
        setLeads(response.data.data.leads)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
      toast.error('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])


  return (
    leads.length > 0 ? (
      <div className="min-h-screen bg-gray-900">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
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
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Business Type
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {lead.message ? lead.message : 'No message provided'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {lead.businessType}
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-gray-400">
          <p className="text-lg">No leads available</p>
        </div>
      </div>
    )
  )
}

export default AdminDashboard
