function createParamDoc(name, meaning, detail) {
  return { name, meaning, detail }
}

function createExample(title, code, note) {
  return { title, code, note }
}

function lines(parts) {
  return parts.join("\n")
}

function uniqueStrings(items) {
  return [...new Set(items.filter(Boolean).map((item) => String(item).trim()))]
}

function titleContains(command, token) {
  const haystack = `${command.id} ${command.title} ${command.alias}`.toLowerCase()
  return haystack.includes(token.toLowerCase())
}

function createOfficialRef({ label, url, source, note, kind = "API" }) {
  return { label, url, source, note, kind }
}

const libraryOfficialMeta = {
  pandas: {
    label: "pandas",
    source: "pandas 官方文档",
    guideUrl: "https://pandas.pydata.org/docs/reference/index.html",
    guideNote: "适合查看 pandas API 总览、对象体系和版本对应的完整说明。",
  },
  numpy: {
    label: "NumPy",
    source: "NumPy 官方文档",
    guideUrl: "https://numpy.org/doc/stable/reference/index.html",
    guideNote: "适合查看数组、线性代数、随机数和数值计算相关的官方 API 目录。",
  },
  scipy: {
    label: "SciPy",
    source: "SciPy 官方文档",
    guideUrl: "https://docs.scipy.org/doc/scipy/reference/index.html",
    guideNote: "适合查看统计检验、插值、优化、信号处理和稀疏矩阵的官方说明。",
  },
  statsmodels: {
    label: "statsmodels",
    source: "statsmodels 官方文档",
    guideUrl: "https://www.statsmodels.org/stable/api.html",
    guideNote: "适合查看统计建模、时间序列和推断分析的完整 API 与示例。",
  },
  sklearn: {
    label: "scikit-learn",
    source: "scikit-learn 官方文档",
    guideUrl: "https://scikit-learn.org/stable/modules/classes.html",
    guideNote: "适合查看 estimator、pipeline、metrics 和 model_selection 的官方入口。",
  },
  keras: {
    label: "Keras",
    source: "Keras 官方文档",
    guideUrl: "https://keras.io/api/",
    guideNote: "适合查看模型、层、回调和训练 API 的完整层级说明。",
  },
  gensim: {
    label: "gensim",
    source: "Gensim 官方文档",
    guideUrl: "https://radimrehurek.com/gensim/",
    guideNote: "适合查看词典、主题模型、词向量和相似度模块的原始说明。",
  },
  seaborn: {
    label: "seaborn",
    source: "seaborn 官方文档",
    guideUrl: "https://seaborn.pydata.org/api.html",
    guideNote: "适合查看统计绘图 API、语义映射和 figure-level / axes-level 图表体系。",
  },
  matplotlib: {
    label: "matplotlib",
    source: "matplotlib 官方文档",
    guideUrl: "https://matplotlib.org/stable/api/index.html",
    guideNote: "适合查看 pyplot、Axes、Figure 和布局控制相关的官方 API 目录。",
  },
}

function buildGuideReference(library) {
  const meta = libraryOfficialMeta[library]
  if (!meta) {
    return null
  }

  return createOfficialRef({
    label: `${meta.label} API 总览`,
    url: meta.guideUrl,
    source: meta.source,
    note: meta.guideNote,
    kind: "总览",
  })
}

function uniqueRefs(items) {
  const seen = new Set()
  return items.filter((item) => {
    if (!item?.url || seen.has(item.url)) {
      return false
    }
    seen.add(item.url)
    return true
  })
}

function extractCallTokens(title) {
  const matches = title.match(/([A-Za-z_]+(?:\.[A-Za-z_]+)?)\(\)/g) ?? []
  return uniqueStrings(matches.map((token) => token.replace(/\(\)$/g, "")))
}

function pandasRef(path, label, note) {
  return createOfficialRef({
    label,
    url: `https://pandas.pydata.org/docs/reference/api/${path}.html`,
    source: libraryOfficialMeta.pandas.source,
    note,
  })
}

function numpyRef(path, label, note) {
  return createOfficialRef({
    label,
    url: `https://numpy.org/doc/stable/reference/generated/numpy.${path}.html`,
    source: libraryOfficialMeta.numpy.source,
    note,
  })
}

function scipyRef(path, label, note) {
  return createOfficialRef({
    label,
    url: `https://docs.scipy.org/doc/scipy/reference/generated/scipy.${path}.html`,
    source: libraryOfficialMeta.scipy.source,
    note,
  })
}

function seabornRef(path, label, note) {
  return createOfficialRef({
    label,
    url: `https://seaborn.pydata.org/generated/seaborn.${path}.html`,
    source: libraryOfficialMeta.seaborn.source,
    note,
  })
}

function pyplotRef(path, label, note) {
  return createOfficialRef({
    label,
    url: `https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.${path}.html`,
    source: libraryOfficialMeta.matplotlib.source,
    note,
  })
}

function axesRef(path, label, note) {
  return createOfficialRef({
    label,
    url: `https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.${path}.html`,
    source: libraryOfficialMeta.matplotlib.source,
    note,
  })
}

const pandasFunctionPaths = {
  "pd-read-csv": [["pandas.read_csv", "read_csv()"]],
  "pd-read-excel": [["pandas.read_excel", "read_excel()"]],
  "pd-read-json": [["pandas.read_json", "read_json()"]],
  "pd-read-parquet": [["pandas.read_parquet", "read_parquet()"]],
  "pd-json-normalize": [["pandas.json_normalize", "json_normalize()"]],
  "pd-pivot-table": [["pandas.pivot_table", "pivot_table()"]],
  "pd-crosstab": [["pandas.crosstab", "crosstab()"]],
  "pd-merge": [["pandas.merge", "merge()"]],
  "pd-concat": [["pandas.concat", "concat()"]],
  "pd-melt": [["pandas.melt", "melt()"]],
  "pd-get-dummies": [["pandas.get_dummies", "get_dummies()"]],
  "pd-to-datetime": [["pandas.to_datetime", "to_datetime()"]],
  "pd-to-numeric": [["pandas.to_numeric", "to_numeric()"]],
  "pd-cut-qcut": [
    ["pandas.cut", "cut()"],
    ["pandas.qcut", "qcut()"],
  ],
  "pd-merge-asof": [["pandas.merge_asof", "merge_asof()"]],
  "pd-merge-ordered": [["pandas.merge_ordered", "merge_ordered()"]],
  "pd-eval": [["pandas.eval", "eval()"]],
  "pd-wide-to-long": [["pandas.wide_to_long", "wide_to_long()"]],
}

const pandasDataFramePaths = {
  "pd-head": ["head", "tail"],
  "pd-to-excel-csv": ["to_csv", "to_excel"],
  "pd-info": ["info"],
  "pd-describe": ["describe"],
  "pd-isna-sum": ["isna"],
  "pd-loc": ["loc"],
  "pd-iloc": ["iloc"],
  "pd-query": ["query"],
  "pd-fillna": ["fillna", "dropna"],
  "pd-drop-duplicates": ["drop_duplicates"],
  "pd-astype": ["astype"],
  "pd-rename": ["rename"],
  "pd-replace": ["replace"],
  "pd-assign": ["assign"],
  "pd-apply": ["apply"],
  "pd-nunique": ["nunique"],
  "pd-set-reset-index": ["set_index", "reset_index"],
  "pd-sort-values": ["sort_values"],
  "pd-pivot": ["pivot"],
  "pd-explode": ["explode"],
  "pd-resample": ["resample"],
  "pd-rolling": ["rolling"],
  "pd-shift": ["shift"],
  "pd-rank": ["rank"],
  "pd-isin": ["isin"],
  "pd-duplicated": ["duplicated"],
  "pd-drop": ["drop"],
  "pd-sample": ["sample"],
  "pd-where-mask": ["where", "mask"],
  "pd-clip-round": ["clip", "round"],
  "pd-join": ["join"],
  "pd-unstack-stack": ["stack", "unstack"],
  "pd-pct-change-diff": ["pct_change", "diff"],
  "pd-pipe": ["pipe"],
  "pd-cumsum-cumcount": ["cumsum"],
  "pd-interpolate": ["interpolate"],
  "pd-reindex": ["reindex"],
  "pd-insert": ["insert"],
}

const pandasSeriesPaths = {
  "pd-map": ["map"],
  "pd-value-counts": ["value_counts"],
  "pd-str-contains": ["str.contains"],
  "pd-str-extract": ["str.extract"],
  "pd-between": ["between"],
  "pd-notna": ["notna", "isna"],
  "pd-str-strip-lower": ["str.strip", "str.lower"],
}

const pandasSearchLikeRefs = {
  "pd-groupby-agg": [
    pandasRef(
      "pandas.DataFrame.groupby",
      "DataFrame.groupby()",
      "先理解 GroupBy 对象如何生成，再看 agg、transform、filter 的差异。"
    ),
  ],
  "pd-groupby-transform": [
    pandasRef(
      "pandas.DataFrame.groupby",
      "DataFrame.groupby()",
      "transform 属于 GroupBy 结果上的常见延展操作，官方页会顺着 GroupBy 对象继续展开。"
    ),
  ],
  "pd-groupby-filter": [
    pandasRef(
      "pandas.DataFrame.groupby",
      "DataFrame.groupby()",
      "filter 属于 GroupBy 结果上的筛组选项，建议从 groupby 官方页继续查看。"
    ),
  ],
  "pd-dt-accessor": [
    pandasRef(
      "pandas.Series.dt",
      "Series.dt",
      "适合对照 DatetimeLike 访问器支持的方法、属性和返回类型。"
    ),
  ],
}

const sklearnPaths = {
  "sk-train-test-split": ["model_selection.train_test_split", "train_test_split()"],
  "sk-standardscaler": ["preprocessing.StandardScaler", "StandardScaler()"],
  "sk-minmaxscaler": ["preprocessing.MinMaxScaler", "MinMaxScaler()"],
  "sk-onehotencoder": ["preprocessing.OneHotEncoder", "OneHotEncoder()"],
  "sk-simpleimputer": ["impute.SimpleImputer", "SimpleImputer()"],
  "sk-columntransformer": ["compose.ColumnTransformer", "ColumnTransformer()"],
  "sk-pipeline": ["pipeline.Pipeline", "Pipeline()"],
  "sk-linear-regression": ["linear_model.LinearRegression", "LinearRegression()"],
  "sk-logistic-regression": ["linear_model.LogisticRegression", "LogisticRegression()"],
  "sk-random-forest": ["ensemble.RandomForestClassifier", "RandomForestClassifier()"],
  "sk-kmeans": ["cluster.KMeans", "KMeans()"],
  "sk-pca": ["decomposition.PCA", "PCA()"],
  "sk-cross-val-score": ["model_selection.cross_val_score", "cross_val_score()"],
  "sk-grid-search": ["model_selection.GridSearchCV", "GridSearchCV()"],
  "sk-confusion-matrix": ["metrics.confusion_matrix", "confusion_matrix()"],
  "sk-classification-report": ["metrics.classification_report", "classification_report()"],
  "sk-roc-auc": ["metrics.roc_auc_score", "roc_auc_score()"],
  "sk-silhouette-score": ["metrics.silhouette_score", "silhouette_score()"],
}

const statsmodelsRefs = {
  "sm-add-constant": [
    {
      label: "add_constant()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.tools.tools.add_constant.html",
    },
  ],
  "sm-ols": [
    {
      label: "OLS()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.regression.linear_model.OLS.html",
    },
  ],
  "sm-formula-ols": [
    {
      label: "smf.ols()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.formula.api.ols.html",
    },
  ],
  "sm-logit": [
    {
      label: "Logit()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.discrete.discrete_model.Logit.html",
    },
  ],
  "sm-summary": [
    {
      label: "RegressionResults.summary()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.regression.linear_model.RegressionResults.summary.html",
    },
  ],
  "sm-anova-lm": [
    {
      label: "anova_lm()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.stats.anova.anova_lm.html",
    },
  ],
  "sm-descrstats": [
    {
      label: "DescrStatsW()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.stats.weightstats.DescrStatsW.html",
    },
  ],
  "sm-acf-pacf": [
    {
      label: "acf()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.stattools.acf.html",
    },
    {
      label: "pacf()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.stattools.pacf.html",
    },
  ],
  "sm-seasonal-decompose": [
    {
      label: "seasonal_decompose()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.seasonal.seasonal_decompose.html",
    },
  ],
  "sm-arima": [
    {
      label: "ARIMA()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html",
    },
  ],
  "sm-qqplot": [
    {
      label: "qqplot()",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.graphics.gofplots.qqplot.html",
    },
  ],
}

const kerasRefs = {
  "keras-sequential": [
    { label: "Sequential", url: "https://keras.io/api/models/sequential/" },
  ],
  "keras-dense": [
    { label: "Dense", url: "https://keras.io/api/layers/core_layers/dense/" },
  ],
  "keras-dropout": [
    { label: "Dropout", url: "https://keras.io/api/layers/regularization_layers/dropout/" },
  ],
  "keras-compile": [
    { label: "Model.compile", url: "https://keras.io/api/models/model_training_apis/" },
  ],
  "keras-fit": [
    { label: "Model.fit", url: "https://keras.io/api/models/model_training_apis/" },
  ],
  "keras-evaluate": [
    { label: "Model.evaluate", url: "https://keras.io/api/models/model_training_apis/" },
  ],
  "keras-predict": [
    { label: "Model.predict", url: "https://keras.io/api/models/model_training_apis/" },
  ],
  "keras-earlystopping": [
    { label: "EarlyStopping", url: "https://keras.io/api/callbacks/early_stopping/" },
  ],
  "keras-modelcheckpoint": [
    { label: "ModelCheckpoint", url: "https://keras.io/api/callbacks/model_checkpoint/" },
  ],
  "keras-conv2d": [
    { label: "Conv2D", url: "https://keras.io/api/layers/convolution_layers/convolution2d/" },
  ],
  "keras-embedding": [
    { label: "Embedding", url: "https://keras.io/api/layers/core_layers/embedding/" },
  ],
  "keras-lstm": [
    { label: "LSTM", url: "https://keras.io/api/layers/recurrent_layers/lstm/" },
  ],
}

const gensimRefs = {
  "gen-dictionary": [
    { label: "Dictionary", url: "https://radimrehurek.com/gensim/corpora/dictionary.html" },
  ],
  "gen-doc2bow": [
    { label: "doc2bow()", url: "https://radimrehurek.com/gensim/corpora/dictionary.html" },
  ],
  "gen-tfidfmodel": [
    { label: "TfidfModel", url: "https://radimrehurek.com/gensim/models/tfidfmodel.html" },
  ],
  "gen-ldamodel": [
    { label: "LdaModel", url: "https://radimrehurek.com/gensim/models/ldamodel.html" },
  ],
  "gen-ldamodel-print-topics": [
    { label: "print_topics()", url: "https://radimrehurek.com/gensim/models/ldamodel.html" },
  ],
  "gen-word2vec": [
    { label: "Word2Vec", url: "https://radimrehurek.com/gensim/models/word2vec.html" },
  ],
  "gen-keyedvectors-most-similar": [
    { label: "KeyedVectors.most_similar()", url: "https://radimrehurek.com/gensim/models/keyedvectors.html" },
  ],
  "gen-similarities-matrixsimilarity": [
    { label: "MatrixSimilarity", url: "https://radimrehurek.com/gensim/similarities/docsim.html" },
  ],
  "gen-phrases": [
    { label: "Phrases", url: "https://radimrehurek.com/gensim/models/phrases.html" },
  ],
}

function buildPandasOfficialReferences(command) {
  if (pandasSearchLikeRefs[command.id]) {
    return uniqueRefs(pandasSearchLikeRefs[command.id])
  }

  if (pandasFunctionPaths[command.id]) {
    return uniqueRefs(
      pandasFunctionPaths[command.id].map(([path, label]) =>
        pandasRef(path, label, "适合直接对照官方参数、返回值和示例。")
      )
    )
  }

  if (pandasDataFramePaths[command.id]) {
    return uniqueRefs(
      pandasDataFramePaths[command.id].map((name) =>
        pandasRef(
          `pandas.DataFrame.${name}`,
          `${name}()`,
          "适合查看 DataFrame 对象上的完整参数、返回对象和使用限制。"
        )
      )
    )
  }

  if (pandasSeriesPaths[command.id]) {
    return uniqueRefs(
      pandasSeriesPaths[command.id].map((name) =>
        pandasRef(
          `pandas.Series.${name}`,
          `${name}()`,
          "适合查看 Series 或访问器相关 API 的完整参数说明。"
        )
      )
    )
  }

  return []
}

function buildNumpyOfficialReferences(command) {
  if (command.id === "np-boolean-mask") {
    return [
      createOfficialRef({
        label: "NumPy 布尔索引",
        url: "https://numpy.org/doc/stable/user/basics.indexing.html",
        source: libraryOfficialMeta.numpy.source,
        note: "适合查看切片、花式索引与布尔掩码在官方文档中的统一说明。",
      }),
    ]
  }

  const tokens = extractCallTokens(command.title).map((token) => token.replace(/^np\./, ""))
  if (!tokens.length) {
    return []
  }

  return uniqueRefs(
    tokens.map((token) =>
      numpyRef(token, `numpy.${token}()`, "适合查看官方数组 API 的完整参数、广播规则和返回类型。")
    )
  )
}

function buildScipyOfficialReferences(command) {
  const tokens = extractCallTokens(command.title)
  if (!tokens.length) {
    return []
  }

  return uniqueRefs(
    tokens.map((token) => {
      const normalized =
        token.startsWith("distance.") || token === "squareform"
          ? `spatial.${token}`
          : token
      return scipyRef(
        normalized,
        `scipy.${normalized}()`,
        "适合查看 SciPy 模块级函数的完整参数、返回值和数学定义。"
      )
    })
  )
}

function buildSeabornOfficialReferences(command) {
  const tokens = extractCallTokens(command.title).map((token) => token.replace(/^sns\./, ""))
  if (!tokens.length) {
    return []
  }

  return uniqueRefs(
    tokens.map((token) =>
      seabornRef(
        token,
        `seaborn.${token}()`,
        "适合查看语义映射、统计聚合和 figure-level / axes-level 差异。"
      )
    )
  )
}

function buildMatplotlibOfficialReferences(command) {
  const tokens = extractCallTokens(command.title).map((token) => token.replace(/^plt\./, ""))
  if (!tokens.length) {
    return []
  }

  return uniqueRefs(
    tokens.map((token) => {
      if (token.startsWith("secondary_")) {
        return axesRef(
          token,
          `Axes.${token}()`,
          "适合查看坐标轴级别的完整参数、返回对象和配套方法。"
        )
      }

      return pyplotRef(
        token,
        `plt.${token}()`,
        "适合查看 pyplot 风格 API 的完整参数、Artist 返回值和布局说明。"
      )
    })
  )
}

function buildSklearnOfficialReferences(command) {
  const entry = sklearnPaths[command.id]
  if (!entry) {
    return []
  }

  return [
    createOfficialRef({
      label: entry[1],
      url: `https://scikit-learn.org/stable/modules/generated/sklearn.${entry[0]}.html`,
      source: libraryOfficialMeta.sklearn.source,
      note: "适合查看 estimator / transformer 的完整参数、属性和示例。",
    }),
  ]
}

function buildStatsmodelsOfficialReferences(command) {
  const refs = statsmodelsRefs[command.id] ?? []
  return refs.map((item) =>
    createOfficialRef({
      label: item.label,
      url: item.url,
      source: libraryOfficialMeta.statsmodels.source,
      note: "适合对照统计模型、结果对象和检验输出的原始定义。",
    })
  )
}

function buildKerasOfficialReferences(command) {
  const refs = kerasRefs[command.id] ?? []
  return refs.map((item) =>
    createOfficialRef({
      label: item.label,
      url: item.url,
      source: libraryOfficialMeta.keras.source,
      note: "适合查看层、模型和训练 API 的完整参数与返回对象说明。",
    })
  )
}

function buildGensimOfficialReferences(command) {
  const refs = gensimRefs[command.id] ?? []
  return refs.map((item) =>
    createOfficialRef({
      label: item.label,
      url: item.url,
      source: libraryOfficialMeta.gensim.source,
      note: "适合查看文本建模对象、训练参数和底层表示结构。",
    })
  )
}

