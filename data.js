/* ============================================================
   PORTFOLIO DATA — this is the only file you need to edit.
   Everything on the site is rendered from this object.
   XP / level / attribute bars are COMPUTED from the data below,
   so you never have to keep two numbers in sync.

   Anything marked  // EDIT  is a placeholder — replace it.
   ============================================================ */

const DATA = {

  /* ---------- Character ---------- */
  player: {
    name: "Mir Salman Nomaan",
    handle: "MISAN0",
    class: "ICT Student",
    subclass: "Cyber Security & Computer Science",
    location: "Hobart, Tasmania",
    avatar: "photo.jpg",
    status: "Open to graduate, ICT support and help desk roles",
    // one-liner under the name
    tagline: "A computer enthusiast on the road to mastery — levelling up through cyber security, networking, and AI, one lab at a time.",
    links: {
      github: "https://github.com/MISAN0",
      linkedin: "https://linkedin.com/in/nomaan00"
    }
  },

  /* ---------- Attributes (0–10) — drives the radar chart ----------
     key   = short label on the radar (keep to 5 characters or fewer)
     label = full name shown in the list
     desc  = what the score actually covers, so nobody has to guess     */
  attributes: [
    { key: "CYBER", label: "Cyber Security", value: 8,
      desc: "Network defence, API security, ethical hacking, incident response, digital forensics" },
    { key: "NET",   label: "Networking", value: 7,
      desc: "TCP/IP, routing and switching, subnetting and VLSM, LAN/WAN configuration — CCNA in progress" },
    { key: "PROG",  label: "Programming", value: 7,
      desc: "Python, C, Java, C# and Bash — data structures, algorithms, automated testing" },
    { key: "AI",    label: "AI & Machine Learning", value: 7,
      desc: "Neural networks, deep learning, natural language processing, reinforcement learning" },
    { key: "DATA",  label: "Data Engineering", value: 7,
      desc: "SQL, Pandas, PySpark and Hadoop — wrangling, statistics, visualisation at scale" },
    { key: "SYS",   label: "Systems & Servers", value: 8,
      desc: "Linux administration, operating system internals, server hardening, cloud fundamentals" },
    { key: "COMM",  label: "Communication", value: 8,
      desc: "Technical writing, documentation, teamwork, and client-facing project work" }
  ],

  /* ---------- Active quests ----------
     status:     active | queued | paused | done
     rank:       S / A / B / C — how demanding the quest is
     reward:     XP added to the running total once it is finished
     objectives: the checkpoints inside the quest; progress is calculated
                 from these, so tick one and the bar moves on its own
     Deliberately kept general — no live coursework or client work here.  */
  quests: [
    {
      title: "CCNA 200-301",
      role: "Cisco certification",
      rank: "A",
      reward: 400,
      blurb: "Two hours a day: lecture, Packet Tracer lab, Anki review, practice questions. Every hour of video is matched by an hour of hands-on configuration.",
      tags: ["Cisco", "Networking", "Packet Tracer", "Subnetting"],
      status: "active",
      due: "Oct 2026",
      next: "Section 5 — TCP/UDP and the transport layer",
      objectives: [
        { label: "Subnet any prefix in under 60 seconds", done: true },
        { label: "Network fundamentals and switching", done: false },
        { label: "VLANs, trunking and spanning tree", done: false },
        { label: "OSPFv2 configured and troubleshot from scratch", done: false },
        { label: "Practice exams at 85% twice running", done: false }
      ]
    },
    {
      title: "This Portfolio",
      role: "Personal project",
      rank: "B",
      reward: 150,
      blurb: "The site you are reading. Static HTML, CSS and JavaScript with no build step and no framework — every panel renders from a single data file.",
      tags: ["JavaScript", "CSS", "SVG", "Design"],
      status: "active",
      due: "Ongoing",
      next: "Refine each section, then keep it current",
      objectives: [
        { label: "Data-driven rebuild — one file drives the site", done: true },
        { label: "Live on a custom domain", done: true },
        { label: "Plain CV view for recruiters", done: true },
        { label: "Refine every section", done: false }
      ]
    },
    {
      title: "CompTIA Security+ SY0-701",
      role: "Cyber security certification",
      rank: "A",
      reward: 400,
      blurb: "Phase two of the certification plan, starting once the CCNA is passed. Scenario-driven rather than lab-driven: threats, architecture, operations, and governance.",
      tags: ["CompTIA", "Cyber Security", "Incident Response"],
      status: "queued",
      due: "Dec 2026",
      next: "Unlocks when the CCNA is passed",
      objectives: [
        { label: "General security concepts", done: false },
        { label: "Threats, vulnerabilities and mitigations", done: false },
        { label: "Security architecture and operations", done: false },
        { label: "Practice exams at 80% twice running", done: false }
      ]
    }
  ],

  /* ---------- Goals: the longer arc, with checkpoints ---------- */
  goals: [
    {
      title: "Graduate — Bachelor of ICT",
      detail: "Computer Science & Cyber Security double major, University of Tasmania. 262.5 of 300 credit points cleared.",
      target: "Dec 2026",
      steps: [
        { label: "21 units passed", done: true },
        { label: "KIT307 Graphics", done: false },
        { label: "KIT300 Capstone (25pt)", done: false }
      ]
    },
    {
      title: "CCNA, then Security+",
      detail: "Cisco CCNA 200-301 first, CompTIA Security+ SY0-701 second. Six-month plan, active learning only — every hour of video is matched by an hour of lab.",
      target: "Oct & Dec 2026",
      steps: [
        { label: "Subnetting under 60s, any prefix", done: true },
        { label: "Domains 1+2 practice test 75%+", done: false },
        { label: "OSPFv2 from scratch in under 15 min", done: false },
        { label: "Boson 85%+ twice → CCNA passed", done: false },
        { label: "Security+ SY0-701 passed", done: false }
      ]
    },
    {
      title: "Graduate role in ICT",
      detail: "Open across ICT, cyber security, computer science, networking, and AI. Australia-based, and happy to start on a service desk — the fastest way into the industry is through the door.",
      target: "2026 / 2027",
      steps: [
        { label: "Portfolio live", done: true },
        { label: "Applications out", done: false },
        { label: "First IT role — service desk or support", done: false },
        { label: "Offer signed", done: false }
      ]
    }
  ],

  /* ---------- Skill tree ----------
     tier 1 = foundation, 3 = advanced. level 0–5.
     level 0 renders as a locked node (a "next unlock").           */
  skills: [
    { name: "Python",             branch: "Code",     tier: 1, level: 5 },
    { name: "C",                  branch: "Code",     tier: 1, level: 4 },  // KIT205/KIT107
    { name: "Java",               branch: "Code",     tier: 1, level: 3 },
    { name: "Bash / Shell",       branch: "Code",     tier: 2, level: 4 },  // KIT213 scripting
    { name: "C# / Unity",         branch: "Code",     tier: 2, level: 3 },  // KIT109/KIT208
    { name: "Git / GitHub",       branch: "Code",     tier: 2, level: 4 },
    { name: "pytest",             branch: "Code",     tier: 2, level: 3 },
    { name: "Docker",             branch: "Code",     tier: 3, level: 2 },

    { name: "REST APIs",          branch: "Web",      tier: 1, level: 4 },
    { name: "HTTP / JSON",        branch: "Web",      tier: 1, level: 4 },
    { name: "Node.js / Express",  branch: "Web",      tier: 2, level: 4 },  // KIT214
    { name: "FastAPI",            branch: "Web",      tier: 2, level: 4 },
    { name: "PHP / MySQL",        branch: "Web",      tier: 2, level: 3 },  // KIT202
    { name: "SQL",                branch: "Web",      tier: 1, level: 4 },
    { name: "Authentication",     branch: "Web",      tier: 2, level: 4 },
    { name: "Input Validation",   branch: "Web",      tier: 2, level: 3 },
    { name: "Web Scraping",       branch: "Web",      tier: 3, level: 3 },  // cheerio + node-fetch
    { name: "Firebase",           branch: "Web",      tier: 3, level: 2 },

    { name: "Network Security",   branch: "Cyber Security", tier: 1, level: 4 },
    { name: "API Security",       branch: "Cyber Security", tier: 2, level: 4 },
    { name: "OWASP API Top 10",   branch: "Cyber Security", tier: 2, level: 3 },
    { name: "Threat Modelling",   branch: "Cyber Security", tier: 2, level: 3 },  // unlocked — KIT304 risk analysis
    { name: "TLS / Certificates", branch: "Cyber Security", tier: 2, level: 3 },
    { name: "Cryptography",       branch: "Cyber Security", tier: 2, level: 3 },  // hashing, one-way functions
    { name: "Incident Response",  branch: "Cyber Security", tier: 3, level: 3 },  // ACSC IR plan, KIT325
    { name: "MITM Analysis",      branch: "Cyber Security", tier: 3, level: 3 },
    { name: "eForensics",         branch: "Cyber Security", tier: 3, level: 3 },
    { name: "Ethical Hacking",    branch: "Cyber Security", tier: 3, level: 3 },
    { name: "Cloud Security",     branch: "Cyber Security", tier: 3, level: 0 },  // locked = next unlock

    { name: "TCP/IP",             branch: "Systems",  tier: 1, level: 4 },
    { name: "Linux / Kali",       branch: "Systems",  tier: 1, level: 4 },
    { name: "OS Internals",       branch: "Systems",  tier: 2, level: 4 },
    { name: "Subnetting / VLSM",  branch: "Systems",  tier: 2, level: 4 },  // CCNA drill
    { name: "LAN / WAN Config",   branch: "Systems",  tier: 2, level: 3 },
    { name: "Server Admin",       branch: "Systems",  tier: 3, level: 3 },  // KIT304 DN
    { name: "Cisco IOS",          branch: "Systems",  tier: 3, level: 2 },  // CCNA in progress
    { name: "OSPF / Routing",     branch: "Systems",  tier: 3, level: 0 },  // locked — CCNA month 2

    { name: "Pandas",             branch: "AI & Data", tier: 1, level: 4 },
    { name: "scikit-learn",       branch: "AI & Data", tier: 1, level: 4 },
    { name: "Statistics",         branch: "AI & Data", tier: 1, level: 3 },  // ANOVA, chi-square
    { name: "TensorFlow / Keras", branch: "AI & Data", tier: 2, level: 4 },
    { name: "CNN / LSTM",         branch: "AI & Data", tier: 2, level: 4 },
    { name: "PyTorch",            branch: "AI & Data", tier: 2, level: 3 },
    { name: "NLP",                branch: "AI & Data", tier: 2, level: 3 },
    { name: "Visualisation",      branch: "AI & Data", tier: 2, level: 3 },
    { name: "GANs / VAEs",        branch: "AI & Data", tier: 3, level: 3 },
    { name: "Reinforcement Lrn",  branch: "AI & Data", tier: 3, level: 3 },  // DQN, tf_agents, gym
    { name: "XGBoost",            branch: "AI & Data", tier: 3, level: 2 },
    { name: "OpenCV",             branch: "AI & Data", tier: 3, level: 2 },

    { name: "PySpark",            branch: "Big Data", tier: 2, level: 3 },
    { name: "Hadoop / MapReduce", branch: "Big Data", tier: 2, level: 3 },
    { name: "Spark MLlib",        branch: "Big Data", tier: 3, level: 3 },
    { name: "Kafka",              branch: "Big Data", tier: 3, level: 0 },  // locked = next unlock

    { name: "Technical Writing",  branch: "Process",  tier: 1, level: 4 },
    { name: "Agile / Scrum",      branch: "Process",  tier: 1, level: 4 },
    { name: "Research & Analysis",branch: "Process",  tier: 1, level: 4 },
    { name: "UML Modelling",      branch: "Process",  tier: 2, level: 3 },
    { name: "UX Evaluation",      branch: "Process",  tier: 2, level: 3 },
    { name: "PRINCE2",            branch: "Process",  tier: 2, level: 3 },
    { name: "SFIA Framework",     branch: "Process",  tier: 3, level: 3 }
  ],

  /* ---------- Artifacts (projects). rarity: legendary | epic | rare | common ---------- */
  artifacts: [
    {
      name: "API Exposure Auditor",
      rarity: "legendary",
      type: "Cyber Security Tool",
      blurb: "Python tool that audits API endpoints for security misconfigurations — exposed OpenAPI/Swagger documentation, weak headers, CORS issues — and emits structured JSON reports for triage. Grounded in my own research on information disclosure from publicly exposed API specifications, framed against the OWASP API Security Top 10 and CWE-200.",
      stats: ["Python", "REST APIs", "OpenAPI", "OWASP", "CWE-200"],
      link: "https://github.com/MISAN0"
    },
    {
      name: "Hardened Node.js API Server",
      rarity: "epic",
      type: "Backend",
      blurb: "Express API served over HTTPS with its own TLS certificates, hardened with Helmet, CORS policy, and request logging. Paired with a Cheerio scraper that pulls and normalises showcase data into JSON.",
      stats: ["Node.js", "Express", "Helmet", "TLS", "Cheerio"],
      link: ""
    },
    {
      name: "Spam Detection Classifier",
      rarity: "epic",
      type: "Deep Learning",
      blurb: "TensorFlow/Keras text classifier on an imbalanced spam dataset. Class weighting, ROC and precision-recall curves, confusion matrices, and fixed seeds so results reproduce run to run.",
      stats: ["TensorFlow", "Keras", "NLP", "scikit-learn"],
      link: ""
    },
    {
      name: "Distributed Data Pipelines",
      rarity: "epic",
      type: "Big Data",
      blurb: "PySpark pipelines over multi-table flight and weather data — SparkSession configuration, VectorAssembler feature pipelines, MLlib classifiers, and MapReduce fundamentals on Hadoop.",
      stats: ["PySpark", "Hadoop", "MapReduce", "MLlib"],
      link: ""
    },
    {
      name: "Graph Pathfinding Engine",
      rarity: "rare",
      type: "Algorithms",
      blurb: "Dijkstra and A* implemented from scratch in C over a custom graph structure, with a heuristic function and closed-set tracking. Built alongside BSTs, hash tables, and priority queues.",
      stats: ["C", "Dijkstra", "A*", "Data Structures"],
      link: ""
    },
    {
      name: "UNIX Records Manager",
      rarity: "rare",
      type: "Systems",
      blurb: "POSIX shell toolset for employee record management — menu-driven search, add, and delete, plus log rotation and a user access-deny list. Written for portability across shells.",
      stats: ["Bash", "POSIX", "Linux", "Access Control"],
      link: ""
    },
    {
      name: "Game AI & Pathfinding",
      rarity: "rare",
      type: "Game Dev",
      blurb: "Unity game with hand-written AI: A* navigation over a generated node graph, seek and wander steering behaviours, and path-following agents. Shipped with a build and development log.",
      stats: ["C#", "Unity", "A*", "Steering AI"],
      link: ""
    },
    {
      name: "Network Risk Assessment",
      rarity: "rare",
      type: "Analysis",
      blurb: "Analysed network configurations in a simulated environment, identified vulnerabilities, and wrote mitigation recommendations.",
      stats: ["TCP/IP", "Risk Analysis", "LAN/WAN"],
      link: ""
    }
  ],

  /* ---------- Codex: every unit, straight off the faculty record ----------
     mark = the actual mark, and the mark IS the XP for that unit.
     grade: HD / DN / CR / PP, or IP for currently enrolled.
     pts = credit points (KIT300 is a 25pt double unit).                      */
  codex: [
    { code: "KIT101", name: "Programming Fundamentals",             grade: "CR", mark: 60, year: 2023, sem: 1, pts: 12.5 },
    { code: "KIT105", name: "ICT Professional Practices",           grade: "HD", mark: 83, year: 2023, sem: 1, pts: 12.5 },
    { code: "KIT111", name: "Data Networks & Security",             grade: "DN", mark: 76, year: 2023, sem: 1, pts: 12.5 },
    { code: "KIT118", name: "Cybersecurity Policies & Practices",   grade: "HD", mark: 80, year: 2023, sem: 1, pts: 12.5 },
    { code: "KIT102", name: "Introduction to Data Science",         grade: "HD", mark: 85, year: 2023, sem: 2, pts: 12.5 },
    { code: "KIT103", name: "Computational Science",                grade: "PP", mark: 57, year: 2023, sem: 2, pts: 12.5 },
    { code: "KIT107", name: "Programming",                          grade: "PP", mark: 55, year: 2023, sem: 2, pts: 12.5 },
    { code: "KMA153", name: "Data Handling & Statistics 1",         grade: "DN", mark: 75, year: 2023, sem: 2, pts: 12.5 },

    { code: "KIT202", name: "Web Programming Fundamentals",         grade: "DN", mark: 72, year: 2024, sem: 1, pts: 12.5 },
    { code: "KIT203", name: "ICT Project Management & Modelling",   grade: "DN", mark: 72, year: 2024, sem: 1, pts: 12.5 },
    { code: "KIT208", name: "Virtual & Mixed Reality Technology",   grade: "DN", mark: 71, year: 2024, sem: 2, pts: 12.5 },
    { code: "KIT213", name: "Operating Systems",                    grade: "HD", mark: 91, year: 2024, sem: 2, pts: 12.5 },
    { code: "KIT215", name: "Cybersecurity & Ethical Hacking",      grade: "CR", mark: 66, year: 2024, sem: 2, pts: 12.5 },
    { code: "KIT219", name: "Development Methodologies & UX",       grade: "CR", mark: 64, year: 2024, sem: 2, pts: 12.5 },

    { code: "KIT205", name: "Data Structures & Algorithms",         grade: "PP", mark: 56, year: 2025, sem: 1, pts: 12.5 },
    { code: "KIT305", name: "Mobile Application Development",       grade: "CR", mark: 62, year: 2025, sem: 1, pts: 12.5 },
    { code: "KIT214", name: "Intelligent & Secure Web Development", grade: "HD", mark: 80, year: 2025, sem: 2, pts: 12.5 },
    { code: "KIT315", name: "Machine Learning & Applications",      grade: "DN", mark: 72, year: 2025, sem: 2, pts: 12.5 },
    { code: "KIT325", name: "Advanced Cybersecurity & eForensics",  grade: "DN", mark: 79, year: 2025, sem: 2, pts: 12.5 },

    { code: "KIT304", name: "Server Administration & Security Assurance", grade: "DN", mark: 74, year: 2026, sem: 1, pts: 12.5 },
    { code: "KIT318", name: "Big Data & Cloud Computing",           grade: "DN", mark: 73, year: 2026, sem: 1, pts: 12.5 },

    { code: "KIT300", name: "ICT Project (Capstone)",               grade: "IP", year: 2026, sem: 2, pts: 25   },
    { code: "KIT307", name: "Computer Graphics & Animation",        grade: "IP", year: 2026, sem: 2, pts: 12.5 }
  ],

  /* ---------- Academic record: shown as HUD chips ---------- */
  academic: {
    gpa: 5.04,
    gpaScale: 7,
    coursePoints: 300,      // total credit points in the degree
    gpaDate: "24 Jun 2026",
    graduating: "Dec 2026",
    degreeName: "Bachelor of ICT"
  },

  /* ---------- Campaign log: experience + education ---------- */
  campaign: [
    {
      title: "Security Officer",
      org: "Kevlar Security · Hobart City Security",
      period: "2023 – Present",
      kind: "work",
      lines: [
        "Maintained situational awareness and followed strict operational protocols in high-responsibility environments",
        "Responded to incidents quickly and ensured safety compliance across multiple sites",
        "Built the attention to detail and risk instinct that carries into secure systems work"
      ]
    },
    {
      title: "Retail Team Member",
      org: "Coles Supermarket · Hobart",
      period: "Oct 2023 – Present",
      kind: "work",
      lines: [
        "Delivered customer service in a high-volume environment with fast issue resolution",
        "Worked collaboratively to maintain operations, stock accuracy, and store organisation",
        "Sharpened communication and problem-solving under time pressure"
      ]
    },
    {
      title: "Bachelor of Information and Communication Technology",
      org: "University of Tasmania · Hobart",
      period: "2023 – Dec 2026",
      kind: "edu",
      lines: [
        "Double major: Computer Science and Cyber Security · GPA 5.04 / 7",
        "High Distinctions in Operating Systems (91), Data Science (85), Professional Practices (83), Secure Web Development (80), and Cybersecurity Policies & Practices (80)",
        "262.5 of 300 credit points completed — capstone and graphics remaining"
      ]
    }
  ],

  /* ---------- Achievements: unlocked = true shows lit ---------- */
  achievements: [
    { icon: "★", name: "Distinction Streak",  desc: "5 High Distinctions earned",              unlocked: true },
    { icon: "⚔", name: "Dual Wield",          desc: "Full-time study alongside two jobs",      unlocked: true },
    { icon: "🛡", name: "Blue Team",           desc: "Security operations experience on site",  unlocked: true },
    { icon: "🧪", name: "Model Builder",       desc: "Shipped ML models on real datasets",      unlocked: true },
    { icon: "🎓", name: "Graduate",            desc: "Finish the degree",                       unlocked: false },
    { icon: "🌐", name: "Packet Pusher",        desc: "Pass CCNA 200-301",                       unlocked: false },
    { icon: "📜", name: "Certified",           desc: "Pass CompTIA Security+ SY0-701",          unlocked: false },
    { icon: "💼", name: "First Role",          desc: "Land a graduate position in security",    unlocked: false }
  ]
};

/* Fallback XP if a unit has no mark recorded. A unit's mark is its XP. */
const GRADE_XP = { HD: 85, DN: 75, CR: 63, PP: 55, IP: 0 };
