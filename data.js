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
      linkedin: "https://linkedin.com/in/nomaan00",
      // EDIT: add an address here and the contact card gains an email
      // row. Left empty it is simply not rendered — no dead link.
      email: "mirsalmannomaan@gmail.com"
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
      detail: "Bachelor of Information and Communication Technology at the University of Tasmania, double major in Computer Science and Cyber Security. 262.5 of 300 credit points cleared.",
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
    { name: "Operating System Internals", branch: "Systems & Servers", level: 4, evidence: "KIT213" },
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

    { name: "Technical Writing",       branch: "Practice & Process", level: 4, evidence: "KIT105" },
    { name: "Agile & Scrum",           branch: "Practice & Process", level: 4, evidence: "KIT203 · KIT219" },
    { name: "Research & Analysis",     branch: "Practice & Process", level: 4, evidence: "KIT304 research" },
    { name: "UML Modelling",           branch: "Practice & Process", level: 3, evidence: "KIT219" },
    { name: "UX Evaluation",           branch: "Practice & Process", level: 3, evidence: "KIT219" },
    { name: "PRINCE2",                 branch: "Practice & Process", level: 3, evidence: "KIT203" },
    { name: "SFIA Framework",          branch: "Practice & Process", level: 3, evidence: "KIT105" }
  ],

  /* ---------- Artifacts (projects) ----------
     rarity: legendary | epic | rare — how substantial the build is.
     code:   "published" once the repository is public and `repo` is set,
             "private" while it still lives on disk, "writeup" for work
             whose output is a document rather than a program.
     repo:   full URL. Leave empty until the repository actually exists —
             the card renders a "code coming" note instead of a dead link.
     TO DO:  as each repository goes up on GitHub, set code to "published"
             and paste the URL into `repo`. Nothing else needs changing.  */
  artifacts: [
    {
      name: "API Exposure Auditor",
      rarity: "legendary",
      type: "Cyber Security Tool",
      year: "2026",
      team: "Solo",
      blurb: "Audits REST API endpoints for information disclosure — exposed OpenAPI and Swagger documentation, permissive CORS policies, missing security headers — and emits structured JSON reports for triage.",
      highlights: [
        "Built on my own research into what publicly exposed API specifications leak",
        "Findings framed against the OWASP API Security Top 10 and MITRE CWE-200",
        "Machine-readable output, so results can feed a pipeline rather than a person"
      ],
      stats: ["Python", "REST APIs", "OpenAPI", "OWASP"],
      code: "private",
      repo: ""
    },
    {
      name: "OpenAPI Exposure Research",
      rarity: "epic",
      type: "Security Research",
      year: "2026",
      team: "Solo",
      blurb: "A structured investigation into the information disclosure risk created by publicly exposed Swagger and OpenAPI endpoints in production APIs, and what actually reduces it.",
      highlights: [
        "Thirteen sources: ten peer-reviewed papers plus OWASP, MITRE CWE and the OpenAPI specification",
        "Traced how specification-driven fuzzers turn a published schema into an attack surface",
        "Produced the risk framing the API Exposure Auditor was then built against"
      ],
      stats: ["Research", "OWASP API Top 10", "CWE-200", "Threat Analysis"],
      code: "writeup",
      repo: ""
    },
    {
      name: "Hardened Node.js API Server",
      rarity: "epic",
      type: "Backend",
      year: "2025",
      team: "Solo",
      blurb: "An Express API served over HTTPS using its own TLS certificates, hardened with Helmet security headers, an explicit CORS policy, and request logging.",
      highlights: [
        "TLS terminated by the application itself rather than assumed from a proxy",
        "Secure defaults applied deliberately: headers, origin policy, audit logging",
        "Paired with a Cheerio scraper that normalises fetched pages into JSON"
      ],
      stats: ["Node.js", "Express", "Helmet", "TLS", "Cheerio"],
      code: "private",
      repo: ""
    },
    {
      name: "Spam Detection Classifier",
      rarity: "epic",
      type: "Machine Learning",
      year: "2025",
      team: "Solo",
      blurb: "A text classifier trained on a deliberately imbalanced spam dataset, evaluated on the metrics that survive class imbalance rather than on raw accuracy.",
      highlights: [
        "Class weighting applied so the minority class is not simply ignored",
        "Assessed on ROC and precision-recall curves with confusion matrices",
        "Seeds fixed throughout, so a rerun reproduces the reported numbers"
      ],
      stats: ["TensorFlow", "Keras", "NLP", "scikit-learn"],
      code: "private",
      repo: ""
    },
    {
      name: "Distributed Data Pipelines",
      rarity: "epic",
      type: "Data Engineering",
      year: "2026",
      team: "Solo",
      blurb: "PySpark pipelines over multi-table flight and weather data, taking the same analysis from a single machine to a distributed engine.",
      highlights: [
        "SparkSession and cluster configuration tuned for the workload",
        "VectorAssembler feature pipelines feeding Spark MLlib classifiers",
        "MapReduce fundamentals implemented directly, not just called"
      ],
      stats: ["PySpark", "Hadoop", "MapReduce", "Spark MLlib"],
      code: "private",
      repo: ""
    },
    {
      name: "Full-Stack Web Application",
      rarity: "epic",
      type: "Web Application",
      year: "2024",
      team: "Solo",
      blurb: "A database-backed PHP application with user registration and login, session handling, content creation, search, and an archive — around a thousand lines, built without a framework.",
      highlights: [
        "Registration and authentication with server-side validation on every route",
        "MySQL schema behind the create, search, archive and post views",
        "Shared header and footer components rather than copied markup"
      ],
      stats: ["PHP", "MySQL", "JavaScript", "Sessions"],
      code: "private",
      repo: ""
    },
    {
      name: "Graph Pathfinding Engine",
      rarity: "rare",
      type: "Algorithms",
      year: "2025",
      team: "Solo",
      blurb: "Dijkstra and A-star written from scratch in C over a custom graph structure, with a heuristic function and explicit closed-set tracking.",
      highlights: [
        "No library containers — the graph, queue and sets are all hand-built",
        "Two search strategies over one structure, so their behaviour is directly comparable",
        "Built alongside binary search trees, hash tables and priority queues"
      ],
      stats: ["C", "Dijkstra", "A-star", "Data Structures"],
      code: "private",
      repo: ""
    },
    {
      name: "Steganography & Cipher Tool",
      rarity: "rare",
      type: "Cryptography",
      year: "2023",
      team: "Solo",
      blurb: "Hides a message inside a carrier by encoding characters to binary and applying a multiplicative cipher over modular arithmetic, with a matching decoder.",
      highlights: [
        "Encryption and extraction implemented as exact inverses of one another",
        "Modular arithmetic chosen so each key maps reversibly across the symbol set",
        "Written test cases drive the implementation rather than following it"
      ],
      stats: ["Python", "Cryptography", "Modular Arithmetic"],
      code: "private",
      repo: ""
    },
    {
      name: "UNIX Records Manager",
      rarity: "rare",
      type: "Systems",
      year: "2024",
      team: "Solo",
      blurb: "A POSIX shell toolset for employee record management — menu-driven search, add and delete, with log rotation and a user access-deny list.",
      highlights: [
        "Portable POSIX shell rather than bash-only syntax",
        "Access control enforced through a deny list at the entry point",
        "Log management handled by the tool instead of left to grow"
      ],
      stats: ["Shell", "POSIX", "Linux", "Access Control"],
      code: "private",
      repo: ""
    },
    {
      name: "Game AI & Pathfinding",
      rarity: "rare",
      type: "Game Development",
      year: "2024",
      team: "Solo",
      blurb: "A Unity game with hand-written agent AI: A-star navigation across a generated node graph, seek and wander steering behaviours, and path-following agents.",
      highlights: [
        "Node graph generated from the level rather than placed by hand",
        "Steering behaviours composed instead of scripted per enemy",
        "Shipped with a playable build and a development log"
      ],
      stats: ["C#", "Unity", "A-star", "Steering AI"],
      code: "private",
      repo: ""
    },
    {
      name: "Incident Response & Threat Analysis",
      rarity: "rare",
      type: "Security Analysis",
      year: "2025",
      team: "Team",
      blurb: "Breakdowns of real intrusions — NotPetya and the Sony Pictures compromise — traced from initial access through to impact, with a response plan built on the Australian Cyber Security Centre template.",
      highlights: [
        "Attack paths reconstructed from public incident reporting",
        "Man-in-the-middle attack analysis with practical defences",
        "Response plan mapped to a recognised national framework"
      ],
      stats: ["Incident Response", "MITM", "ACSC", "Forensics"],
      code: "writeup",
      repo: ""
    }
  ],

  /* ---------- Codex: every unit, straight off the faculty record ----------
     mark  = the actual mark, and the mark IS the XP for that unit.
     grade = HD / DN / CR / PP, or IP for currently enrolled. The grade
             scale is spelled out in `gradeScale` below, because these
             codes mean nothing outside Australia.
     pts   = credit points (KIT300 is a 25pt double unit).
     theme = groups the unit with the matching skill-tree branch.          */
  codex: [
    { code: "KIT101", name: "Programming Fundamentals",             grade: "CR", mark: 60, year: 2023, sem: 1, pts: 12.5, theme: "Programming" },
    { code: "KIT105", name: "ICT Professional Practices",           grade: "HD", mark: 83, year: 2023, sem: 1, pts: 12.5, theme: "Professional" },
    { code: "KIT111", name: "Data Networks & Security",             grade: "DN", mark: 76, year: 2023, sem: 1, pts: 12.5, theme: "Networking" },
    { code: "KIT118", name: "Cybersecurity Policies & Practices",   grade: "HD", mark: 80, year: 2023, sem: 1, pts: 12.5, theme: "Cyber Security" },
    { code: "KIT102", name: "Introduction to Data Science",         grade: "HD", mark: 85, year: 2023, sem: 2, pts: 12.5, theme: "Data & AI" },
    { code: "KIT103", name: "Computational Science",                grade: "PP", mark: 57, year: 2023, sem: 2, pts: 12.5, theme: "Programming" },
    { code: "KIT107", name: "Programming",                          grade: "PP", mark: 55, year: 2023, sem: 2, pts: 12.5, theme: "Programming" },
    { code: "KMA153", name: "Data Handling & Statistics 1",         grade: "DN", mark: 75, year: 2023, sem: 2, pts: 12.5, theme: "Data & AI" },

    { code: "KIT202", name: "Web Programming Fundamentals",         grade: "DN", mark: 72, year: 2024, sem: 1, pts: 12.5, theme: "Web" },
    { code: "KIT203", name: "ICT Project Management & Modelling",   grade: "DN", mark: 72, year: 2024, sem: 1, pts: 12.5, theme: "Professional" },
    { code: "KIT208", name: "Virtual & Mixed Reality Technology",   grade: "DN", mark: 71, year: 2024, sem: 2, pts: 12.5, theme: "Programming" },
    { code: "KIT213", name: "Operating Systems",                    grade: "HD", mark: 91, year: 2024, sem: 2, pts: 12.5, theme: "Systems" },
    { code: "KIT215", name: "Cybersecurity & Ethical Hacking",      grade: "CR", mark: 66, year: 2024, sem: 2, pts: 12.5, theme: "Cyber Security" },
    { code: "KIT219", name: "Development Methodologies & UX",       grade: "CR", mark: 64, year: 2024, sem: 2, pts: 12.5, theme: "Professional" },

    { code: "KIT205", name: "Data Structures & Algorithms",         grade: "PP", mark: 56, year: 2025, sem: 1, pts: 12.5, theme: "Programming" },
    { code: "KIT305", name: "Mobile Application Development",       grade: "CR", mark: 62, year: 2025, sem: 1, pts: 12.5, theme: "Programming" },
    { code: "KIT214", name: "Intelligent & Secure Web Development", grade: "HD", mark: 80, year: 2025, sem: 2, pts: 12.5, theme: "Web" },
    { code: "KIT315", name: "Machine Learning & Applications",      grade: "DN", mark: 72, year: 2025, sem: 2, pts: 12.5, theme: "Data & AI" },
    { code: "KIT325", name: "Advanced Cybersecurity & eForensics",  grade: "DN", mark: 79, year: 2025, sem: 2, pts: 12.5, theme: "Cyber Security" },

    { code: "KIT304", name: "Server Administration & Security Assurance", grade: "DN", mark: 74, year: 2026, sem: 1, pts: 12.5, theme: "Systems" },
    { code: "KIT318", name: "Big Data & Cloud Computing",           grade: "DN", mark: 73, year: 2026, sem: 1, pts: 12.5, theme: "Data & AI" },

    { code: "KIT300", name: "ICT Project (Capstone)",               grade: "IP", year: 2026, sem: 2, pts: 25, theme: "Professional" },
    { code: "KIT307", name: "Computer Graphics & Animation",        grade: "IP", year: 2026, sem: 2, pts: 12.5, theme: "Programming" }
  ],

  /* ---------- Academic record: shown as HUD chips ---------- */
  academic: {
    // Kept for reference only — deliberately not rendered anywhere on
    // the site. Academic results are not published.
    gpa: 5.04,
    gpaScale: 7,
    coursePoints: 300,      // total credit points in the degree
    gpaDate: "24 Jun 2026",
    graduating: "Dec 2026",
    degreeName: "Bachelor of ICT"
  },

  /* ---------- Grade scale ----------
     Australian grade codes are meaningless to a reader outside the
     system, so the site prints the name and the mark range.            */
  gradeScale: [
    { code: "HD", name: "High Distinction", range: "80–100" },
    { code: "DN", name: "Distinction",      range: "70–79"  },
    { code: "CR", name: "Credit",           range: "60–69"  },
    { code: "PP", name: "Pass",             range: "50–59"  },
    { code: "IP", name: "In progress",      range: "enrolled now" }
  ],

  /* ---------- Campaign log: work and study ----------
     current: true keeps a "Now" marker on the entry.
     Keep `lines` to three at most — this is a summary, not a duty
     statement.                                                        */
  campaign: [
    {
      title: "Bachelor of Information and Communication Technology",
      org: "University of Tasmania · Hobart",
      period: "2023 – Dec 2026",
      kind: "edu",
      current: true,
      lines: [
        "Double major: Computer Science and Cyber Security",
        "Coursework across cyber security, networking, systems, software and data",
        "262.5 of 300 credit points completed"
      ],
      tags: ["Cyber Security", "Computer Science"]
    },
    {
      title: "Security Officer",
      org: "Kevlar Security Services · Hobart",
      period: "2023 – Present",
      kind: "work",
      current: true,
      lines: [
        "Crowd control at sporting events, concerts, music festivals, clubs and pubs",
        "Static guarding and access control across maritime, construction, mall and office sites",
        "Venue control for local festivals"
      ],
      tags: ["Crowd Control", "Access Control", "Static Guarding", "Maritime"]
    },
    {
      title: "Security Officer",
      org: "MA Security · Hobart",
      period: "Dec 2023 – Dec 2025",
      kind: "work",
      lines: [
        "Maritime security at TasPorts, working to regulated port access controls",
        "Retail security, asset protection and undercover loss prevention",
        "Crowd control across licensed and public venues"
      ],
      tags: ["Maritime · TasPorts", "Asset Protection", "Undercover", "Retail"]
    },
    {
      title: "Retail Team Member",
      org: "Coles Supermarket · Hobart",
      period: "Oct 2023 – Present",
      kind: "work",
      current: true,
      lines: [
        "Customer service and fast issue resolution in a high-volume store",
        "Team operations, stock accuracy and floor organisation"
      ],
      tags: ["Customer Service", "Operations"]
    }
  ],

  /* ============================================================
     CV MODE — the recruiter document.
     A separate document, not a restyled version of the game page.
     Everything here is written for a hiring audience: plain language,
     quantified where possible, and ordered the way a recruiter reads.
     ============================================================ */
  cv: {
    // EDIT: drop a PDF in this folder and put its filename here. The
    // download button appears only when this is set, so it can never
    // link to a missing file.
    file: "Mir-Salman-Nomaan-CV.pdf",
    fileLabel: "PDF · 1 page",

    // EDIT: a phone number is what recruiters reach for first. Left
    // empty it is simply not shown.
    phone: "+61 475 231 052",

    headline: "ICT Graduate — Cyber Security & Computer Science",

    summary: "Final-year Information and Communication Technology student at the University of Tasmania, majoring in Computer Science and Cyber Security and graduating December 2026. Builds and secures software end to end: REST APIs hardened with TLS and security headers, a Python tool that audits APIs for information disclosure, and machine learning models evaluated on imbalanced real-world data. Brings three years of concurrent frontline security operations, including regulated maritime access control at TasPorts, delivered alongside full-time study. Seeking a graduate or entry-level ICT role — service desk, technical support, cyber security or networking — where analytical thinking and a security-first mindset add value from day one.",

    // Accomplishments only. No grades, marks or academic results.
    highlights: [
      "Delivered three years of frontline security operations while studying full time, with no break in enrolment",
      "Built a Python security auditing tool from original research spanning 13 academic and industry sources",
      "Developed a full-stack web application of roughly 1,000 lines without relying on a framework",
      "Shipped production-style code in seven programming languages across 11 documented projects",
      "Implemented Dijkstra and A-star pathfinding from first principles, with no external libraries",
      "Trained and evaluated deep learning models, including convolutional, recurrent and generative networks"
    ],

    softSkills: [
      "Communication under pressure", "Team collaboration", "Problem solving",
      "Attention to detail", "Time management", "Customer service",
      "Conflict de-escalation", "Technical documentation", "Adaptability"
    ],

    experience: [
      {
        role: "Security Officer",
        org: "Kevlar Security Services",
        location: "Hobart, Tasmania",
        period: "2023 – Present",
        bullets: [
          "Manage crowd control at sporting events, concerts, festivals and licensed venues, maintaining public safety across large crowds",
          "Enforce access control and static guarding across maritime, construction, retail and commercial office sites",
          "Execute incident response and escalation procedures under pressure, documenting events for client reporting"
        ]
      },
      {
        role: "Security Officer",
        org: "MA Security",
        location: "Hobart, Tasmania",
        period: "Dec 2023 – Dec 2025",
        bullets: [
          "Delivered maritime security at TasPorts, enforcing regulated access controls across critical port infrastructure",
          "Conducted asset protection and undercover loss prevention, identifying and de-escalating theft incidents",
          "Monitored surveillance systems and maintained accurate incident records for client review"
        ]
      },
      {
        role: "Retail Team Member",
        org: "Coles Supermarket",
        location: "Hobart, Tasmania",
        period: "Oct 2023 – Present",
        bullets: [
          "Resolve customer issues in a high-volume retail environment while meeting service standards",
          "Maintain stock accuracy and floor presentation as part of a rotating team"
        ]
      }
    ],

    // Coursework named without grades — relevance, not results.
    coursework: [
      "Intelligent and Secure Web Development", "Advanced Cyber Security and eForensics",
      "Cyber Security and Ethical Hacking", "Cyber Security Policies and Practices",
      "Data Networks and Security", "Server Administration and Security Assurance",
      "Operating Systems", "Big Data and Cloud Computing",
      "Machine Learning and Applications", "Introduction to Data Science",
      "Data Structures and Algorithms", "ICT Project Management and Modelling"
    ],

    activities: [],

    keywords: [
      "Cyber Security", "Information Security", "Network Security", "Application Security",
      "Incident Response", "Risk Assessment", "Threat Analysis", "Vulnerability Assessment",
      "Digital Forensics", "Penetration Testing", "Access Control", "OWASP", "TCP/IP",
      "Routing and Switching", "Subnetting", "Cisco IOS", "Firewalls", "TLS", "Encryption",
      "Linux", "Windows", "Server Administration", "System Hardening", "Help Desk",
      "Cloud Computing", "Virtualisation", "Technical Support", "Service Desk", "Troubleshooting",
      "Python", "Java", "C", "C#", "JavaScript", "PHP", "Bash", "SQL", "Git",
      "REST APIs", "Node.js", "Express", "FastAPI", "MySQL", "Docker",
      "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Data Analysis",
      "Pandas", "PySpark", "Hadoop", "Data Visualisation",
      "Agile", "Scrum", "PRINCE2", "Technical Documentation", "Stakeholder Communication"
    ]
  },

  /* ---------- Achievements ----------
     Earned only. Anything still ahead lives in `quests` and `goals`;
     repeating it here as a locked tile would be the third copy.
     tier: gold | silver | bronze — how hard it was to earn.
     proof: the fact behind the badge, so it is checkable.            */
  achievements: [
    {
      icon: "◆", name: "Breaker and Builder", tier: "gold", when: "2025 – 2026",
      desc: "Works both sides of security — finds the weakness, then closes it",
      proof: "Ethical hacking and hardened, secure-by-default builds"
    },
    {
      icon: "✦", name: "From First Principles", tier: "gold", when: "2025",
      desc: "Built the fundamentals by hand instead of importing them",
      proof: "Dijkstra, A-star, hash tables and priority queues in C"
    },
    {
      icon: "◈", name: "Published Researcher", tier: "gold", when: "2026",
      desc: "A structured security study built on peer-reviewed sources",
      proof: "13 sources, OWASP and MITRE CWE mapped"
    },
    {
      icon: "⚔", name: "Dual Wield", tier: "silver", when: "2023 – now",
      desc: "Full-time study carried alongside two jobs",
      proof: "Three years, no break in enrolment"
    },
    {
      icon: "🛡", name: "Critical Infrastructure", tier: "silver", when: "2023 – 2025",
      desc: "Security operations on a regulated port",
      proof: "Maritime security at TasPorts"
    },
    {
      icon: "◇", name: "Polyglot", tier: "silver", when: "2023 – 2026",
      desc: "Shipped working code in seven languages",
      proof: "Python, C, Java, C#, PHP, JavaScript, Bash"
    },
    {
      icon: "⬢", name: "Deep Learner", tier: "silver", when: "2025",
      desc: "Trained neural networks beyond the tutorial level",
      proof: "CNNs, LSTMs, GANs and reinforcement learning agents"
    },
    {
      icon: "⬡", name: "Scaled Up", tier: "bronze", when: "2026",
      desc: "Took an analysis from one machine to a cluster",
      proof: "PySpark and Hadoop over multi-table data"
    },
    {
      icon: "▲", name: "Shipped It", tier: "bronze", when: "2026",
      desc: "Built and published this site on its own domain",
      proof: "Static, no framework, one data file"
    }
  ]
};
