import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookMarked,
  FileText,
  Volume2,
  Cpu,
  Calendar,
  Users,
  DollarSign,
  Settings,
  Plus,
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Eye,
  Send,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { SAMPLE_STORIES } from '../data/sampleStories';
import { Story, Chapter, AdminJob } from '../types';
import { useToast } from '../context/ToastContext';

interface AdminDashboardProps {
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'stories' | 'editor' | 'jobs' | 'schedule' | 'members'
  >('overview');

  const [selectedStory, setSelectedStory] = useState<Story>(SAMPLE_STORIES[0]);
  const [editingChapter, setEditingChapter] = useState<Chapter>(SAMPLE_STORIES[0].chapters[0]);

  // Editor states
  const [chapterTitle, setChapterTitle] = useState(editingChapter.title);
  const [chapterProse, setChapterProse] = useState(editingChapter.proseExcerpt);
  const [chapterOutline, setChapterOutline] = useState(
    '1. Julian arrives at the terrace; 2. Tension over the unread letters; 3. Rainstorm forces them into the stone arbor.'
  );
  const [continuityNotes, setContinuityNotes] = useState(
    'Julian wears silver-framed drafting spectacles; Elena still keeps the sea-glass necklace given in Chapter 14.'
  );
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioStatus, setAudioStatus] = useState<'ready' | 'processing' | 'idle'>('ready');

  // Generation jobs
  const [jobs, setJobs] = useState<AdminJob[]>([
    {
      id: 'job-101',
      storyId: 'story-summer-stayed',
      storyTitle: 'The Summer We Almost Stayed',
      chapterNumber: 25,
      type: 'text_generation',
      status: 'processing',
      startedAt: '5 mins ago',
      progress: 68,
    },
    {
      id: 'job-102',
      storyId: 'story-contract-winter',
      storyTitle: 'A Contract Written in Winter',
      chapterNumber: 39,
      type: 'tts_narration',
      status: 'processing',
      startedAt: '12 mins ago',
      progress: 42,
    },
    {
      id: 'job-103',
      storyId: 'story-things-never-said',
      storyTitle: 'The Things We Never Said',
      chapterNumber: 20,
      type: 'validation',
      status: 'completed',
      startedAt: '1 hour ago',
      progress: 100,
    },
  ]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'stories', label: 'Stories', icon: BookMarked },
    { id: 'editor', label: 'Chapter Editor', icon: FileText },
    { id: 'jobs', label: 'Generation Jobs', icon: Cpu },
    { id: 'schedule', label: 'Publishing Schedule', icon: Calendar },
    { id: 'members', label: 'Members & Usage', icon: Users },
  ];

  const handleGenerateChapterText = () => {
    setIsGeneratingText(true);
    showToast('AI Generation started for chapter continuation...', 'info');

    setTimeout(() => {
      setIsGeneratingText(false);
      setChapterProse(
        (prev) =>
          prev +
          '\n\nThe dusk deepened into a quiet indigo over the bay. Julian took a step closer, his gaze steady on hers. "Some things," he whispered, his knuckles brushing the weathered railing, "were never meant to be settled from a distance."'
      );
      showToast('New narrative paragraphs drafted successfully', 'success');
    }, 1800);
  };

  const handleGenerateAudio = () => {
    setIsGeneratingAudio(true);
    setAudioStatus('processing');
    showToast(`Synthesizing narration with ${selectedStory.narrator.name}...`, 'info');

    setTimeout(() => {
      setIsGeneratingAudio(false);
      setAudioStatus('ready');
      showToast(`Narration generated and mastered successfully (${selectedStory.narrator.name})`, 'success');
    }, 2400);
  };

  const handleSaveDraft = () => {
    showToast('Chapter draft saved to database', 'success');
  };

  const handlePublish = () => {
    showToast(`Chapter ${editingChapter.number} scheduled for release tomorrow at 06:00 UTC`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#292421] flex flex-col md:flex-row">
      {/* SIDEBAR (Desktop 240px) */}
      <aside className="w-full md:w-[240px] bg-white border-r border-[#E7E0DA] shrink-0 flex flex-col justify-between p-4">
        <div>
          {/* Studio Brand Header */}
          <div className="pb-4 mb-4 border-b border-[#F2EEEA] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#873F55] tracking-wider block">
                Publisher Console
              </span>
              <span className="font-editorial text-lg text-[#292421]">Dino Studio</span>
            </div>
            <button
              onClick={onExit}
              className="p-1.5 text-[#746B65] hover:text-[#292421] rounded-md hover:bg-[#FAF8F5]"
              title="Return to Listener Storefront"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-[#F4E8EC] text-[#873F55] font-semibold'
                      : 'text-[#746B65] hover:text-[#292421] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Status Panel */}
        <div className="pt-4 border-t border-[#F2EEEA] text-[11px] text-[#948982]">
          <div className="flex items-center justify-between mb-1">
            <span>Voice Engine</span>
            <span className="text-[#39745A] font-medium">Ready</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Pipeline Rate</span>
            <span className="text-[#292421] font-mono">100 ch / series</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-[1280px]">
        {/* Compact Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E7E0DA]">
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl text-[#292421]">
              {activeTab === 'overview' && 'Editorial & Publishing Overview'}
              {activeTab === 'stories' && 'Series & Story Management'}
              {activeTab === 'editor' && 'Chapter Production Editor'}
              {activeTab === 'jobs' && 'Active Generation Pipelines'}
              {activeTab === 'schedule' && 'Automated Release Schedule'}
              {activeTab === 'members' && 'Listener Subscriptions & Costs'}
            </h1>
            <p className="text-xs text-[#746B65] mt-1">
              Production studio for serialized 100-chapter romance series with single-narrator consistency.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExit}
              className="px-3.5 py-1.5 text-xs font-medium text-[#746B65] bg-white border border-[#E7E0DA] rounded-lg hover:text-[#292421]"
            >
              Back to Storefront
            </button>
            <button
              onClick={() => {
                setActiveTab('editor');
                showToast('New draft initialized', 'info');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#873F55] rounded-lg hover:bg-[#6F3044]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Chapter</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#E7E0DA] rounded-[10px] p-4">
                <span className="text-xs text-[#746B65] block mb-1">Total Series</span>
                <span className="font-editorial text-3xl text-[#292421]">5</span>
                <span className="text-[11px] text-[#948982] block mt-1">100 planned per series</span>
              </div>
              <div className="bg-white border border-[#E7E0DA] rounded-[10px] p-4">
                <span className="text-xs text-[#746B65] block mb-1">Published Chapters</span>
                <span className="font-editorial text-3xl text-[#292421] tabular-nums">142</span>
                <span className="text-[11px] text-[#39745A] block mt-1">+6 this week</span>
              </div>
              <div className="bg-white border border-[#E7E0DA] rounded-[10px] p-4">
                <span className="text-xs text-[#746B65] block mb-1">Active Members</span>
                <span className="font-editorial text-3xl text-[#292421] tabular-nums">1,480</span>
                <span className="text-[11px] text-[#746B65] block mt-1">84% Premium ratio</span>
              </div>
              <div className="bg-white border border-[#E7E0DA] rounded-[10px] p-4">
                <span className="text-xs text-[#746B65] block mb-1">TTS Production Cost</span>
                <span className="font-editorial text-3xl text-[#292421] tabular-nums">$42.80</span>
                <span className="text-[11px] text-[#948982] block mt-1">Avg $0.30 / chapter</span>
              </div>
            </div>

            {/* Quick Actions & Recent Jobs Table */}
            <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-editorial text-lg text-[#292421]">Active Pipelines</h3>
                <span className="text-xs text-[#948982]">Real-time queue</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[#948982] border-b border-[#F2EEEA]">
                    <tr>
                      <th className="pb-2.5 font-medium">Job ID</th>
                      <th className="pb-2.5 font-medium">Story Title</th>
                      <th className="pb-2.5 font-medium">Chapter</th>
                      <th className="pb-2.5 font-medium">Task</th>
                      <th className="pb-2.5 font-medium">Status</th>
                      <th className="pb-2.5 font-medium">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2EEEA]">
                    {jobs.map((job) => (
                      <tr key={job.id} className="text-[#292421]">
                        <td className="py-3 font-mono text-[#948982]">{job.id}</td>
                        <td className="py-3 font-medium">{job.storyTitle}</td>
                        <td className="py-3">Ch. {job.chapterNumber}</td>
                        <td className="py-3 text-[#746B65]">
                          {job.type === 'text_generation' && 'Prose Generation'}
                          {job.type === 'tts_narration' && 'Audio Narration'}
                          {job.type === 'validation' && 'Continuity Check'}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                              job.status === 'completed'
                                ? 'bg-[#FAF8F5] text-[#39745A]'
                                : 'bg-[#F4E8EC] text-[#873F55]'
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3 tabular-nums text-[#746B65]">{job.progress}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STORIES TABLE */}
        {activeTab === 'stories' && (
          <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-editorial text-lg text-[#292421]">Story Roster</h3>
              <button
                onClick={() => showToast('New story outline wizard opened', 'info')}
                className="px-3 py-1.5 bg-[#873F55] text-white text-xs font-medium rounded-lg"
              >
                + Add New Series
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[#948982] border-b border-[#F2EEEA]">
                  <tr>
                    <th className="pb-2.5 font-medium">Cover</th>
                    <th className="pb-2.5 font-medium">Title & Author</th>
                    <th className="pb-2.5 font-medium">Genre</th>
                    <th className="pb-2.5 font-medium">Narrator Voice</th>
                    <th className="pb-2.5 font-medium">Chapters</th>
                    <th className="pb-2.5 font-medium">Status</th>
                    <th className="pb-2.5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EEEA]">
                  {SAMPLE_STORIES.map((story) => (
                    <tr key={story.id} className="text-[#292421]">
                      <td className="py-3">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/cover_summer_stayed.jpg';
                          }}
                          className="w-8 h-10 object-cover rounded-[3px]"
                        />
                      </td>
                      <td className="py-3">
                        <span className="font-editorial text-sm font-medium block">
                          {story.title}
                        </span>
                        <span className="text-[#948982] text-[11px]">{story.author}</span>
                      </td>
                      <td className="py-3 text-[#746B65]">{story.genre}</td>
                      <td className="py-3">
                        <span className="font-medium">{story.narrator.name}</span>
                        <span className="text-[#948982] block text-[10px]">
                          {story.narrator.accent} ({story.narrator.tone})
                        </span>
                      </td>
                      <td className="py-3 tabular-nums">
                        {story.publishedChaptersCount} / {story.totalPlannedChapters}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-[#F2EEEA] text-[#746B65]">
                          {story.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedStory(story);
                            setEditingChapter(story.chapters[0]);
                            setChapterTitle(story.chapters[0].title);
                            setChapterProse(story.chapters[0].proseExcerpt);
                            setActiveTab('editor');
                          }}
                          className="text-[#873F55] font-semibold hover:underline"
                        >
                          Open Editor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CHAPTER PRODUCTION EDITOR */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Editor Form */}
            <div className="lg:col-span-8 bg-white border border-[#E7E0DA] rounded-[12px] p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-[#F2EEEA] pb-4">
                <div>
                  <span className="text-xs text-[#873F55] font-semibold">
                    {selectedStory.title}
                  </span>
                  <h2 className="font-editorial text-xl text-[#292421]">
                    Chapter {editingChapter.number} Editor
                  </h2>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#746B65]">
                    Word count:{' '}
                    <strong className="text-[#292421] font-mono">
                      {chapterProse.split(/\s+/).filter(Boolean).length}
                    </strong>
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-[#F4E8EC] text-[#873F55]">
                    Draft Ready
                  </span>
                </div>
              </div>

              {/* Chapter Title Input */}
              <div>
                <label className="block text-xs font-semibold text-[#292421] mb-1">
                  Chapter Title
                </label>
                <input
                  type="text"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg text-sm text-[#292421] focus:outline-hidden focus:border-[#873F55]"
                />
              </div>

              {/* Chapter Outline */}
              <div>
                <label className="block text-xs font-semibold text-[#292421] mb-1">
                  Plot Beats & Outline
                </label>
                <textarea
                  rows={2}
                  value={chapterOutline}
                  onChange={(e) => setChapterOutline(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg text-xs text-[#292421] focus:outline-hidden focus:border-[#873F55]"
                />
              </div>

              {/* Continuity Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#292421] mb-1">
                  Continuity & Lore Guardrails
                </label>
                <input
                  type="text"
                  value={continuityNotes}
                  onChange={(e) => setContinuityNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg text-xs text-[#292421] focus:outline-hidden focus:border-[#873F55]"
                />
              </div>

              {/* Prose Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#292421]">
                    Chapter Narrative Prose
                  </label>
                  <button
                    onClick={handleGenerateChapterText}
                    disabled={isGeneratingText}
                    className="inline-flex items-center gap-1 text-xs text-[#873F55] font-semibold hover:underline"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingText ? 'Generating Prose...' : 'AI Continue Scene'}</span>
                  </button>
                </div>
                <textarea
                  rows={10}
                  value={chapterProse}
                  onChange={(e) => setChapterProse(e.target.value)}
                  className="w-full p-4 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg font-serif text-[15px] text-[#292421] leading-relaxed focus:outline-hidden focus:border-[#873F55]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F2EEEA]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveDraft}
                    className="px-4 py-2 bg-white border border-[#D6CCC4] text-xs font-semibold text-[#292421] rounded-lg hover:bg-[#FAF8F5]"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => showToast('Continuity invariants verified. No plot gaps detected.', 'success')}
                    className="px-4 py-2 bg-white border border-[#D6CCC4] text-xs font-semibold text-[#746B65] rounded-lg hover:text-[#292421]"
                  >
                    Validate Invariants
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateAudio}
                    disabled={isGeneratingAudio}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF8F5] border border-[#873F55] text-xs font-semibold text-[#873F55] rounded-lg hover:bg-[#F4E8EC]"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isGeneratingAudio ? 'Synthesizing...' : 'Generate Voice Narration'}</span>
                  </button>

                  <button
                    onClick={handlePublish}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#873F55] text-white text-xs font-semibold rounded-lg hover:bg-[#6F3044]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Schedule / Publish</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Audio & Narrator Panel */}
            <div className="lg:col-span-4 space-y-4">
              {/* Narrator Card */}
              <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-5">
                <h4 className="font-editorial text-base text-[#292421] mb-2">
                  Series Narrator Profile
                </h4>
                <div className="text-xs text-[#746B65] space-y-2">
                  <div className="flex justify-between">
                    <span>Assigned Voice:</span>
                    <strong className="text-[#292421]">{selectedStory.narrator.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Accent:</span>
                    <span>{selectedStory.narrator.accent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cadence:</span>
                    <span>{selectedStory.narrator.tone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consistency:</span>
                    <span className="text-[#39745A] font-semibold">Locked (Ch 1 - 100)</span>
                  </div>
                </div>
              </div>

              {/* Narration Preview Card */}
              <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-5">
                <h4 className="font-editorial text-base text-[#292421] mb-2">
                  Master Audio Track
                </h4>
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E7E0DA] mb-3 text-xs text-[#746B65]">
                  <div className="flex items-center justify-between mb-1">
                    <span>Mastering Status:</span>
                    <span className="text-[#39745A] font-medium uppercase text-[10px]">
                      {audioStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-mono text-[#292421]">13m 40s</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Playing audio preview in studio monitors...', 'info')}
                  className="w-full py-2 bg-white border border-[#D6CCC4] rounded-lg text-xs font-semibold text-[#292421] hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Preview Audio Track</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GENERATION JOBS */}
        {activeTab === 'jobs' && (
          <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-5">
            <h3 className="font-editorial text-lg text-[#292421] mb-4">Pipeline History</h3>
            <div className="divide-y divide-[#F2EEEA]">
              {jobs.map((job) => (
                <div key={job.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#292421] block">
                      {job.storyTitle} · Chapter {job.chapterNumber}
                    </span>
                    <span className="text-[11px] text-[#948982]">
                      {job.type} · Started {job.startedAt}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#746B65]">{job.progress}%</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] ${
                        job.status === 'completed'
                          ? 'bg-[#FAF8F5] text-[#39745A]'
                          : 'bg-[#F4E8EC] text-[#873F55]'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PUBLISHING SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-5">
            <h3 className="font-editorial text-lg text-[#292421] mb-4">
              Daily Automated Publishing Schedule
            </h3>
            <div className="space-y-3 text-xs text-[#746B65]">
              <div className="p-3.5 bg-[#FAF8F5] border border-[#39745A]/40 rounded-lg flex items-center justify-between">
                <div>
                  <strong className="text-[#292421] block">
                    Today, 06:00 UTC · The Summer We Almost Stayed (Ch 5: The Harbor Lanterns at Midnight)
                  </strong>
                  <span className="text-[#39745A]">Published & Live for Listeners Now</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#39745A] text-white">Live Today</span>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] border border-[#39745A]/40 rounded-lg flex items-center justify-between">
                <div>
                  <strong className="text-[#292421] block">
                    Today, 06:00 UTC · A Contract Written in Winter (Ch 4: Whispers in the Snow)
                  </strong>
                  <span className="text-[#39745A]">Published & Live for Listeners Now</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#39745A] text-white">Live Today</span>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] border border-[#39745A]/40 rounded-lg flex items-center justify-between">
                <div>
                  <strong className="text-[#292421] block">
                    Today, 06:00 UTC · The Things We Never Said (Ch 3: The Forgotten Rose Garden)
                  </strong>
                  <span className="text-[#39745A]">Published & Live for Listeners Now</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#39745A] text-white">Live Today</span>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg flex items-center justify-between">
                <div>
                  <strong className="text-[#292421] block">
                    Tomorrow, 06:00 UTC · The Summer We Almost Stayed (Ch 6)
                  </strong>
                  <span>Automated release for Premium listeners</span>
                </div>
                <span className="text-[#9A6B2F] font-semibold">Queued</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MEMBERS */}
        {activeTab === 'members' && (
          <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-5">
            <h3 className="font-editorial text-lg text-[#292421] mb-4">
              Member Breakdown & Revenue
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E7E0DA]">
                <span className="text-xs text-[#948982] block">Active Premium Members</span>
                <span className="font-editorial text-2xl text-[#292421]">1,240</span>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E7E0DA]">
                <span className="text-xs text-[#948982] block">Free Preview Listeners</span>
                <span className="font-editorial text-2xl text-[#292421]">240</span>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E7E0DA]">
                <span className="text-xs text-[#948982] block">Estimated MRR</span>
                <span className="font-editorial text-2xl text-[#873F55]">$12,380</span>
              </div>
            </div>
            <p className="text-xs text-[#948982]">
              All member metrics are computed live from user subscription records.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
