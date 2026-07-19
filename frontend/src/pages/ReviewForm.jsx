import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className={`transition-transform hover:scale-110 focus:outline-none ${
          star <= value ? 'text-amber-400' : 'text-forest-200 dark:text-forest-700'
        }`}
        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
      >
        <Star
          size={36}
          fill={star <= value ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      </button>
    ))}
  </div>
);

const ratingLabels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };

const ReviewForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }
    if (review.trim().length < 20) {
      toast.error('Please write at least 20 characters in your review');
      return;
    }

    setStatus('loading');
    try {
      await api.post(`/reviews/${bookingId}`, { review, rating });
      setStatus('success');
      toast.success('Review submitted! 🎉');
    } catch (err) {
      setStatus('error');
      toast.error(err.response?.data?.message || 'Failed to submit review');
    }
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
        <div className="card p-8 text-center">
          <CheckCircle2 size={48} className="mx-auto text-forest-600 dark:text-forest-400" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-forest-800 dark:text-sand-50">
            Thank you for your review!
          </h2>
          <p className="mt-2 font-body text-sm text-ink/60 dark:text-sand-100/60">
            Your feedback has been sent to the host and helps us improve EcoStay for everyone.
          </p>

          <button
            onClick={() => navigate('/my-bookings')}
            className="btn-primary mt-8 w-full"
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <h1 className="font-display text-3xl font-semibold text-forest-800 dark:text-sand-50">
        Share Your Experience
      </h1>
      <p className="mt-2 font-body text-sm text-ink/60 dark:text-sand-100/60">
        Your honest feedback helps hosts improve and helps future guests make better decisions.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 card p-8 space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block font-body text-sm font-semibold text-forest-800 dark:text-sand-100 mb-3">
            Overall Rating
          </label>
          <StarRating value={rating} onChange={setRating} />
          {rating > 0 && (
            <p className="mt-2 font-body text-sm font-medium text-amber-600 dark:text-amber-400">
              {ratingLabels[rating]}
            </p>
          )}
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="review-text" className="block font-body text-sm font-semibold text-forest-800 dark:text-sand-100 mb-2">
            Your Review
          </label>
          <textarea
            id="review-text"
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us about your stay — what you loved, what could be improved..."
            maxLength={2000}
            className="w-full rounded-xl border border-forest-100 dark:border-forest-700 bg-white dark:bg-forest-900 px-4 py-3 font-body text-sm text-ink dark:text-sand-100 placeholder-ink/30 dark:placeholder-sand-100/30 focus:outline-none focus:ring-2 focus:ring-forest-400 dark:focus:ring-forest-500 resize-none"
          />
          <p className="mt-1 font-body text-xs text-ink/40 dark:text-sand-100/40 text-right">
            {review.length} / 2000
          </p>
        </div>

        {/* Submit */}
        <button
          id="submit-review-btn"
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            'Submitting...'
          ) : (
            <>
              <Send size={16} />
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
