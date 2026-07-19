import React, { useMemo, useState } from 'react';
import {
  Globe, Sparkles, TrendingUp, TrendingDown, Copy, Check,
  RotateCcw, ClipboardPaste,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import api from '../../api/axios';

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

const EXAMPLE_TEXT = `Priya S. - Booking.com - ★★★★★
Absolutely loved our stay! The homestay was spotless and the location right by the lake was stunning. Breakfast was a highlight - fresh and homely. Only wish check-in was a bit faster.

Rahul M. - Airbnb - ★★★
Decent place for the price. Room was clean but the wifi kept dropping which was frustrating since I needed it for work calls. Host was friendly and responsive though.`;

const OtaReviewCard = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!item.suggestedResponse) return;
    navigator.clipboard.writeText(item.suggestedResponse);
    setCopied(true);
    toast.success('Suggested response copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-base font-semibold text-forest-800 dark:text-sand-50">
              {item.reviewerName || 'Guest'}
            </h3>
            <SentimentBadge sentiment={item.sentiment} />
          </div>
          {item.rating != null && (
            <p className="mt-1 font-body text-sm text-amber-500 font-semibold">{item.rating}.0 ★</p>
          )}
        </div>
      </div>

      <blockquote className="rounded-xl border-l-4 border-forest-200 dark:border-forest-600 bg-forest-50 dark:bg-forest-900/60 px-4 py-3">
        <p className="font-body text-sm italic text-ink/80 dark:text-sand-100/70">"{item.originalText}"</p>
      </blockquote>

      <div className="border-t border-forest-100 dark:border-forest-700 pt-4 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-clay-500 shrink-0" />
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-clay-500">
            Gemini AI Analysis
          </span>
        </div>

        <p className="font-body text-sm text-ink dark:text-sand-100">{item.summary}</p>

        {item.themes?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.themes.map((t) => (
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
          {item.positives?.length > 0 && (
            <div className="rounded-xl bg-green-50 dark:bg-green-500/10 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp size={14} className="text-green-600 dark:text-green-400" />
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                  Positives
                </p>
              </div>
              <ul className="space-y-1.5">
                {item.positives.map((p) => (
                  <li key={p} className="flex items-start gap-2 font-body text-sm text-green-800 dark:text-green-300">
                    <span className="mt-0.5 text-green-500 shrink-0">✔</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.negatives?.length > 0 && (
            <div className="rounded-xl bg-red-50 dark:bg-red-500/10 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingDown size={14} className="text-red-500 dark:text-red-400" />
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
                  Needs Improvement
                </p>
              </div>
              <ul className="space-y-1.5">
                {item.negatives.map((n) => (
                  <li key={n} className="flex items-start gap-2 font-body text-sm text-red-800 dark:text-red-300">
                    <span className="mt-0.5 text-red-400 shrink-0">✗</span> {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {item.suggestedResponse && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400">
                Suggested Response
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-clay-600 hover:text-clay-700 dark:text-clay-400 dark:hover:text-clay-300"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy to paste on OTA'}
              </button>
            </div>
            <div className="rounded-xl bg-forest-50 dark:bg-forest-900 border border-forest-100 dark:border-forest-800 p-4">
              <p className="font-body text-sm text-ink dark:text-sand-100">{item.suggestedResponse}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OwnerOtaReviews = () => {
  const [rawText, setRawText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null); // null = no analysis run yet

  const stats = useMemo(() => {
    if (!results || results.length === 0) return null;
    const counts = { Positive: 0, Neutral: 0, Negative: 0 };
    const themeFreq = {};
    results.forEach((r) => {
      counts[r.sentiment] = (counts[r.sentiment] || 0) + 1;
      (r.themes || []).forEach((t) => {
        themeFreq[t] = (themeFreq[t] || 0) + 1;
      });
    });
    const topThemes = Object.entries(themeFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([theme]) => theme);
    return { counts, topThemes };
  }, [results]);

  const handleAnalyze = async () => {
    if (!rawText.trim()) {
      toast.error('Paste one or more reviews first');
      return;
    }
    setAnalyzing(true);
    setResults(null);
    try {
      const res = await api.post('/reviews/ota/analyze', { rawText });
      setResults(res.data.data);
      if (res.data.data.length === 0) {
        toast('No reviews could be identified in that text', { icon: '🤔' });
      } else {
        toast.success(`Analyzed ${res.data.data.length} review${res.data.data.length > 1 ? 's' : ''}!`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to analyze reviews');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setRawText('');
    setResults(null);
  };

  const fillExample = () => setRawText(EXAMPLE_TEXT);

  return (
    <div>
      <div className="flex items-start gap-3 mb-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-sand-200">
          <Globe size={20} />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-forest-800 dark:text-sand-50">
            OTA Review Analysis
          </h2>
          <p className="mt-1 font-body text-sm text-ink/60 dark:text-sand-100/60">
            Paste reviews copied from Airbnb, Booking.com, MakeMyTrip, or any other site. Gemini AI will
            separate them and analyze each one individually.
          </p>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <textarea
          rows={8}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Paste one or more reviews here, copied straight from Airbnb, Booking.com, MakeMyTrip, etc..."
          className="w-full rounded-xl border border-forest-100 dark:border-forest-700 bg-white dark:bg-forest-900 px-4 py-3 font-body text-sm text-ink dark:text-sand-100 placeholder-ink/30 dark:placeholder-sand-100/30 focus:outline-none focus:ring-2 focus:ring-forest-400 dark:focus:ring-forest-500 resize-none"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="btn-primary flex items-center gap-2 text-sm py-2 px-5"
          >
            <Sparkles size={16} className={analyzing ? 'animate-pulse' : ''} />
            {analyzing ? 'Analyzing with Gemini...' : 'Analyze Reviews'}
          </button>
          <button
            onClick={fillExample}
            disabled={analyzing}
            className="flex items-center gap-1.5 font-body text-sm font-medium text-forest-600 hover:text-forest-700 dark:text-forest-400 dark:hover:text-forest-300"
          >
            <ClipboardPaste size={14} /> Try an example
          </button>
          {(rawText || results) && (
            <button
              onClick={handleReset}
              disabled={analyzing}
              className="flex items-center gap-1.5 font-body text-sm font-medium text-ink/50 hover:text-ink/70 dark:text-sand-100/50 dark:hover:text-sand-100/70"
            >
              <RotateCcw size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {analyzing && <Loader label="Separating and analyzing reviews..." />}

      {!analyzing && results && results.length > 0 && (
        <>
          {stats && (
            <div className="grid gap-4 sm:grid-cols-4 my-8">
              <div className="card p-5 text-center">
                <p className="font-display text-3xl font-bold text-forest-800 dark:text-sand-50">{results.length}</p>
                <p className="font-body text-sm text-ink/60 dark:text-sand-100/60 mt-1">Reviews Found</p>
              </div>
              <div className="card p-5 text-center">
                <p className="font-display text-3xl font-bold text-green-600 dark:text-green-400">{stats.counts.Positive || 0}</p>
                <p className="font-body text-sm text-ink/60 dark:text-sand-100/60 mt-1">Positive</p>
              </div>
              <div className="card p-5 text-center">
                <p className="font-display text-3xl font-bold text-amber-500">{stats.counts.Neutral || 0}</p>
                <p className="font-body text-sm text-ink/60 dark:text-sand-100/60 mt-1">Neutral</p>
              </div>
              <div className="card p-5 text-center">
                <p className="font-display text-3xl font-bold text-red-500">{stats.counts.Negative || 0}</p>
                <p className="font-body text-sm text-ink/60 dark:text-sand-100/60 mt-1">Negative</p>
              </div>
            </div>
          )}

          {stats?.topThemes.length > 0 && (
            <div className="mb-8">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-sand-100/50 mb-2">
                Most Mentioned Themes
              </p>
              <div className="flex flex-wrap gap-2">
                {stats.topThemes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-forest-700 text-sand-50 px-3 py-1 font-body text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {results.map((item, idx) => (
              <OtaReviewCard key={idx} item={item} />
            ))}
          </div>
        </>
      )}

      {!analyzing && results && results.length === 0 && (
        <div className="card p-10 text-center mt-8">
          <Sparkles size={32} className="mx-auto text-forest-300 dark:text-forest-600" />
          <p className="mt-4 font-display text-base font-semibold text-forest-800 dark:text-sand-50">
            No reviews identified
          </p>
          <p className="mt-2 font-body text-sm text-ink/50 dark:text-sand-100/50">
            Try pasting the full review text, including at least a sentence or two of guest feedback.
          </p>
        </div>
      )}
    </div>
  );
};

export default OwnerOtaReviews;