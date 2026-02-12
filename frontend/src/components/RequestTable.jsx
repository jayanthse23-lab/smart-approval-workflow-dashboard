const RequestTable = ({ requests, onAction, isUpdating }) => {
  if (!requests.length) {
    return <div className="empty-state">No requests found for the selected filter.</div>;
  }

  const handleAction = (requestId, status) => {
    const comment = window.prompt(`Add a comment for ${status.toLowerCase()} action (optional):`, '');
    onAction(requestId, status, comment || '');
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Requester</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.title}</td>
              <td>{request.requesterName}</td>
              <td>
                <span className={`pill priority-${request.priority.toLowerCase()}`}>{request.priority}</span>
              </td>
              <td>
                <span className={`pill status-${request.status.toLowerCase()}`}>{request.status}</span>
              </td>
              <td>{new Date(request.timestamp).toLocaleString()}</td>
              <td>
                {request.status === 'Pending' ? (
                  <div className="action-buttons">
                    <button
                      className="btn btn-approve"
                      disabled={isUpdating}
                      onClick={() => handleAction(request._id, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      disabled={isUpdating}
                      onClick={() => handleAction(request._id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="no-action">Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
