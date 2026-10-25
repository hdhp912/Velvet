import React, { useState } from 'react';
import { Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface MembershipViewProps {
  onExploreStories: () => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({ onExploreStories }) => {
  const { user, upgradeToPremium, togglePremiumMembership } = useAuth();
  const { showToast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSelectPlan = (plan: 'free' | 'monthly' | 'annual') => {
    if (plan === 'free') {
      if (user?.isPremium) {
        togglePremiumMembership();
        showToast('Switched to Free Listener plan');
      } else {
        showToast('You are currently on the Free Listener plan');
      }
    } else {
      upgradeToPremium(billingCycle);
      showToast(
        billingCycle === 'annual'
          ? 'Welcome to Velvet Stories Premium (Annual Plan)'
          : 'Welcome to Velvet Stories Premium (Monthly Plan)',
        'success'
      );
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-10 md:py-16">
      {/* Editorial Headline */}
      <div className="text-center max-w-[640px] mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#873F55] mb-2 block">
          Simple, Transparent Membership
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-[42px] leading-tight text-[#292421] mb-4">
          Make room for another story.
        </h1>
        <p className="text-sm sm:text-base text-[#746B65] leading-relaxed">
          Unlock complete 100-chapter romance serials, exclusive narrator performances, and every daily chapter release without interruption.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="mt-8 inline-flex items-center p-1 bg-[#F2EEEA] border border-[#E7E0DA] rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-[#292421] shadow-xs'
                : 'text-[#746B65] hover:text-[#292421]'
            }`}
          >
            Billed Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              billingCycle === 'annual'
                ? 'bg-white text-[#292421] shadow-xs'
                : 'text-[#746B65] hover:text-[#292421]'
            }`}
          >
            Billed Annually <span className="text-[#873F55] font-semibold text-xs ml-1">(Save 25%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Comparison (Stack vertically on mobile, 2 columns on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-14">
        {/* Tier 1: Free Listener */}
        <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-editorial text-2xl text-[#292421]">Free Listener</h3>
              {!user?.isPremium && (
                <span className="text-xs font-medium text-[#746B65] bg-[#F2EEEA] px-2.5 py-1 rounded-[5px]">
                  Current Plan
                </span>
              )}
            </div>

            <p className="text-xs text-[#746B65] mb-6">
              Preview opening chapters and experience our original voice narration library.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="font-editorial text-4xl text-[#292421]">$0</span>
              <span className="text-xs text-[#948982]">forever</span>
            </div>

            {/* Feature List */}
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#746B65] mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Access to the first 2 chapters of every story</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Full access to completed preview series</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Standard narration audio quality</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Synchronized reading mode text</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('free')}
            disabled={!user?.isPremium}
            className={`w-full py-3 rounded-lg text-xs sm:text-sm font-semibold border transition-colors ${
              !user?.isPremium
                ? 'bg-[#FAF8F5] text-[#948982] border-[#E7E0DA] cursor-default'
                : 'bg-white text-[#292421] border-[#D6CCC4] hover:bg-[#FAF8F5]'
            }`}
          >
            {!user?.isPremium ? 'Your Current Plan' : 'Downgrade to Free'}
          </button>
        </div>

        {/* Tier 2: Premium Member (Emphasized with thin burgundy border) */}
        <div className="bg-white border-2 border-[#873F55] rounded-[12px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_6px_24px_rgba(135,63,85,0.06)] relative">
          <div className="absolute -top-3 left-6 bg-[#873F55] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-[5px] uppercase tracking-wider">
            Most Access
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-editorial text-2xl text-[#292421]">Premium Member</h3>
              {user?.isPremium && (
                <span className="text-xs font-semibold text-[#873F55] bg-[#F4E8EC] px-2.5 py-1 rounded-[5px]">
                  Active Plan
                </span>
              )}
            </div>

            <p className="text-xs text-[#746B65] mb-6">
              Complete, unrestricted immersion in all serialized romance series.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="font-editorial text-4xl text-[#292421]">
                {billingCycle === 'monthly' ? '$9.99' : '$89'}
              </span>
              <span className="text-xs text-[#948982]">
                {billingCycle === 'monthly' ? '/ month' : '/ year ($7.41/mo)'}
              </span>
            </div>

            {/* Feature List */}
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#292421] mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Unlimited listening across all 100-chapter sagas</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Daily automated chapter releases the moment they drop</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Exclusive narrator performances & warm acoustic mix</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Full reading mode with chapter prose and continuity notes</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#873F55] shrink-0 mt-0.5" />
                <span>Cancel online anytime with no cancellation fees</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan(billingCycle)}
            className="w-full py-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#873F55] hover:bg-[#6F3044] transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            <span>{user?.isPremium ? 'Keep Premium Membership' : 'Become a member'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trust & Guarantee Policy */}
      <div className="p-6 bg-[#F2EEEA] rounded-[12px] border border-[#E7E0DA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#746B65]">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#873F55] shrink-0" />
          <div>
            <strong className="text-[#292421] block">Cancel whenever you like</strong>
            Subscriptions can be canceled instantly in your Account Settings. Your access remains active until the end of the billing period.
          </div>
        </div>
        <button
          onClick={onExploreStories}
          className="text-xs text-[#873F55] font-semibold hover:underline whitespace-nowrap"
        >
          Explore free stories first →
        </button>
      </div>
    </div>
  );
};
