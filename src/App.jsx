import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Plane, 
  Cross, 
  ChevronRight, 
  ArrowLeft, 
  Award, 
  BarChart2, 
  Bot, 
  X, 
  Minimize2, 
  Lock, 
  Send, 
  FileText, 
  FolderOpen,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Target,
  BookOpen,
  GraduationCap,
  Activity
} from 'lucide-react';

// ==================================================================================
// 🟢🟢🟢 USER CONTENT AREA: ADD YOUR QUESTIONS HERE 🟢🟢🟢
// ==================================================================================

const questionDatabase = {
  'bluebook': {
    0: { // Chapter 0: Armed Forces & IAF Capsule
      0: [ // Set 0 (Set 1)
        { id: 1, text: "The Supreme Commander of the Indian Armed Forces is the", options: ["Prime Minister", "Defence Minister", "President of India", "Chief of Defence Staff"], correctAnswer: 2 },
        { id: 2, text: "The land-based branch of the Indian Armed Forces is the", options: ["Indian Navy", "Indian Air Force", "Indian Army", "Territorial Army"], correctAnswer: 2 },
        { id: 3, text: "The Chief of Army Staff (COAS) holds the rank of", options: ["Lieutenant General", "Major General", "General", "Brigadier"], correctAnswer: 2 },
        { id: 4, text: "How many theatre commands does the Indian Army have?", options: ["Five", "Six", "Seven", "Eight"], correctAnswer: 2 },
        { id: 5, text: "Headquarters of the Western Command of the Indian Army is at", options: ["Jaipur", "Pune", "Chandimandir", "Lucknow"], correctAnswer: 2 },
        { id: 6, text: "The naval branch of the Indian Armed Forces is also known as", options: ["Bharatiya Nau Sena", "Bharatiya Jal Sena", "Bharatiya Samudra Sena", "Bharatiya Raksha Sena"], correctAnswer: 0 },
        { id: 7, text: "The Chief of Naval Staff holds the rank of", options: ["Vice Admiral", "Rear Admiral", "Admiral", "Commodore"], correctAnswer: 2 },
        { id: 8, text: "How many operational naval commands does the Indian Navy have?", options: ["Two", "Three", "Four", "Five"], correctAnswer: 1 },
        { id: 9, text: "Headquarters of the Southern Naval Command is located at", options: ["Mumbai", "Visakhapatnam", "Kochi", "Chennai"], correctAnswer: 2 },
        { id: 10, text: "The youngest of the three Indian Armed Forces is the", options: ["Army", "Navy", "Air Force", "Coast Guard"], correctAnswer: 2 },
        { id: 11, text: "The Indian Air Force was established in the year", options: ["1925", "1930", "1932", "1935"], correctAnswer: 2 },
        { id: 12, text: "The Chief of Air Staff holds the rank of", options: ["Air Marshal", "Air Vice Marshal", "Air Chief Marshal", "Marshal of the Air Force"], correctAnswer: 2 },
        { id: 13, text: "The headquarters of the Indian Air Force is located at", options: ["Nagpur", "Bangalore", "New Delhi", "Allahabad"], correctAnswer: 2 },
        { id: 14, text: "Which of the following is NOT a branch at Air Headquarters?", options: ["Air Operations", "Administrative", "Maintenance", "Medical"], correctAnswer: 3 },
        { id: 15, text: "How many commands does the Indian Air Force have in total?", options: ["Five", "Six", "Seven", "Eight"], correctAnswer: 2 },
        { id: 16, text: "Which of the following is a functional command of the IAF?", options: ["Western Air Command", "Eastern Air Command", "Training Command", "Central Air Command"], correctAnswer: 2 },
        { id: 17, text: "Headquarters of the Maintenance Command is located at", options: ["Bangalore", "Nagpur", "Shillong", "Gandhinagar"], correctAnswer: 1 },
        { id: 18, text: "The officer commanding an Air Command is known as", options: ["Station Commander", "Air Vice Marshal", "Air Officer AOC-in-C", "Chief of Air Staff"], correctAnswer: 2 },
        { id: 19, text: "Which of the following is an operational command of the IAF?", options: ["Training Command", "Maintenance Command", "Western Air Command", "Education Branch"], correctAnswer: 2 },
        { id: 20, text: "Headquarters of the Eastern Air Command is located at", options: ["Tezpur", "Guwahati", "Shillong", "Imphal"], correctAnswer: 2 },
        { id: 21, text: "The primary role of the Indian Air Force is", options: ["Naval warfare", "Ground combat", "Air defence of the country", "Internal security"], correctAnswer: 2 },
        { id: 22, text: "Aid to civil authorities during natural calamities is a", options: ["Primary role of IAF", "Secondary role of IAF", "Naval responsibility", "Army-exclusive role"], correctAnswer: 1 },
        { id: 23, text: "A Wing/Station in the IAF is described as a", options: ["Lodger unit", "Non-self-accounting unit", "Self-accounting unit", "Temporary unit"], correctAnswer: 2 },
        { id: 24, text: "A Squadron in the IAF is administratively controlled by", options: ["Air Headquarters", "Training Command", "Wing/Station", "Ministry of Defence"], correctAnswer: 2 },
        { id: 25, text: "Which branch of IAF is responsible for flying operations?", options: ["Logistics", "Engineering", "Flying", "Administration"], correctAnswer: 2 },
        { id: 26, text: "Weather forecasting in the IAF is handled by the", options: ["Navigation Branch", "Meteorology Branch", "Engineering Branch", "Education Branch"], correctAnswer: 1 },
        { id: 27, text: "Medical services in the IAF are handled by the", options: ["Administrative Branch", "Logistics Branch", "Medical Branch", "Education Branch"], correctAnswer: 2 },
        { id: 28, text: "The IAF branch responsible for aircraft maintenance is the", options: ["Flying Branch", "Logistics Branch", "Engineering Branch", "Navigation Branch"], correctAnswer: 2 },
        { id: 29, text: "Which branch deals with training and academic instruction in IAF?", options: ["Education Branch", "Administration Branch", "Logistics Branch", "Meteorology Branch"], correctAnswer: 0 },
        { id: 30, text: "Coordination among Army, Navy, and Air Force is achieved through", options: ["Independent commands", "Civil administration", "Integrated organisational structure", "Parliamentary control"], correctAnswer: 2 }
      ]
    }
  },
  'sop': {
    0: { // Chapter 0: Airplane Systems Description
      0: [ // Set 0 (Set 1)
        { id: 1, text: "Virus SW-80 is classified as a", options: ["Low wing, tail wheel aircraft", "High wing, tricycle aircraft", "Mid wing, retractable gear aircraft", "Low wing, twin engine aircraft"], correctAnswer: 1 },
        { id: 2, text: "Virus SW-80 uses which type of tail configuration?", options: ["Conventional tail", "Cruciform tail", "V-tail", "T-tail"], correctAnswer: 3 },
        { id: 3, text: "Primary construction material of Virus SW-80 airframe is", options: ["Aluminium alloy", "Steel tubing", "Composite materials", "Titanium"], correctAnswer: 2 },
        { id: 4, text: "Composite materials used in the airframe include all EXCEPT", options: ["Glass fibre", "Carbon fibre", "Kevlar", "Magnesium"], correctAnswer: 3 },
        { id: 5, text: "The engine installed on Virus SW-80 is", options: ["Rotax 914 Turbo", "Lycoming O-235", "Rotax 912 A", "Continental O-200"], correctAnswer: 2 },
        { id: 6, text: "Rotax 912 A engine is a", options: ["Two-stroke engine", "Four-stroke engine", "Diesel engine", "Turbo-prop engine"], correctAnswer: 1 },
        { id: 7, text: "Number of cylinders in Rotax 912 A engine is", options: ["Two", "Three", "Four", "Six"], correctAnswer: 2 },
        { id: 8, text: "Rotax 912 A engine cylinders are arranged as", options: ["Inline", "Radial", "Horizontally opposed", "V-type"], correctAnswer: 2 },
        { id: 9, text: "Virus SW-80 undercarriage is of which type?", options: ["Tail wheel", "Skid type", "Retractable tricycle", "Fixed tricycle"], correctAnswer: 3 },
        { id: 10, text: "Nose wheel steering in Virus SW-80 is achieved through", options: ["Differential braking", "Hydraulic system", "Rudder pedals", "Electric motor"], correctAnswer: 2 },
        { id: 11, text: "Braking system used on main wheels is", options: ["Drum brakes", "Pneumatic brakes", "Disc brakes", "Magnetic brakes"], correctAnswer: 2 },
        { id: 12, text: "Brakes in Virus SW-80 are operated", options: ["Electrically", "Pneumatically", "Mechanically", "Hydraulically"], correctAnswer: 3 },
        { id: 13, text: "Virus SW-80 uses which combined control surface?", options: ["Spoilerons", "Elevons", "Flaperons", "Slats"], correctAnswer: 2 },
        { id: 14, text: "Flaperons perform the function of", options: ["Flaps only", "Ailerons only", "Flaps and ailerons", "Slats and spoilers"], correctAnswer: 2 },
        { id: 15, text: "Number of flap positions available in Virus SW-80 is", options: ["Two", "Three", "Four", "Five"], correctAnswer: 1 },
        { id: 16, text: "Flap position “1” corresponds to", options: ["10°", "15°", "20°", "25°"], correctAnswer: 1 },
        { id: 17, text: "Flap position “2” corresponds to", options: ["15°", "20°", "25°", "30°"], correctAnswer: 2 },
        { id: 18, text: "Elevator trim in Virus SW-80 is", options: ["Manual", "Hydraulic", "Pneumatic", "Electro-mechanical"], correctAnswer: 3 },
        { id: 19, text: "Rudder control is transmitted using", options: ["Push-pull rods", "Torque tubes", "Cables", "Hydraulic pistons"], correctAnswer: 2 },
        { id: 20, text: "Parachute Rescue System (PRS) is located", options: ["In the nose section", "In the tail cone", "Behind the right seat", "Under the cockpit floor"], correctAnswer: 2 },
        { id: 21, text: "Activation of the Parachute Rescue System is", options: ["Automatic", "Radio controlled", "Hydraulically triggered", "Manually operated"], correctAnswer: 3 },
        { id: 22, text: "Time taken for parachute canopy to open after activation is approximately", options: ["1.5 seconds", "2.0 seconds", "3.2 seconds", "5.0 seconds"], correctAnswer: 2 },
        { id: 23, text: "Type of fire extinguisher carried onboard is", options: ["CO₂ type", "Dry powder", "Halon", "AFFF"], correctAnswer: 3 },
        { id: 24, text: "Propeller fitted on Virus SW-80 is", options: ["Three-blade variable pitch", "Two-blade fixed pitch", "Three-blade constant speed", "Two-blade controllable pitch"], correctAnswer: 1 },
        { id: 25, text: "Propeller reduction gear ratio is", options: ["1 : 1.5", "1 : 2.0", "1 : 2.27", "1 : 3.0"], correctAnswer: 2 },
        { id: 26, text: "Engine cooling system consists of", options: ["Air cooling only", "Liquid cooling only", "Liquid-cooled heads and air-cooled cylinders", "Oil cooling only"], correctAnswer: 2 },
        { id: 27, text: "Lubrication system used in Rotax 912 A is", options: ["Wet sump", "Splash lubrication", "Pressure lubrication", "Dry sump forced lubrication"], correctAnswer: 3 },
        { id: 28, text: "Fuel quantity indication in Virus SW-80 works on the principle of", options: ["Pressure sensing", "Capacitance", "Float position detection", "Fuel flow calculation"], correctAnswer: 2 },
        { id: 29, text: "Fuel tank of Virus SW-80 is located", options: ["Inside the wings", "Under the cockpit floor", "Inside the fuselage", "Inside the tail boom"], correctAnswer: 2 },
        { id: 30, text: "Pitot tube of Virus SW-80 is mounted on the", options: ["Left wing top surface", "Right wing bottom surface", "Nose section", "Vertical stabilizer"], correctAnswer: 1 }
      ]
    }
  },
  'health': {
    0: { // Chapter 0: Structure & Functioning of the Human Body
      0: [ // Set 0 (Set 1)
        { id: 101, text: "The total number of bones in an adult human body is", options: ["198", "200", "206", "210"], correctAnswer: 2 },
        { id: 102, text: "Bones which are loosely arranged are called", options: ["Compact bones", "Flat bones", "Spongy bones", "Irregular bones"], correctAnswer: 2 },
        { id: 103, text: "Bones that are densely arranged are known as", options: ["Spongy bones", "Compact bones", "Sesamoid bones", "Flat bones"], correctAnswer: 1 },
        { id: 104, text: "Long bones are mainly found in the", options: ["Skull", "Vertebral column", "Upper and lower limbs", "Pelvis"], correctAnswer: 2 },
        { id: 105, text: "Bones of the skull are classified as", options: ["Long bones", "Short bones", "Flat bones", "Irregular bones"], correctAnswer: 2 },
        { id: 106, text: "Vertebrae belong to which category of bones?", options: ["Long", "Short", "Flat", "Irregular"], correctAnswer: 3 },
        { id: 107, text: "The patella is an example of a", options: ["Long bone", "Short bone", "Flat bone", "Sesamoid bone"], correctAnswer: 3 },
        { id: 108, text: "Muscles constitute approximately what percentage of body weight?", options: ["25%", "35%", "47%", "60%"], correctAnswer: 2 },
        { id: 109, text: "Muscles attached to bones and under voluntary control are called", options: ["Cardiac muscles", "Involuntary muscles", "Smooth muscles", "Skeletal muscles"], correctAnswer: 3 },
        { id: 110, text: "Which muscles are controlled by the autonomic nervous system?", options: ["Voluntary muscles", "Skeletal muscles", "Involuntary muscles", "Cardiac muscles only"], correctAnswer: 2 },
        { id: 111, text: "Cardiac muscles are found in the", options: ["Lungs", "Brain", "Heart", "Stomach"], correctAnswer: 2 },
        { id: 112, text: "The circulatory system consists of", options: ["Heart and lungs", "Heart, blood and blood vessels", "Blood and lungs", "Heart and nerves"], correctAnswer: 1 },
        { id: 113, text: "The heart is located", options: ["On the right side of chest", "Exactly in the center", "Between lungs, slightly to the left", "Below the diaphragm"], correctAnswer: 2 },
        { id: 114, text: "The right side of the heart contains", options: ["Pure blood", "Oxygenated blood", "Impure blood", "Mixed blood"], correctAnswer: 2 },
        { id: 115, text: "Auricles of the heart function as", options: ["Pumping chambers", "Receiving chambers", "Filtering chambers", "Storage chambers"], correctAnswer: 1 },
        { id: 116, text: "Blood vessels carrying pure blood from the heart are called", options: ["Veins", "Capillaries", "Arteries", "Venules"], correctAnswer: 2 },
        { id: 117, text: "Exchange of oxygen and nutrients takes place in the", options: ["Arteries", "Veins", "Capillaries", "Heart"], correctAnswer: 2 },
        { id: 118, text: "The main veins carrying blood to the heart are", options: ["Pulmonary veins", "Capillaries", "Superior and inferior vena cava", "Coronary veins"], correctAnswer: 2 },
        { id: 119, text: "Respiration is the process of", options: ["Taking in CO₂ and giving out O₂", "Taking in O₂ and giving out CO₂", "Only inhalation", "Only exhalation"], correctAnswer: 1 },
        { id: 120, text: "Which of the following is NOT part of the respiratory system?", options: ["Trachea", "Bronchi", "Lungs", "Esophagus"], correctAnswer: 3 },
        { id: 121, text: "Digestion is the process by which food is converted into", options: ["Energy only", "Waste", "Simple absorbable substances", "Blood"], correctAnswer: 2 },
        { id: 122, text: "Which organ secretes bile?", options: ["Pancreas", "Liver", "Stomach", "Small intestine"], correctAnswer: 1 },
        { id: 123, text: "The main function of the excretory system is to", options: ["Digest food", "Supply oxygen", "Remove waste products", "Control muscles"], correctAnswer: 2 },
        { id: 124, text: "The kidneys are located in the", options: ["Pelvic cavity", "Thoracic cavity", "Lumbar region", "Cranial cavity"], correctAnswer: 2 },
        { id: 125, text: "The urinary bladder functions as", options: ["A filter", "A conduit", "A storage organ", "A secretory gland"], correctAnswer: 2 },
        { id: 126, text: "The tube carrying urine from kidneys to bladder is the", options: ["Urethra", "Ureter", "Nephron", "Pelvis"], correctAnswer: 1 },
        { id: 127, text: "The central nervous system consists of", options: ["Brain and nerves", "Brain and spinal cord", "Nerves and ganglia", "Brain and heart"], correctAnswer: 1 },
        { id: 128, text: "The autonomic nervous system controls", options: ["Voluntary actions", "Skeletal muscles", "Involuntary organs", "Conscious thinking"], correctAnswer: 2 },
        { id: 129, text: "Which system maintains internal balance of the body?", options: ["Digestive system", "Respiratory system", "Nervous and endocrine systems", "Circulatory system"], correctAnswer: 2 },
        { id: 130, text: "Knowledge of human body structure is essential mainly for", options: ["Sports performance", "Medical research only", "Effective first aid", "Physical training"], correctAnswer: 2 }
      ]
    }
  }
};

