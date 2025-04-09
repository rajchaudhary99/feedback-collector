import { useState, useEffect } from 'react';
import { getPendingFeedbacks, approveFeedback, rejectFeedback, getApprovedFeedbacks } from '../services/api';
import '../styles/admin.css';

export default function Admin() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingData, approvedData] = await Promise.all([
          getPendingFeedbacks(),
          getApprovedFeedbacks()
        ]);
        setPending(pendingData);
        setApproved(approvedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveFeedback(id);
      setPending(pending.filter(fb => fb.id !== id));
      const updatedFeedback = pending.find(fb => fb.id === id);
      setApproved([...approved, updatedFeedback]);
    } catch (error) {
      console.error('Error approving feedback:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectFeedback(id);
      setPending(pending.filter(fb => fb.id !== id));
    } catch (error) {
      console.error('Error rejecting feedback:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      
      <section className="pending-section">
        <h2>Pending Feedback ({pending.length})</h2>
        {pending.length === 0 ? (
          <p>No pending feedback</p>
        ) : (
          <ul className="feedback-list">
            {pending.map(feedback => (
              <li key={feedback.id} className="feedback-item">
                <div className="feedback-content">
                  <h3>{feedback.name} &lt;{feedback.email}&gt;</h3>
                  <p>{feedback.message}</p>
                  <small>{new Date(feedback.timestamp).toLocaleString()}</small>
                </div>
                <div className="feedback-actions">
                  <button onClick={() => handleApprove(feedback.id)} className="approve-btn">Approve</button>
                  <button onClick={() => handleReject(feedback.id)} className="reject-btn">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="approved-section">
        <h2>Approved Feedback ({approved.length})</h2>
        {approved.length === 0 ? (
          <p>No approved feedback yet</p>
        ) : (
          <ul className="feedback-list">
            {approved.map(feedback => (
              <li key={feedback.id} className="feedback-item approved">
                <div className="feedback-content">
                  <h3>{feedback.name} &lt;{feedback.email}&gt;</h3>
                  <p>{feedback.message}</p>
                  <small>{new Date(feedback.timestamp).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}