import { useEffect, useMemo, useState } from 'react';
import NewRequestModal from './components/NewRequestModal';
import RequestTable from './components/RequestTable';
import StatCard from './components/StatCard';
import { createRequest, fetchRequests, fetchStats, updateRequestStatus } from './api/requestApi';

const App = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadDashboardData = async () => {
    setError('');
    setIsLoading(true);
    try {
      const [requestData, statsData] = await Promise.all([fetchRequests(), fetchStats()]);
      setRequests(requestData);
      setStats(statsData);
    } catch (loadError) {
      setError(loadError.message || 'Could not load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const filteredRequests = useMemo(() => {
    if (filter === 'All') return requests;
    return requests.filter((request) => request.status === filter);
  }, [requests, filter]);

  const handleAction = async (id, status, comment) => {
    setIsUpdating(true);
    setError('');
    try {
      await updateRequestStatus(id, { status, comment });
      await loadDashboardData();
    } catch (actionError) {
      setError(actionError.message || 'Failed to update request');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateRequest = async (formData) => {
    setError('');
    await createRequest(formData);
    await loadDashboardData();
  };

  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <h1>Smart Approval Workflow Dashboard</h1>
          <p>Monitor and process approvals with confidence.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Submit New Request
        </button>
      </header>

      <section className="stat-grid">
        <StatCard title="Total Requests" value={stats.total} variant="total" />
        <StatCard title="Pending" value={stats.pending} variant="pending" />
        <StatCard title="Approved" value={stats.approved} variant="approved" />
        <StatCard title="Rejected" value={stats.rejected} variant="rejected" />
      </section>

      <section className="toolbar">
        <label htmlFor="filter-select">Filter by status:</label>
        <select id="filter-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </section>

      {error && <div className="error-banner">{error}</div>}

      {isLoading ? (
        <div className="loading-state">Loading dashboard data...</div>
      ) : (
        <RequestTable requests={filteredRequests} onAction={handleAction} isUpdating={isUpdating} />
      )}

      <NewRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRequest}
      />
    </main>
  );
};

export default App;