const STUDY_MATERIALS = [
  { id: 1, title: "The Blue Book", category: "IAF Specialized", size: "12.4 MB", type: "PDF", link: "https://drive.google.com/file/d/1YgmO1DM_w-thM4B058xvKRXccIavJvHJ/view?usp=drive_link" },
  { id: 2, title: "Virus SW-80 SOP", category: "Technical", size: "8.2 MB", type: "PDF", link: "https://drive.google.com/file/d/1d8YBkuO-LaNWhS7xohOMbLMhkQsHvQFW/view?usp=sharing" },
  { id: 3, title: "Health & Hygiene Handbook", category: "Common Subjects", size: "5.1 MB", type: "PDF", link: "https://drive.google.com/file/d/1SgbE_ZHCsWtEZBYu_rH7xSMYoyJZs5xX/view?usp=sharing" }
];

const apiKey = ""; 

// ==================================================================================
// 🛑 END OF USER CONTENT AREA
// ==================================================================================

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SUBJECTS = [
  {
    id: 'live-test',
    title: 'LIVE TEST SECTION',
    icon: 'activity',
    color: 'bg-rose-600',
    description: 'Active examination sessions and real-time assessments.',
    isLive: true,
    chapters: ["Test 1"]
  },
  {
    id: 'bluebook',
    title: 'BLUE BOOK',
    icon: 'iaf',
    color: 'bg-blue-600',
    description: 'Comprehensive guide on IAF, Aircraft, and Aviation.',
    chapters: [
      "Armed Forces & IAF Capsule", "Modes of Entry in IAF, Civil Aviation",
      "Aircraft – Types, Capabilities & Role", "Latest Trends & Acquisitions",
      "Air Campaigns", "Principle of Flight", "Forces Acting on Aircraft",
      "Airmanship", "Aviation Medicine", "Navigation",
      "Introduction to Met and Atmosphere", "Introduction and Types of Aero Engine",
      "Aircraft Controls", "Basic Flight Instruments", "Introduction to Radars",
      "Aero-modelling Capsule", "Flying/Building of Aero Models",
      "Micro Light Flying", "Simulator Flying"
    ]
  },
  {
    id: 'sop',
    title: 'SOP',
    icon: 'aircraft',
    color: 'bg-emerald-600',
    description: 'Standard Operating Procedures and Technical Specs.',
    chapters: [
      "AIRPLANE SYSTEMS DESCRIPTION", "LIMITATIONS / PROHIBITIONS / RESTRICTIONS",
      "TECHNICAL SPECIFICATIONS", "NORMAL OPERATING PROCEDURES",
      "CIRCUIT APPROACH & LANDING", "STALL & SPIN RECOVERY", "EMERGENCY PROCEDURES"
    ]
  },
  {
    id: 'health',
    title: 'HEALTH AND HYGIENE',
    icon: 'medic',
    color: 'bg-red-500',
    description: 'Physical health, First Aid, and Yoga.',
    chapters: [
      "Structure & Functioning of the Human Body", "Hygiene & Sanitation",
      "Physical & Mental Health", "Infectious & Contagious Diseases",
      "First Aid in Common Medical Emergencies", "Basics of Home Nursing",
      "Treatment and Care of Wounds", "Treatment and Care of Fractures",
      "Introduction to Yoga Exercises"
    ]
  },
  {
    id: 'b-cert',
    title: 'B-CERTIFICATE MOCK TESTS',
    icon: 'grad',
    color: 'bg-amber-500',
    description: 'COMING SOON',
    chapters: [
      "Full Mock Test 01", "Full Mock Test 02", "Sectional: Specialized", "Sectional: Common", "Previous Year 2023"
    ]
  },
  {
    id: 'c-cert',
    title: 'C-CERTIFICATE MOCK TESTS',
    icon: 'grad',
    color: 'bg-indigo-600',
    description: 'COMING SOON',
    chapters: [
      "Full Mock Test 01", "Full Mock Test 02", "Full Mock Test 03", "Sectional: Advanced Tech", "Previous Year 2024"
    ]
  }
];