function buildOfficialReferences(command) {
  const guide = buildGuideReference(command.library)
  let refs = []

  switch (command.library) {
    case "pandas":
      refs = buildPandasOfficialReferences(command)
      break
    case "numpy":
      refs = buildNumpyOfficialReferences(command)
      break
    case "scipy":
      refs = buildScipyOfficialReferences(command)
      break
    case "statsmodels":
      refs = buildStatsmodelsOfficialReferences(command)
      break
    case "sklearn":
      refs = buildSklearnOfficialReferences(command)
      break
    case "keras":
      refs = buildKerasOfficialReferences(command)
      break
    case "gensim":
      refs = buildGensimOfficialReferences(command)
      break
    case "seaborn":
      refs = buildSeabornOfficialReferences(command)
      break
    case "matplotlib":
      refs = buildMatplotlibOfficialReferences(command)
      break
    default:
      refs = []
  }

  return uniqueRefs([guide, ...refs].filter(Boolean))
}

const parameterCatalog = {
  filepath_or_buffer: createParamDoc(
    "filepath_or_buffer",
    "输入的数据源路径或可读取对象。",
    "最常见是本地文件路径，也可以是 URL、文件句柄或内存缓冲区。"
  ),
  io: createParamDoc(
    "io",
    "传入要读取的文件或类文件对象。",
    "在 pandas 的读写函数里，这个位置通常承担数据源入口。"
  ),
  path: createParamDoc(
    "path",
    "输出文件的保存路径。",
    "建议把导出目录和文件名写清楚，避免覆盖旧结果。"
  ),
  sep: createParamDoc(
    "sep",
    "字段分隔符。",
    "CSV 默认是逗号，遇到制表符、分号或竖线文本时要显式指定。"
  ),
  encoding: createParamDoc(
    "encoding",
    "文件编码方式。",
    "中文数据常见是 utf-8、utf-8-sig、gbk；乱码时优先检查这里。"
  ),
  usecols: createParamDoc(
    "usecols",
    "限制要读取或保留的列。",
    "大文件场景先裁列可以显著降低内存和解析时间。"
  ),
  parse_dates: createParamDoc(
    "parse_dates",
    "指定需要直接解析成日期时间的列。",
    "在读入阶段完成日期解析，通常比后面再转换更干净。"
  ),
  sheet_name: createParamDoc(
    "sheet_name",
    "指定 Excel 工作表名称或索引。",
    "多 sheet 文件里最好显式写出目标工作表，避免拿错数据。"
  ),
  index: createParamDoc(
    "index",
    "控制是否把索引写出，或指定索引位置。",
    "导出时常用 index=False，避免生成多余的行号列。"
  ),
  n: createParamDoc(
    "n",
    "要查看、抽样或处理的数量。",
    "适合先在小样本上验证写法，再扩展到全量数据。"
  ),
  frac: createParamDoc(
    "frac",
    "按比例抽样。",
    "当行数不固定时，比直接写 n 更方便。"
  ),
  random_state: createParamDoc(
    "random_state",
    "随机种子。",
    "为了让抽样或随机结果可复现，团队协作时建议固定。"
  ),
  condition: createParamDoc(
    "condition",
    "筛选条件或布尔表达式。",
    "条件应返回与原对象对齐的布尔结果，避免长度不一致。"
  ),
  rows: createParamDoc(
    "rows",
    "行选择器。",
    "可以是标签、切片、布尔序列或列表，取决于 API 语义。"
  ),
  columns: createParamDoc(
    "columns",
    "列选择器。",
    "建议显式列出需要的列，能让结果形状更稳定。"
  ),
  expr: createParamDoc(
    "expr",
    "字符串表达式或计算公式。",
    "适合把复杂条件写成可读性更高的一行，但要注意列名转义。"
  ),
  value: createParamDoc(
    "value",
    "填充值、替换值或计算结果。",
    "补值时最好先明确业务口径，区分缺失和真实的 0。"
  ),
  method: createParamDoc(
    "method",
    "处理或聚合的方法名。",
    "不同函数里可表示插值方式、填充方向、统计方法等核心行为。"
  ),
  subset: createParamDoc(
    "subset",
    "限定参与判断的列集合。",
    "去重、空值处理和排序时常用它聚焦关键列。"
  ),
  keep: createParamDoc(
    "keep",
    "遇到重复值时保留哪一条。",
    "常见取值有 first、last 和 False，建议先想清楚保留规则。"
  ),
  axis: createParamDoc(
    "axis",
    "指定按行还是按列操作。",
    "大多数 pandas API 中，0 或 index 表示按行，1 或 columns 表示按列。"
  ),
  inplace: createParamDoc(
    "inplace",
    "是否直接修改原对象。",
    "团队代码里通常更推荐返回新对象，便于排查和回溯。"
  ),
  errors: createParamDoc(
    "errors",
    "控制异常时是报错、忽略还是转成缺失。",
    "数据脏时很实用，但要配合后续检查，别让问题静默吞掉。"
  ),
  dtype: createParamDoc(
    "dtype",
    "目标数据类型。",
    "对数值精度、内存占用和后续运算结果都有直接影响。"
  ),
  mapper: createParamDoc(
    "mapper",
    "映射关系或重命名字典。",
    "适合做枚举值替换、标签翻译和列名统一。"
  ),
  func: createParamDoc(
    "func",
    "应用到数据上的函数。",
    "优先使用向量化函数；只有规则真的复杂时再退回 apply。"
  ),
  by: createParamDoc(
    "by",
    "分组键、排序键或连接键。",
    "它决定数据如何被切块或对齐，是结果正确性的关键参数。"
  ),
  aggfunc: createParamDoc(
    "aggfunc",
    "聚合函数或统计方法。",
    "可以是单个函数、函数列表，或命名聚合字典。"
  ),
  as_index: createParamDoc(
    "as_index",
    "分组键是否保留为索引。",
    "做报表输出时常设为 False，能少一次 reset_index。"
  ),
  on: createParamDoc(
    "on",
    "通用的连接键或时间键。",
    "当左右表字段名相同时最简洁，时间重采样和滚动也常用它。"
  ),
  left_on: createParamDoc(
    "left_on",
    "左表使用的连接键。",
    "当两张表的键名不同，建议显式拆开 left_on / right_on。"
  ),
  right_on: createParamDoc(
    "right_on",
    "右表使用的连接键。",
    "合并前最好先检查键的去重情况，避免意外膨胀。"
  ),
  how: createParamDoc(
    "how",
    "决定连接、删除或透视的策略。",
    "常见是 inner、left、right、outer；不同策略会直接影响记录数。"
  ),
  suffixes: createParamDoc(
    "suffixes",
    "重名列的后缀。",
    "多表合并后用它区分来源，避免覆盖同名字段。"
  ),
  keys: createParamDoc(
    "keys",
    "参与拼接、连接或构造层级索引的键。",
    "适合在 concat 后保留来源信息，便于后续回查。"
  ),
  id_vars: createParamDoc(
    "id_vars",
    "宽转长时保留下来的标识列。",
    "通常是主键、时间列或分组字段。"
  ),
  value_vars: createParamDoc(
    "value_vars",
    "宽转长时需要展开的值列。",
    "不写时会自动推断，但显式给出通常更安全。"
  ),
  value_name: createParamDoc(
    "value_name",
    "展开后的数值列名。",
    "命名清楚可以减少下游绘图和分组时的歧义。"
  ),
  var_name: createParamDoc(
    "var_name",
    "展开后的变量列名。",
    "适合把原来的列头转成新的分类维度。"
  ),
  bins: createParamDoc(
    "bins",
    "分箱数量、边界或直方图箱数。",
    "过多会噪声大，过少会掩盖结构，通常要结合业务粒度调整。"
  ),
  labels: createParamDoc(
    "labels",
    "分箱或图例标签。",
    "显式标签能让输出更适合报表和业务沟通。"
  ),
  q: createParamDoc(
    "q",
    "分位点数量或百分位位置。",
    "做 qcut 或 quantile 时，它决定切分口径。"
  ),
  drop_first: createParamDoc(
    "drop_first",
    "是否在哑变量展开时少保留一列。",
    "做线性模型时可减少完全共线性。"
  ),
  format: createParamDoc(
    "format",
    "日期字符串的解析格式。",
    "格式明确时显式指定，能提升解析速度并减少歧义。"
  ),
  freq: createParamDoc(
    "freq",
    "时间频率，如 D、W、M、Q。",
    "重采样、日期偏移和窗口计算都依赖它描述时间粒度。"
  ),
  periods: createParamDoc(
    "periods",
    "向前或向后移动的期数。",
    "shift、pct_change、diff 里都很常用。"
  ),
  window: createParamDoc(
    "window",
    "滚动窗口大小。",
    "决定平滑程度和对短期波动的敏感度。"
  ),
  min_periods: createParamDoc(
    "min_periods",
    "窗口内至少需要的有效值数量。",
    "可以减少窗口前几期大量 NaN 的问题。"
  ),
  lower: createParamDoc(
    "lower",
    "下界或最小值。",
    "clip、坐标范围和阈值类函数里都可用来限制底部边界。"
  ),
  upper: createParamDoc(
    "upper",
    "上界或最大值。",
    "通常和 lower 配套使用，适合截尾和视图缩放。"
  ),
  decimals: createParamDoc(
    "decimals",
    "保留小数位数。",
    "展示和导出前很常用，但建模前不建议过早截断精度。"
  ),
  a: createParamDoc(
    "a",
    "主输入数组。",
    "numpy 大多数函数都以它作为被计算对象。"
  ),
  shape: createParamDoc(
    "shape",
    "目标数组形状。",
    "改形状前要确认元素总数保持一致。"
  ),
  axis_numpy: createParamDoc(
    "axis",
    "指定沿哪个维度计算。",
    "numpy 中 0 常表示按列聚合，1 表示按行聚合。"
  ),
  size: createParamDoc(
    "size",
    "输出长度或维度规模。",
    "和 shape 搭配时决定结果的体量。"
  ),
  loc: createParamDoc(
    "loc",
    "随机分布的中心位置或均值。",
    "在随机数生成里决定整体位置，在正态分布里尤其常见。"
  ),
  scale: createParamDoc(
    "scale",
    "分布的波动尺度或标准差。",
    "值越大，生成结果离散程度通常越高。"
  ),
  start: createParamDoc(
    "start",
    "起始值。",
    "arange、linspace、切片和坐标轴范围都常用它做边界。"
  ),
  stop: createParamDoc(
    "stop",
    "结束值。",
    "需要留意函数是否包含右边界。"
  ),
  step: createParamDoc(
    "step",
    "步长或间距。",
    "它决定采样密度、网格间距和阶梯图的跳变位置。"
  ),
  x: createParamDoc(
    "x",
    "横轴变量、输入向量或第一组数组。",
    "在绘图里通常映射到横轴，在数学函数里常作为自变量。"
  ),
  y: createParamDoc(
    "y",
    "纵轴变量、目标向量或第二组数组。",
    "在绘图里通常映射到纵轴，在运算里常与 x 配对。"
  ),
  values: createParamDoc(
    "values",
    "用于统计、透视或作图的数值列。",
    "它决定最终被汇总、渲染或对比的核心指标。"
  ),
  data: createParamDoc(
    "data",
    "提供绘图或计算所需数据的对象。",
    "在 seaborn 中常用 DataFrame，这样 x、y、hue 能直接引用列名。"
  ),
  hue: createParamDoc(
    "hue",
    "用颜色区分的分组变量。",
    "是统计图里最常用的对比维度，但类别过多会让图变乱。"
  ),
  style: createParamDoc(
    "style",
    "用线型或标记区分的分组变量。",
    "和 hue 结合时能让黑白打印或色盲场景更容易区分。"
  ),
  size_plot: createParamDoc(
    "size",
    "控制点大小或子图尺寸的变量。",
    "适合把第三个数值维度带进图里，但要避免视觉误导。"
  ),
  estimator: createParamDoc(
    "estimator",
    "当存在重复 x 时如何聚合 y。",
    "seaborn 默认常会做均值，想看原始点时要显式关闭或换图。"
  ),
  cmap: createParamDoc(
    "cmap",
    "颜色映射方案。",
    "热力图、矩阵图和图像展示里决定颜色梯度的语义。"
  ),
  annot: createParamDoc(
    "annot",
    "是否在格子里直接显示数值。",
    "适合小矩阵展示，但矩阵过大时会显得拥挤。"
  ),
  figsize: createParamDoc(
    "figsize",
    "画布宽高，单位是英寸。",
    "输出给幻灯片或报告时，最好先按版面尺寸规划。"
  ),
  ax: createParamDoc(
    "ax",
    "要绘制到哪个坐标轴对象上。",
    "多子图场景里尽量显式传 ax，避免画到意外的图上。"
  ),
  label: createParamDoc(
    "label",
    "图例中显示的名称。",
    "有多条线或多组柱时建议始终提供，后续 legend 更清楚。"
  ),
  alpha: createParamDoc(
    "alpha",
    "透明度。",
    "散点多、区域重叠多时常用来减轻遮挡。"
  ),
  color: createParamDoc(
    "color",
    "单个图形元素的颜色。",
    "如果已经用 hue 分组，通常不要再手动指定冲突的色彩。"
  ),
  dpi: createParamDoc(
    "dpi",
    "输出分辨率。",
    "保存图片到报告或打印时，这个参数直接决定清晰度。"
  ),
}

const categoryAdvice = {
  io: [
    "先确认源文件编码、分隔符和日期列，再把读取逻辑固化下来。",
    "大文件优先裁列或抽样读入，先验证结构再上全量。",
  ],
  inspect: [
    "用它快速摸底数据结构，而不是直接替代完整的数据质量检查。",
    "先看样本、类型和缺失比例，再决定清洗与建模策略。",
  ],
  filter: [
    "先把条件拆清楚，再做列筛选，避免把布尔逻辑和字段投影写乱。",
    "复杂筛选最好先做中间变量，便于抽样核对结果。",
  ],
  clean: [
    "建议先明确业务规则，再决定是补值、删行还是改类型。",
    "保留原始列或备份中间结果，能显著降低返工成本。",
  ],
  transform: [
    "字段衍生适合和 assign、map 这类可读性高的写法配合使用。",
    "优先选择向量化方案，只有规则真的复杂时再用逐行 apply。",
  ],
  group: [
    "分组前先确认键是否有脏值或意外空值，避免统计口径偏移。",
    "聚合后立刻检查记录数和分母，别只盯着结果列。",
  ],
  join: [
    "合并前最好先验证键的唯一性和缺失情况。",
    "连接后第一时间核对行数，排查一对多放大问题。",
  ],
  reshape: [
    "形状调整前先明确宽表和长表的目标结构。",
    "透视、堆叠和展开很依赖唯一键，必要时先去重。",
  ],
  time: [
    "时间处理前先转 datetime 并排序，这一步往往决定后续是否稳定。",
    "重采样和窗口计算要先讲清时间粒度与时区口径。",
  ],
  numeric: [
    "先确认数组形状和 dtype，再做广播或矩阵运算。",
    "向量化数值计算适合批量处理，但维度错位会让结果悄悄出错。",
  ],
  stats: [
    "先确认假设检验的前提条件，再解释 p 值和统计量。",
    "检验前最好先检查样本量、异常值和分布形态，避免机械套用。",
  ],
  optimize: [
    "优化问题先写清楚目标函数、约束和初始值，再关注算法选择。",
    "求解结果除了看最优值，也要检查是否收敛以及参数是否有业务意义。",
  ],
  signal: [
    "信号处理类方法很适合平滑、峰值检测和卷积，但要避免过度处理掩盖真实结构。",
    "滤波前先确认采样频率、窗口大小和边界处理方式。",
  ],
  model: [
    "建模前先把特征、标签、数据切分和口径说清楚，再讨论算法效果。",
    "训练结果除了看分数，还要看是否存在过拟合、数据泄漏或形状错误。",
  ],
  evaluate: [
    "评估类命令最好和业务目标一起理解，不要只看单个指标的高低。",
    "分类、回归和聚类的评估指标完全不同，先确认任务类型再选。",
  ],
  text: [
    "文本挖掘前要先想清楚语料清洗、分词和停用词策略。",
    "主题模型和词向量的输入结构不同，理解语料表示方式比背 API 更重要。",
  ],
  plot: [
    "先确认数据结构是否适合当前图表，再调颜色、注释和版式。",
    "图表完成后最好补标题、轴标签和保存参数，方便直接复用到报告。",
  ],
}

const libraryAdvice = {
  pandas: [
    "pandas 很多操作会保留索引对齐语义，结果不对时先检查索引和键。",
  ],
  numpy: [
    "numpy 的性能优势来自向量化和广播，维度和 dtype 是最值得先确认的两件事。",
  ],
  scipy: [
    "scipy 更偏算法与统计推断，除了会用 API，更要清楚前提假设和参数口径。",
  ],
  statsmodels: [
    "statsmodels 更强调模型解释和统计推断，拟合结果里的系数、置信区间和检验信息很重要。",
  ],
  sklearn: [
    "scikit-learn 更像流程化机器学习工具箱，切分、预处理、训练和评估最好通过统一流水线串起来。",
  ],
  keras: [
    "keras 命令需要和输入张量形状一起看，网络层堆叠时先想清楚维度流动。",
  ],
  gensim: [
    "gensim 的核心不是表格，而是语料、词典、词袋和语义空间之间的转换关系。",
  ],
  seaborn: [
    "seaborn 更擅长统计图和长表输入，分组字段太多时要主动收敛视觉层次。",
  ],
  matplotlib: [
    "matplotlib 更底层也更灵活，复杂图通常要显式管理 figure 和 axes。",
  ],
}

const categoryProfessional = {
  io: "这类指令通常位于流程起点或终点，核心是把数据结构和文件约束处理干净，避免脏格式一路传到下游。",
  inspect:
    "它们更适合做结构摸底和质量巡检，不应该代替正式的数据校验规则。",
  filter:
    "筛选类 API 最容易出的问题是条件与原对象长度不对齐，或把标签索引和位置索引混用。",
  clean:
    "清洗类 API 需要同时关注缺失值口径、类型转换失败行为，以及是否会影响后续统计分母。",
  transform:
    "字段变换的重点是保证结果与原索引对齐，同时让业务规则保持可读、可回查。",
  group:
    "分组运算要明确返回的是聚合结果、逐行广播结果，还是过滤后的原始记录。",
  join:
    "连接类 API 的专业重点是主键基数、空值键处理、连接方向以及重复键导致的记录膨胀。",
  reshape:
    "形状调整本质上是在重排索引、列和维度，唯一性与缺失值处理会直接影响结果稳定性。",
  time:
    "时间类 API 对排序、频率、时区、窗口边界和缺失期的处理都非常敏感。",
  numeric:
    "数值计算类 API 的核心是广播规则、轴语义、精度和 NaN 传播行为。",
  stats:
    "统计推断类 API 的关键在于原假设、样本独立性、分布假设以及输出统计量的解释方式。",
  optimize:
    "优化类 API 的重点是目标函数是否光滑、约束形式、初始值敏感性以及收敛状态解读。",
  signal:
    "信号处理类 API 需要关注窗口长度、边界条件、采样频率以及是否引入相位偏移。",
  model:
    "建模训练类 API 的重点是输入特征结构、训练数据边界、超参数设定以及是否存在数据泄漏。",
  evaluate:
    "评估类 API 的专业重点是指标与任务类型的匹配，以及阈值、样本不均衡和交叉验证口径的影响。",
  text:
    "文本挖掘类 API 的关键在于语料预处理、词典构建方式、稀疏表示和语义空间解释。",
  plot:
    "绘图类 API 除了图形本身，还要关注输入表结构、聚合口径和最终输出清晰度。",
}

const libraryProfessional = {
  pandas:
    "在 pandas 里，是否返回新对象、是否保留索引，以及链式调用中的对齐行为，是理解结果的关键。",
  numpy:
    "在 numpy 里，很多函数默认返回 ndarray；广播失败或 dtype 提升往往是定位问题的第一入口。",
  scipy:
    "在 scipy 里，很多函数返回的不只是数值本身，还会附带检验统计量、拟合参数、协方差或求解状态信息。",
  statsmodels:
    "在 statsmodels 里，模型对象、结果对象和 summary 输出的层次关系，是理解统计建模结果的关键。",
  sklearn:
    "在 scikit-learn 里，Estimator、Transformer、Pipeline 和 Metric 之间的角色分工非常明确。",
  keras:
    "在 keras 里，模型结构、compile 配置、fit 过程和 callback 行为共同决定训练表现。",
  gensim:
    "在 gensim 里，Dictionary、Corpus、Model 和 Similarity 索引通常是串联出现的一整条文本处理链。",
  seaborn:
    "在 seaborn 里，很多图默认会做统计聚合或置信区间估计，专业使用时要主动确认估计口径。",
  matplotlib:
    "在 matplotlib 里，figure、axes、artist 之间的关系决定了复杂图表的可控程度与可复用性。",
}

