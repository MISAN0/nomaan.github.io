/* ============================================================
   PORTFOLIO DATA — this is the only file you need to edit.
   Everything on the site is rendered from this object.
   XP / level / attribute bars are COMPUTED from the data below,
   so you never have to keep two numbers in sync.

   Anything marked  // EDIT  is a placeholder — replace it.
   ============================================================ */

const DATA = {

  /* ---------- Site meta ----------
     Bump `updated` whenever you change anything real on this page.
     It is deliberately manual: a build date would claim the content is
     current when only the code changed.                                */
  meta: {
    updated: "14 August 2026"   // EDIT when you update the site
  },

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
      blurb: "Routing and switching on Cisco IOS: VLANs and trunking, spanning tree, OSPF, IPv4 and IPv6 addressing, NAT and DHCP, access control lists, and device hardening — configured and troubleshot in the CLI, not just read about.",
      tags: ["Cisco IOS", "Routing & Switching", "OSPF", "Subnetting"],
      status: "active",
      due: "Oct 2026",
      next: "Section 5 — TCP/UDP and the transport layer",
      objectives: [
        { label: "Subnet any prefix in under 60 seconds", done: true },
        { label: "Network fundamentals and switching", done: true },
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
      blurb: "The vendor-neutral security baseline: threat actors and attack types, cryptography and PKI, identity and access management, secure network and cloud architecture, incident response, digital forensics, and risk and compliance frameworks.",
      tags: ["Threat Analysis", "Cryptography", "IAM", "Incident Response"],
      status: "active",
      due: "Dec 2026",
      next: "Threats, vulnerabilities and mitigations",
      objectives: [
        { label: "General security concepts", done: true },
        { label: "Threats, vulnerabilities and mitigations", done: true },
        { label: "Security architecture and operations", done: false },
        { label: "Practice exams at 80% twice running", done: false }
      ]
    }
  ],

  /* ---------- Objectives: the long arc ----------
     These are OUTCOMES, not tasks. Day-to-day milestones belong in
     `quests` above — anything appearing in both places is duplication.
     horizon: short phrase placing the goal in time, shown as a badge.
     why:     one line on why the goal is worth having.                 */
  goals: [
    {
      title: "Finish the degree",
      horizon: "In progress",
      target: "Dec 2026",
      detail: "Bachelor of Information and Communication Technology at the University of Tasmania, double major in Computer Science and Cyber Security. 262.5 of 300 credit points cleared at a GPA of 5.04.",
      why: "The foundation everything else is built on.",
      steps: [
        { label: "21 units passed", done: true },
        { label: "Final two units, including the capstone", done: false },
        { label: "Graduate", done: false }
      ]
    },
    {
      title: "Get certified",
      horizon: "In progress",
      target: "Oct & Dec 2026",
      detail: "Networking first, then security. Vendor certifications that stand on their own in front of an employer, independent of the degree.",
      why: "A degree shows I can learn. A certification shows I can do the work.",
      steps: [
        { label: "CCNA 200-301", done: false },
        { label: "CompTIA Security+ SY0-701", done: false },
        { label: "CySA+ or a cloud security certification", done: false }
      ]
    },
    {
      title: "First role in ICT",
      horizon: "Next",
      target: "2026 / 2027",
      detail: "Service desk, technical support, or a junior role anywhere across ICT, cyber security, networking, or AI. Australia-based, and ready to start at the bottom of a good team.",
      why: "The fastest way into the industry is through the door. Specialisation comes after.",
      steps: [
        { label: "Portfolio live", done: true },
        { label: "CV ready and applications out", done: false },
        { label: "First ICT role", done: false }
      ]
    },
    {
      title: "Grow into security engineering",
      horizon: "Longer term",
      target: "2028 onward",
      detail: "Move from support into security or network operations — SOC analysis, network security, or infrastructure engineering — and keep stacking certifications on top of real experience.",
      why: "Where the two majors actually meet.",
      steps: [
        { label: "Operations experience in a SOC or network team", done: false },
        { label: "CCNP Security or CySA+", done: false },
        { label: "Specialise", done: false }
      ]
    }
  ],

  /* ---------- Skill tree ----------
     level: 1 Aware · 2 Familiar · 3 Working · 4 Confident · 5 Strong
            0 renders as a locked node — the next thing being unlocked.
     evidence: where the skill came from. A unit code, a certification,
            or a project. This is the citation behind the rating, and it
            is what stops the tree being a list of unbacked claims.
     Branch names mirror the attributes on the character sheet, so the
     radar and the tree tell the same story.                            */
  skills: [
    { name: "Python",                  branch: "Programming", level: 5, evidence: "KIT101 · KIT315" },
    { name: "C",                       branch: "Programming", level: 4, evidence: "KIT205 · KIT107" },
    { name: "Bash / Shell",            branch: "Programming", level: 4, evidence: "KIT213" },
    { name: "Git & GitHub",            branch: "Programming", level: 4, evidence: "Projects" },
    { name: "Java",                    branch: "Programming", level: 3, evidence: "KIT101" },
    { name: "C# / Unity",              branch: "Programming", level: 3, evidence: "KIT208 · KIT307" },
    { name: "pytest",                  branch: "Programming", level: 3, evidence: "Projects" },
    { name: "Docker",                  branch: "Programming", level: 2, evidence: "Self-taught" },

    { name: "REST APIs",               branch: "Web & APIs", level: 4, evidence: "KIT214 · KIT304" },
    { name: "HTTP & JSON",             branch: "Web & APIs", level: 4, evidence: "KIT214" },
    { name: "Node.js & Express",       branch: "Web & APIs", level: 4, evidence: "KIT214" },
    { name: "FastAPI",                 branch: "Web & APIs", level: 4, evidence: "Projects" },
    { name: "Authentication",          branch: "Web & APIs", level: 4, evidence: "KIT214" },
    { name: "PHP & MySQL",             branch: "Web & APIs", level: 3, evidence: "KIT202" },
    { name: "Input Validation",        branch: "Web & APIs", level: 3, evidence: "KIT214" },
    { name: "Web Scraping",            branch: "Web & APIs", level: 3, evidence: "KIT214" },
    { name: "Firebase",                branch: "Web & APIs", level: 2, evidence: "KIT305" },

    { name: "Network Security",        branch: "Cyber Security", level: 4, evidence: "KIT111 · KIT215" },
    { name: "API Security",            branch: "Cyber Security", level: 4, evidence: "KIT304" },
    { name: "OWASP API Top 10",        branch: "Cyber Security", level: 3, evidence: "KIT304 research" },
    { name: "Threat Modelling",        branch: "Cyber Security", level: 3, evidence: "KIT304 research" },
    { name: "Cryptography",            branch: "Cyber Security", level: 3, evidence: "KIT103 · KIT214" },
    { name: "TLS & Certificates",      branch: "Cyber Security", level: 3, evidence: "KIT214" },
    { name: "Digital Forensics",       branch: "Cyber Security", level: 3, evidence: "KIT325" },
    { name: "Incident Response",       branch: "Cyber Security", level: 3, evidence: "KIT325" },
    { name: "MITM Analysis",           branch: "Cyber Security", level: 3, evidence: "KIT325" },
    { name: "Ethical Hacking",         branch: "Cyber Security", level: 3, evidence: "KIT215" },
    { name: "Cloud Security",          branch: "Cyber Security", level: 0, evidence: "Next unlock" },

    { name: "TCP/IP",                  branch: "Networking", level: 4, evidence: "KIT111 · KIT213" },
    { name: "Subnetting & VLSM",       branch: "Networking", level: 4, evidence: "CCNA" },
    { name: "LAN / WAN Configuration", branch: "Networking", level: 3, evidence: "KIT111" },
    { name: "Routing & Switching",     branch: "Networking", level: 3, evidence: "CCNA" },
    { name: "Cisco IOS",               branch: "Networking", level: 2, evidence: "CCNA" },
    { name: "OSPF",                    branch: "Networking", level: 0, evidence: "Next unlock" },

    { name: "Linux",                   branch: "Systems & Servers", level: 4, evidence: "KIT213" },
    { name: "Operating System Internals", branch: "Systems & Servers", level: 4, evidence: "KIT213 (HD, 91)" },
    { name: "Server Administration",   branch: "Systems & Servers", level: 3, evidence: "KIT304" },
    { name: "Server Hardening",        branch: "Systems & Servers", level: 3, evidence: "KIT304" },
    { name: "Cloud Computing",         branch: "Systems & Servers", level: 3, evidence: "KIT318" },
    { name: "Kubernetes",              branch: "Systems & Servers", level: 0, evidence: "Next unlock" },

    { name: "scikit-learn",            branch: "AI & Machine Learning", level: 4, evidence: "KIT315" },
    { name: "TensorFlow & Keras",      branch: "AI & Machine Learning", level: 4, evidence: "KIT315" },
    { name: "CNNs & LSTMs",            branch: "AI & Machine Learning", level: 4, evidence: "KIT315" },
    { name: "PyTorch",                 branch: "AI & Machine Learning", level: 3, evidence: "KIT315" },
    { name: "Natural Language Processing", branch: "AI & Machine Learning", level: 3, evidence: "KIT315" },
    { name: "GANs & Autoencoders",     branch: "AI & Machine Learning", level: 3, evidence: "KIT315" },
    { name: "Reinforcement Learning",  branch: "AI & Machine Learning", level: 3, evidence: "KIT315" },
    { name: "XGBoost",                 branch: "AI & Machine Learning", level: 2, evidence: "KIT315" },
    { name: "OpenCV",                  branch: "AI & Machine Learning", level: 2, evidence: "KIT315" },

    { name: "SQL",                     branch: "Data Engineering", level: 4, evidence: "KIT102 · KIT214" },
    { name: "Pandas",                  branch: "Data Engineering", level: 4, evidence: "KIT102 · KIT318" },
    { name: "PySpark",                 branch: "Data Engineering", level: 3, evidence: "KIT318" },
    { name: "Hadoop & MapReduce",      branch: "Data Engineering", level: 3, evidence: "KIT318" },
    { name: "Spark MLlib",             branch: "Data Engineering", level: 3, evidence: "KIT318" },
    { name: "Statistics",              branch: "Data Engineering", level: 3, evidence: "KMA153" },
    { name: "Data Visualisation",      branch: "Data Engineering", level: 3, evidence: "KIT102 · KIT315" },
    { name: "Kafka",                   branch: "Data Engineering", level: 0, evidence: "Next unlock" },

    { name: "Technical Writing",       branch: "Practice & Process", level: 4, evidence: "KIT105 (HD, 83)" },
    { name: "Agile & Scrum",           branch: "Practice & Process", level: 4, evidence: "KIT203 · KIT219" },
    { name: "Research & Analysis",     branch: "Practice & Process", level: 4, evidence: "KIT304 research" },
    { name: "UML Modelling",           branch: "Practice & Process", level: 3, evidence: "KIT219" },
    { name: "UX Evaluation",           branch: "Practice & Process", level: 3, evidence: "KIT219" },
    { name: "PRINCE2",                 branch: "Practice & Process", level: 3, evidence: "KIT203" },
    { name: "SFIA Framework",          branch: "Practice & Process", level: 3, evidence: "KIT105" }
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
