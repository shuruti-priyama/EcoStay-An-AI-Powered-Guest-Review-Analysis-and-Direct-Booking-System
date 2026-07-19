import React, { useEffect, useState } from 'react';
import { Star, Sparkles, MessageSquareText, TrendingUp, TrendingDown, Send, Bot } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import api from '../../api/axios';

const StarDisplay = ({ value }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={14}
        fill={s <= value ? '#f59e0b' : 'none'}
        stroke={s <= value ? '#f59e0b' : '#d1d5db'}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const SentimentBadge = ({ sentiment }) => {
  const styles = {
    Positive: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300',
    Negative: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
    Neutral: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[sentiment] || styles.Neutral}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {sentiment || 'Unknown'}
    </span>
  );
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const ReviewCard = ({ item, onUpdateItem }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const ai = item.aiAnalysis;

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await api.post(`/reviews/${item.bookingId}/analyze`);
      toast.success('AI Analysis complete!');
      onUpdateItem(item.bookingId, { ...item, aiAnalysis: res.data.data });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to analyze review');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return toast.error('Reply cannot be empty');
    setSubmittingReply(true);
    try {
      const res = await api.post(`/reviews/${item.bookingId}/reply`, { reply: replyText });
      toast.success('Reply submitted successfully');
      onUpdateItem(item.bookingId, { ...item, ownerReply: res.data.data });
      setShowReplyForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  const useAiSuggestion = () => {
    if (ai?.suggestedResponse) {
      setReplyText(ai.suggestedResponse);
    }
  };

  return (
    <div className="card p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-base font-semibold text-forest-800 dark:text-sand-50">
              {item.roomName}
            </h3>
            {ai?.sentiment && <SentimentBadge sentiment={ai.sentiment} />}
          </div>
          <p className="mt-1 font-body text-sm text-ink/50 dark:text-sand-100/50">
            By <span className="font-medium">{item.guestName}</span> · {formatDate(item.reviewDate)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StarDisplay value={item.rating} />
          <span className="font-display text-sm font-semibold text-amber-500">{item.rating}.0</span>
        </div>
      </div>

      {/* Guest review text */}
      <blockquote className="rounded-xl border-l-4 border-forest-200 dark:border-forest-600 bg-forest-50 dark:bg-forest-900/60 px-4 py-3">
        <p className="font-body text-sm italic text-ink/80 dark:text-sand-100/70">"{item.review}"</p>
      </blockquote>

      {/* AI Analysis Section */}
      <div className="border-t border-forest-100 dark:border-forest-700 pt-4">
        {!ai || !ai.summary ? (
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            {analyzing ? (
              <><Sparkles size={16} className="animate-pulse" /> Analyzing...</>
            ) : (
              <><Sparkles size={16} /> Analyze with Gemini AI</>
            )}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-clay-500 shrink-0" />
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-clay-500">
                Gemini AI Analysis
              </span>
            </div>

            <p className="font-body text-sm text-ink dark:text-sand-100">{ai.summary}</p>

            {ai.themes?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ai.themes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-forest-50 dark:bg-forest-900 border border-forest-100 dark:border-forest-700 px-3 py-0.5 font-body text-xs text-forest-700 dark:text-sand-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {ai.positives?.length > 0 && (
                <div className="rounded-xl bg-green-50 dark:bg-green-500/10 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp size={14} className="text-green-600 dark:text-green-400" />
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                      Positives
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {ai.positives.map((p) => (
                      <li key={p} className="flex items-start gap-2 font-body text-sm text-green-800 dark:text-green-300">
                        <span className="mt-0.5 text-green-500 shrink-0">✔</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {ai.negatives?.length > 0 && (
                <div className="rounded-xl bg-red-50 dark:bg-red-500/10 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingDown size={14} className="text-red-500 dark:text-red-400" />
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
                      Needs Improvement
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {ai.negatives.map((n) => (
                      <li key={n} className="flex items-start gap-2 font-body text-sm text-red-800 dark:text-red-300">
                        <span className="mt-0.5 text-red-400 shrink-0">✗</span> {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reply System */}
      <div className="border-t border-forest-100 dark:border-forest-700 pt-4">
        {item.ownerReply ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquareText size={15} className="text-forest-600 dark:text-forest-400" />
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400">
                Your Reply
              </span>
            </div>
            <div className="rounded-xl bg-forest-50 dark:bg-forest-900 border border-forest-100 dark:border-forest-800 p-4">
              <p className="font-body text-sm text-ink dark:text-sand-100">{item.ownerReply}</p>
            </div>
          </div>
        ) : (
          <div>
            {!showReplyForm ? (
              <button
                onClick={() => setShowReplyForm(true)}
                className="flex items-center gap-2 font-body text-sm font-medium text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300 transition-colors"
              >
                <MessageSquareText size={15} />
                Reply to Guest
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-body text-sm font-semibold text-forest-800 dark:text-sand-50">
                    Write your reply
                  </label>
                  {ai?.suggestedResponse && (
                    <button
                      onClick={useAiSuggestion}
                      className="flex items-center gap-1.5 text-xs font-medium text-clay-600 hover:text-clay-700 dark:text-clay-400 dark:hover:text-clay-300"
                    >
                      <Bot size={14} />
                      Use AI Suggestion
                    </button>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Thank the guest for their feedback..."
                  className="w-full rounded-xl border border-forest-100 dark:border-forest-700 bg-white dark:bg-forest-900 px-4 py-3 font-body text-sm text-ink dark:text-sand-100 placeholder-ink/30 dark:placeholder-sand-100/30 focus:outline-none focus:ring-2 focus:ring-forest-400 dark:focus:ring-forest-500 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSubmitReply}
                    disabled={submittingReply}
                    className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
                  >
                    <Send size={14} />
                    {submittingReply ? 'Submitting...' : 'Submit Reply'}
                  </button>
                  <button
                    onClick={() => setShowReplyForm(false)}
                    className="btn-secondary text-sm py-2 px-4"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const OwnerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/reviews/my-rooms');
        setReviews(res.data.data);
      } catch (err) {
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleUpdateItem = (bookingId, updatedReview) => {
    setReviews((prev) => prev.map((r) => (r.bookingId === bookingId ? updatedReview : r)));
  };

  const sentiments = ['All', 'Positive', 'Neutral', 'Negative'];
  const filtered =
    filter === 'All'
      ? reviews
      : reviews.filter((r) => r.aiAnalysis?.sentiment === filter);

  if (loading) return <Loader label="Loading guest reviews..." />;

  return (
    <div>
      {/* Header stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="card p-5 text-center">
          <p className="font-display text-3xl font-bold text-forest-800 dark:text-sand-50">{reviews.length}</p>
          <p className="font-body text-sm text-ink/60 dark:text-sand-100/60 mt-1">Total Reviews</p>
        </div>
        <div className="card p-5 text-center">
          <p className="font-display text-3xl font-bold text-amber-500">
            {reviews.length > 0
              ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1)
              : '—'}
          </p>
          <p className="font-body text-sm text-ink/60 dark:text-sand-100/60 mt-1">Average Rating</p>
        </div>
        <div className="card p-5 text-center">
          <p className="font-display text-3xl font-bold text-green-600 dark:text-green-400">
            {reviews.filter((r) => r.aiAnalysis?.sentiment === 'Positive').length}
          </p>
          <p className="font-body text-sm text-ink/60 dark:text-sand-100/60 mt-1">Positive Sentiment</p>
        </div>
      </div>

      {/* Sentiment filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sentiments.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors ${
              filter === s
                ? 'bg-forest-700 text-sand-50'
                : 'border border-forest-100 dark:border-forest-700 text-forest-800 dark:text-sand-100 hover:bg-forest-50 dark:hover:bg-forest-900'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <Sparkles size={32} className="mx-auto text-forest-300 dark:text-forest-600" />
          <p className="mt-4 font-display text-base font-semibold text-forest-800 dark:text-sand-50">
            {reviews.length === 0 ? 'No reviews yet' : `No ${filter} reviews`}
          </p>
          <p className="mt-2 font-body text-sm text-ink/50 dark:text-sand-100/50">
            {reviews.length === 0
              ? 'When guests complete their stay and leave a review, AI insights will appear here.'
              : 'Try a different sentiment filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((item) => (
            <ReviewCard key={item.bookingId} item={item} onUpdateItem={handleUpdateItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerReviews;
