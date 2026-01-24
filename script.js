document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // REGISTER SERVICE WORKER
  // =========================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker Registered', reg))
        .catch(err => console.error('Service Worker Failed', err));
    });
  }

  // =========================
  // INSTALL BANNER FOR PWA
  // =========================
  let deferredPrompt;
  const installBanner = document.getElementById('installBanner');
  const installBtn = document.getElementById('installBtn');
  const installText = document.getElementById('installText');

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    installText.innerText = 'To install ISO Sentinel on iOS: Tap Share (⬆) → Add to Home Screen';
    if (installBtn) installBtn.style.display = 'none';
    if (installBanner) installBanner.style.display = 'block';
  } else {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBanner) installBanner.style.display = 'block';
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        installBanner.style.display = 'none';
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const choiceResult = await deferredPrompt.userChoice;
          deferredPrompt = null;
          console.log('User choice:', choiceResult.outcome);
        }
      });
    }
  }

  // =========================
  // PAGE TRANSITION
  // =========================
  const transition = document.getElementById("page-transition");
  window.addEventListener("load", () => {
    if (transition) transition.classList.add("hide");
  });

  // =========================
  // SINGLE PAGE NAVIGATION
  // =========================
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll("header nav a, .mobile-nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.dataset.section;
      pages.forEach(page => page.classList.toggle("active", page.id === target));
      window.scrollTo({top: 0, behavior: "smooth"});
    });
  });

  // =========================
  // EXPLORER POPUP
  // =========================
  const explorer = document.getElementById("explorer");
  const expTitle = document.getElementById("exp-title");
  const expBody = document.getElementById("exp-body");
  const searchInput = document.getElementById("search");

  const contentDB = {
    "Introduction to Cyber Security":[
      {type:"pdf",title:"Cyber Notes",src:"docs/cyber.pdf"},
      {type:"video",title:"Intro Video",src:"https://www.youtube.com/embed/1D6xTfud7T4"},
      {type:"image",title:"Cyber Diagram",src:"images/cyber.png"}
    ],
    "Encryption":[
      {type:"pdf",title:"Encryption Guide",src:"docs/encryption.pdf"},
      {type:"video",title:"Encryption Explained",src:"https://www.youtube.com/embed/jhXCTbFnK8o"}
    ],
    "Discrete Mathematics":[
      {type:"video", title:"Boolean Algebra Intro 1", src:"https://www.youtube.com/embed/WW-NPtIzHwk"},
      {type:"video", title:"Boolean Algebra Intro 2", src:"https://www.youtube.com/embed/OjWmVCG8PLA"},
      {type:"video", title:"Boolean Algebra Examples 1", src:"https://www.youtube.com/embed/k04ksfLBuak"},
      {type:"video", title:"Boolean Algebra Examples 2", src:"https://www.youtube.com/embed/uPBYaCarXDM"},
      {type:"video", title:"Redundancy Theorem", src:"https://www.youtube.com/embed/3pbH9IhxwOg"},
      {type:"video", title:"Sum of Products SOP 1", src:"https://www.youtube.com/embed/xnLBbOYYnHM"},
      {type:"video", title:"Sum of Products SOP 2", src:"https://www.youtube.com/embed/NGgNoa0_zns"},
      {type:"video", title:"Product of Sums POS 1", src:"https://www.youtube.com/embed/nXsiLPJfDZ4"},
      {type:"video", title:"Product of Sums POS 2", src:"https://www.youtube.com/embed/ihTH1C6qCYI"},
      {type:"video", title:"SOP & POS Examples", src:"https://www.youtube.com/embed/K2cpJex0o_A"},
      {type:"video", title:"Canonical Conv 1", src:"https://www.youtube.com/embed/Km5pTz67uGc"},
      {type:"video", title:"Canonical Conv 2", src:"https://www.youtube.com/embed/f0trF1LtYZ4"},
      {type:"video", title:"Karnaugh Map Part 1", src:"https://www.youtube.com/embed/FPrcIhqNPVo"},
      {type:"video", title:"Karnaugh Map Part 2", src:"https://www.youtube.com/embed/uWjKzsWXAF4"},
      {type:"video", title:"Karnaugh Map Part 3", src:"https://www.youtube.com/embed/p7ittaZrZ1g"},
      {type:"video", title:"K'Map and Implicants", src:"https://www.youtube.com/embed/J_t_7npo0CE"},
      {type:"video", title:"Introduction to Graph theory", src:"https://www.youtube.com/embed/HkNdNpKUByM"},
      {type:"video", title:"Subgraphs, complements and complete graph", src:"https://www.youtube.com/embed/GHOHV6gTOd4"},
      {type:"video", title:"Isomorphisms and Bipartite graphs", src:"https://www.youtube.com/embed/W9nJRN3ajuk"},
      {type:"video", title:"Vertex Degree And Regular Graphs", src:"https://www.youtube.com/embed/k7ThfZIT_ac"}
    ],
    "Computer System Architecture":[
      {type:"video", title:"CPU Architecture", src:"https://www.youtube.com/embed/GtVDTp826DE"},
      {type:"video", title:"Introduction to Computer system Architecture", src:"https://www.youtube.com/embed/GRInNLx3Tug"},
      {type:"video", title:"Instruction Cycle & Processing", src:"https://www.youtube.com/embed/cO-H3tDqvXM"},
      {type:"video", title:"How do CPU work", src:"https://www.youtube.com/embed/16zrEPOsIcI"},
      {type:"video", title:"Computer memory architecture", src:"https://www.youtube.com/embed/ssfNW5oZ1Mw"}
    ],
    "Foundations of Intelligence":[
      {type:"video", title:"Cyber intelligence threat 1", src:"https://www.youtube.com/embed/75GCYd5pHjg"},
      {type:"video", title:"Cyber intelligence threat 2", src:"https://www.youtube.com/embed/V7hcnIQwdiE"},
      {type:"video", title:"Cyber threat intelligence 3", src:"https://www.youtube.com/embed/V-ByZhGV3es"}
    ],
    "Database Systems":[
      {type:"video", title:"Introduction to database management system (DBMS)", src:"https://www.youtube.com/embed/6Iu45VZGQDk"},
      {type:"video", title:"DBMS Characteristics", src:"https://www.youtube.com/embed/wClEbCyWryI"},
      {type:"video", title:"SQL course part 1", src:"https://www.youtube.com/embed/7S_tz1z_5bA"},
      {type:"video", title:"Database users", src:"https://www.youtube.com/embed/qoAL4MA3P08"},
      {type:"video", title:"Advantages and disadvantages of DBMS", src:"https://www.youtube.com/embed/YcYF-kxE0Sw"},
      {type:"video", title:"History of database application", src:"https://www.youtube.com/embed/-bMiKvZRzwk"}
    ],
    "Communication & Technical Writing":[
      {type:"video", title:"Effective Communication Skills", src:"https://www.youtube.com/embed/f2kyU2A5kyg"},
      {type:"video", title:"Technical Writing Fundamentals", src:"https://www.youtube.com/embed/xu14W5mZwk4"},
      {type:"video", title:"Professional Technical Documentation", src:"https://www.youtube.com/embed/so9jX3hf9dQ"}
    ]
  };

    // =========================
  // EXPLORER BUTTONS
  // =========================
  document.querySelectorAll(".explore-btn button").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.parentElement.dataset.title;
      expTitle.innerText = title;
      renderItems(contentDB[title] || []);
      explorer.style.display = "flex";
      searchInput.value = "";
    });
  });

  document.querySelector(".close").addEventListener("click", () => {
    explorer.style.display = "none";
  });

  // =========================
  // RENDER EXPLORER ITEMS
  // =========================
  function renderItems(items){
    expBody.innerHTML = "";
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "exp-item";
      div.dataset.type = item.type;
      if(item.type==="pdf") {
        div.innerHTML = `<h4>${item.title}</h4><a href="${item.src}" target="_blank">View PDF</a>`;
      }
      if(item.type==="video") {
        div.innerHTML = `<h4>${item.title}</h4><iframe src="${item.src}" allowfullscreen loading="lazy"></iframe>`;
      }
      if(item.type==="image") {
        div.innerHTML = `<h4>${item.title}</h4><img src="${item.src}" alt="${item.title}">`;
      }
      expBody.appendChild(div);
    });
    setupVideoPause();
  }

  // =========================
  // SEARCH FUNCTION
  // =========================
  searchInput.addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".exp-item").forEach(item => {
      item.style.display = item.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
  });

  // =========================
  // FILTER BUTTONS
  // =========================
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      document.querySelectorAll(".exp-item").forEach(item => {
        item.style.display = f==="all" || item.dataset.type===f ? "block" : "none";
      });
    });
  });

  // =========================
  // BACKGROUND MUSIC & VIDEO PAUSE
  // =========================
  const bgMusic = document.getElementById("bgMusic");
  let currentVideo = null;

  function setupVideoPause(){
    const iframes = expBody.querySelectorAll("iframe");
    iframes.forEach(iframe => {
      iframe.addEventListener("mouseenter", () => {
        if(bgMusic && !bgMusic.paused) bgMusic.pause();
        if(currentVideo && currentVideo !== iframe) {
          currentVideo.src = currentVideo.src; // stop previous
        }
        currentVideo = iframe;
      });
    });
  }

});
