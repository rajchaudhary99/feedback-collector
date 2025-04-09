import { format } from 'date-fns';
import '../styles/components.css';

export default function FeedbackList({ feedbacks }) {
  if (feedbacks.length === 0) {
    return <div className="text-center">No feedback submitted yet.</div>;
  }

  return (
    <div className="feedback-list">
      <h2 className="text-xl mb-4">Submitted Feedback</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="feedback-item">
          <div className="feedback-header">
            <div>
              <h3 className="feedback-name">{feedback.name}</h3>
              <p className="feedback-email">{feedback.email}</p>
            </div>
            <span className="feedback-time">
              {format(new Date(feedback.timestamp), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
          <p className="feedback-message">{feedback.message}</p>
        </div>
      ))}
    </div>
  );
}