/* ================= DATA ================= */
const courses = {
  "Computer System Architecture": [
    { title: "Introduction to CSA", content: "Computer system architecture explains how hardware and software components interact." }
  ],

  "Database System": [
    { title: "MySQL Introduction", content: "MySQL is an open-source relational database management system widely used in applications." },
    { title: "Database Models", content: "Common database models include relational, hierarchical, and network models." }
  ],

  "Foundations of Intelligence": [
    { title: "Introduction to Intelligence", content: "Foundations of intelligence focus on reasoning, learning, and problem-solving." }
  ],

  "Communication and Technical Writings": [
    { title: "Technical Writing Basics", content: "Technical writing emphasizes clarity and structured communication." }
  ],

  "Discrete Mathematics": [
    { title: "Sets and Logic", content: "Discrete mathematics deals with sets, relations, and logical reasoning." }
  ],

  "Introduction to Cyber Security": [
    { title: "Cyber Security Basics", content: "Cyber security protects systems, networks, and data from digital attacks." }
  ],

  "Other Related Context": [
    { title: "Emerging Technologies", content: "AI, blockchain, and cloud computing shape the future of technology." }
  ]
};

/* ================= STATE ================= */
let currentCourse = null;
let currentLessonIndex = null;

/* ================= ELEMENTS ================= */
const sidebar = document.getElementById("sidebar");
const lessonTitle = document.getElementById("lessonTitle");
const lessonContent = document.getElementById("lessonContent");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

/* ================= SIDEBAR ================= */
function loadSidebar() {
  sidebar.innerHTML = "";

  for (let course in courses) {
    const link = document.createElement("a");
    link.textContent = course;
    link.href = "#";

    if (course === currentCourse) link.classList.add("active");

    link.onclick = () => {
      currentCourse = course;
      currentLessonIndex = null;
      sidebar.style.display = "block";
      loadSidebar();
      loadTopicView();
    };

    sidebar.appendChild(link);
  }
}

/* ================= HOME ================= */
function loadHome() {
  currentCourse = null;
  currentLessonIndex = null;

  sidebar.style.display = "block";
  loadSidebar();

  lessonTitle.textContent = "ISO Sentinel – Cyber Learning Platform";

  let html = `
    <p>
      Welcome to <strong>ISO Sentinel</strong>, a modern cyber learning platform
      designed to build strong foundations in computing, databases, and cybersecurity.
    </p>
    <h2>Available Learning Topics</h2>
    <ul>
  `;

  for (let course in courses) {
    html += `
      <li style="margin-bottom:10px;">
        <a href="#" style="font-weight:bold;color:#04aa6d"
           onclick="selectCourse('${course}')">
           ${course}
        </a>
      </li>
    `;
  }

  html += `</ul>`;

  lessonContent.innerHTML = html;

  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}

/* Helper for Home */
function selectCourse(course) {
  currentCourse = course;
  loadSidebar();
  loadTopicView();
}

/* ================= TOPIC VIEW ================= */
function loadTopicView() {
  lessonTitle.textContent = currentCourse;

  let html = `<p>Select a subtopic below:</p><ul>`;

  courses[currentCourse].forEach((lesson, index) => {
    html += `
      <li style="margin-bottom:10px;">
        <a href="#" style="color:#04aa6d;font-weight:bold"
           onclick="openLesson(${index})">
           ${lesson.title}
        </a>
      </li>
    `;
  });

  html += `</ul>`;

  lessonContent.innerHTML = html;

  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}

/* ================= LESSON VIEW ================= */
function openLesson(index) {
  currentLessonIndex = index;

  const lesson = courses[currentCourse][currentLessonIndex];

  lessonTitle.textContent = lesson.title;
  lessonContent.innerHTML = `<p>${lesson.content}</p>`;

  prevBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";
}

/* ================= NAVIGATION ================= */
prevBtn.onclick = () => {
  if (currentLessonIndex > 0) {
    openLesson(currentLessonIndex - 1);
  }
};

nextBtn.onclick = () => {
  if (currentLessonIndex < courses[currentCourse].length - 1) {
    openLesson(currentLessonIndex + 1);
  }
};

/* ================= STATIC PAGES ================= */
function loadAbout() {
  sidebar.style.display = "none";
  lessonTitle.textContent = "About ISO Sentinel";
  lessonContent.innerHTML = `
    <p><strong>ISO Sentinel</strong> is a cyber learning platform focused on
    secure, structured, and practical technology education.</p>
  `;
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}

function loadReferences() {
  sidebar.style.display = "none";
  lessonTitle.textContent = "References";
  lessonContent.innerHTML = `
    <ul>
      <li>MySQL Official Documentation</li>
      <li>MDN Web Docs</li>
      <li>OWASP Top 10</li>
      <li>NIST Cybersecurity Framework</li>
    </ul>
  `;
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}

function loadExercises() {
  sidebar.style.display = "none";
  lessonTitle.textContent = "Exercises";
  lessonContent.innerHTML = `
    <h3>Exercise 1</h3>
    <p>Explain the difference between a database and a DBMS.</p>
    <h3>Exercise 2</h3>
    <p>Describe the main components of a CPU.</p>
  `;
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}

/* ================= INIT ================= */
loadHome();
