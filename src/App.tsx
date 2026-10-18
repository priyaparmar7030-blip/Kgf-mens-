import React, { useState, useEffect } from 'react';
import {
  Star,
  MessageCircle,
  Instagram,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Sparkles,
  Info,
  AlertCircle,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import {
  STORE_CONFIG,
  STANDOUT_HIGHLIGHTS,
  getInstagramProfileUrl,
  generateReviewDraft
} from './config.ts';

export default function App() {
  const [instagramUrl, setInstagramUrl] = useState<string>(STORE_CONFIG.instagramUrl);

  // Review Assistant State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [customFeedback, setCustomFeedback] = useState<string>('');
  const [reviewDraft, setReviewDraft] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Subtle scroll parallax
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const verifiedInsta = getInstagramProfileUrl();
    setInstagramUrl(verifiedInsta);
    setReviewDraft(generateReviewDraft(5, [], ''));

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setReviewDraft(generateReviewDraft(newRating, selectedHighlights, customFeedback));
  };

  const toggleHighlight = (item: string) => {
    const updated = selectedHighlights.includes(item)
      ? selectedHighlights.filter((h) => h !== item)
      : [...selectedHighlights, item];
    setSelectedHighlights(updated);
    setReviewDraft(generateReviewDraft(rating, updated, customFeedback));
  };

  const handleCustomCommentChange = (text: string) => {
    setCustomFeedback(text);
    setReviewDraft(generateReviewDraft(rating, selectedHighlights, text));
  };

  const handleCopyDraft = async () => {
    try {
      await navigator.clipboard.writeText(reviewDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen text-[#1A1A1A] font-sans-body antialiased overflow-x-hidden selection:bg-[#C6A15B]/35 selection:text-[#790018]">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. DEDICATED CONTINUOUS BACKGROUND LAYER (EXACT AS WORKING)   */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="cinematic-bg-container"
        aria-hidden="true"
      >
        {/* Layer A: Ambient Desktop Depth Backdrop */}
        <img
          src="/assets/kgf-background.jpg"
          alt=""
          className="cinematic-bg-ambient"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/kgf-background.jpg';
          }}
          style={{
            transform: `scale(1.08) translateY(${scrollY * 0.03}px)`
          }}
        />

        {/* Layer B: Hero Portrait Image */}
        <img
          src="/assets/kgf-background.jpg"
          alt="KGF Royal Red Blazer Portrait"
          className="cinematic-bg-portrait"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/kgf-background.jpg';
          }}
          style={{
            transform: `translateX(-50%) translateY(${scrollY * -0.015}px)`
          }}
        />

        {/* Layer C: Subtle Warm-Ivory Translucent Overlay */}
        <div className="cinematic-overlay" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. FOREGROUND EDITORIAL CONTENT LAYER (Above z-0)            */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        
        {/* Haute-Couture Top Edge Ribbon in Blood Red & Champagne Gold */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#48000D] via-[#790018] via-[#C6A15B] to-[#48000D] shadow-xs" />

        {/* Main Campaign Container */}
        <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-16 flex-1">
          
          {/* Cinematic Editorial Header */}
          <header className="text-center pb-10 border-b border-[#C6A15B]/30 animate-masthead-reveal">
            
            {/* Top Micro-Pill Bar for Social Channels */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-7">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-social-glass inline-flex items-center gap-2 text-xs font-semibold text-[#790018] hover:text-[#9C7837] px-4 py-1.5 rounded-full"
                title="Follow @kgf_nx on Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-[#790018]" />
                <span className="font-mono-tag text-[11px] tracking-wider">{STORE_CONFIG.instagramUsername}</span>
              </a>

              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-social-glass inline-flex items-center gap-2 text-xs font-semibold text-neutral-800 hover:text-[#790018] px-4 py-1.5 rounded-full"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#790018]" />
                <span className="font-mono-tag text-[11px] tracking-wider">{STORE_CONFIG.phoneDisplay}</span>
              </a>
            </div>

            {/* KGF Crest Logo Emblem with Gentle Reveal */}
            <div className="flex justify-center mb-6">
              <div className="animate-logo-haute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#C6A15B] p-1.5 shadow-2xl shadow-[#C6A15B]/25 bg-[#FFF9EF]/95 backdrop-blur-md flex items-center justify-center transform transition-transform duration-500 hover:scale-105 hover:border-[#FFF9EF]">
                <img
                  src="/kgf-logo.svg"
                  alt="KGF Mens Fashion Club Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(198,161,91,0.4)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/kgf-logo.png';
                  }}
                />
              </div>
            </div>

            {/* Eyebrow Label */}
            <div className="mb-2.5">
              <span className="font-mono-tag text-[10px] tracking-[0.28em] uppercase text-[#9C7837] font-semibold">
                Haute Couture & Bespoke Menswear • Akola
              </span>
            </div>

            {/* Luxury Fashion Masthead */}
            <h1 className="masthead-kgf">
              KGF MENS FASHION CLUB
            </h1>

            {/* Subheading in Cormorant Garamond with Regal Ornamental Lines */}
            <div className="mt-3.5 inline-flex items-center justify-center gap-3 sm:gap-5">
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#C6A15B]" />
              <h2 className="subheading-editorial font-cormorant text-gold-gradient-haute">
                {STORE_CONFIG.headerSubtitle}
              </h2>
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#C6A15B]" />
            </div>

            {/* Store Address Tag */}
            <p className="mt-4 text-xs sm:text-sm text-neutral-800 max-w-lg mx-auto flex items-center justify-center gap-1.5 font-medium bg-[#FFF9EF]/70 backdrop-blur-xs py-1.5 px-4 rounded-full border border-[#C6A15B]/25 shadow-xs">
              <MapPin className="w-4 h-4 text-[#790018] shrink-0" />
              <span className="font-mono-tag text-[11px] tracking-wide text-neutral-800">{STORE_CONFIG.address}</span>
            </p>

            {/* Understated Editorial Scroll Indicator */}
            <div className="mt-5 flex justify-center text-[#9C7837]/80">
              <ChevronDown className="w-4 h-4 animate-scroll-bounce opacity-70" />
            </div>
          </header>

          {/* ------------------------------------------------------------- */}
          {/* THREE MAIN ACTIONS ONLY (BESPOKE LUXURY GLASS PANELS)         */}
          {/* ------------------------------------------------------------- */}
          <div className="mt-9 space-y-7">
            
            {/* Action 1 & Action 2 Row (Instagram & WhatsApp) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* ACTION 1: Follow on Instagram */}
              <div className="panel-luxury-glass p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#790018]">
                      <Instagram className="w-5 h-5 text-[#790018]" />
                      <span className="font-mono-tag text-[10px] font-bold tracking-[0.24em] uppercase text-[#9C7837]">
                        Action 01
                      </span>
                    </div>
                    <span className="font-mono-tag text-[10px] font-bold text-[#790018] bg-[#790018]/10 px-2.5 py-0.5 rounded-full border border-[#790018]/20">
                      {STORE_CONFIG.instagramUsername}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
                    Follow on Instagram
                  </h3>
                  <p className="font-sans-body text-xs sm:text-[13px] text-neutral-700 mt-2 leading-relaxed">
                    Explore our latest runway drops in royal wedding sherwanis, Italian-cut tuxedos, and bespoke festive styling.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C6A15B]/25">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-insta-haute w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Follow @kgf_nx</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-75" />
                  </a>
                </div>
              </div>

              {/* ACTION 2: Chat on WhatsApp */}
              <div className="panel-luxury-glass p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#790018] mb-3">
                    <MessageCircle className="w-5 h-5 text-[#790018]" />
                    <span className="font-mono-tag text-[10px] font-bold tracking-[0.24em] uppercase text-[#9C7837]">
                      Action 02
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
                    Chat on WhatsApp
                  </h3>
                  <p className="font-sans-body text-xs sm:text-[13px] text-neutral-700 mt-2 leading-relaxed">
                    Personalized bespoke consultation with our showroom master for wedding fittings, fabric swatches, and sizing.
                  </p>
                  <div className="mt-2.5 text-xs font-bold text-[#790018] flex items-center gap-1.5 font-mono-tag">
                    <span className="uppercase text-[10px] text-neutral-500">Concierge:</span>
                    <span className="text-[#790018] font-semibold">{STORE_CONFIG.phoneDisplay}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C6A15B]/25">
                  <a
                    href={STORE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-haute w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-white" />
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-75" />
                  </a>
                </div>
              </div>

            </div>

            {/* ACTION 3: Google Review Assistant */}
            <section className="panel-luxury-glass p-6 sm:p-9">
              
              {/* Card Header with Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#C6A15B]/35 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#790018] text-[#FFF9EF] flex items-center justify-center text-xs font-bold shadow-md shadow-[#790018]/25 font-editorial">
                    03
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#790018]">
                      Google Review Assistant
                    </h3>
                    <span className="font-mono-tag text-[10px] text-[#9C7837] font-semibold tracking-[0.22em] uppercase block mt-0.5">
                      Fast, Truthful & Sincere 3-Step Review Assistant
                    </span>
                  </div>
                </div>
                <span className="font-mono-tag text-[10px] text-neutral-700 font-semibold bg-[#C6A15B]/15 px-3 py-1 rounded-full border border-[#C6A15B]/45 w-fit">
                  g.page/r/CdTtJA87_AdSEBI/review
                </span>
              </div>

              {/* Step 1: Select 5 Gold Stars */}
              <div className="mt-7 text-center">
                <label className="block font-mono-tag text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-700 mb-2.5">
                  1. Select Your Rating
                </label>

                <div className="flex justify-center items-center gap-2 sm:gap-3.5 py-2">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = (hoverRating || rating) >= starValue;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => handleRatingChange(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 sm:p-2 transition-all transform hover:scale-120 focus:outline-none"
                        aria-label={`${starValue} Stars`}
                      >
                        <Star
                          className={`w-9 h-9 sm:w-12 sm:h-12 transition-all duration-300 ${
                            isFilled
                              ? 'text-[#C6A15B] fill-[#C6A15B] drop-shadow-[0_4px_8px_rgba(198,161,91,0.55)]'
                              : 'text-neutral-300 hover:text-[#C6A15B]/50'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="font-cormorant text-base sm:text-lg italic font-semibold text-[#790018] mt-1.5 tracking-wide">
                  {rating === 5 && '“Outstanding Experience — Flawless Quality & Bespoke Fit”'}
                  {rating === 4 && '“Very Good Experience — Highly Commendable Collection”'}
                  {rating === 3 && '“Fair Experience — Balanced & Honest Assessment”'}
                  {rating === 2 && '“Constructive Feedback — Needs Stock & Service Improvement”'}
                  {rating === 1 && '“Unsatisfactory Experience — Direct Management Escalation”'}
                </div>
              </div>

              {/* Step 2: Optional Question - What stood out about your visit? */}
              <div className="mt-8 pt-6 border-t border-[#C6A15B]/25">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs sm:text-sm font-bold text-neutral-900 flex items-center gap-2 font-sans-body">
                    <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                    <span>Optional: What stood out about your visit?</span>
                  </label>
                  <span className="font-mono-tag text-[10px] text-neutral-500 uppercase">
                    Select all that apply
                  </span>
                </div>
                <p className="font-sans-body text-xs text-neutral-600 mb-3.5">
                  Tap to weave these authentic highlights directly into your review draft:
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {STANDOUT_HIGHLIGHTS.map((item) => {
                    const isSelected = selectedHighlights.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleHighlight(item)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#790018] text-[#FFF9EF] font-semibold shadow-xs border border-[#790018]'
                            : 'bg-[#FFF9EF]/80 text-neutral-800 hover:bg-[#C6A15B]/20 hover:text-[#790018] border border-neutral-300'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>

                {/* Optional Custom note input */}
                <div className="mt-3.5">
                  <input
                    type="text"
                    placeholder="Anything specific you'd like to mention? (Optional personal note)"
                    value={customFeedback}
                    onChange={(e) => handleCustomCommentChange(e.target.value)}
                    className="w-full text-xs sm:text-[13px] p-3 bg-[#FFF9EF]/95 border border-neutral-300 rounded-xl focus:border-[#C6A15B] focus:ring-1 focus:ring-[#790018] focus:outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Step 3: Editable AI-Assisted Review Draft */}
              <div className="mt-8 pt-6 border-t border-[#C6A15B]/25">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold text-neutral-900 flex items-center gap-2 font-sans-body">
                    <ShieldCheck className="w-4 h-4 text-[#9C7837]" />
                    <span>Your Editable Review Draft</span>
                  </label>
                  <span className="font-mono-tag text-[10px] text-neutral-500 uppercase tracking-wider">
                    Freely Editable
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={reviewDraft}
                    onChange={(e) => setReviewDraft(e.target.value)}
                    className="w-full p-4 bg-[#FFF9EF]/95 border-1.5 border-[#C6A15B]/60 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#790018] focus:ring-1 focus:ring-[#790018] transition-all leading-relaxed shadow-xs font-sans-body"
                  />
                </div>

                {/* Copy & Continue Action Buttons with High-End Hierarchy */}
                <div className="mt-5 flex flex-col sm:flex-row items-center gap-3.5">
                  
                  {/* Copy Draft Button */}
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="btn-review-copy-haute w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#790018]" />
                        <span>1. Copy Review Text</span>
                      </>
                    )}
                  </button>

                  {/* Continue to Google Reviews Button */}
                  <a
                    href={STORE_CONFIG.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-review-submit-haute w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>2. Continue to Google Reviews</span>
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>

                </div>

                {/* Verified Instructions Note */}
                <div className="mt-6 p-4 rounded-xl bg-[#FFF9EF]/90 border border-neutral-300 text-[11px] text-neutral-700 space-y-1.5 shadow-xs font-sans-body">
                  <div className="flex items-start gap-2 text-neutral-900 font-semibold">
                    <Info className="w-4 h-4 text-[#790018] shrink-0 mt-0.5" />
                    <span>How to publish your review on Google:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 pl-1 text-neutral-700">
                    <li>Click <strong>"1. Copy Review Text"</strong> to copy the draft.</li>
                    <li>Click <strong>"2. Continue to Google Reviews"</strong> to open our official review page in a new tab.</li>
                    <li><strong>Paste, verify, and submit</strong> the review directly on Google.</li>
                  </ol>
                  <p className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-200 italic font-mono-tag">
                    Note: Google requires customers to post under their own account. Reviews are never submitted automatically.
                  </p>
                </div>

                {/* Respectful Low Rating Assistance (Never Hiding or Blocking) */}
                {rating <= 2 && (
                  <div className="mt-4 p-4 rounded-xl bg-amber-50/95 border border-amber-300 text-[11px] text-amber-950 flex items-start gap-2.5 shadow-xs">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>We value your honest feedback:</strong> You are completely free to proceed to Google Reviews above. If you'd like our store management to address your concern right away, you can also{' '}
                      <a
                        href={`https://wa.me/918459147775?text=${encodeURIComponent('Hello KGF Management, I had an unsatisfactory visit and would like to share my feedback directly.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-bold text-[#790018]"
                      >
                        chat with the owner on WhatsApp
                      </a>.
                    </div>
                  </div>
                )}

              </div>

            </section>

          </div>

        </main>

        {/* Ultra-Luxury Translucent Editorial Footer */}
        <footer className="panel-luxury-glass !rounded-none !border-x-0 !border-b-0 border-t border-[#C6A15B]/35 py-7 text-center text-xs text-neutral-700 mt-12">
          <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3.5">
            <div className="flex items-center gap-2">
              <span className="font-editorial font-bold text-[#790018] tracking-wider text-sm">{STORE_CONFIG.name}</span>
              <span className="text-[#C6A15B]">•</span>
              <span className="font-mono-tag text-[11px] text-neutral-600">Akola, Maharashtra</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono-tag">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#790018] hover:text-[#9C7837] font-semibold underline flex items-center gap-1"
              >
                <Instagram className="w-3 h-3" />
                <span>Instagram (@kgf_nx)</span>
              </a>
              <span>•</span>
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-[#790018] underline"
              >
                WhatsApp
              </a>
              <span>•</span>
              <a
                href={STORE_CONFIG.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-[#790018] underline"
              >
                Google Reviews
              </a>
              <span>•</span>
              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-[#790018] underline"
              >
                Directions
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
