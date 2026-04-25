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
