const indexedCommands = commands.map((command) => ({
  ...command,
  searchBlob: [
    command.title,
    command.alias,
    command.summary,
    command.when,
    command.syntax,
    command.library,
    categoryMeta[command.category]?.label ?? "",
    command.keywords.join(" "),
    command.tips.join(" "),
    command.recommendedUse.join(" "),
    command.professionalDetail,
    command.parameters.map((item) => `${item.name} ${item.meaning} ${item.detail}`).join(" "),
    command.examples.map((item) => `${item.title} ${item.note} ${item.code}`).join(" "),
    command.visualDemo?.title ?? "",
    command.visualDemo?.note ?? "",
  ]
    .join(" ")
    .toLowerCase(),
}))

const commandMap = new Map(indexedCommands.map((command) => [command.id, command]))
const scenarioMap = new Map(scenarios.map((scenario) => [scenario.id, scenario]))

const state = {
  library: "all",
  category: "all",
  search: "",
  scenarioId: null,
  selectedId: indexedCommands[0]?.id ?? null,
}

const refs = {
  heroStats: document.querySelector("#heroStats"),
  summaryStats: document.querySelector("#summaryStats"),
  libraryFilters: document.querySelector("#libraryFilters"),
  categoryFilters: document.querySelector("#categoryFilters"),
  quickActions: document.querySelector("#quickActions"),
  scenarioRail: document.querySelector("#scenarioRail"),
  scenarioDetail: document.querySelector("#scenarioDetail"),
  searchInput: document.querySelector("#searchInput"),
  clearSearch: document.querySelector("#clearSearch"),
  resultCount: document.querySelector("#resultCount"),
  resultsList: document.querySelector("#resultsList"),
  emptyState: document.querySelector("#emptyState"),
  detailView: document.querySelector("#detailView"),
  copyCodeButton: document.querySelector("#copyCodeButton"),
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function normalize(text) {
  return String(text).trim().toLowerCase()
}

function buildVisualPreviewSvg(type) {
  switch (type) {
    case "heatmap":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(42 34)">
            <g fill="#d7ece8">
              <rect x="0" y="0" width="34" height="24" rx="7" />
              <rect x="40" y="0" width="34" height="24" rx="7" fill="#a7d8cf" />
              <rect x="80" y="0" width="34" height="24" rx="7" fill="#5ca6a4" />
              <rect x="120" y="0" width="34" height="24" rx="7" fill="#dfe8a7" />
              <rect x="160" y="0" width="34" height="24" rx="7" fill="#d38754" />
              <rect x="0" y="30" width="34" height="24" rx="7" fill="#8ec9c8" />
              <rect x="40" y="30" width="34" height="24" rx="7" fill="#6ab3b0" />
              <rect x="80" y="30" width="34" height="24" rx="7" fill="#d38754" />
              <rect x="120" y="30" width="34" height="24" rx="7" fill="#f2c171" />
              <rect x="160" y="30" width="34" height="24" rx="7" fill="#9fd3ca" />
              <rect x="0" y="60" width="34" height="24" rx="7" fill="#d38754" />
              <rect x="40" y="60" width="34" height="24" rx="7" fill="#f2c171" />
              <rect x="80" y="60" width="34" height="24" rx="7" fill="#f5f0cf" />
              <rect x="120" y="60" width="34" height="24" rx="7" fill="#4d8f93" />
              <rect x="160" y="60" width="34" height="24" rx="7" fill="#7ebfbb" />
              <rect x="0" y="90" width="34" height="24" rx="7" fill="#b9ddd7" />
              <rect x="40" y="90" width="34" height="24" rx="7" fill="#5ca6a4" />
              <rect x="80" y="90" width="34" height="24" rx="7" fill="#7ebfbb" />
              <rect x="120" y="90" width="34" height="24" rx="7" fill="#d38754" />
              <rect x="160" y="90" width="34" height="24" rx="7" fill="#f2c171" />
            </g>
            <rect x="212" y="0" width="16" height="114" rx="8" fill="url(#heatLegend)" />
          </g>
          <defs>
            <linearGradient id="heatLegend" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#d38754" />
              <stop offset="50%" stop-color="#f2c171" />
              <stop offset="100%" stop-color="#4d8f93" />
            </linearGradient>
          </defs>
        </svg>
      `
    case "grid":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(34 32)">
            <g fill="#ffffff" stroke="#d7e3e7" stroke-width="1.2">
              <rect x="0" y="0" width="112" height="56" rx="12" />
              <rect x="126" y="0" width="112" height="56" rx="12" />
              <rect x="0" y="70" width="112" height="56" rx="12" />
              <rect x="126" y="70" width="112" height="56" rx="12" />
            </g>
            <path d="M12 40 C26 20, 44 18, 60 34 S94 44, 100 22" fill="none" stroke="#1f6f78" stroke-width="3" />
            <g fill="#b9793e">
              <circle cx="154" cy="20" r="5" />
              <circle cx="174" cy="32" r="5" />
              <circle cx="198" cy="24" r="5" />
              <circle cx="220" cy="38" r="5" />
            </g>
            <g fill="#7bb8b1">
              <rect x="12" y="101" width="18" height="17" rx="5" />
              <rect x="36" y="92" width="18" height="26" rx="5" />
              <rect x="60" y="84" width="18" height="34" rx="5" />
              <rect x="84" y="96" width="18" height="22" rx="5" />
            </g>
            <path d="M144 108 C160 88, 180 82, 196 96 S222 118, 230 86" fill="none" stroke="#b9793e" stroke-width="3" />
          </g>
        </svg>
      `
    case "palette":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(42 48)">
            <rect x="0" y="10" width="34" height="78" rx="12" fill="#143c44" />
            <rect x="40" y="0" width="34" height="88" rx="12" fill="#1f6f78" />
            <rect x="80" y="16" width="34" height="72" rx="12" fill="#5ca6a4" />
            <rect x="120" y="8" width="34" height="80" rx="12" fill="#b7ddd5" />
            <rect x="160" y="22" width="34" height="66" rx="12" fill="#efc58c" />
            <rect x="200" y="12" width="34" height="76" rx="12" fill="#b9793e" />
          </g>
          <defs>
            <linearGradient id="paletteStrip" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stop-color="#143c44" />
              <stop offset="18%" stop-color="#1f6f78" />
              <stop offset="40%" stop-color="#5ca6a4" />
              <stop offset="64%" stop-color="#b7ddd5" />
              <stop offset="82%" stop-color="#efc58c" />
              <stop offset="100%" stop-color="#b9793e" />
            </linearGradient>
          </defs>
          <rect x="54" y="140" width="212" height="16" rx="8" fill="url(#paletteStrip)" />
        </svg>
      `
    case "box":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(42 34)">
            <line x1="18" y1="114" x2="218" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <g stroke="#1f6f78" fill="#d6ece8" stroke-width="2.2">
              <path d="M18 86 C8 66, 8 48, 18 28 C28 48, 28 66, 18 86 Z" />
              <path d="M78 100 C64 82, 64 42, 78 24 C92 42, 92 82, 78 100 Z" fill="#f1d5b6" stroke="#b9793e" />
              <path d="M138 92 C126 74, 126 54, 138 30 C150 54, 150 74, 138 92 Z" fill="#cce4dd" />
            </g>
            <g stroke="#16333b" stroke-width="2">
              <line x1="18" y1="18" x2="18" y2="102" />
              <line x1="78" y1="12" x2="78" y2="108" />
              <line x1="138" y1="22" x2="138" y2="104" />
              <rect x="172" y="38" width="30" height="42" rx="8" fill="#ffffff" />
              <line x1="187" y1="24" x2="187" y2="96" />
              <line x1="172" y1="58" x2="202" y2="58" />
            </g>
          </g>
        </svg>
      `
    case "distribution":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(38 34)">
            <line x1="0" y1="114" x2="228" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <g fill="#d9ece8">
              <rect x="16" y="76" width="20" height="38" rx="6" />
              <rect x="42" y="56" width="20" height="58" rx="6" />
              <rect x="68" y="36" width="20" height="78" rx="6" />
              <rect x="94" y="24" width="20" height="90" rx="6" />
              <rect x="120" y="40" width="20" height="74" rx="6" />
              <rect x="146" y="62" width="20" height="52" rx="6" />
              <rect x="172" y="84" width="20" height="30" rx="6" />
            </g>
            <path d="M10 108 C34 82, 52 34, 88 28 S146 56, 170 84 S206 108, 224 106" fill="none" stroke="#1f6f78" stroke-width="4" />
            <path d="M10 102 C34 100, 64 88, 92 70 S152 36, 224 26" fill="none" stroke="#b9793e" stroke-width="3" stroke-dasharray="7 7" />
          </g>
        </svg>
      `
    case "barh":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(46 42)">
            <g fill="#cfe8e2">
              <rect x="0" y="0" width="160" height="16" rx="8" />
              <rect x="0" y="24" width="120" height="16" rx="8" />
              <rect x="0" y="48" width="188" height="16" rx="8" fill="#b9ddd7" />
              <rect x="0" y="72" width="90" height="16" rx="8" fill="#e9d2b7" />
              <rect x="0" y="96" width="142" height="16" rx="8" fill="#f0c487" />
            </g>
            <line x1="0" y1="122" x2="220" y2="122" stroke="#cad7dc" stroke-width="1.5" />
          </g>
        </svg>
      `
    case "bar":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(42 34)">
            <line x1="0" y1="114" x2="226" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <g fill="#d6ece8">
              <rect x="18" y="56" width="24" height="58" rx="8" />
              <rect x="58" y="32" width="24" height="82" rx="8" fill="#b6ddd7" />
              <rect x="98" y="68" width="24" height="46" rx="8" />
              <rect x="138" y="20" width="24" height="94" rx="8" fill="#efc58c" />
            </g>
            <path d="M28 46 L70 24 L110 58 L150 18" fill="none" stroke="#b9793e" stroke-width="3" />
            <g fill="#b9793e">
              <circle cx="28" cy="46" r="4.5" />
              <circle cx="70" cy="24" r="4.5" />
              <circle cx="110" cy="58" r="4.5" />
              <circle cx="150" cy="18" r="4.5" />
            </g>
          </g>
        </svg>
      `
    case "scatter":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(40 34)">
            <line x1="0" y1="114" x2="230" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <line x1="0" y1="0" x2="0" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <g fill="#1f6f78">
              <circle cx="28" cy="84" r="6" />
              <circle cx="52" cy="76" r="5" />
              <circle cx="72" cy="58" r="7" />
              <circle cx="98" cy="68" r="5" />
              <circle cx="124" cy="52" r="8" />
              <circle cx="146" cy="44" r="6" />
              <circle cx="170" cy="38" r="7" />
              <circle cx="198" cy="22" r="9" />
            </g>
            <g fill="#b9793e" opacity="0.72">
              <circle cx="40" cy="96" r="4" />
              <circle cx="86" cy="74" r="4" />
              <circle cx="136" cy="64" r="4" />
              <circle cx="186" cy="48" r="4" />
            </g>
          </g>
        </svg>
      `
    case "regression":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(40 34)">
            <line x1="0" y1="114" x2="230" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <line x1="0" y1="0" x2="0" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <g fill="#7bb8b1">
              <circle cx="24" cy="92" r="5" />
              <circle cx="52" cy="76" r="5" />
              <circle cx="76" cy="68" r="5" />
              <circle cx="106" cy="60" r="5" />
              <circle cx="134" cy="44" r="5" />
              <circle cx="168" cy="38" r="5" />
              <circle cx="198" cy="22" r="5" />
            </g>
            <path d="M14 98 L210 16" fill="none" stroke="#b9793e" stroke-width="4" />
            <path d="M14 114 C44 104, 84 104, 114 114 S174 124, 214 108" fill="none" stroke="#1f6f78" stroke-width="2.6" stroke-dasharray="6 6" />
          </g>
        </svg>
      `
    case "area":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(34 34)">
            <line x1="0" y1="114" x2="236" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <path d="M0 114 L0 84 C20 74, 42 64, 60 68 S100 82, 120 74 S168 48, 236 58 L236 114 Z" fill="#d7ece8" />
            <path d="M0 114 L0 98 C20 92, 42 88, 60 92 S100 100, 120 94 S168 82, 236 84 L236 114 Z" fill="#b8ddd7" />
            <path d="M0 114 L0 108 C34 106, 52 102, 76 104 S134 110, 236 98 L236 114 Z" fill="#efc58c" />
          </g>
        </svg>
      `
    case "vector":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(48 40)" stroke="#1f6f78" stroke-width="3" stroke-linecap="round">
            <path d="M0 0 L28 10" />
            <path d="M0 40 L28 38" />
            <path d="M0 80 L26 68" />
            <path d="M48 0 L68 26" />
            <path d="M48 40 L76 40" />
            <path d="M48 80 L70 56" />
            <path d="M96 0 L96 28" />
            <path d="M96 40 L118 50" />
            <path d="M96 80 L120 88" />
            <path d="M144 0 L122 20" />
            <path d="M144 40 L122 40" />
            <path d="M144 80 L122 62" />
            <path d="M192 0 L168 2" />
            <path d="M192 40 L166 30" />
            <path d="M192 80 L164 70" />
          </g>
          <path d="M54 128 C82 102, 124 76, 170 62 S238 36, 268 28" fill="none" stroke="#b9793e" stroke-width="3" />
        </svg>
      `
    case "pie":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(84 32)">
            <circle cx="70" cy="62" r="50" fill="#d7ece8" />
            <path d="M70 62 L70 12 A50 50 0 0 1 118 44 Z" fill="#efc58c" />
            <path d="M70 62 L118 44 A50 50 0 0 1 102 102 Z" fill="#7bb8b1" />
            <path d="M70 62 L102 102 A50 50 0 0 1 38 102 Z" fill="#b9793e" />
            <circle cx="70" cy="62" r="22" fill="#f8faf9" />
          </g>
        </svg>
      `
    case "step":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(36 34)">
            <line x1="0" y1="114" x2="236" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <path d="M12 94 H48 V72 H86 V72 H124 V42 H168 V42 H206 V24" fill="none" stroke="#1f6f78" stroke-width="4" />
            <g stroke="#b9793e" stroke-width="2.4">
              <line x1="24" y1="114" x2="24" y2="82" />
              <line x1="72" y1="114" x2="72" y2="60" />
              <line x1="122" y1="114" x2="122" y2="66" />
              <line x1="174" y1="114" x2="174" y2="34" />
            </g>
          </g>
        </svg>
      `
    case "table":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(44 34)">
            <rect x="0" y="0" width="220" height="108" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="0" y="0" width="220" height="24" rx="16" fill="#d7ece8" />
            <line x1="0" y1="24" x2="220" y2="24" stroke="#d5e1e5" />
            <line x1="56" y1="0" x2="56" y2="108" stroke="#d5e1e5" />
            <line x1="132" y1="0" x2="132" y2="108" stroke="#d5e1e5" />
            <line x1="0" y1="52" x2="220" y2="52" stroke="#d5e1e5" />
            <line x1="0" y1="80" x2="220" y2="80" stroke="#d5e1e5" />
          </g>
        </svg>
      `
    case "layout":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <rect x="42" y="28" width="152" height="18" rx="9" fill="#d7ece8" />
          <g transform="translate(42 58)">
            <rect x="0" y="0" width="138" height="86" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="150" y="8" width="74" height="34" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="150" y="52" width="74" height="28" rx="14" fill="#d7ece8" />
            <path d="M18 70 L46 44 L76 56 L112 24" fill="none" stroke="#1f6f78" stroke-width="4" />
            <circle cx="162" cy="22" r="5" fill="#1f6f78" />
            <rect x="174" y="18" width="30" height="8" rx="4" fill="#d7ece8" />
            <circle cx="162" cy="34" r="5" fill="#b9793e" />
            <rect x="174" y="30" width="38" height="8" rx="4" fill="#efc58c" />
          </g>
        </svg>
      `
    case "line":
    default:
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(34 34)">
            <line x1="0" y1="114" x2="238" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <line x1="0" y1="0" x2="0" y2="114" stroke="#cad7dc" stroke-width="1.5" />
            <path d="M10 92 C32 82, 50 46, 76 52 S112 82, 136 66 S182 18, 226 26" fill="none" stroke="#1f6f78" stroke-width="4" />
            <path d="M10 104 C36 100, 54 84, 82 88 S130 104, 154 94 S192 54, 226 60" fill="none" stroke="#b9793e" stroke-width="3" stroke-dasharray="8 6" />
            <g fill="#1f6f78">
              <circle cx="10" cy="92" r="4" />
              <circle cx="76" cy="52" r="4" />
              <circle cx="136" cy="66" r="4" />
              <circle cx="226" cy="26" r="4" />
            </g>
          </g>
        </svg>
      `
  }
}

function renderVisualDemo(command) {
  if (!command.visualDemo) {
    return ""
  }

  return `
    <section class="detail-section">
      <h4>图形示意</h4>
      <article class="visual-demo-card">
        <div class="visual-demo-frame">
          ${buildVisualPreviewSvg(command.visualDemo.type)}
        </div>
        <div class="visual-demo-copy">
          <h5>${escapeHtml(command.visualDemo.title)}</h5>
          <p>${escapeHtml(command.visualDemo.note)}</p>
        </div>
      </article>
    </section>
  `
}

function getCommandById(id) {
  return commandMap.get(id) ?? null
}

function getScenarioById(id) {
  return scenarioMap.get(id) ?? null
}

function getFilteredCommands() {
  const query = normalize(state.search)

  return indexedCommands.filter((command) => {
    const libraryMatch =
      state.library === "all" || command.library === state.library
    const categoryMatch =
      state.category === "all" || command.category === state.category
    const searchMatch = !query || command.searchBlob.includes(query)

    return libraryMatch && categoryMatch && searchMatch
  })
}

function getLibraryCounts() {
  const query = normalize(state.search)
  const counts = {}

  Object.keys(libraryMeta).forEach((key) => {
    counts[key] = indexedCommands.filter((command) => {
      const libraryMatch = key === "all" || command.library === key
      const categoryMatch =
        state.category === "all" || command.category === state.category
      const searchMatch = !query || command.searchBlob.includes(query)

      return libraryMatch && categoryMatch && searchMatch
    }).length
  })

  return counts
}

function getCategoryCounts() {
  const query = normalize(state.search)
  const counts = {}

  Object.keys(categoryMeta).forEach((key) => {
    counts[key] = indexedCommands.filter((command) => {
      const libraryMatch =
        state.library === "all" || command.library === state.library
      const categoryMatch = key === "all" || command.category === key
      const searchMatch = !query || command.searchBlob.includes(query)

      return libraryMatch && categoryMatch && searchMatch
    }).length
  })

  return counts
}

function syncSelection(filteredCommands) {
  if (filteredCommands.length === 0) {
    state.selectedId = null
    return
  }

  const exists = filteredCommands.some((command) => command.id === state.selectedId)
  if (!exists) {
    state.selectedId = filteredCommands[0].id
  }
}

function renderHeroStats() {
  const metrics = [
    { value: `${indexedCommands.length} 条`, label: "高频指令" },
    { value: `${Object.keys(libraryMeta).length - 1} 个`, label: "常用库" },
    { value: `${Object.keys(categoryMeta).length - 1} 类`, label: "任务类型" },
    { value: `${scenarios.length} 条`, label: "场景流程" },
  ]

  refs.heroStats.innerHTML = metrics
    .map(
      (item) => `
        <article class="hero-stat">
          <span class="hero-stat-value">${escapeHtml(item.value)}</span>
          <span class="hero-stat-label">${escapeHtml(item.label)}</span>
        </article>
      `
    )
    .join("")
}

function renderLibraryFilters() {
  const counts = getLibraryCounts()

  refs.libraryFilters.innerHTML = Object.entries(libraryMeta)
    .map(([key, meta]) => {
      const active = key === state.library
      return `
        <button
          class="filter-button"
          type="button"
          data-library="${escapeHtml(key)}"
          data-active="${String(active)}"
          aria-pressed="${String(active)}"
          ${counts[key] === 0 ? "disabled" : ""}
        >
          <span class="filter-label">
            <span class="filter-name">${escapeHtml(meta.label)}</span>
            <span class="filter-note">${escapeHtml(meta.note)}</span>
          </span>
          <span class="filter-count">${counts[key]}</span>
        </button>
      `
    })
    .join("")
}

function renderCategoryFilters() {
  const counts = getCategoryCounts()

  refs.categoryFilters.innerHTML = Object.entries(categoryMeta)
    .map(([key, meta]) => {
      const active = key === state.category
      return `
        <button
          class="chip-button"
          type="button"
          data-category="${escapeHtml(key)}"
          data-active="${String(active)}"
          aria-pressed="${String(active)}"
          ${counts[key] === 0 ? "disabled" : ""}
        >
          ${escapeHtml(meta.label)} (${counts[key]})
        </button>
      `
    })
    .join("")
}

function renderQuickActions() {
  refs.quickActions.innerHTML = quickFilters
    .map((item) => {
      const active =
        !state.scenarioId &&
        item.library === state.library &&
        item.category === state.category &&
        item.search === state.search

      return `
        <button
          class="chip-button"
          type="button"
          data-quick="${escapeHtml(item.label)}"
          data-active="${String(active)}"
          aria-pressed="${String(active)}"
        >
          ${escapeHtml(item.label)}
        </button>
      `
    })
    .join("")
}

function renderScenarioRail() {
  refs.scenarioRail.innerHTML = scenarios
    .map((scenario) => {
      const active = scenario.id === state.scenarioId
      return `
        <button
          class="scenario-button"
          type="button"
          data-scenario-id="${escapeHtml(scenario.id)}"
          data-active="${String(active)}"
          aria-pressed="${String(active)}"
        >
          <span class="scenario-title">${escapeHtml(scenario.title)}</span>
          <span class="scenario-copy">${escapeHtml(scenario.summary)}</span>
        </button>
      `
    })
    .join("")
}

function renderScenarioDetail() {
  if (!state.scenarioId) {
    refs.scenarioDetail.innerHTML = `
      <p class="scenario-kicker">Free Browse</p>
      <h3 class="result-title">当前是自由检索模式</h3>
      <p class="scenario-summary">
        你可以直接搜 API、中文任务名，或者点击上面的任一流程模板，让页面自动切到对应的入口命令。
      </p>
      <div class="scenario-highlights">
        <span class="scenario-pill">适合熟悉 API，想快速直达的人</span>
        <span class="scenario-pill">支持中英文混搜，例如 merge / 去重 / 热力图</span>
        <span class="scenario-pill">结果、详情和复制示例会实时联动</span>
      </div>
    `
    return
  }

  const scenario = getScenarioById(state.scenarioId)
  if (!scenario) {
    refs.scenarioDetail.innerHTML = ""
    return
  }

  const stepsMarkup = scenario.steps
    .map((id) => getCommandById(id))
    .filter(Boolean)
    .map(
      (command) => `
        <button
          class="workflow-chip"
          type="button"
          data-step-id="${escapeHtml(command.id)}"
        >
          ${escapeHtml(command.alias)}
        </button>
      `
    )
    .join("")

  const highlightsMarkup = scenario.highlights
    .map(
      (item) => `
        <span class="scenario-pill">${escapeHtml(item)}</span>
      `
    )
    .join("")

  refs.scenarioDetail.innerHTML = `
    <p class="scenario-kicker">Workflow Active</p>
    <h3 class="result-title">${escapeHtml(scenario.title)}</h3>
    <p class="scenario-summary">${escapeHtml(scenario.summary)}</p>

    <div class="scenario-highlights">${highlightsMarkup}</div>

    <section class="detail-section">
      <h4>推荐步骤</h4>
      <div class="workflow-steps">${stepsMarkup}</div>
    </section>

    <div class="scenario-actions">
      <p>点任一步骤，会自动切到对应的命令和结果范围。</p>
      <button class="ghost-button" type="button" data-clear-scenario="true">
        恢复自由检索
      </button>
    </div>
  `
}

function renderSummary(filteredCommands) {
  const currentMode = state.scenarioId
    ? getScenarioById(state.scenarioId)?.title ?? "场景流程"
    : "自由检索"

  const metrics = [
    { value: `${filteredCommands.length} 条`, label: "当前结果" },
    { value: libraryMeta[state.library].label, label: "当前库" },
    { value: categoryMeta[state.category].label, label: "当前任务" },
    { value: currentMode, label: "当前模式" },
  ]

  refs.summaryStats.innerHTML = metrics
    .map(
      (item) => `
        <article class="summary-metric">
          <span class="summary-metric-value">${escapeHtml(item.value)}</span>
          <span class="summary-metric-label">${escapeHtml(item.label)}</span>
        </article>
      `
    )
    .join("")

  if (state.search) {
    refs.resultCount.textContent = `关键词 “${state.search}” 命中 ${filteredCommands.length} 条`
  } else if (state.scenarioId) {
    refs.resultCount.textContent = `当前流程下共 ${filteredCommands.length} 条`
  } else {
    refs.resultCount.textContent = `共 ${filteredCommands.length} 条可选`
  }

  refs.clearSearch.disabled = state.search.length === 0
}

function renderResults(filteredCommands) {
  if (filteredCommands.length === 0) {
    refs.resultsList.innerHTML = ""
    refs.emptyState.hidden = false
    return
  }

  refs.emptyState.hidden = true
  refs.resultsList.innerHTML = filteredCommands
    .map((command, index) => {
      const active = command.id === state.selectedId
      return `
        <button
          class="result-item"
          type="button"
          data-id="${escapeHtml(command.id)}"
          data-active="${String(active)}"
          aria-selected="${String(active)}"
          style="--index:${index}"
        >
          <div class="result-topline">
            <h3 class="result-title">${escapeHtml(command.alias)}</h3>
            <div class="badge-row">
              <span class="badge badge-library">${escapeHtml(command.library)}</span>
              <span class="badge badge-category">${escapeHtml(
                categoryMeta[command.category].label
              )}</span>
            </div>
          </div>
          <p class="result-copy">${escapeHtml(command.summary)}</p>
          <p class="syntax-inline">${escapeHtml(command.syntax)}</p>
        </button>
      `
    })
    .join("")
}

function renderDetail() {
  const command = getCommandById(state.selectedId)

  if (!command) {
    refs.copyCodeButton.disabled = true
    refs.detailView.innerHTML = `
      <div class="placeholder">
        <p>左侧筛选、中间结果或场景步骤都可以驱动这里的详情、参数说明和示例卡片。</p>
      </div>
    `
    return
  }

  const relatedMarkup = command.related
    .map((id) => getCommandById(id))
    .filter(Boolean)
    .map(
      (item) => `
        <button
          class="related-chip"
          type="button"
          data-related-id="${escapeHtml(item.id)}"
        >
          ${escapeHtml(item.alias)}
        </button>
      `
    )
    .join("")

  const tipItems = (command.tips.length
    ? command.tips
    : ["先在少量样本数据上验证结果，再扩展到全量数据。"]
  )
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("")

  const recommendationItems = command.recommendedUse
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")

  const parameterMarkup = command.parameters
    .map(
      (param) => `
        <article class="parameter-card">
          <div class="parameter-name">${escapeHtml(param.name)}</div>
          <p class="parameter-meaning">${escapeHtml(param.meaning)}</p>
          <p class="parameter-detail">${escapeHtml(param.detail)}</p>
        </article>
      `
    )
    .join("")

  const exampleMarkup = command.examples
    .map(
      (example, index) => `
        <article class="example-card">
          <div class="example-meta">
            <div>
              <h5>${escapeHtml(example.title)}</h5>
              <p class="example-note">${escapeHtml(example.note)}</p>
            </div>
            <button
              class="ghost-button example-copy-button"
              type="button"
              data-example-index="${index}"
            >
              复制此例
            </button>
          </div>
          <pre class="code-block"><code>${escapeHtml(example.code)}</code></pre>
        </article>
      `
    )
    .join("")

  const visualDemoMarkup = renderVisualDemo(command)

  refs.copyCodeButton.disabled = false
  refs.detailView.innerHTML = `
    <section class="detail-header">
      <div class="detail-meta">
        <span class="badge badge-library">${escapeHtml(command.library)}</span>
        <span class="badge badge-category">${escapeHtml(
          categoryMeta[command.category].label
        )}</span>
      </div>
      <h3>${escapeHtml(command.title)}</h3>
      <p class="detail-copy">${escapeHtml(command.summary)}</p>
      <div class="detail-kpis">
        <article class="detail-kpi">
          <span class="detail-kpi-value">${command.parameters.length}</span>
          <span class="detail-kpi-label">核心参数</span>
        </article>
        <article class="detail-kpi">
          <span class="detail-kpi-value">${command.examples.length}</span>
          <span class="detail-kpi-label">使用示例</span>
        </article>
        <article class="detail-kpi">
          <span class="detail-kpi-value">${command.related.length}</span>
          <span class="detail-kpi-label">相关命令</span>
        </article>
      </div>
    </section>

    <section class="detail-section">
      <h4>建议使用</h4>
      <ul class="detail-list">${recommendationItems}</ul>
    </section>

    <section class="detail-section">
      <h4>专业说明</h4>
      <p class="detail-copy">${escapeHtml(command.professionalDetail)}</p>
    </section>

    <section class="detail-section">
      <h4>常用写法</h4>
      <pre class="syntax-block"><code>${escapeHtml(command.syntax)}</code></pre>
    </section>

    <section class="detail-section">
      <h4>参数说明</h4>
      <div class="parameter-list">${parameterMarkup}</div>
    </section>

    ${visualDemoMarkup}

    <section class="detail-section">
      <h4>多示例</h4>
      <div class="example-list">${exampleMarkup}</div>
    </section>

    <section class="detail-section">
      <h4>使用提示</h4>
      <ul class="detail-list">${tipItems}</ul>
    </section>

    <section class="detail-section">
      <h4>相关指令</h4>
      <div class="related-list">${relatedMarkup || "<span>暂无</span>"}</div>
    </section>
  `
}

function renderAll() {
  const filteredCommands = getFilteredCommands()
  syncSelection(filteredCommands)
  renderHeroStats()
  renderLibraryFilters()
  renderCategoryFilters()
  renderQuickActions()
  renderScenarioRail()
  renderScenarioDetail()
  renderSummary(filteredCommands)
  renderResults(filteredCommands)
  renderDetail()
}

function setCustomMode() {
  state.scenarioId = null
}

function exitScenarioToGlobalSearch() {
  const wasScenarioActive = Boolean(state.scenarioId)
  setCustomMode()

  if (wasScenarioActive) {
    state.library = "all"
    state.category = "all"
  }
}

function applyScenario(id) {
  const scenario = getScenarioById(id)
  if (!scenario) {
    return
  }

  state.scenarioId = scenario.id
  state.library = scenario.library
  state.category = scenario.category
  state.search = scenario.search
  state.selectedId = scenario.leadId
  refs.searchInput.value = scenario.search
  renderAll()
}

function applyQuickFilter(label) {
  const quickFilter = quickFilters.find((item) => item.label === label)
  if (!quickFilter) {
    return
  }

  setCustomMode()
  state.library = quickFilter.library
  state.category = quickFilter.category
  state.search = quickFilter.search
  refs.searchInput.value = quickFilter.search
  renderAll()
}

function selectCommand(id, options = {}) {
  const command = getCommandById(id)
  if (!command) {
    return
  }

  state.selectedId = command.id

  if (options.syncFilters) {
    state.library = command.library
    state.category = command.category
  }

  if (options.clearSearchIfHidden && state.search) {
    const query = normalize(state.search)
    if (query && !command.searchBlob.includes(query)) {
      state.search = ""
      refs.searchInput.value = ""
    }
  }

  renderAll()
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch (error) {
      // Fall through to the textarea fallback for browsers that block clipboard on file://.
    }
  }

  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.top = "-9999px"
  document.body.append(textarea)
  textarea.focus()
  textarea.select()
  textarea.setSelectionRange(0, textarea.value.length)

  const copied = document.execCommand("copy")
  textarea.remove()

  if (!copied) {
    throw new Error("copy_failed")
  }
}

