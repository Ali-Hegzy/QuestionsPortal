const QUESTIONS = [
    // ==================== Chapter 1: Introduction ====================
    {
        id: 1,
        type: "mcq",
        q: "An operating system is best described as:",
        opts: [
            "An application program such as a compiler or a word processor",
            "A program that acts as an intermediary between the user and the computer hardware",
            "A network protocol that connects computers together",
            "A hardware component that speeds up the CPU"
        ],
        ans: 1,
        why: "The OS sits between users (and their programs) and the hardware. It hides hardware complexity and lets programs use the machine safely and easily."
    },
    {
        id: 2,
        type: "mcq",
        q: "Which of the following is NOT one of the stated goals of an operating system?",
        opts: [
            "Use the computer hardware in an efficient manner",
            "Maximize the number of application programs installed on the machine",
            "Make the computer system convenient to use",
            "Execute user programs and make solving user problems easier"
        ],
        ans: 1,
        why: "The slide lists exactly three goals: execute programs / make problem solving easier, convenience, and efficient use of hardware. The number of installed programs is not an OS goal."
    },
    {
        id: 3,
        type: "mcq",
        q: "A large shared server OS squeezes the maximum use out of its hardware but has a harsh, hard-to-use interface. Which goal is it favoring, and over which?",
        opts: [
            "Efficiency over convenience",
            "Program execution over efficiency",
            "Convenience over efficiency",
            "Convenience over program execution"
        ],
        ans: 0,
        why: "The OS goals can conflict. Expensive shared machines usually favor efficient hardware use; personal computers usually favor convenience for a single user."
    },
    {
        id: 4,
        type: "mcq",
        q: "Which component provides the basic computing resources such as the CPU, memory and I/O devices?",
        opts: [
            "Operating system",
            "Hardware",
            "Users",
            "Application programs"
        ],
        ans: 1,
        why: "Hardware is the physical layer that supplies the raw resources; every other component builds on it."
    },
    {
        id: 5,
        type: "mcq",
        q: "Compilers, database systems, video games and business programs are all examples of:",
        opts: [
            "Users",
            "Operating systems",
            "Hardware",
            "Application programs"
        ],
        ans: 3,
        why: "Application programs define how system resources are used to solve the users' computing problems."
    },
    {
        id: 6,
        type: "mcq",
        q: "Which statement correctly describes the role of the OS among the four system components?",
        opts: [
            "It controls and coordinates the use of the hardware among the various application programs for the various users",
            "It is the physical provider of the CPU, memory and I/O devices",
            "It directly solves the users' computing problems, such as payroll or games",
            "It is a type of user that interacts with the application programs"
        ],
        ans: 0,
        why: "The OS does no \"useful work\" by itself; it is the coordinator that lets many programs and users share the hardware correctly."
    },
    {
        id: 7,
        type: "mcq",
        q: "In the abstract view of a computer system, which layer is at the very bottom?",
        opts: [
            "Computer hardware",
            "System and application programs",
            "Operating system",
            "Users"
        ],
        ans: 0,
        why: "The diagram stacks: users → system & application programs → operating system → computer hardware (bottom)."
    },
    {
        id: 8,
        type: "tf",
        q: "In the abstract view, users interact directly with the computer hardware without passing through any programs.",
        ans: false,
        why: "False. Users work through system and application programs (compiler, editor, database…), which use the OS, which in turn controls the hardware."
    },
    {
        id: 9,
        type: "mcq",
        q: "Why does the abstract view place the operating system between the application programs and the hardware?",
        opts: [
            "So that programs reach the hardware only through the OS, which controls and coordinates its use",
            "Because the OS is physically part of the hardware",
            "Because the OS runs slower than the hardware and must be separated from it",
            "Because application programs are written by the users themselves"
        ],
        ans: 0,
        why: "Putting the OS in the middle means no program touches the hardware directly; the OS can share, protect and manage it for everyone."
    },
    {
        id: 10,
        type: "mcq",
        q: "The one program running at all times on the computer is called the:",
        opts: [
            "Loader",
            "Kernel",
            "Compiler",
            "Shell"
        ],
        ans: 1,
        why: "By this definition, the kernel is the OS core that is always running; everything else is an application program."
    },
    {
        id: 11,
        type: "mcq",
        q: "Viewing the OS as a \"resource allocator\" means that it:",
        opts: [
            "Runs only when a user logs in to the system",
            "Translates programs written in high-level languages into machine code",
            "Manages and allocates resources such as CPU time, memory and I/O devices among competing requests",
            "Only controls the operation of I/O devices"
        ],
        ans: 2,
        why: "As a resource allocator, the OS decides who gets which resource and for how long, keeping use fair and efficient."
    },
    {
        id: 12,
        type: "mcq",
        q: "An OS stops a buggy program from overwriting another program's memory and supervises all I/O operations. Which definition does this behavior match best?",
        opts: [
            "Control program",
            "Application program",
            "Resource allocator",
            "Kernel module"
        ],
        ans: 0,
        why: "A control program controls the execution of user programs and the operation of I/O devices to prevent errors and improper use."
    },
    {
        id: 13,
        type: "mcq",
        q: "What was the main idea behind batch systems?",
        opts: [
            "Reduce setup time by batching similar jobs together",
            "Guarantee that each job finishes before a deadline",
            "Share one memory among several CPUs",
            "Allow users to interact with programs while they run"
        ],
        ans: 0,
        why: "Grouping similar jobs (e.g., all FORTRAN jobs) avoided repeating the same setup work for each job."
    },
    {
        id: 14,
        type: "mcq",
        q: "Which sequence correctly describes how the resident monitor works?",
        opts: [
            "The monitor lets users interact with their jobs while they are running",
            "The monitor has initial control, transfers control to a job, and regains control when the job completes",
            "The monitor is a hardware device that physically sorts job cards",
            "The monitor runs several user jobs in parallel on different CPUs"
        ],
        ans: 1,
        why: "The resident monitor stays in memory: monitor → job → back to monitor → next job. This is automatic job sequencing."
    },
    {
        id: 15,
        type: "mcq",
        q: "Automatic job sequencing (automatically transferring control from one job to the next) is historically considered:",
        opts: [
            "The first form of multiprocessing",
            "The first rudimentary operating system",
            "The first time-sharing system",
            "The first distributed system"
        ],
        ans: 1,
        why: "Before it, operators loaded each job by hand. Letting software pass control from job to job was the seed of the modern OS."
    },
    {
        id: 16,
        type: "mcq",
        q: "In a simple batch system, main memory is divided into:",
        opts: [
            "A shared memory area and local memory areas",
            "A ROM area and a cache area",
            "A kernel area and several user job areas",
            "An operating system area and a user program area"
        ],
        ans: 3,
        why: "The diagram shows just two regions: the OS (resident monitor) and a single user program area."
    },
    {
        id: 17,
        type: "mcq",
        q: "How many user jobs occupy main memory at the same time in this simple batch layout?",
        opts: [
            "As many as can fit",
            "One per CPU",
            "One",
            "Two"
        ],
        ans: 2,
        why: "There is only one user program area, so only one job is in memory at a time."
    },
    {
        id: 18,
        type: "mcq",
        q: "What is the main drawback of this simple batch memory layout?",
        opts: [
            "It requires multiple CPUs to work",
            "The operating system cannot be stored in memory",
            "Memory becomes fragmented among many jobs",
            "The CPU sits idle whenever the single job waits for I/O"
        ],
        ans: 3,
        why: "With only one job in memory, nothing else can use the CPU during slow I/O. This waste is exactly what multiprogramming solves."
    },
    {
        id: 19,
        type: "mcq",
        q: "In a multiprogrammed system:",
        opts: [
            "All jobs are kept on disk and never loaded into memory",
            "Each job is given its own separate CPU",
            "Only one job is kept in memory at a time",
            "Several jobs are kept in main memory at the same time and the CPU is multiplexed among them"
        ],
        ans: 3,
        why: "Multiprogramming keeps several jobs in memory so the CPU always has something to run."
    },
    {
        id: 20,
        type: "mcq",
        q: "What is the main benefit of multiprogramming?",
        opts: [
            "It lets users interact with each program while it runs",
            "It removes the need for memory management",
            "It guarantees that every job meets a strict deadline",
            "Higher CPU utilization: when one job waits for I/O, the CPU switches to another job"
        ],
        ans: 3,
        why: "Keeping the CPU busy during I/O waits is the whole point of multiprogramming."
    },
    {
        id: 21,
        type: "tf",
        q: "Multiprogramming by itself guarantees that users can interact with their programs while the programs are running.",
        ans: false,
        why: "False. Interactive use is the goal of time-sharing. Plain multiprogramming only aims to keep the CPU busy; the user may still wait for results."
    },
    {
        id: 22,
        type: "mcq",
        q: "Which OS feature chooses among several jobs that are ready to run?",
        opts: [
            "Allocation of devices",
            "I/O routine supplied by the system",
            "Memory management",
            "CPU scheduling"
        ],
        ans: 3,
        why: "CPU scheduling decides which ready job gets the CPU next."
    },
    {
        id: 23,
        type: "mcq",
        q: "Why is memory management required for multiprogramming?",
        opts: [
            "Several jobs must be in memory at the same time, so the OS must allocate memory among them",
            "Because only one job is ever kept in memory",
            "Because it makes the CPU clock faster",
            "Because it is needed to connect computers over a network"
        ],
        ans: 0,
        why: "Multiple jobs share memory, so the OS must decide where each one goes and keep them from overlapping."
    },
    {
        id: 24,
        type: "mcq",
        q: "Which of the following is NOT listed as an OS feature needed for multiprogramming?",
        opts: [
            "Network routing between computers",
            "Allocation of devices",
            "CPU scheduling",
            "I/O routine supplied by the system"
        ],
        ans: 0,
        why: "The four features are: system-supplied I/O routines, memory management, CPU scheduling and device allocation. Networking is unrelated."
    },
    {
        id: 25,
        type: "mcq",
        q: "Time-sharing systems are also known as:",
        opts: [
            "Interactive computing systems",
            "Batch processing systems",
            "Clustered systems",
            "Real-time systems"
        ],
        ans: 0,
        why: "The slide title says it: time-sharing = interactive computing, because users interact with programs while they run."
    },
    {
        id: 26,
        type: "mcq",
        q: "What allows users to interact with each program while it is running in a time-sharing system?",
        opts: [
            "Jobs are batched together to reduce setup time",
            "Each user is given a dedicated CPU",
            "Switches between jobs occur so frequently that each user seems to have the machine",
            "Programs are stored permanently in ROM"
        ],
        ans: 2,
        why: "Rapid switching (very short time slices) makes the response feel immediate to every user."
    },
    {
        id: 27,
        type: "mcq",
        q: "In a time-sharing system, the CPU is allocated to a job only if:",
        opts: [
            "The job has finished its I/O on another machine",
            "The job is stored on disk",
            "The job has the nearest hard deadline",
            "The job is in memory; jobs may be swapped in and out between memory and disk"
        ],
        ans: 3,
        why: "The CPU can only execute what is in main memory. Swapping moves jobs between disk and memory to share it among users."
    },
    {
        id: 28,
        type: "mcq",
        q: "A personal computer (desktop system) is a computer system dedicated to:",
        opts: [
            "Controlling scientific experiments only",
            "Many users at the same time",
            "A single user",
            "Running batch jobs only"
        ],
        ans: 2,
        why: "Desktop systems are personal computers used by one person at a time."
    },
    {
        id: 29,
        type: "mcq",
        q: "Which goal is emphasized most by desktop systems?",
        opts: [
            "High availability through clustering",
            "User convenience and responsiveness",
            "Maximum CPU utilization",
            "Meeting hard real-time deadlines"
        ],
        ans: 1,
        why: "Since the machine serves one person, making it pleasant and responsive matters more than squeezing every CPU cycle."
    },
    {
        id: 30,
        type: "mcq",
        q: "Why did early desktop operating systems often skip advanced CPU-utilization and protection features?",
        opts: [
            "Desktop hardware could not execute any operating system",
            "Desktop systems were always part of a distributed network",
            "Desktop systems were real-time systems with hard deadlines",
            "Individuals usually had sole use of the computer, so there was little to share or protect"
        ],
        ans: 3,
        why: "With one user owning the whole machine, sharing and protection between users mattered much less (this changed later with networking and security threats)."
    },
    {
        id: 31,
        type: "mcq",
        q: "\"Throughput\" in a parallel system means:",
        opts: [
            "The time needed to finish a single process",
            "The total size of main memory",
            "The number of CPUs in the system",
            "The number of processes completed per unit time"
        ],
        ans: 3,
        why: "Throughput measures how much work gets done per unit time; more CPUs → more processes finished per second."
    },
    {
        id: 32,
        type: "mcq",
        q: "In a tightly coupled system, the processors:",
        opts: [
            "Do not communicate with each other at all",
            "Each have their own local memory and communicate over telephone lines",
            "Share only disk storage, like a cluster",
            "Share memory, clock, bus and peripheral devices, and communicate through shared memory"
        ],
        ans: 3,
        why: "Tightly coupled = close together, sharing memory and clock. Loosely coupled (distributed) systems have separate memories."
    },
    {
        id: 33,
        type: "mcq",
        q: "\"Graceful degradation\" in a multiprocessor system means:",
        opts: [
            "The system detects, diagnoses and corrects software failures while continuing to run",
            "The whole system shuts down safely when one processor fails",
            "The failure of one processor does not halt the system; it only slows it down",
            "The system restarts automatically after any failure"
        ],
        ans: 2,
        why: "The second option describes a fail-soft system. Graceful degradation is about losing performance, not losing the whole system."
    },
    {
        id: 34,
        type: "mcq",
        q: "In symmetric multiprocessing (SMP):",
        opts: [
            "The processors do not share memory",
            "One master processor schedules work for slave processors",
            "Each processor is assigned one specific task only",
            "Each processor runs an identical copy of the operating system"
        ],
        ans: 3,
        why: "In SMP all processors are peers running the same OS copy; no processor is the \"boss\"."
    },
    {
        id: 35,
        type: "mcq",
        q: "In asymmetric multiprocessing:",
        opts: [
            "Each processor runs an identical copy of the OS",
            "The processors are located in different cities",
            "A master processor schedules and allocates work to slave processors",
            "All processors are equal peers"
        ],
        ans: 2,
        why: "Asymmetric = master–slave relationship; each processor has a specific assigned task."
    },
    {
        id: 36,
        type: "mcq",
        q: "Which statement is correct according to the slide?",
        opts: [
            "Both are used only in extremely large systems",
            "Modern operating systems support neither form",
            "Asymmetric multiprocessing is more common in extremely large systems, while most modern OSes support SMP",
            "SMP is more common in extremely large systems, while most modern OSes support asymmetric multiprocessing"
        ],
        ans: 2,
        why: "The slide states: most modern OSes support SMP; asymmetric multiprocessing is more common in extremely large systems."
    },
    {
        id: 37,
        type: "tf",
        q: "In the SMP architecture diagram, all the CPUs are connected to one shared memory.",
        ans: true,
        why: "True. The diagram shows several CPUs attached by a common bus to a single memory."
    },
    {
        id: 38,
        type: "mcq",
        q: "In the SMP architecture diagram, what connects the CPUs to memory?",
        opts: [
            "A shared bus",
            "Separate network links, one per CPU",
            "A central server machine",
            "Nothing; each CPU has its own private memory"
        ],
        ans: 0,
        why: "All CPUs share one bus leading to the single memory module."
    },
    {
        id: 39,
        type: "mcq",
        q: "As more and more CPUs are added to this SMP design, what becomes a likely performance bottleneck?",
        opts: [
            "Each CPU needs its own copy of the disk",
            "The CPUs lose the ability to communicate",
            "Contention for the shared bus and shared memory",
            "The system clock stops being shared"
        ],
        ans: 2,
        why: "Every CPU uses the same bus and memory, so they start waiting for each other as their number grows."
    },
    {
        id: 40,
        type: "mcq",
        q: "Distributed systems are also called:",
        opts: [
            "Tightly coupled systems",
            "Single-processor systems",
            "Hard real-time systems",
            "Loosely coupled systems"
        ],
        ans: 3,
        why: "Processors in a distributed system are separate machines that share no memory or clock, hence \"loosely coupled\"."
    },
    {
        id: 41,
        type: "mcq",
        q: "In a distributed system, each processor:",
        opts: [
            "Has no memory of its own at all",
            "Shares one memory and one clock with all the others",
            "Has its own local memory and communicates with others through communication lines",
            "Shares only disk storage, exactly like a cluster"
        ],
        ans: 2,
        why: "Communication happens over lines such as high-speed buses or telephone lines, not through shared memory."
    },
    {
        id: 42,
        type: "mcq",
        q: "A large computation is split into parts that run at the same time on several sites. Which advantage of distributed systems does this illustrate?",
        opts: [
            "Reliability",
            "Communications",
            "Computation speed-up (load sharing)",
            "Resource sharing"
        ],
        ans: 2,
        why: "Dividing work across machines so it finishes sooner is computation speed-up, also called load sharing."
    },
    {
        id: 43,
        type: "mcq",
        q: "A network that covers a room, a floor or a building is a:",
        opts: [
            "Wide area network (WAN)",
            "Peer-to-peer backbone",
            "Local area network (LAN)",
            "Shared system bus"
        ],
        ans: 2,
        why: "LANs are small-area networks; WANs connect buildings, cities or countries."
    },
    {
        id: 44,
        type: "mcq",
        q: "Distributed systems may be organized as:",
        opts: [
            "Client-server systems only",
            "Client-server or peer-to-peer systems",
            "Symmetric or asymmetric multiprocessing systems",
            "Master-slave systems only"
        ],
        ans: 1,
        why: "The slide lists both client-server and peer-to-peer organizations. SMP/AMP describe multiprocessors, not distributed systems."
    },
    {
        id: 45,
        type: "mcq",
        q: "A company wants to link its branch offices located in different cities. Which network type does it need?",
        opts: [
            "Wide area network (WAN)",
            "Local area network (LAN)",
            "A shared memory bus",
            "A symmetric multiprocessor"
        ],
        ans: 0,
        why: "Connecting sites between buildings, cities or countries is the job of a WAN."
    },
    {
        id: 46,
        type: "mcq",
        q: "In the client-server diagram, the clients and the server are connected through:",
        opts: [
            "A network",
            "ROM chips",
            "Shared memory",
            "The system bus of one computer"
        ],
        ans: 0,
        why: "Clients and the server are separate machines joined by a network line."
    },
    {
        id: 47,
        type: "mcq",
        q: "What is the role of the server in a client-server system?",
        opts: [
            "It is a peripheral device such as a printer",
            "It only sends requests to the clients",
            "It runs only on the client's own machine",
            "It provides services or resources requested by many clients"
        ],
        ans: 3,
        why: "Clients ask; the server answers (e.g., file server, database server, web server)."
    },
    {
        id: 48,
        type: "mcq",
        q: "How does a peer-to-peer system differ from the client-server structure shown?",
        opts: [
            "Peer-to-peer systems use no network at all",
            "One single server serves every node",
            "Peer-to-peer nodes share one memory and clock",
            "Every node can act as both a client and a server"
        ],
        ans: 3,
        why: "In peer-to-peer there is no fixed central server; any peer may request or provide a service."
    },
    {
        id: 49,
        type: "mcq",
        q: "Clustering allows two or more systems to share:",
        opts: [
            "A single processor",
            "One keyboard",
            "The same CPU clock",
            "Storage"
        ],
        ans: 3,
        why: "Clustered systems are separate computers linked together that share storage."
    },
    {
        id: 50,
        type: "mcq",
        q: "What is the main goal of clustered systems?",
        opts: [
            "Supporting small display screens",
            "Lowering the cost of a single PC",
            "Meeting hard real-time deadlines",
            "High reliability and high availability"
        ],
        ans: 3,
        why: "If one machine fails, another takes over, so the service stays available."
    },
    {
        id: 51,
        type: "mcq",
        q: "In asymmetric clustering:",
        opts: [
            "Each node runs a different operating system copy with no shared storage",
            "A master processor schedules work for slave CPUs inside one machine",
            "All N hosts run the application at the same time",
            "One server runs the application while the other servers stand by, ready to take over if it fails"
        ],
        ans: 3,
        why: "The standby server monitors the active one and becomes active on failure. In symmetric clustering, all N hosts run the application."
    },
    {
        id: 52,
        type: "mcq",
        q: "The defining characteristic of a real-time system is:",
        opts: [
            "Well-defined, fixed time constraints",
            "Many interactive users at once",
            "Batching similar jobs together",
            "Sharing storage between machines"
        ],
        ans: 0,
        why: "Real-time systems must finish processing within defined time limits."
    },
    {
        id: 53,
        type: "mcq",
        q: "Which is a typical use of a real-time system?",
        opts: [
            "Browsing web pages",
            "Controlling scientific experiments, medical imaging or industrial control systems",
            "Writing documents in a word processor",
            "Running end-of-month payroll batches"
        ],
        ans: 1,
        why: "Real-time systems are usually control devices in dedicated applications."
    },
    {
        id: 54,
        type: "tf",
        q: "A real-time system that produces the correct result, but after its deadline, is still considered to have worked correctly.",
        ans: false,
        why: "False. In real-time systems correctness depends on both the result and the time it was produced. A late answer is a failure."
    },
    {
        id: 55,
        type: "mcq",
        q: "Which type of system is NOT supported by general-purpose operating systems?",
        opts: [
            "Hard real-time",
            "Desktop",
            "Soft real-time",
            "Time-sharing"
        ],
        ans: 0,
        why: "Hard real-time conflicts with time-sharing and is not supported by general-purpose OSes."
    },
    {
        id: 56,
        type: "mcq",
        q: "In a soft real-time system:",
        opts: [
            "Secondary storage is limited or absent",
            "Deadlines can never be missed under any condition",
            "A real-time task gets priority over other tasks and keeps it until it completes",
            "No operating-system features are used"
        ],
        ans: 2,
        why: "Soft real-time gives priority but no absolute guarantee. Limited or no secondary storage is a hard real-time trait."
    },
    {
        id: 57,
        type: "mcq",
        q: "Multimedia and virtual-reality applications are best served by which kind of system, and why?",
        opts: [
            "Soft real-time, because they need advanced OS features and an occasional missed deadline is tolerable",
            "Hard real-time, because they require no secondary storage",
            "Batch, because similar frames can be grouped together",
            "Hard real-time, because their data must be stored in ROM"
        ],
        ans: 0,
        why: "A dropped video frame is annoying but not dangerous, and these apps need rich OS features, which soft real-time allows."
    },
    {
        id: 58,
        type: "mcq",
        q: "Which are examples of handheld systems?",
        opts: [
            "Mainframes and minicomputers",
            "Supercomputers",
            "Clusters and server farms",
            "Personal Digital Assistants (PDAs) and cellular telephones"
        ],
        ans: 3,
        why: "The slide gives PDAs and cell phones as handheld systems."
    },
    {
        id: 59,
        type: "mcq",
        q: "Which of the following is NOT one of the issues listed for handheld systems?",
        opts: [
            "Small display screens",
            "Slow processors",
            "Too many CPUs to schedule",
            "Limited memory"
        ],
        ans: 2,
        why: "The listed issues are limited memory, slow processors and small screens."
    },
    {
        id: 60,
        type: "mcq",
        q: "Given limited memory and slow processors, what should a handheld OS designer do?",
        opts: [
            "Design large, desktop-style windows for every application",
            "Copy mainframe features unchanged onto the device",
            "Keep the OS small and manage memory and processor use efficiently, avoiding heavy features",
            "Run many background services at all times"
        ],
        ans: 2,
        why: "Scarce resources mean the OS must be lean; features must fit the device's limits."
    },
    {
        id: 61,
        type: "mcq",
        q: "What is the main message of the \"migration of OS concepts\" chart?",
        opts: [
            "Each class of computer developed its features completely independently",
            "Features always move from handhelds up to mainframes",
            "Features first developed for mainframes gradually migrated to minicomputers, desktops and then handhelds",
            "Handheld computers invented most OS features first"
        ],
        ans: 2,
        why: "Ideas like compilers, time-sharing and multiuser support appeared first on mainframes and spread to smaller machines over time."
    },
    {
        id: 62,
        type: "mcq",
        q: "In the chart, which operating system appears along the arrow as concepts migrate from MULTICS down to smaller computers?",
        opts: [
            "Windows",
            "UNIX",
            "Mac OS",
            "MS-DOS"
        ],
        ans: 1,
        why: "The chart shows MULTICS on mainframes leading to UNIX on minicomputers, desktops and handhelds."
    },
    {
        id: 63,
        type: "mcq",
        q: "Why do OS concepts migrate from large machines to smaller ones?",
        opts: [
            "Because handheld devices need multiuser batch processing",
            "Because mainframes were completely abandoned",
            "Because the features were patented only for small computers",
            "As small computers become cheaper and more powerful, they can support features that once required expensive mainframes"
        ],
        ans: 3,
        why: "Hardware improvements make it worthwhile to reuse proven ideas on smaller machines."
    },
    {
        id: 64,
        type: "mcq",
        q: "Which computing environments are listed on the slide?",
        opts: [
            "Batch, time-sharing and real-time computing",
            "SMP, asymmetric and clustered computing",
            "LAN, WAN and peer-to-peer computing",
            "Traditional, web-based and embedded computing"
        ],
        ans: 3,
        why: "The three environments shown are traditional, web-based and embedded computing."
    },
    {
        id: 65,
        type: "mcq",
        q: "Operating systems for embedded computing usually:",
        opts: [
            "Are general-purpose multiuser systems",
            "Provide limited features and have little or no user interface",
            "Run time-sharing for many interactive users",
            "Provide a rich graphical user interface"
        ],
        ans: 1,
        why: "Embedded OSes run dedicated real-time tasks inside devices, so they need few features and almost no UI."
    },
    {
        id: 66,
        type: "mcq",
        q: "The controller inside a microwave oven is best classified as:",
        opts: [
            "Traditional computing",
            "A clustered system",
            "Web-based computing",
            "Embedded computing running an embedded real-time OS"
        ],
        ans: 3,
        why: "It is a dedicated device with timing needs and almost no UI: a textbook embedded system."
    },
    {
        id: 67,
        type: "mcq",
        q: "An interrupt is:",
        opts: [
            "A user application program",
            "A signal, usually from hardware, that makes the CPU pause its current work and run a service routine",
            "A type of main memory",
            "A message sent between two networked computers"
        ],
        ans: 1,
        why: "Devices (e.g., keyboard, disk) raise interrupts to get the CPU's attention; the CPU runs the matching interrupt service routine, then resumes."
    },
    {
        id: 68,
        type: "mcq",
        q: "A trap is:",
        opts: [
            "The program that boots the computer",
            "A secondary storage device",
            "A software-generated interrupt caused by an error or by a user request for an OS service",
            "A hardware timer inside the CPU"
        ],
        ans: 2,
        why: "Traps come from software: errors (like division by zero) or system calls asking the OS to do something."
    },
    {
        id: 69,
        type: "mcq",
        q: "A user program divides a number by zero. What happens?",
        opts: [
            "Nothing; the program simply continues running",
            "A hardware interrupt is raised by an I/O device",
            "The system reboots through the bootstrap program",
            "A trap (exception) is generated and control transfers to the operating system"
        ],
        ans: 3,
        why: "The error is caused by the running software itself, so it produces a trap; the OS then decides how to handle it (usually terminating the program)."
    },

];