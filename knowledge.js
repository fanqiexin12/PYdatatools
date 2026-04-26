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
  if (!["seaborn", "matplotlib"].includes(command.library)) {
    return null
  }

  const id = command.id

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

  return {
    ...normalized,
    recommendedUse:
      normalized.recommendedUse && normalized.recommendedUse.length
        ? normalized.recommendedUse
        : buildRecommendedUse(normalized),
    professionalDetail:
      normalized.professionalDetail || buildProfessionalDetail(normalized),
    parameters:
      normalized.parameters && normalized.parameters.length
        ? normalized.parameters.map(normalizeParamDoc)
        : buildParameterDocs(normalized).map(normalizeParamDoc),
    examples:
      normalized.examples && normalized.examples.length
        ? normalized.examples.map((example, index) =>
            normalizeExampleCard(example, `示例 ${index + 1}`)
          )
        : buildExamples(normalized).map((example, index) =>
            normalizeExampleCard(example, `示例 ${index + 1}`)
          ),
    visualDemo:
      Object.prototype.hasOwnProperty.call(normalized, "visualDemo")
        ? normalized.visualDemo
        : buildVisualDemoSpec(normalized),
  }
}