function getParam(name, overrides = {}) {
  const base = parameterCatalog[name] ?? createParamDoc(
    name,
    "控制当前写法行为的核心参数。",
    "建议结合示例和输出结果一起验证它对结果形状的影响。"
  )

  return {
    name: overrides.name ?? base.name,
    meaning: overrides.meaning ?? base.meaning,
    detail: overrides.detail ?? base.detail,
  }
}

function buildRecommendedUse(command) {
  return uniqueStrings([
    command.when || command.summary,
    ...(categoryAdvice[command.category] ?? []),
    ...(libraryAdvice[command.library] ?? []),
    ...(command.tips ?? []),
  ]).slice(0, 4)
}

function buildProfessionalDetail(command) {
  return [
    `${command.title} 常用于${categoryMeta?.[command.category]?.label ?? command.category}阶段。${command.summary}`,
    categoryProfessional[command.category] ?? "",
    libraryProfessional[command.library] ?? "",
  ]
    .filter(Boolean)
    .join(" ")
}

function buildGenericParameters(command) {
  if (command.library === "seaborn") {
    return [
      getParam("data"),
      getParam("x"),
      getParam("y"),
      getParam("hue"),
      getParam("ax"),
    ]
  }

  if (command.library === "matplotlib") {
    return [
      getParam("x"),
      getParam("y"),
      getParam("figsize"),
      getParam("label"),
      getParam("color"),
    ]
  }

  if (command.library === "numpy") {
    return [
      getParam("a"),
      getParam("axis_numpy"),
      getParam("dtype"),
      getParam("shape"),
    ]
  }

  if (command.library === "scipy") {
    return [
      getParam("x"),
      getParam("y"),
      getParam("method"),
      getParam("axis_numpy"),
    ]
  }

  if (command.library === "statsmodels") {
    return [
      getParam("X", {
        name: "X / exog",
        meaning: "自变量或外生变量矩阵。",
        detail: "通常每行一个样本、每列一个特征，是否含常数项会直接影响系数解释。",
      }),
      getParam("y", {
        name: "y / endog",
        meaning: "因变量或被解释变量。",
        detail: "长度需要与自变量样本数一致。",
      }),
      getParam("formula", {
        name: "formula",
        meaning: "公式字符串。",
        detail: "公式接口能直接引用 DataFrame 列名，适合可解释建模。",
      }),
      getParam("data"),
    ]
  }

  if (command.library === "sklearn") {
    return [
      getParam("X", {
        name: "X",
        meaning: "特征矩阵。",
        detail: "scikit-learn 几乎所有 estimator 都把 X 视为样本 x 特征的二维结构。",
      }),
      getParam("y", {
        name: "y",
        meaning: "监督学习任务中的标签。",
        detail: "分类和回归任务都需要，长度应与 X 的样本数一致。",
      }),
      getParam("random_state"),
      getParam("method"),
    ]
  }

  if (command.library === "keras") {
    return [
      getParam("input_shape", {
        name: "input_shape",
        meaning: "输入张量除批大小外的形状。",
        detail: "网络第一层最常需要它，形状定义错误会直接导致模型无法训练。",
      }),
      getParam("units", {
        name: "units / filters",
        meaning: "神经元数量或卷积核数量。",
        detail: "直接决定层的表达能力和参数规模。",
      }),
      getParam("activation"),
      getParam("epochs"),
    ]
  }

  if (command.library === "gensim") {
    return [
      getParam("texts", {
        name: "texts / corpus",
        meaning: "分词后的文本集合或语料表示。",
        detail: "通常是二维 token 列表，或经词袋编码后的语料对象。",
      }),
      getParam("dictionary", {
        name: "dictionary",
        meaning: "词典对象。",
        detail: "它负责在词与整数 id 之间建立映射，是 gensim 流程的核心枢纽。",
      }),
      getParam("model"),
      getParam("num_topics"),
    ]
  }

  return [
    getParam("axis"),
    getParam("subset"),
    getParam("inplace"),
    getParam("errors"),
  ]
}

