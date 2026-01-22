document.addEventListener("DOMContentLoaded",()=>{

/* =========================
   PAGE TRANSITION
========================= */
const transition=document.createElement("div");
transition.id="page-transition";
transition.innerHTML="LOADING...";
document.body.appendChild(transition);

window.addEventListener("load",()=>{
  transition.classList.add("hide");
});

/* =========================
   EXPLORER OVERLAY
========================= */
const explorer=document.createElement("div");
explorer.id="explorer";
explorer.innerHTML=`
<div class="explorer-box">
  <span class="close">✖</span>
  <h2 id="exp-title"></h2>

  <input type="text" id="search" placeholder="Search content...">

  <div class="filters">
    <button data-filter="all">All</button>
    <button data-filter="pdf">PDF</button>
    <button data-filter="video">Video</button>
    <button data-filter="image">Image</button>
  </div>

  <div id="exp-body"></div>
</div>`;
document.body.appendChild(explorer);

/* =========================
   DYNAMIC STYLES
========================= */
const css=document.createElement("style");
css.textContent=`
#page-transition{
  position:fixed;inset:0;
  background:#020216;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#00fff7;
  font-size:2rem;
  z-index:10000;
}
#page-transition.hide{
  animation:fadeOut .8s forwards;
}
@keyframes fadeOut{
  to{opacity:0;visibility:hidden}
}
#explorer{
  position:fixed;inset:0;
  display:none;
  background:rgba(0,0,30,.96);
  justify-content:center;
  align-items:center;
  z-index:9999;
}
.explorer-box{
  width:95%;max-width:1200px;
  max-height:90vh;
  overflow:auto;
  background:#060620;
  padding:35px;
  border-radius:30px;
}
.close{
  float:right;
  cursor:pointer;
  font-size:22px;
}
#search{
  width:100%;
  padding:15px;
  margin:20px 0;
  border-radius:14px;
  border:none;
}
.filters button{
  margin:5px;
  padding:10px 18px;
  border:none;
  border-radius:20px;
  cursor:pointer;
}
#exp-body{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:25px;
}
.exp-item{
  background:#0c0c30;
  padding:20px;
  border-radius:18px;
}
.exp-item iframe,
.exp-item img{
  width:100%;
  border-radius:14px;
}
`;
document.head.appendChild(css);

/* =========================
   CONTENT DATABASE
========================= */
const contentDB={
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
    {type:"video", title:"Boolean Algebra Intro 1", src:"https://www.youtube.com/embed/WW-NPtIzHwk?si=S6Et5sQ3A-AxTot-"},
    {type:"video", title:"Boolean Algebra Intro 2", src:"https://www.youtube.com/embed/OjWmVCG8PLA?si=DR1Ad8Ajome8e5dX"},
    {type:"video", title:"Boolean Algebra Examples 1", src:"https://www.youtube.com/embed/k04ksfLBuak?si=B11VKH4f5NhoV-ua"},
    {type:"video", title:"Boolean Algebra Examples 2", src:"https://www.youtube.com/embed/uPBYaCarXDM?si=unuS9kYIS0FsCSXj"},
    {type:"video", title:"Redundancy Theorem", src:"https://www.youtube.com/embed/3pbH9IhxwOg?si=4i1VSpMq9pVyJdo5"},
    {type:"video", title:"Sum of Products SOP 1", src:"https://www.youtube.com/embed/xnLBbOYYnHM?si=qY22czHyE62USTbq"},
    {type:"video", title:"Sum of Products SOP 2", src:"https://www.youtube.com/embed/NGgNoa0_zns?si=O1VOzVXhgPLc-VhI"},
    {type:"video", title:"Product of Sums POS 1", src:"https://www.youtube.com/embed/nXsiLPJfDZ4?si=ZLOfD3b9sPfISH6R"},
    {type:"video", title:"Product of Sums POS 2", src:"https://www.youtube.com/embed/ihTH1C6qCYI?si=KnGuXgunjKqH1-o9"},
    {type:"video", title:"SOP & POS Examples", src:"https://www.youtube.com/embed/K2cpJex0o_A?si=rJ0XZjTHR_3iiFPn"},
    {type:"video", title:"Canonical Conv 1", src:"https://www.youtube.com/embed/Km5pTz67uGc?si=UYpgJYboTvZep6LF"},
    {type:"video", title:"Canonical Conv 2", src:"https://www.youtube.com/embed/f0trF1LtYZ4?si=tbdeyvhmUHHp2ybX"},
    {type:"video", title:"Karnaugh Map Part 1", src:"https://www.youtube.com/embed/FPrcIhqNPVo?si=htI09DV2h38I4jxQ"},
    {type:"video", title:"Karnaugh Map Part 2", src:"https://www.youtube.com/embed/uWjKzsWXAF4?si=2OfzWi1xJtZ6U8cp"},
    {type:"video", title:"Karnaugh Map Part 3", src:"https://www.youtube.com/embed/p7ittaZrZ1g?si=rReZf3Y1YMwV41NO"},
    {type:"video", title:"K'Map and Implicants", src:"https://www.youtube.com/embed/J_t_7npo0CE?si=Gkh2Y8jvaUpPPZWd"},
    {type:"video", title:"Introduction to Graph theory", src:"https://www.youtube.com/embed/HkNdNpKUByM?si=qCrU23iwz0j_Ohuv"},
     {type:"video", title:"Subgraphs, complements and complete graph", src:"https://www.youtube.com/embed/GHOHV6gTOd4?si=UIakIC7UYIDFh_mF"},
    {type:"video", title:"Isomorphisms and Bipartite graphs", src:"https://www.youtube.com/embed/W9nJRN3ajuk?si=xAYeM6SMMhUB4ZsW"},
    {type:"video", title:"Vertex Degree And Regular Graphs", src:"https://www.youtube.com/embed/k7ThfZIT_ac?si=vUtouggDMZTOt2gA"},
    ],
"Computer System Architecture":[
  {
    type:"video",
    title:"CPU Architecture",
    src:"https://www.youtube.com/embed/GtVDTp826DE"
  },
  {
    type:"video",
    title:"Introduction to Computer system Architecture",
    src:"https://www.youtube.com/embed/GRInNLx3Tug"
  },
  {
    type:"video",
    title:"Instruction Cycle & Processing",
    src:"https://www.youtube.com/embed/cO-H3tDqvXM"
  },
  {
    type:"video",
    title:"How do CPU work",
    src:"https://www.youtube.com/embed/16zrEPOsIcI"
  },
  {
    type:"video",
    title:"Computer memory architecture",
    src:"https://www.youtube.com/embed/ssfNW5oZ1Mw"
  }
],

"Foundations of Intelligence":[
  {
    type:"video",
    title:"Cyber intelligence threat 1",
    src:"https://www.youtube.com/embed/75GCYd5pHjg?si=VuHAd2MOi4ty8Sf8"
  },
  {
    type:"video",
    title:"Cyber intelligence threat 2",
    src:"https://www.youtube.com/embed/V7hcnIQwdiE?si=qNRQSXb-g4zniXYQ"
  },
  {
    type:"video",
    title:"Cyber threat intelligence 3",
    src:"https://www.youtube.com/embed/V-ByZhGV3es?si=tJjVz86ZTpqnVpmew"
  }
],

"Database Systems":[
  {
    type:"video",
    title:"Introduction to database management system (DBMS)",
    src:"https://www.youtube.com/embed/6Iu45VZGQDk?si=8PQEm-YtficZ1Mo5"
  },
  {
    type:"video",
    title:"DBMS Characteristics",
    src:"https://www.youtube.com/embed/wClEbCyWryI?si=A1vBfvyxdngXdukk"
  },
  {
    type:"video",
    title:"SQL course part 1",
    src:"https://www.youtube.com/embed/7S_tz1z_5bA"
  },
   {
    type:"video",
    title:"Database users",
    src:"https://www.youtube.com/embed/qoAL4MA3P08?si=YIBOyQrxT9Wkhasx"
  },
  {
    type:"video",
    title:"Advantages and disadvantages of DBMS",
    src:"https://www.youtube.com/embed/YcYF-kxE0Sw?si=9J9rTA13BpdGwQor"
  },
  {
    type:"video",
    title:"History of database application",
    src:"https://www.youtube.com/embed/-bMiKvZRzwk?si=bKoRaIkiHFEhyCD_"
  }
],

"Communication & Technical Writing":[
  {
    type:"video",
    title:"Effective Communication Skills",
    src:"https://www.youtube.com/embed/f2kyU2A5kyg"
  },
  {
    type:"video",
    title:"Technical Writing Fundamentals",
    src:"https://www.youtube.com/embed/xu14W5mZwk4"
  },
  {
    type:"video",
    title:"Professional Technical Documentation",
    src:"https://www.youtube.com/embed/so9jX3hf9dQ"
  }
]

};

/* =========================
   OPEN EXPLORER
========================= */
document.querySelectorAll("button").forEach(btn=>{
  if(btn.textContent.includes("Explore")){
    btn.onclick=()=>{
      const title=btn.parentElement.textContent
        .replace("Explore","")
        .trim();
      document.getElementById("exp-title").innerText=title;
      explorer.style.display="flex";
      renderItems(contentDB[title]||[]);
    };
  }
});

/* =========================
   RENDER FUNCTION
========================= */
function renderItems(items){
  const body=document.getElementById("exp-body");
  body.innerHTML="";
  items.forEach(item=>{
    const div=document.createElement("div");
    div.className="exp-item";

    if(item.type==="pdf"){
      div.innerHTML=`<h4>${item.title}</h4>
      <a href="${item.src}" target="_blank">View PDF</a>`;
    }

    if(item.type==="video"){
      div.innerHTML=`<h4>${item.title}</h4>
      <iframe src="${item.src}" allowfullscreen loading="lazy"></iframe>`;
    }

    if(item.type==="image"){
      div.innerHTML=`<h4>${item.title}</h4>
      <img src="${item.src}" alt="${item.title}">`;
    }

    body.appendChild(div);
  });
}

/* =========================
   SEARCH ENGINE
========================= */
document.getElementById("search").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  document.querySelectorAll(".exp-item").forEach(item=>{
    item.style.display=
      item.innerText.toLowerCase().includes(q)
      ? "block"
      : "none";
  });
});

/* =========================
   FILTER BUTTONS
========================= */
document.querySelectorAll(".filters button").forEach(btn=>{
  btn.onclick=()=>{
    const f=btn.dataset.filter;
    document.querySelectorAll(".exp-item").forEach(item=>{
      item.style.display=
        f==="all" || item.innerHTML.includes(f)
        ? "block"
        : "none";
    });
  };
});

/* =========================
   CLOSE
========================= */
document.querySelector(".close").onclick=()=>{
  explorer.style.display="none";
};

});

