const API_URL = 'http://localhost:3001';

// Submit new feedback (goes to pending)
export const submitNewFeedback = async (feedback) => {
  const response = await fetch(`${API_URL}/pending_feedbacks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...feedback,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    }),
  });
  if (!response.ok) throw new Error('Failed to submit feedback');
  return response.json();
};

// Get pending feedbacks
export const getPendingFeedbacks = async () => {
  const response = await fetch(`${API_URL}/pending_feedbacks`);
  if (!response.ok) throw new Error('Failed to fetch pending feedbacks');
  return response.json();
};

// Get approved feedbacks
export const getApprovedFeedbacks = async () => {
  const response = await fetch(`${API_URL}/feedbacks`);
  if (!response.ok) throw new Error('Failed to fetch approved feedbacks');
  return response.json();
};

// Approve feedback (move from pending to approved)
export const approveFeedback = async (id) => {
  // First get the feedback
  const getResponse = await fetch(`${API_URL}/pending_feedbacks/${id}`);
  if (!getResponse.ok) throw new Error('Feedback not found');
  const feedback = await getResponse.json();

  // Add to approved
  const postResponse = await fetch(`${API_URL}/feedbacks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback)
  });
  if (!postResponse.ok) throw new Error('Failed to approve feedback');

  // Remove from pending
  const deleteResponse = await fetch(`${API_URL}/pending_feedbacks/${id}`, {
    method: 'DELETE'
  });
  if (!deleteResponse.ok) throw new Error('Failed to remove from pending');
};

// Reject feedback (delete from pending)
export const rejectFeedback = async (id) => {
  const response = await fetch(`${API_URL}/pending_feedbacks/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to reject feedback');
};