const getQuestions = (subjectId, chapterIndex, setIndex) => {
  const subjectData = questionDatabase[subjectId];
  if (subjectData && subjectData[chapterIndex] && subjectData[chapterIndex][setIndex]) {
    const rawQuestions = subjectData[chapterIndex][setIndex];
    const shuffledQuestions = shuffleArray(rawQuestions);

    return shuffledQuestions.map(q => {
      const originalCorrectOptionText = q.options[q.correctAnswer];
      const shuffledOptions = shuffleArray(q.options);
      const newCorrectAnswerIndex = shuffledOptions.indexOf(originalCorrectOptionText);

      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswerIndex
      };
    });
  }
  return [];
};

const Header = ({ goHome }) => (
  <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-4 cursor-pointer" onClick={goHome}>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none mb-1 text-[#003153]">
            <span className="text-[#BF0A30]">AIVSC</span> PREP PORTAL
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Developed By Flt Cdt Rishabh Raja</p>
        </div>
      </div>
    </div>
  </header>
);

const SubjectIcon = ({ type, size = 24, className = "" }) => {
  if (type === 'iaf') return <Shield size={size} className={className} />;
  if (type === 'aircraft') return <Plane size={size} className={className} />;
  if (type === 'medic') return <Cross size={size} className={className} />;
  if (type === 'grad') return <GraduationCap size={size} className={className} />;
  if (type === 'activity') return <Activity size={size} className={className} />;
  return <FileText size={size} className={className} />;
};

