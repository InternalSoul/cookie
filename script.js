const characters = [
  { name: "Holly" },
  { name: "Cameron" },
  { name: "Julieanne" },
  { name: "Alex" },
  { name: "Jackie" }
];

function initGame() {
  const charButtons = document.getElementById("characterButtons");
  const guessSelect = document.getElementById("guessSelect");

  characters.forEach(({ name }) => {
    const btn = document.createElement("button");
    btn.textContent = "Interview " + name;
    btn.onclick = () => {
      window.location.href = `dialog.html?name=${encodeURIComponent(name)}`;
    };
    charButtons.appendChild(btn);

    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    guessSelect.appendChild(opt);
  });

  createDeductionGrid();
}

// function makeGuess() {
//   const guess = document.getElementById("guessSelect").value;
//   const result = document.getElementById("result");
//   if (guess === "Holly") {
//     result.textContent = "🎉 Correct! Holly stole the Ginger Cookie!";
//     result.style.color = "green";
//   } else {
//     result.textContent = "❌ Nope. Try again!";
//     result.style.color = "red";
//   }
// }

function makeGuess() {
  const select = document.getElementById("guessSelect");
  const result = document.getElementById("result");
  const guess = select.value;

  if (!guess) {
    result.textContent = "Please select a suspect.";
    return;
  }

  const thief = "Holly"; // <-- Change this to the actual thief in your logic

  if (guess === thief) {
    document.getElementById("winOverlay").style.display = "block";
    document.getElementById("winPopup").style.display = "block";
  } else {
    result.textContent = "Nope, try again!";
  }
}

function closeWinPopup() {
  document.getElementById("winOverlay").style.display = "none";
  document.getElementById("winPopup").style.display = "none";
  location.reload(); // Optional: Restart the game
}

function openDeduction() {
  document.getElementById("deductionPopup").style.display = "block";
  document.getElementById("deductionOverlay").style.display = "block";
}

function closeDeduction() {
  document.getElementById("deductionPopup").style.display = "none";
  document.getElementById("deductionOverlay").style.display = "none";
}

function createDeductionGrid() {
  const tabNames = {
    Cookie: ["Choc Chip", "Oreos", "Ginger Cookie", "Tiny Teddies", "100s and 1000s"],
    Milk: ["Vanilla", "Strawberry", "Banana", "Caramel", "Chocolate"],
    Brand: ["Arnotts", "Coles", "No Frills", "Dick Smith", "Paradise"],
    Jar: ["Tall", "Mini", "Round", "Square", "Brass"],
    Place: ["Kitchen", "Bedroom", "Lounge", "Table", "Closet"]
  };

  const suspects = characters.map(c => c.name);
  const tabs = document.getElementById("tabs");
  const tabContent = document.getElementById("tabContent");

  for (const category in tabNames) {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.onclick = () => showTab(category);
    tabs.appendChild(btn);

    const table = document.createElement("table");
    table.id = `grid-${category}`;
    table.style.display = "none";

    const headerRow = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = category;
    headerRow.appendChild(th);
    suspects.forEach(name => {
      const h = document.createElement("th");
      h.textContent = name;
      headerRow.appendChild(h);
    });
    table.appendChild(headerRow);

    tabNames[category].forEach(item => {
      const row = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = item;
      row.appendChild(td);
      suspects.forEach(() => {
        const cell = document.createElement("td");
        cell.textContent = "";
cell.classList.add("deduction-cell");
cell.addEventListener("click", () => {
  const state = cell.textContent.trim();
  if (state === "") {
    cell.textContent = "/";
    cell.style.color = "green";
  } else if (state === "/") {
    cell.textContent = "X";
    cell.style.color = "red";
  } else {
    cell.textContent = "";
    cell.style.color = "black";
  }
});

        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    tabContent.appendChild(table);
  }

  showTab("Cookie");
}

function showTab(category) {
  const tables = document.querySelectorAll("#tabContent table");
  const buttons = document.querySelectorAll(".tabs button");

  tables.forEach(t => t.style.display = "none");
  buttons.forEach(b => b.classList.remove("active"));

  document.getElementById(`grid-${category}`).style.display = "table";
  [...buttons].find(b => b.textContent === category).classList.add("active");
}

function saveNotepad() {
  const content = document.getElementById("notepad").value;
  localStorage.setItem("notepad", content);
}

function loadNotepad() {
  const saved = localStorage.getItem("notepad");
  if (saved !== null) {
    document.getElementById("notepad").value = saved;
  }
}

// Attach to input
document.addEventListener("DOMContentLoaded", () => {
  loadNotepad();
  const note = document.getElementById("notepad");
  note.addEventListener("input", saveNotepad);
});

//music
const music = document.getElementById("bgMusic");

  // Try to autoplay when page loads
  window.addEventListener("load", () => {
    music.play().catch(() => {
      // If autoplay is blocked, wait for user interaction
      document.body.addEventListener("click", () => {
        music.play();
      }, { once: true });
    });
  });


  music.volume = 0.2;

  function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  }

  function showHint() {
  document.getElementById("hintOverlay").style.display = "block";
  document.getElementById("hintPopup").style.display = "block";

  // Example: rotating random hints (optional)
  const hints = [
  "Jackie is next to the person who eats in the lounge.",
  "The Arnotts cookies are stored in a round jar.",
  "Someone next to Cameron eats at a table.",
  "Oreos are always eaten in the closet.",
  "Julieanne prefers Paradise cookies.",
  "The person in the middle drinks banana milk and owns a tall jar.",
  "The person on the far left enjoys vanilla milk.",
  "Holly is seated on the far right.",
  "The bedroom eater drinks strawberry milk.",
  "The tall jar owner is next to the square jar owner.",
  "Cameron drinks caramel milk.",
  "The Dick Smith cookie fan sits next to the Coles fan.",
  "The No Frills fan is next to the round jar owner.",
  "The 100s and 1000s thief sits beside the brass jar owner.",
  "The second from the right likes No Frills cookies and sits beside a round jar.",
  "The far-left person stole the choc chip cookie.",
  "The Dick Smith cookie fan is next to the Paradise fan.",
  "The second from the left has a brass jar.",
  "Julieanne is directly right of the strawberry milk drinker.",
  "The chocolate milk drinker eats at the table.",
  "Paradise cookies are eaten in the kitchen.",
  "Tiny Teddies are not kept in a round jar.",
  "Coles cookies are kept in a mini jar."
];
  const randomHint = hints[Math.floor(Math.random() * hints.length)];
  document.getElementById("hintText").innerText = randomHint;
}

function closeHint() {
  document.getElementById("hintOverlay").style.display = "none";
  document.getElementById("hintPopup").style.display = "none";
}

const cookieContainer = document.getElementById('cookie-container');

function createFallingCookie() {
  const cookie = document.createElement('div');
  cookie.className = 'cookie';

  cookie.style.left = Math.random() * window.innerWidth + 'px';
  const duration = 3 + Math.random() * 5;
  cookie.style.animationDuration = `${duration}s`;

  cookieContainer.appendChild(cookie);

  setTimeout(() => {
    cookie.remove();
  }, duration * 1000);
}

// Start raining cookies every 200ms
setInterval(createFallingCookie, 200);


initGame();
