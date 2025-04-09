import { useState } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import Layout from '../components/Layout';
import { getFeedbacks } from '../services/api';

export default function Home() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeedbackView = () => {
    if (!showFeedback) {
      fetchFeedbacks();
    }
    setShowFeedback(!showFeedback);
  };

  return (
    <Layout>
      <h1 className="text-3xl text-center mb-8">Feedback Collector</h1>
      
      <FeedbackForm onSuccess={() => showFeedback && fetchFeedbacks()} />

      <div className="text-center mb-8">
        <button
          onClick={toggleFeedbackView}
          className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded transition"
        >
          {showFeedback ? 'Hide Feedback' : 'View Submitted Feedback'}
        </button>
      </div>

      {showFeedback && (
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-8">Loading feedback...</div>
          ) : (
            <FeedbackList feedbacks={feedbacks} />
          )}
        </div>
      )}
    </Layout>
  );
}