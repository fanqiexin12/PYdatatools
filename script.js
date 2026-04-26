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
    (command.officialReferences ?? [])
      .map((item) => `${item.label} ${item.note} ${item.source}`)
      .join(" "),
    command.visualDemo?.title ?? "",
    command.visualDemo?.note ?? "",
  ]
    .join(" ")
    .toLowerCase(),
}))

const commandMap = new Map(indexedCommands.map((command) => [command.id, command]))
const scenarioMap = new Map(scenarios.map((scenario) => [scenario.id, scenario]))
const tutorialMap = new Map(tutorials.map((tutorial) => [tutorial.id, tutorial]))

const state = {
  library: "all",
  category: "all",
  search: "",
  scenarioId: null,
  tutorialId: tutorials[0]?.id ?? null,
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
  tutorialRail: document.querySelector("#tutorialRail"),
  tutorialDetail: document.querySelector("#tutorialDetail"),
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
    case "tableflow":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(30 40)">
            <rect x="0" y="14" width="88" height="64" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="0" y="14" width="88" height="18" rx="14" fill="#d7ece8" />
            <line x1="0" y1="32" x2="88" y2="32" stroke="#d5e1e5" />
            <line x1="28" y1="14" x2="28" y2="78" stroke="#d5e1e5" />
            <line x1="58" y1="14" x2="58" y2="78" stroke="#d5e1e5" />
            <line x1="0" y1="50" x2="88" y2="50" stroke="#d5e1e5" />
            <path d="M104 46 L142 46" stroke="#1f6f78" stroke-width="5" stroke-linecap="round" />
            <path d="M136 34 L150 46 L136 58" fill="none" stroke="#1f6f78" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="166" y="0" width="104" height="92" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="166" y="0" width="104" height="20" rx="16" fill="#e9d2b7" />
            <line x1="166" y1="20" x2="270" y2="20" stroke="#d5e1e5" />
            <line x1="166" y1="44" x2="270" y2="44" stroke="#d5e1e5" />
            <line x1="166" y1="68" x2="270" y2="68" stroke="#d5e1e5" />
            <line x1="198" y1="0" x2="198" y2="92" stroke="#d5e1e5" />
            <line x1="230" y1="0" x2="230" y2="92" stroke="#d5e1e5" />
          </g>
        </svg>
      `
    case "joinflow":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(28 34)">
            <rect x="0" y="22" width="84" height="78" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="0" y="22" width="84" height="18" rx="14" fill="#d7ece8" />
            <rect x="56" y="4" width="84" height="78" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="56" y="4" width="84" height="18" rx="14" fill="#efc58c" />
            <path d="M162 44 L196 44" stroke="#1f6f78" stroke-width="5" stroke-linecap="round" />
            <path d="M190 32 L204 44 L190 56" fill="none" stroke="#1f6f78" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="214" y="14" width="78" height="86" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="214" y="14" width="78" height="18" rx="16" fill="#cfe8e2" />
            <circle cx="196" cy="44" r="18" fill="rgba(31,111,120,0.12)" stroke="#1f6f78" stroke-width="3" />
          </g>
        </svg>
      `
    case "reshapeflow":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(38 36)">
            <rect x="0" y="18" width="132" height="62" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <line x1="0" y1="18" x2="132" y2="18" stroke="#d5e1e5" />
            <line x1="44" y1="18" x2="44" y2="80" stroke="#d5e1e5" />
            <line x1="88" y1="18" x2="88" y2="80" stroke="#d5e1e5" />
            <line x1="0" y1="40" x2="132" y2="40" stroke="#d5e1e5" />
            <line x1="0" y1="60" x2="132" y2="60" stroke="#d5e1e5" />
            <path d="M154 50 L186 50" stroke="#b9793e" stroke-width="5" stroke-linecap="round" />
            <path d="M180 38 L194 50 L180 62" fill="none" stroke="#b9793e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="202" y="0" width="44" height="110" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <line x1="202" y1="22" x2="246" y2="22" stroke="#d5e1e5" />
            <line x1="202" y1="44" x2="246" y2="44" stroke="#d5e1e5" />
            <line x1="202" y1="66" x2="246" y2="66" stroke="#d5e1e5" />
            <line x1="202" y1="88" x2="246" y2="88" stroke="#d5e1e5" />
          </g>
        </svg>
      `
    case "summarycard":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(34 38)">
            <rect x="0" y="0" width="72" height="48" rx="16" fill="#d7ece8" />
            <rect x="86" y="0" width="72" height="48" rx="16" fill="#efc58c" />
            <rect x="172" y="0" width="72" height="48" rx="16" fill="#cfe8e2" />
            <rect x="0" y="62" width="244" height="54" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <path d="M16 98 C40 88, 70 76, 98 84 S148 106, 180 90 S218 70, 228 74" fill="none" stroke="#1f6f78" stroke-width="4" />
          </g>
        </svg>
      `
    case "timeline":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(32 42)">
            <line x1="0" y1="84" x2="248" y2="84" stroke="#cad7dc" stroke-width="2" />
            <g fill="#1f6f78">
              <circle cx="20" cy="84" r="6" />
              <circle cx="70" cy="60" r="6" />
              <circle cx="120" cy="68" r="6" />
              <circle cx="170" cy="36" r="6" />
              <circle cx="220" cy="44" r="6" />
            </g>
            <path d="M20 84 C40 74, 56 62, 70 60 S104 66, 120 68 S154 44, 170 36 S206 42, 220 44" fill="none" stroke="#1f6f78" stroke-width="4" />
            <path d="M20 84 C52 74, 88 70, 120 68 S188 52, 220 44" fill="none" stroke="#b9793e" stroke-width="3" stroke-dasharray="8 6" />
          </g>
        </svg>
      `
    case "arrayrow":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(34 70)">
            <rect x="0" y="0" width="44" height="36" rx="10" fill="#d7ece8" />
            <rect x="50" y="0" width="44" height="36" rx="10" fill="#cfe8e2" />
            <rect x="100" y="0" width="44" height="36" rx="10" fill="#efc58c" />
            <rect x="150" y="0" width="44" height="36" rx="10" fill="#b7ddd5" />
            <rect x="200" y="0" width="44" height="36" rx="10" fill="#d7ece8" />
          </g>
        </svg>
      `
    case "arraygrid":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(62 34)" fill="#ffffff" stroke="#d5e1e5">
            <rect x="0" y="0" width="44" height="34" rx="10" />
            <rect x="50" y="0" width="44" height="34" rx="10" fill="#d7ece8" />
            <rect x="100" y="0" width="44" height="34" rx="10" />
            <rect x="0" y="40" width="44" height="34" rx="10" fill="#efc58c" />
            <rect x="50" y="40" width="44" height="34" rx="10" />
            <rect x="100" y="40" width="44" height="34" rx="10" fill="#cfe8e2" />
            <rect x="0" y="80" width="44" height="34" rx="10" />
            <rect x="50" y="80" width="44" height="34" rx="10" fill="#d7ece8" />
            <rect x="100" y="80" width="44" height="34" rx="10" />
          </g>
          <path d="M232 56 L262 56" stroke="#1f6f78" stroke-width="5" stroke-linecap="round" />
          <path d="M256 44 L270 56 L256 68" fill="none" stroke="#1f6f78" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `
    case "matrixcard":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(44 42)">
            <rect x="0" y="0" width="78" height="78" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="126" y="0" width="78" height="78" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <path d="M92 38 L112 38" stroke="#b9793e" stroke-width="5" stroke-linecap="round" />
            <path d="M106 26 L120 38 L106 50" fill="none" stroke="#b9793e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="62" y="92" width="140" height="22" rx="11" fill="#d7ece8" />
          </g>
        </svg>
      `
    case "decisionflow":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(40 38)">
            <path d="M76 8 L124 40 L76 72 L28 40 Z" fill="#d7ece8" />
            <path d="M164 8 L212 40 L164 72 L116 40 Z" fill="#efc58c" />
            <path d="M252 8 L300 40 L252 72 L204 40 Z" transform="translate(-20 0)" fill="#cfe8e2" />
            <path d="M124 40 H146" stroke="#1f6f78" stroke-width="4" />
            <path d="M212 40 H234" stroke="#1f6f78" stroke-width="4" />
            <rect x="32" y="90" width="180" height="24" rx="12" fill="#ffffff" stroke="#d5e1e5" />
          </g>
        </svg>
      `
    case "statscard":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(36 36)">
            <rect x="0" y="0" width="70" height="44" rx="16" fill="#d7ece8" />
            <rect x="82" y="0" width="70" height="44" rx="16" fill="#efc58c" />
            <rect x="164" y="0" width="70" height="44" rx="16" fill="#cfe8e2" />
            <rect x="0" y="58" width="234" height="54" rx="18" fill="#ffffff" stroke="#d5e1e5" />
            <path d="M22 94 C42 82, 54 70, 74 68 S108 84, 124 80 S150 58, 186 56" fill="none" stroke="#1f6f78" stroke-width="4" />
          </g>
        </svg>
      `
    case "interpolatecurve":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(38 38)">
            <path d="M10 98 C42 86, 66 38, 92 44 S148 86, 178 70 S212 24, 232 20" fill="none" stroke="#1f6f78" stroke-width="4" />
            <path d="M10 98 L44 80 L86 46 L140 82 L196 48 L232 20" fill="none" stroke="#b9793e" stroke-width="3" stroke-dasharray="6 6" />
            <g fill="#b9793e">
              <circle cx="10" cy="98" r="5" />
              <circle cx="44" cy="80" r="5" />
              <circle cx="86" cy="46" r="5" />
              <circle cx="140" cy="82" r="5" />
              <circle cx="196" cy="48" r="5" />
              <circle cx="232" cy="20" r="5" />
            </g>
          </g>
        </svg>
      `
    case "signalwave":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(34 46)">
            <path d="M0 64 C18 42, 36 88, 54 36 S90 26, 108 60 S144 86, 162 46 S198 30, 216 58" fill="none" stroke="#b9793e" stroke-width="3" stroke-dasharray="7 6" />
            <path d="M0 60 C18 52, 36 64, 54 50 S90 42, 108 52 S144 70, 162 56 S198 44, 216 50" fill="none" stroke="#1f6f78" stroke-width="4" />
            <g fill="#1f6f78">
              <circle cx="54" cy="50" r="5" />
              <circle cx="108" cy="52" r="5" />
              <circle cx="162" cy="56" r="5" />
            </g>
          </g>
        </svg>
      `
    case "optimizepath":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(38 32)">
            <path d="M20 18 C92 12, 144 74, 212 114" fill="none" stroke="#d5e1e5" stroke-width="18" stroke-linecap="round" opacity="0.6" />
            <path d="M28 22 C72 28, 106 54, 136 76 S182 104, 210 110" fill="none" stroke="#1f6f78" stroke-width="4" stroke-dasharray="7 6" />
            <g fill="#b9793e">
              <circle cx="28" cy="22" r="6" />
              <circle cx="88" cy="42" r="6" />
              <circle cx="136" cy="76" r="6" />
              <circle cx="180" cy="100" r="6" />
              <circle cx="210" cy="110" r="7" />
            </g>
          </g>
        </svg>
      `
    case "forecastpanel":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(32 36)">
            <rect x="0" y="0" width="110" height="108" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="126" y="0" width="110" height="108" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <path d="M12 82 C30 70, 48 56, 66 60 S88 84, 98 52" fill="none" stroke="#1f6f78" stroke-width="4" />
            <path d="M138 84 C154 78, 170 74, 184 64 S210 36, 224 28" fill="none" stroke="#b9793e" stroke-width="4" />
          </g>
        </svg>
      `
    case "modelsummary":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(38 34)">
            <rect x="0" y="0" width="110" height="94" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="122" y="0" width="96" height="94" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="0" y="106" width="218" height="18" rx="9" fill="#d7ece8" />
            <line x1="14" y1="24" x2="96" y2="24" stroke="#d5e1e5" stroke-width="2" />
            <line x1="14" y1="44" x2="96" y2="44" stroke="#d5e1e5" stroke-width="2" />
            <line x1="14" y1="64" x2="96" y2="64" stroke="#d5e1e5" stroke-width="2" />
            <g fill="#efc58c">
              <rect x="140" y="18" width="20" height="54" rx="8" />
              <rect x="166" y="30" width="20" height="42" rx="8" />
              <rect x="192" y="10" width="20" height="62" rx="8" />
            </g>
          </g>
        </svg>
      `
    case "splitview":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(34 44)">
            <rect x="0" y="0" width="168" height="92" rx="18" fill="#d7ece8" />
            <rect x="178" y="0" width="70" height="92" rx="18" fill="#efc58c" />
            <text x="52" y="48" fill="#16333b" font-size="16" font-family="sans-serif">Train</text>
            <text x="198" y="48" fill="#16333b" font-size="16" font-family="sans-serif">Test</text>
          </g>
        </svg>
      `
    case "pipelineflow":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(28 58)">
            <rect x="0" y="0" width="54" height="44" rx="16" fill="#d7ece8" />
            <rect x="74" y="0" width="54" height="44" rx="16" fill="#efc58c" />
            <rect x="148" y="0" width="54" height="44" rx="16" fill="#cfe8e2" />
            <rect x="222" y="0" width="54" height="44" rx="16" fill="#d7ece8" />
            <path d="M54 22 H74" stroke="#1f6f78" stroke-width="4" />
            <path d="M128 22 H148" stroke="#1f6f78" stroke-width="4" />
            <path d="M202 22 H222" stroke="#1f6f78" stroke-width="4" />
          </g>
        </svg>
      `
    case "confusioncard":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(74 34)">
            <rect x="0" y="0" width="86" height="86" rx="14" fill="#ffffff" stroke="#d5e1e5" />
            <line x1="43" y1="0" x2="43" y2="86" stroke="#d5e1e5" />
            <line x1="0" y1="43" x2="86" y2="43" stroke="#d5e1e5" />
            <rect x="0" y="0" width="43" height="43" rx="14" fill="#d7ece8" />
            <rect x="43" y="43" width="43" height="43" rx="14" fill="#efc58c" />
            <rect x="112" y="18" width="52" height="16" rx="8" fill="#d7ece8" />
            <rect x="112" y="44" width="52" height="16" rx="8" fill="#efc58c" />
          </g>
        </svg>
      `
    case "clusterdemo":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(44 40)">
            <g fill="#1f6f78">
              <circle cx="30" cy="36" r="7" />
              <circle cx="56" cy="24" r="7" />
              <circle cx="62" cy="50" r="7" />
            </g>
            <g fill="#b9793e">
              <circle cx="138" cy="72" r="7" />
              <circle cx="160" cy="58" r="7" />
              <circle cx="170" cy="84" r="7" />
            </g>
            <g fill="#7bb8b1">
              <circle cx="214" cy="26" r="7" />
              <circle cx="236" cy="40" r="7" />
              <circle cx="224" cy="60" r="7" />
            </g>
          </g>
        </svg>
      `
    case "networkstack":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(42 34)">
            <g fill="#d7ece8">
              <circle cx="20" cy="22" r="8" />
              <circle cx="20" cy="52" r="8" />
              <circle cx="20" cy="82" r="8" />
            </g>
            <g fill="#efc58c">
              <circle cx="92" cy="12" r="8" />
              <circle cx="92" cy="34" r="8" />
              <circle cx="92" cy="56" r="8" />
              <circle cx="92" cy="78" r="8" />
              <circle cx="92" cy="100" r="8" />
            </g>
            <g fill="#cfe8e2">
              <circle cx="164" cy="26" r="8" />
              <circle cx="164" cy="52" r="8" />
              <circle cx="164" cy="78" r="8" />
            </g>
            <g fill="#1f6f78">
              <circle cx="236" cy="52" r="10" />
            </g>
            <g stroke="#cad7dc">
              <line x1="28" y1="22" x2="84" y2="12" />
              <line x1="28" y1="22" x2="84" y2="34" />
              <line x1="28" y1="52" x2="84" y2="56" />
              <line x1="28" y1="82" x2="84" y2="78" />
              <line x1="100" y1="34" x2="156" y2="26" />
              <line x1="100" y1="56" x2="156" y2="52" />
              <line x1="100" y1="78" x2="156" y2="78" />
              <line x1="172" y1="26" x2="226" y2="52" />
              <line x1="172" y1="52" x2="226" y2="52" />
              <line x1="172" y1="78" x2="226" y2="52" />
            </g>
          </g>
        </svg>
      `
    case "trainingcurve":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(38 40)">
            <line x1="0" y1="96" x2="236" y2="96" stroke="#cad7dc" stroke-width="1.5" />
            <path d="M12 22 C36 34, 58 44, 82 56 S122 68, 146 74 S184 78, 224 82" fill="none" stroke="#1f6f78" stroke-width="4" />
            <path d="M12 86 C36 78, 58 64, 82 54 S122 34, 146 28 S184 24, 224 22" fill="none" stroke="#b9793e" stroke-width="4" />
            <rect x="162" y="6" width="66" height="20" rx="10" fill="#ffffff" stroke="#d5e1e5" />
          </g>
        </svg>
      `
    case "tokengrid":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(34 42)">
            <rect x="0" y="0" width="58" height="22" rx="11" fill="#d7ece8" />
            <rect x="66" y="0" width="66" height="22" rx="11" fill="#efc58c" />
            <rect x="140" y="0" width="54" height="22" rx="11" fill="#cfe8e2" />
            <rect x="10" y="42" width="96" height="56" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <rect x="126" y="42" width="112" height="56" rx="16" fill="#ffffff" stroke="#d5e1e5" />
            <path d="M106 70 L126 70" stroke="#1f6f78" stroke-width="4" />
          </g>
        </svg>
      `
    case "topicmap":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(40 36)">
            <circle cx="44" cy="48" r="26" fill="#d7ece8" />
            <circle cx="118" cy="34" r="22" fill="#efc58c" />
            <circle cx="186" cy="58" r="28" fill="#cfe8e2" />
            <circle cx="238" cy="28" r="16" fill="#b9793e" opacity="0.8" />
            <path d="M66 48 L98 38" stroke="#1f6f78" stroke-width="3" />
            <path d="M138 40 L160 52" stroke="#1f6f78" stroke-width="3" />
            <path d="M206 44 L224 32" stroke="#1f6f78" stroke-width="3" />
          </g>
        </svg>
      `
    case "semanticspace":
      return `
        <svg viewBox="0 0 320 190" aria-hidden="true">
          <rect x="16" y="16" width="288" height="158" rx="24" fill="#f8faf9" />
          <g transform="translate(40 38)">
            <line x1="0" y1="96" x2="236" y2="96" stroke="#cad7dc" stroke-width="1.5" />
            <line x1="0" y1="0" x2="0" y2="96" stroke="#cad7dc" stroke-width="1.5" />
            <g fill="#1f6f78">
              <circle cx="46" cy="62" r="6" />
              <circle cx="58" cy="48" r="6" />
              <circle cx="78" cy="54" r="6" />
            </g>
            <g fill="#b9793e">
              <circle cx="156" cy="26" r="6" />
              <circle cx="174" cy="36" r="6" />
              <circle cx="188" cy="22" r="6" />
            </g>
            <g fill="#7bb8b1">
              <circle cx="122" cy="78" r="6" />
              <circle cx="140" cy="70" r="6" />
              <circle cx="160" cy="82" r="6" />
            </g>
          </g>
        </svg>
      `
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
      <h4>理解演示</h4>
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

function renderOfficialReferences(command) {
  if (!command.officialReferences?.length) {
    return ""
  }

  const cards = command.officialReferences
    .map(
      (item) => `
        <a
          class="official-ref-card"
          href="${escapeHtml(item.url)}"
          target="_blank"
          rel="noreferrer"
        >
          <div class="official-ref-top">
            <span class="official-ref-source">${escapeHtml(item.source)}</span>
            <span class="official-ref-kind">${escapeHtml(item.kind || "API")}</span>
          </div>
          <h5>${escapeHtml(item.label)}</h5>
          <p>${escapeHtml(item.note)}</p>
        </a>
      `
    )
    .join("")

  return `
    <section class="detail-section">
      <h4>官方参考</h4>
      <p class="detail-section-note">
        这里给你的是当前命令对应的官方入口。完整参数、返回值、边界条件和版本差异，建议以上方原始文档为准。
      </p>
      <div class="official-ref-grid">${cards}</div>
    </section>
  `
}

function getCommandById(id) {
  return commandMap.get(id) ?? null
}

function getScenarioById(id) {
  return scenarioMap.get(id) ?? null
}

function getTutorialById(id) {
  return tutorialMap.get(id) ?? null
}

function getTutorialsForCommand(commandId) {
  return tutorials.filter(
    (tutorial) =>
      tutorial.commandIds.includes(commandId) ||
      tutorial.walkthrough.some((step) => step.commandId === commandId)
  )
}

function renderTutorialDataset(dataset) {
  if (!dataset) {
    return ""
  }

  let body = ""

  if (dataset.kind === "table") {
    const columnsMarkup = dataset.columns
      .map((column) => `<th>${escapeHtml(column)}</th>`)
      .join("")
    const rowsMarkup = dataset.rows
      .map(
        (row) => `
          <tr>
            ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}
          </tr>
        `
      )
      .join("")

    body = `
      <div class="lesson-table-wrap">
        <table class="lesson-table">
          <thead>
            <tr>${columnsMarkup}</tr>
          </thead>
          <tbody>${rowsMarkup}</tbody>
        </table>
      </div>
    `
  } else if (dataset.kind === "array") {
    const rowsMarkup = dataset.rows
      .map(
        (row) => `
          <div class="lesson-array-row">
            ${row
              .map((cell) => `<span class="lesson-array-cell">${escapeHtml(cell)}</span>`)
              .join("")}
          </div>
        `
      )
      .join("")

    body = `<div class="lesson-array-grid">${rowsMarkup}</div>`
  } else if (dataset.kind === "text") {
    const blocksMarkup = dataset.blocks
      .map(
        (block) => `
          <pre class="lesson-text-block"><code>${escapeHtml(block)}</code></pre>
        `
      )
      .join("")

    body = `<div class="lesson-text-grid">${blocksMarkup}</div>`
  }

  return `
    <section class="tutorial-card tutorial-dataset-card">
      <div class="tutorial-card-copy">
        <p class="tutorial-card-kicker">Practice Data</p>
        <h4>${escapeHtml(dataset.title)}</h4>
        <p>${escapeHtml(dataset.note)}</p>
      </div>
      ${body}
    </section>
  `
}

function renderTutorialLinks(command) {
  const linkedTutorials = getTutorialsForCommand(command.id)

  if (!linkedTutorials.length) {
    return ""
  }

  const cards = linkedTutorials
    .slice(0, 4)
    .map(
      (tutorial) => `
        <button
          class="tutorial-related-card"
          type="button"
          data-open-tutorial-id="${escapeHtml(tutorial.id)}"
        >
          <span class="tutorial-related-topline">
            <span class="tutorial-related-level">${escapeHtml(tutorial.level)}</span>
            <span class="tutorial-related-duration">${escapeHtml(tutorial.duration)}</span>
          </span>
          <strong>${escapeHtml(tutorial.title)}</strong>
          <span>${escapeHtml(tutorial.summary)}</span>
        </button>
      `
    )
    .join("")

  return `
    <section class="detail-section">
      <h4>教程串联</h4>
      <p class="detail-section-note">
        这条命令不只是单点写法，它会在下面这些教程里和其它命令一起出现。
      </p>
      <div class="tutorial-related-grid">${cards}</div>
    </section>
  `
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
    { value: `${tutorials.length} 节`, label: "专题教程" },
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

function renderTutorialRail() {
  refs.tutorialRail.innerHTML = tutorials
    .map((tutorial) => {
      const active = tutorial.id === state.tutorialId

      return `
        <button
          class="lesson-button"
          type="button"
          data-tutorial-id="${escapeHtml(tutorial.id)}"
          data-active="${String(active)}"
          aria-pressed="${String(active)}"
        >
          <span class="lesson-button-topline">
            <span class="lesson-button-library">${escapeHtml(tutorial.library)}</span>
            <span class="lesson-button-meta">${escapeHtml(tutorial.level)} · ${escapeHtml(
              tutorial.duration
            )}</span>
          </span>
          <span class="lesson-button-title">${escapeHtml(tutorial.title)}</span>
          <span class="lesson-button-copy">${escapeHtml(tutorial.summary)}</span>
        </button>
      `
    })
    .join("")
}

function renderTutorialDetail() {
  if (!state.tutorialId) {
    refs.tutorialDetail.innerHTML = `
      <p class="scenario-kicker">Learning Mode</p>
      <h3 class="result-title">这里会放一节完整教程</h3>
      <p class="scenario-summary">
        你可以先选一节课，再顺着样例数据、步骤说明和跳转命令一起学。和“按场景开始”不同，这里更强调为什么这样写、每一步会看到什么。
      </p>
    `
    return
  }

  const tutorial = getTutorialById(state.tutorialId)
  if (!tutorial) {
    refs.tutorialDetail.innerHTML = ""
    return
  }

  const focusMarkup = tutorial.focus
    .map((item) => `<span class="scenario-pill">${escapeHtml(item)}</span>`)
    .join("")

  const objectivesMarkup = tutorial.objectives
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")

  const stepsMarkup = tutorial.walkthrough
    .map((step, index) => {
      const command = getCommandById(step.commandId)

      return `
        <article class="lesson-step-card">
          <div class="lesson-step-head">
            <div class="lesson-step-copy">
              <span class="lesson-step-index">Step ${index + 1}</span>
              <h4>${escapeHtml(step.title)}</h4>
            </div>
            <button
              class="ghost-button lesson-jump-button"
              type="button"
              data-tutorial-command-id="${escapeHtml(step.commandId)}"
            >
              跳到命令
            </button>
          </div>
          <div class="lesson-step-command">
            <span class="badge badge-library">${escapeHtml(command?.library ?? tutorial.library)}</span>
            <strong>${escapeHtml(command?.alias ?? step.commandId)}</strong>
            <span>${escapeHtml(command?.title ?? step.commandId)}</span>
          </div>
          <p class="lesson-step-why">${escapeHtml(step.why)}</p>
          <pre class="code-block"><code>${escapeHtml(step.code)}</code></pre>
          <div class="lesson-output-card">
            <span class="lesson-output-label">你会看到</span>
            <p>${escapeHtml(step.output)}</p>
          </div>
        </article>
      `
    })
    .join("")

  const takeawaysMarkup = tutorial.takeaways
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")

  refs.tutorialDetail.innerHTML = `
    <section class="tutorial-hero">
      <div class="tutorial-hero-copy">
        <p class="scenario-kicker">Learning Path</p>
        <h3 class="result-title">${escapeHtml(tutorial.title)}</h3>
        <p class="tutorial-summary">${escapeHtml(tutorial.summary)}</p>
      </div>
      <div class="tutorial-stat-grid">
        <article class="detail-kpi">
          <span class="detail-kpi-value">${tutorial.walkthrough.length}</span>
          <span class="detail-kpi-label">核心步骤</span>
        </article>
        <article class="detail-kpi">
          <span class="detail-kpi-value">${tutorial.commandIds.length}</span>
          <span class="detail-kpi-label">关联命令</span>
        </article>
        <article class="detail-kpi">
          <span class="detail-kpi-value">${escapeHtml(tutorial.level)}</span>
          <span class="detail-kpi-label">建议难度</span>
        </article>
      </div>
    </section>

    <div class="scenario-highlights">${focusMarkup}</div>

    <section class="tutorial-card">
      <div class="tutorial-card-copy">
        <p class="tutorial-card-kicker">You Will Learn</p>
        <h4>这节课的学习目标</h4>
      </div>
      <ul class="detail-list">${objectivesMarkup}</ul>
    </section>

    ${renderTutorialDataset(tutorial.dataset)}

    <section class="tutorial-card">
      <div class="tutorial-card-copy">
        <p class="tutorial-card-kicker">Walkthrough</p>
        <h4>分步骤理解这条链路</h4>
      </div>
      <div class="lesson-step-list">${stepsMarkup}</div>
    </section>

    <section class="tutorial-card">
      <div class="tutorial-card-copy">
        <p class="tutorial-card-kicker">Checklist</p>
        <h4>学完要记住什么</h4>
      </div>
      <ul class="detail-list">${takeawaysMarkup}</ul>
    </section>

    <section class="tutorial-card tutorial-practice-card">
      <div class="tutorial-card-copy">
        <p class="tutorial-card-kicker">Practice</p>
        <h4>练习一下</h4>
        <p>${escapeHtml(tutorial.practice)}</p>
      </div>
      <div class="scenario-actions">
        <p>如果你想一边看课一边查命令，可以把结果区切到这节课对应的命令范围。</p>
        <div class="tutorial-actions-row">
          <button
            class="ghost-button"
            type="button"
            data-apply-tutorial-id="${escapeHtml(tutorial.id)}"
          >
            按这节课筛选命令
          </button>
          <button
            class="ghost-button"
            type="button"
            data-clear-tutorial="true"
          >
            关闭教程焦点
          </button>
        </div>
      </div>
    </section>
  `
}

function renderSummary(filteredCommands) {
  const activeTutorial = getTutorialById(state.tutorialId)
  const tutorialFilterActive =
    activeTutorial &&
    state.library === (activeTutorial.filterLibrary ?? "all") &&
    state.category === (activeTutorial.filterCategory ?? "all") &&
    state.search === (activeTutorial.filterSearch ?? "")

  const currentMode = state.scenarioId
    ? getScenarioById(state.scenarioId)?.title ?? "场景流程"
    : tutorialFilterActive
      ? `教程：${activeTutorial.title}`
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
  } else if (tutorialFilterActive) {
    refs.resultCount.textContent = `当前教程下共 ${filteredCommands.length} 条`
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
        <p>左侧筛选、中间结果或场景步骤都可以驱动这里的详情、官方参考、学习参数和示例代码。</p>
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

  const officialReferencesMarkup = renderOfficialReferences(command)
  const visualDemoMarkup = renderVisualDemo(command)
  const tutorialLinksMarkup = renderTutorialLinks(command)

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
          <span class="detail-kpi-label">优先参数</span>
        </article>
        <article class="detail-kpi">
          <span class="detail-kpi-value">${command.examples.length}</span>
          <span class="detail-kpi-label">使用示例</span>
        </article>
        <article class="detail-kpi">
          <span class="detail-kpi-value">${command.officialReferences?.length ?? 0}</span>
          <span class="detail-kpi-label">官方入口</span>
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

    ${officialReferencesMarkup}

    <section class="detail-section">
      <h4>基本用法</h4>
      <pre class="syntax-block"><code>${escapeHtml(command.syntax)}</code></pre>
    </section>

    <section class="detail-section">
      <h4>学习优先参数</h4>
      <p class="detail-section-note">
        这里优先解释最常用、最适合入门理解的参数。想看完整参数列表、默认值和返回对象，请继续参考上方官方入口。
      </p>
      <div class="parameter-list">${parameterMarkup}</div>
    </section>

    ${tutorialLinksMarkup}

    ${visualDemoMarkup}

    <section class="detail-section">
      <h4>示例代码</h4>
      <div class="example-list">${exampleMarkup}</div>
    </section>

    <section class="detail-section">
      <h4>注意事项</h4>
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
  renderTutorialRail()
  renderTutorialDetail()
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

function applyTutorialFilters(id) {
  const tutorial = getTutorialById(id)
  if (!tutorial) {
    return
  }

  state.scenarioId = null
  state.library = tutorial.filterLibrary ?? "all"
  state.category = tutorial.filterCategory ?? "all"
  state.search = tutorial.filterSearch ?? ""
  state.selectedId = tutorial.leadId ?? state.selectedId
  refs.searchInput.value = state.search
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

  refs.tutorialRail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tutorial-id]")
    if (!button) {
      return
    }

    state.tutorialId = button.dataset.tutorialId
    renderAll()
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

  refs.tutorialDetail.addEventListener("click", (event) => {
    const clearButton = event.target.closest("[data-clear-tutorial]")
    if (clearButton) {
      state.tutorialId = null
      renderAll()
      return
    }

    const applyButton = event.target.closest("[data-apply-tutorial-id]")
    if (applyButton) {
      applyTutorialFilters(applyButton.dataset.applyTutorialId)
      return
    }

    const commandButton = event.target.closest("[data-tutorial-command-id]")
    if (!commandButton) {
      return
    }

    selectCommand(commandButton.dataset.tutorialCommandId, {
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
    const tutorialButton = event.target.closest("[data-open-tutorial-id]")
    if (tutorialButton) {
      state.tutorialId = tutorialButton.dataset.openTutorialId
      renderAll()
      return
    }

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
