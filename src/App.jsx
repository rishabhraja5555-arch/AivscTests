import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  Shield, Plane, ChevronRight, ArrowLeft, Award, 
  X, Lock, Unlock, CheckCircle2, 
  Target, BookOpen, GraduationCap, Activity
} from 'lucide-react';

// Firebase configuration with robust fallbacks for non-Firebase hosting (e.g. Vercel)
const getRuntimeGlobal = (key) => (typeof globalThis[key] !== 'undefined' ? globalThis[key] : null);

const parseFirebaseConfig = (value) => {
  if (!value) return null;
  if (typeof value === 'object') return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error('Invalid Firebase config JSON:', error);
    return null;
  }
};

const envFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const hasDiscreteEnvFirebaseConfig = Object.values(envFirebaseConfig).some(Boolean);
const firebaseConfig =
  parseFirebaseConfig(getRuntimeGlobal('__firebase_config')) ||
  parseFirebaseConfig(import.meta.env.VITE_FIREBASE_CONFIG) ||
  (hasDiscreteEnvFirebaseConfig ? envFirebaseConfig : null);

const hasFirebaseConfig = Boolean(firebaseConfig?.apiKey && firebaseConfig?.projectId && firebaseConfig?.appId);

const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const appId = getRuntimeGlobal('__app_id') || import.meta.env.VITE_APP_ID || 'aivsc-prep-portal';

// ==================================================================================
// 🟢 CONTENT DATA
// ==================================================================================

const questionDatabase = {
  'bluebook': {
    0: { 
      0: [
        { id: 1, text: "The Supreme Commander of the Indian Armed Forces is the", options: ["Prime Minister", "Defence Minister", "President of India", "Chief of Defence Staff"], correctAnswer: 2 },
        { id: 2, text: "The land-based branch of the Indian Armed Forces is the", options: ["Indian Navy", "Indian Air Force", "Indian Army", "Territorial Army"], correctAnswer: 2 },
        { id: 3, text: "The Chief of Army Staff (COAS) holds the rank of", options: ["Lieutenant General", "Major General", "General", "Brigadier"], correctAnswer: 2 },
        { id: 4, text: "How many theatre commands does the Indian Army have?", options: ["Five", "Six", "Seven", "Eight"], correctAnswer: 2 },
        { id: 5, text: "Headquarters of the Western Command of the Indian Army is at", options: ["Jaipur", "Pune", "Chandimandir", "Lucknow"], correctAnswer: 2 }
      ]
    }
  },
  'sop': {
    0: {
      0: [
        { id: 1, text: "Virus SW-80 is classified as a", options: ["Low wing, tail wheel aircraft", "High wing, tricycle aircraft", "Mid wing, retractable gear aircraft", "Low wing, twin engine aircraft"], correctAnswer: 1 },
        { id: 2, text: "Virus SW-80 uses which type of tail configuration?", options: ["Conventional tail", "Cruciform tail", "V-tail", "T-tail"], correctAnswer: 3 },
        { id: 3, text: "Primary construction material of Virus SW-80 airframe is", options: ["Aluminium alloy", "Steel tubing", "Composite materials", "Titanium"], correctAnswer: 2 }
      ]
    }
  }
};