function buildParameterDocs(command) {
  switch (command.id) {
    case "pd-read-csv":
      return [
        getParam("filepath_or_buffer"),
        getParam("sep"),
        getParam("encoding"),
        getParam("usecols"),
        getParam("parse_dates"),
      ]
    case "pd-read-excel":
      return [
        getParam("io"),
        getParam("sheet_name"),
        getParam("usecols"),
        getParam("dtype"),
        getParam("parse_dates"),
      ]
    case "pd-read-json":
      return [
        getParam("path"),
        getParam("encoding"),
        getParam("dtype"),
        getParam("lines", {
          meaning: "是否按 JSON Lines 格式逐行解析。",
          detail: "日志数据或流式导出文件经常需要设置为 true。",
        }),
        getParam("orient", {
          name: "orient",
          meaning: "JSON 结构的组织方式。",
          detail: "与导出端保持一致最重要，否则字段会被错误展开。",
        }),
      ]
    case "pd-read-parquet":
      return [
        getParam("path"),
        getParam("columns", {
          meaning: "限制要读取的列。",
          detail: "列裁剪是 Parquet 常见的性能优势之一。",
        }),
        getParam("engine", {
          name: "engine",
          meaning: "底层读取引擎。",
          detail: "常见是 pyarrow 或 fastparquet，环境差异时要显式指定。",
        }),
        getParam("dtype"),
      ]
    case "pd-to-excel-csv":
      return [
        getParam("path"),
        getParam("index"),
        getParam("encoding"),
        getParam("sheet_name"),
      ]
    case "pd-head":
    case "pd-sample":
      return [getParam("n"), getParam("frac"), getParam("random_state")]
    case "pd-info":
      return [
        getParam("verbose", {
          name: "verbose",
          meaning: "是否输出更完整的列信息。",
          detail: "列非常多时可按需关闭，以减少终端噪声。",
        }),
        getParam("show_counts", {
          name: "show_counts",
          meaning: "是否显示非空计数。",
          detail: "快速判断缺失程度时很实用。",
        }),
        getParam("memory_usage", {
          name: "memory_usage",
          meaning: "是否输出内存占用信息。",
          detail: "大表分析前先看内存，能更早发现风险。",
        }),
      ]
    case "pd-describe":
      return [
        getParam("include", {
          name: "include",
          meaning: "指定要纳入统计的列类型。",
          detail: "查看分类列时常用 include=\"object\" 或 include=\"all\"。",
        }),
        getParam("exclude", {
          name: "exclude",
          meaning: "指定要排除的列类型。",
          detail: "当只想看数值列或想排除分类列时很方便。",
        }),
        getParam("percentiles", {
          name: "percentiles",
          meaning: "自定义分位点。",
          detail: "报表常会要求 10%、90% 这类分位值。",
        }),
      ]
    case "pd-isna-sum":
    case "pd-notna":
      return [
        getParam("axis"),
        getParam("subset"),
        getParam("value", {
          meaning: "这里通常是布尔结果或缺失值统计结果。",
          detail: "可以继续和 sum、mean、loc 组合，定位缺失最严重的列或行。",
        }),
      ]
    case "pd-loc":
      return [
        getParam("rows"),
        getParam("columns"),
        getParam("condition"),
        getParam("value", {
          meaning: "用于赋值时写入的新值。",
          detail: "loc 既能筛选也能安全地按标签赋值。",
        }),
      ]
    case "pd-iloc":
      return [
        getParam("rows", {
          meaning: "基于位置的行选择器。",
          detail: "只能使用整数、切片或整数列表，不能用标签名。",
        }),
        getParam("columns", {
          meaning: "基于位置的列选择器。",
          detail: "适合列顺序固定、但列名不方便书写的场景。",
        }),
      ]
    case "pd-query":
      return [getParam("expr"), getParam("inplace"), getParam("engine", {
        name: "engine",
        meaning: "表达式求值引擎。",
        detail: "默认通常够用，表达式复杂或兼容性要求特殊时再关注。",
      })]
    case "pd-fillna":
    case "pd-interpolate":
      return [
        getParam("value"),
        getParam("method"),
        getParam("axis"),
        getParam("limit", {
          name: "limit",
          meaning: "连续填充或插值的最大跨度。",
          detail: "长缺口不宜盲目补满，limit 能帮你留住风险信号。",
        }),
      ]
    case "pd-drop-duplicates":
    case "pd-duplicated":
      return [getParam("subset"), getParam("keep"), getParam("inplace")]
    case "pd-drop":
      return [
        getParam("labels", {
          name: "labels",
          meaning: "要删除的行标签或列标签。",
          detail: "和 axis 一起决定到底删的是行还是列。",
        }),
        getParam("axis"),
        getParam("columns"),
        getParam("errors"),
      ]
    case "pd-astype":
    case "pd-to-numeric":
      return [getParam("dtype"), getParam("errors"), getParam("copy", {
        name: "copy",
        meaning: "是否尽量返回副本。",
        detail: "在类型转换密集的流程里，内存占用和副本成本值得关注。",
      })]
    case "pd-rename":
      return [getParam("mapper"), getParam("columns"), getParam("axis"), getParam("inplace")]
    case "pd-replace":
      return [
        getParam("to_replace", {
          name: "to_replace",
          meaning: "要被替换的旧值、模式或字典。",
          detail: "支持标量、列表、正则和字典映射，是批量修正脏值的常见入口。",
        }),
        getParam("value"),
        getParam("regex", {
          name: "regex",
          meaning: "是否按正则表达式匹配。",
          detail: "文本批量修正时很有用，但要注意误伤范围。",
        }),
        getParam("inplace"),
      ]
    case "pd-assign":
    case "pd-insert":
      return [
        getParam("columns", {
          meaning: "这里对应要新增的列名。",
          detail: "列名最好有业务语义，避免后续链式处理中看不懂。",
        }),
        getParam("value"),
        getParam("loc", {
          meaning: "新列插入的位置。",
          detail: "insert 才需要这个参数，用来控制列顺序。",
        }),
      ]
    case "pd-map":
      return [getParam("mapper"), getParam("na_action", {
        name: "na_action",
        meaning: "是否跳过缺失值。",
        detail: "做类别映射时，可以避免 NaN 被送进字典或函数。",
      })]
    case "pd-apply":
      return [getParam("func"), getParam("axis"), getParam("result_type", {
        name: "result_type",
        meaning: "控制 apply 后的展开形态。",
        detail: "返回 list-like 结果时尤其重要，决定是 expand 还是 reduce。",
      })]
    case "pd-value-counts":
      return [
        getParam("normalize", {
          name: "normalize",
          meaning: "是否返回占比而不是绝对次数。",
          detail: "和报表中的比例口径很贴近，经常搭配使用。",
        }),
        getParam("dropna", {
          name: "dropna",
          meaning: "是否忽略缺失值。",
          detail: "想把缺失也作为一类展示时要显式设为 false。",
        }),
        getParam("sort", {
          name: "sort",
          meaning: "是否按频数排序。",
          detail: "默认常会排序，但做字典序展示时要改掉。",
        }),
      ]
    case "pd-nunique":
      return [getParam("axis"), getParam("dropna"), getParam("subset")]
    case "pd-cut-qcut":
      return [getParam("bins"), getParam("labels"), getParam("q"), getParam("duplicates", {
        name: "duplicates",
        meaning: "分位边界重复时如何处理。",
        detail: "数据大量重复时 qcut 很常遇到这个问题。",
      })]
    case "pd-set-reset-index":
      return [getParam("keys"), getParam("drop", {
        name: "drop",
        meaning: "是否丢掉原索引或原列。",
        detail: "reset_index 和 set_index 中都常用来控制结果结构。",
      }), getParam("inplace")]
    case "pd-sort-values":
      return [getParam("by"), getParam("ascending", {
        name: "ascending",
        meaning: "排序方向。",
        detail: "支持单个布尔值，也支持和 by 等长的布尔列表。",
      }), getParam("na_position", {
        name: "na_position",
        meaning: "缺失值放在前还是后。",
        detail: "报表排序时常会显式放到最后，便于阅读。",
      })]
    case "pd-groupby-agg":
      return [getParam("by"), getParam("aggfunc"), getParam("as_index"), getParam("observed", {
        name: "observed",
        meaning: "分类分组时是否只保留观测到的组合。",
        detail: "做类别交叉统计时，结果行数会受到它的明显影响。",
      })]
    case "pd-groupby-transform":
      return [getParam("by"), getParam("func"), getParam("engine", {
        name: "engine",
        meaning: "底层执行引擎。",
        detail: "特定函数和大数据场景下可关注 numba 等加速能力。",
      })]
    case "pd-groupby-filter":
      return [getParam("by"), getParam("func"), getParam("dropna")]
    case "pd-rank":
    case "pd-cumsum-cumcount":
      return [getParam("method"), getParam("ascending", {
        name: "ascending",
        meaning: "排名或累计计算的方向。",
        detail: "做 Top N 或逆序排名时很常见。",
      }), getParam("by")]
    case "pd-pivot-table":
      return [getParam("values"), getParam("index"), getParam("columns"), getParam("aggfunc"), getParam("fill_value", {
        name: "fill_value",
        meaning: "透视后用来填补空单元格的值。",
        detail: "做展示型报表时很常设为 0 或空字符串。",
      })]
    case "pd-pivot":
      return [getParam("index"), getParam("columns"), getParam("values")]
    case "pd-crosstab":
      return [getParam("index"), getParam("columns"), getParam("normalize", {
        name: "normalize",
        meaning: "交叉表是否按整体、行或列归一化。",
        detail: "适合直接算结构占比。",
      }), getParam("margins", {
        name: "margins",
        meaning: "是否输出合计行列。",
        detail: "做报表时非常方便，但要留意和归一化一起用的解释方式。",
      })]
    case "pd-merge":
    case "pd-join":
    case "pd-merge-asof":
    case "pd-merge-ordered":
      return [
        getParam("how"),
        getParam("on"),
        getParam("left_on"),
        getParam("right_on"),
        getParam("suffixes"),
      ]
    case "pd-concat":
      return [getParam("objs", {
        name: "objs",
        meaning: "需要拼接的对象列表。",
        detail: "顺序会直接影响拼接结果，通常建议显式传入列表。",
      }), getParam("axis"), getParam("keys"), getParam("ignore_index", {
        name: "ignore_index",
        meaning: "是否重新生成连续索引。",
        detail: "纵向拼接多个来源时通常更省心。",
      })]
    case "pd-melt":
    case "pd-wide-to-long":
      return [getParam("id_vars"), getParam("value_vars"), getParam("var_name"), getParam("value_name")]
    case "pd-explode":
      return [getParam("column", {
        name: "column",
        meaning: "要展开的列表列。",
        detail: "单元格里的 list / tuple 会被拆成多行，并复制其它列。",
      }), getParam("ignore_index", {
        name: "ignore_index",
        meaning: "是否重建索引。",
        detail: "展开后通常会产生重复索引，必要时建议重置。",
      })]
    case "pd-unstack-stack":
      return [getParam("level", {
        name: "level",
        meaning: "要堆叠或展开的层级。",
        detail: "多级索引下最核心的控制参数。",
      }), getParam("fill_value", {
        name: "fill_value",
        meaning: "展开后缺失位置的填充值。",
        detail: "适合把透视后的缺口补成 0。",
      }), getParam("dropna")]
    case "pd-json-normalize":
      return [
        getParam("data"),
        getParam("record_path", {
          name: "record_path",
          meaning: "嵌套列表所在的路径。",
          detail: "它决定哪一层会被展开成多行记录。",
        }),
        getParam("meta", {
          name: "meta",
          meaning: "展开时需要同步保留的父级字段。",
          detail: "用来保留订单号、用户信息等上层上下文。",
        }),
        getParam("sep", {
          meaning: "嵌套字段展开后的列名分隔符。",
          detail: "默认是点号，适合和原始 JSON 路径对应。",
        }),
      ]
    case "pd-str-contains":
      return [getParam("pat", {
        name: "pat",
        meaning: "要匹配的文本或正则模式。",
        detail: "如果只是简单包含关系，也可以关闭 regex 来避免误判。",
      }), getParam("case", {
        name: "case",
        meaning: "是否区分大小写。",
        detail: "做标签匹配时经常会关闭，以兼容脏数据。",
      }), getParam("na_action", {
        name: "na",
        meaning: "缺失值遇到匹配时返回什么。",
        detail: "常设为 False，让缺失值不命中筛选条件。",
      })]
    case "pd-str-extract":
      return [getParam("pat", {
        name: "pat",
        meaning: "带捕获组的正则模式。",
        detail: "只有加括号的部分会被提取成新列。",
      }), getParam("expand", {
        name: "expand",
        meaning: "是否展开成 DataFrame。",
        detail: "多个捕获组时通常设为 true，更利于后续处理。",
      })]
    case "pd-str-strip-lower":
      return [getParam("to_strip", {
        name: "to_strip",
        meaning: "要去掉的字符集合。",
        detail: "不传时默认裁剪首尾空白字符。",
      }), getParam("case", {
        name: "case",
        meaning: "这里主要表示大小写归一化方向。",
        detail: "常与 strip、replace 组合处理文本脏值。",
      })]
    case "pd-get-dummies":
      return [getParam("columns"), getParam("drop_first"), getParam("dtype"), getParam("prefix", {
        name: "prefix",
        meaning: "生成列名前缀。",
        detail: "多字段同时展开时很有用，能避免列名冲突。",
      })]
    case "pd-to-datetime":
      return [getParam("arg", {
        name: "arg",
        meaning: "要转换的列、数组或标量。",
        detail: "可以是 Series，也可以是包含日期字符串的列表。",
      }), getParam("format"), getParam("errors"), getParam("utc", {
        name: "utc",
        meaning: "是否直接转换到 UTC 时区。",
        detail: "跨时区数据整合时很关键。",
      })]
    case "pd-resample":
      return [getParam("rule", {
        name: "rule",
        meaning: "重采样频率规则。",
        detail: "例如 D、W、M、Q，会直接决定汇总粒度。",
      }), getParam("on"), getParam("label", {
        name: "label",
        meaning: "标签落在区间左端还是右端。",
        detail: "月报和周报口径常会关心这个细节。",
      }), getParam("closed", {
        name: "closed",
        meaning: "区间左闭还是右闭。",
        detail: "与 label 一起决定边界点属于哪个时间桶。",
      })]
    case "pd-rolling":
      return [getParam("window"), getParam("min_periods"), getParam("center", {
        name: "center",
        meaning: "是否把窗口标签放在中间。",
        detail: "展示平滑趋势时偶尔会用，但业务时间口径要先确认。",
      }), getParam("on")]
    case "pd-shift":
    case "pd-pct-change-diff":
      return [getParam("periods"), getParam("freq"), getParam("axis"), getParam("fill_value", {
        name: "fill_value",
        meaning: "位移后新空位的填充值。",
        detail: "少量场景可以使用，但金融和时间序列分析里通常保留 NaN 更安全。",
      })]
    case "pd-dt-accessor":
      return [getParam("attribute", {
        name: ".dt 属性",
        meaning: "想提取的日期特征。",
        detail: "常见有 year、month、day、weekday、quarter 等。",
      }), getParam("freq"), getParam("format")]
    case "pd-where-mask":
      return [getParam("condition"), getParam("value"), getParam("other", {
        name: "other",
        meaning: "条件不满足时写入的替代值。",
        detail: "where 与 mask 在条件为真时的保留逻辑刚好相反。",
      })]
    case "pd-clip-round":
      return [getParam("lower"), getParam("upper"), getParam("decimals")]
    case "pd-pipe":
      return [getParam("func"), getParam("args", {
        name: "*args / **kwargs",
        meaning: "传给外部函数的附加参数。",
        detail: "让链式调用可以把业务函数安全地插进中间流程。",
      })]
    case "pd-eval":
      return [getParam("expr"), getParam("inplace"), getParam("engine"), getParam("parser", {
        name: "parser",
        meaning: "表达式解析器。",
        detail: "大多数场景保持默认即可，表达式兼容性要求特殊时再关注。",
      })]
    case "pd-reindex":
      return [getParam("index"), getParam("columns"), getParam("method"), getParam("fill_value")]
    case "np-array":
      return [getParam("object", {
        name: "object",
        meaning: "要转成数组的输入对象。",
        detail: "可以是列表、元组、Series 或其它可迭代对象。",
      }), getParam("dtype"), getParam("copy", {
        name: "copy",
        meaning: "是否尽量复制数据。",
        detail: "性能敏感时可以关注这里，但语义正确性优先。",
      })]
    case "np-zeros-ones":
    case "np-stack":
    case "np-column-stack":
      return [getParam("shape"), getParam("dtype"), getParam("fill_value", {
        name: "fill_value",
        meaning: "full 中用于填充的常量值。",
        detail: "适合快速生成占位数组和测试数据。",
      })]
    case "np-arange-linspace":
      return [getParam("start"), getParam("stop"), getParam("step"), getParam("num", {
        name: "num",
        meaning: "linspace 中生成的点数。",
        detail: "比固定步长更适合画图采样和等分区间。",
      })]
    case "np-meshgrid":
      return [getParam("x"), getParam("y"), getParam("indexing", {
        name: "indexing",
        meaning: "控制网格坐标的索引方式。",
        detail: "xy 更贴近绘图习惯，ij 更贴近矩阵索引习惯。",
      }), getParam("sparse", {
        name: "sparse",
        meaning: "是否生成稀疏网格。",
        detail: "大网格场景能明显节省内存。",
      })]
    case "np-random":
      return [getParam("loc"), getParam("scale"), getParam("size"), getParam("seed", {
        name: "seed",
        meaning: "随机数生成器的初始化种子。",
        detail: "推荐通过 default_rng(seed) 固定，不要再依赖全局随机状态。",
      })]
    case "np-reshape":
    case "np-transpose":
    case "np-concatenate":
    case "np-vstack-hstack":
    case "np-repeat-tile":
    case "np-split-array-split":
      return [getParam("a"), getParam("shape"), getParam("axis_numpy"), getParam("repeats", {
        name: "repeats / indices_or_sections",
        meaning: "控制重复次数或拆分方式。",
        detail: "不同函数名字不同，但都在描述结果维度如何变化。",
      })]
    case "np-where":
    case "np-select":
    case "np-boolean-mask":
    case "np-logical-ops":
    case "np-any-all":
      return [getParam("condition"), getParam("x"), getParam("y"), getParam("axis_numpy")]
    case "np-mean-axis":
    case "np-nanmean":
    case "np-sum-cumsum":
    case "np-percentile":
    case "np-histogram":
    case "np-bincount":
      return [getParam("a"), getParam("axis_numpy"), getParam("q"), getParam("bins")]
    case "np-unique":
    case "np-sort":
    case "np-argsort":
    case "np-argmax":
      return [getParam("a"), getParam("axis_numpy"), getParam("return_counts", {
        name: "return_counts / keepdims",
        meaning: "控制是否返回额外统计信息或维度结构。",
        detail: "不同函数名字不同，但都影响结果形态。",
      })]
    case "np-log-sqrt":
    case "np-dot":
    case "np-corrcoef":
    case "np-maximum-minimum":
    case "np-clip":
    case "np-nan-to-num":
    case "np-pad":
    case "np-einsum":
      return [getParam("a"), getParam("x"), getParam("y"), getParam("dtype"), getParam("mode", {
        name: "mode",
        meaning: "pad 等函数中的边界填充策略。",
        detail: "constant、edge、reflect 的语义差别很大。",
      })]
    case "np-linalg-solve":
      return [getParam("a", {
        meaning: "系数矩阵。",
        detail: "通常要求是方阵且满秩，才能稳定求解线性方程组。",
      }), getParam("b", {
        name: "b",
        meaning: "等式右侧向量或矩阵。",
        detail: "它的维度需要与系数矩阵的行数一致。",
      }), getParam("dtype"), getParam("axis_numpy")]
    case "np-linalg-norm":
      return [getParam("a"), getParam("ord", {
        name: "ord",
        meaning: "范数类型。",
        detail: "向量常见 1 范数、2 范数，无穷范数；矩阵也有对应范数定义。",
      }), getParam("axis_numpy"), getParam("keepdims", {
        name: "keepdims",
        meaning: "是否保留被归约掉的维度。",
        detail: "后续还要做广播运算时很方便。",
      })]
    case "np-diff-gradient":
      return [getParam("a"), getParam("n", {
        name: "n",
        meaning: "差分次数。",
        detail: "diff 中多次差分会进一步压缩长度，也会放大噪声。",
      }), getParam("axis_numpy"), getParam("edge_order", {
        name: "edge_order",
        meaning: "gradient 边缘处的差分阶数。",
        detail: "边界点估计方式会影响梯度平滑度。",
      })]
    case "np-searchsorted":
    case "np-digitize":
      return [getParam("a"), getParam("v", {
        name: "v / x",
        meaning: "要插入或分箱的目标值。",
        detail: "searchsorted 用于定位插入点，digitize 用于映射到箱编号。",
      }), getParam("side", {
        name: "side / right",
        meaning: "边界值落点的规则。",
        detail: "left/right 或 right=True/False 会直接影响分箱归属。",
      }), getParam("bins")]
    case "np-take":
      return [getParam("a"), getParam("indices", {
        name: "indices",
        meaning: "要提取的位置索引列表。",
        detail: "可以是单个整数、列表或数组，适合动态拼装索引。",
      }), getParam("axis_numpy"), getParam("mode", {
        name: "mode",
        meaning: "索引越界时如何处理。",
        detail: "raise、wrap、clip 会直接影响越界索引的结果。",
      })]
    case "np-isclose-allclose":
      return [getParam("a"), getParam("b", {
        name: "b",
        meaning: "要比较的另一组数组或标量。",
        detail: "两边形状需要可广播，才能逐元素比较。",
      }), getParam("rtol", {
        name: "rtol",
        meaning: "相对误差容忍度。",
        detail: "值越小要求越严格，适合数值回归测试。",
      }), getParam("atol", {
        name: "atol",
        meaning: "绝对误差容忍度。",
        detail: "非常接近 0 的数比较时尤其重要。",
      })]
    case "np-cov":
      return [getParam("m", {
        name: "m",
        meaning: "输入观测矩阵。",
        detail: "需要明确观测在行还是列，避免协方差矩阵方向搞反。",
      }), getParam("rowvar", {
        name: "rowvar",
        meaning: "是否把每一行视为一个变量。",
        detail: "默认行为和很多机器学习库习惯不同，值得特别确认。",
      }), getParam("ddof", {
        name: "ddof",
        meaning: "自由度修正。",
        detail: "样本协方差和总体协方差的口径会体现在这里。",
      }), getParam("dtype")]
    case "sp-stats-zscore":
      return [getParam("a"), getParam("axis_numpy"), getParam("ddof", {
        name: "ddof",
        meaning: "标准差计算的自由度修正。",
        detail: "样本标准差与总体标准差的选择会影响 z-score 数值。",
      }), getParam("nan_policy", {
        name: "nan_policy",
        meaning: "遇到缺失值时如何处理。",
        detail: "常见有 propagate、omit、raise，缺失较多时尤其重要。",
      })]
    case "sp-stats-ttest-ind":
      return [getParam("a"), getParam("b", {
        name: "b",
        meaning: "第二组样本。",
        detail: "与第一组样本共同构成检验的比较对象。",
      }), getParam("alternative", {
        name: "alternative",
        meaning: "备择假设方向。",
        detail: "two-sided、less、greater 会直接决定 p 值的解释方式。",
      }), getParam("equal_var", {
        name: "equal_var",
        meaning: "独立样本 t 检验里是否假设方差齐性。",
        detail: "方差不齐时更适合关闭，使用 Welch 版本检验。",
      }), getParam("nan_policy", {
        name: "nan_policy",
        meaning: "缺失值处理策略。",
        detail: "统计检验前建议先明确剔除还是忽略缺失样本。",
      })]
    case "sp-stats-ttest-rel":
      return [getParam("a"), getParam("b", {
        name: "b",
        meaning: "与第一组逐一配对的第二组样本。",
        detail: "两组长度需要一致，并且每个位置代表同一对象的两次观测。",
      }), getParam("alternative", {
        name: "alternative",
        meaning: "备择假设方向。",
        detail: "决定 p 值是双侧还是单侧意义上的显著性。",
      }), getParam("nan_policy", {
        name: "nan_policy",
        meaning: "缺失值处理策略。",
        detail: "配对样本里如果有缺失，最好先统一处理配对关系。",
      })]
    case "sp-stats-f-oneway":
      return [getParam("group_a", {
        name: "*samples",
        meaning: "两组或多组待比较样本。",
        detail: "传入的每一组样本代表一个实验组或类别组。",
      }), getParam("axis_numpy"), getParam("nan_policy", {
        name: "nan_policy",
        meaning: "缺失值处理策略。",
        detail: "ANOVA 前最好先明确缺失是否会破坏组间平衡。",
      })]
    case "sp-stats-mannwhitneyu":
      return [getParam("a"), getParam("b", {
        name: "b",
        meaning: "第二组独立样本。",
        detail: "两组样本彼此独立，不要求满足正态分布。",
      }), getParam("alternative", {
        name: "alternative",
        meaning: "备择假设方向。",
        detail: "决定比较的是整体差异还是单侧方向上的差异。",
      }), getParam("method", {
        name: "method",
        meaning: "p 值计算方式。",
        detail: "exact 或 asymptotic 会受样本量大小和并列值影响。",
      })]
    case "sp-stats-wilcoxon":
      return [getParam("a"), getParam("b", {
        name: "b",
        meaning: "配对样本的第二组观测。",
        detail: "和第一组是一一对应关系，适合前后测或配对实验。",
      }), getParam("alternative", {
        name: "alternative",
        meaning: "备择假设方向。",
        detail: "决定是否做双侧或单侧的配对秩和差异判断。",
      }), getParam("zero_method", {
        name: "zero_method",
        meaning: "差值恰好为 0 时的处理方式。",
        detail: "零差值较多时会影响有效样本量和检验口径。",
      }), getParam("method", {
        name: "method",
        meaning: "p 值计算方式。",
        detail: "样本量不大时可关注 exact 方法是否适用。",
      })]
    case "sp-stats-chi2":
      return [getParam("observed", {
        name: "observed",
        meaning: "列联表或观测频数矩阵。",
        detail: "每个单元格都是观测计数，不能直接传原始长表。",
      }), getParam("correction", {
        name: "correction",
        meaning: "是否使用连续性校正。",
        detail: "2x2 列联表里常见，但要和口径保持一致。",
      }), getParam("lambda_", {
        name: "lambda_",
        meaning: "控制使用哪种功效散度统计量。",
        detail: "默认是 Pearson 卡方，也可以切到 G-test 等近亲方法。",
      })]
    case "sp-stats-pearsonr":
    case "sp-stats-spearmanr":
    case "sp-stats-linregress":
      return [getParam("x"), getParam("y"), getParam("alternative", {
        name: "alternative",
        meaning: "备择假设方向。",
        detail: "相关性检验和线性回归显著性判断时都需要注意方向假设。",
      }), getParam("nan_policy", {
        name: "nan_policy",
        meaning: "缺失值策略。",
        detail: "对齐后的 x/y 序列若有缺失，最好先显式处理。",
      })]
    case "sp-stats-shapiro":
      return [getParam("a"), getParam("axis_numpy"), getParam("nan_policy", {
        name: "nan_policy",
        meaning: "缺失值处理策略。",
        detail: "样本量不大时常用来做正态性检查，但对异常值较敏感。",
      })]
    case "sp-stats-gaussian-kde":
      return [getParam("dataset", {
        name: "dataset",
        meaning: "用于估计密度的数据集。",
        detail: "可以是一维样本，也可以是多维样本矩阵。",
      }), getParam("bw_method", {
        name: "bw_method",
        meaning: "核密度估计的带宽方法。",
        detail: "带宽直接影响平滑程度，是 KDE 成败最关键的参数之一。",
      }), getParam("weights", {
        name: "weights",
        meaning: "每个样本的权重。",
        detail: "加权样本场景下很有用，可以保留业务重要性差异。",
      })]
    case "sp-interpolate-interp1d":
    case "sp-interpolate-spline":
      return [getParam("x"), getParam("y"), getParam("kind", {
        name: "kind / k",
        meaning: "插值类型或样条阶数。",
        detail: "linear、cubic 或样条阶数决定平滑程度和局部形状。",
      }), getParam("fill_value", {
        name: "fill_value",
        meaning: "外推或缺口位置的填充值。",
        detail: "边界外的处理方式会影响可解释性，最好显式指定。",
      }), getParam("bounds_error", {
        name: "bounds_error",
        meaning: "遇到超出原始 x 范围的点时是否报错。",
        detail: "离开训练区间后的预测往往不稳定，建议主动防守。",
      })]
    case "sp-signal-savgol":
      return [getParam("x"), getParam("window_length", {
        name: "window_length",
        meaning: "平滑窗口长度。",
        detail: "必须是正奇数，窗口越大平滑越强，但也更可能抹掉细节。",
      }), getParam("polyorder", {
        name: "polyorder",
        meaning: "局部拟合多项式阶数。",
        detail: "阶数太低会欠拟合，太高则可能把噪声也拟合进去。",
      }), getParam("mode", {
        name: "mode",
        meaning: "边界点处理方式。",
        detail: "边缘数据较短时尤其要关注 mode 对首尾形状的影响。",
      })]
    case "sp-signal-find-peaks":
      return [getParam("x"), getParam("height", {
        name: "height",
        meaning: "峰值最低高度门槛。",
        detail: "可以快速去掉小噪声峰，保留显著峰值。",
      }), getParam("distance", {
        name: "distance",
        meaning: "相邻峰之间的最小间距。",
        detail: "能避免同一大峰周围被识别出多个近邻小峰。",
      }), getParam("prominence", {
        name: "prominence",
        meaning: "峰值突显度门槛。",
        detail: "相比单纯高度，更能反映峰相对周围背景的显著性。",
      })]
    case "sp-signal-convolve":
    case "sp-signal-correlate":
      return [getParam("in1", {
        name: "in1",
        meaning: "第一组输入信号或数组。",
        detail: "通常是原始序列。",
      }), getParam("in2", {
        name: "in2",
        meaning: "第二组卷积核或参考模板。",
        detail: "卷积时常代表滤波器，相关时常代表匹配模板。",
      }), getParam("mode", {
        name: "mode",
        meaning: "输出长度策略。",
        detail: "full、same、valid 会改变边界和输出长度。",
      }), getParam("method", {
        name: "method",
        meaning: "底层计算策略。",
        detail: "长序列时 FFT 版往往更快，但不是所有场景都适合。",
      })]
    case "sp-optimize-minimize":
      return [getParam("fun", {
        name: "fun",
        meaning: "要最小化的目标函数。",
        detail: "函数需要返回标量，最好保持连续且可重复计算。",
      }), getParam("x0", {
        name: "x0",
        meaning: "初始参数猜测。",
        detail: "很多非凸问题对初始值很敏感，最好多做几组尝试。",
      }), getParam("args", {
        name: "args",
        meaning: "传给目标函数的附加参数。",
        detail: "把数据和固定超参数通过这里带进去最常见。",
      }), getParam("method", {
        name: "method",
        meaning: "优化算法。",
        detail: "BFGS、L-BFGS-B、SLSQP 等算法各有约束和速度特征。",
      }), getParam("bounds", {
        name: "bounds",
        meaning: "参数取值边界。",
        detail: "当参数有物理或业务含义时，边界往往很重要。",
      })]
    case "sp-optimize-curve-fit":
      return [getParam("f", {
        name: "f",
        meaning: "待拟合的函数模型。",
        detail: "第一个参数通常是 x，其余参数是要估计的模型参数。",
      }), getParam("xdata", {
        name: "xdata",
        meaning: "自变量观测值。",
        detail: "建议先保证排序与尺度合理，避免拟合不稳定。",
      }), getParam("ydata", {
        name: "ydata",
        meaning: "因变量观测值。",
        detail: "最好先做异常点检查，拟合对极端值很敏感。",
      }), getParam("p0", {
        name: "p0",
        meaning: "初始参数猜测。",
        detail: "初始值接近真实解时，收敛通常更稳定。",
      }), getParam("bounds", {
        name: "bounds",
        meaning: "参数上下界。",
        detail: "在物理建模或率值约束里非常常见。",
      })]
    case "sp-optimize-root":
      return [getParam("fun", {
        name: "fun",
        meaning: "要求其等于 0 的方程或方程组。",
        detail: "返回值形状应与待求解变量的形状匹配。",
      }), getParam("x0", {
        name: "x0",
        meaning: "求根初始猜测。",
        detail: "初始值会影响收敛到哪个根，甚至是否收敛。",
      }), getParam("args", {
        name: "args",
        meaning: "附加参数。",
        detail: "把固定常数或观测数据带入方程时很常用。",
      }), getParam("method", {
        name: "method",
        meaning: "求根算法。",
        detail: "hybr、lm、broyden 等算法适合的方程性质并不相同。",
      })]
    case "sp-optimize-linprog":
      return [getParam("c", {
        name: "c",
        meaning: "线性目标函数系数。",
        detail: "默认是最小化问题，最大化常通过取负来转化。",
      }), getParam("A_ub", {
        name: "A_ub",
        meaning: "不等式约束左侧系数矩阵。",
        detail: "通常与 b_ub 共同描述 A_ub @ x <= b_ub。",
      }), getParam("b_ub", {
        name: "b_ub",
        meaning: "不等式约束右侧向量。",
        detail: "量纲和约束方向要与 A_ub 保持一致。",
      }), getParam("bounds", {
        name: "bounds",
        meaning: "每个决策变量的上下界。",
        detail: "变量非负、容量上限等业务限制通常写在这里。",
      }), getParam("method", {
        name: "method",
        meaning: "线性规划求解器。",
        detail: "highs 系列是现代默认首选，速度和稳定性都较好。",
      })]
    case "sp-spatial-cdist":
    case "sp-spatial-pdist-squareform":
      return [getParam("XA", {
        name: "XA / X",
        meaning: "第一组样本点矩阵。",
        detail: "每一行通常代表一个样本，每一列代表一个特征。",
      }), getParam("XB", {
        name: "XB",
        meaning: "第二组样本点矩阵。",
        detail: "只有 cdist 需要第二组样本；pdist 只在同一组内部计算。",
      }), getParam("metric", {
        name: "metric",
        meaning: "距离度量方式。",
        detail: "euclidean、cosine、cityblock 等度量会直接决定相似性的定义。",
      })]
    case "sp-sparse-csr":
      return [getParam("data", {
        meaning: "非零元素数据，或能被转成稀疏矩阵的输入。",
        detail: "稀疏矩阵只显式保存非零值，适合大规模稀疏特征。",
      }), getParam("shape"), getParam("dtype"), getParam("copy", {
        name: "copy",
        meaning: "是否复制输入数据。",
        detail: "大规模稀疏特征矩阵场景里值得关注内存成本。",
      })]
    case "sp-special-expit":
      return [getParam("x"), getParam("dtype"), getParam("out", {
        name: "out",
        meaning: "可选的输出缓冲区。",
        detail: "性能敏感或想避免额外分配内存时可使用。",
      })]
    case "sm-add-constant":
      return [getParam("data"), getParam("prepend", {
        name: "prepend",
        meaning: "常数项插到最前面还是最后面。",
        detail: "为了与后续系数表顺序保持一致，很多人会显式关注这一点。",
      }), getParam("has_constant", {
        name: "has_constant",
        meaning: "如果数据里已经有常数列时该如何处理。",
        detail: "避免无意中加出重复截距列，是设计矩阵构造里的常见细节。",
      })]
    case "sm-ols":
    case "sm-logit":
      return [getParam("X", {
        name: "exog / X",
        meaning: "自变量矩阵。",
        detail: "通常需要自己决定是否加入常数项，这与公式接口不同。",
      }), getParam("y", {
        name: "endog / y",
        meaning: "因变量。",
        detail: "行数必须与 X 对齐，否则模型无法拟合。",
      }), getParam("missing", {
        name: "missing",
        meaning: "缺失值处理方式。",
        detail: "statsmodels 对缺失比较敏感，正式建模前最好先显式处理。",
      })]
    case "sm-formula-ols":
      return [getParam("formula", {
        meaning: "模型公式字符串。",
        detail: "可以写连续变量、分类变量 `C()` 和交互项，是 statsmodels 公式接口的核心。",
      }), getParam("data"), getParam("subset"), getParam("eval_env", {
        name: "eval_env",
        meaning: "公式求值环境。",
        detail: "当公式里引用 Python 变量或自定义函数时可能会用到。",
      })]
    case "sm-summary":
      return [getParam("alpha", {
        name: "alpha",
        meaning: "置信区间显著性水平。",
        detail: "会影响置信区间的宽度与展示口径。",
      }), getParam("float_format", {
        name: "float_format",
        meaning: "摘要表中的数值格式。",
        detail: "输出给报告时偶尔会需要统一格式化。",
      })]
    case "sm-anova-lm":
      return [getParam("model"), getParam("typ", {
        name: "typ",
        meaning: "方差分析的平方和类型。",
        detail: "Type I / II / III 会改变解释口径，类别不平衡时尤其要谨慎。",
      }), getParam("robust", {
        name: "robust",
        meaning: "是否使用稳健协方差修正。",
        detail: "异方差风险较高时值得关注。",
      })]
    case "sm-descrstats":
      return [getParam("data"), getParam("weights", {
        name: "weights",
        meaning: "观测权重。",
        detail: "抽样调查或加权样本分析时会非常重要。",
      }), getParam("ddof", {
        name: "ddof",
        meaning: "自由度修正。",
        detail: "会影响标准差和标准误差的统计口径。",
      })]
    case "sm-acf-pacf":
      return [getParam("x"), getParam("nlags", {
        name: "nlags",
        meaning: "要计算到第几个滞后阶。",
        detail: "太短看不出结构，太长则可能增加噪声和不稳定性。",
      }), getParam("fft", {
        name: "fft",
        meaning: "acf 是否使用快速傅里叶方式加速。",
        detail: "长序列场景常更快，但需要留意数值差异。",
      }), getParam("method", {
        name: "method",
        meaning: "pacf 的估计方法。",
        detail: "不同方法在短样本下表现可能不同。",
      })]
    case "sm-seasonal-decompose":
      return [getParam("x"), getParam("model", {
        meaning: "分解模型类型。",
        detail: "常见 additive 和 multiplicative，取决于季节波动是否随水平放大。",
      }), getParam("period"), getParam("two_sided", {
        name: "two_sided",
        meaning: "趋势滤波时是否双边平滑。",
        detail: "会影响趋势项在边界附近的计算方式。",
      })]
    case "sm-arima":
      return [getParam("endog", {
        name: "endog / series",
        meaning: "待建模的时间序列。",
        detail: "通常要求顺序正确，必要时先差分或稳定化处理。",
      }), getParam("order"), getParam("seasonal_order", {
        name: "seasonal_order",
        meaning: "季节性阶数设定。",
        detail: "SARIMA 场景才需要，它会把季节结构显式建模进去。",
      }), getParam("trend", {
        name: "trend",
        meaning: "趋势项设定。",
        detail: "决定模型里是否包含常数或线性趋势项。",
      })]
    case "sm-qqplot":
      return [getParam("data"), getParam("line", {
        name: "line",
        meaning: "参考线样式。",
        detail: "常见 45、s、r、q 等方式，帮助观察样本与理论分布的偏离。",
      }), getParam("fit", {
        name: "fit",
        meaning: "是否先估计分布参数再画图。",
        detail: "不同的 fit 选择会影响参考线与点位的对照方式。",
      })]
    case "sk-train-test-split":
      return [getParam("X"), getParam("y"), getParam("test_size"), getParam("random_state"), getParam("stratify", {
        name: "stratify",
        meaning: "是否按标签分层抽样。",
        detail: "类别不平衡时很重要，能让训练集和测试集类比例更一致。",
      })]
    case "sk-standardscaler":
    case "sk-minmaxscaler":
      return [getParam("X"), getParam("with_mean", {
        name: "with_mean / feature_range",
        meaning: "标准化的居中方式或归一化区间。",
        detail: "StandardScaler 和 MinMaxScaler 会在这个层面决定缩放口径。",
      }), getParam("with_std", {
        name: "with_std",
        meaning: "StandardScaler 是否按标准差缩放。",
        detail: "对稀疏矩阵或特殊尺度场景有时会关闭。",
      })]
    case "sk-onehotencoder":
      return [getParam("handle_unknown", {
        name: "handle_unknown",
        meaning: "遇到训练时没见过的新类别时如何处理。",
        detail: "上线环境中很常见，ignore 通常更稳。",
      }), getParam("sparse_output", {
        name: "sparse_output",
        meaning: "输出稀疏矩阵还是稠密数组。",
        detail: "类别很多时稀疏输出更省内存。",
      }), getParam("drop", {
        name: "drop",
        meaning: "是否丢弃一列以减少完全共线性。",
        detail: "线性模型场景里有时会这样做。",
      })]
    case "sk-simpleimputer":
      return [getParam("strategy", {
        name: "strategy",
        meaning: "填补策略。",
        detail: "mean、median、most_frequent、constant 会直接决定补值口径。",
      }), getParam("fill_value", {
        name: "fill_value",
        meaning: "constant 策略时使用的填充值。",
        detail: "文本或特殊占位场景经常会用到。",
      }), getParam("add_indicator", {
        name: "add_indicator",
        meaning: "是否额外输出缺失指示列。",
        detail: "缺失本身可能有信息量时很有帮助。",
      })]
    case "sk-columntransformer":
      return [getParam("transformers", {
        name: "transformers",
        meaning: "每一列分组对应的预处理器列表。",
        detail: "结构通常是 `(name, transformer, columns)` 三元组列表。",
      }), getParam("remainder", {
        name: "remainder",
        meaning: "未显式列出的列如何处理。",
        detail: "drop 或 passthrough 都很常见，会影响最终特征是否保留。",
      }), getParam("sparse_threshold", {
        name: "sparse_threshold",
        meaning: "决定输出是否转成稀疏矩阵的阈值。",
        detail: "高维编码场景很值得关注。",
      })]
    case "sk-pipeline":
      return [getParam("steps", {
        name: "steps",
        meaning: "流水线步骤列表。",
        detail: "除了最后一步通常是 estimator，前面的步骤一般需要同时有 `fit` 和 `transform` 能力。",
      }), getParam("memory", {
        name: "memory",
        meaning: "是否缓存中间步骤结果。",
        detail: "大流水线重复调参时能节省时间。",
      }), getParam("verbose", {
        name: "verbose",
        meaning: "是否输出步骤执行日志。",
        detail: "调试长流水线时很有帮助。",
      })]
    case "sk-linear-regression":
      return [getParam("fit_intercept", {
        name: "fit_intercept",
        meaning: "是否拟合截距。",
        detail: "如果特征已经过适当中心化，有时可以关闭。",
      }), getParam("positive", {
        name: "positive",
        meaning: "是否强制系数为非负。",
        detail: "有物理意义或业务限制时很实用。",
      })]
    case "sk-logistic-regression":
      return [getParam("penalty", {
        name: "penalty",
        meaning: "正则化类型。",
        detail: "L1、L2、elasticnet 会影响稀疏性和稳定性。",
      }), getParam("C", {
        name: "C",
        meaning: "正则化强度的倒数。",
        detail: "值越大正则越弱，越容易贴合训练集。",
      }), getParam("solver", {
        name: "solver",
        meaning: "优化求解器。",
        detail: "不同 penalty 和数据规模适配的 solver 不一样。",
      }), getParam("max_iter", {
        name: "max_iter",
        meaning: "最大迭代次数。",
        detail: "出现未收敛警告时常需要提高。",
      })]
    case "sk-random-forest":
      return [getParam("n_estimators", {
        name: "n_estimators",
        meaning: "树的数量。",
        detail: "树更多通常更稳，但训练和预测成本也会上升。",
      }), getParam("max_depth", {
        name: "max_depth",
        meaning: "单棵树的最大深度。",
        detail: "限制深度是控制过拟合的重要手段。",
      }), getParam("random_state"), getParam("class_weight", {
        name: "class_weight",
        meaning: "类别权重。",
        detail: "类别不平衡时很常用。",
      })]
    case "sk-kmeans":
      return [getParam("n_clusters", {
        name: "n_clusters",
        meaning: "簇的数量。",
        detail: "需要结合业务理解和评估指标来选，而不是机械固定。",
      }), getParam("n_init", {
        name: "n_init",
        meaning: "不同初始中心重复运行的次数。",
        detail: "能降低陷入差的局部最优的风险。",
      }), getParam("random_state"), getParam("max_iter", {
        name: "max_iter",
        meaning: "单次运行的最大迭代次数。",
        detail: "数据复杂时有时需要提高。",
      })]
    case "sk-pca":
      return [getParam("n_components", {
        name: "n_components",
        meaning: "保留的主成分数。",
        detail: "可按固定个数、方差比例或自动策略指定。",
      }), getParam("svd_solver", {
        name: "svd_solver",
        meaning: "底层奇异值分解求解方式。",
        detail: "数据规模较大时会影响性能和数值稳定性。",
      }), getParam("whiten", {
        name: "whiten",
        meaning: "是否对白化后的主成分做单位方差缩放。",
        detail: "某些下游模型里会考虑这样做。",
      })]
    case "sk-cross-val-score":
      return [getParam("estimator", {
        name: "estimator",
        meaning: "要评估的模型对象。",
        detail: "它需要实现 `fit`，并根据任务支持相应评分。",
      }), getParam("cv", {
        name: "cv",
        meaning: "交叉验证折数或切分器。",
        detail: "分类、时间序列和分组任务的切分器往往不同。",
      }), getParam("scoring", {
        name: "scoring",
        meaning: "评估指标名称或评分函数。",
        detail: "不显式指定时通常用 estimator 默认分数，但这不一定是你真正关心的指标。",
      })]
    case "sk-grid-search":
      return [getParam("estimator", {
        name: "estimator",
        meaning: "待调参模型。",
        detail: "如果是 Pipeline，参数名通常要写成 `step__param` 形式。",
      }), getParam("param_grid", {
        name: "param_grid",
        meaning: "要枚举的参数网格。",
        detail: "范围过大时会指数级增慢，所以需要先收敛候选集。",
      }), getParam("cv"), getParam("scoring"), getParam("refit", {
        name: "refit",
        meaning: "找到最佳参数后是否用全训练集重新拟合。",
        detail: "大多数正式建模场景都会保持开启。",
      })]
    case "sk-confusion-matrix":
    case "sk-classification-report":
      return [getParam("y_true", {
        name: "y_true",
        meaning: "真实标签。",
        detail: "必须与预测结果一一对应，顺序不能错。",
      }), getParam("y_pred", {
        name: "y_pred",
        meaning: "预测标签。",
        detail: "它与阈值选择和模型输出后处理密切相关。",
      }), getParam("labels", {
        name: "labels",
        meaning: "需要展示或统计的标签顺序。",
        detail: "显式指定后更适合做稳定报表。",
      })]
    case "sk-roc-auc":
      return [getParam("y_true", {
        name: "y_true",
        meaning: "真实标签。",
        detail: "二分类时最常见，多分类场景还要指定额外策略。",
      }), getParam("y_score", {
        name: "y_score",
        meaning: "模型输出的概率或决策分数。",
        detail: "不是最终 0/1 标签，而是用于排序的连续值。",
      }), getParam("average", {
        name: "average",
        meaning: "多分类或多标签任务下的汇总方式。",
        detail: "macro、weighted 等会影响最终汇总口径。",
      })]
    case "sk-silhouette-score":
      return [getParam("X"), getParam("labels", {
        name: "labels",
        meaning: "聚类标签结果。",
        detail: "每个样本需要有一个簇编号，才能计算轮廓系数。",
      }), getParam("metric", {
        name: "metric",
        meaning: "样本间距离度量。",
        detail: "欧氏距离最常见，但高维文本或稀疏数据可能会考虑别的度量。",
      })]
    case "keras-sequential":
      return [getParam("layers", {
        name: "layers",
        meaning: "按顺序堆叠的层列表。",
        detail: "适合单输入单输出、拓扑简单的网络结构。",
      }), getParam("name", {
        name: "name",
        meaning: "模型名称。",
        detail: "复杂项目或导出多模型时更便于区分。",
      })]
    case "keras-dense":
      return [getParam("units", {
        name: "units",
        meaning: "神经元数量。",
        detail: "会影响模型容量和参数量。",
      }), getParam("activation", {
        name: "activation",
        meaning: "激活函数。",
        detail: "relu、sigmoid、softmax 会直接影响层输出分布和任务适配性。",
      }), getParam("use_bias", {
        name: "use_bias",
        meaning: "是否使用偏置项。",
        detail: "大多数情况下保持默认即可。",
      })]
    case "keras-dropout":
      return [getParam("rate", {
        name: "rate",
        meaning: "随机失活比例。",
        detail: "过大可能导致欠拟合，过小则正则效果有限。",
      }), getParam("seed"), getParam("noise_shape", {
        name: "noise_shape",
        meaning: "自定义 dropout 掩码的形状。",
        detail: "序列或特殊结构模型中偶尔会需要。",
      })]
    case "keras-compile":
      return [getParam("optimizer", {
        name: "optimizer",
        meaning: "优化器。",
        detail: "adam 是高频默认项，但任务和学习率策略不同会影响选择。",
      }), getParam("loss", {
        name: "loss",
        meaning: "损失函数。",
        detail: "必须与任务和输出层匹配，比如二分类与多分类的选择不同。",
      }), getParam("metrics", {
        name: "metrics",
        meaning: "训练和评估时额外追踪的指标。",
        detail: "适合监控准确率、AUC 等任务相关指标。",
      })]
    case "keras-fit":
      return [getParam("X"), getParam("y"), getParam("epochs", {
        name: "epochs",
        meaning: "训练轮数。",
        detail: "并不是越多越好，通常要结合验证集和回调一起看。",
      }), getParam("batch_size", {
        name: "batch_size",
        meaning: "每次梯度更新使用的样本数。",
        detail: "影响训练稳定性、速度和显存占用。",
      }), getParam("validation_split", {
        name: "validation_split",
        meaning: "从训练数据中切出多少比例作为验证集。",
        detail: "快速实验很方便，但正式流程中也常单独准备验证集。",
      })]
    case "keras-evaluate":
    case "keras-predict":
      return [getParam("X"), getParam("y", {
        name: "y",
        meaning: "evaluate 时的真实标签。",
        detail: "predict 不需要这个参数，但 evaluate 需要它计算指标。",
      }), getParam("batch_size"), getParam("verbose", {
        name: "verbose",
        meaning: "日志输出详细程度。",
        detail: "批量预测或自动化任务中经常会设为 0。",
      })]
    case "keras-earlystopping":
    case "keras-modelcheckpoint":
      return [getParam("monitor", {
        name: "monitor",
        meaning: "要监控的指标名。",
        detail: "常见是 val_loss、val_accuracy 等验证集指标。",
      }), getParam("patience", {
        name: "patience / save_best_only",
        meaning: "等待改善的轮数，或是否只保存最佳模型。",
        detail: "两类回调虽不同，但都围绕“如何挑选最好的一轮”展开。",
      }), getParam("mode", {
        name: "mode",
        meaning: "指标是希望更大还是更小。",
        detail: "例如 loss 要 min，accuracy 要 max。",
      })]
    case "keras-conv2d":
      return [getParam("filters", {
        name: "filters",
        meaning: "卷积核数量。",
        detail: "决定输出特征图的通道数。",
      }), getParam("kernel_size", {
        name: "kernel_size",
        meaning: "卷积核大小。",
        detail: "常见是 3x3 或 5x5，影响局部感受野。",
      }), getParam("activation"), getParam("padding", {
        name: "padding",
        meaning: "边界填充方式。",
        detail: "same 和 valid 会影响输出空间尺寸。",
      })]
    case "keras-embedding":
      return [getParam("input_dim", {
        name: "input_dim",
        meaning: "词表大小或最大 token id 范围。",
        detail: "决定嵌入矩阵第一维大小。",
      }), getParam("output_dim", {
        name: "output_dim",
        meaning: "每个 token 的向量维度。",
        detail: "维度越大表达力通常越强，但参数量也更高。",
      }), getParam("input_length", {
        name: "input_length",
        meaning: "输入序列长度。",
        detail: "某些下游层或导出场景中会更容易推断形状。",
      })]
    case "keras-lstm":
      return [getParam("units", {
        name: "units",
        meaning: "LSTM 隐状态维度。",
        detail: "直接决定序列表达能力和参数规模。",
      }), getParam("return_sequences", {
        name: "return_sequences",
        meaning: "是否返回每个时间步的输出。",
        detail: "堆叠多层 LSTM 或接序列标注头时经常要开启。",
      }), getParam("dropout"), getParam("recurrent_dropout", {
        name: "recurrent_dropout",
        meaning: "循环状态上的 dropout 比例。",
        detail: "会增加正则化，但也可能让训练更慢。",
      })]
    case "gen-dictionary":
      return [getParam("documents", {
        name: "documents / texts",
        meaning: "分词后的文档集合。",
        detail: "通常是二维 token 列表，而不是原始长字符串。",
      }), getParam("prune_at", {
        name: "prune_at",
        meaning: "词典构建时的临时裁剪上限。",
        detail: "大语料场景下可用来控制内存。",
      })]
    case "gen-doc2bow":
      return [getParam("document", {
        name: "document",
        meaning: "单篇分词后的文档。",
        detail: "输出会是稀疏的 `(token_id, count)` 结构。",
      }), getParam("allow_update", {
        name: "allow_update",
        meaning: "是否允许在转换时更新词典。",
        detail: "正式推理时通常关闭，以保持词典稳定。",
      }), getParam("return_missing", {
        name: "return_missing",
        meaning: "是否返回词典中缺失的词。",
        detail: "调试词典覆盖率时很有帮助。",
      })]
    case "gen-tfidfmodel":
      return [getParam("corpus"), getParam("dictionary"), getParam("normalize", {
        name: "normalize",
        meaning: "是否对 TF-IDF 向量归一化。",
        detail: "相似度检索场景下很常见。",
      }), getParam("smartirs", {
        name: "smartirs",
        meaning: "SMART 信息检索加权方案。",
        detail: "需要更精细控制权重口径时可关注。",
      })]
    case "gen-ldamodel":
    case "gen-ldamodel-print-topics":
      return [getParam("corpus"), getParam("id2word", {
        name: "id2word / dictionary",
        meaning: "词 id 到词语的映射。",
        detail: "没有它就很难把主题结果解释回真实词语。",
      }), getParam("num_topics", {
        name: "num_topics",
        meaning: "主题数量。",
        detail: "过少会混主题，过多会碎片化，通常需要多轮试验。",
      }), getParam("passes", {
        name: "passes",
        meaning: "完整遍历语料的轮数。",
        detail: "更多 passes 会让主题更稳定，但训练更慢。",
      }), getParam("random_state")]
    case "gen-word2vec":
      return [getParam("sentences", {
        name: "sentences",
        meaning: "分词后的句子序列。",
        detail: "每个句子是 token 列表，顺序会影响上下文学习。",
      }), getParam("vector_size", {
        name: "vector_size",
        meaning: "词向量维度。",
        detail: "维度越大通常表达力越强，但训练成本更高。",
      }), getParam("window", {
        name: "window",
        meaning: "上下文窗口大小。",
        detail: "窗口越大越偏主题共现，越小越偏局部语法。",
      }), getParam("min_count", {
        name: "min_count",
        meaning: "低频词过滤阈值。",
        detail: "能减少噪声词，但也可能丢掉稀有重要词。",
      }), getParam("epochs")]
    case "gen-keyedvectors-most-similar":
      return [getParam("positive", {
        name: "positive",
        meaning: "正向相似或类比的词列表。",
        detail: "可以传单词，也可以传多个词做向量组合。",
      }), getParam("negative", {
        name: "negative",
        meaning: "反向抵消的词列表。",
        detail: "做类比推理时常见，例如 king - man + woman。",
      }), getParam("topn", {
        name: "topn",
        meaning: "返回前多少个相似词。",
        detail: "调试时可以先少量查看，避免输出过长。",
      })]
    case "gen-similarities-matrixsimilarity":
      return [getParam("corpus"), getParam("num_features", {
        name: "num_features",
        meaning: "向量空间维度。",
        detail: "词表很大时最好显式指定，避免索引维度不清晰。",
      }), getParam("chunksize", {
        name: "chunksize",
        meaning: "批处理大小。",
        detail: "语料较大时会影响构建速度和内存使用。",
      })]
    case "gen-phrases":
      return [getParam("sentences"), getParam("min_count", {
        name: "min_count",
        meaning: "短语至少出现多少次才会被考虑。",
        detail: "能过滤掉偶然拼在一起的低频噪声搭配。",
      }), getParam("threshold", {
        name: "threshold",
        meaning: "成为短语的得分门槛。",
        detail: "值越低越容易合并成短语。",
      }), getParam("delimiter", {
        name: "delimiter",
        meaning: "短语连接符。",
        detail: "默认常会用下划线，把多词表达合成一个 token。",
      })]
    case "sns-set-theme":
    case "sns-despine":
    case "sns-color-palette":
      return [
        getParam("style"),
        getParam("palette", {
          name: "palette",
          meaning: "色盘方案。",
          detail: "主题统一时非常实用，适合先选定品牌色或报告模板风格。",
        }),
        getParam("font_scale", {
          name: "font_scale",
          meaning: "字体整体缩放倍数。",
          detail: "面向投影和面向网页的字号需求通常不同。",
        }),
      ]
    case "sns-heatmap":
    case "sns-clustermap":
      return [getParam("data"), getParam("cmap"), getParam("annot"), getParam("figsize"), getParam("linewidths", {
        name: "linewidths",
        meaning: "格子间边界线宽度。",
        detail: "矩阵较小时可以适度加一点，阅读会更清楚。",
      })]
    case "sns-histplot":
    case "sns-displot":
    case "sns-ecdfplot":
      return [getParam("data"), getParam("x"), getParam("hue"), getParam("bins"), getParam("stat", {
        name: "stat",
        meaning: "统计量口径。",
        detail: "count、density、probability 会直接改变图的解释方式。",
      })]
    case "sns-pairplot":
    case "sns-facetgrid":
    case "sns-pairgrid":
    case "sns-jointgrid":
      return [getParam("data"), getParam("hue"), getParam("vars", {
        name: "vars / col / row",
        meaning: "成对绘制的变量或分面维度。",
        detail: "变量太多时图会急剧变大，建议先收窄字段范围。",
      }), getParam("kind", {
        name: "kind",
        meaning: "子图类型。",
        detail: "pairplot 常见 scatter、kde、reg；facetgrid 则更依赖 map 进去的函数。",
      })]
    case "sns-relplot":
    case "sns-catplot":
    case "sns-lmplot":
    case "sns-pointplot":
    case "sns-boxenplot":
    case "sns-residplot":
    case "sns-rugplot":
      return [getParam("data"), getParam("x"), getParam("y"), getParam("hue"), getParam("kind")]
    case "sns-move-legend":
      return [getParam("obj", {
        name: "obj",
        meaning: "包含图例的 axes 或 figure 级对象。",
        detail: "通常传入当前图的 Axes 或 FacetGrid。",
      }), getParam("loc", {
        meaning: "图例的新位置。",
        detail: "可以是 right upper、upper left 等常见图例位置字符串。",
      }), getParam("title", {
        name: "title",
        meaning: "图例标题。",
        detail: "重新摆放图例时，通常也会顺手统一标题文案。",
      })]
    case "plt-subplots":
    case "plt-subplot-mosaic":
      return [getParam("nrows", {
        name: "nrows",
        meaning: "子图行数。",
        detail: "和 ncols 一起决定版式结构。",
      }), getParam("ncols", {
        name: "ncols",
        meaning: "子图列数。",
        detail: "复杂看板常先画草图再落到 nrows / ncols。",
      }), getParam("figsize"), getParam("sharex", {
        name: "sharex / sharey",
        meaning: "是否共享坐标轴。",
        detail: "同量纲对比图很适合共享，便于肉眼比较。",
      })]
    case "plt-figure":
    case "plt-savefig":
      return [getParam("figsize"), getParam("dpi"), getParam("bbox_inches", {
        name: "bbox_inches",
        meaning: "保存时边界裁切策略。",
        detail: "tight 常用于避免标题或图例被裁掉。",
      })]
    case "plt-plot":
    case "plt-bar":
    case "plt-barh":
    case "plt-scatter":
    case "plt-hist":
    case "plt-pie":
    case "plt-imshow":
    case "plt-fill-between":
    case "plt-errorbar":
    case "plt-boxplot":
    case "plt-colorbar":
    case "plt-stackplot":
    case "plt-step":
    case "plt-stem":
    case "plt-contourf":
    case "plt-violinplot":
    case "plt-eventplot":
    case "plt-axline":
    case "plt-hexbin":
      return [getParam("x"), getParam("y"), getParam("color"), getParam("label"), getParam("alpha")]
    case "plt-quiver":
    case "plt-streamplot":
      return [getParam("x"), getParam("y"), getParam("u", {
        name: "u",
        meaning: "向量场在 x 方向的分量。",
        detail: "应与 v 和坐标网格形状匹配。",
      }), getParam("v", {
        name: "v",
        meaning: "向量场在 y 方向的分量。",
        detail: "和 u 一起决定箭头方向与大小。",
      }), getParam("color")]
    case "plt-matshow":
      return [getParam("a", {
        meaning: "要显示的二维矩阵。",
        detail: "行列结构会直接映射到图像网格。",
      }), getParam("cmap"), getParam("aspect", {
        name: "aspect",
        meaning: "单元格宽高比。",
        detail: "auto 或 equal 会影响矩阵单元格形状。",
      }), getParam("fignum", {
        name: "fignum",
        meaning: "目标图编号。",
        detail: "需要把结果放到已有图对象时可使用。",
      })]
    case "plt-table":
      return [getParam("cellText", {
        name: "cellText",
        meaning: "表格单元格文字内容。",
        detail: "通常是二维列表，行列结构要与标签匹配。",
      }), getParam("colLabels", {
        name: "colLabels",
        meaning: "列表头。",
        detail: "适合把摘要指标直接放到图里说明。",
      }), getParam("rowLabels", {
        name: "rowLabels",
        meaning: "行标签。",
        detail: "数据量稍大时要控制字号，避免挤压主图。",
      }), getParam("loc")]
    case "plt-suptitle":
      return [getParam("text", {
        name: "text",
        meaning: "整张图的总标题文字。",
        detail: "适合多子图看板或一页多图的总主题说明。",
      }), getParam("fontsize", {
        name: "fontsize",
        meaning: "标题字号。",
        detail: "总标题通常略大于单个子图标题。",
      }), getParam("y", {
        meaning: "标题的垂直位置。",
        detail: "tight_layout 或 constrained_layout 后常需要微调。",
      })]
    case "plt-tight-layout":
    case "plt-subplots-adjust":
      return [getParam("pad", {
        name: "pad / wspace / hspace",
        meaning: "子图边距或间距控制参数。",
        detail: "标题、图例、长刻度标签很容易让布局变挤，这些参数很关键。",
      }), getParam("rect", {
        name: "rect",
        meaning: "tight_layout 可用的画布区域。",
        detail: "为 suptitle 或侧边图例预留空间时很常见。",
      }), getParam("left", {
        name: "left / right / top / bottom",
        meaning: "子图边界位置。",
        detail: "subplots_adjust 中可以精确控制四周留白。",
      })]
    case "plt-axhline-axvline":
    case "plt-axspan":
    case "plt-xlim-ylim":
    case "plt-secondary-axis":
      return [getParam("x"), getParam("y"), getParam("lower"), getParam("upper"), getParam("label")]
    case "plt-annotate":
    case "plt-text":
      return [getParam("text", {
        name: "text",
        meaning: "要显示的注释内容。",
        detail: "建议尽量短，避免遮挡主图信息。",
      }), getParam("x"), getParam("y"), getParam("xytext", {
        name: "xytext",
        meaning: "注释文本放置位置。",
        detail: "annotate 时可与箭头配合，避开数据点本体。",
      })]
    case "plt-grid-legend":
    case "plt-ticks-rotate":
    case "plt-style-use":
      return [getParam("axis"), getParam("label"), getParam("rotation", {
        name: "rotation",
        meaning: "刻度文字旋转角度。",
        detail: "长类别标签里常见，能防止挤在一起看不清。",
      }), getParam("style", {
        name: "style",
        meaning: "全局绘图风格。",
        detail: "团队交付时统一风格很重要，但最好不要直接污染全局状态太多。",
      })]
    case "plt-twinx":
      return [getParam("ax"), getParam("label"), getParam("color"), getParam("y")]
    default:
      return buildGenericParameters(command)
  }
}