const FloatingAIChat = ({ isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Jai Hind! I am your AI study assistant. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  if (!isVisible) return null;

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const msg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setIsTyping(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: msg }] }] })
      });
      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to service." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-[#003153] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-sky-400" />
              <p className="font-bold text-sm">AIVSC Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#003153] text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-white border-t flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none" placeholder="Ask a doubt..." />
            <button onClick={handleSend} className="bg-[#003153] text-white p-2 rounded-full hover:bg-slate-800 transition-colors"><Send size={18} /></button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="p-4 rounded-full bg-[#003153] text-white shadow-2xl hover:scale-105 transition-all">
        {isOpen ? <Minimize2 size={24} /> : <Bot size={24} />}
      </button>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(null);
  const [selectedSetIdx, setSelectedSetIdx] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const goHome = () => {
    setView('home');
    setSelectedSubject(null);
    setSelectedChapterIdx(null);
    setUserAnswers({});
  };

  const startTest = (setIdx) => {
    const qList = getQuestions(selectedSubject.id, selectedChapterIdx, setIdx);
    if (qList.length === 0) {
      alert("This practice set is not yet available.");
      return;
    }
    setSelectedSetIdx(setIdx);
    setQuestions(qList);
    setUserAnswers({});
    setView('test');
    window.scrollTo(0, 0);
  };

  const handleAnswerSelection = (questionId, optionIndex) => {
    if (userAnswers[questionId] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    questions.forEach(q => {
      if (userAnswers[q.id] === undefined) {
        skipped++;
      } else if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const accuracy = (correct + wrong) > 0 ? ((correct / (correct + wrong)) * 100).toFixed(1) : 0;
    return { correct, wrong, skipped, accuracy };
  };

  return (
    <div className="min-h-screen relative font-sans pb-20 overflow-x-hidden bg-blue-50/50">
      <style>{`
        @keyframes pulse-red {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        .animate-pulse-red {
          animation: pulse-red 1.5s infinite ease-in-out;
        }
      `}</style>

      <div className="fixed inset-0 z-0 flex pointer-events-none">
        <div className="h-full w-1/3 bg-[#BF0A30]/5"></div>
        <div className="h-full w-1/3 bg-[#003153]/5"></div>
        <div className="h-full w-1/3 bg-[#87CEEB]/5"></div>
      </div>
      
      <Header goHome={goHome} />
      
      <main className="relative z-10 max-w-6xl mx-auto p-4 md:p-6">
        {view === 'home' && (
          <div className="animate-in fade-in duration-500 mt-10">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 bg-[#003153] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Unity and Discipline</div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003153] mb-4">"By a Cadet, for the Cadets"</h2>
              <p className="text-slate-600 max-w-lg mx-auto font-medium">Standardized preparation portal for the All India Vayu Sainik Camp.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {SUBJECTS.map(subj => (
                <div 
                  key={subj.id} 
                  onClick={() => { setSelectedSubject(subj); setView('subject'); }}
                  className={`bg-white p-8 rounded-3xl border ${subj.isLive ? 'border-rose-200' : 'border-slate-100'} shadow-sm cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden`}
                >
                  {subj.isLive && (
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                       <span className="w-3 h-3 bg-rose-600 rounded-full animate-pulse-red shadow-[0_0_10px_rgba(225,29,72,0.8)]"></span>
                       <span className="text-[10px] font-black text-rose-600 uppercase tracking-tighter">LIVE NOW</span>
                    </div>
                  )}
                  <div className={`${subj.color} w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <SubjectIcon type={subj.icon} size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">{subj.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">{subj.description}</p>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{subj.chapters.length} Modules</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            <div 
              onClick={() => setView('library')}
              className="bg-[#003153] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden cursor-pointer group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <FolderOpen size={160} className="text-white" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-black text-white mb-2">Study Material Library</h3>
                  <p className="text-blue-100/70 font-medium max-w-md">Access specialized handouts, SOPs, and manuals for your technical preparation.</p>
                </div>
                <div className="bg-white text-[#003153] px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-blue-50 transition-colors">
                  <Download size={20} />
                  EXPLORE LIBRARY
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'library' && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <button onClick={goHome} className="mb-6 flex items-center text-[#003153] font-bold hover:translate-x-1 transition-transform">
              <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
            </button>
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#003153] p-5 rounded-2xl text-white shadow-xl">
                <FolderOpen size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#003153]">Study Materials</h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Digital Repository</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STUDY_MATERIALS.map((file) => (
                <div key={file.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <FileText size={24} />
                    </div>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {file.type}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-800 mb-1">{file.title}</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">{file.category}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-400">{file.size}</span>
                    <button 
                      onClick={() => {
                        if (file.link) {
                          window.open(file.link, '_blank');
                        } else {
                          alert(`Initiating secure download for ${file.title}...`);
                        }
                      }}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-700 transition-colors"
                    >
                      <Download size={14} />
                      {file.link ? 'OPEN LINK' : 'DOWNLOAD'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'subject' && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <button onClick={goHome} className="mb-6 flex items-center text-[#003153] font-bold hover:translate-x-1 transition-transform">
              <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
            </button>
            <div className="flex items-center gap-4 mb-10">
              <div className={`${selectedSubject.color} p-5 rounded-2xl text-white shadow-xl`}>
                <SubjectIcon type={selectedSubject.icon} size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#003153]">{selectedSubject.title}</h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{selectedSubject.isLive ? 'Active Sessions' : `${selectedSubject.chapters.length} Lessons Available`}</p>
              </div>
            </div>
            
            {selectedSubject.id === 'live-test' ? (
              <div className="grid gap-6">
                <div className="bg-white p-10 rounded-[2.5rem] border-2 border-rose-100 shadow-xl flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-600 mb-6">
                    <Target size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Test 1 - Comprehensive Evaluation</h3>
                  <p className="text-slate-500 max-w-md mb-8">This is a timed assessment. Ensure you have a stable connection and are in a quiet environment before starting.</p>
                  <button 
                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSf_5wZ7bnvDDZTu4NoyLulpI7ayJoNSiVv8X1onsGoh8Kj_kA/viewform', '_blank')}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-12 py-5 rounded-2xl font-black flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-rose-200"
                  >
                    START TEST 1
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {selectedSubject.chapters.map((ch, i) => {
                  const isLocked = !questionDatabase[selectedSubject.id]?.[i];
                  return (
                    <div 
                      key={i} 
                      onClick={() => !isLocked && (setSelectedChapterIdx(i), setView('chapter'))}
                      className={`p-6 rounded-2xl border-2 flex justify-between items-center transition-all
                        ${isLocked ? 'bg-slate-50 opacity-50 cursor-not-allowed border-slate-100' : 'bg-white cursor-pointer border-white hover:border-blue-500 hover:shadow-lg'}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${isLocked ? 'bg-slate-200 text-slate-400' : 'bg-blue-100 text-blue-600'}`}>{i+1}</span>
                        <p className="font-bold text-slate-800">{ch}</p>
                      </div>
                      {isLocked ? <Lock size={18} className="text-slate-300" /> : <ChevronRight size={18} className="text-blue-300" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {view === 'chapter' && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <button onClick={() => setView('subject')} className="mb-6 flex items-center text-[#003153] font-bold">
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
            <div className="mb-10">
              <h2 className="text-2xl font-black text-[#003153] mb-2">{selectedSubject.chapters[selectedChapterIdx]}</h2>
              <div className="w-20 h-1.5 bg-blue-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((s, idx) => {
                const isLocked = !questionDatabase[selectedSubject.id]?.[selectedChapterIdx]?.[idx];
                return (
                  <div 
                    key={idx} 
                    onClick={() => !isLocked && startTest(idx)}
                    className={`p-8 rounded-3xl border-2 text-center transition-all relative group
                      ${isLocked ? 'bg-slate-50 opacity-50 cursor-not-allowed border-slate-100' : 'bg-white cursor-pointer border-white hover:border-blue-600 shadow-md hover:shadow-2xl'}`}
                  >
                    {isLocked && <Lock className="absolute top-4 right-4 text-slate-300" size={16} />}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <BarChart2 size={24} />
                    </div>
                    <h4 className="font-black text-slate-800">Practice Set {s}</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase mt-2 tracking-widest">30 Questions</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'test' && (
          <div className="max-w-3xl mx-auto pb-32 animate-in fade-in duration-300">
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-blue-100 mb-8 sticky top-20 z-40 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Ongoing Test</p>
                <h3 className="font-black text-[#003153]">Set {selectedSetIdx+1}</h3>
              </div>
              <button onClick={() => setView('result')} className="bg-[#BF0A30] text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">Submit Mission</button>
            </div>
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const selectedOption = userAnswers[q.id];
                const isCorrect = selectedOption === q.correctAnswer;
                const isResponded = selectedOption !== undefined;

                return (
                  <div key={q.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex gap-4 mb-6">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center font-black text-blue-600 text-xs">Q{idx+1}</span>
                      <p className="font-bold text-slate-800 leading-relaxed">{q.text}</p>
                    </div>
                    <div className="grid gap-3 ml-12">
                      {q.options.map((opt, oi) => {
                        const isCurrentSelection = selectedOption === oi;
                        const isThisCorrectOption = q.correctAnswer === oi;
                        
                        let btnStyle = "border-slate-100 hover:border-blue-600 hover:bg-blue-50";
                        if (isResponded) {
                          if (isThisCorrectOption) btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900";
                          else if (isCurrentSelection) btnStyle = "border-red-500 bg-red-50 text-red-900";
                          else btnStyle = "border-slate-50 opacity-40";
                        }

                        return (
                          <button 
                            key={oi} 
                            disabled={isResponded}
                            onClick={() => handleAnswerSelection(q.id, oi)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm font-bold flex items-center gap-3 ${btnStyle}`}
                          >
                            <span className={`w-6 h-6 rounded-md border flex items-center justify-center text-[10px] ${isResponded && isThisCorrectOption ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
                              {String.fromCharCode(65 + oi)}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isResponded && !isCorrect && (
                      <div className="mt-4 ml-12 p-3 bg-blue-50 rounded-lg text-blue-700 text-xs font-bold flex items-center gap-2">
                        <AlertCircle size={14} /> Correct: {q.options[q.correctAnswer]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'result' && (
          <div className="animate-in zoom-in-95 duration-500 max-w-2xl mx-auto text-center py-20">
            {(() => {
              const { correct, wrong, skipped, accuracy } = calculateResults();
              return (
                <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                  <div className="bg-blue-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600">
                    <Award size={48} />
                  </div>
                  <h2 className="text-4xl font-black text-[#003153] mb-4">Debrief Complete</h2>
                  <p className="text-slate-500 mb-10 font-medium">Excellent work, Cadet. Review your metrics below.</p>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                      <p className="text-3xl font-black text-emerald-600">{correct}</p>
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Correct</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                      <p className="text-3xl font-black text-red-600">{wrong}</p>
                      <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-1">Wrong</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-3xl font-black text-slate-600">{skipped}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Skipped</p>
                    </div>
                    <div className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-200">
                      <p className="text-3xl font-black text-white">{accuracy}%</p>
                      <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1">Accuracy</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={goHome} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Dashboard</button>
                    <button onClick={() => setView('test')} className="flex-1 bg-[#003153] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Re-Attempt</button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </main>

      <FloatingAIChat isVisible={view !== 'test'} />
    </div>
  );
}