const SUBJECTS = [
  { id: 'live-test', title: 'LIVE TEST SECTION', icon: 'activity', color: 'bg-rose-600', description: 'Active examination sessions and real-time assessments.', isLive: true, chapters: ["Official Mock 01", "Final Assessment"] },
  { id: 'bluebook', title: 'BLUE BOOK', icon: 'iaf', color: 'bg-blue-600', description: 'Comprehensive guide on IAF, Aircraft, and Aviation.', chapters: ["Armed Forces & IAF Capsule", "Modes of Entry", "Aircraft Types", "Latest Trends", "Air Campaigns", "Principle of Flight"] },
  { id: 'sop', title: 'SOP', icon: 'aircraft', color: 'bg-emerald-600', description: 'Standard Operating Procedures and Technical Specs.', chapters: ["Airplane Systems", "Limitations", "Technical Specs", "Normal Ops", "Emergency Procedures"] },
  { id: 'health', title: 'HEALTH AND HYGIENE', icon: 'medic', color: 'bg-red-500', description: 'Physical health, First Aid, and Yoga.', chapters: ["Human Body Structure", "Hygiene & Sanitation", "Infectious Diseases", "First Aid"] },
  { id: 'b-cert', title: 'B-CERTIFICATE', icon: 'grad', color: 'bg-amber-500', description: 'Mock tests for B-Certificate exam.', chapters: ["Mock 1", "Mock 2"] },
  { id: 'c-cert', title: 'C-CERTIFICATE', icon: 'grad', color: 'bg-indigo-600', description: 'Mock tests for C-Certificate exam.', chapters: ["Mock 1", "Mock 2"] }
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ==================================================================================
// 🛠️ APP LOGIC
// ==================================================================================

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(null);
  const [selectedSetIdx, setSelectedSetIdx] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [locks, setLocks] = useState({});
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [pendingLocks, setPendingLocks] = useState({});

  // Authentication Setup (Rule 3 Compliance)
  useEffect(() => {
    if (!auth) return;

    const initAuth = async () => {
      try {
        const initialAuthToken = getRuntimeGlobal('__initial_auth_token');
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth Error:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Sync locks from Firestore in real-time (Rule 1 & 3 Compliance)
  useEffect(() => {
    if (!user || !db) {
      setLocks({});
      return;
    }

    const lockDoc = doc(db, 'artifacts', appId, 'public', 'data', 'app_state', 'locks');
    const unsubscribe = onSnapshot(lockDoc, (snapshot) => {
      if (snapshot.exists()) {
        setLocks(snapshot.data().locks || {});
      } else {
        setLocks({});
      }
    }, (error) => console.error("Firestore Listen Error:", error));

    return () => unsubscribe();
  }, [user, db, appId]);

  // Handle locking/unlocking action
  const toggleLock = async (e, key) => {
    e.stopPropagation();
    if (!adminAuth || !user || !db || pendingLocks[key]) return;

    const previousLockValue = !!locks[key];
    const nextLockValue = !previousLockValue;
    const lockDoc = doc(db, 'artifacts', appId, 'public', 'data', 'app_state', 'locks');

    setPendingLocks((prev) => ({ ...prev, [key]: true }));
    setLocks((prev) => ({ ...prev, [key]: nextLockValue }));

    try {
      await setDoc(lockDoc, { locks: { [key]: nextLockValue } }, { merge: true });
    } catch (error) {
      console.error('Failed to update lock state:', error);
      setLocks((prev) => ({ ...prev, [key]: previousLockValue }));
    } finally {
      setPendingLocks((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const isLocked = (key) => !!locks[key];

  const goHome = () => {
    setView('home');
    setSelectedSubject(null);
    setSelectedChapterIdx(null);
    setQuestions([]);
  };

  const handleAdminAuth = () => {
    if (accessCodeInput === '9563') {
      setAdminAuth(true);
      setIsAdminOpen(false);
      setAccessCodeInput('');
    }
  };

  const startTest = (setIdx) => {
    const lockKey = `set_${selectedSubject.id}_${selectedChapterIdx}_${setIdx}`;
    if (isLocked(lockKey) && !adminAuth) return;

    const subjectData = questionDatabase[selectedSubject.id];
    const rawQuestions = subjectData?.[selectedChapterIdx]?.[setIdx] || [];
    if (rawQuestions.length === 0) return;

    const preparedQuestions = rawQuestions.map(q => {
      const correctText = q.options[q.correctAnswer];
      const shuffled = shuffleArray(q.options);
      return { ...q, options: shuffled, correctAnswer: shuffled.indexOf(correctText) };
    });

    setQuestions(preparedQuestions);
    setSelectedSetIdx(setIdx);
    setUserAnswers({});
    setView('test');
    window.scrollTo(0, 0);
  };

  const SubjectIcon = ({ type, size = 24 }) => {
    switch (type) {
      case 'iaf': return <Shield size={size} />;
      case 'aircraft': return <Plane size={size} />;
      case 'activity': return <Activity size={size} />;
      case 'grad': return <GraduationCap size={size} />;
      default: return <BookOpen size={size} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div onClick={goHome} className="cursor-pointer">
            <h1 className="text-xl font-black tracking-tighter text-[#003153]">
              <span className="text-[#BF0A30]">AIVSC</span> PREP PORTAL
            </h1>
            <p 
              onDoubleClick={() => setIsAdminOpen(true)}
              className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-blue-500 transition-colors cursor-pointer select-none"
            >
              Developed by Flt Cdt Rishabh Raja
            </p>
          </div>
          {adminAuth && (
            <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-2 border border-amber-200">
              <Shield size={12} /> Master Access Active
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        {/* VIEW: HOME (Sections) */}
        {view === 'home' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center py-6">
              <div className="inline-block px-4 py-1 bg-[#003153] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Unity and Discipline</div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003153] mb-4 leading-tight">"By a Cadet, for the Cadets"</h2>
              <p className="text-slate-500 font-medium italic">Standardized Vayu Sainik Camp preparation module.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SUBJECTS.map(subj => {
                const lockKey = `section_${subj.id}`;
                const locked = isLocked(lockKey);
                const disabled = locked && !adminAuth;
                const isUpdating = !!pendingLocks[lockKey];

                return (
                  <div 
                    key={subj.id}
                    onClick={() => !disabled && (setSelectedSubject(subj), setView('subject'))}
                    className={`bg-white p-8 rounded-[2rem] border-2 transition-all relative group ${disabled ? 'opacity-50 grayscale cursor-not-allowed border-slate-100' : 'cursor-pointer border-transparent shadow-md hover:shadow-xl hover:border-blue-200 hover:-translate-y-2'}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`${subj.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <SubjectIcon type={subj.icon} size={32} />
                      </div>
                      {adminAuth ? (
                        <button 
                          onClick={(e) => toggleLock(e, lockKey)}
                          disabled={isUpdating}
                          className={`p-2.5 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed ${locked ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}
                        >
                          {locked ? <Lock size={20} /> : <Unlock size={20} />}
                        </button>
                      ) : (
                        locked && <Lock size={20} className="text-rose-400 mt-2" />
                      )}
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">{subj.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{subj.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW: CHAPTERS */}
        {view === 'subject' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <button onClick={goHome} className="flex items-center text-slate-500 font-bold hover:text-slate-900 transition-all">
              <ArrowLeft size={18} className="mr-2" /> Return to Dashboard
            </button>
            
            <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className={`${selectedSubject.color} p-4 rounded-2xl text-white shadow-md`}>
                <SubjectIcon type={selectedSubject.icon} size={36} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">{selectedSubject.title}</h2>
                <p className="text-slate-500 text-sm font-medium">Select a training module to proceed</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSubject.chapters.map((chap, idx) => {
                const lockKey = `chapter_${selectedSubject.id}_${idx}`;
                const locked = isLocked(lockKey);
                const disabled = locked && !adminAuth;
                const isUpdating = !!pendingLocks[lockKey];

                return (
                  <div 
                    key={idx}
                    onClick={() => !disabled && (setSelectedChapterIdx(idx), setView('practice_sets'))}
                    className={`bg-white p-5 rounded-2xl border-2 flex items-center justify-between group transition-all ${disabled ? 'opacity-50 grayscale cursor-not-allowed border-slate-100' : 'cursor-pointer border-transparent shadow-sm hover:border-blue-300 hover:shadow-lg'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 border border-slate-100">
                        {idx + 1}
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{chap}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {adminAuth ? (
                        <button 
                          onClick={(e) => toggleLock(e, lockKey)}
                          disabled={isUpdating}
                          className={`p-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed ${locked ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}
                        >
                          {locked ? <Lock size={18} /> : <Unlock size={18} />}
                        </button>
                      ) : (
                        locked && <Lock size={18} className="text-rose-400" />
                      )}
                      {!disabled && <ChevronRight size={18} className="text-slate-200 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW: SETS */}
        {view === 'practice_sets' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <button onClick={() => setView('subject')} className="flex items-center text-slate-500 font-bold hover:text-slate-900 transition-all">
              <ArrowLeft size={18} className="mr-2" /> Back to Modules
            </button>

            <div className="bg-[#003153] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-2">{selectedSubject.chapters[selectedChapterIdx]}</h2>
                <p className="text-blue-200 font-medium">Select a practice set to begin assessment</p>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Target size={120} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map(setIdx => {
                const lockKey = `set_${selectedSubject.id}_${selectedChapterIdx}_${setIdx}`;
                const locked = isLocked(lockKey);
                const disabled = locked && !adminAuth;
                const isUpdating = !!pendingLocks[lockKey];
                const hasData = !!questionDatabase[selectedSubject.id]?.[selectedChapterIdx]?.[setIdx];

                return (
                  <div 
                    key={setIdx}
                    onClick={() => !disabled && hasData && startTest(setIdx)}
                    className={`bg-white p-8 rounded-3xl border-2 transition-all relative ${disabled ? 'opacity-50 grayscale cursor-not-allowed border-slate-100' : hasData ? 'cursor-pointer border-transparent shadow-md hover:border-blue-500 hover:shadow-xl' : 'border-dashed border-slate-200 opacity-60'}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-2xl ${hasData ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-300'}`}>
                        <Target size={24} />
                      </div>
                      {adminAuth ? (
                        <button 
                          onClick={(e) => toggleLock(e, lockKey)}
                          disabled={isUpdating}
                          className={`p-2.5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed ${locked ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}
                        >
                          {locked ? <Lock size={20} /> : <Unlock size={20} />}
                        </button>
                      ) : (
                        locked && <Lock size={20} className="text-rose-400" />
                      )}
                    </div>
                    <h4 className="text-lg font-black text-slate-800">Practice Set {setIdx + 1}</h4>
                    <p className="text-[10px] uppercase font-black text-slate-400 mt-2 tracking-widest">
                      {hasData ? '30 Questions • Unlimited Time' : 'Coming Soon'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW: TEST */}
        {view === 'test' && (
          <div className="max-w-3xl mx-auto space-y-6">
             <div className="flex justify-between items-center sticky top-24 bg-[#F8FAFC]/90 backdrop-blur-md py-4 z-40 border-b border-slate-200 px-2">
               <button onClick={() => setView('practice_sets')} className="text-slate-500 font-bold flex items-center text-sm hover:text-rose-600 transition-colors">
                 <X size={18} className="mr-1" /> Terminate
               </button>
               <div className="bg-white border border-slate-200 px-5 py-2 rounded-full text-xs font-black text-slate-700 shadow-sm">
                 Progress: {Object.keys(userAnswers).length} / {questions.length}
               </div>
             </div>

             <div className="space-y-10 py-4">
               {questions.map((q, idx) => (
                 <div key={q.id} className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
                   <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-6">Question {idx + 1}</div>
                   <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">{q.text}</h3>
                   <div className="space-y-4">
                     {q.options.map((opt, oIdx) => {
                       const isSelected = userAnswers[q.id] === oIdx;
                       return (
                         <button
                           key={oIdx}
                           onClick={() => setUserAnswers(prev => ({...prev, [q.id]: oIdx}))}
                           className={`w-full text-left p-5 rounded-2xl border-2 font-bold transition-all flex items-center justify-between ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}
                         >
                           <span>{opt}</span>
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                             {isSelected && <CheckCircle2 size={14} className="text-white" />}
                           </div>
                         </button>
                       );
                     })}
                   </div>
                 </div>
               ))}
             </div>

             <button 
               onClick={() => setView('results')}
               className="w-full bg-[#003153] text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:scale-[1.02] transition-transform active:scale-95"
             >
               SUBMIT FINAL ANSWERS
             </button>
          </div>
        )}

        {/* VIEW: RESULTS */}
        {view === 'results' && (() => {
          let correct = 0;
          questions.forEach(q => { if(userAnswers[q.id] === q.correctAnswer) correct++; });
          const score = Math.round((correct / questions.length) * 100);

          return (
            <div className="max-w-2xl mx-auto text-center space-y-10 animate-in zoom-in-95 duration-500">
              <div className="bg-white p-16 rounded-[3.5rem] shadow-2xl border border-slate-100">
                <div className={`w-28 h-28 mx-auto rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-xl ${score >= 70 ? 'bg-emerald-500 rotate-12' : 'bg-rose-500 -rotate-12'}`}>
                  <Award size={56} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">Assessment Complete</h2>
                <div className="text-7xl font-black text-[#003153] tracking-tighter mb-8">{score}<span className="text-3xl">%</span></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                    <div className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">Accuracy</div>
                    <div className="text-3xl font-black text-emerald-700">{correct} <span className="text-sm">Correct</span></div>
                  </div>
                  <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
                    <div className="text-rose-400 text-[10px] font-black uppercase tracking-widest mb-2">Errors</div>
                    <div className="text-3xl font-black text-rose-700">{questions.length - correct} <span className="text-sm">Wrong</span></div>
                  </div>
                </div>
              </div>
              <button onClick={goHome} className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-black transition-colors">BACK TO DASHBOARD</button>
            </div>
          );
        })()}
      </main>

      {/* Admin Auth Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm p-10 rounded-[3rem] shadow-2xl relative">
            <button onClick={() => setIsAdminOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-600 transition-colors">
              <X size={28} />
            </button>
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
                <Shield size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Control Portal</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Administrative Verification</p>
            </div>
            <input 
              type="password" 
              placeholder="••••"
              value={accessCodeInput}
              onChange={(e) => setAccessCodeInput(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-3xl text-center font-black text-3xl tracking-[1em] focus:border-blue-500 focus:outline-none transition-all mb-6 placeholder:tracking-normal placeholder:text-slate-200"
            />
            <button 
              onClick={handleAdminAuth}
              className="w-full bg-[#003153] text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-900/20 active:scale-95 transition-transform"
            >
              GRANT ACCESS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
