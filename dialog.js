const dialogTrees = {
  "Jackie": {
    start: {
      "Where were you eating?": {
        reply: "In the lounge. I like the soft cushions.",
        next: "jackie-lounge"
      },
      "Did you see anything strange?": {
        reply: "Hmm… Cameron seemed nervous.",
        next: null
      },
      "What milk do you drink?": {
        reply: "Banana milk. It's my favorite!",
        next: null
      },
      "What jar did you use?": {
        reply: "A tall one! It stood out among the rest.",
        next: null
      }
    },
    "jackie-lounge": {
      "Were you alone?": {
        reply: "No, I think Julieanne was around.",
        next: null
      },
      "What cookie did you eat?": {
        reply: "100s and 1000s, of course.",
        next: null
      }
    }
  },

  "Holly": {
    start: {
      "What cookie did you eat?": {
        reply: "Choc Chip, the classic!",
        next: null
      },
      "Where did you eat?": {
        reply: "I was in the bedroom.",
        next: "holly-bedroom"
      },
      "Who was with you?": {
        reply: "Cameron, I think.",
        next: null
      },
      "Where do you sit?": {
        reply: "Far right. Always my favorite spot.",
        next: null
      }
    },
    "holly-bedroom": {
      "What milk did you drink?": {
        reply: "Strawberry milk. Why?",
        next: null
      }
    }
  },

  "Cameron": {
    start: {
      "Where were you eating?": {
        reply: "I ate at the table. Less mess.",
        next: null
      },
      "What milk did you drink?": {
        reply: "Caramel milk is my go-to.",
        next: null
      },
      "What jar was your cookie in?": {
        reply: "A square one, I believe.",
        next: null
      },
      "Anyone sit next to you?": {
        reply: "I think Holly or Jackie were nearby.",
        next: null
      }
    }
  },

  "Julieanne": {
    start: {
      "Where did you eat your cookie?": {
        reply: "In the kitchen, where else?",
        next: null
      },
      "What brand of cookie?": {
        reply: "Paradise. So good.",
        next: null
      },
      "Who else was near the kitchen?": {
        reply: "Alex walked by briefly.",
        next: null
      },
      "Who sat beside you?": {
        reply: "Jackie might’ve been to my left.",
        next: null
      }
    }
  },

  "Alex": {
    start: {
      "Where were you?": {
        reply: "I was in the closet. Odd place, I know.",
        next: null
      },
      "What cookie did you eat?": {
        reply: "Oreos. Can’t go wrong.",
        next: null
      },
      "What milk did you drink?": {
        reply: "Chocolate milk.",
        next: null
      },
      "What brand was it?": {
        reply: "Could be Coles, I kept it in a mini jar.",
        next: null
      }
    }
  }
};


const portraits = {
  "Holly": "suspects/holly.png",
  "Cameron": "suspects/cameron.jpg",
  "Julieanne": "suspects/julieanne.png",
  "Alex": "suspects/alex.jpg",
  "Jackie": "suspects/jackie.webp"
};

const params = new URLSearchParams(window.location.search);
const name = params.get("name");
const currentTree = dialogTrees[name];
let currentNode = "start";

// Set character name and portrait
document.getElementById("characterName").textContent = name;
document.getElementById("characterImage").src = portraits[name];

renderDialogOptions();

function renderDialogOptions() {
  const options = currentTree[currentNode];
  const optionContainer = document.getElementById("dialogOptions");
  const dialogBox = document.getElementById("dialogBoxText");

  optionContainer.innerHTML = "";
  dialogBox.textContent = "What do you want to ask?";

  for (const question in options) {
    const btn = document.createElement("button");
    btn.textContent = question;
    btn.onclick = () => {
      const reply = options[question].reply;
      const next = options[question].next;
      dialogBox.textContent = "→ " + reply;
      currentNode = next || "start";
      if (next) {
        setTimeout(renderDialogOptions, 600);
      } else {
        optionContainer.innerHTML = "";
      }
    };
    optionContainer.appendChild(btn);
  }
}

function goBack() {
  window.location.href = "game.html";
}

function resetDialog() {
  currentNode = "start";
  renderDialogOptions();
}

// Simple reuse of grid from game.js
function openDeduction() {
  document.getElementById("deductionPopup").style.display = "block";
  document.getElementById("deductionOverlay").style.display = "block";
  if (!document.getElementById("grid-Cookie")) createDeductionGrid();
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

  const suspects = ["Holly", "Cameron", "Julieanne", "Alex", "Jackie"];
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
        cell.contentEditable = true;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    tabContent.appendChild(table);
  }

  showTab("Cookie");
}

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

function showTab(category) {
  const tables = document.querySelectorAll("#tabContent table");
  const buttons = document.querySelectorAll(".tabs button");

  tables.forEach(t => t.style.display = "none");
  buttons.forEach(b => b.classList.remove("active"));

  document.getElementById(`grid-${category}`).style.display = "table";
  [...buttons].find(b => b.textContent === category).classList.add("active");
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

setInterval(createFallingCookie, 200);

