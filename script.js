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
      <iframe src="${item.src}" allowfullscreen></iframe>`;
    }

    if(item.type==="image"){
      div.innerHTML=`<h4>${item.title}</h4>
      <img src="${item.src}">`;
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
