const modules = [
  {
    name: "Feature Extraction Service",
    description:
      "Reads uploaded audio metadata or preprocessed track vectors and standardizes BPM, key, loudness, energy, and MFCC-derived inputs.",
    tags: ["Signal Processing", "Track Features", "Normalization"]
  },
  {
    name: "Transition Scoring Engine",
    description:
      "Builds pairwise comparisons between tracks and computes compatibility features such as tempo delta, harmonic fit, and energy shift.",
    tags: ["Pairwise Ranking", "Feature Engineering", "Compatibility"]
  },
  {
    name: "Boosted Ranking Model",
    description:
      "The final model approach is still being finalized, but this module will turn engineered transition features into ranked recommendations for track-to-track flow.",
    tags: ["XGBoost", "LightGBM", "Inference API"]
  },
  {
    name: "Playlist Path Optimizer",
    description:
      "Treats tracks as nodes in a weighted graph and searches for an ordering that maximizes total transition quality over the full playlist.",
    tags: ["Graph Search", "Weighted Paths", "Global Flow"]
  }
];

const scenarios = [
  [
    "INPUT SET: 24 tracks tagged for cardio session",
    "STEP 1: Extracted BPM, key, loudness, RMS energy, MFCC mean vectors",
    "STEP 2: Generated 552 candidate transitions",
    "STEP 3: Top score pair -> Track 04 to Track 11 = 0.92",
    "STEP 4: Penalized abrupt drop in energy from Track 11 to Track 07",
    "STEP 5: Optimizer selected a 12-track path with sustained build-up",
    "OUTPUT: Workout playlist with consistent pacing and harmonic stability"
  ],
  [
    "INPUT SET: 15 tracks requested for a warm-up DJ set",
    "STEP 1: Key distribution centered on 8A, 9A, and 10A",
    "STEP 2: Calculated harmonic wrap-around bonuses for adjacent keys",
    "STEP 3: Ranked candidates by learned transition quality",
    "STEP 4: Smoothed tempo progression from 118 BPM to 126 BPM",
    "STEP 5: Selected path avoids back-to-back loudness spikes",
    "OUTPUT: Continuous mix order with gradual energy lift"
  ],
  [
    "INPUT SET: 30 songs marked for uninterrupted study listening",
    "STEP 1: Filtered out transitions with sharp spectral contrast",
    "STEP 2: Boosting model favored low-variance energy shifts",
    "STEP 3: Graph search maximized average edge score across full run",
    "STEP 4: Final sequence reduced disruptive jumps in mood",
    "OUTPUT: Calm playlist with cohesive texture from start to finish"
  ]
];

const teamProfiles = [
  {
    name: "Klejben Hysenbelli",
    initials: "KH",
    bio: "PLACEHOLDER"
  },
  {
    name: "James Giuffre",
    initials: "JG",
    bio: "PLACEHOLDER"
  },
  {
    name: "Brendan Connolly",
    initials: "BC",
    bio: "PLACEHOLDER"
  }
];

const moduleList = document.getElementById("moduleList");
const consoleOutput = document.getElementById("consoleOutput");
const shuffleScenario = document.getElementById("shuffleScenario");
const teamGrid = document.getElementById("teamGrid");

let scenarioIndex = 0;

function renderModules() {
  if (!moduleList) {
    return;
  }

  moduleList.innerHTML = modules
    .map(
      (module) => `
        <article class="module-card">
          <strong>${module.name}</strong>
          <p>${module.description}</p>
          <div class="tag-row">
            ${module.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderScenario(index) {
  if (!consoleOutput) {
    return;
  }

  consoleOutput.textContent = scenarios[index].join("\n");
}

function renderTeamFocus() {
  if (!teamGrid) {
    return;
  }

  teamGrid.innerHTML = teamProfiles
    .map(
      (item) => `
        <article class="team-card profile-card">
          <div class="profile-photo" aria-hidden="true">${item.initials}</div>
          <strong>${item.name}</strong>
          <p>${item.bio}</p>
        </article>
      `
    )
    .join("");
}

renderModules();
renderScenario(scenarioIndex);
renderTeamFocus();

if (shuffleScenario) {
  shuffleScenario.addEventListener("click", () => {
    scenarioIndex = (scenarioIndex + 1) % scenarios.length;
    renderScenario(scenarioIndex);
  });
}