function bindEvents() {
  refs.searchInput.addEventListener("input", (event) => {
    exitScenarioToGlobalSearch()
    state.search = event.currentTarget.value
    renderAll()
  })

  refs.clearSearch.addEventListener("click", () => {
    exitScenarioToGlobalSearch()
    state.search = ""
    refs.searchInput.value = ""
    refs.searchInput.focus()
    renderAll()
  })

  refs.libraryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-library]")
    if (!button) {
      return
    }

    setCustomMode()
    state.library = button.dataset.library
    renderAll()
  })

  refs.categoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]")
    if (!button) {
      return
    }

    setCustomMode()
    state.category = button.dataset.category
    renderAll()
  })

  refs.quickActions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quick]")
    if (!button) {
      return
    }

    applyQuickFilter(button.dataset.quick)
  })

  refs.scenarioRail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scenario-id]")
    if (!button) {
      return
    }

    applyScenario(button.dataset.scenarioId)
  })

  refs.scenarioDetail.addEventListener("click", (event) => {
    const clearButton = event.target.closest("[data-clear-scenario]")
    if (clearButton) {
      setCustomMode()
      renderAll()
      return
    }

    const stepButton = event.target.closest("[data-step-id]")
    if (!stepButton) {
      return
    }

    selectCommand(stepButton.dataset.stepId, {
      syncFilters: true,
      clearSearchIfHidden: true,
    })
  })

  refs.resultsList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-id]")
    if (!button) {
      return
    }

    selectCommand(button.dataset.id)
  })

  refs.detailView.addEventListener("click", (event) => {
    const button = event.target.closest("[data-related-id]")
    if (button) {
      selectCommand(button.dataset.relatedId, {
        syncFilters: true,
        clearSearchIfHidden: true,
      })
      return
    }

    const exampleButton = event.target.closest("[data-example-index]")
    if (!exampleButton) {
      return
    }

    const command = getCommandById(state.selectedId)
    const example = command?.examples?.[Number(exampleButton.dataset.exampleIndex)]
    if (!example) {
      return
    }

    const originalLabel = exampleButton.textContent

    copyText(example.code)
      .then(() => {
        exampleButton.textContent = "已复制"
      })
      .catch(() => {
        exampleButton.textContent = "复制失败"
      })
      .finally(() => {
        window.setTimeout(() => {
          exampleButton.textContent = originalLabel
        }, 1400)
      })
  })

  refs.copyCodeButton.addEventListener("click", async () => {
    const command = getCommandById(state.selectedId)
    if (!command) {
      return
    }

    const originalLabel = refs.copyCodeButton.textContent

    try {
      await copyText(command.examples[0]?.code ?? command.code)
      refs.copyCodeButton.textContent = "已复制"
    } catch (error) {
      refs.copyCodeButton.textContent = "复制失败"
    }

    window.setTimeout(() => {
      refs.copyCodeButton.textContent = originalLabel
    }, 1400)
  })

  document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement
    const isTyping =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement

    if (event.key === "/" && !isTyping) {
      event.preventDefault()
      refs.searchInput.focus()
      refs.searchInput.select()
    }

    if (event.key === "Escape" && refs.searchInput.value) {
      exitScenarioToGlobalSearch()
      state.search = ""
      refs.searchInput.value = ""
      renderAll()
    }
  })
}

function initialize() {
  bindEvents()
  renderAll()
  window.requestAnimationFrame(() => {
    document.body.classList.add("is-ready")
  })
}

initialize()
