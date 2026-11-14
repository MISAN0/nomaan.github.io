/* PORTFOLIO DATA: the only file you need to edit. Progress is computed
   from the checkpoints, so there are never two numbers to keep in sync.
   After editing: npm run prerender. If the CV changed, also rebuild the
   PDF with portfolio_private/site-cv/makecv.py.                        */

const DATA = {

  /* Bump whenever something real changes. Deliberately manual: a build
     date would claim the content is current when only code changed. */
  meta: {
    updated: "14 November 2026",
    site: "https://mirsalmannomaan.com",
    source: "https://github.com/MISAN0/nomaan.github.io"
  },

  person: {
    name: "Mir Salman Nomaan",
    short: "Nomaan",
    location: "Hobart, Tasmania",
    avatar: "/photo.jpg",
    eyebrow: "Computer Science & Cyber Security · University of Tasmania",
    // The hook. His line, from the master CV: keep it.
    hook: "Most of what I can fix now, I broke myself first.",
    intro: "Graduating in December 2026 with every unit of a Bachelor of ICT complete, and three years of security work on a regulated port alongside the degree.",
    available: "Available now · full time · Hobart",
    seeking: "Service desk, IT support, cyber security, networking, systems and data roles.",
    links: {
      email: "mirsalmannomaan@gmail.com",
      github: "https://github.com/MISAN0",
      linkedin: "https://linkedin.com/in/nomaan00"
    }
  },

  /* ---------- Now / Next ----------
     `now` items carry checkpoints and the bar is computed from them.
     `next` items are one line each: no progress to fake.            */
  now: [
    {
      title: "CCNA 200-301",
      kind: "Cisco certification",
      target: "Exam early 2027",
      why: "Routing and switching on Cisco IOS, configured and troubleshot in the CLI rather than read about.",
      steps: [
        { label: "Subnet any prefix in under 60 seconds", done: true },
        { label: "Network fundamentals and switching", done: true },
        { label: "VLANs, trunking and spanning tree", done: false },
        { label: "OSPFv2 configured and troubleshot from scratch", done: false },
        { label: "Practice exams at 85% twice running", done: false }
      ]
    },
    {
      title: "First role in ICT",
      kind: "Job search",
      target: "Now",
      why: "Support, security, networking, systems or data. The way into the industry is through the door; specialisation comes after.",
      steps: [
        { label: "Portfolio live on its own domain", done: true },
        { label: "One-page CV written and downloadable", done: true },
        { label: "Applications sent", done: true },
        { label: "Interview for an ICT role", done: false },
        { label: "Offer signed", done: false }
      ]
    },
    {
      title: "Publishing the code",
      kind: "Open source",
      target: "Ongoing",
      why: "Moving the projects below out of local folders so the code can be read rather than described.",
      steps: [
        { label: "First repository public, with README and licence", done: true },
        { label: "Credentials audit across the rest", done: false },
        { label: "Three repositories public", done: false },
        { label: "Every project here links to its source", done: false }
      ]
    }
  ],

  next: [
    { title: "Graduation", when: "Dec 2026", why: "Coursework finished in October; the degree is conferred in December." },
    { title: "CompTIA Security+", when: "After CCNA", why: "Postponed so the CCNA gets full attention. Networking first, then security." },
    { title: "Security or network operations", when: "2028 onward", why: "Support teaches you the systems. Operations is where you defend them." }
  ],

  /* ---------- Skills ----------
     level: 1 Aware · 2 Familiar · 3 Working · 4 Confident · 5 Strong
            0 = next to learn.
     evidence: the unit, certification or project behind the rating.
     aka: extra names used to match a skill to the projects that used it
          (matching is otherwise on the project's `stack`).            */
  skillBranches: [
    { name: "Cyber Security", open: true, note: "Defensive and offensive work across the same systems: finding the weakness, then closing it." },
    { name: "Networking", open: true, note: "The layer everything else runs on. Addressing, routing and switching, learnt in the CLI." },
    { name: "Systems & Servers", note: "What happens under the application: processes, memory, filesystems, and the servers they run on." },
    { name: "Programming", note: "Languages picked up per problem rather than per fashion: systems work in C, everything else in Python." },
    { name: "Web & APIs", note: "Building services and then attacking them: authentication, transport security, and what an API leaks." },
    { name: "AI & Machine Learning", note: "Models trained and evaluated properly, on the metrics that survive imbalanced data, not on accuracy." },
    { name: "Data Engineering", note: "Moving analysis from one machine to a cluster, and querying what lands there." },
    { name: "Practice & Process", note: "How the work gets planned, documented and handed over: the half that is not code." }
  ],

  skills: [
    { name: "Python", branch: "Programming", level: 5, evidence: "KIT101 · KIT315" },
    { name: "C", branch: "Programming", level: 4, evidence: "KIT205 · KIT107" },
    { name: "Bash / Shell", branch: "Programming", level: 4, evidence: "KIT213" },
    { name: "Git & GitHub", branch: "Programming", level: 4, evidence: "Projects" },
    { name: "Java", branch: "Programming", level: 3, evidence: "KIT101" },
    { name: "C# / Unity", branch: "Programming", level: 3, evidence: "KIT208 · KIT307" },
    { name: "pytest", branch: "Programming", level: 3, evidence: "Projects" },
    { name: "Docker", branch: "Programming", level: 2, evidence: "Self-taught" },

    { name: "REST APIs", branch: "Web & APIs", level: 4, evidence: "KIT214 · KIT304" },
    { name: "HTTP & JSON", branch: "Web & APIs", level: 4, evidence: "KIT214" },
    { name: "Node.js & Express", branch: "Web & APIs", level: 4, evidence: "KIT214" },
    { name: "FastAPI", branch: "Web & APIs", level: 4, evidence: "Projects" },
    { name: "Authentication", branch: "Web & APIs", level: 4, evidence: "KIT214", aka: ["Sessions"] },
    { name: "PHP & MySQL", branch: "Web & APIs", level: 3, evidence: "KIT202" },
    { name: "Input Validation", branch: "Web & APIs", level: 3, evidence: "KIT214" },
    { name: "Web Scraping", branch: "Web & APIs", level: 3, evidence: "KIT214", aka: ["Cheerio"] },
    { name: "Firebase", branch: "Web & APIs", level: 2, evidence: "KIT305" },

    { name: "Network Security", branch: "Cyber Security", level: 4, evidence: "KIT111 · KIT215" },
    { name: "API Security", branch: "Cyber Security", level: 4, evidence: "KIT304", aka: ["OWASP"] },
    { name: "OWASP API Top 10", branch: "Cyber Security", level: 3, evidence: "KIT304 research" },
    { name: "Threat Modelling", branch: "Cyber Security", level: 3, evidence: "KIT304 research", aka: ["Threat Analysis"] },
    { name: "Cryptography", branch: "Cyber Security", level: 3, evidence: "KIT103 · KIT214" },
    { name: "TLS & Certificates", branch: "Cyber Security", level: 3, evidence: "KIT214" },
    { name: "Digital Forensics", branch: "Cyber Security", level: 3, evidence: "KIT325", aka: ["Forensics"] },
    { name: "Incident Response", branch: "Cyber Security", level: 3, evidence: "KIT325" },
    { name: "MITM Analysis", branch: "Cyber Security", level: 3, evidence: "KIT325", aka: ["MITM"] },
    { name: "Ethical Hacking", branch: "Cyber Security", level: 3, evidence: "KIT215" },
    { name: "Cloud Security", branch: "Cyber Security", level: 0, evidence: "Next to learn" },

    { name: "TCP/IP", branch: "Networking", level: 4, evidence: "KIT111 · KIT213" },
    { name: "Subnetting & VLSM", branch: "Networking", level: 4, evidence: "CCNA" },
    { name: "LAN / WAN Configuration", branch: "Networking", level: 3, evidence: "KIT111" },
    { name: "Routing & Switching", branch: "Networking", level: 3, evidence: "CCNA" },
    { name: "Cisco IOS", branch: "Networking", level: 2, evidence: "CCNA" },
    { name: "OSPF", branch: "Networking", level: 0, evidence: "Next to learn" },

    { name: "Linux", branch: "Systems & Servers", level: 4, evidence: "KIT213" },
    { name: "Operating System Internals", branch: "Systems & Servers", level: 4, evidence: "KIT213" },
    { name: "Server Administration", branch: "Systems & Servers", level: 3, evidence: "KIT304" },
    { name: "Server Hardening", branch: "Systems & Servers", level: 3, evidence: "KIT304", aka: ["Helmet"] },
    { name: "Cloud Computing", branch: "Systems & Servers", level: 3, evidence: "KIT318" },
    { name: "Kubernetes", branch: "Systems & Servers", level: 0, evidence: "Next to learn" },

    { name: "scikit-learn", branch: "AI & Machine Learning", level: 4, evidence: "KIT315" },
    { name: "TensorFlow & Keras", branch: "AI & Machine Learning", level: 4, evidence: "KIT315" },
    { name: "CNNs & LSTMs", branch: "AI & Machine Learning", level: 4, evidence: "KIT315" },
    { name: "PyTorch", branch: "AI & Machine Learning", level: 3, evidence: "KIT315" },
    { name: "Natural Language Processing", branch: "AI & Machine Learning", level: 3, evidence: "KIT315", aka: ["NLP"] },
    { name: "GANs & Autoencoders", branch: "AI & Machine Learning", level: 3, evidence: "KIT315" },
    { name: "Reinforcement Learning", branch: "AI & Machine Learning", level: 3, evidence: "KIT315" },
    { name: "Local LLMs", branch: "AI & Machine Learning", level: 3, evidence: "Projects", aka: ["Ollama"] },
    { name: "XGBoost", branch: "AI & Machine Learning", level: 2, evidence: "KIT315" },
    { name: "OpenCV", branch: "AI & Machine Learning", level: 2, evidence: "KIT315" },

    { name: "SQL", branch: "Data Engineering", level: 4, evidence: "KIT102 · KIT214", aka: ["MySQL", "SQLite"] },
    { name: "Pandas", branch: "Data Engineering", level: 4, evidence: "KIT102 · KIT318" },
    { name: "PySpark", branch: "Data Engineering", level: 3, evidence: "KIT318" },
    { name: "Hadoop & MapReduce", branch: "Data Engineering", level: 3, evidence: "KIT318" },
    { name: "Spark MLlib", branch: "Data Engineering", level: 3, evidence: "KIT318" },
    { name: "Statistics", branch: "Data Engineering", level: 3, evidence: "KMA153" },
    { name: "Data Visualisation", branch: "Data Engineering", level: 3, evidence: "KIT102 · KIT315" },
    { name: "Kafka", branch: "Data Engineering", level: 0, evidence: "Next to learn" },

    { name: "Technical Writing", branch: "Practice & Process", level: 4, evidence: "KIT105 · KIT300" },
    { name: "Agile & Scrum", branch: "Practice & Process", level: 4, evidence: "KIT203 · KIT300" },
    { name: "Research & Analysis", branch: "Practice & Process", level: 4, evidence: "KIT304 research", aka: ["Research"] },
    { name: "UML Modelling", branch: "Practice & Process", level: 3, evidence: "KIT219" },
    { name: "UX Evaluation", branch: "Practice & Process", level: 3, evidence: "KIT219" },
    { name: "PRINCE2", branch: "Practice & Process", level: 3, evidence: "KIT203" },
    { name: "SFIA Framework", branch: "Practice & Process", level: 3, evidence: "KIT105" }
  ],

  /* ---------- Projects ----------
     Ordered by importance. `featured` ones get the large treatment and
     the first five go on the CV. `story` = the case study, as pairs of
     [label, text]. code: "public" (needs `repo`), "private", "writeup".
     The capstone is under an NDA: describe the role and the outcome,
     never the client's design.                                       */
  projects: [
    {
      id: "api-exposure-auditor", featured: true,
      name: "API Exposure Auditor", cat: "Security", type: "Security tool",
      year: "2026", team: "Solo",
      blurb: "Checks an API for the mistakes that tell an attacker how it works before they send a single request: public Swagger and OpenAPI documentation, permissive CORS, missing security headers, chatty errors.",
      story: [
        ["Problem", "Published API documentation and loose server settings hand an attacker a map. Most teams never check what their own API gives away."],
        ["Approach", "Read thirteen sources first, mapped the risks to the OWASP API Security Top 10 and CWE-200, then wrote one check per risk."],
        ["Result", "Run against OWASP Juice Shop, a deliberately vulnerable test app, it reported 12 findings: 6 medium, 6 low, each with evidence. Output is a JSON report a pipeline can read."]
      ],
      image: { src: "/img/auditor-scan.webp", w: 800, h: 1063, alt: "Terminal output of a scan against OWASP Juice Shop: exposed Swagger and OpenAPI endpoints, open health and metrics endpoints, missing security headers and a permissive CORS policy, ending with 0 high, 6 medium and 6 low findings." },
      stack: ["Python", "REST APIs", "OpenAPI", "OWASP"],
      code: "public", repo: "https://github.com/MISAN0/api-exposure-auditor"
    },
    {
      id: "industry-capstone", featured: true,
      name: "Agent trust demo", cat: "Software", type: "Industry capstone · under NDA",
      year: "2026", team: "Team of six · documentation lead",
      blurb: "A working demo for an industry client in AI agent trust, built over a semester with a real client, real deadlines and a public showcase at the end.",
      story: [
        ["Brief", "The client wanted a demo that worked, and the documents that let someone else run it and build on it."],
        ["My part", "Led the documentation: requirements, sprint reports, the user manual, the reference manual, and the poster and leaflet for the public showcase."],
        ["Result", "Delivered in October 2026. The final release shipped with 564 automated tests passing. The code stays private under the NDA."]
      ],
      stack: ["Python", "FastAPI", "pytest", "Agile & Scrum", "Technical Writing"],
      code: "private"
    },
    {
      id: "nous", featured: true,
      name: "NOUS", cat: "AI & Data", type: "Personal AI switchboard",
      year: "2026", team: "Solo",
      blurb: "A small local model reads each prompt and decides where it goes: Claude, Codex, or a local Llama model for the easy questions. The answer streams back into one dashboard.",
      highlights: [
        "Routing done by a 4-billion-parameter model running locally, so the decision costs nothing",
        "Server on Hono with SQLite storage; front end in React and Vite",
        "Grew a WhatsApp assistant on a spare SIM that answers through the same router"
      ],
      stack: ["Node.js", "Hono", "SQLite", "React", "Ollama"],
      code: "private"
    },
    {
      id: "openapi-research", name: "OpenAPI Exposure Research", cat: "Security", type: "Security research",
      year: "2026", team: "Solo",
      blurb: "How publicly exposed Swagger and OpenAPI endpoints leak information in production APIs, and what actually reduces it.",
      highlights: [
        "Thirteen sources: ten peer-reviewed papers plus OWASP, MITRE CWE and the OpenAPI specification",
        "Traced how specification-driven fuzzers turn a published schema into an attack surface",
        "Produced the risk framing the API Exposure Auditor was then built against"
      ],
      stack: ["Research", "OWASP API Top 10", "CWE-200", "Threat Analysis"],
      code: "writeup"
    },
    {
      id: "hardened-node-api", name: "Hardened Node.js API Server", cat: "Web & APIs", type: "Backend",
      year: "2025", team: "Solo",
      blurb: "An Express API served over HTTPS with its own TLS certificates, hardened with Helmet security headers, an explicit CORS policy and request logging.",
      highlights: [
        "TLS terminated by the application itself rather than assumed from a proxy",
        "Secure defaults applied deliberately: headers, origin policy, audit logging",
        "Paired with a Cheerio scraper that normalises fetched pages into JSON"
      ],
      stack: ["Node.js", "Express", "Helmet", "TLS", "Cheerio"],
      code: "private"
    },
    {
      id: "spam-classifier", name: "Spam Detection Classifier", cat: "AI & Data", type: "Machine learning",
      year: "2025", team: "Solo",
      blurb: "A text classifier trained on a deliberately imbalanced spam dataset, judged on the metrics that survive class imbalance rather than on raw accuracy.",
      highlights: [
        "Class weighting so the minority class is not simply ignored",
        "Assessed on ROC and precision-recall curves with confusion matrices",
        "Seeds fixed throughout, so a rerun reproduces the reported numbers"
      ],
      stack: ["TensorFlow", "Keras", "NLP", "scikit-learn"],
      code: "private"
    },
    {
      id: "data-pipelines", name: "Distributed Data Pipelines", cat: "AI & Data", type: "Data engineering",
      year: "2026", team: "Solo",
      blurb: "PySpark pipelines over multi-table flight and weather data, taking the same analysis from one machine to a distributed engine.",
      highlights: [
        "SparkSession and cluster configuration tuned for the workload",
        "VectorAssembler feature pipelines feeding Spark MLlib classifiers",
        "MapReduce fundamentals implemented directly, not just called"
      ],
      stack: ["PySpark", "Hadoop", "MapReduce", "Spark MLlib"],
      code: "private"
    },
    {
      id: "php-web-app", name: "Full-Stack Web Application", cat: "Web & APIs", type: "Web application",
      year: "2024", team: "Solo",
      blurb: "A database-backed PHP application with registration and login, sessions, content creation, search and an archive: about a thousand lines, no framework.",
      highlights: [
        "Server-side validation on every route",
        "MySQL schema behind the create, search, archive and post views",
        "Shared header and footer components rather than copied markup"
      ],
      stack: ["PHP", "MySQL", "JavaScript", "Sessions"],
      code: "private"
    },
    {
      id: "graph-pathfinding", name: "Graph Pathfinding Engine", cat: "Software", type: "Algorithms",
      year: "2025", team: "Solo",
      blurb: "Dijkstra and A-star written from scratch in C over a custom graph structure, with a heuristic function and explicit closed-set tracking.",
      highlights: [
        "No library containers: the graph, queue and sets are all hand-built",
        "Two search strategies over one structure, so their behaviour compares directly",
        "Built alongside binary search trees, hash tables and priority queues"
      ],
      stack: ["C", "Dijkstra", "A-star", "Data Structures"],
      code: "private"
    },
    {
      id: "incident-response", name: "Incident Response & Threat Analysis", cat: "Security", type: "Security analysis",
      year: "2025", team: "Team",
      blurb: "NotPetya and the Sony Pictures compromise traced from initial access to impact, with a response plan built on the Australian Cyber Security Centre template.",
      highlights: [
        "Attack paths reconstructed from public incident reporting",
        "Man-in-the-middle attack analysis with practical defences",
        "Response plan mapped to a recognised national framework"
      ],
      stack: ["Incident Response", "MITM", "ACSC", "Forensics"],
      code: "writeup"
    },
    {
      id: "unix-records", name: "UNIX Records Manager", cat: "Systems", type: "Systems",
      year: "2024", team: "Solo",
      blurb: "A POSIX shell toolset for employee records: menu-driven search, add and delete, with log rotation and a user access-deny list.",
      highlights: [
        "Portable POSIX shell rather than bash-only syntax",
        "Access control enforced through a deny list at the entry point",
        "Log management handled by the tool instead of left to grow"
      ],
      stack: ["Shell", "POSIX", "Linux", "Access Control"],
      code: "private"
    },
    {
      id: "game-ai", name: "Game AI & Pathfinding", cat: "Software", type: "Game development",
      year: "2024", team: "Solo",
      blurb: "A Unity game with hand-written agent AI: A-star navigation across a generated node graph, seek and wander steering, and path-following agents.",
      highlights: [
        "Node graph generated from the level rather than placed by hand",
        "Steering behaviours composed instead of scripted per enemy",
        "Shipped with a playable build and a development log"
      ],
      stack: ["C#", "Unity", "A-star", "Steering AI"],
      code: "private"
    },
    {
      id: "stego-cipher", name: "Steganography & Cipher Tool", cat: "Security", type: "Cryptography",
      year: "2023", team: "Solo",
      blurb: "Hides a message inside a carrier by encoding characters to binary and applying a multiplicative cipher over modular arithmetic, with a matching decoder.",
      highlights: [
        "Encryption and extraction written as exact inverses of one another",
        "Keys chosen so each one maps reversibly across the symbol set",
        "Test cases written first, driving the implementation"
      ],
      stack: ["Python", "Cryptography", "Modular Arithmetic"],
      code: "private"
    }
  ],

  /* ---------- Units ----------
     Names for the codes the skills cite, plus credit points so the
     education line is computed. No marks or grades: academic results
     are deliberately not published, and that includes this file,
     which anyone can read.                                           */
  units: [
    ["KIT101", "Programming Fundamentals", 12.5], ["KIT105", "ICT Professional Practices", 12.5],
    ["KIT111", "Data Networks & Security", 12.5], ["KIT118", "Cybersecurity Policies & Practices", 12.5],
    ["KIT102", "Introduction to Data Science", 12.5], ["KIT103", "Computational Science", 12.5],
    ["KIT107", "Programming", 12.5], ["KMA153", "Data Handling & Statistics 1", 12.5],
    ["KIT202", "Web Programming Fundamentals", 12.5], ["KIT203", "ICT Project Management & Modelling", 12.5],
    ["KIT208", "Virtual & Mixed Reality Technology", 12.5], ["KIT213", "Operating Systems", 12.5],
    ["KIT215", "Cybersecurity & Ethical Hacking", 12.5], ["KIT219", "Development Methodologies & UX", 12.5],
    ["KIT205", "Data Structures & Algorithms", 12.5], ["KIT305", "Mobile Application Development", 12.5],
    ["KIT214", "Intelligent & Secure Web Development", 12.5], ["KIT315", "Machine Learning & Applications", 12.5],
    ["KIT325", "Advanced Cybersecurity & eForensics", 12.5], ["KIT304", "Server Administration & Security Assurance", 12.5],
    ["KIT318", "Big Data & Cloud Computing", 12.5], ["KIT300", "ICT Project (industry capstone)", 25],
    ["KIT307", "Computer Graphics & Animation", 12.5]
  ].map(([code, name, pts]) => ({ code, name, pts, done: true })),

  education: {
    degree: "Bachelor of Information and Communication Technology",
    school: "University of Tasmania",
    majors: "Computer Science and Cyber Security",
    period: "2023 – 2026",
    coursePoints: 300,
    completed: "October 2026",
    graduating: "December 2026",
    lines: [
      "Double major: Computer Science and Cyber Security",
      "Industry capstone with a real client, under an NDA, as documentation lead"
    ]
  },

  /* ---------- Work ----------
     Facts from the master CV (portfolio_private/master/resume.md).
     The TasPorts posting is continuous; only the employer changed.  */
  work: [
    {
      role: "Security Officer", org: "Kevlar Security Solutions", period: "Dec 2024 – Present", current: true,
      lines: [
        "Retail security, asset protection, events and crowd control across several client sites",
        "Access control on TasPorts, a regulated maritime site, under an MSIC clearance",
        "Incident reports and escalation to management or emergency services"
      ]
    },
    {
      role: "Security Officer", org: "MA Services Group", period: "Dec 2023 – Dec 2025",
      lines: [
        "First security role, across a range of sites",
        "Posted to TasPorts from Nov 2024; retained on site when the contract moved to Kevlar"
      ]
    },
    {
      role: "Retail Team Member", org: "Coles Supermarket", period: "Oct 2023 – Present", current: true,
      lines: [
        "Customer service through peak trading in a high-volume store",
        "Sorting the problem while the person is still standing there"
      ]
    }
  ],

  /* ============================================================
     CV: the recruiter document at /cv/. Plain language, ordered the
     way a recruiter reads. Also the source for the PDF.
     ============================================================ */
  cv: {
    file: "/Mir-Salman-Nomaan-CV.pdf",
    headline: "Computer Science & Cyber Security · Graduating December 2026",

    // Hook first, never "I have…" or "Final-year student…".
    summary: [
      "Most of what I can fix now, I broke myself first: Linux on my own machines, my own home network, and once an old Celeron desktop brought online through USB tethering off a 2G phone.",
      "Graduating in December 2026 with every unit of a Bachelor of ICT from the University of Tasmania complete, majoring in Computer Science and Cyber Security.",
      "Three years of security work alongside the degree, including access control on a regulated port under an MSIC clearance.",
      "Available now, full time, for service desk, IT support, cyber security, networking, systems or data roles."
    ],

    // Accomplishments only. No grades, marks or academic results.
    highlights: [
      "Led documentation for a six-person industry capstone under NDA, from requirements to the user and reference manuals",
      "Built and published a Python tool that audits APIs for information disclosure, grounded in 13 academic and industry sources",
      "Built a personal AI switchboard that routes each prompt to the right model through a small local one",
      "Three years of security operations alongside full-time study, with no break in enrolment",
      "Implemented Dijkstra and A-star from first principles in C, with no external libraries"
    ],

    certs: [
      "CCNA 200-301: in study, exam targeted early 2027"
    ],

    softSkills: [
      "Communication under pressure", "Team collaboration", "Problem solving",
      "Attention to detail", "Customer service", "Conflict de-escalation",
      "Technical documentation", "Adaptability"
    ],

    experience: [
      {
        role: "Security Officer", org: "Kevlar Security Solutions", location: "Tasmania", period: "Dec 2024 – Present",
        bullets: [
          "Cover retail security, asset protection, events and crowd control across several client sites, each with its own procedures and reporting lines",
          "Control access to restricted zones at TasPorts, a regulated maritime site, holding an MSIC clearance",
          "Respond to incidents, write incident reports and escalate to management or emergency services"
        ]
      },
      {
        role: "Security Officer", org: "MA Services Group", location: "Tasmania", period: "Dec 2023 – Dec 2025",
        bullets: [
          "First security role, covering a range of sites before a posting to TasPorts in Nov 2024",
          "Retained on site when the TasPorts contract transferred to Kevlar in Dec 2025"
        ]
      },
      {
        role: "Retail Team Member", org: "Coles Supermarket", location: "Hobart, Tasmania", period: "Oct 2023 – Present",
        bullets: [
          "Customer service through peak trading in a high-volume store",
          "Handle complaints and refusals without escalating them"
        ]
      }
    ],

    coursework: [
      "Intelligent and Secure Web Development", "Advanced Cyber Security and eForensics",
      "Cyber Security and Ethical Hacking", "Cyber Security Policies and Practices",
      "Data Networks and Security", "Server Administration and Security Assurance",
      "Operating Systems", "Big Data and Cloud Computing",
      "Machine Learning and Applications", "Introduction to Data Science",
      "Data Structures and Algorithms", "ICT Project Management and Modelling"
    ],

    /* Names and roles only. Referees' phone numbers and emails are other
       people's personal information and stay off a public page.       */
    references: [
      { name: "Dr James Montgomery", role: "Senior Lecturer in ICT", org: "University of Tasmania" },
      { name: "Azaz Gondal", role: "ICT Academic Staff & Cyber Security Analyst", org: "University of Tasmania · Intuit" },
      { name: "Samuel Horton", role: "ICT Academic Staff", org: "University of Tasmania" },
      { name: "M Haneef", role: "Security Manager", org: "Kevlar Security Solutions" }
    ],

    keywords: [
      "Cyber Security", "Information Security", "Network Security", "Application Security",
      "Incident Response", "Risk Assessment", "Threat Analysis", "Vulnerability Assessment",
      "Digital Forensics", "Access Control", "OWASP", "TCP/IP", "Routing and Switching",
      "Subnetting", "Cisco IOS", "TLS", "Encryption", "Linux", "Windows",
      "Server Administration", "System Hardening", "Help Desk", "Service Desk",
      "Technical Support", "Troubleshooting", "Cloud Computing",
      "Python", "Java", "C", "C#", "JavaScript", "PHP", "Bash", "SQL", "Git",
      "REST APIs", "Node.js", "Express", "FastAPI", "MySQL", "Docker",
      "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Data Analysis",
      "Pandas", "PySpark", "Hadoop", "Data Visualisation",
      "Agile", "Scrum", "PRINCE2", "Technical Documentation", "Stakeholder Communication"
    ]
  }
};