function normalizeSyntaxExpression(command) {
  const syntax = (command.syntax || "").trim()
  if (!syntax) {
    return "result = data"
  }

  if (syntax.startsWith("df.") || syntax.startsWith("pd.") || syntax.startsWith("np.")) {
    return syntax
  }

  if (syntax.startsWith("sns.") || syntax.startsWith("plt.")) {
    return syntax
  }

  return syntax
}

function getScipyWorkflowLines(command, mode = "workflow") {
  switch (command.id) {
    case "sp-stats-zscore":
      return [
        "import numpy as np",
        "from scipy import stats",
        "",
        "values = np.array([12, 14, 15, 16, 20, 25])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result)" : 'print("mean:", np.round(result.mean(), 6))',
      ]
    case "sp-stats-ttest-ind":
    case "sp-stats-f-oneway":
    case "sp-stats-mannwhitneyu":
      return [
        "import numpy as np",
        "from scipy import stats",
        "",
        "group_a = np.array([102, 98, 105, 110, 108])",
        "group_b = np.array([95, 97, 99, 100, 96])",
        ...(command.id === "sp-stats-f-oneway"
          ? ["group_c = np.array([112, 115, 111, 118, 116])"]
          : []),
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow"
          ? "print(result)"
          : 'print({"stat": result.statistic, "pvalue": result.pvalue})',
      ]
    case "sp-stats-ttest-rel":
    case "sp-stats-wilcoxon":
      return [
        "import numpy as np",
        "from scipy import stats",
        "",
        "before = np.array([78, 81, 75, 80, 77], dtype=float)",
        "after = np.array([82, 83, 79, 84, 80], dtype=float)",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow"
          ? "print(result)"
          : 'print({"stat": result.statistic, "pvalue": result.pvalue})',
      ]
    case "sp-stats-chi2":
      return [
        "import numpy as np",
        "from scipy import stats",
        "",
        "table = np.array([[42, 18], [28, 31]])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow"
          ? "print(result)"
          : 'print({"chi2": result[0], "pvalue": result[1]})',
      ]
    case "sp-stats-pearsonr":
    case "sp-stats-spearmanr":
    case "sp-stats-linregress":
      return [
        "import numpy as np",
        "from scipy import stats",
        "",
        "x = np.array([1, 2, 3, 4, 5, 6])",
        "y = np.array([12, 14, 17, 18, 21, 24])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result)" : 'print("pvalue:", result.pvalue)',
      ]
    case "sp-stats-shapiro":
      return [
        "import numpy as np",
        "from scipy import stats",
        "",
        "values = np.array([8.1, 8.4, 8.8, 9.2, 9.3, 9.6, 10.1])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result)" : 'print("normal_like:", result.pvalue > 0.05)',
      ]
    case "sp-stats-gaussian-kde":
      return [
        "import numpy as np",
        "from scipy import stats",
        "",
        "values = np.array([12, 14, 15, 16, 18, 20, 21])",
        `kde = ${normalizeSyntaxExpression(command)}`,
        "grid = np.linspace(values.min(), values.max(), 6)",
        mode === "workflow" ? "print(kde(grid))" : 'print("grid points:", grid)',
      ]
    case "sp-interpolate-interp1d":
    case "sp-interpolate-spline":
      return [
        "import numpy as np",
        "from scipy import interpolate",
        "",
        "x = np.array([0, 1, 2, 4, 6])",
        "y = np.array([0, 2, 3, 3.5, 5])",
        command.id === "sp-interpolate-interp1d"
          ? `interp = ${normalizeSyntaxExpression(command)}`
          : `spline = ${normalizeSyntaxExpression(command)}`,
        "grid = np.linspace(0, 6, 9)",
        command.id === "sp-interpolate-interp1d"
          ? mode === "workflow"
            ? "print(interp(grid))"
            : 'print("grid:", grid)'
          : mode === "workflow"
            ? "print(spline(grid))"
            : 'print("grid:", grid)',
      ]
    case "sp-signal-savgol":
      return [
        "import numpy as np",
        "from scipy import signal",
        "",
        "series = np.array([2.0, 2.2, 2.5, 2.9, 3.8, 3.2, 3.1, 3.3, 3.5])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result.round(3))" : 'print("smoothed points:", len(result))',
      ]
    case "sp-signal-find-peaks":
      return [
        "import numpy as np",
        "from scipy import signal",
        "",
        "series = np.array([1, 3, 2, 5, 1, 4, 1, 6, 1])",
        `peaks, props = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(peaks)" : 'print("count:", len(peaks))',
      ]
    case "sp-signal-convolve":
    case "sp-signal-correlate":
      return [
        "import numpy as np",
        "from scipy import signal",
        "",
        "signal_a = np.array([0, 1, 2, 1, 0])",
        "signal_b = np.array([1, 0, -1])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result)" : 'print("length:", len(result))',
      ]
    case "sp-optimize-minimize":
      return [
        "import numpy as np",
        "from scipy import optimize",
        "",
        "def objective(x):",
        "    return (x[0] - 2) ** 2 + (x[1] + 1) ** 2",
        "",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result.x)" : 'print({"success": result.success, "fun": result.fun})',
      ]
    case "sp-optimize-curve-fit":
      return [
        "import numpy as np",
        "from scipy import optimize",
        "",
        "def model(x, a, b):",
        "    return a * np.exp(b * x)",
        "",
        "xdata = np.array([0, 1, 2, 3, 4], dtype=float)",
        "ydata = np.array([2.0, 2.8, 4.1, 5.8, 8.2])",
        `params, cov = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(params)" : 'print("diag cov:", np.diag(cov))',
      ]
    case "sp-optimize-root":
      return [
        "from scipy import optimize",
        "",
        "def equation(x):",
        "    return x ** 3 - 2 * x - 5",
        "",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result.x)" : 'print("success:", result.success)',
      ]
    case "sp-optimize-linprog":
      return [
        "from scipy import optimize",
        "",
        "c = [-5, -4]",
        "A_ub = [[6, 4], [1, 2], [-1, 1]]",
        "b_ub = [24, 6, 1]",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result.x)" : 'print("optimal:", result.fun)',
      ]
    case "sp-spatial-cdist":
      return [
        "import numpy as np",
        "from scipy.spatial import distance",
        "",
        "XA = np.array([[0, 0], [1, 1], [2, 2]])",
        "XB = np.array([[0, 1], [2, 1]])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result)" : 'print("shape:", result.shape)',
      ]
    case "sp-spatial-pdist-squareform":
      return [
        "import numpy as np",
        "from scipy.spatial import distance",
        "",
        "points = np.array([[0, 0], [1, 1], [2, 1], [2, 3]])",
        "dist_vec = distance.pdist(points, metric=\"euclidean\")",
        "result = distance.squareform(dist_vec)",
        mode === "workflow" ? "print(result)" : 'print("shape:", result.shape)',
      ]
    case "sp-sparse-csr":
      return [
        "import numpy as np",
        "from scipy import sparse",
        "",
        "dense = np.array([[0, 1, 0], [2, 0, 0], [0, 0, 3]])",
        `matrix = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(matrix.toarray())" : 'print("nnz:", matrix.nnz)',
      ]
    case "sp-special-expit":
      return [
        "import numpy as np",
        "from scipy import special",
        "",
        "logits = np.array([-3.0, -1.0, 0.0, 1.0, 3.0])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result.round(4))" : 'print("min/max:", result.min(), result.max())',
      ]
    default:
      return [
        "import numpy as np",
        "from scipy import stats",
        "",
        "values = np.array([1, 2, 3, 4, 5])",
        `result = ${normalizeSyntaxExpression(command)}`,
        mode === "workflow" ? "print(result)" : 'print("done")',
      ]
  }
}

function getStatsmodelsWorkflowLines(command, mode = "workflow") {
  switch (command.id) {
    case "sm-add-constant":
    case "sm-ols":
    case "sm-summary":
      return [
        "import pandas as pd",
        "import statsmodels.api as sm",
        "",
        "df = pd.DataFrame({",
        '    "sales": [120, 138, 146, 160, 174],',
        '    "ad_cost": [20, 22, 25, 26, 29],',
        '    "visits": [400, 430, 460, 500, 530],',
        "})",
        'X = sm.add_constant(df[["ad_cost", "visits"]])',
        'y = df["sales"]',
        'model = sm.OLS(y, X).fit()',
        command.id === "sm-add-constant"
          ? 'print(sm.add_constant(df[["ad_cost", "visits"]]).head())'
          : command.id === "sm-summary"
            ? mode === "workflow"
              ? "print(model.summary())"
              : 'print("r2:", round(model.rsquared, 4))'
            : mode === "workflow"
              ? "print(model.params)"
              : 'print("coef:", model.params.to_dict())',
      ]
    case "sm-formula-ols":
    case "sm-anova-lm":
      return [
        "import pandas as pd",
        "import statsmodels.formula.api as smf",
        "import statsmodels.api as sm",
        "",
        "df = pd.DataFrame({",
        '    "sales": [120, 138, 146, 160, 174, 182],',
        '    "ad_cost": [20, 22, 25, 26, 29, 31],',
        '    "channel": ["Online", "Online", "Store", "Store", "Online", "Store"],',
        "})",
        'model = smf.ols("sales ~ ad_cost + C(channel)", data=df).fit()',
        command.id === "sm-formula-ols"
          ? mode === "workflow"
            ? "print(model.params)"
            : 'print("aic:", round(model.aic, 3))'
          : mode === "workflow"
            ? "print(sm.stats.anova_lm(model, typ=2))"
            : 'print("done")',
      ]
    case "sm-descrstats":
      return [
        "import numpy as np",
        "from statsmodels.stats.weightstats import DescrStatsW",
        "",
        "values = np.array([120, 138, 146, 160, 174], dtype=float)",
        "stats = DescrStatsW(values)",
        mode === "workflow" ? "print(stats.mean, stats.std)" : 'print("tconfint:", stats.tconfint_mean())',
      ]
    case "sm-acf-pacf":
      return [
        "import numpy as np",
        "from statsmodels.tsa.stattools import acf, pacf",
        "",
        "series = np.array([12, 13, 15, 18, 17, 19, 21, 20, 22, 24], dtype=float)",
        mode === "workflow"
          ? "print(acf(series, nlags=4))\nprint(pacf(series, nlags=4))"
          : 'print("lags checked:", 4)',
      ]
    case "sm-seasonal-decompose":
      return [
        "import pandas as pd",
        "from statsmodels.tsa.seasonal import seasonal_decompose",
        "",
        'index = pd.date_range("2026-01-01", periods=12, freq="M")',
        "series = pd.Series([10, 12, 11, 15, 18, 17, 20, 23, 21, 25, 27, 26], index=index)",
        'result = seasonal_decompose(series, model="additive", period=4)',
        mode === "workflow" ? "print(result.trend.dropna().head())" : 'print("components:", ["trend", "seasonal", "resid"])',
      ]
    case "sm-arima":
      return [
        "import pandas as pd",
        "from statsmodels.tsa.arima.model import ARIMA",
        "",
        "series = pd.Series([120, 124, 128, 130, 133, 137, 141, 144, 149, 153], dtype=float)",
        'model = ARIMA(series, order=(1, 1, 1)).fit()',
        mode === "workflow" ? "print(model.forecast(3))" : 'print("aic:", round(model.aic, 3))',
      ]
    case "sm-qqplot":
      return [
        "import numpy as np",
        "import statsmodels.api as sm",
        "",
        "values = np.array([12, 14, 15, 16, 18, 20, 22], dtype=float)",
        "fig = sm.qqplot(values, line='45')",
        mode === "workflow" ? "print(fig)" : 'print("qqplot ready")',
      ]
    default:
      return [
        "import pandas as pd",
        "import statsmodels.api as sm",
        "",
        "df = pd.DataFrame({",
        '    "sales": [120, 138, 146, 160, 174],',
        '    "ad_cost": [20, 22, 25, 26, 29],',
        "})",
        'X = sm.add_constant(df[["ad_cost"]])',
        'y = df["sales"]',
        "model = sm.OLS(y, X).fit()",
        mode === "workflow" ? "print(model.summary())" : 'print("done")',
      ]
  }
}

function getSklearnWorkflowLines(command, mode = "workflow") {
  switch (command.id) {
    case "sk-train-test-split":
      return [
        "import numpy as np",
        "from sklearn.model_selection import train_test_split",
        "",
        "X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)",
        "y = np.array([0, 0, 0, 1, 1, 1])",
        "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)",
        mode === "workflow" ? "print(X_train.shape, X_test.shape)" : 'print("y_test:", y_test)',
      ]
    case "sk-standardscaler":
    case "sk-minmaxscaler":
    case "sk-simpleimputer":
      return [
        "import numpy as np",
        "from sklearn.preprocessing import StandardScaler, MinMaxScaler",
        "from sklearn.impute import SimpleImputer",
        "",
        "X = np.array([[1.0, 20.0], [2.0, 22.0], [3.0, np.nan], [4.0, 28.0]])",
        command.id === "sk-standardscaler"
          ? "print(StandardScaler().fit_transform(X))"
          : command.id === "sk-minmaxscaler"
            ? "print(MinMaxScaler().fit_transform(X))"
            : "print(SimpleImputer(strategy='median').fit_transform(X))",
      ]
    case "sk-onehotencoder":
      return [
        "from sklearn.preprocessing import OneHotEncoder",
        "",
        'X = [["Online"], ["Store"], ["Online"], ["Partner"]]',
        "encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')",
        mode === "workflow" ? "print(encoder.fit_transform(X))" : 'print("categories:", encoder.fit(X).categories_)',
      ]
    case "sk-columntransformer":
      return [
        "import pandas as pd",
        "from sklearn.compose import ColumnTransformer",
        "from sklearn.preprocessing import StandardScaler, OneHotEncoder",
        "",
        "df = pd.DataFrame({",
        '    "sales": [120, 138, 146, 160],',
        '    "channel": ["Online", "Store", "Online", "Partner"],',
        "})",
        "preprocess = ColumnTransformer([",
        '    ("num", StandardScaler(), ["sales"]),',
        '    ("cat", OneHotEncoder(handle_unknown="ignore"), ["channel"]),',
        "])",
        mode === "workflow" ? "print(preprocess.fit_transform(df))" : 'print("transformer ready")',
      ]
    case "sk-pipeline":
      return [
        "import numpy as np",
        "from sklearn.pipeline import Pipeline",
        "from sklearn.preprocessing import StandardScaler",
        "from sklearn.linear_model import LogisticRegression",
        "",
        "X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)",
        "y = np.array([0, 0, 0, 1, 1, 1])",
        "pipe = Pipeline([",
        '    ("scaler", StandardScaler()),',
        '    ("model", LogisticRegression()),',
        "])",
        mode === "workflow" ? "print(pipe.fit(X, y).predict(X[:2]))" : 'print("steps:", pipe.named_steps.keys())',
      ]
    case "sk-linear-regression":
    case "sk-logistic-regression":
    case "sk-random-forest":
    case "sk-kmeans":
    case "sk-pca":
      return [
        "import numpy as np",
        "from sklearn.linear_model import LinearRegression, LogisticRegression",
        "from sklearn.ensemble import RandomForestClassifier",
        "from sklearn.cluster import KMeans",
        "from sklearn.decomposition import PCA",
        "",
        "X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)",
        "y_reg = np.array([120, 138, 146, 160, 174, 182], dtype=float)",
        "y_clf = np.array([0, 0, 0, 1, 1, 1])",
        command.id === "sk-linear-regression"
          ? "model = LinearRegression().fit(X, y_reg)\nprint(model.predict(X[:2]))"
          : command.id === "sk-logistic-regression"
            ? "model = LogisticRegression().fit(X, y_clf)\nprint(model.predict_proba(X[:2]))"
            : command.id === "sk-random-forest"
              ? "model = RandomForestClassifier(n_estimators=100, random_state=42).fit(X, y_clf)\nprint(model.feature_importances_)"
              : command.id === "sk-kmeans"
                ? "model = KMeans(n_clusters=2, random_state=42, n_init='auto').fit(X)\nprint(model.labels_)"
                : "model = PCA(n_components=2).fit(X)\nprint(model.explained_variance_ratio_)",
      ]
    case "sk-cross-val-score":
    case "sk-grid-search":
      return [
        "import numpy as np",
        "from sklearn.linear_model import LogisticRegression",
        "from sklearn.model_selection import cross_val_score, GridSearchCV",
        "",
        "X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)",
        "y = np.array([0, 0, 0, 1, 1, 1])",
        command.id === "sk-cross-val-score"
          ? "model = LogisticRegression()\nprint(cross_val_score(model, X, y, cv=3))"
          : "model = LogisticRegression(max_iter=1000)\nsearch = GridSearchCV(model, {'C': [0.1, 1, 10]}, cv=3)\nprint(search.fit(X, y).best_params_)",
      ]
    case "sk-confusion-matrix":
    case "sk-classification-report":
    case "sk-roc-auc":
    case "sk-silhouette-score":
      return [
        "import numpy as np",
        "from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score, silhouette_score",
        "",
        "y_true = np.array([0, 0, 1, 1, 1])",
        "y_pred = np.array([0, 1, 1, 1, 0])",
        "scores = np.array([0.12, 0.63, 0.74, 0.88, 0.44])",
        "X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30]], dtype=float)",
        "labels = np.array([0, 0, 1, 1, 1])",
        command.id === "sk-confusion-matrix"
          ? "print(confusion_matrix(y_true, y_pred))"
          : command.id === "sk-classification-report"
            ? "print(classification_report(y_true, y_pred))"
            : command.id === "sk-roc-auc"
              ? "print(roc_auc_score(y_true, scores))"
              : "print(silhouette_score(X, labels))",
      ]
    default:
      return [
        "import numpy as np",
        "",
        "X = np.array([[1, 20], [2, 22], [3, 25], [4, 28]], dtype=float)",
        "y = np.array([0, 0, 1, 1])",
        mode === "workflow" ? "print(X.shape, y.shape)" : 'print("dataset ready")',
      ]
  }
}

function getKerasWorkflowLines(command, mode = "workflow") {
  switch (command.id) {
    case "keras-sequential":
    case "keras-dense":
    case "keras-dropout":
    case "keras-conv2d":
    case "keras-embedding":
    case "keras-lstm":
      return [
        "import numpy as np",
        "import keras",
        "",
        "model = keras.Sequential()",
        command.id === "keras-sequential"
          ? 'model = keras.Sequential([keras.layers.Dense(16, activation="relu", input_shape=(4,)), keras.layers.Dense(1)])'
          : command.id === "keras-dense"
            ? 'model.add(keras.layers.Dense(16, activation="relu", input_shape=(4,)))\nmodel.add(keras.layers.Dense(1))'
            : command.id === "keras-dropout"
              ? 'model = keras.Sequential([keras.layers.Dense(16, activation="relu", input_shape=(4,)), keras.layers.Dropout(0.3), keras.layers.Dense(1)])'
              : command.id === "keras-conv2d"
                ? 'model = keras.Sequential([keras.layers.Conv2D(16, 3, activation="relu", input_shape=(28, 28, 1)), keras.layers.Flatten(), keras.layers.Dense(10, activation="softmax")])'
                : command.id === "keras-embedding"
                  ? 'model = keras.Sequential([keras.layers.Embedding(input_dim=5000, output_dim=64, input_length=20), keras.layers.GlobalAveragePooling1D(), keras.layers.Dense(1, activation="sigmoid")])'
                  : 'model = keras.Sequential([keras.layers.Embedding(input_dim=5000, output_dim=64), keras.layers.LSTM(32), keras.layers.Dense(1, activation="sigmoid")])',
        mode === "workflow" ? "model.summary()" : 'print("layers:", len(model.layers))',
      ]
    case "keras-compile":
    case "keras-fit":
    case "keras-evaluate":
    case "keras-predict":
      return [
        "import numpy as np",
        "import keras",
        "",
        "X = np.random.default_rng(7).normal(size=(24, 4)).astype('float32')",
        "y = (X.sum(axis=1) > 0).astype('float32')",
        'model = keras.Sequential([keras.layers.Dense(16, activation="relu", input_shape=(4,)), keras.layers.Dense(1, activation="sigmoid")])',
        'model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])',
        command.id === "keras-compile"
          ? 'print("compiled")'
          : command.id === "keras-fit"
            ? "history = model.fit(X, y, epochs=3, batch_size=8, verbose=0)\nprint(history.history.keys())"
            : command.id === "keras-evaluate"
              ? "model.fit(X, y, epochs=2, batch_size=8, verbose=0)\nprint(model.evaluate(X, y, verbose=0))"
              : "model.fit(X, y, epochs=2, batch_size=8, verbose=0)\nprint(model.predict(X[:2], verbose=0))",
      ]
    case "keras-earlystopping":
    case "keras-modelcheckpoint":
      return [
        "import keras",
        "",
        command.id === "keras-earlystopping"
          ? 'callback = keras.callbacks.EarlyStopping(monitor="val_loss", patience=3, restore_best_weights=True)\nprint(callback)'
          : 'callback = keras.callbacks.ModelCheckpoint("best.keras", monitor="val_loss", save_best_only=True)\nprint(callback)',
      ]
    default:
      return [
        "import keras",
        "import numpy as np",
        "",
        "X = np.random.default_rng(7).normal(size=(8, 4)).astype('float32')",
        "y = (X.sum(axis=1) > 0).astype('float32')",
        mode === "workflow" ? "print(X.shape, y.shape)" : 'print("tensor ready")',
      ]
  }
}

function getGensimWorkflowLines(command, mode = "workflow") {
  switch (command.id) {
    case "gen-dictionary":
    case "gen-doc2bow":
    case "gen-tfidfmodel":
    case "gen-ldamodel":
    case "gen-ldamodel-print-topics":
      return [
        "from gensim import corpora, models",
        "",
        'texts = [["data", "science", "python"], ["topic", "model", "text"], ["python", "machine", "learning"]]',
        "dictionary = corpora.Dictionary(texts)",
        "corpus = [dictionary.doc2bow(text) for text in texts]",
        command.id === "gen-dictionary"
          ? "print(dictionary.token2id)"
          : command.id === "gen-doc2bow"
            ? 'print(dictionary.doc2bow(["python", "text", "python"]))'
            : command.id === "gen-tfidfmodel"
              ? "tfidf = models.TfidfModel(corpus)\nprint(tfidf[corpus[0]])"
              : command.id === "gen-ldamodel"
                ? "lda = models.LdaModel(corpus=corpus, id2word=dictionary, num_topics=2, passes=10, random_state=7)\nprint(lda.get_document_topics(corpus[0]))"
                : "lda = models.LdaModel(corpus=corpus, id2word=dictionary, num_topics=2, passes=10, random_state=7)\nprint(lda.print_topics())",
      ]
    case "gen-word2vec":
    case "gen-keyedvectors-most-similar":
      return [
        "from gensim.models import Word2Vec",
        "",
        'sentences = [["data", "science"], ["machine", "learning"], ["deep", "learning"], ["science", "model"]]',
        "model = Word2Vec(sentences=sentences, vector_size=20, window=2, min_count=1, workers=1, epochs=50)",
        command.id === "gen-word2vec"
          ? 'print(model.wv["science"][:5])'
          : 'print(model.wv.most_similar("learning", topn=3))',
      ]
    case "gen-similarities-matrixsimilarity":
      return [
        "from gensim import corpora, models, similarities",
        "",
        'texts = [["data", "science", "python"], ["topic", "model", "text"], ["python", "machine", "learning"]]',
        "dictionary = corpora.Dictionary(texts)",
        "corpus = [dictionary.doc2bow(text) for text in texts]",
        "tfidf = models.TfidfModel(corpus)",
        "index = similarities.MatrixSimilarity(tfidf[corpus])",
        'query = dictionary.doc2bow(["python", "science"])',
        mode === "workflow" ? "print(index[tfidf[query]])" : 'print("docs indexed:", len(corpus))',
      ]
    case "gen-phrases":
      return [
        "from gensim.models import Phrases",
        "",
        'sentences = [["new", "york", "city"], ["machine", "learning", "model"], ["new", "york", "times"]]',
        "phrases = Phrases(sentences, min_count=1, threshold=1)",
        mode === "workflow" ? "print(list(phrases[sentences]))" : 'print("phrase model ready")',
      ]
    default:
      return [
        "from gensim import corpora",
        "",
        'texts = [["data", "science"], ["machine", "learning"]]',
        "dictionary = corpora.Dictionary(texts)",
        mode === "workflow" ? "print(dictionary.token2id)" : 'print("tokens:", len(dictionary))',
      ]
  }
}

function buildWorkflowExample(command) {
  const syntax = normalizeSyntaxExpression(command)

  if (command.library === "pandas") {
    return createExample(
      "流程串联示例",
      lines([
        "import pandas as pd",
        "",
        'df = pd.read_csv("sales.csv")',
        "",
        `step_result = ${syntax}`,
        "print(type(step_result))",
        'print(getattr(step_result, "head", lambda: step_result)())',
      ]),
      "把当前指令放进真实处理流程里，先看返回类型和前几行结果。"
    )
  }

  if (command.library === "numpy") {
    return createExample(
      "数组联动示例",
      lines([
        "import numpy as np",
        "",
        "arr = np.array([2, 4, 6, 8, 10])",
        `result = ${syntax}`,
        "print(result)",
      ]),
      "先在小数组上验证维度和数值变化，再扩展到正式数据。"
    )
  }

  if (command.library === "scipy") {
    return createExample(
      "科研计算示例",
      lines(getScipyWorkflowLines(command, "workflow")),
      "先用小规模向量验证统计量、参数或返回对象的结构，再放到正式样本上。"
    )
  }

  if (command.library === "statsmodels") {
    return createExample(
      "统计建模示例",
      lines(getStatsmodelsWorkflowLines(command, "workflow")),
      "先把设计矩阵、模型对象和结果对象分清楚，再解释系数和检验结果。"
    )
  }

  if (command.library === "sklearn") {
    return createExample(
      "机器学习流程示例",
      lines(getSklearnWorkflowLines(command, "workflow")),
      "理解 scikit-learn 时，最好把数据切分、预处理、训练和评估当成一整条流程来记。"
    )
  }

  if (command.library === "keras") {
    return createExample(
      "神经网络示例",
      lines(getKerasWorkflowLines(command, "workflow")),
      "Keras 最重要的是看清层堆叠、compile 配置和训练输入形状。"
    )
  }

  if (command.library === "gensim") {
    return createExample(
      "文本主题示例",
      lines(getGensimWorkflowLines(command, "workflow")),
      "把词典、语料、模型之间的顺序理解清楚，会比单背命令更有用。"
    )
  }

  if (command.library === "seaborn") {
    return createExample(
      "报表图示例",
      lines([
        "import seaborn as sns",
        "import pandas as pd",
        "import matplotlib.pyplot as plt",
        "",
        "sales = pd.DataFrame({",
        '    "month": ["Jan", "Feb", "Mar", "Apr"],',
        '    "sales": [120, 138, 146, 160],',
        '    "channel": ["Online", "Online", "Store", "Store"],',
        "})",
        "",
        syntax,
        "plt.tight_layout()",
        "plt.show()",
      ]),
      "用一份极小的 DataFrame 验证当前图的分组、配色和聚合逻辑。"
    )
  }

  return createExample(
    "图表联动示例",
    lines([
      "import matplotlib.pyplot as plt",
      "",
      "x = [1, 2, 3, 4]",
      "y = [10, 14, 13, 18]",
      "",
      syntax,
      "plt.tight_layout()",
      "plt.show()",
    ]),
    "先用短序列确认图形元素的位置和样式，再替换成正式数据。"
  )
}

function buildValidationExample(command) {
  if (command.library === "pandas") {
    return createExample(
      "结果校验示例",
      lines([
        "# 对关键步骤做一次抽样校验",
        "preview = df.head(20).copy()",
        `checked = ${normalizeSyntaxExpression({
          ...command,
          syntax: normalizeSyntaxExpression(command).replace(/^df\b/, "preview"),
        })}`,
        'print("rows:", getattr(checked, "shape", [len(checked)])[0])',
        'print("columns:", getattr(checked, "shape", [0, "n/a"])[1] if hasattr(checked, "shape") else "n/a")',
      ]),
      "先在样本切片上检查返回形状，能更快发现索引或键的问题。"
    )
  }

  if (command.library === "numpy") {
    return createExample(
      "维度校验示例",
      lines([
        "matrix = np.arange(12).reshape(3, 4)",
        `checked = ${normalizeSyntaxExpression({
          ...command,
          syntax: normalizeSyntaxExpression(command).replace(/\barr\b/g, "matrix"),
        })}`,
        'print("shape:", np.shape(checked))',
        "print(checked)",
      ]),
      "在二维数组上额外验证一次，通常更容易发现 axis 和广播问题。"
    )
  }

  if (command.library === "scipy") {
    return createExample(
      "结果解释校验示例",
      lines(getScipyWorkflowLines(command, "validation")),
      "scipy 很多函数返回命名结果对象或多元组，正式使用前最好先看清返回结构。"
    )
  }

  if (command.library === "statsmodels") {
    return createExample(
      "结果解释校验示例",
      lines(getStatsmodelsWorkflowLines(command, "validation")),
      "statsmodels 的重点往往不在拟合完成，而在结果对象里每一项统计量如何解释。"
    )
  }

  if (command.library === "sklearn") {
    return createExample(
      "结果检查示例",
      lines(getSklearnWorkflowLines(command, "validation")),
      "机器学习命令最好顺手检查数据形状、输出类型和评估口径。"
    )
  }

  if (command.library === "keras") {
    return createExample(
      "训练检查示例",
      lines(getKerasWorkflowLines(command, "validation")),
      "Keras 里最容易出错的是形状和训练配置，所以验证示例会重点放在这些地方。"
    )
  }

  if (command.library === "gensim") {
    return createExample(
      "语料检查示例",
      lines(getGensimWorkflowLines(command, "validation")),
      "文本库的调试重点通常是字典规模、语料结构和模型输出是否符合预期。"
    )
  }

  if (command.library === "seaborn") {
    return createExample(
      "调图校验示例",
      lines([
        "ax = plt.gca()",
        normalizeSyntaxExpression(command),
        'ax.set_title("quick validation")',
        "plt.tight_layout()",
        "plt.show()",
      ]),
      "先确认图是否落在预期的 axes 上，再放进更复杂的子图布局。"
    )
  }

  return createExample(
    "导出前校验示例",
    lines([
      normalizeSyntaxExpression(command),
      'plt.title("validation view")',
      "plt.tight_layout()",
      "plt.show()",
    ]),
    "复杂图形或样式调整后，先做一次展示校验再保存。"
  )
}

function buildOverrideExamples(command) {
  switch (command.id) {
    case "pd-read-csv":
      return [
        createExample("基础读取", command.code, "直接读取并在入口阶段完成日期解析。"),
        createExample(
          "只读取关键列",
          lines([
            "import pandas as pd",
            "",
            'slim = pd.read_csv("sales.csv", usecols=["order_id", "city", "sales"])',
            "print(slim.head())",
          ]),
          "面对大文件时，先裁列通常比完整读入更稳。"
        ),
        createExample(
          "自定义分隔符",
          lines([
            "import pandas as pd",
            "",
            'orders = pd.read_csv("sales.txt", sep="|", encoding="utf-8")',
            "print(orders.shape)",
          ]),
          "处理日志导出或 ERP 文本文件时很常见。"
        ),
      ]
    case "pd-merge":
      return [
        createExample("按单键左连接", command.code, "最常见的订单表和维度表补字段场景。"),
        createExample(
          "多键连接",
          lines([
            'result = orders.merge(prices, on=["sku", "month"], how="left")',
            "print(result.head())",
          ]),
          "价格、库存这类时点数据常常需要多键对齐。"
        ),
        createExample(
          "连接后检查放大",
          lines([
            'joined = users.merge(tags, on="user_id", how="left")',
            'print("before:", len(users), "after:", len(joined))',
            'print(joined["user_id"].value_counts().head())',
          ]),
          "连接后的第一件事通常不是继续分析，而是检查记录数有没有意外膨胀。"
        ),
      ]
    case "pd-groupby-agg":
      return [
        createExample("命名聚合", command.code, "适合直接产出业务可读的汇总列名。"),
        createExample(
          "多指标汇总",
          lines([
            "summary = (",
            '    df.groupby("city", as_index=False)',
            '      .agg(order_cnt=("order_id", "size"), sales_sum=("sales", "sum"), sales_mean=("sales", "mean"))',
            ")",
            "print(summary)",
          ]),
          "报表和看板里经常会一次输出多个指标。"
        ),
        createExample(
          "按时间与城市双维汇总",
          lines([
            "daily = (",
            '    df.groupby(["order_date", "city"], as_index=False)',
            '      .agg(sales_sum=("sales", "sum"))',
            ")",
            "print(daily.head())",
          ]),
          "趋势图准备阶段很常见。"
        ),
      ]
    case "pd-query":
      return [
        createExample("字符串条件筛选", command.code, "复杂条件写成表达式后更容易读。"),
        createExample(
          "带变量注入",
          lines([
            'threshold = 500',
            'cities = ["Shanghai", "Beijing"]',
            'subset = df.query("sales >= @threshold and city in @cities")',
            "print(subset.head())",
          ]),
          "用 @ 把 Python 变量安全带进 query 表达式。"
        ),
        createExample(
          "带空格列名",
          lines([
            'subset = df.query("`gross sales` > 1000")',
            "print(subset.head())",
          ]),
          "列名有空格时记得用反引号包起来。"
        ),
      ]
    case "pd-fillna":
      return [
        createExample("常量补值", command.code, "适合有清晰业务默认值的列。"),
        createExample(
          "分组后按均值补值",
          lines([
            'df["sales"] = df["sales"].fillna(df.groupby("city")["sales"].transform("mean"))',
            "print(df.head())",
          ]),
          "当不同组的分布差异明显时，比全局均值更合理。"
        ),
        createExample(
          "时间序列前向填充",
          lines([
            'df = df.sort_values("order_date")',
            'df["inventory"] = df["inventory"].fillna(method="ffill")',
            "print(df.tail())",
          ]),
          "库存、余额这类状态量更适合沿时间方向补值。"
        ),
      ]
    case "pd-drop-duplicates":
      return [
        createExample("按关键列去重", command.code, "最常见的业务主键去重。"),
        createExample(
          "先排序再保留最新记录",
          lines([
            'latest = (df.sort_values("update_time")',
            '            .drop_duplicates(subset=["user_id"], keep="last"))',
            "print(latest.head())",
          ]),
          "当一人多条记录并存时，这个套路最稳。"
        ),
        createExample(
          "只找出重复行",
          lines([
            'dupes = df[df.duplicated(subset=["order_id"], keep=False)]',
            "print(dupes.head())",
          ]),
          "正式删除前，先把重复样本拿出来核对。"
        ),
      ]
    case "pd-assign":
      return [
        createExample("链式新增字段", command.code, "适合把特征构造写成连续步骤。"),
        createExample(
          "同时新增多个字段",
          lines([
            "enriched = df.assign(",
            '    profit=lambda x: x["sales"] - x["cost"],',
            '    margin=lambda x: x["profit"] / x["sales"],',
            ")",
            "print(enriched.head())",
          ]),
          "后一个 lambda 可以直接引用前面刚生成的新列。"
        ),
        createExample(
          "结合日期字段派生月份",
          lines([
            "monthly = df.assign(",
            '    month=lambda x: pd.to_datetime(x["order_date"]).dt.to_period("M").astype(str)',
            ")",
            "print(monthly.head())",
          ]),
          "做月报前的字段准备很常见。"
        ),
      ]
    case "pd-apply":
      return [
        createExample("逐列或逐行计算", command.code, "规则复杂时可以退回 apply。"),
        createExample(
          "按行拼接标签",
          lines([
            'df["segment"] = df.apply(',
            '    lambda row: f"{row["city"]}-{row["channel"]}",',
            "    axis=1,",
            ")",
            "print(df.head())",
          ]),
          "逐行逻辑写起来直观，但性能不如向量化方案。"
        ),
        createExample(
          "优先尝试向量化替代",
          lines([
            'df["segment"] = df["city"].str.cat(df["channel"], sep="-")',
            "print(df.head())",
          ]),
          "真正上线前，尽量评估是否能改成更快的向量化写法。"
        ),
      ]
    case "pd-pivot-table":
      return [
        createExample("基础透视表", command.code, "适合快速做管理报表和交叉汇总。"),
        createExample(
          "按月和渠道汇总销售额",
          lines([
            "report = pd.pivot_table(",
            "    df,",
            '    index="month",',
            '    columns="channel",',
            '    values="sales",',
            '    aggfunc="sum",',
            "    fill_value=0,",
            ")",
            "print(report)",
          ]),
          "非常适合导出给 Excel 报表。"
        ),
        createExample(
          "输出多种统计",
          lines([
            "report = pd.pivot_table(",
            "    df,",
            '    index="city",',
            '    values="sales",',
            '    aggfunc=["sum", "mean", "max"],',
            ")",
            "print(report)",
          ]),
          "适合一眼比较不同城市的多维指标。"
        ),
      ]
    case "pd-to-datetime":
      return [
        createExample("显式转日期", command.code, "时间序列处理前的第一步。"),
        createExample(
          "指定日期格式",
          lines([
            'df["order_date"] = pd.to_datetime(',
            '    df["order_date"],',
            '    format="%Y/%m/%d %H:%M",',
            '    errors="coerce",',
            ")",
            "print(df.head())",
          ]),
          "格式明确时，显式指定通常更快也更稳。"
        ),
        createExample(
          "Unix 时间戳转时间",
          lines([
            'df["event_time"] = pd.to_datetime(df["event_ts"], unit="s", utc=True)',
            "print(df.head())",
          ]),
          "日志和埋点数据里很常见。"
        ),
      ]
    case "pd-resample":
      return [
        createExample("按月重采样", command.code, "趋势分析和月报最常见。"),
        createExample(
          "按周统计订单量",
          lines([
            "weekly = (",
            '    df.set_index("order_date")',
            '      .resample("W")["order_id"]',
            "      .count()",
            '      .rename("order_cnt")',
            ")",
            "print(weekly.tail())",
          ]),
          "相比手写年份和周字段，更紧凑也更不易出错。"
        ),
        createExample(
          "指定 on 参数",
          lines([
            'monthly = df.resample("M", on="order_date")["sales"].sum()',
            "print(monthly)",
          ]),
          "当时间列还没有设成索引时，可以直接这么写。"
        ),
      ]
    case "pd-rolling":
      return [
        createExample("移动均值", command.code, "适合看平滑趋势。"),
        createExample(
          "3 期滚动和",
          lines([
            'df = df.sort_values("order_date")',
            'df["sales_roll3"] = df["sales"].rolling(window=3, min_periods=1).sum()',
            "print(df.tail())",
          ]),
          "短期累计指标经常这么做。"
        ),
        createExample(
          "按时间列滚动",
          lines([
            "roll = (",
            '    df.sort_values("order_date")',
            '      .set_index("order_date")["sales"]',
            '      .rolling("7D")',
            "      .mean()",
            ")",
            "print(roll.tail())",
          ]),
          "处理不等间隔事件流时特别有用。"
        ),
      ]
    case "np-where":
      return [
        createExample("条件分支", command.code, "向量化替代 if/else 的高频写法。"),
        createExample(
          "按阈值打标签",
          lines([
            "import numpy as np",
            "",
            "sales = np.array([120, 480, 620, 910])",
            'segment = np.where(sales >= 500, "high", "normal")',
            "print(segment)",
          ]),
          "规则简单时比 pandas apply 更轻量。"
        ),
        createExample(
          "嵌套条件",
          lines([
            "score = np.array([58, 76, 88, 94])",
            'grade = np.where(score >= 90, "A", np.where(score >= 75, "B", "C"))',
            "print(grade)",
          ]),
          "条件层数再多时，可以考虑换成 np.select。"
        ),
      ]
    case "np-select":
      return [
        createExample("多条件映射", command.code, "多分支规则时比嵌套 where 更清晰。"),
        createExample(
          "按分数映射等级",
          lines([
            "import numpy as np",
            "",
            "score = np.array([58, 76, 88, 94])",
            "conditions = [score < 60, score < 80, score >= 80]",
            'choices = ["C", "B", "A"]',
            "grade = np.select(conditions, choices, default='Unknown')",
            "print(grade)",
          ]),
          "适合规则层级清晰的分段映射。"
        ),
        buildValidationExample(command),
      ]
    case "sns-lineplot":
    case "sns-heatmap":
    case "plt-subplots":
    case "plt-savefig":
      return null
    default:
      return null
  }
}

function buildExamples(command) {
  const override = buildOverrideExamples(command)
  if (override) {
    return override
  }

  return [
    createExample("基础示例", command.code, command.summary),
    buildWorkflowExample(command),
    buildValidationExample(command),
  ]
}

function buildVisualDemoSpec(command) {
  const id = command.id

  if (command.library === "pandas") {
    const definitions = [
      {
        test: /read|to_|excel|csv|json|parquet/.test(id),
        type: "tableflow",
        title: "表格读写示意",
        note: "用表格结构帮助理解数据从文件到 DataFrame，再到导出的流转路径。",
      },
      {
        test: /merge|concat|join/.test(id),
        type: "joinflow",
        title: "多表连接示意",
        note: "适合理解主键对齐、左右表补列和结果放大的风险点。",
      },
      {
        test: /melt|pivot|wide|stack|unstack|explode|reindex/.test(id),
        type: "reshapeflow",
        title: "形状变化示意",
        note: "帮助记住宽表、长表和层级结构之间的转换关系。",
      },
      {
        test: /groupby|pivot-table|crosstab|rank|cum/.test(id),
        type: "summarycard",
        title: "汇总统计示意",
        note: "适合理解分组聚合、透视和累计类命令的输出结构。",
      },
      {
        test: /to-datetime|resample|rolling|shift|pct-change|dt/.test(id),
        type: "timeline",
        title: "时间序列示意",
        note: "帮助记住时间列转换、重采样和滚动窗口的结果形态。",
      },
    ]

    const matched = definitions.find((item) => item.test)
    return matched
      ? { type: matched.type, title: matched.title, note: matched.note }
      : {
          type: "tableflow",
          title: "表格结果示意",
          note: "用简化表格来帮助理解 DataFrame 类命令通常会产出什么结构。",
        }
  }

  if (command.library === "numpy") {
    const definitions = [
      {
        test: /meshgrid|reshape|transpose|stack|column-stack|vstack|hstack|split|take/.test(id),
        type: "arraygrid",
        title: "数组形状示意",
        note: "重点帮助理解维度、轴和重排后结果的形状变化。",
      },
      {
        test: /linalg|dot|einsum|cov|corrcoef/.test(id),
        type: "matrixcard",
        title: "矩阵运算示意",
        note: "适合记住矩阵乘法、求解和协方差这类二维结构计算。",
      },
      {
        test: /where|select|digitize|searchsorted|isclose|logical|any|all/.test(id),
        type: "decisionflow",
        title: "条件映射示意",
        note: "帮助记住条件分支、分箱和布尔判断如何作用到整组数组上。",
      },
    ]

    const matched = definitions.find((item) => item.test)
    return matched
      ? { type: matched.type, title: matched.title, note: matched.note }
      : {
          type: "arrayrow",
          title: "数组结果示意",
          note: "用小数组和索引结构帮助理解 numpy 的向量化结果。",
        }
  }

  if (command.library === "scipy") {
    const definitions = [
      {
        test: /^sp-stats-/.test(id),
        type: "statscard",
        title: "统计检验示意",
        note: "强调统计量、p 值、假设方向和样本分组之间的关系。",
      },
      {
        test: /^sp-interpolate-/.test(id),
        type: "interpolatecurve",
        title: "插值拟合示意",
        note: "帮助理解离散点、平滑曲线和中间插值点之间的关系。",
      },
      {
        test: /^sp-signal-/.test(id),
        type: "signalwave",
        title: "信号处理示意",
        note: "用原始序列与平滑/峰值结果的对比来帮助记忆。",
      },
      {
        test: /^sp-optimize-/.test(id),
        type: "optimizepath",
        title: "优化求解示意",
        note: "适合理解目标函数、参数更新和最优点搜索的过程。",
      },
      {
        test: /^sp-spatial-|^sp-sparse-/.test(id),
        type: "matrixcard",
        title: "距离与矩阵示意",
        note: "帮助理解距离矩阵、稀疏矩阵和结构化数值对象的输出形态。",
      },
      {
        test: /^sp-special-/.test(id),
        type: "line",
        title: "函数变换示意",
        note: "适合理解输入数值经过特殊函数映射后的变化趋势。",
      },
    ]

    const matched = definitions.find((item) => item.test)
    return matched
      ? { type: matched.type, title: matched.title, note: matched.note }
      : {
          type: "statscard",
          title: "科学计算示意",
          note: "用结果结构示意帮助理解 scipy 命令更偏算法与统计推断。",
        }
  }

  if (command.library === "statsmodels") {
    const definitions = [
      {
        test: /arima|seasonal|acf|pacf/.test(id),
        type: "forecastpanel",
        title: "时间序列建模示意",
        note: "帮助理解趋势、季节性、自相关和预测输出之间的关系。",
      },
      {
        test: /summary|anova|ols|logit|formula|constant/.test(id),
        type: "modelsummary",
        title: "统计建模结果示意",
        note: "适合记住设计矩阵、系数、显著性和 summary 输出的结构。",
      },
      {
        test: /qqplot/.test(id),
        type: "distribution",
        title: "分布诊断示意",
        note: "帮助理解样本分布与理论分布的对照方式。",
      },
    ]

    const matched = definitions.find((item) => item.test)
    return matched
      ? { type: matched.type, title: matched.title, note: matched.note }
      : {
          type: "modelsummary",
          title: "统计模型示意",
          note: "把结果表、系数和诊断信息可视化，能更快理解 statsmodels 的输出重点。",
        }
  }

  if (command.library === "sklearn") {
    const definitions = [
      {
        test: /train-test-split/.test(id),
        type: "splitview",
        title: "训练/测试切分示意",
        note: "帮助记住样本被拆成训练集和测试集后的边界。",
      },
      {
        test: /scaler|encoder|imputer|columntransformer/.test(id),
        type: "pipelineflow",
        title: "预处理流程示意",
        note: "适合理解缺失值、缩放和编码步骤如何串在一起。",
      },
      {
        test: /pipeline|cross-val|grid-search/.test(id),
        type: "pipelineflow",
        title: "建模流水线示意",
        note: "帮助理解预处理、模型和验证是如何通过 Pipeline 串联的。",
      },
      {
        test: /confusion|classification-report|roc-auc/.test(id),
        type: "confusioncard",
        title: "分类评估示意",
        note: "适合理解真阳性、假阳性和阈值型分类指标的含义。",
      },
      {
        test: /kmeans|silhouette/.test(id),
        type: "clusterdemo",
        title: "聚类结构示意",
        note: "帮助理解样本如何被划分为不同簇，以及聚类质量如何被衡量。",
      },
      {
        test: /pca/.test(id),
        type: "arraygrid",
        title: "降维结果示意",
        note: "适合理解高维特征被投影到更少维度后的结果结构。",
      },
      {
        test: /linear-regression|logistic-regression|random-forest/.test(id),
        type: "modelsummary",
        title: "模型训练示意",
        note: "帮助理解特征输入、模型拟合和预测输出之间的关系。",
      },
    ]

    const matched = definitions.find((item) => item.test)
    return matched
      ? { type: matched.type, title: matched.title, note: matched.note }
      : {
          type: "pipelineflow",
          title: "机器学习流程示意",
          note: "scikit-learn 最适合放在“数据 -> 预处理 -> 模型 -> 评估”这条主线里理解。",
        }
  }

  if (command.library === "keras") {
    const definitions = [
      {
        test: /fit|evaluate|predict|compile|earlystopping|modelcheckpoint/.test(id),
        type: "trainingcurve",
        title: "训练过程示意",
        note: "帮助理解 compile、fit、回调和评估在训练阶段各自负责什么。",
      },
      {
        test: /conv2d|embedding|lstm|dense|dropout|sequential/.test(id),
        type: "networkstack",
        title: "神经网络结构示意",
        note: "适合记住层堆叠、输入形状和输出形状如何逐层流动。",
      },
    ]

    const matched = definitions.find((item) => item.test)
    return matched
      ? { type: matched.type, title: matched.title, note: matched.note }
      : {
          type: "networkstack",
          title: "深度学习结构示意",
          note: "把层结构和训练流程放在一起理解，会更容易掌握 keras 的核心命令。",
        }
  }

  if (command.library === "gensim") {
    const definitions = [
      {
        test: /dictionary|doc2bow|tfidf/.test(id),
        type: "tokengrid",
        title: "语料表示示意",
        note: "帮助理解原始 token、词典 id 和稀疏词袋之间的转换关系。",
      },
      {
        test: /lda/.test(id),
        type: "topicmap",
        title: "主题模型示意",
        note: "适合理解文档、主题和高频词之间的分布关系。",
      },
      {
        test: /word2vec|similar|phrases/.test(id),
        type: "semanticspace",
        title: "语义空间示意",
        note: "帮助理解词向量、短语和相似词检索在语义空间里的含义。",
      },
    ]

    const matched = definitions.find((item) => item.test)
    return matched
      ? { type: matched.type, title: matched.title, note: matched.note }
      : {
          type: "tokengrid",
          title: "文本处理示意",
          note: "用语料和主题结构示意帮助理解 gensim 的工作方式。",
        }
  }

  const definitions = [
    {
      test: /heatmap|clustermap|imshow|matshow|contourf/.test(id),
      type: "heatmap",
      title: "矩阵型图示意",
      note: "适合热力图、矩阵图和二维数值面的视觉记忆。",
    },
    {
      test: /color-palette|colorbar/.test(id),
      type: "palette",
      title: "配色与色标示意",
      note: "适合记住调色板和色标命令在可视化中的角色。",
    },
    {
      test: /pairplot|pairgrid|jointplot|jointgrid|facetgrid|relplot|catplot|subplot|mosaic/.test(id),
      type: "grid",
      title: "多面板布局示意",
      note: "帮助快速记住分面、多子图和矩阵式可视化的结构。",
    },
    {
      test: /boxplot|boxenplot|violinplot/.test(id),
      type: "box",
      title: "分布摘要图示意",
      note: "适合箱线图、小提琴图这类强调分布形状与离散程度的图。",
    },
    {
      test: /histplot|hist|displot|kdeplot|ecdfplot|rugplot/.test(id),
      type: "distribution",
      title: "分布曲线示意",
      note: "用于记住分箱、密度、累计分布和地毯线的典型轮廓。",
    },
    {
      test: /barh|countplot/.test(id),
      type: "barh",
      title: "横向比较图示意",
      note: "适合类别多、标签长的排序型比较图。",
    },
    {
      test: /bar|pointplot/.test(id),
      type: "bar",
      title: "类别比较图示意",
      note: "适合柱状图、点估计图这类按组比较的结构。",
    },
    {
      test: /scatter|stripplot|swarmplot|hexbin/.test(id),
      type: "scatter",
      title: "散点关系图示意",
      note: "强调点位分布、拥挤程度和两变量关系。",
    },
    {
      test: /regplot|lmplot|residplot/.test(id),
      type: "regression",
      title: "关系与趋势示意",
      note: "用于记住散点与趋势线、残差结构的典型组合。",
    },
    {
      test: /fill-between|stackplot/.test(id),
      type: "area",
      title: "面积层叠图示意",
      note: "适合区间带、累计结构和面积型趋势表达。",
    },
    {
      test: /quiver|streamplot/.test(id),
      type: "vector",
      title: "向量场示意",
      note: "适合流场、方向场或梯度方向这类箭头图。",
    },
    {
      test: /pie/.test(id),
      type: "pie",
      title: "占比图示意",
      note: "用来记住扇区占比结构，更适合少类别场景。",
    },
    {
      test: /step|stem|eventplot/.test(id),
      type: "step",
      title: "离散过程图示意",
      note: "适合阶梯、离散脉冲和事件序列的视觉结构。",
    },
    {
      test: /table/.test(id),
      type: "table",
      title: "图内表格示意",
      note: "适合把摘要指标和说明信息嵌进图表版面。",
    },
    {
      test: /twinx|secondary-axis|move-legend|despine|style-use|savefig|tight-layout|subplots-adjust|suptitle|annotate|text|axhline|axvline|axspan/.test(id),
      type: "layout",
      title: "版式与标注示意",
      note: "这类命令更偏图表修饰和版式控制，因此用结构示意来帮助记忆。",
    },
    {
      test: /lineplot|plot/.test(id),
      type: "line",
      title: "趋势图示意",
      note: "适合折线、趋势线和时间序列类图表的结构记忆。",
    },
  ]

  const matched = definitions.find((item) => item.test)
  return matched
    ? {
        type: matched.type,
        title: matched.title,
        note: matched.note,
      }
    : {
        type: "line",
        title: "通用图形示意",
        note: "这张预览是帮助记忆图形结构的离线示意图。",
      }
}

function normalizeParamDoc(param) {
  return {
    name: param.name || "参数",
    meaning: param.meaning || "控制当前写法行为的核心参数。",
    detail:
      param.detail || "建议结合示例与输出结果一起验证，尤其关注形状和缺失值变化。",
  }
}

function normalizeExampleCard(example, fallbackTitle) {
  return {
    title: example.title || fallbackTitle,
    code: example.code || "",
    note: example.note || "",
  }
}

function buildCommandRecord(command) {
  const normalized = {
    when: command.when ?? command.summary,
    tips: command.tips ?? [],
    keywords: command.keywords ?? [],
    related: command.related ?? [],
    ...command,
  }

  const parameters =
    normalized.parameters && normalized.parameters.length
      ? normalized.parameters.map(normalizeParamDoc)
      : buildParameterDocs(normalized).map(normalizeParamDoc)

  const examples =
    normalized.examples && normalized.examples.length
      ? normalized.examples.map((example, index) =>
          normalizeExampleCard(example, `示例 ${index + 1}`)
        )
      : buildExamples(normalized).map((example, index) =>
          normalizeExampleCard(example, `示例 ${index + 1}`)
        )

  const officialReferences =
    normalized.officialReferences && normalized.officialReferences.length
      ? uniqueRefs(normalized.officialReferences)
      : buildOfficialReferences(normalized)

  return {
    ...normalized,
    recommendedUse:
      normalized.recommendedUse && normalized.recommendedUse.length
        ? normalized.recommendedUse
        : buildRecommendedUse(normalized),
    professionalDetail:
      normalized.professionalDetail || buildProfessionalDetail(normalized),
    parameters,
    learningParameters: parameters,
    examples,
    officialReferences,
    visualDemo:
      Object.prototype.hasOwnProperty.call(normalized, "visualDemo")
        ? normalized.visualDemo
        : buildVisualDemoSpec(normalized),
  }
}
