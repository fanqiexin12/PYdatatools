const libraryMeta = {
  all: { label: "全部库", note: "一起检索" },
  pandas: { label: "pandas", note: "表格处理" },
  numpy: { label: "numpy", note: "数值计算" },
  scipy: { label: "scipy", note: "科学计算" },
  statsmodels: { label: "statsmodels", note: "统计建模" },
  sklearn: { label: "scikit-learn", note: "机器学习" },
  keras: { label: "keras", note: "深度学习" },
  gensim: { label: "gensim", note: "文本主题" },
  seaborn: { label: "seaborn", note: "统计绘图" },
  matplotlib: { label: "matplotlib", note: "基础绘图" },
}

const categoryMeta = {
  all: { label: "全部任务" },
  io: { label: "读写文件" },
  inspect: { label: "查看数据" },
  filter: { label: "筛选数据" },
  clean: { label: "数据清洗" },
  transform: { label: "字段变换" },
  group: { label: "分组聚合" },
  join: { label: "表连接" },
  reshape: { label: "形状调整" },
  time: { label: "时间序列" },
  numeric: { label: "数值计算" },
  stats: { label: "统计推断" },
  optimize: { label: "优化求解" },
  signal: { label: "信号处理" },
  model: { label: "建模训练" },
  evaluate: { label: "结果评估" },
  text: { label: "文本挖掘" },
  plot: { label: "绘图展示" },
}

const quickFilters = [
  { label: "导入 CSV", library: "pandas", category: "io", search: "csv" },
  { label: "缺失值处理", library: "pandas", category: "clean", search: "" },
  { label: "分组聚合", library: "pandas", category: "group", search: "" },
  { label: "表连接", library: "pandas", category: "join", search: "" },
  { label: "时间序列", library: "pandas", category: "time", search: "" },
  { label: "字符串处理", library: "pandas", category: "transform", search: "str" },
  { label: "数组条件", library: "numpy", category: "numeric", search: "where" },
  { label: "统计检验", library: "scipy", category: "stats", search: "" },
  { label: "优化求解", library: "scipy", category: "optimize", search: "" },
  { label: "信号平滑", library: "scipy", category: "signal", search: "filter" },
  { label: "统计建模", library: "statsmodels", category: "model", search: "" },
  { label: "机器学习", library: "sklearn", category: "model", search: "" },
  { label: "深度学习", library: "keras", category: "model", search: "" },
  { label: "主题模型", library: "gensim", category: "text", search: "" },
  { label: "统计图", library: "seaborn", category: "plot", search: "" },
  { label: "基础绘图", library: "matplotlib", category: "plot", search: "" },
]

const scenarios = [
  {
    id: "scenario-ingest",
    title: "文件导入与快速摸底",
    summary: "从 CSV / Excel 读入，到列类型、缺失比例和基础分布的第一轮检查。",
    library: "all",
    category: "inspect",
    search: "",
    leadId: "pd-read-csv",
    steps: [
      "pd-read-csv",
      "pd-read-excel",
      "pd-head",
      "pd-info",
      "pd-describe",
      "pd-isna-sum",
    ],
    highlights: [
      "先确认行数、列名和类型，再决定后续清洗策略。",
      "日期列尽量在流程早期转成 datetime。",
      "缺失值比例和类别分布，通常决定建模或报表的稳定性。",
    ],
  },
  {
    id: "scenario-clean",
    title: "清洗、修正与特征准备",
    summary: "集中处理缺失值、重复值、类型转换、分箱和哑变量等准备工作。",
    library: "pandas",
    category: "clean",
    search: "",
    leadId: "pd-fillna",
    steps: [
      "pd-fillna",
      "pd-drop-duplicates",
      "pd-astype",
      "pd-replace",
      "pd-cut-qcut",
      "pd-get-dummies",
    ],
    highlights: [
      "先做规则明确的修正，再做统计口径上的补值。",
      "分类特征常见动作是分箱、映射和 one-hot。",
      "去重前最好先排序，明确保留哪条记录。",
    ],
  },
  {
    id: "scenario-join",
    title: "多表整合与汇总输出",
    summary: "适合订单表、用户表、维度表联查，以及最终报表的分组汇总。",
    library: "pandas",
    category: "join",
    search: "",
    leadId: "pd-merge",
    steps: [
      "pd-merge",
      "pd-concat",
      "pd-groupby-agg",
      "pd-pivot-table",
      "pd-crosstab",
      "pd-to-excel-csv",
    ],
    highlights: [
      "合并后优先检查记录数有没有意外放大。",
      "命名聚合和透视表适合做最终汇总面板。",
      "导出前再统一列名、排序和索引。",
    ],
  },
  {
    id: "scenario-time",
    title: "时间序列与趋势分析",
    summary: "从字符串日期到按周、按月汇总，再到趋势图和环比观察。",
    library: "pandas",
    category: "time",
    search: "",
    leadId: "pd-to-datetime",
    steps: [
      "pd-to-datetime",
      "pd-resample",
      "pd-shift",
      "pd-rolling",
      "sns-lineplot",
      "plt-fill-between",
    ],
    highlights: [
      "先把时间列转换好，再做 resample、shift、rolling。",
      "趋势图前要确保时间已经排序。",
      "滚动均值和前一期对比很适合看波动和异常变化。",
    ],
  },
  {
    id: "scenario-feature",
    title: "字段构造与字符串处理",
    summary: "聚焦新字段生成、映射规则、文本筛选和从文本里提取结构信息。",
    library: "pandas",
    category: "transform",
    search: "",
    leadId: "pd-assign",
    steps: [
      "pd-assign",
      "pd-map",
      "pd-apply",
      "pd-str-contains",
      "pd-str-extract",
      "np-where",
    ],
    highlights: [
      "规则简单时优先 map / where，复杂逻辑再考虑 apply。",
      "文本列常配合 contains、extract 做规则识别。",
      "字段衍生后尽量立即抽样检查，避免链式错误累积。",
    ],
  },
  {
    id: "scenario-visual",
    title: "报表图表与探索性可视化",
    summary: "从长宽表调整，到柱状图、热力图、相关性图和结果导出。",
    library: "all",
    category: "plot",
    search: "",
    leadId: "pd-melt",
    steps: [
      "pd-melt",
      "sns-barplot",
      "sns-heatmap",
      "sns-pairplot",
      "plt-subplots",
      "plt-savefig",
    ],
    highlights: [
      "seaborn 很多图更喜欢长表结构。",
      "热力图适合矩阵类结果，pairplot 适合探索变量关系。",
      "最后用 savefig 留存结果，避免只停留在屏幕展示。",
    ],
  },
  {
    id: "scenario-scipy",
    title: "统计检验、平滑与模型拟合",
    summary: "从标准化、显著性检验，到插值平滑、曲线拟合和分布展示的一条常见科研/分析链路。",
    library: "all",
    category: "all",
    search: "scipy",
    leadId: "sp-stats-zscore",
    steps: [
      "sp-stats-zscore",
      "sp-stats-ttest-ind",
      "sp-stats-linregress",
      "sp-interpolate-interp1d",
      "sp-signal-savgol",
      "sns-pointplot",
    ],
    highlights: [
      "先做标准化和分布检查，再进入显著性检验与拟合。",
      "平滑和插值适合连续序列，但不要掩盖真实异常点。",
      "把 scipy 的结果接到 seaborn 或 matplotlib 图上，最适合做讲解型分析。",
    ],
  },
  {
    id: "scenario-statsmodels",
    title: "回归、分解与时间序列统计建模",
    summary: "从描述统计、设计矩阵，到 OLS / ANOVA / ARIMA / 季节分解的一条常见统计建模链路。",
    library: "statsmodels",
    category: "model",
    search: "",
    leadId: "sm-add-constant",
    steps: [
      "sm-add-constant",
      "sm-ols",
      "sm-summary",
      "sm-anova-lm",
      "sm-seasonal-decompose",
      "sm-arima",
    ],
    highlights: [
      "先明确自变量和设计矩阵，再进入回归估计和显著性解释。",
      "时间序列建模前尽量先看季节性和自相关结构。",
      "statsmodels 最强的是结果解释层，而不只是拟合本身。",
    ],
  },
  {
    id: "scenario-ml",
    title: "机器学习训练与评估",
    summary: "从切分数据、特征缩放、流水线建模，到交叉验证和分类评估的标准流程。",
    library: "sklearn",
    category: "model",
    search: "",
    leadId: "sk-train-test-split",
    steps: [
      "sk-train-test-split",
      "sk-standardscaler",
      "sk-pipeline",
      "sk-logistic-regression",
      "sk-cross-val-score",
      "sk-confusion-matrix",
    ],
    highlights: [
      "先切分训练/测试，再做缩放和流水线，能减少数据泄漏。",
      "模型评估不要只看 accuracy，最好连 confusion matrix 一起看。",
      "交叉验证适合在模型选择阶段帮助你更稳地比较方案。",
    ],
  },
  {
    id: "scenario-deep",
    title: "Keras 神经网络训练流程",
    summary: "从搭 Sequential 网络、编译、训练，到回调、评估和预测的一条常见深度学习入口流程。",
    library: "keras",
    category: "model",
    search: "",
    leadId: "keras-sequential",
    steps: [
      "keras-sequential",
      "keras-dense",
      "keras-compile",
      "keras-fit",
      "keras-earlystopping",
      "keras-evaluate",
    ],
    highlights: [
      "模型结构、损失函数和优化器通常决定了训练行为的上限。",
      "回调能帮你减少过拟合和长时间无效训练。",
      "深度学习命令最好和输入张量形状一起理解。",
    ],
  },
  {
    id: "scenario-text",
    title: "文本向量化与主题建模",
    summary: "从词典、词袋、TF-IDF，到 LDA 主题模型和词向量检索的一条常见文本挖掘流程。",
    library: "gensim",
    category: "text",
    search: "",
    leadId: "gen-dictionary",
    steps: [
      "gen-dictionary",
      "gen-doc2bow",
      "gen-tfidfmodel",
      "gen-ldamodel",
      "gen-ldamodel-print-topics",
      "gen-word2vec",
    ],
    highlights: [
      "先把文本切词和清洗做好，再做词袋或主题模型。",
      "LDA 适合主题结构理解，Word2Vec 更适合词语相似性和语义邻近。",
      "文本库的结果最好配合示意结构来理解，而不是只看函数名。",
    ],
  },
]

const createCommand = ({ when, tips, keywords, related, ...rest }) =>
  buildCommandRecord({
    when: when ?? rest.summary,
    tips: tips ?? [],
    keywords: keywords ?? [],
    related: related ?? [],
    ...rest,
  })

const commands = [
  createCommand({
    id: "pd-read-csv",
    library: "pandas",
    category: "io",
    title: "read_csv()",
    alias: "读取 CSV 文件",
    summary: "把本地 CSV 读成 DataFrame，是多数分析流程的起点。",
    syntax: 'pd.read_csv("sales.csv", encoding="utf-8")',
    code: `import pandas as pd

df = pd.read_csv(
    "sales.csv",
    encoding="utf-8",
    parse_dates=["order_date"]
)

print(df.head())`,
    keywords: ["csv", "读取", "导入", "文件", "load csv", "read file"],
    tips: [
      "遇到中文乱码时优先检查 encoding 参数。",
      "日期列经常可以直接用 parse_dates 读成 datetime 类型。",
    ],
    related: ["pd-read-excel", "pd-head", "pd-info"],
  }),
  createCommand({
    id: "pd-read-excel",
    library: "pandas",
    category: "io",
    title: "read_excel()",
    alias: "读取 Excel 文件",
    summary: "把 xlsx / xls 工作表载入为 DataFrame，适合业务报表和人工整理的数据源。",
    syntax: 'pd.read_excel("report.xlsx", sheet_name="Sales")',
    code: `import pandas as pd

df = pd.read_excel(
    "report.xlsx",
    sheet_name="Sales",
    usecols=["order_id", "city", "sales"]
)

print(df.head())`,
    keywords: ["excel", "xlsx", "读取", "导入工作表"],
    related: ["pd-read-csv", "pd-head", "pd-to-excel-csv"],
  }),
  createCommand({
    id: "pd-to-excel-csv",
    library: "pandas",
    category: "io",
    title: "to_csv() / to_excel()",
    alias: "导出结果到文件",
    summary: "把清洗或汇总后的结果保存成 CSV 或 Excel，方便继续分享和归档。",
    syntax: 'result.to_excel("summary.xlsx", index=False)',
    code: `result.to_csv("summary.csv", index=False, encoding="utf-8-sig")
result.to_excel("summary.xlsx", index=False)`,
    keywords: ["导出", "保存", "to_csv", "to_excel", "write file"],
    related: ["pd-groupby-agg", "pd-pivot-table", "plt-savefig"],
  }),
  createCommand({
    id: "pd-head",
    library: "pandas",
    category: "inspect",
    title: "head() / tail()",
    alias: "查看前几行或后几行",
    summary: "快速确认列名、类型和样本内容，避免在脏数据上盲操作。",
    syntax: "df.head(5)",
    code: `print(df.head(5))
print(df.tail(3))
print(df.sample(4, random_state=7))`,
    keywords: ["查看", "预览", "样本", "head", "tail", "sample"],
    tips: [
      "搭配 sample() 能更好地检查分布，而不只看前几行。",
      "如果列太多，可用 df.head().T 转置后看字段。",
    ],
    related: ["pd-read-csv", "pd-info", "pd-describe"],
  }),
  createCommand({
    id: "pd-info",
    library: "pandas",
    category: "inspect",
    title: "info()",
    alias: "查看列类型和非空数",
    summary: "快速检查每列的数据类型、非空数量和整体内存占用。",
    syntax: "df.info()",
    code: `df.info()
df.info(memory_usage="deep")`,
    keywords: ["info", "列类型", "非空", "dtype", "memory"],
    related: ["pd-head", "pd-isna-sum", "pd-astype"],
  }),
  createCommand({
    id: "pd-describe",
    library: "pandas",
    category: "inspect",
    title: "describe()",
    alias: "查看基础统计摘要",
    summary: "快速拿到数值列或全部列的分布概览，包括均值、分位数和频数。",
    syntax: "df.describe(include='all')",
    code: `print(df.describe())
print(df.describe(include="all").T)`,
    keywords: ["describe", "统计摘要", "均值", "分位数", "概览"],
    related: ["pd-head", "pd-value-counts", "np-percentile"],
  }),
  createCommand({
    id: "pd-isna-sum",
    library: "pandas",
    category: "inspect",
    title: "isna().sum()",
    alias: "统计缺失值数量",
    summary: "按列统计 NaN 数量和占比，是清洗前必须先看的检查项。",
    syntax: "df.isna().sum().sort_values(ascending=False)",
    code: `missing = df.isna().sum().to_frame("missing_cnt")
missing["missing_rate"] = missing["missing_cnt"] / len(df)

print(missing.sort_values("missing_rate", ascending=False))`,
    keywords: ["缺失统计", "isna", "nan", "空值数量"],
    related: ["pd-fillna", "pd-info", "np-nanmean"],
  }),
  createCommand({
    id: "pd-loc",
    library: "pandas",
    category: "filter",
    title: "loc[]",
    alias: "按条件和列名选取数据",
    summary: "最通用的 DataFrame 选取方式，适合组合行条件和列子集。",
    syntax: 'df.loc[df["sales"] > 1000, ["city", "sales"]]',
    code: `high_value = df.loc[
    (df["sales"] > 1000) & (df["city"] == "Shanghai"),
    ["order_id", "city", "sales"]
]

print(high_value.head())`,
    keywords: ["loc", "筛选", "列选择", "布尔索引", "行列"],
    tips: [
      "条件之间要用 & 和 |，并给每个条件加括号。",
      "loc 是标签式索引，列名写错会直接报错，调试很友好。",
    ],
    related: ["pd-query", "pd-sort-values", "np-where"],
  }),
  createCommand({
    id: "pd-query",
    library: "pandas",
    category: "filter",
    title: "query()",
    alias: "用表达式筛选行",
    summary: "把复杂条件写成接近 SQL 的表达式，读起来更轻。",
    syntax: 'df.query("sales > 1000 and city == \'Shanghai\'")',
    code: `result = df.query(
    "sales > 1000 and city == 'Shanghai' and discount <= 0.2"
)

print(result[["order_id", "sales", "discount"]].head())`,
    keywords: ["query", "条件表达式", "sql 风格", "筛选行"],
    related: ["pd-loc", "pd-groupby-agg", "pd-merge"],
  }),
  createCommand({
    id: "pd-fillna",
    library: "pandas",
    category: "clean",
    title: "fillna() / dropna()",
    alias: "处理缺失值",
    summary: "补缺失值或删除缺失行，是清洗阶段最常见的动作之一。",
    syntax: 'df["score"] = df["score"].fillna(df["score"].median())',
    code: `df["score"] = df["score"].fillna(df["score"].median())
df["city"] = df["city"].fillna("Unknown")

clean_df = df.dropna(subset=["order_id", "sales"])

print(clean_df.isna().sum())`,
    keywords: ["缺失值", "空值", "nan", "fillna", "dropna", "missing"],
    tips: [
      "先看缺失比例，再决定是删还是补。",
      "分类列常补固定标签，数值列常补均值、中位数或业务默认值。",
    ],
    related: ["pd-isna-sum", "pd-drop-duplicates", "np-nanmean"],
  }),
  createCommand({
    id: "pd-drop-duplicates",
    library: "pandas",
    category: "clean",
    title: "drop_duplicates()",
    alias: "去重",
    summary: "按全部列或指定列去重，适合处理重复订单、重复用户等场景。",
    syntax: 'df.drop_duplicates(subset=["user_id"], keep="last")',
    code: `deduped = (
    df.sort_values("updated_at")
      .drop_duplicates(subset=["user_id"], keep="last")
)

print(deduped.shape)`,
    keywords: ["去重", "重复", "distinct", "drop duplicates"],
    tips: [
      "先排序再去重，才能稳定地保留最新或最旧记录。",
      "subset 决定以哪些列判断重复，不写时默认整行比较。",
    ],
    related: ["pd-sort-values", "pd-fillna", "pd-merge"],
  }),
  createCommand({
    id: "pd-astype",
    library: "pandas",
    category: "clean",
    title: "astype()",
    alias: "转换列类型",
    summary: "把字符串列转成数值、分类、布尔等目标类型，方便后续计算和分组。",
    syntax: 'df["qty"] = df["qty"].astype("int64")',
    code: `df["qty"] = df["qty"].astype("int64")
df["city"] = df["city"].astype("category")`,
    keywords: ["astype", "转换类型", "dtype", "int", "category"],
    related: ["pd-info", "pd-to-datetime", "pd-get-dummies"],
  }),
  createCommand({
    id: "pd-rename",
    library: "pandas",
    category: "transform",
    title: "rename()",
    alias: "重命名列或索引",
    summary: "统一字段命名风格，特别适合清洗第三方原始数据后的第一步整理。",
    syntax: 'df.rename(columns={"订单号": "order_id"})',
    code: `df = df.rename(
    columns={
        "订单号": "order_id",
        "销售额": "sales"
    }
)`,
    keywords: ["rename", "重命名", "列名整理"],
    related: ["pd-to-excel-csv", "pd-set-reset-index", "pd-sort-values"],
  }),
  createCommand({
    id: "pd-replace",
    library: "pandas",
    category: "clean",
    title: "replace()",
    alias: "批量替换值",
    summary: "把占位符、异常标签或旧编码批量换成新值。",
    syntax: 'df["city"] = df["city"].replace({"SH": "Shanghai"})',
    code: `df["city"] = df["city"].replace({
    "SH": "Shanghai",
    "BJ": "Beijing"
})

df = df.replace({"N/A": None, "--": None})`,
    keywords: ["replace", "替换值", "编码映射", "占位符"],
    related: ["pd-map", "pd-fillna", "pd-str-contains"],
  }),
  createCommand({
    id: "pd-assign",
    library: "pandas",
    category: "transform",
    title: "assign()",
    alias: "链式新增或改写列",
    summary: "在方法链中优雅地增加新字段，减少中间变量。",
    syntax: 'df.assign(total=lambda x: x["price"] * x["qty"])',
    code: `report = (
    df.assign(
        total=lambda x: x["price"] * x["qty"],
        month=lambda x: x["order_date"].dt.to_period("M").astype(str)
    )
)

print(report[["price", "qty", "total", "month"]].head())`,
    keywords: ["assign", "新增列", "衍生字段", "计算列", "transform column"],
    tips: [
      "lambda x 里的 x 就是当前 DataFrame。",
      "很适合和 query()、groupby()、sort_values() 连写。",
    ],
    related: ["pd-map", "pd-apply", "pd-to-datetime"],
  }),
  createCommand({
    id: "pd-map",
    library: "pandas",
    category: "transform",
    title: "map()",
    alias: "按映射表转换一列",
    summary: "用字典或 Series 把一列值映射成新标签，适合编码转名称和规则标签化。",
    syntax: 'df["region_name"] = df["region_code"].map(code_map)',
    code: `code_map = {"E": "East", "W": "West", "N": "North"}
df["region_name"] = df["region_code"].map(code_map)`,
    keywords: ["map", "映射", "字典映射", "编码转名称"],
    related: ["pd-replace", "pd-assign", "np-where"],
  }),
  createCommand({
    id: "pd-apply",
    library: "pandas",
    category: "transform",
    title: "apply()",
    alias: "按行或列应用函数",
    summary: "当规则比向量化写法复杂时，可以用 apply() 做自定义处理。",
    syntax: 'df.apply(func, axis=1)',
    code: `def label_order(row):
    if row["sales"] >= 1000 and row["profit"] > 0:
        return "high_value"
    return "normal"

df["order_tag"] = df.apply(label_order, axis=1)`,
    keywords: ["apply", "自定义函数", "按行处理", "axis=1"],
    related: ["pd-assign", "pd-map", "np-select"],
  }),
  createCommand({
    id: "pd-value-counts",
    library: "pandas",
    category: "inspect",
    title: "value_counts()",
    alias: "统计类别频次",
    summary: "快速看分类列的分布、热门值和异常标签。",
    syntax: 'df["city"].value_counts(dropna=False)',
    code: `city_dist = df["city"].value_counts(dropna=False)
print(city_dist)`,
    keywords: ["value_counts", "频次", "类别分布", "count"],
    related: ["pd-describe", "pd-nunique", "sns-countplot"],
  }),
  createCommand({
    id: "pd-nunique",
    library: "pandas",
    category: "inspect",
    title: "nunique()",
    alias: "统计唯一值个数",
    summary: "查看每列有多少个不同值，适合摸底 ID 列、类别列和高基数字段。",
    syntax: "df.nunique()",
    code: `unique_cnt = df.nunique(dropna=False)
print(unique_cnt.sort_values(ascending=False))`,
    keywords: ["nunique", "唯一值", "distinct count", "基数"],
    related: ["pd-value-counts", "np-unique", "pd-drop-duplicates"],
  }),
  createCommand({
    id: "pd-cut-qcut",
    library: "pandas",
    category: "transform",
    title: "cut() / qcut()",
    alias: "连续变量分箱",
    summary: "把连续数值切成区间，用于分层分析、画像和业务标签。",
    syntax: 'pd.qcut(df["sales"], q=4)',
    code: `df["sales_bucket"] = pd.cut(
    df["sales"],
    bins=[0, 100, 500, 1000, 5000],
    labels=["low", "mid", "high", "vip"]
)

df["sales_quantile"] = pd.qcut(df["sales"], q=4)`,
    keywords: ["cut", "qcut", "分箱", "区间", "桶"],
    related: ["pd-get-dummies", "sns-boxplot", "plt-hist"],
  }),
  createCommand({
    id: "pd-set-reset-index",
    library: "pandas",
    category: "reshape",
    title: "set_index() / reset_index()",
    alias: "设置或还原索引",
    summary: "把列转成索引或把索引还原成列，常见于时间序列和透视结果处理。",
    syntax: 'df.set_index("order_date").reset_index()',
    code: `indexed = df.set_index("order_date")
restored = indexed.reset_index()

print(indexed.head())
print(restored.head())`,
    keywords: ["set_index", "reset_index", "索引", "index"],
    related: ["pd-resample", "pd-pivot-table", "pd-sort-values"],
  }),
  createCommand({
    id: "pd-sort-values",
    library: "pandas",
    category: "transform",
    title: "sort_values()",
    alias: "按列排序",
    summary: "按一个或多个字段排序，常用于找 Top N、去重前预处理和结果展示。",
    syntax: 'df.sort_values(["sales", "profit"], ascending=[False, False])',
    code: `top_orders = (
    df.sort_values(["sales", "profit"], ascending=[False, False])
      .head(10)
)

print(top_orders[["order_id", "sales", "profit"]])`,
    keywords: ["排序", "sort", "top n", "sort_values"],
    tips: [
      "多列排序时 ascending 可以传列表。",
      "去重前先排序，能控制保留哪一条记录。",
    ],
    related: ["pd-drop-duplicates", "pd-head", "pd-rank"],
  }),
  createCommand({
    id: "pd-groupby-agg",
    library: "pandas",
    category: "group",
    title: "groupby().agg()",
    alias: "分组聚合",
    summary: "按维度汇总指标，是分析报表里最常见的套路。",
    syntax: 'df.groupby("city").agg(total_sales=("sales", "sum"))',
    code: `summary = (
    df.groupby(["city", "channel"], as_index=False)
      .agg(
          total_sales=("sales", "sum"),
          avg_sales=("sales", "mean"),
          order_cnt=("order_id", "nunique")
      )
)

print(summary.head())`,
    keywords: ["groupby", "聚合", "汇总", "sum", "mean", "count"],
    tips: [
      "推荐使用命名聚合语法，输出列名更清晰。",
      "as_index=False 可以避免结果里分组列变成索引。",
    ],
    related: ["pd-pivot-table", "pd-crosstab", "sns-barplot"],
  }),
  createCommand({
    id: "pd-pivot-table",
    library: "pandas",
    category: "group",
    title: "pivot_table()",
    alias: "做交叉透视表",
    summary: "把行维度和列维度拉成交叉表，适合看汇总矩阵。",
    syntax: 'df.pivot_table(index="city", columns="month", values="sales", aggfunc="sum")',
    code: `pivot = df.pivot_table(
    index="city",
    columns="month",
    values="sales",
    aggfunc="sum",
    fill_value=0
)

print(pivot)`,
    keywords: ["pivot", "透视表", "交叉表", "矩阵汇总"],
    related: ["pd-groupby-agg", "pd-melt", "sns-heatmap"],
  }),
  createCommand({
    id: "pd-pivot",
    library: "pandas",
    category: "reshape",
    title: "pivot()",
    alias: "长表转宽表",
    summary: "把长表重新展开成宽表，适合每个维度只对应一个值的场景。",
    syntax: 'df.pivot(index="city", columns="metric", values="value")',
    code: `wide = df.pivot(
    index="city",
    columns="metric",
    values="value"
)

print(wide)`,
    keywords: ["pivot", "长转宽", "宽表", "reshape"],
    related: ["pd-melt", "pd-pivot-table", "sns-heatmap"],
  }),
  createCommand({
    id: "pd-crosstab",
    library: "pandas",
    category: "group",
    title: "crosstab()",
    alias: "计算交叉频数表",
    summary: "快速得到两个分类字段的交叉计数或比例，适合看组合分布。",
    syntax: 'pd.crosstab(df["city"], df["channel"])',
    code: `cross = pd.crosstab(
    df["city"],
    df["channel"],
    normalize="index"
)

print(cross)`,
    keywords: ["crosstab", "交叉频数", "列联表", "比例表"],
    related: ["pd-pivot-table", "pd-groupby-agg", "sns-heatmap"],
  }),
  createCommand({
    id: "pd-merge",
    library: "pandas",
    category: "join",
    title: "merge()",
    alias: "连接两张表",
    summary: "像 SQL join 一样把多张表按键拼起来。",
    syntax: 'orders.merge(users, on="user_id", how="left")',
    code: `merged = (
    orders.merge(users, on="user_id", how="left")
          .merge(city_dim, on="city_id", how="left")
)

print(merged[["order_id", "user_name", "city_name"]].head())`,
    keywords: ["merge", "join", "关联", "拼表", "left join", "inner join"],
    tips: [
      "先明确 on、left_on、right_on，避免误连。",
      "合并后可检查记录数和主键唯一性，防止意外放大数据量。",
    ],
    related: ["pd-merge-asof", "pd-merge-ordered", "pd-concat", "pd-groupby-agg"],
  }),
  createCommand({
    id: "pd-concat",
    library: "pandas",
    category: "join",
    title: "concat()",
    alias: "按行或按列拼接多张表",
    summary: "适合把同结构的分月数据上下堆叠，或把不同指标列左右拼接。",
    syntax: "pd.concat([df1, df2], axis=0, ignore_index=True)",
    code: `all_months = pd.concat(
    [jan_df, feb_df, mar_df],
    axis=0,
    ignore_index=True
)

print(all_months.shape)`,
    keywords: ["concat", "拼接", "纵向合并", "横向合并"],
    related: ["pd-merge", "np-concatenate", "np-vstack-hstack"],
  }),
  createCommand({
    id: "pd-melt",
    library: "pandas",
    category: "reshape",
    title: "melt()",
    alias: "宽表转长表",
    summary: "把多个指标列收拢成一列变量名和一列变量值，便于聚合和绘图。",
    syntax: 'df.melt(id_vars="city", var_name="metric", value_name="value")',
    code: `long_df = df.melt(
    id_vars=["city"],
    value_vars=["sales", "profit", "cost"],
    var_name="metric",
    value_name="value"
)

print(long_df.head())`,
    keywords: ["melt", "宽转长", "reshape", "长表", "tidy data"],
    tips: [
      "seaborn 很多图偏爱长表结构，melt() 是常见前置步骤。",
      "id_vars 是保留不动的维度列。",
    ],
    related: ["pd-pivot", "pd-pivot-table", "sns-barplot"],
  }),
  createCommand({
    id: "pd-explode",
    library: "pandas",
    category: "reshape",
    title: "explode()",
    alias: "把列表列拆成多行",
    summary: "当一列里装的是列表或分隔后数组时，用 explode() 展开成明细行。",
    syntax: 'df.explode("tags")',
    code: `df["tags"] = df["tags"].str.split(",")
tag_df = df.explode("tags")

print(tag_df[["user_id", "tags"]].head())`,
    keywords: ["explode", "展开列表", "拆成多行", "数组列"],
    related: ["pd-str-contains", "pd-value-counts", "pd-melt"],
  }),
  createCommand({
    id: "pd-str-contains",
    library: "pandas",
    category: "transform",
    title: "str.contains()",
    alias: "按文本模式筛选",
    summary: "在字符串列里查关键词或正则模式，是文本规则识别的高频写法。",
    syntax: 'df["title"].str.contains("退款", na=False)',
    code: `mask = df["title"].str.contains("退款|退货", na=False)
refund_df = df.loc[mask, ["order_id", "title"]]`,
    keywords: ["str.contains", "字符串过滤", "关键词匹配", "正则"],
    related: ["pd-query", "pd-str-extract", "pd-explode"],
  }),
  createCommand({
    id: "pd-str-extract",
    library: "pandas",
    category: "transform",
    title: "str.extract()",
    alias: "从文本里提取结构字段",
    summary: "用正则从字符串列中拆出订单号、城市代码、版本号等结构信息。",
    syntax: 'df["text"].str.extract(r"order=(\\d+)")',
    code: `df["order_num"] = df["log_text"].str.extract(r"order=(\\d+)")
df["city_code"] = df["address"].str.extract(r"city:([A-Z]{2})")`,
    keywords: ["str.extract", "正则提取", "文本抽取", "regex"],
    related: ["pd-str-contains", "pd-assign", "pd-map"],
  }),
  createCommand({
    id: "pd-get-dummies",
    library: "pandas",
    category: "transform",
    title: "get_dummies()",
    alias: "类别列 one-hot 编码",
    summary: "把分类特征转成 0/1 列，常用于建模前的数据准备。",
    syntax: 'pd.get_dummies(df, columns=["city"], dtype=int)',
    code: `encoded = pd.get_dummies(
    df,
    columns=["city", "channel"],
    dtype=int
)

print(encoded.head())`,
    keywords: ["get_dummies", "one hot", "哑变量", "编码"],
    related: ["pd-cut-qcut", "pd-astype", "np-where"],
  }),
  createCommand({
    id: "pd-to-datetime",
    library: "pandas",
    category: "time",
    title: "to_datetime()",
    alias: "把字符串转成时间",
    summary: "让日期列从字符串升级成可排序、可提取月份、可重采样的时间类型。",
    syntax: 'df["order_date"] = pd.to_datetime(df["order_date"])',
    code: `df["order_date"] = pd.to_datetime(
    df["order_date"],
    errors="coerce"
)

df["month"] = df["order_date"].dt.to_period("M").astype(str)
print(df[["order_date", "month"]].head())`,
    keywords: ["日期", "时间", "datetime", "to_datetime", "时间列"],
    tips: [
      "errors='coerce' 会把非法日期转成 NaT，方便后续排查。",
      "转好后再用 dt 访问器提取年、月、周、小时等信息。",
    ],
    related: ["pd-resample", "pd-shift", "sns-lineplot"],
  }),
  createCommand({
    id: "pd-resample",
    library: "pandas",
    category: "time",
    title: "resample()",
    alias: "按时间粒度重采样",
    summary: "把日数据聚成周、月、季度，适合时间序列报表。",
    syntax: 'df.set_index("order_date").resample("M")["sales"].sum()',
    code: `monthly_sales = (
    df.set_index("order_date")
      .resample("M")["sales"]
      .sum()
      .reset_index()
)

print(monthly_sales.head())`,
    keywords: ["resample", "时间序列", "按月", "按周", "重采样"],
    tips: [
      "先 set_index() 到时间列上，resample() 才会按时间索引工作。",
      "常见频率有 D、W、M、Q、Y。",
    ],
    related: ["pd-to-datetime", "pd-rolling", "sns-lineplot"],
  }),
  createCommand({
    id: "pd-rolling",
    library: "pandas",
    category: "time",
    title: "rolling()",
    alias: "计算滚动窗口指标",
    summary: "适合做 7 日均值、30 日移动平均和滚动波动率等时间窗口指标。",
    syntax: 'df["sales"].rolling(7).mean()',
    code: `df = df.sort_values("order_date")
df["sales_ma_7"] = df["sales"].rolling(7).mean()

print(df[["order_date", "sales", "sales_ma_7"]].tail())`,
    keywords: ["rolling", "移动平均", "滚动窗口", "ma"],
    related: ["pd-resample", "pd-shift", "plt-fill-between"],
  }),
  createCommand({
    id: "pd-shift",
    library: "pandas",
    category: "time",
    title: "shift()",
    alias: "取前一期或后一期值",
    summary: "适合计算环比、同比或识别状态切换前后的记录。",
    syntax: 'df["prev_sales"] = df["sales"].shift(1)',
    code: `df = df.sort_values("order_date")
df["prev_sales"] = df["sales"].shift(1)
df["mom_rate"] = (df["sales"] - df["prev_sales"]) / df["prev_sales"]`,
    keywords: ["shift", "前一期", "lag", "环比", "同比"],
    related: ["pd-rolling", "pd-rank", "sns-lineplot"],
  }),
  createCommand({
    id: "pd-rank",
    library: "pandas",
    category: "group",
    title: "rank()",
    alias: "计算排序名次",
    summary: "可以在整体或分组内给指标排名，用来找 Top N、榜单和分层。",
    syntax: 'df["sales_rank"] = df["sales"].rank(method="dense", ascending=False)',
    code: `df["city_rank"] = (
    df.groupby("city")["sales"]
      .rank(method="dense", ascending=False)
)`,
    keywords: ["rank", "排名", "top n", "dense rank"],
    related: ["pd-sort-values", "pd-groupby-agg", "np-argsort"],
  }),
  createCommand({
    id: "np-array",
    library: "numpy",
    category: "numeric",
    title: "np.array()",
    alias: "创建 ndarray",
    summary: "把列表或嵌套列表转成 NumPy 数组，是多数数值运算的入口。",
    syntax: "arr = np.array([1, 2, 3], dtype=float)",
    code: `import numpy as np

arr = np.array([1, 2, 3, 4], dtype=float)
matrix = np.array([[1, 2], [3, 4]])

print(arr.mean())
print(matrix.shape)`,
    keywords: ["array", "ndarray", "创建数组", "numpy array"],
    tips: [
      "dtype 决定数组元素类型，后续运算行为也会受影响。",
      "ndarray 支持广播和切片，适合大批量数值处理。",
    ],
    related: ["np-zeros-ones", "np-reshape", "np-boolean-mask"],
  }),
  createCommand({
    id: "np-zeros-ones",
    library: "numpy",
    category: "numeric",
    title: "zeros() / ones() / full()",
    alias: "快速创建指定形状数组",
    summary: "适合做占位矩阵、初始化权重或生成固定值模板。",
    syntax: "np.zeros((3, 4))",
    code: `zeros = np.zeros((2, 3))
ones = np.ones((2, 3))
full = np.full((2, 3), fill_value=9)

print(zeros)
print(full)`,
    keywords: ["zeros", "ones", "full", "初始化数组"],
    related: ["np-array", "np-random", "np-reshape"],
  }),
  createCommand({
    id: "np-arange-linspace",
    library: "numpy",
    category: "numeric",
    title: "arange() / linspace()",
    alias: "生成等差序列",
    summary: "快速构造数字区间或等距采样点。",
    syntax: "np.linspace(0, 1, 5)",
    code: `x1 = np.arange(0, 10, 2)
x2 = np.linspace(0, 1, 5)

print(x1)
print(x2)`,
    keywords: ["arange", "linspace", "序列", "等差", "采样点"],
    related: ["np-array", "plt-plot", "sns-lineplot"],
  }),
  createCommand({
    id: "np-random",
    library: "numpy",
    category: "numeric",
    title: "random.default_rng()",
    alias: "生成随机数和抽样数据",
    summary: "适合做模拟数据、随机抽样和可复现实验。",
    syntax: "rng = np.random.default_rng(42)",
    code: `rng = np.random.default_rng(42)

sample = rng.normal(loc=100, scale=15, size=8)
choice = rng.choice(["A", "B", "C"], size=5, replace=True)

print(sample)
print(choice)`,
    keywords: ["random", "随机数", "抽样", "default_rng"],
    related: ["np-zeros-ones", "np-percentile", "plt-hist"],
  }),
  createCommand({
    id: "np-reshape",
    library: "numpy",
    category: "reshape",
    title: "reshape()",
    alias: "调整数组形状",
    summary: "把一维数据改成矩阵或把矩阵摊平，是矩阵计算的基础操作。",
    syntax: "arr.reshape(3, 2)",
    code: `arr = np.arange(6)
matrix = arr.reshape(3, 2)

print(arr)
print(matrix)`,
    keywords: ["reshape", "形状", "矩阵", "展开", "重排"],
    related: ["np-array", "np-vstack-hstack", "np-concatenate"],
  }),
  createCommand({
    id: "np-concatenate",
    library: "numpy",
    category: "reshape",
    title: "concatenate()",
    alias: "按轴拼接数组",
    summary: "把多个数组沿指定轴拼起来，适合批量合并数值块。",
    syntax: "np.concatenate([a, b], axis=0)",
    code: `a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6]])

vertical = np.concatenate([a, b], axis=0)
horizontal = np.concatenate([a, a], axis=1)

print(vertical)
print(horizontal)`,
    keywords: ["concatenate", "拼接数组", "合并矩阵"],
    related: ["np-vstack-hstack", "np-reshape", "pd-concat"],
  }),
  createCommand({
    id: "np-vstack-hstack",
    library: "numpy",
    category: "reshape",
    title: "vstack() / hstack()",
    alias: "纵向或横向堆叠数组",
    summary: "比 concatenate() 更直观，适合快速拼接二维数组。",
    syntax: "np.vstack([a, b])",
    code: `a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.vstack([a, b]))
print(np.hstack([a, b]))`,
    keywords: ["vstack", "hstack", "stack", "堆叠数组"],
    related: ["np-concatenate", "np-reshape", "pd-concat"],
  }),
  createCommand({
    id: "np-where",
    library: "numpy",
    category: "numeric",
    title: "np.where()",
    alias: "向量化条件判断",
    summary: "按条件批量返回两个结果之一，适合高性能字段派生。",
    syntax: 'np.where(arr > 0, "positive", "non-positive")',
    code: `score = np.array([82, 61, 93, 55, 77])
label = np.where(score >= 60, "pass", "fail")

print(label)`,
    keywords: ["where", "条件判断", "if else", "向量化", "标签"],
    tips: [
      "结果数组的形状通常和条件数组一致。",
      "在 pandas 里也常配合 Series/ndarray 一起用。",
    ],
    related: ["np-select", "pd-loc", "pd-map"],
  }),
  createCommand({
    id: "np-select",
    library: "numpy",
    category: "numeric",
    title: "np.select()",
    alias: "处理多分支条件",
    summary: "当条件分支超过两个时，比多层 where() 更清晰。",
    syntax: "np.select([cond1, cond2], [v1, v2], default=v3)",
    code: `score = np.array([95, 76, 62, 48])
label = np.select(
    [score >= 90, score >= 60],
    ["A", "B"],
    default="C"
)

print(label)`,
    keywords: ["select", "多条件", "多分支", "case when"],
    related: ["np-where", "pd-apply", "pd-cut-qcut"],
  }),
  createCommand({
    id: "np-boolean-mask",
    library: "numpy",
    category: "numeric",
    title: "布尔掩码筛选",
    alias: "按条件筛数组",
    summary: "用布尔数组筛选元素，是 NumPy 数组过滤的核心写法。",
    syntax: "arr[arr > 10]",
    code: `arr = np.array([3, 8, 13, 21, 34])
mask = arr > 10

print(mask)
print(arr[mask])`,
    keywords: ["mask", "布尔掩码", "筛选数组", "boolean indexing"],
    related: ["np-where", "pd-loc", "np-mean-axis"],
  }),
  createCommand({
    id: "np-mean-axis",
    library: "numpy",
    category: "numeric",
    title: "mean() / std() 按轴计算",
    alias: "沿指定轴做聚合",
    summary: "对矩阵按行或按列计算均值、标准差等统计量。",
    syntax: "arr.mean(axis=0)",
    code: `arr = np.array([[10, 12, 15], [8, 11, 14]])

print(arr.mean(axis=0))
print(arr.std(axis=1))`,
    keywords: ["axis", "mean", "std", "按列统计", "按行统计"],
    related: ["np-sum-cumsum", "np-nanmean", "np-dot"],
  }),
  createCommand({
    id: "np-nanmean",
    library: "numpy",
    category: "numeric",
    title: "nanmean() / nanmedian()",
    alias: "忽略缺失值做统计",
    summary: "在数组里存在 NaN 时，仍然安全计算均值或中位数。",
    syntax: "np.nanmean(arr)",
    code: `arr = np.array([10, 12, np.nan, 18, 25])

print(np.nanmean(arr))
print(np.nanmedian(arr))`,
    keywords: ["nanmean", "nanmedian", "忽略缺失", "缺失统计"],
    related: ["pd-fillna", "np-mean-axis", "np-percentile"],
  }),
  createCommand({
    id: "np-sum-cumsum",
    library: "numpy",
    category: "numeric",
    title: "sum() / cumsum()",
    alias: "求和与累计求和",
    summary: "适合计算总量、累计销量、累计转化数等简单序列指标。",
    syntax: "arr.cumsum()",
    code: `arr = np.array([5, 7, 3, 9])

print(arr.sum())
print(arr.cumsum())`,
    keywords: ["sum", "cumsum", "累计", "求和"],
    related: ["np-mean-axis", "pd-resample", "plt-plot"],
  }),
  createCommand({
    id: "np-unique",
    library: "numpy",
    category: "numeric",
    title: "np.unique()",
    alias: "取唯一值并统计频次",
    summary: "快速查看数组去重结果，也能顺手拿到每个值出现次数。",
    syntax: "np.unique(arr, return_counts=True)",
    code: `city = np.array(["SH", "BJ", "SH", "GZ", "BJ", "SH"])
values, counts = np.unique(city, return_counts=True)

print(values)
print(counts)`,
    keywords: ["unique", "去重", "频次", "count unique", "类别统计"],
    related: ["pd-nunique", "pd-value-counts", "np-argsort"],
  }),
  createCommand({
    id: "np-argsort",
    library: "numpy",
    category: "numeric",
    title: "argsort()",
    alias: "返回排序后的索引位置",
    summary: "当你想知道元素按大小排序后的原始索引时非常有用。",
    syntax: "np.argsort(arr)",
    code: `arr = np.array([30, 10, 20])
order = np.argsort(arr)

print(order)
print(arr[order])`,
    keywords: ["argsort", "排序索引", "top", "rank"],
    related: ["np-argmax", "pd-rank", "pd-sort-values"],
  }),
  createCommand({
    id: "np-argmax",
    library: "numpy",
    category: "numeric",
    title: "argmax() / argmin()",
    alias: "找到最大值或最小值位置",
    summary: "用来快速定位峰值、最低点或最佳结果的位置。",
    syntax: "np.argmax(arr)",
    code: `arr = np.array([18, 25, 11, 30])

print(np.argmax(arr))
print(np.argmin(arr))`,
    keywords: ["argmax", "argmin", "最大值位置", "最小值位置"],
    related: ["np-argsort", "np-maximum-minimum", "plt-annotate"],
  }),
  createCommand({
    id: "np-percentile",
    library: "numpy",
    category: "numeric",
    title: "percentile() / quantile()",
    alias: "计算分位数",
    summary: "适合看 50%、90%、95% 分位等业务阈值。",
    syntax: "np.percentile(arr, 90)",
    code: `arr = np.array([10, 12, 15, 18, 22, 30, 45])

print(np.percentile(arr, 90))
print(np.quantile(arr, 0.5))`,
    keywords: ["percentile", "quantile", "分位数", "p90", "p95"],
    related: ["pd-describe", "np-nanmean", "sns-boxplot"],
  }),
  createCommand({
    id: "np-log-sqrt",
    library: "numpy",
    category: "numeric",
    title: "log() / sqrt() / exp()",
    alias: "常见数学变换",
    summary: "用于尺度压缩、还原和基础数值变换。",
    syntax: "np.log(arr)",
    code: `arr = np.array([1, 10, 100])

print(np.log(arr))
print(np.sqrt(arr))
print(np.exp([0, 1, 2]))`,
    keywords: ["log", "sqrt", "exp", "数学变换", "尺度压缩"],
    related: ["np-clip", "plt-hist", "sns-kdeplot"],
  }),
  createCommand({
    id: "np-dot",
    library: "numpy",
    category: "numeric",
    title: "dot() / matmul()",
    alias: "向量点积与矩阵乘法",
    summary: "适合基础线性代数、权重求和和二维矩阵计算。",
    syntax: "np.dot(a, b)",
    code: `a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.dot(a, b))
print(np.matmul([[1, 2]], [[3], [4]]))`,
    keywords: ["dot", "matmul", "矩阵乘法", "点积"],
    related: ["np-reshape", "np-mean-axis", "np-corrcoef"],
  }),
  createCommand({
    id: "np-corrcoef",
    library: "numpy",
    category: "numeric",
    title: "corrcoef()",
    alias: "计算相关系数矩阵",
    summary: "快速衡量多个变量之间的线性相关程度。",
    syntax: "np.corrcoef(x, y)",
    code: `x = np.array([10, 20, 30, 40])
y = np.array([12, 19, 33, 38])

print(np.corrcoef(x, y))`,
    keywords: ["corrcoef", "相关系数", "correlation"],
    related: ["sns-heatmap", "sns-scatterplot", "np-dot"],
  }),
  createCommand({
    id: "np-maximum-minimum",
    library: "numpy",
    category: "numeric",
    title: "maximum() / minimum()",
    alias: "逐元素比较两个数组",
    summary: "当你要按位取更大值或更小值时，比循环更直接。",
    syntax: "np.maximum(a, b)",
    code: `a = np.array([3, 8, 10])
b = np.array([5, 6, 12])

print(np.maximum(a, b))
print(np.minimum(a, b))`,
    keywords: ["maximum", "minimum", "逐元素比较", "max by element"],
    related: ["np-clip", "np-argmax", "np-where"],
  }),
  createCommand({
    id: "np-clip",
    library: "numpy",
    category: "numeric",
    title: "clip()",
    alias: "截断数值范围",
    summary: "把极端值压到上下界之内，适合做简单异常值收缩。",
    syntax: "np.clip(arr, 0, 100)",
    code: `score = np.array([-5, 23, 88, 130])
bounded = np.clip(score, 0, 100)

print(bounded)`,
    keywords: ["clip", "截断", "边界", "异常值"],
    related: ["np-maximum-minimum", "np-log-sqrt", "plt-hist"],
  }),
  createCommand({
    id: "sns-lineplot",
    library: "seaborn",
    category: "plot",
    title: "sns.lineplot()",
    alias: "画折线图",
    summary: "适合展示趋势，尤其是时间序列或分组趋势。",
    syntax: 'sns.lineplot(data=df, x="month", y="sales", hue="city")',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")
sns.lineplot(data=df, x="month", y="sales", hue="city", marker="o")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()`,
    keywords: ["lineplot", "折线图", "趋势图", "time series"],
    tips: [
      "长表结构更适合 seaborn 直接按 hue 分组画线。",
      "时间字段最好先排序，不然折线顺序会乱。",
    ],
    related: ["pd-resample", "pd-melt", "plt-plot"],
  }),
  createCommand({
    id: "sns-scatterplot",
    library: "seaborn",
    category: "plot",
    title: "sns.scatterplot()",
    alias: "画散点图",
    summary: "观察两个变量之间的关系，也能用 hue 和 size 带出更多维度。",
    syntax: 'sns.scatterplot(data=df, x="sales", y="profit", hue="region")',
    code: `sns.scatterplot(
    data=df,
    x="sales",
    y="profit",
    hue="region",
    size="discount"
)
plt.tight_layout()
plt.show()`,
    keywords: ["scatterplot", "散点图", "相关性", "关系图"],
    related: ["sns-regplot", "plt-scatter", "np-corrcoef"],
  }),
  createCommand({
    id: "sns-barplot",
    library: "seaborn",
    category: "plot",
    title: "sns.barplot()",
    alias: "画分组柱状图",
    summary: "适合比较不同类别的汇总值，也能显示分组对比。",
    syntax: 'sns.barplot(data=df, x="city", y="sales", hue="channel")',
    code: `order = (
    df.groupby("city", as_index=False)["sales"]
      .sum()
      .sort_values("sales", ascending=False)["city"]
)

sns.barplot(data=df, x="city", y="sales", hue="channel", order=order)
plt.xticks(rotation=30)
plt.tight_layout()
plt.show()`,
    keywords: ["barplot", "柱状图", "分类比较", "group bar"],
    related: ["pd-groupby-agg", "pd-melt", "plt-bar"],
  }),
  createCommand({
    id: "sns-boxplot",
    library: "seaborn",
    category: "plot",
    title: "sns.boxplot()",
    alias: "画箱线图",
    summary: "快速比较不同分组的分布、中位数和异常值。",
    syntax: 'sns.boxplot(data=df, x="channel", y="sales")',
    code: `sns.boxplot(data=df, x="channel", y="sales")
plt.tight_layout()
plt.show()`,
    keywords: ["boxplot", "箱线图", "异常值", "分布比较"],
    related: ["sns-violinplot", "plt-hist", "np-clip"],
  }),
  createCommand({
    id: "sns-heatmap",
    library: "seaborn",
    category: "plot",
    title: "sns.heatmap()",
    alias: "画热力图",
    summary: "适合显示矩阵大小，例如透视表、相关系数矩阵。",
    syntax: 'sns.heatmap(pivot, annot=True, fmt=".0f", cmap="YlGnBu")',
    code: `pivot = df.pivot_table(
    index="city",
    columns="month",
    values="sales",
    aggfunc="sum",
    fill_value=0
)

sns.heatmap(pivot, annot=True, fmt=".0f", cmap="YlGnBu")
plt.tight_layout()
plt.show()`,
    keywords: ["heatmap", "热力图", "矩阵", "相关系数", "透视图"],
    related: ["pd-pivot-table", "pd-crosstab", "np-corrcoef"],
  }),
  createCommand({
    id: "sns-histplot",
    library: "seaborn",
    category: "plot",
    title: "sns.histplot()",
    alias: "画直方图或叠加 KDE",
    summary: "适合看单变量分布，也可以方便地叠加密度曲线。",
    syntax: 'sns.histplot(data=df, x="sales", kde=True)',
    code: `sns.histplot(data=df, x="sales", bins=20, kde=True)
plt.tight_layout()
plt.show()`,
    keywords: ["histplot", "直方图", "分布图", "kde"],
    related: ["sns-kdeplot", "plt-hist", "np-log-sqrt"],
  }),
  createCommand({
    id: "sns-kdeplot",
    library: "seaborn",
    category: "plot",
    title: "sns.kdeplot()",
    alias: "画核密度曲线",
    summary: "更平滑地展示分布轮廓，适合对比分组分布。",
    syntax: 'sns.kdeplot(data=df, x="sales", hue="channel")',
    code: `sns.kdeplot(data=df, x="sales", hue="channel", fill=True)
plt.tight_layout()
plt.show()`,
    keywords: ["kdeplot", "密度曲线", "分布轮廓"],
    related: ["sns-histplot", "sns-boxplot", "plt-hist"],
  }),
  createCommand({
    id: "sns-countplot",
    library: "seaborn",
    category: "plot",
    title: "sns.countplot()",
    alias: "画类别计数图",
    summary: "当原始数据尚未预聚合时，用 countplot 能直接统计类别频数。",
    syntax: 'sns.countplot(data=df, x="city")',
    code: `sns.countplot(data=df, x="city", order=df["city"].value_counts().index)
plt.xticks(rotation=30)
plt.tight_layout()
plt.show()`,
    keywords: ["countplot", "类别频数", "计数图"],
    related: ["pd-value-counts", "sns-barplot", "plt-bar"],
  }),
  createCommand({
    id: "sns-violinplot",
    library: "seaborn",
    category: "plot",
    title: "sns.violinplot()",
    alias: "画小提琴图",
    summary: "同时展示分布形状和密度，比箱线图更强调数据形态。",
    syntax: 'sns.violinplot(data=df, x="channel", y="sales")',
    code: `sns.violinplot(data=df, x="channel", y="sales", inner="quartile")
plt.tight_layout()
plt.show()`,
    keywords: ["violinplot", "小提琴图", "分布形状"],
    related: ["sns-boxplot", "sns-kdeplot", "plt-hist"],
  }),
  createCommand({
    id: "sns-pairplot",
    library: "seaborn",
    category: "plot",
    title: "sns.pairplot()",
    alias: "批量查看变量两两关系",
    summary: "探索性分析时快速扫一遍多个数值变量的关系和分布。",
    syntax: 'sns.pairplot(df[["sales", "profit", "cost"]])',
    code: `pair_df = df[["sales", "profit", "cost", "channel"]]
sns.pairplot(pair_df, hue="channel")
plt.show()`,
    keywords: ["pairplot", "成对图", "多变量关系", "eda"],
    related: ["sns-scatterplot", "sns-jointplot", "np-corrcoef"],
  }),
  createCommand({
    id: "sns-relplot",
    library: "seaborn",
    category: "plot",
    title: "sns.relplot()",
    alias: "用 Facet 快速做关系图矩阵",
    summary: "当你想按列或行拆分多个子图时，比单次 scatterplot 更省力。",
    syntax: 'sns.relplot(data=df, x="sales", y="profit", col="channel")',
    code: `sns.relplot(
    data=df,
    x="sales",
    y="profit",
    hue="city",
    col="channel"
)
plt.show()`,
    keywords: ["relplot", "facet", "分面关系图"],
    related: ["sns-scatterplot", "sns-catplot", "plt-subplots"],
  }),
  createCommand({
    id: "sns-catplot",
    library: "seaborn",
    category: "plot",
    title: "sns.catplot()",
    alias: "分面类别图",
    summary: "把柱状图、箱线图等类别图和 Facet 组合起来，适合多维对比。",
    syntax: 'sns.catplot(data=df, kind="bar", x="city", y="sales", col="channel")',
    code: `sns.catplot(
    data=df,
    kind="bar",
    x="city",
    y="sales",
    col="channel",
    height=4,
    aspect=1.1
)
plt.show()`,
    keywords: ["catplot", "分面类别图", "facet bar", "kind=bar"],
    related: ["sns-barplot", "sns-boxplot", "sns-relplot"],
  }),
  createCommand({
    id: "sns-regplot",
    library: "seaborn",
    category: "plot",
    title: "sns.regplot()",
    alias: "散点图加回归趋势线",
    summary: "快速判断两个变量的线性关系和趋势方向。",
    syntax: 'sns.regplot(data=df, x="sales", y="profit")',
    code: `sns.regplot(data=df, x="sales", y="profit", scatter_kws={"alpha": 0.6})
plt.tight_layout()
plt.show()`,
    keywords: ["regplot", "回归线", "趋势线", "线性关系"],
    related: ["sns-scatterplot", "sns-jointplot", "np-corrcoef"],
  }),
  createCommand({
    id: "sns-jointplot",
    library: "seaborn",
    category: "plot",
    title: "sns.jointplot()",
    alias: "联合查看散点和边缘分布",
    summary: "同时展示两个变量的关系和各自分布，适合快速看相关性。",
    syntax: 'sns.jointplot(data=df, x="sales", y="profit", kind="scatter")',
    code: `sns.jointplot(
    data=df,
    x="sales",
    y="profit",
    kind="hex"
)
plt.show()`,
    keywords: ["jointplot", "联合分布", "边缘分布", "hex"],
    related: ["sns-scatterplot", "sns-pairplot", "sns-regplot"],
  }),
  createCommand({
    id: "plt-subplots",
    library: "matplotlib",
    category: "plot",
    title: "plt.subplots()",
    alias: "创建画布和子图",
    summary: "先拿到 fig 和 ax，再在指定坐标轴上画图，是 matplotlib 最稳的写法。",
    syntax: "fig, ax = plt.subplots(figsize=(8, 4))",
    code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(1, 2, figsize=(10, 4))
ax[0].plot([1, 2, 3], [3, 5, 4])
ax[1].bar(["A", "B", "C"], [5, 2, 7])

fig.tight_layout()
plt.show()`,
    keywords: ["subplots", "画布", "子图", "fig ax", "subplot"],
    tips: [
      "复杂图表尽量使用 ax.plot() 这种对象式风格。",
      "tight_layout() 能减少标题和坐标轴挤压。",
    ],
    related: ["plt-figure", "plt-grid-legend", "sns-relplot"],
  }),
  createCommand({
    id: "plt-figure",
    library: "matplotlib",
    category: "plot",
    title: "plt.figure()",
    alias: "快速创建单张画布",
    summary: "当你只需要一张简单图表时，用 figure() 起手最直接。",
    syntax: "plt.figure(figsize=(8, 4))",
    code: `plt.figure(figsize=(8, 4), dpi=120)
plt.plot([1, 2, 3], [2, 4, 3])
plt.show()`,
    keywords: ["figure", "画布尺寸", "dpi"],
    related: ["plt-subplots", "plt-savefig", "plt-style-use"],
  }),
  createCommand({
    id: "plt-plot",
    library: "matplotlib",
    category: "plot",
    title: "plt.plot()",
    alias: "基础折线图",
    summary: "最基础的折线绘图方式，适合快速画趋势。",
    syntax: 'plt.plot(x, y, marker="o", linewidth=2)',
    code: `x = [1, 2, 3, 4]
y = [12, 18, 15, 22]

plt.figure(figsize=(7, 4))
plt.plot(x, y, marker="o", linewidth=2)
plt.title("Monthly Sales")
plt.xlabel("Month")
plt.ylabel("Sales")
plt.tight_layout()
plt.show()`,
    keywords: ["plot", "折线图", "line chart", "基础绘图"],
    related: ["sns-lineplot", "plt-fill-between", "np-arange-linspace"],
  }),
  createCommand({
    id: "plt-bar",
    library: "matplotlib",
    category: "plot",
    title: "plt.bar()",
    alias: "基础柱状图",
    summary: "直接按类别和数值画柱状图，适合快速出图。",
    syntax: 'plt.bar(categories, values, color="#1f6f78")',
    code: `categories = ["A", "B", "C", "D"]
values = [30, 18, 27, 42]

plt.figure(figsize=(7, 4))
plt.bar(categories, values, color="#1f6f78")
plt.title("Category Sales")
plt.tight_layout()
plt.show()`,
    keywords: ["bar", "柱状图", "category chart"],
    related: ["sns-barplot", "plt-barh", "plt-ticks-rotate"],
  }),
  createCommand({
    id: "plt-barh",
    library: "matplotlib",
    category: "plot",
    title: "plt.barh()",
    alias: "横向柱状图",
    summary: "当分类标签较长时，横向柱状图通常比竖向更易读。",
    syntax: "plt.barh(categories, values)",
    code: `categories = ["North China", "East China", "South China"]
values = [18, 27, 21]

plt.figure(figsize=(7, 4))
plt.barh(categories, values, color="#b9793e")
plt.tight_layout()
plt.show()`,
    keywords: ["barh", "横向柱状图", "horizontal bar"],
    related: ["plt-bar", "sns-barplot", "plt-annotate"],
  }),
  createCommand({
    id: "plt-scatter",
    library: "matplotlib",
    category: "plot",
    title: "plt.scatter()",
    alias: "基础散点图",
    summary: "适合快速查看两个变量的关系和分布。",
    syntax: 'plt.scatter(x, y, alpha=0.7)',
    code: `x = [10, 20, 30, 40, 50]
y = [15, 18, 36, 39, 52]

plt.figure(figsize=(7, 4))
plt.scatter(x, y, s=80, alpha=0.7, color="#b9793e")
plt.xlabel("Sales")
plt.ylabel("Profit")
plt.tight_layout()
plt.show()`,
    keywords: ["scatter", "散点图", "关系图", "matplotlib scatter"],
    related: ["sns-scatterplot", "sns-regplot", "plt-annotate"],
  }),
  createCommand({
    id: "plt-hist",
    library: "matplotlib",
    category: "plot",
    title: "plt.hist()",
    alias: "画直方图",
    summary: "查看单变量分布、偏态和集中区间时非常方便。",
    syntax: "plt.hist(values, bins=20)",
    code: `values = [12, 15, 18, 20, 21, 22, 25, 27, 29, 35, 42]

plt.figure(figsize=(7, 4))
plt.hist(values, bins=6, color="#1f6f78", edgecolor="white")
plt.title("Sales Distribution")
plt.tight_layout()
plt.show()`,
    keywords: ["hist", "直方图", "分布", "histogram"],
    related: ["sns-histplot", "sns-kdeplot", "np-percentile"],
  }),
  createCommand({
    id: "plt-pie",
    library: "matplotlib",
    category: "plot",
    title: "plt.pie()",
    alias: "饼图",
    summary: "适合展示占比关系，但最好只在分类数量较少时使用。",
    syntax: 'plt.pie(values, labels=labels, autopct="%1.1f%%")',
    code: `labels = ["A", "B", "C"]
values = [45, 30, 25]

plt.figure(figsize=(5, 5))
plt.pie(values, labels=labels, autopct="%1.1f%%", startangle=90)
plt.show()`,
    keywords: ["pie", "饼图", "占比图"],
    related: ["plt-bar", "sns-barplot", "plt-savefig"],
  }),
  createCommand({
    id: "plt-imshow",
    library: "matplotlib",
    category: "plot",
    title: "plt.imshow()",
    alias: "显示矩阵或图像",
    summary: "适合显示二维数组、像素矩阵或自定义热力图底图。",
    syntax: 'plt.imshow(matrix, cmap="viridis")',
    code: `matrix = [[1, 3, 2], [4, 6, 5], [7, 9, 8]]

plt.figure(figsize=(5, 4))
plt.imshow(matrix, cmap="viridis")
plt.colorbar()
plt.show()`,
    keywords: ["imshow", "矩阵显示", "图像", "二维数组"],
    related: ["sns-heatmap", "plt-subplots", "plt-savefig"],
  }),
  createCommand({
    id: "plt-axhline-axvline",
    library: "matplotlib",
    category: "plot",
    title: "axhline() / axvline()",
    alias: "添加水平或垂直参考线",
    summary: "常用来标记目标线、平均线、阈值线和事件时间点。",
    syntax: "plt.axhline(y=100, linestyle='--')",
    code: `plt.figure(figsize=(7, 4))
plt.plot([1, 2, 3, 4], [80, 120, 90, 140])
plt.axhline(y=100, color="red", linestyle="--")
plt.axvline(x=2, color="gray", linestyle=":")
plt.tight_layout()
plt.show()`,
    keywords: ["axhline", "axvline", "参考线", "阈值线"],
    related: ["plt-annotate", "sns-lineplot", "plt-plot"],
  }),
  createCommand({
    id: "plt-fill-between",
    library: "matplotlib",
    category: "plot",
    title: "plt.fill_between()",
    alias: "填充两条线之间的区域",
    summary: "很适合表现区间带、置信区间、上下界或累计面积感。",
    syntax: "plt.fill_between(x, lower, upper, alpha=0.2)",
    code: `x = [1, 2, 3, 4]
lower = [10, 12, 13, 15]
upper = [14, 18, 17, 21]

plt.figure(figsize=(7, 4))
plt.fill_between(x, lower, upper, alpha=0.25, color="#1f6f78")
plt.plot(x, lower, color="#1f6f78")
plt.plot(x, upper, color="#1f6f78")
plt.tight_layout()
plt.show()`,
    keywords: ["fill_between", "置信区间", "区间带", "面积填充"],
    related: ["plt-plot", "sns-lineplot", "plt-errorbar"],
  }),
  createCommand({
    id: "plt-errorbar",
    library: "matplotlib",
    category: "plot",
    title: "plt.errorbar()",
    alias: "带误差线的图",
    summary: "适合展示均值加波动范围、实验误差或上下限。",
    syntax: "plt.errorbar(x, y, yerr=err, fmt='o-')",
    code: `x = [1, 2, 3]
y = [20, 25, 22]
err = [2, 1.5, 3]

plt.figure(figsize=(7, 4))
plt.errorbar(x, y, yerr=err, fmt="o-", capsize=4)
plt.tight_layout()
plt.show()`,
    keywords: ["errorbar", "误差线", "上下限", "波动范围"],
    related: ["plt-fill-between", "sns-lineplot", "plt-plot"],
  }),
  createCommand({
    id: "plt-annotate",
    library: "matplotlib",
    category: "plot",
    title: "plt.annotate()",
    alias: "给图上关键点加注释",
    summary: "标出峰值、异常点或重要事件时非常直观。",
    syntax: 'plt.annotate("peak", xy=(x, y), xytext=(...))',
    code: `x = [1, 2, 3, 4]
y = [10, 18, 12, 25]

plt.figure(figsize=(7, 4))
plt.plot(x, y, marker="o")
plt.annotate("peak", xy=(4, 25), xytext=(3.4, 27))
plt.tight_layout()
plt.show()`,
    keywords: ["annotate", "标注", "图上注释", "peak"],
    related: ["plt-axhline-axvline", "plt-barh", "plt-scatter"],
  }),
  createCommand({
    id: "plt-grid-legend",
    library: "matplotlib",
    category: "plot",
    title: "grid() / legend()",
    alias: "增加网格线和图例",
    summary: "让多系列图更易读，也是报表图常见的最后润色步骤。",
    syntax: "plt.grid(True); plt.legend()",
    code: `plt.figure(figsize=(7, 4))
plt.plot([1, 2, 3], [10, 15, 12], label="sales")
plt.plot([1, 2, 3], [8, 11, 9], label="profit")
plt.grid(True, linestyle="--", alpha=0.3)
plt.legend()
plt.show()`,
    keywords: ["grid", "legend", "图例", "网格线"],
    related: ["plt-subplots", "plt-style-use", "sns-lineplot"],
  }),
  createCommand({
    id: "plt-ticks-rotate",
    library: "matplotlib",
    category: "plot",
    title: "xticks() / tick_params()",
    alias: "调整坐标轴标签显示",
    summary: "当日期或长标签挤在一起时，旋转和缩小刻度标签会很有帮助。",
    syntax: "plt.xticks(rotation=45)",
    code: `plt.figure(figsize=(7, 4))
plt.bar(["2026-01", "2026-02", "2026-03"], [10, 14, 18])
plt.xticks(rotation=45)
plt.tick_params(axis="x", labelsize=9)
plt.tight_layout()
plt.show()`,
    keywords: ["xticks", "tick_params", "标签旋转", "坐标轴"],
    related: ["plt-bar", "plt-plot", "sns-lineplot"],
  }),
  createCommand({
    id: "plt-style-use",
    library: "matplotlib",
    category: "plot",
    title: "plt.style.use()",
    alias: "切换绘图风格",
    summary: "快速改变默认视觉风格，适合统一一批图表的基础观感。",
    syntax: 'plt.style.use("ggplot")',
    code: `import matplotlib.pyplot as plt

plt.style.use("ggplot")
plt.figure(figsize=(7, 4))
plt.plot([1, 2, 3], [2, 5, 4])
plt.show()`,
    keywords: ["style.use", "图表风格", "ggplot", "theme"],
    related: ["plt-figure", "sns-lineplot", "plt-grid-legend"],
  }),
  createCommand({
    id: "plt-savefig",
    library: "matplotlib",
    category: "plot",
    title: "plt.savefig()",
    alias: "保存图像文件",
    summary: "把图表导出成 PNG、PDF 或 SVG，适合汇报和文档复用。",
    syntax: 'plt.savefig("chart.png", dpi=150, bbox_inches="tight")',
    code: `plt.figure(figsize=(7, 4))
plt.plot([1, 2, 3], [5, 7, 6])
plt.tight_layout()
plt.savefig("chart.png", dpi=150, bbox_inches="tight")`,
    keywords: ["savefig", "保存图片", "导出图表", "png", "pdf"],
    related: ["pd-to-excel-csv", "plt-figure", "sns-pairplot"],
  }),
  createCommand({
    id: "pd-iloc",
    library: "pandas",
    category: "filter",
    title: "iloc[]",
    alias: "按位置取行列",
    summary: "当你更关心第几行第几列，而不是标签名时，iloc[] 会更直接。",
    syntax: "df.iloc[0:5, 0:3]",
    code: `subset = df.iloc[0:5, 0:3]
single_value = df.iloc[2, 1]

print(subset)
print(single_value)`,
    keywords: ["iloc", "按位置", "第几行", "第几列", "位置索引"],
    related: ["pd-loc", "pd-head", "pd-sample"],
  }),
  createCommand({
    id: "pd-isin",
    library: "pandas",
    category: "filter",
    title: "isin()",
    alias: "按列表批量筛选",
    summary: "当条件是一组候选值时，比连写多个等号更清晰。",
    syntax: 'df[df["city"].isin(["Shanghai", "Beijing"])]',
    code: `target = df[df["city"].isin(["Shanghai", "Beijing"])]

print(target[["order_id", "city"]].head())`,
    keywords: ["isin", "列表筛选", "in 条件", "批量匹配"],
    related: ["pd-between", "pd-query", "pd-loc"],
  }),
  createCommand({
    id: "pd-between",
    library: "pandas",
    category: "filter",
    title: "between()",
    alias: "按区间筛选数值",
    summary: "用于筛选某列在某个区间内的记录，适合价格、日期和分数范围过滤。",
    syntax: 'df[df["sales"].between(100, 500)]',
    code: `mid_sales = df[df["sales"].between(100, 500, inclusive="both")]

print(mid_sales[["order_id", "sales"]].head())`,
    keywords: ["between", "区间过滤", "范围筛选", "数值区间"],
    related: ["pd-isin", "pd-query", "pd-cut-qcut"],
  }),
  createCommand({
    id: "pd-notna",
    library: "pandas",
    category: "filter",
    title: "notna() / isna()",
    alias: "按是否缺失筛选",
    summary: "快速拿到非空记录或仅缺失记录，适合排查坏数据。",
    syntax: 'df[df["score"].notna()]',
    code: `valid_rows = df[df["score"].notna()]
missing_rows = df[df["score"].isna()]

print(valid_rows.head())
print(missing_rows.head())`,
    keywords: ["notna", "isna", "非空筛选", "缺失筛选"],
    related: ["pd-fillna", "pd-isna-sum", "pd-query"],
  }),
  createCommand({
    id: "pd-duplicated",
    library: "pandas",
    category: "clean",
    title: "duplicated()",
    alias: "标记重复记录",
    summary: "在真正删除前，先找出哪些行被视为重复，有助于确认去重逻辑。",
    syntax: 'df[df.duplicated(subset=["user_id"], keep=False)]',
    code: `dup_rows = df[df.duplicated(subset=["user_id"], keep=False)]

print(dup_rows.sort_values("user_id"))`,
    keywords: ["duplicated", "重复标记", "重复行", "查重"],
    related: ["pd-drop-duplicates", "pd-sort-values", "pd-groupby-agg"],
  }),
  createCommand({
    id: "pd-drop",
    library: "pandas",
    category: "clean",
    title: "drop()",
    alias: "删除列或指定行",
    summary: "适合去掉无用字段、测试列或明确不需要的记录。",
    syntax: 'df.drop(columns=["temp_col"])',
    code: `trimmed = df.drop(columns=["temp_col", "remark"])
without_row = df.drop(index=[0, 3])

print(trimmed.head())
print(without_row.head())`,
    keywords: ["drop", "删除列", "删除行", "去掉字段"],
    related: ["pd-rename", "pd-drop-duplicates", "pd-set-reset-index"],
  }),
  createCommand({
    id: "pd-sample",
    library: "pandas",
    category: "inspect",
    title: "sample()",
    alias: "随机抽样查看数据",
    summary: "相比只看前几行，随机抽样更容易发现分布和脏数据问题。",
    syntax: "df.sample(5, random_state=42)",
    code: `print(df.sample(5, random_state=42))
print(df.sample(frac=0.1, random_state=42).shape)`,
    keywords: ["sample", "随机抽样", "抽样查看"],
    related: ["pd-head", "pd-value-counts", "np-random"],
  }),
  createCommand({
    id: "pd-to-numeric",
    library: "pandas",
    category: "clean",
    title: "to_numeric()",
    alias: "把文本转成数值",
    summary: "当数值列被读成字符串时，用它稳妥地转回数值类型。",
    syntax: 'pd.to_numeric(df["sales"], errors="coerce")',
    code: `df["sales"] = pd.to_numeric(df["sales"], errors="coerce")
df["qty"] = pd.to_numeric(df["qty"], downcast="integer")

print(df.dtypes)`,
    keywords: ["to_numeric", "文本转数字", "errors coerce", "数值类型"],
    related: ["pd-astype", "pd-fillna", "pd-clip-round"],
  }),
  createCommand({
    id: "pd-where-mask",
    library: "pandas",
    category: "transform",
    title: "where() / mask()",
    alias: "条件保留或条件替换",
    summary: "可以在不写复杂 apply 的情况下，对不满足条件的值做替换或置空。",
    syntax: 'df["sales"].where(df["sales"] > 0, 0)',
    code: `df["clean_sales"] = df["sales"].where(df["sales"] > 0, 0)
df["flagged_profit"] = df["profit"].mask(df["profit"] < 0, other=None)

print(df[["sales", "clean_sales", "profit", "flagged_profit"]].head())`,
    keywords: ["where", "mask", "条件替换", "条件保留"],
    related: ["np-where", "pd-assign", "pd-fillna"],
  }),
  createCommand({
    id: "pd-clip-round",
    library: "pandas",
    category: "transform",
    title: "clip() / round()",
    alias: "裁剪边界并控制小数位",
    summary: "常用于处理异常极值，以及把计算结果整理成更适合展示的格式。",
    syntax: 'df["rate"].clip(0, 1).round(2)',
    code: `df["discount"] = df["discount"].clip(0, 1)
df["margin"] = df["margin"].round(2)

print(df[["discount", "margin"]].head())`,
    keywords: ["clip", "round", "裁剪边界", "保留小数"],
    related: ["np-clip", "pd-to-numeric", "plt-hist"],
  }),
  createCommand({
    id: "pd-groupby-transform",
    library: "pandas",
    category: "group",
    title: "groupby().transform()",
    alias: "按组回填聚合结果",
    summary: "当你想保留原表行数，同时附上一列组内均值、占比或排名时特别好用。",
    syntax: 'df.groupby("city")["sales"].transform("mean")',
    code: `df["city_avg_sales"] = (
    df.groupby("city")["sales"]
      .transform("mean")
)

df["sales_share"] = df["sales"] / df.groupby("city")["sales"].transform("sum")

print(df.head())`,
    keywords: ["transform", "回填聚合", "组内均值", "组内占比"],
    related: ["pd-groupby-agg", "pd-rank", "pd-groupby-filter"],
  }),
  createCommand({
    id: "pd-groupby-filter",
    library: "pandas",
    category: "group",
    title: "groupby().filter()",
    alias: "按组条件过滤",
    summary: "保留满足某个组级条件的整组数据，例如只保留订单数大于 10 的城市。",
    syntax: 'df.groupby("city").filter(lambda x: len(x) >= 10)',
    code: `active_city_df = df.groupby("city").filter(
    lambda x: x["order_id"].nunique() >= 10
)

print(active_city_df["city"].value_counts())`,
    keywords: ["groupby filter", "按组过滤", "保留整组"],
    related: ["pd-groupby-transform", "pd-groupby-agg", "pd-query"],
  }),
  createCommand({
    id: "pd-join",
    library: "pandas",
    category: "join",
    title: "join()",
    alias: "按索引拼接表",
    summary: "当两个表的连接键已经在索引上时，join() 往往比 merge() 更顺手。",
    syntax: 'left.join(right, how="left")',
    code: `left = orders.set_index("user_id")
right = users.set_index("user_id")

joined = left.join(right, how="left")
print(joined.head())`,
    keywords: ["join", "按索引连接", "index join"],
    related: ["pd-merge", "pd-set-reset-index", "pd-concat"],
  }),
  createCommand({
    id: "pd-unstack-stack",
    library: "pandas",
    category: "reshape",
    title: "stack() / unstack()",
    alias: "在行列层级之间切换",
    summary: "适合多级索引结果在长宽结构间切换，尤其是 groupby 后的结果整理。",
    syntax: 'grouped.unstack()',
    code: `grouped = df.groupby(["city", "channel"])["sales"].sum()
wide = grouped.unstack(fill_value=0)
long_back = wide.stack().reset_index(name="sales")

print(wide)
print(long_back.head())`,
    keywords: ["stack", "unstack", "多级索引", "长宽切换"],
    related: ["pd-pivot-table", "pd-melt", "pd-groupby-agg"],
  }),
  createCommand({
    id: "pd-pct-change-diff",
    library: "pandas",
    category: "time",
    title: "pct_change() / diff()",
    alias: "计算变化量和变化率",
    summary: "适合计算环比、日差值或某个序列的增长变化。",
    syntax: 'df["sales"].pct_change()',
    code: `df = df.sort_values("order_date")
df["sales_diff"] = df["sales"].diff()
df["sales_pct_change"] = df["sales"].pct_change()

print(df[["order_date", "sales", "sales_diff", "sales_pct_change"]].tail())`,
    keywords: ["pct_change", "diff", "变化率", "变化量", "环比"],
    related: ["pd-shift", "pd-rolling", "sns-lineplot"],
  }),
  createCommand({
    id: "pd-dt-accessor",
    library: "pandas",
    category: "time",
    title: ".dt 访问器",
    alias: "提取日期的年、月、周、星期",
    summary: "时间列转成 datetime 后，可以快速提取常用的日期维度。",
    syntax: 'df["order_date"].dt.month',
    code: `df["year"] = df["order_date"].dt.year
df["month"] = df["order_date"].dt.month
df["weekday"] = df["order_date"].dt.day_name()

print(df[["order_date", "year", "month", "weekday"]].head())`,
    keywords: ["dt", "year", "month", "weekday", "时间维度"],
    related: ["pd-to-datetime", "pd-resample", "pd-assign"],
  }),
  createCommand({
    id: "pd-str-strip-lower",
    library: "pandas",
    category: "transform",
    title: "str.strip() / str.lower()",
    alias: "清理文本前后空格和大小写",
    summary: "文本字段预处理时非常常见，适合清理用户输入和脏标签。",
    syntax: 'df["city"].str.strip().str.lower()',
    code: `df["city_clean"] = (
    df["city"]
      .str.strip()
      .str.lower()
)

print(df[["city", "city_clean"]].head())`,
    keywords: ["strip", "lower", "文本清洗", "大小写", "空格处理"],
    related: ["pd-str-contains", "pd-replace", "pd-map"],
  }),
  createCommand({
    id: "pd-pipe",
    library: "pandas",
    category: "transform",
    title: "pipe()",
    alias: "把自定义函数接进方法链",
    summary: "当处理逻辑已经写成函数时，用 pipe() 可以保持链式风格不散开。",
    syntax: "df.pipe(my_func)",
    code: `def keep_positive_sales(frame):
    return frame[frame["sales"] > 0]

result = (
    df.pipe(keep_positive_sales)
      .assign(sales_tax=lambda x: x["sales"] * 1.06)
)

print(result.head())`,
    keywords: ["pipe", "方法链", "自定义函数", "chain"],
    related: ["pd-assign", "pd-query", "pd-groupby-agg"],
  }),
  createCommand({
    id: "pd-cumsum-cumcount",
    library: "pandas",
    category: "group",
    title: "cumsum() / cumcount()",
    alias: "累计求和和组内顺序编号",
    summary: "适合做累计销量、组内序号和事件发生次序分析。",
    syntax: 'df.groupby("city")["sales"].cumsum()',
    code: `df = df.sort_values(["city", "order_date"])
df["city_running_sales"] = df.groupby("city")["sales"].cumsum()
df["city_order_seq"] = df.groupby("city").cumcount() + 1

print(df.head())`,
    keywords: ["cumsum", "cumcount", "累计", "组内编号", "running total"],
    related: ["pd-groupby-transform", "pd-rank", "pd-pct-change-diff"],
  }),
  createCommand({
    id: "np-isnan-isfinite",
    library: "numpy",
    category: "numeric",
    title: "isnan() / isfinite()",
    alias: "检测 NaN 和无穷值",
    summary: "适合在数值数组里排查无效值、无穷值和异常输入。",
    syntax: "np.isnan(arr)",
    code: `arr = np.array([1, np.nan, np.inf, -np.inf, 5])

print(np.isnan(arr))
print(np.isfinite(arr))`,
    keywords: ["isnan", "isfinite", "无效值", "inf", "nan 检测"],
    related: ["np-nanmean", "np-nan-to-num", "pd-isna-sum"],
  }),
  createCommand({
    id: "np-sort",
    library: "numpy",
    category: "numeric",
    title: "sort()",
    alias: "对数组排序",
    summary: "快速得到排序后的数组视图，也可按轴排序二维数组。",
    syntax: "np.sort(arr)",
    code: `arr = np.array([8, 2, 5, 1])
matrix = np.array([[3, 1], [4, 2]])

print(np.sort(arr))
print(np.sort(matrix, axis=1))`,
    keywords: ["sort", "排序数组", "array sort"],
    related: ["np-argsort", "pd-sort-values", "np-unique"],
  }),
  createCommand({
    id: "np-transpose",
    library: "numpy",
    category: "reshape",
    title: "transpose() / T",
    alias: "转置矩阵",
    summary: "把行列维度互换，是矩阵计算和展示时非常常见的动作。",
    syntax: "arr.T",
    code: `arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.T)
print(np.transpose(arr))`,
    keywords: ["transpose", "T", "转置", "矩阵变换"],
    related: ["np-reshape", "np-dot", "pd-pivot"],
  }),
  createCommand({
    id: "np-repeat-tile",
    library: "numpy",
    category: "reshape",
    title: "repeat() / tile()",
    alias: "重复元素或平铺数组",
    summary: "适合造测试数据、扩展模式序列或构造重复模板。",
    syntax: "np.repeat(arr, 2)",
    code: `arr = np.array([1, 2, 3])

print(np.repeat(arr, 2))
print(np.tile(arr, 3))`,
    keywords: ["repeat", "tile", "重复数组", "平铺"],
    related: ["np-concatenate", "np-vstack-hstack", "np-zeros-ones"],
  }),
  createCommand({
    id: "np-nan-to-num",
    library: "numpy",
    category: "numeric",
    title: "nan_to_num()",
    alias: "把 NaN 和无穷值替换成数值",
    summary: "在模型或数值计算前，快速把 NaN、inf 清洗成可计算的值。",
    syntax: "np.nan_to_num(arr, nan=0.0)",
    code: `arr = np.array([1, np.nan, np.inf, -np.inf])
clean = np.nan_to_num(arr, nan=0.0, posinf=999, neginf=-999)

print(clean)`,
    keywords: ["nan_to_num", "替换 nan", "替换 inf", "清洗数值"],
    related: ["np-isnan-isfinite", "np-nanmean", "pd-fillna"],
  }),
  createCommand({
    id: "np-histogram",
    library: "numpy",
    category: "numeric",
    title: "histogram()",
    alias: "统计分箱频数",
    summary: "在不画图的情况下，先得到每个区间的计数结果。",
    syntax: "np.histogram(arr, bins=5)",
    code: `arr = np.array([12, 15, 18, 20, 21, 25, 27, 32])
counts, bins = np.histogram(arr, bins=4)

print(counts)
print(bins)`,
    keywords: ["histogram", "分箱计数", "bins", "频数"],
    related: ["plt-hist", "sns-histplot", "np-percentile"],
  }),
  createCommand({
    id: "np-logical-ops",
    library: "numpy",
    category: "numeric",
    title: "logical_and() / logical_or()",
    alias: "组合多个布尔条件",
    summary: "当条件本身就是数组时，用逻辑函数组合会更稳定。",
    syntax: "np.logical_and(a > 0, a < 10)",
    code: `arr = np.array([3, 8, 12, 15])
mask = np.logical_and(arr > 5, arr < 14)

print(mask)
print(arr[mask])`,
    keywords: ["logical_and", "logical_or", "布尔条件组合"],
    related: ["np-boolean-mask", "np-where", "pd-loc"],
  }),
  createCommand({
    id: "sns-displot",
    library: "seaborn",
    category: "plot",
    title: "sns.displot()",
    alias: "分布图与分面分布图",
    summary: "适合同时查看分布和分组结构，尤其是想按列拆开看时。",
    syntax: 'sns.displot(data=df, x="sales", col="channel")',
    code: `sns.displot(
    data=df,
    x="sales",
    col="channel",
    kde=True,
    height=4,
    aspect=1.1
)
plt.show()`,
    keywords: ["displot", "分布图", "facet distribution", "分面分布"],
    related: ["sns-histplot", "sns-kdeplot", "sns-catplot"],
  }),
  createCommand({
    id: "sns-stripplot",
    library: "seaborn",
    category: "plot",
    title: "sns.stripplot()",
    alias: "分类散点图",
    summary: "适合在类别轴上直接展示原始样本点，便于观察离散和密度。",
    syntax: 'sns.stripplot(data=df, x="channel", y="sales")',
    code: `sns.stripplot(
    data=df,
    x="channel",
    y="sales",
    jitter=True,
    alpha=0.6
)
plt.tight_layout()
plt.show()`,
    keywords: ["stripplot", "分类散点", "jitter", "原始点"],
    related: ["sns-swarmplot", "sns-boxplot", "plt-scatter"],
  }),
  createCommand({
    id: "sns-swarmplot",
    library: "seaborn",
    category: "plot",
    title: "sns.swarmplot()",
    alias: "避免重叠的分类散点图",
    summary: "比 stripplot 更强调避免点位重叠，适合中小样本分类分布展示。",
    syntax: 'sns.swarmplot(data=df, x="channel", y="sales")',
    code: `sns.swarmplot(data=df, x="channel", y="sales", size=4)
plt.tight_layout()
plt.show()`,
    keywords: ["swarmplot", "不重叠散点", "分类点图"],
    related: ["sns-stripplot", "sns-boxplot", "sns-violinplot"],
  }),
  createCommand({
    id: "sns-set-theme",
    library: "seaborn",
    category: "plot",
    title: "sns.set_theme()",
    alias: "设置全局绘图主题",
    summary: "在整段绘图代码前设置统一风格，能让多张图的观感保持一致。",
    syntax: 'sns.set_theme(style="whitegrid", palette="deep")',
    code: `import seaborn as sns

sns.set_theme(style="whitegrid", palette="deep", font_scale=1.0)`,
    keywords: ["set_theme", "主题", "风格", "palette"],
    related: ["plt-style-use", "sns-lineplot", "sns-barplot"],
  }),
  createCommand({
    id: "sns-clustermap",
    library: "seaborn",
    category: "plot",
    title: "sns.clustermap()",
    alias: "带聚类排序的热力图",
    summary: "适合在相关矩阵或特征矩阵里同时看数值和相似性结构。",
    syntax: 'sns.clustermap(matrix, cmap="viridis")',
    code: `corr = df[["sales", "profit", "cost", "discount"]].corr()
sns.clustermap(corr, annot=True, cmap="vlag")
plt.show()`,
    keywords: ["clustermap", "聚类热力图", "相似性", "cluster"],
    related: ["sns-heatmap", "np-corrcoef", "plt-imshow"],
  }),
  createCommand({
    id: "plt-boxplot",
    library: "matplotlib",
    category: "plot",
    title: "plt.boxplot()",
    alias: "基础箱线图",
    summary: "不借助 seaborn，也能快速查看分布、中位数和异常值。",
    syntax: "plt.boxplot(values)",
    code: `values = [12, 14, 15, 18, 19, 22, 28, 40]

plt.figure(figsize=(6, 4))
plt.boxplot(values)
plt.tight_layout()
plt.show()`,
    keywords: ["boxplot", "箱线图", "distribution"],
    related: ["sns-boxplot", "plt-hist", "np-percentile"],
  }),
  createCommand({
    id: "plt-colorbar",
    library: "matplotlib",
    category: "plot",
    title: "plt.colorbar()",
    alias: "为颜色映射添加色标",
    summary: "当图表颜色本身承载数值含义时，colorbar() 能补上解释尺度。",
    syntax: "plt.colorbar()",
    code: `matrix = [[1, 2, 3], [4, 5, 6]]

plt.figure(figsize=(5, 4))
plt.imshow(matrix, cmap="viridis")
plt.colorbar()
plt.show()`,
    keywords: ["colorbar", "色标", "颜色刻度", "heatmap legend"],
    related: ["plt-imshow", "sns-heatmap", "plt-savefig"],
  }),
  createCommand({
    id: "plt-xlim-ylim",
    library: "matplotlib",
    category: "plot",
    title: "xlim() / ylim()",
    alias: "限制坐标轴范围",
    summary: "适合放大某段区间，或强制多张图使用一致的显示范围。",
    syntax: "plt.xlim(0, 10)",
    code: `plt.figure(figsize=(7, 4))
plt.plot([1, 2, 3, 4], [10, 18, 12, 25])
plt.xlim(1, 4)
plt.ylim(8, 28)
plt.tight_layout()
plt.show()`,
    keywords: ["xlim", "ylim", "坐标范围", "缩放区间"],
    related: ["plt-plot", "plt-axhline-axvline", "plt-ticks-rotate"],
  }),
  createCommand({
    id: "plt-twinx",
    library: "matplotlib",
    category: "plot",
    title: "twinx()",
    alias: "双 y 轴图",
    summary: "当两个指标量纲不同，但又想放在同一张图里观察趋势时很常见。",
    syntax: "ax2 = ax1.twinx()",
    code: `fig, ax1 = plt.subplots(figsize=(7, 4))
ax1.plot([1, 2, 3], [100, 120, 110], color="#1f6f78")
ax2 = ax1.twinx()
ax2.plot([1, 2, 3], [0.12, 0.18, 0.16], color="#b9793e")

fig.tight_layout()
plt.show()`,
    keywords: ["twinx", "双轴", "双 y 轴", "secondary axis"],
    related: ["plt-subplots", "plt-plot", "sns-lineplot"],
  }),
  createCommand({
    id: "plt-text",
    library: "matplotlib",
    category: "plot",
    title: "plt.text()",
    alias: "在图中写说明文字",
    summary: "适合补充简短注释、说明区间或直接显示关键数字。",
    syntax: 'plt.text(x, y, "note")',
    code: `plt.figure(figsize=(7, 4))
plt.plot([1, 2, 3], [12, 18, 15])
plt.text(2, 18.5, "campaign launch")
plt.tight_layout()
plt.show()`,
    keywords: ["text", "图内文字", "label", "注释文字"],
    related: ["plt-annotate", "plt-axhline-axvline", "plt-scatter"],
  }),
  createCommand({
    id: "plt-stackplot",
    library: "matplotlib",
    category: "plot",
    title: "plt.stackplot()",
    alias: "堆叠面积图",
    summary: "适合展示多个组成部分随时间变化的累计结构。",
    syntax: "plt.stackplot(x, y1, y2, y3)",
    code: `x = [1, 2, 3, 4]
a = [3, 4, 4, 5]
b = [2, 2, 3, 4]
c = [1, 2, 2, 3]

plt.figure(figsize=(7, 4))
plt.stackplot(x, a, b, c, labels=["A", "B", "C"])
plt.legend()
plt.tight_layout()
plt.show()`,
    keywords: ["stackplot", "堆叠面积图", "组成变化"],
    related: ["plt-fill-between", "plt-plot", "sns-lineplot"],
  }),
  createCommand({
    id: "pd-read-json",
    library: "pandas",
    category: "io",
    title: "read_json()",
    alias: "读取 JSON / JSON Lines",
    summary: "适合处理接口返回、日志落盘或嵌套结构较轻的 JSON 数据源。",
    syntax: 'pd.read_json("events.json", lines=True)',
    code: `import pandas as pd

events = pd.read_json("events.json", lines=True)
print(events.head())`,
    keywords: ["json", "json lines", "读取接口结果", "读取日志"],
    related: ["pd-read-csv", "pd-json-normalize", "pd-head"],
  }),
  createCommand({
    id: "pd-read-parquet",
    library: "pandas",
    category: "io",
    title: "read_parquet()",
    alias: "读取 Parquet 文件",
    summary: "适合分析型数据仓库导出的列式文件，读取速度和列裁剪能力都更好。",
    syntax: 'pd.read_parquet("sales.parquet", columns=["order_id", "sales"])',
    code: `import pandas as pd

sales = pd.read_parquet(
    "sales.parquet",
    columns=["order_id", "order_date", "sales"]
)
print(sales.head())`,
    keywords: ["parquet", "列式文件", "仓库导出", "读取 parquet"],
    related: ["pd-read-csv", "pd-read-excel", "pd-to-excel-csv"],
  }),
  createCommand({
    id: "pd-json-normalize",
    library: "pandas",
    category: "transform",
    title: "json_normalize()",
    alias: "展开嵌套 JSON 结构",
    summary: "把嵌套字典或列表结构摊平成表格列，适合接口响应和事件日志解析。",
    syntax: 'pd.json_normalize(data, record_path="items", meta=["order_id"])',
    code: `import pandas as pd

payload = [
    {
        "order_id": 101,
        "customer": "A",
        "items": [{"sku": "s1", "qty": 2}, {"sku": "s2", "qty": 1}],
    }
]

items = pd.json_normalize(payload, record_path="items", meta=["order_id", "customer"])
print(items)`,
    keywords: ["json normalize", "嵌套 json", "展开接口数据", "record_path"],
    related: ["pd-read-json", "pd-explode", "pd-melt"],
  }),
  createCommand({
    id: "pd-merge-asof",
    library: "pandas",
    category: "join",
    title: "merge_asof()",
    alias: "按最近时间点连接",
    summary: "适合成交数据对齐最近报价、事件数据对齐最近状态等时间邻近型连接。",
    syntax: 'pd.merge_asof(trades, quotes, on="ts", by="symbol")',
    code: `trades = trades.sort_values("ts")
quotes = quotes.sort_values("ts")

aligned = pd.merge_asof(
    trades,
    quotes,
    on="ts",
    by="symbol",
    direction="backward"
)

print(aligned.head())`,
    keywords: ["merge_asof", "最近时间连接", "时序对齐", "quote trade"],
    related: ["pd-merge", "pd-merge-ordered", "pd-to-datetime"],
  }),
  createCommand({
    id: "pd-merge-ordered",
    library: "pandas",
    category: "join",
    title: "merge_ordered()",
    alias: "有序连接并保留时间顺序",
    summary: "适合把两个都带时间顺序的数据源按键对齐，并沿时间补齐缺口。",
    syntax: 'pd.merge_ordered(left, right, on="date", fill_method="ffill")',
    code: `timeline = pd.merge_ordered(
    sales,
    budget,
    on="date",
    fill_method="ffill"
)

print(timeline.head())`,
    keywords: ["merge ordered", "有序连接", "时间对齐", "ffill join"],
    related: ["pd-merge", "pd-merge-asof", "pd-resample"],
  }),
  createCommand({
    id: "pd-interpolate",
    library: "pandas",
    category: "clean",
    title: "interpolate()",
    alias: "插值填补缺失值",
    summary: "适合时间序列或连续数值字段的平滑补值，比常量补值更保留趋势。",
    syntax: 'df["sales"] = df["sales"].interpolate(method="linear")',
    code: `df = df.sort_values("order_date")
df["sales"] = df["sales"].interpolate(method="linear")

print(df.head())`,
    keywords: ["interpolate", "插值", "线性补值", "时间序列补值"],
    related: ["pd-fillna", "pd-rolling", "pd-to-datetime"],
  }),
  createCommand({
    id: "pd-reindex",
    library: "pandas",
    category: "reshape",
    title: "reindex()",
    alias: "按目标索引重排和补齐",
    summary: "适合对齐标准日期索引、补全缺失分类，或把结果重排成既定顺序。",
    syntax: 'df.reindex(index=target_index, fill_value=0)',
    code: `target_months = ["2026-01", "2026-02", "2026-03", "2026-04"]
report = report.reindex(target_months, fill_value=0)

print(report)`,
    keywords: ["reindex", "补齐索引", "重排", "对齐标准顺序"],
    related: ["pd-set-reset-index", "pd-resample", "pd-sort-values"],
  }),
  createCommand({
    id: "pd-eval",
    library: "pandas",
    category: "transform",
    title: "eval()",
    alias: "用表达式批量计算字段",
    summary: "适合把多列运算写成紧凑表达式，尤其在字段较多时可提升可读性。",
    syntax: 'df.eval("profit = sales - cost")',
    code: `df = df.eval(
    "profit = sales - cost"
).eval(
    "margin = profit / sales"
)

print(df.head())`,
    keywords: ["eval", "表达式计算", "profit", "字段公式"],
    related: ["pd-assign", "pd-query", "pd-map"],
  }),
  createCommand({
    id: "pd-insert",
    library: "pandas",
    category: "transform",
    title: "insert()",
    alias: "按指定位置插入新列",
    summary: "适合需要控制列顺序的报表整理或导出前字段编排。",
    syntax: 'df.insert(1, "profit", df["sales"] - df["cost"])',
    code: `df.insert(
    1,
    "profit",
    df["sales"] - df["cost"]
)

print(df.head())`,
    keywords: ["insert", "插入新列", "控制列顺序", "报表整理"],
    related: ["pd-assign", "pd-rename", "pd-to-excel-csv"],
  }),
  createCommand({
    id: "pd-wide-to-long",
    library: "pandas",
    category: "reshape",
    title: "wide_to_long()",
    alias: "按前缀把宽表转成长表",
    summary: "适合季度、月份或多指标列带编号前缀的数据结构重整。",
    syntax: 'pd.wide_to_long(df, stubnames=["sales"], i="store", j="month", sep="_")',
    code: `long_df = pd.wide_to_long(
    df,
    stubnames=["sales", "cost"],
    i="store",
    j="month",
    sep="_"
).reset_index()

print(long_df.head())`,
    keywords: ["wide_to_long", "宽转长", "stubnames", "月份列展开"],
    related: ["pd-melt", "pd-pivot", "pd-unstack-stack"],
  }),
  createCommand({
    id: "np-stack",
    library: "numpy",
    category: "reshape",
    title: "np.stack()",
    alias: "沿新轴堆叠数组",
    summary: "适合把多组同形状数组合成更高维结构，例如批量样本或多通道数据。",
    syntax: "np.stack([a, b, c], axis=0)",
    code: `import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

stacked = np.stack([a, b], axis=0)
print(stacked)`,
    keywords: ["stack", "新轴堆叠", "多维数组", "axis"],
    related: ["np-concatenate", "np-vstack-hstack", "np-reshape"],
  }),
  createCommand({
    id: "np-column-stack",
    library: "numpy",
    category: "reshape",
    title: "np.column_stack()",
    alias: "按列拼接一维数组",
    summary: "适合把多个同长度向量快速组织成二维特征矩阵。",
    syntax: "np.column_stack([x1, x2, x3])",
    code: `import numpy as np

city_id = np.array([1, 2, 3])
sales = np.array([120, 150, 170])

matrix = np.column_stack([city_id, sales])
print(matrix)`,
    keywords: ["column_stack", "按列拼接", "特征矩阵", "二维数组"],
    related: ["np-stack", "np-vstack-hstack", "np-concatenate"],
  }),
  createCommand({
    id: "np-split-array-split",
    library: "numpy",
    category: "reshape",
    title: "split() / array_split()",
    alias: "把数组拆成多段",
    summary: "适合批处理、交叉验证切片或把长向量拆成固定块。",
    syntax: "np.array_split(arr, 3)",
    code: `import numpy as np

arr = np.arange(10)
parts = np.array_split(arr, 3)

for part in parts:
    print(part)`,
    keywords: ["split", "array_split", "拆分数组", "批处理"],
    related: ["np-stack", "np-repeat-tile", "np-reshape"],
  }),
  createCommand({
    id: "np-pad",
    library: "numpy",
    category: "numeric",
    title: "np.pad()",
    alias: "给数组补边界",
    summary: "适合卷积前补边、时间窗扩展或对齐不同长度数组。",
    syntax: 'np.pad(arr, pad_width=1, mode="constant", constant_values=0)',
    code: `import numpy as np

arr = np.array([3, 5, 8])
padded = np.pad(arr, pad_width=2, mode="constant", constant_values=0)

print(padded)`,
    keywords: ["pad", "补边界", "constant", "reflect"],
    related: ["np-repeat-tile", "np-reshape", "np-stack"],
  }),
  createCommand({
    id: "np-bincount",
    library: "numpy",
    category: "numeric",
    title: "np.bincount()",
    alias: "统计非负整数频数",
    summary: "适合类别编码后的快速计数，比通用聚合更轻量。",
    syntax: "np.bincount(labels)",
    code: `import numpy as np

labels = np.array([0, 1, 1, 2, 2, 2])
counts = np.bincount(labels)

print(counts)`,
    keywords: ["bincount", "频数统计", "整数类别", "count labels"],
    related: ["np-unique", "np-histogram", "np-any-all"],
  }),
  createCommand({
    id: "np-any-all",
    library: "numpy",
    category: "numeric",
    title: "np.any() / np.all()",
    alias: "检查条件是否任意满足或全部满足",
    summary: "适合做质量校验、约束检查和布尔矩阵汇总。",
    syntax: "np.all(arr > 0)",
    code: `import numpy as np

arr = np.array([3, 6, 9, 12])
print(np.any(arr > 10))
print(np.all(arr > 0))`,
    keywords: ["any", "all", "条件校验", "布尔汇总"],
    related: ["np-logical-ops", "np-where", "np-isnan-isfinite"],
  }),
  createCommand({
    id: "sns-lmplot",
    library: "seaborn",
    category: "plot",
    title: "sns.lmplot()",
    alias: "散点加回归趋势线",
    summary: "适合快速观察两个变量之间的大致线性关系和分组趋势。",
    syntax: 'sns.lmplot(data=df, x="ad_cost", y="sales", hue="channel")',
    code: `import seaborn as sns

sns.lmplot(
    data=df,
    x="ad_cost",
    y="sales",
    hue="channel",
    height=4,
    aspect=1.3
)`,
    keywords: ["lmplot", "回归线", "线性关系", "scatter trend"],
    related: ["sns-regplot", "sns-scatterplot", "sns-relplot"],
  }),
  createCommand({
    id: "sns-ecdfplot",
    library: "seaborn",
    category: "plot",
    title: "sns.ecdfplot()",
    alias: "经验累计分布图",
    summary: "适合比较不同分组的分布差异，不依赖分箱边界设置。",
    syntax: 'sns.ecdfplot(data=df, x="sales", hue="channel")',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

sns.ecdfplot(data=df, x="sales", hue="channel")
plt.tight_layout()
plt.show()`,
    keywords: ["ecdfplot", "累计分布", "分布比较", "cdf"],
    related: ["sns-histplot", "sns-kdeplot", "sns-displot"],
  }),
  createCommand({
    id: "sns-facetgrid",
    library: "seaborn",
    category: "plot",
    title: "sns.FacetGrid()",
    alias: "按维度拆分多个小图",
    summary: "适合按城市、渠道或实验组拆成多个面板做同尺度对比。",
    syntax: 'sns.FacetGrid(df, col="channel", row="region")',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

grid = sns.FacetGrid(df, col="channel", col_wrap=2, height=3.2)
grid.map_dataframe(sns.histplot, x="sales", bins=20)
grid.fig.tight_layout()`,
    keywords: ["facetgrid", "分面", "多个小图", "col row"],
    related: ["sns-relplot", "sns-catplot", "plt-subplots"],
  }),
  createCommand({
    id: "sns-despine",
    library: "seaborn",
    category: "plot",
    title: "sns.despine()",
    alias: "去掉图表边框线",
    summary: "适合做更干净的报告风格图表，尤其是横向条形图和简洁折线图。",
    syntax: "sns.despine(top=True, right=True)",
    code: `import seaborn as sns
import matplotlib.pyplot as plt

sns.barplot(data=df, x="city", y="sales")
sns.despine(top=True, right=True)
plt.tight_layout()
plt.show()`,
    keywords: ["despine", "去边框", "简洁风格", "report chart"],
    related: ["sns-set-theme", "plt-style-use", "plt-grid-legend"],
  }),
  createCommand({
    id: "plt-subplot-mosaic",
    library: "matplotlib",
    category: "plot",
    title: "plt.subplot_mosaic()",
    alias: "用命名布局管理子图",
    summary: "适合仪表板式布局，比单纯 nrows / ncols 更适合不规则版式。",
    syntax: 'fig, axes = plt.subplot_mosaic([["trend", "share"], ["trend", "dist"]])',
    code: `import matplotlib.pyplot as plt

fig, axes = plt.subplot_mosaic(
    [["trend", "share"], ["trend", "dist"]],
    figsize=(8, 5)
)

axes["trend"].plot([1, 2, 3], [12, 16, 15])
axes["share"].bar(["A", "B"], [60, 40])
axes["dist"].hist([12, 13, 15, 16, 18], bins=4)

fig.tight_layout()`,
    keywords: ["subplot mosaic", "命名子图", "不规则布局", "dashboard"],
    related: ["plt-subplots", "plt-figure", "sns-facetgrid"],
  }),
  createCommand({
    id: "plt-axspan",
    library: "matplotlib",
    category: "plot",
    title: "axvspan() / axhspan()",
    alias: "高亮一个区间带",
    summary: "适合标记活动期、预警区间、正常范围或实验窗口。",
    syntax: 'plt.axvspan("2026-01", "2026-02", alpha=0.2)',
    code: `import matplotlib.pyplot as plt

plt.figure(figsize=(7, 4))
plt.plot([1, 2, 3, 4], [10, 15, 13, 20])
plt.axvspan(2, 3, color="#1f6f78", alpha=0.18)
plt.tight_layout()
plt.show()`,
    keywords: ["axvspan", "axhspan", "高亮区间", "活动期"],
    related: ["plt-axhline-axvline", "plt-fill-between", "plt-annotate"],
  }),
  createCommand({
    id: "plt-contourf",
    library: "matplotlib",
    category: "plot",
    title: "plt.contourf()",
    alias: "填充等高线图",
    summary: "适合展示二维数值面、概率密度或实验参数网格的连续变化。",
    syntax: "plt.contourf(X, Y, Z, levels=12, cmap='viridis')",
    code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 3, 60)
y = np.linspace(-3, 3, 60)
X, Y = np.meshgrid(x, y)
Z = np.sin(X) * np.cos(Y)

plt.figure(figsize=(6, 4))
plt.contourf(X, Y, Z, levels=12, cmap="viridis")
plt.colorbar()
plt.tight_layout()
plt.show()`,
    keywords: ["contourf", "等高线", "二维数值面", "meshgrid"],
    related: ["plt-imshow", "plt-colorbar", "sns-heatmap"],
  }),
  createCommand({
    id: "plt-step",
    library: "matplotlib",
    category: "plot",
    title: "plt.step()",
    alias: "阶梯图",
    summary: "适合库存、价格档位或状态切换这类分段常值过程。",
    syntax: 'plt.step(x, y, where="post")',
    code: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [10, 10, 14, 14, 18]

plt.figure(figsize=(7, 4))
plt.step(x, y, where="post")
plt.tight_layout()
plt.show()`,
    keywords: ["step", "阶梯图", "分段常值", "where post"],
    related: ["plt-plot", "plt-stackplot", "sns-lineplot"],
  }),
  createCommand({
    id: "plt-stem",
    library: "matplotlib",
    category: "plot",
    title: "plt.stem()",
    alias: "杆状离散图",
    summary: "适合强调离散点的数值高度，比如频谱、残差或按序号的离散指标。",
    syntax: "plt.stem(x, y)",
    code: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [3, 7, 4, 9]

plt.figure(figsize=(7, 4))
plt.stem(x, y)
plt.tight_layout()
plt.show()`,
    keywords: ["stem", "杆状图", "离散点", "频谱"],
    related: ["plt-bar", "plt-scatter", "plt-step"],
  }),
  createCommand({
    id: "plt-secondary-axis",
    library: "matplotlib",
    category: "plot",
    title: "secondary_xaxis() / secondary_yaxis()",
    alias: "添加换算后的第二坐标轴",
    summary: "适合温度单位换算、汇率换算或同一指标的双度量展示。",
    syntax: "ax.secondary_yaxis('right', functions=(fwd, inv))",
    code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(7, 4))
ax.plot([0, 10, 20, 30], [32, 50, 68, 86])
ax.set_ylabel("Fahrenheit")

ax.secondary_yaxis(
    "right",
    functions=(lambda f: (f - 32) * 5 / 9, lambda c: c * 9 / 5 + 32)
).set_ylabel("Celsius")

fig.tight_layout()`,
    keywords: ["secondary axis", "第二坐标轴", "单位换算", "temperature"],
    related: ["plt-twinx", "plt-xlim-ylim", "plt-subplots"],
  }),
  createCommand({
    id: "np-meshgrid",
    library: "numpy",
    category: "reshape",
    title: "np.meshgrid()",
    alias: "生成二维网格坐标",
    summary: "适合构造曲面图、等高线图、热力图或二维函数评估的坐标网格。",
    syntax: 'X, Y = np.meshgrid(x, y, indexing="xy")',
    code: `import numpy as np

x = np.linspace(-2, 2, 5)
y = np.linspace(-1, 1, 4)
X, Y = np.meshgrid(x, y, indexing="xy")

print(X.shape, Y.shape)`,
    keywords: ["meshgrid", "网格坐标", "二维函数", "contour"],
    related: ["np-reshape", "plt-contourf", "plt-quiver"],
  }),
  createCommand({
    id: "np-einsum",
    library: "numpy",
    category: "numeric",
    title: "np.einsum()",
    alias: "用爱因斯坦求和表达复杂运算",
    summary: "适合表达矩阵乘法、加权求和、批量内积等多维运算，写法紧凑但需要看清维度。",
    syntax: 'np.einsum("ij,jk->ik", A, B)',
    code: `import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

result = np.einsum("ij,jk->ik", A, B)
print(result)`,
    keywords: ["einsum", "张量运算", "矩阵乘法", "高维求和"],
    related: ["np-dot", "np-linalg-solve", "np-transpose"],
  }),
  createCommand({
    id: "np-linalg-solve",
    library: "numpy",
    category: "numeric",
    title: "np.linalg.solve()",
    alias: "求解线性方程组",
    summary: "适合解 Ax=b 这类线性方程组，比手写矩阵逆更稳定。",
    syntax: "np.linalg.solve(A, b)",
    code: `import numpy as np

A = np.array([[3, 1], [1, 2]], dtype=float)
b = np.array([9, 8], dtype=float)

solution = np.linalg.solve(A, b)
print(solution)`,
    keywords: ["linalg solve", "线性方程组", "Ax=b", "矩阵求解"],
    related: ["np-dot", "np-linalg-norm", "sp-optimize-root"],
  }),
  createCommand({
    id: "np-linalg-norm",
    library: "numpy",
    category: "numeric",
    title: "np.linalg.norm()",
    alias: "计算向量或矩阵范数",
    summary: "适合衡量向量长度、误差规模或矩阵强度，是优化和数值分析中的常见基础量。",
    syntax: "np.linalg.norm(arr, ord=2)",
    code: `import numpy as np

arr = np.array([3, 4, 12], dtype=float)
print(np.linalg.norm(arr, ord=2))
print(np.linalg.norm(arr, ord=1))`,
    keywords: ["norm", "范数", "向量长度", "误差大小"],
    related: ["np-linalg-solve", "np-mean-axis", "sp-optimize-minimize"],
  }),
  createCommand({
    id: "np-diff-gradient",
    library: "numpy",
    category: "numeric",
    title: "np.diff() / np.gradient()",
    alias: "做差分或近似梯度",
    summary: "适合观察变化量、斜率趋势和序列局部变化速度。",
    syntax: "np.gradient(values)",
    code: `import numpy as np

values = np.array([10, 13, 15, 18, 24], dtype=float)

print(np.diff(values))
print(np.gradient(values))`,
    keywords: ["diff", "gradient", "差分", "变化率"],
    related: ["np-sum-cumsum", "pd-pct-change-diff", "sp-signal-savgol"],
  }),
  createCommand({
    id: "np-searchsorted",
    library: "numpy",
    category: "numeric",
    title: "np.searchsorted()",
    alias: "在有序数组中找插入位置",
    summary: "适合做阈值定位、分段映射或查找一个值应该落在排序数组的哪里。",
    syntax: 'np.searchsorted(sorted_values, 5.5, side="left")',
    code: `import numpy as np

sorted_values = np.array([1, 3, 5, 7, 9])
index = np.searchsorted(sorted_values, 5.5, side="left")

print(index)`,
    keywords: ["searchsorted", "插入位置", "有序数组", "定位区间"],
    related: ["np-sort", "np-digitize", "pd-cut-qcut"],
  }),
  createCommand({
    id: "np-digitize",
    library: "numpy",
    category: "numeric",
    title: "np.digitize()",
    alias: "按箱边界把值映射到区间编号",
    summary: "适合快速把连续数值映射成评分档位或风险区间编号。",
    syntax: "np.digitize(values, bins=[0, 60, 80, 100])",
    code: `import numpy as np

values = np.array([35, 67, 82, 95])
labels = np.digitize(values, bins=[0, 60, 80, 100])

print(labels)`,
    keywords: ["digitize", "分箱编号", "区间映射", "风险分段"],
    related: ["np-searchsorted", "pd-cut-qcut", "np-where"],
  }),
  createCommand({
    id: "np-isclose-allclose",
    library: "numpy",
    category: "numeric",
    title: "np.isclose() / np.allclose()",
    alias: "比较浮点数是否足够接近",
    summary: "适合做数值回归测试、结果核对和浮点误差容忍比较。",
    syntax: "np.allclose(a, b, rtol=1e-5, atol=1e-8)",
    code: `import numpy as np

a = np.array([0.1 + 0.2, 0.3])
b = np.array([0.3, 0.3])

print(np.isclose(a, b))
print(np.allclose(a, b))`,
    keywords: ["isclose", "allclose", "浮点比较", "容忍误差"],
    related: ["np-maximum-minimum", "np-clip", "sp-special-expit"],
  }),
  createCommand({
    id: "np-cov",
    library: "numpy",
    category: "numeric",
    title: "np.cov()",
    alias: "计算协方差矩阵",
    summary: "适合快速查看多个变量之间的联合波动关系，为 PCA 或风险分析做准备。",
    syntax: "np.cov(matrix, rowvar=False)",
    code: `import numpy as np

matrix = np.array([
    [120, 20],
    [130, 25],
    [128, 23],
    [140, 27],
], dtype=float)

cov = np.cov(matrix, rowvar=False)
print(cov)`,
    keywords: ["cov", "协方差矩阵", "联合波动", "risk"],
    related: ["np-corrcoef", "np-mean-axis", "sp-stats-pearsonr"],
  }),
  createCommand({
    id: "np-take",
    library: "numpy",
    category: "reshape",
    title: "np.take()",
    alias: "按索引位置批量提取元素",
    summary: "适合沿指定轴快速抓取若干位置的数据，比手写切片更适合动态索引。",
    syntax: "np.take(arr, [0, 2, 4], axis=0)",
    code: `import numpy as np

arr = np.array([[10, 11], [20, 21], [30, 31], [40, 41], [50, 51]])
picked = np.take(arr, [0, 2, 4], axis=0)

print(picked)`,
    keywords: ["take", "按索引取值", "动态切片", "axis"],
    related: ["np-reshape", "np-transpose", "pd-iloc"],
  }),
  createCommand({
    id: "sns-pointplot",
    library: "seaborn",
    category: "plot",
    title: "sns.pointplot()",
    alias: "点估计图",
    summary: "适合比较不同类别上的均值或其它聚合统计，同时显示误差范围。",
    syntax: 'sns.pointplot(data=df, x="month", y="sales", hue="channel")',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

sns.pointplot(data=df, x="month", y="sales", hue="channel")
plt.tight_layout()
plt.show()`,
    keywords: ["pointplot", "点估计图", "误差线", "类别均值"],
    related: ["sns-lineplot", "sns-barplot", "plt-errorbar"],
  }),
  createCommand({
    id: "sns-boxenplot",
    library: "seaborn",
    category: "plot",
    title: "sns.boxenplot()",
    alias: "增强型箱线图",
    summary: "在样本量较大时比普通箱线图更能展示尾部和分位结构。",
    syntax: 'sns.boxenplot(data=df, x="channel", y="sales")',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

sns.boxenplot(data=df, x="channel", y="sales")
plt.tight_layout()
plt.show()`,
    keywords: ["boxenplot", "增强箱线图", "大样本分布", "分位结构"],
    related: ["sns-boxplot", "sns-violinplot", "plt-violinplot"],
  }),
  createCommand({
    id: "sns-residplot",
    library: "seaborn",
    category: "plot",
    title: "sns.residplot()",
    alias: "残差图",
    summary: "适合检查线性关系拟合后残差是否存在结构、异方差或异常模式。",
    syntax: 'sns.residplot(data=df, x="ad_cost", y="sales")',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

sns.residplot(data=df, x="ad_cost", y="sales", lowess=True)
plt.tight_layout()
plt.show()`,
    keywords: ["residplot", "残差图", "拟合诊断", "heteroscedasticity"],
    related: ["sns-regplot", "sns-lmplot", "sp-stats-linregress"],
  }),
  createCommand({
    id: "sns-rugplot",
    library: "seaborn",
    category: "plot",
    title: "sns.rugplot()",
    alias: "地毯线图",
    summary: "适合在分布图边缘补充原始样本落点，帮助判断密度图是否掩盖了离散结构。",
    syntax: 'sns.rugplot(data=df, x="sales")',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

sns.histplot(data=df, x="sales", bins=20, stat="density")
sns.rugplot(data=df, x="sales", height=0.06)
plt.tight_layout()
plt.show()`,
    keywords: ["rugplot", "地毯线", "原始落点", "distribution"],
    related: ["sns-histplot", "sns-kdeplot", "sns-ecdfplot"],
  }),
  createCommand({
    id: "sns-pairgrid",
    library: "seaborn",
    category: "plot",
    title: "sns.PairGrid()",
    alias: "自定义成对变量网格",
    summary: "适合比 pairplot 更灵活地指定对角线、上三角和下三角使用不同图形。",
    syntax: 'sns.PairGrid(df, vars=["sales", "profit"], hue="channel")',
    code: `import seaborn as sns

grid = sns.PairGrid(df, vars=["sales", "profit", "cost"], hue="channel")
grid.map_upper(sns.scatterplot)
grid.map_lower(sns.kdeplot, fill=True)
grid.map_diag(sns.histplot)
grid.add_legend()`,
    keywords: ["pairgrid", "成对变量网格", "pairplot advanced", "upper lower"],
    related: ["sns-pairplot", "sns-jointgrid", "plt-subplots"],
  }),
  createCommand({
    id: "sns-jointgrid",
    library: "seaborn",
    category: "plot",
    title: "sns.JointGrid()",
    alias: "自定义联合分布主图和边缘图",
    summary: "适合把散点关系和边缘分布拆开分别控制，比 jointplot 更灵活。",
    syntax: 'sns.JointGrid(data=df, x="ad_cost", y="sales")',
    code: `import seaborn as sns

grid = sns.JointGrid(data=df, x="ad_cost", y="sales", height=5)
grid.plot_joint(sns.scatterplot)
grid.plot_marginals(sns.histplot, kde=True)`,
    keywords: ["jointgrid", "联合分布", "边缘分布", "jointplot advanced"],
    related: ["sns-jointplot", "sns-pairgrid", "sns-scatterplot"],
  }),
  createCommand({
    id: "sns-color-palette",
    library: "seaborn",
    category: "plot",
    title: "sns.color_palette()",
    alias: "生成或查看调色板",
    summary: "适合为整套图表选色，保持报告中的配色统一和可区分性。",
    syntax: 'sns.color_palette("crest", 5)',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

palette = sns.color_palette("crest", 5)
sns.palplot(palette)
plt.show()`,
    keywords: ["color_palette", "调色板", "配色", "palplot"],
    related: ["sns-set-theme", "sns-move-legend", "plt-style-use"],
  }),
  createCommand({
    id: "sns-move-legend",
    library: "seaborn",
    category: "plot",
    title: "sns.move_legend()",
    alias: "移动图例位置",
    summary: "适合把图例挪到空白区、外部边缘或更利于阅读的位置。",
    syntax: 'sns.move_legend(ax, "upper left", bbox_to_anchor=(1, 1))',
    code: `import seaborn as sns
import matplotlib.pyplot as plt

ax = sns.scatterplot(data=df, x="sales", y="profit", hue="channel")
sns.move_legend(ax, "upper left", bbox_to_anchor=(1, 1))
plt.tight_layout()
plt.show()`,
    keywords: ["move_legend", "移动图例", "bbox_to_anchor", "legend"],
    related: ["sns-color-palette", "plt-grid-legend", "plt-tight-layout"],
  }),
  createCommand({
    id: "plt-violinplot",
    library: "matplotlib",
    category: "plot",
    title: "plt.violinplot()",
    alias: "小提琴图",
    summary: "适合展示多组数据的分布形状和密度轮廓。",
    syntax: "plt.violinplot([g1, g2, g3])",
    code: `import matplotlib.pyplot as plt

g1 = [12, 14, 13, 17, 18]
g2 = [8, 9, 11, 14, 15]
g3 = [18, 19, 21, 22, 25]

plt.figure(figsize=(7, 4))
plt.violinplot([g1, g2, g3], showmeans=True)
plt.tight_layout()
plt.show()`,
    keywords: ["violinplot", "小提琴图", "分布形状", "density"],
    related: ["sns-violinplot", "plt-boxplot", "sns-boxenplot"],
  }),
  createCommand({
    id: "plt-eventplot",
    library: "matplotlib",
    category: "plot",
    title: "plt.eventplot()",
    alias: "事件时间线图",
    summary: "适合展示事件发生时刻、脉冲位置或实验刺激时间点。",
    syntax: "plt.eventplot(event_positions)",
    code: `import matplotlib.pyplot as plt

event_positions = [[1, 2, 4.5], [0.5, 3.2, 5.0], [2.1, 2.8, 4.0]]

plt.figure(figsize=(7, 4))
plt.eventplot(event_positions, linewidths=1.8)
plt.tight_layout()
plt.show()`,
    keywords: ["eventplot", "事件图", "时间线", "脉冲位置"],
    related: ["plt-stem", "plt-step", "sp-signal-find-peaks"],
  }),
  createCommand({
    id: "plt-quiver",
    library: "matplotlib",
    category: "plot",
    title: "plt.quiver()",
    alias: "向量箭头图",
    summary: "适合展示方向场、梯度场或二维运动方向。",
    syntax: "plt.quiver(X, Y, U, V)",
    code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1, 1, 8)
y = np.linspace(-1, 1, 8)
X, Y = np.meshgrid(x, y)
U = -Y
V = X

plt.figure(figsize=(6, 5))
plt.quiver(X, Y, U, V)
plt.tight_layout()
plt.show()`,
    keywords: ["quiver", "向量场", "箭头图", "gradient field"],
    related: ["plt-streamplot", "np-meshgrid", "plt-contourf"],
  }),
  createCommand({
    id: "plt-streamplot",
    library: "matplotlib",
    category: "plot",
    title: "plt.streamplot()",
    alias: "流线图",
    summary: "适合展示连续流场的走向，比离散箭头更强调流动路径。",
    syntax: "plt.streamplot(X, Y, U, V)",
    code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 40)
y = np.linspace(-2, 2, 40)
X, Y = np.meshgrid(x, y)
U = 1 - Y**2
V = X

plt.figure(figsize=(6, 5))
plt.streamplot(X, Y, U, V, density=1.2)
plt.tight_layout()
plt.show()`,
    keywords: ["streamplot", "流线图", "流场", "vector flow"],
    related: ["plt-quiver", "np-meshgrid", "plt-contourf"],
  }),
  createCommand({
    id: "plt-matshow",
    library: "matplotlib",
    category: "plot",
    title: "plt.matshow()",
    alias: "矩阵可视化",
    summary: "适合快速把二维矩阵直接展示成颜色块结构。",
    syntax: 'plt.matshow(matrix, cmap="viridis")',
    code: `import numpy as np
import matplotlib.pyplot as plt

matrix = np.array([[1, 2, 3], [2, 4, 6], [1, 0, 5]])

plt.figure(figsize=(5, 4))
plt.matshow(matrix, cmap="viridis", fignum=0)
plt.colorbar()
plt.show()`,
    keywords: ["matshow", "矩阵图", "二维矩阵", "heatmap quick"],
    related: ["plt-imshow", "plt-colorbar", "sns-heatmap"],
  }),
  createCommand({
    id: "plt-table",
    library: "matplotlib",
    category: "plot",
    title: "plt.table()",
    alias: "在图中嵌入表格",
    summary: "适合把摘要数值、指标说明或小型汇总表直接嵌到图里。",
    syntax: 'plt.table(cellText=data, colLabels=["A", "B"])',
    code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 3))
ax.axis("off")
table = plt.table(
    cellText=[[120, 32], [138, 29]],
    colLabels=["Sales", "Profit"],
    rowLabels=["Jan", "Feb"],
    loc="center"
)
table.scale(1, 1.6)
plt.show()`,
    keywords: ["table", "图内表格", "summary table", "cellText"],
    related: ["plt-subplots", "plt-suptitle", "pd-to-excel-csv"],
  }),
  createCommand({
    id: "plt-suptitle",
    library: "matplotlib",
    category: "plot",
    title: "plt.suptitle()",
    alias: "整张图设置总标题",
    summary: "适合多子图布局时用一个总标题概括整个看板或分析主题。",
    syntax: 'plt.suptitle("Q1 Sales Dashboard")',
    code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(8, 3))
axes[0].plot([1, 2, 3], [10, 14, 18])
axes[1].bar(["A", "B", "C"], [12, 9, 15])
plt.suptitle("Q1 Sales Dashboard")
plt.tight_layout()
plt.show()`,
    keywords: ["suptitle", "总标题", "dashboard title", "multi subplot"],
    related: ["plt-subplots", "plt-tight-layout", "plt-subplots-adjust"],
  }),
  createCommand({
    id: "plt-tight-layout",
    library: "matplotlib",
    category: "plot",
    title: "plt.tight_layout()",
    alias: "自动压紧子图布局",
    summary: "适合避免标题、标签和图例相互遮挡，是多子图出图前的高频收尾动作。",
    syntax: "plt.tight_layout()",
    code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(8, 3))
axes[0].bar(["Long Label A", "Long Label B"], [12, 16])
axes[1].plot([1, 2, 3], [10, 18, 15])
plt.tight_layout()
plt.show()`,
    keywords: ["tight_layout", "自动布局", "防遮挡", "subplot spacing"],
    related: ["plt-subplots-adjust", "plt-suptitle", "sns-move-legend"],
  }),
  createCommand({
    id: "plt-subplots-adjust",
    library: "matplotlib",
    category: "plot",
    title: "plt.subplots_adjust()",
    alias: "手动微调子图边距",
    summary: "当自动布局不够理想时，适合手动控制上下左右和子图间距。",
    syntax: "plt.subplots_adjust(top=0.85, wspace=0.3)",
    code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(8, 3))
axes[0].plot([1, 2, 3], [10, 12, 18])
axes[1].bar(["A", "B", "C"], [5, 7, 6])
plt.subplots_adjust(top=0.82, wspace=0.35)
plt.show()`,
    keywords: ["subplots_adjust", "手动布局", "wspace", "hspace"],
    related: ["plt-tight-layout", "plt-subplots", "plt-suptitle"],
  }),
  createCommand({
    id: "plt-axline",
    library: "matplotlib",
    category: "plot",
    title: "plt.axline()",
    alias: "画一条无限延展的参考直线",
    summary: "适合添加基准斜率线、理想对角线或理论关系线。",
    syntax: "plt.axline((0, 0), slope=1)",
    code: `import matplotlib.pyplot as plt

plt.figure(figsize=(6, 4))
plt.scatter([1, 2, 3, 4], [0.8, 2.1, 2.8, 4.4])
plt.axline((0, 0), slope=1, color="#b9793e")
plt.tight_layout()
plt.show()`,
    keywords: ["axline", "参考直线", "对角线", "slope"],
    related: ["plt-axhline-axvline", "sns-regplot", "sp-stats-linregress"],
  }),
  createCommand({
    id: "plt-hexbin",
    library: "matplotlib",
    category: "plot",
    title: "plt.hexbin()",
    alias: "六边形密度图",
    summary: "适合高密度散点，能比普通散点图更清楚地展示集中区和离散区。",
    syntax: 'plt.hexbin(x, y, gridsize=25, cmap="viridis")',
    code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(7)
x = rng.normal(0, 1, 800)
y = 0.7 * x + rng.normal(0, 0.8, 800)

plt.figure(figsize=(6, 4))
plt.hexbin(x, y, gridsize=25, cmap="viridis")
plt.colorbar()
plt.tight_layout()
plt.show()`,
    keywords: ["hexbin", "六边形密度图", "高密度散点", "binning"],
    related: ["plt-scatter", "sns-kdeplot", "plt-colorbar"],
  }),
  createCommand({
    id: "sp-stats-zscore",
    library: "scipy",
    category: "stats",
    title: "stats.zscore()",
    alias: "计算标准分数 z-score",
    summary: "适合做变量标准化、异常值初筛或让不同量纲的指标进入同一比较尺度。",
    syntax: 'stats.zscore(values, nan_policy="omit")',
    code: `import numpy as np
from scipy import stats

values = np.array([12, 14, 15, 16, 20, 25], dtype=float)
z = stats.zscore(values, nan_policy="omit")

print(z.round(3))`,
    keywords: ["zscore", "标准化", "异常值初筛", "scipy stats"],
    related: ["np-mean-axis", "sp-stats-shapiro", "sp-stats-gaussian-kde"],
  }),
  createCommand({
    id: "sp-stats-ttest-ind",
    library: "scipy",
    category: "stats",
    title: "stats.ttest_ind()",
    alias: "独立样本 t 检验",
    summary: "适合比较两组独立样本的均值是否存在显著差异。",
    syntax: "stats.ttest_ind(group_a, group_b, equal_var=False)",
    code: `import numpy as np
from scipy import stats

group_a = np.array([102, 98, 105, 110, 108], dtype=float)
group_b = np.array([95, 97, 99, 100, 96], dtype=float)

result = stats.ttest_ind(group_a, group_b, equal_var=False)
print(result)`,
    keywords: ["ttest_ind", "独立样本 t 检验", "均值差异", "welch"],
    related: ["sp-stats-ttest-rel", "sp-stats-mannwhitneyu", "sp-stats-zscore"],
  }),
  createCommand({
    id: "sp-stats-ttest-rel",
    library: "scipy",
    category: "stats",
    title: "stats.ttest_rel()",
    alias: "配对样本 t 检验",
    summary: "适合比较同一对象处理前后、实验前后等配对样本的均值差异。",
    syntax: "stats.ttest_rel(before, after)",
    code: `import numpy as np
from scipy import stats

before = np.array([78, 81, 75, 80, 77], dtype=float)
after = np.array([82, 83, 79, 84, 80], dtype=float)

result = stats.ttest_rel(before, after)
print(result)`,
    keywords: ["ttest_rel", "配对 t 检验", "前后对比", "paired test"],
    related: ["sp-stats-ttest-ind", "sp-stats-shapiro", "sp-stats-wilcoxon"],
  }),
  createCommand({
    id: "sp-stats-wilcoxon",
    library: "scipy",
    category: "stats",
    title: "stats.wilcoxon()",
    alias: "Wilcoxon 配对非参数检验",
    summary: "适合成对样本不满足正态假设时，比较前后变化是否显著。",
    syntax: 'stats.wilcoxon(before, after, alternative="two-sided")',
    code: `import numpy as np
from scipy import stats

before = np.array([78, 81, 75, 80, 77], dtype=float)
after = np.array([82, 83, 79, 84, 80], dtype=float)

result = stats.wilcoxon(before, after, alternative="two-sided")
print(result)`,
    keywords: ["wilcoxon", "配对非参数检验", "before after", "signed-rank"],
    related: ["sp-stats-ttest-rel", "sp-stats-mannwhitneyu", "sp-stats-shapiro"],
  }),
  createCommand({
    id: "sp-stats-chi2",
    library: "scipy",
    category: "stats",
    title: "stats.chi2_contingency()",
    alias: "卡方独立性检验",
    summary: "适合判断两个分类变量是否独立，比如渠道和是否转化之间是否有关联。",
    syntax: "stats.chi2_contingency(table)",
    code: `import numpy as np
from scipy import stats

table = np.array([[42, 18], [28, 31]])
chi2, pvalue, dof, expected = stats.chi2_contingency(table)

print(chi2, pvalue)`,
    keywords: ["chi2_contingency", "卡方检验", "分类变量独立性", "列联表"],
    related: ["pd-crosstab", "sp-stats-f-oneway", "sp-stats-pearsonr"],
  }),
  createCommand({
    id: "sp-stats-f-oneway",
    library: "scipy",
    category: "stats",
    title: "stats.f_oneway()",
    alias: "单因素方差分析 ANOVA",
    summary: "适合比较两组以上样本的均值是否存在整体差异。",
    syntax: "stats.f_oneway(group_a, group_b, group_c)",
    code: `import numpy as np
from scipy import stats

group_a = np.array([12, 14, 13, 15])
group_b = np.array([17, 18, 16, 19])
group_c = np.array([22, 20, 24, 21])

result = stats.f_oneway(group_a, group_b, group_c)
print(result)`,
    keywords: ["f_oneway", "anova", "方差分析", "多组均值"],
    related: ["sp-stats-ttest-ind", "sp-stats-mannwhitneyu", "sns-boxenplot"],
  }),
  createCommand({
    id: "sp-stats-pearsonr",
    library: "scipy",
    category: "stats",
    title: "stats.pearsonr()",
    alias: "皮尔逊相关检验",
    summary: "适合衡量两个连续变量之间的线性相关强度和显著性。",
    syntax: "stats.pearsonr(x, y)",
    code: `import numpy as np
from scipy import stats

x = np.array([1, 2, 3, 4, 5, 6], dtype=float)
y = np.array([12, 14, 17, 18, 21, 24], dtype=float)

result = stats.pearsonr(x, y)
print(result)`,
    keywords: ["pearsonr", "皮尔逊相关", "线性相关", "pvalue"],
    related: ["sp-stats-spearmanr", "np-corrcoef", "sp-stats-linregress"],
  }),
  createCommand({
    id: "sp-stats-spearmanr",
    library: "scipy",
    category: "stats",
    title: "stats.spearmanr()",
    alias: "斯皮尔曼秩相关检验",
    summary: "适合非线性但单调的关系、或对异常值更稳健的相关性分析。",
    syntax: "stats.spearmanr(x, y)",
    code: `import numpy as np
from scipy import stats

x = np.array([1, 2, 3, 4, 5, 6], dtype=float)
y = np.array([10, 13, 15, 16, 16.5, 17], dtype=float)

result = stats.spearmanr(x, y)
print(result)`,
    keywords: ["spearmanr", "秩相关", "单调关系", "rank correlation"],
    related: ["sp-stats-pearsonr", "sp-stats-mannwhitneyu", "sns-scatterplot"],
  }),
  createCommand({
    id: "sp-stats-shapiro",
    library: "scipy",
    category: "stats",
    title: "stats.shapiro()",
    alias: "Shapiro-Wilk 正态性检验",
    summary: "适合在样本量不大时快速判断数据是否近似正态分布。",
    syntax: "stats.shapiro(values)",
    code: `import numpy as np
from scipy import stats

values = np.array([8.1, 8.4, 8.8, 9.2, 9.3, 9.6, 10.1], dtype=float)
result = stats.shapiro(values)

print(result)`,
    keywords: ["shapiro", "正态性检验", "normality", "分布检查"],
    related: ["sp-stats-zscore", "sp-stats-ttest-ind", "sns-histplot"],
  }),
  createCommand({
    id: "sp-stats-mannwhitneyu",
    library: "scipy",
    category: "stats",
    title: "stats.mannwhitneyu()",
    alias: "Mann-Whitney U 非参数检验",
    summary: "适合在分布不满足正态假设时比较两组样本是否存在位置差异。",
    syntax: 'stats.mannwhitneyu(group_a, group_b, alternative="two-sided")',
    code: `import numpy as np
from scipy import stats

group_a = np.array([4, 5, 6, 7, 10], dtype=float)
group_b = np.array([2, 3, 4, 4, 5], dtype=float)

result = stats.mannwhitneyu(group_a, group_b, alternative="two-sided")
print(result)`,
    keywords: ["mannwhitneyu", "非参数检验", "两独立样本", "rank test"],
    related: ["sp-stats-ttest-ind", "sp-stats-spearmanr", "sp-stats-f-oneway"],
  }),
  createCommand({
    id: "sp-stats-linregress",
    library: "scipy",
    category: "stats",
    title: "stats.linregress()",
    alias: "快速线性回归",
    summary: "适合快速获取斜率、截距、相关系数和显著性，而不用搭完整建模框架。",
    syntax: "stats.linregress(x, y)",
    code: `import numpy as np
from scipy import stats

x = np.array([1, 2, 3, 4, 5], dtype=float)
y = np.array([2.2, 2.8, 3.7, 4.4, 5.1], dtype=float)

result = stats.linregress(x, y)
print(result)`,
    keywords: ["linregress", "线性回归", "斜率", "截距"],
    related: ["sp-stats-pearsonr", "sns-regplot", "plt-axline"],
  }),
  createCommand({
    id: "sp-stats-gaussian-kde",
    library: "scipy",
    category: "stats",
    title: "stats.gaussian_kde()",
    alias: "高斯核密度估计",
    summary: "适合手动构造 KDE 估计器，在需要进一步自定义采样点评估时很方便。",
    syntax: 'stats.gaussian_kde(values, bw_method="scott")',
    code: `import numpy as np
from scipy import stats

values = np.array([12, 14, 15, 16, 18, 20, 21], dtype=float)
kde = stats.gaussian_kde(values, bw_method="scott")
grid = np.linspace(values.min(), values.max(), 8)

print(kde(grid))`,
    keywords: ["gaussian_kde", "核密度估计", "kde", "bandwidth"],
    related: ["sns-kdeplot", "sns-histplot", "sp-stats-shapiro"],
  }),
  createCommand({
    id: "sp-interpolate-interp1d",
    library: "scipy",
    category: "numeric",
    title: "interpolate.interp1d()",
    alias: "一维插值函数",
    summary: "适合在已知离散点之间插值估计，常见于补齐曲线、重采样和缺口填补。",
    syntax: 'interpolate.interp1d(x, y, kind="linear", fill_value="extrapolate")',
    code: `import numpy as np
from scipy import interpolate

x = np.array([0, 1, 2, 4, 6], dtype=float)
y = np.array([0, 2, 3, 3.5, 5], dtype=float)
interp = interpolate.interp1d(x, y, kind="linear", fill_value="extrapolate")

print(interp(np.array([1.5, 3.0, 5.0])))`,
    keywords: ["interp1d", "一维插值", "重采样", "缺口补齐"],
    related: ["sp-interpolate-spline", "pd-interpolate", "sp-signal-savgol"],
  }),
  createCommand({
    id: "sp-interpolate-spline",
    library: "scipy",
    category: "numeric",
    title: "interpolate.UnivariateSpline()",
    alias: "一维样条平滑拟合",
    summary: "适合在插值和拟合之间取得平衡，让曲线更平滑地贴合数据。",
    syntax: "interpolate.UnivariateSpline(x, y, k=3, s=0.5)",
    code: `import numpy as np
from scipy import interpolate

x = np.array([0, 1, 2, 4, 6], dtype=float)
y = np.array([0, 2, 3, 3.5, 5], dtype=float)
spline = interpolate.UnivariateSpline(x, y, k=3, s=0.5)

print(spline(np.linspace(0, 6, 6)))`,
    keywords: ["UnivariateSpline", "样条拟合", "平滑曲线", "spline"],
    related: ["sp-interpolate-interp1d", "sp-signal-savgol", "plt-plot"],
  }),
  createCommand({
    id: "sp-signal-savgol",
    library: "scipy",
    category: "signal",
    title: "signal.savgol_filter()",
    alias: "Savitzky-Golay 平滑滤波",
    summary: "适合平滑噪声序列，同时尽量保留峰值形状和趋势结构。",
    syntax: "signal.savgol_filter(series, window_length=5, polyorder=2)",
    code: `import numpy as np
from scipy import signal

series = np.array([2.0, 2.2, 2.5, 2.9, 3.8, 3.2, 3.1, 3.3, 3.5])
smoothed = signal.savgol_filter(series, window_length=5, polyorder=2)

print(smoothed.round(3))`,
    keywords: ["savgol_filter", "平滑滤波", "保留峰形", "denoise"],
    related: ["sp-signal-find-peaks", "sp-interpolate-spline", "np-diff-gradient"],
  }),
  createCommand({
    id: "sp-signal-find-peaks",
    library: "scipy",
    category: "signal",
    title: "signal.find_peaks()",
    alias: "查找峰值位置",
    summary: "适合识别局部峰值点，并按高度、突显度、间距等规则过滤噪声峰。",
    syntax: "signal.find_peaks(series, distance=2, prominence=1)",
    code: `import numpy as np
from scipy import signal

series = np.array([1, 3, 2, 5, 1, 4, 1, 6, 1], dtype=float)
peaks, props = signal.find_peaks(series, distance=2, prominence=1)

print(peaks)`,
    keywords: ["find_peaks", "峰值检测", "prominence", "distance"],
    related: ["sp-signal-savgol", "sp-signal-correlate", "plt-eventplot"],
  }),
  createCommand({
    id: "sp-signal-convolve",
    library: "scipy",
    category: "signal",
    title: "signal.convolve()",
    alias: "卷积信号或序列",
    summary: "适合平滑、模板滤波或把一个核作用到序列上。",
    syntax: 'signal.convolve(signal_a, signal_b, mode="same")',
    code: `import numpy as np
from scipy import signal

signal_a = np.array([0, 1, 2, 1, 0], dtype=float)
kernel = np.array([0.25, 0.5, 0.25], dtype=float)
result = signal.convolve(signal_a, kernel, mode="same")

print(result.round(3))`,
    keywords: ["convolve", "卷积", "平滑核", "filter"],
    related: ["sp-signal-correlate", "sp-signal-savgol", "np-pad"],
  }),
  createCommand({
    id: "sp-signal-correlate",
    library: "scipy",
    category: "signal",
    title: "signal.correlate()",
    alias: "计算相关序列",
    summary: "适合做模板匹配、延迟对齐或寻找两个序列之间的相似偏移。",
    syntax: 'signal.correlate(signal_a, signal_b, mode="full")',
    code: `import numpy as np
from scipy import signal

signal_a = np.array([0, 1, 2, 1, 0], dtype=float)
signal_b = np.array([1, 0, -1], dtype=float)
result = signal.correlate(signal_a, signal_b, mode="full")

print(result)`,
    keywords: ["correlate", "相关序列", "模板匹配", "delay"],
    related: ["sp-signal-convolve", "sp-signal-find-peaks", "np-corrcoef"],
  }),
  createCommand({
    id: "sp-optimize-minimize",
    library: "scipy",
    category: "optimize",
    title: "optimize.minimize()",
    alias: "数值最小化求解",
    summary: "适合最小化损失函数、成本函数或距离函数，是通用优化入口。",
    syntax: 'optimize.minimize(objective, x0=[0, 0], method="BFGS")',
    code: `from scipy import optimize

def objective(x):
    return (x[0] - 2) ** 2 + (x[1] + 1) ** 2

result = optimize.minimize(objective, x0=[0, 0], method="BFGS")
print(result.x)`,
    keywords: ["minimize", "优化", "损失函数", "BFGS"],
    related: ["sp-optimize-root", "sp-optimize-curve-fit", "np-linalg-norm"],
  }),
  createCommand({
    id: "sp-optimize-curve-fit",
    library: "scipy",
    category: "optimize",
    title: "optimize.curve_fit()",
    alias: "非线性曲线拟合",
    summary: "适合根据观测数据拟合指数、幂律、饱和曲线等参数模型。",
    syntax: "optimize.curve_fit(model, xdata, ydata, p0=[1, 0.1])",
    code: `import numpy as np
from scipy import optimize

def model(x, a, b):
    return a * np.exp(b * x)

xdata = np.array([0, 1, 2, 3, 4], dtype=float)
ydata = np.array([2.0, 2.8, 4.1, 5.8, 8.2], dtype=float)
params, cov = optimize.curve_fit(model, xdata, ydata, p0=[1, 0.1])

print(params)`,
    keywords: ["curve_fit", "曲线拟合", "参数估计", "nonlinear fit"],
    related: ["sp-optimize-minimize", "sp-stats-linregress", "plt-plot"],
  }),
  createCommand({
    id: "sp-optimize-root",
    library: "scipy",
    category: "optimize",
    title: "optimize.root()",
    alias: "求方程或方程组的根",
    summary: "适合求解非线性方程等于零的位置，是校准和方程反解的常见入口。",
    syntax: "optimize.root(equation, x0=2.0)",
    code: `from scipy import optimize

def equation(x):
    return x**3 - 2 * x - 5

result = optimize.root(equation, x0=2.0)
print(result.x)`,
    keywords: ["root", "求根", "非线性方程", "solve equation"],
    related: ["sp-optimize-minimize", "np-linalg-solve", "sp-optimize-linprog"],
  }),
  createCommand({
    id: "sp-optimize-linprog",
    library: "scipy",
    category: "optimize",
    title: "optimize.linprog()",
    alias: "线性规划",
    summary: "适合求解资源分配、产能约束、运输成本最小化这类线性优化问题。",
    syntax: 'optimize.linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=(0, None), method="highs")',
    code: `from scipy import optimize

c = [-5, -4]
A_ub = [[6, 4], [1, 2], [-1, 1]]
b_ub = [24, 6, 1]

result = optimize.linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=(0, None), method="highs")
print(result.x)`,
    keywords: ["linprog", "线性规划", "资源分配", "约束优化"],
    related: ["sp-optimize-minimize", "sp-optimize-root", "np-linalg-solve"],
  }),
  createCommand({
    id: "sp-spatial-cdist",
    library: "scipy",
    category: "numeric",
    title: "distance.cdist()",
    alias: "两组样本之间的距离矩阵",
    summary: "适合计算两批样本两两之间的距离，为最近邻、聚类前处理或相似度分析做准备。",
    syntax: 'distance.cdist(XA, XB, metric="euclidean")',
    code: `import numpy as np
from scipy.spatial import distance

XA = np.array([[0, 0], [1, 1], [2, 2]], dtype=float)
XB = np.array([[0, 1], [2, 1]], dtype=float)
dist = distance.cdist(XA, XB, metric="euclidean")

print(dist)`,
    keywords: ["cdist", "距离矩阵", "最近邻", "样本相似度"],
    related: ["sp-spatial-pdist-squareform", "np-linalg-norm", "sns-heatmap"],
  }),
  createCommand({
    id: "sp-spatial-pdist-squareform",
    library: "scipy",
    category: "numeric",
    title: "distance.pdist() + squareform()",
    alias: "同一组样本内部的距离矩阵",
    summary: "适合把一批点之间的两两距离变成对称矩阵，方便聚类或热力图展示。",
    syntax: 'distance.squareform(distance.pdist(points, metric="euclidean"))',
    code: `import numpy as np
from scipy.spatial import distance

points = np.array([[0, 0], [1, 1], [2, 1], [2, 3]], dtype=float)
matrix = distance.squareform(distance.pdist(points, metric="euclidean"))

print(matrix)`,
    keywords: ["pdist", "squareform", "内部距离矩阵", "cluster distance"],
    related: ["sp-spatial-cdist", "sns-clustermap", "sns-heatmap"],
  }),
  createCommand({
    id: "sp-sparse-csr",
    library: "scipy",
    category: "numeric",
    title: "sparse.csr_matrix()",
    alias: "构造 CSR 稀疏矩阵",
    summary: "适合大规模稀疏特征、用户-物品矩阵或图算法输入，能显著节省内存。",
    syntax: "sparse.csr_matrix(dense)",
    code: `import numpy as np
from scipy import sparse

dense = np.array([[0, 1, 0], [2, 0, 0], [0, 0, 3]])
matrix = sparse.csr_matrix(dense)

print(matrix.toarray())`,
    keywords: ["csr_matrix", "稀疏矩阵", "sparse", "memory efficient"],
    related: ["np-array", "sp-spatial-cdist", "pd-get-dummies"],
  }),
  createCommand({
    id: "sp-special-expit",
    library: "scipy",
    category: "numeric",
    title: "special.expit()",
    alias: "Sigmoid 函数",
    summary: "适合把实数映射到 0 到 1 区间，常见于概率分数、逻辑回归和阈值平滑转换。",
    syntax: "special.expit(logits)",
    code: `import numpy as np
from scipy import special

logits = np.array([-3.0, -1.0, 0.0, 1.0, 3.0])
probs = special.expit(logits)

print(probs.round(4))`,
    keywords: ["expit", "sigmoid", "概率映射", "logistic"],
    related: ["np-log-sqrt", "np-isclose-allclose", "sp-optimize-minimize"],
  }),
  createCommand({
    id: "sm-add-constant",
    library: "statsmodels",
    category: "model",
    title: "sm.add_constant()",
    alias: "给设计矩阵加常数项",
    summary: "在线性回归等模型里手动加入截距列，是使用矩阵接口建模时的高频起点。",
    syntax: 'sm.add_constant(df[["ad_cost", "visits"]])',
    code: `import pandas as pd
import statsmodels.api as sm

df = pd.DataFrame({
    "sales": [120, 138, 146, 160, 174],
    "ad_cost": [20, 22, 25, 26, 29],
    "visits": [400, 430, 460, 500, 530],
})

X = sm.add_constant(df[["ad_cost", "visits"]])
print(X.head())`,
    keywords: ["add_constant", "截距项", "设计矩阵", "exog"],
    related: ["sm-ols", "sm-formula-ols", "sk-columntransformer"],
  }),
  createCommand({
    id: "sm-ols",
    library: "statsmodels",
    category: "model",
    title: "sm.OLS().fit()",
    alias: "线性回归拟合",
    summary: "适合做可解释线性建模，重点是系数、显著性和拟合质量的统计解释。",
    syntax: "sm.OLS(y, X).fit()",
    code: `import pandas as pd
import statsmodels.api as sm

df = pd.DataFrame({
    "sales": [120, 138, 146, 160, 174],
    "ad_cost": [20, 22, 25, 26, 29],
    "visits": [400, 430, 460, 500, 530],
})

X = sm.add_constant(df[["ad_cost", "visits"]])
y = df["sales"]
model = sm.OLS(y, X).fit()

print(model.params)`,
    keywords: ["OLS", "线性回归", "回归系数", "statsmodels regression"],
    related: ["sm-add-constant", "sm-summary", "sm-anova-lm"],
  }),
  createCommand({
    id: "sm-formula-ols",
    library: "statsmodels",
    category: "model",
    title: "smf.ols().fit()",
    alias: "用公式接口拟合线性回归",
    summary: "适合直接用 DataFrame 列名建模，尤其在分类变量和交互项较多时更易读。",
    syntax: 'smf.ols("sales ~ ad_cost + C(channel)", data=df).fit()',
    code: `import pandas as pd
import statsmodels.formula.api as smf

df = pd.DataFrame({
    "sales": [120, 138, 146, 160, 174, 182],
    "ad_cost": [20, 22, 25, 26, 29, 31],
    "channel": ["Online", "Online", "Store", "Store", "Online", "Store"],
})

model = smf.ols("sales ~ ad_cost + C(channel)", data=df).fit()
print(model.params)`,
    keywords: ["formula", "smf.ols", "C(channel)", "公式回归"],
    related: ["sm-ols", "sm-anova-lm", "sm-summary"],
  }),
  createCommand({
    id: "sm-logit",
    library: "statsmodels",
    category: "model",
    title: "sm.Logit().fit()",
    alias: "逻辑回归拟合",
    summary: "适合需要系数显著性和统计解释的二分类建模场景。",
    syntax: "sm.Logit(y, X).fit()",
    code: `import pandas as pd
import statsmodels.api as sm

df = pd.DataFrame({
    "converted": [0, 0, 0, 1, 1, 1],
    "ad_cost": [20, 22, 25, 28, 30, 35],
    "visits": [300, 320, 340, 420, 450, 480],
})

X = sm.add_constant(df[["ad_cost", "visits"]])
y = df["converted"]
model = sm.Logit(y, X).fit(disp=False)

print(model.params)`,
    keywords: ["Logit", "逻辑回归", "二分类", "显著性"],
    related: ["sm-summary", "sk-logistic-regression", "sm-add-constant"],
  }),
  createCommand({
    id: "sm-summary",
    library: "statsmodels",
    category: "evaluate",
    title: "summary()",
    alias: "查看模型摘要报告",
    summary: "把系数、标准误、p 值、R-squared 等统计信息集中打印出来，是 statsmodels 的核心亮点。",
    syntax: "model.summary()",
    code: `summary_text = model.summary()
print(summary_text)`,
    keywords: ["summary", "模型摘要", "p value", "r-squared"],
    related: ["sm-ols", "sm-formula-ols", "sm-logit"],
  }),
  createCommand({
    id: "sm-anova-lm",
    library: "statsmodels",
    category: "stats",
    title: "sm.stats.anova_lm()",
    alias: "方差分析表",
    summary: "适合在线性模型拟合后拆解各因素的解释贡献和显著性。",
    syntax: "sm.stats.anova_lm(model, typ=2)",
    code: `import statsmodels.api as sm

anova_table = sm.stats.anova_lm(model, typ=2)
print(anova_table)`,
    keywords: ["anova_lm", "方差分析", "typ=2", "因素显著性"],
    related: ["sm-formula-ols", "sm-summary", "sp-stats-f-oneway"],
  }),
  createCommand({
    id: "sm-descrstats",
    library: "statsmodels",
    category: "stats",
    title: "DescrStatsW()",
    alias: "描述统计与置信区间",
    summary: "适合在建模前快速查看均值、标准差和均值置信区间。",
    syntax: "DescrStatsW(values)",
    code: `import numpy as np
from statsmodels.stats.weightstats import DescrStatsW

values = np.array([120, 138, 146, 160, 174], dtype=float)
stats = DescrStatsW(values)

print(stats.mean, stats.std, stats.tconfint_mean())`,
    keywords: ["DescrStatsW", "描述统计", "置信区间", "均值"],
    related: ["sm-summary", "sp-stats-zscore", "pd-describe"],
  }),
  createCommand({
    id: "sm-acf-pacf",
    library: "statsmodels",
    category: "time",
    title: "acf() / pacf()",
    alias: "查看自相关和偏自相关",
    summary: "适合时间序列建模前判断序列记忆长度和 AR/MA 阶数线索。",
    syntax: "acf(series, nlags=8)",
    code: `import numpy as np
from statsmodels.tsa.stattools import acf, pacf

series = np.array([12, 13, 15, 18, 17, 19, 21, 20, 22, 24], dtype=float)

print(acf(series, nlags=4))
print(pacf(series, nlags=4))`,
    keywords: ["acf", "pacf", "自相关", "偏自相关", "lag"],
    related: ["sm-arima", "sm-seasonal-decompose", "pd-rolling"],
  }),
  createCommand({
    id: "sm-seasonal-decompose",
    library: "statsmodels",
    category: "time",
    title: "seasonal_decompose()",
    alias: "时间序列季节分解",
    summary: "适合把时间序列拆成趋势、季节项和残差，先理解结构再谈预测。",
    syntax: 'seasonal_decompose(series, model="additive", period=4)',
    code: `import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose

index = pd.date_range("2026-01-01", periods=12, freq="M")
series = pd.Series([10, 12, 11, 15, 18, 17, 20, 23, 21, 25, 27, 26], index=index)

result = seasonal_decompose(series, model="additive", period=4)
print(result.trend.dropna().head())`,
    keywords: ["seasonal_decompose", "季节分解", "trend seasonal resid", "time series"],
    related: ["sm-acf-pacf", "sm-arima", "pd-resample"],
  }),
  createCommand({
    id: "sm-arima",
    library: "statsmodels",
    category: "time",
    title: "ARIMA().fit()",
    alias: "ARIMA 时间序列建模",
    summary: "适合做单变量时间序列预测，前提是先理解差分、阶数和残差结构。",
    syntax: "ARIMA(series, order=(1, 1, 1)).fit()",
    code: `import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

series = pd.Series([120, 124, 128, 130, 133, 137, 141, 144, 149, 153], dtype=float)
model = ARIMA(series, order=(1, 1, 1)).fit()

print(model.forecast(3))`,
    keywords: ["ARIMA", "时间序列预测", "order", "forecast"],
    related: ["sm-acf-pacf", "sm-seasonal-decompose", "pd-shift"],
  }),
  createCommand({
    id: "sm-qqplot",
    library: "statsmodels",
    category: "plot",
    title: "sm.qqplot()",
    alias: "Q-Q 图",
    summary: "适合检查样本分布是否近似理论正态分布，是回归诊断和分布检查的常用图。",
    syntax: "sm.qqplot(values, line='45')",
    code: `import numpy as np
import statsmodels.api as sm
import matplotlib.pyplot as plt

values = np.array([12, 14, 15, 16, 18, 20, 22], dtype=float)
sm.qqplot(values, line="45")
plt.tight_layout()
plt.show()`,
    keywords: ["qqplot", "Q-Q 图", "正态诊断", "distribution check"],
    related: ["sm-summary", "sp-stats-shapiro", "sns-histplot"],
  }),
  createCommand({
    id: "sk-train-test-split",
    library: "sklearn",
    category: "model",
    title: "train_test_split()",
    alias: "切分训练集和测试集",
    summary: "监督学习流程的第一步之一，用来隔离训练和评估阶段，减少数据泄漏。",
    syntax: "train_test_split(X, y, test_size=0.2, random_state=42)",
    code: `import numpy as np
from sklearn.model_selection import train_test_split

X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)
y = np.array([0, 0, 0, 1, 1, 1])

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.33,
    random_state=42
)`,
    keywords: ["train_test_split", "训练测试切分", "data leakage", "model selection"],
    related: ["sk-cross-val-score", "sk-standardscaler", "sk-pipeline"],
  }),
  createCommand({
    id: "sk-standardscaler",
    library: "sklearn",
    category: "transform",
    title: "StandardScaler()",
    alias: "标准化特征",
    summary: "把特征缩放到均值 0、方差 1 的尺度，适合线性模型、SVM、神经网络等对尺度敏感的算法。",
    syntax: "StandardScaler().fit_transform(X)",
    code: `import numpy as np
from sklearn.preprocessing import StandardScaler

X = np.array([[1.0, 20.0], [2.0, 22.0], [3.0, 25.0], [4.0, 28.0]])
scaled = StandardScaler().fit_transform(X)

print(scaled)`,
    keywords: ["StandardScaler", "标准化", "scaling", "feature scaling"],
    related: ["sk-minmaxscaler", "sk-pipeline", "sk-logistic-regression"],
  }),
  createCommand({
    id: "sk-minmaxscaler",
    library: "sklearn",
    category: "transform",
    title: "MinMaxScaler()",
    alias: "把特征缩放到固定区间",
    summary: "适合需要把特征映射到 0 到 1 或其它固定区间的场景。",
    syntax: "MinMaxScaler().fit_transform(X)",
    code: `import numpy as np
from sklearn.preprocessing import MinMaxScaler

X = np.array([[1.0, 20.0], [2.0, 22.0], [3.0, 25.0], [4.0, 28.0]])
scaled = MinMaxScaler().fit_transform(X)

print(scaled)`,
    keywords: ["MinMaxScaler", "归一化", "0-1", "feature scaling"],
    related: ["sk-standardscaler", "sk-pipeline", "sk-pca"],
  }),
  createCommand({
    id: "sk-onehotencoder",
    library: "sklearn",
    category: "transform",
    title: "OneHotEncoder()",
    alias: "类别特征独热编码",
    summary: "把分类变量转成稀疏或稠密哑变量矩阵，适合传统机器学习模型输入。",
    syntax: 'OneHotEncoder(handle_unknown="ignore")',
    code: `from sklearn.preprocessing import OneHotEncoder

X = [["Online"], ["Store"], ["Online"], ["Partner"]]
encoder = OneHotEncoder(sparse_output=False, handle_unknown="ignore")
encoded = encoder.fit_transform(X)

print(encoded)`,
    keywords: ["OneHotEncoder", "独热编码", "分类特征", "categorical"],
    related: ["sk-columntransformer", "sk-simpleimputer", "pd-get-dummies"],
  }),
  createCommand({
    id: "sk-simpleimputer",
    library: "sklearn",
    category: "clean",
    title: "SimpleImputer()",
    alias: "简单缺失值填补",
    summary: "适合把缺失值处理并纳入机器学习流水线，而不是在 DataFrame 外部手动补值。",
    syntax: 'SimpleImputer(strategy="median")',
    code: `import numpy as np
from sklearn.impute import SimpleImputer

X = np.array([[1.0, 20.0], [2.0, 22.0], [3.0, np.nan], [4.0, 28.0]])
filled = SimpleImputer(strategy="median").fit_transform(X)

print(filled)`,
    keywords: ["SimpleImputer", "缺失值填补", "median", "imputation"],
    related: ["sk-standardscaler", "sk-columntransformer", "pd-fillna"],
  }),
  createCommand({
    id: "sk-columntransformer",
    library: "sklearn",
    category: "transform",
    title: "ColumnTransformer()",
    alias: "按列组合不同预处理器",
    summary: "适合数值列和类别列并存时，为不同列应用不同预处理规则。",
    syntax: "ColumnTransformer([...])",
    code: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = pd.DataFrame({
    "sales": [120, 138, 146, 160],
    "channel": ["Online", "Store", "Online", "Partner"],
})

preprocess = ColumnTransformer([
    ("num", StandardScaler(), ["sales"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["channel"]),
])

print(preprocess.fit_transform(df))`,
    keywords: ["ColumnTransformer", "按列预处理", "mixed features", "pipeline"],
    related: ["sk-onehotencoder", "sk-standardscaler", "sk-pipeline"],
  }),
  createCommand({
    id: "sk-pipeline",
    library: "sklearn",
    category: "model",
    title: "Pipeline()",
    alias: "把预处理和模型串成流水线",
    summary: "适合把缩放、编码、建模统一封装，减少数据泄漏并让验证更规范。",
    syntax: "Pipeline([...])",
    code: `import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)
y = np.array([0, 0, 0, 1, 1, 1])

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression()),
])

pipe.fit(X, y)`,
    keywords: ["Pipeline", "流水线", "data leakage", "preprocess + model"],
    related: ["sk-columntransformer", "sk-cross-val-score", "sk-grid-search"],
  }),
  createCommand({
    id: "sk-linear-regression",
    library: "sklearn",
    category: "model",
    title: "LinearRegression()",
    alias: "线性回归模型",
    summary: "适合做基线回归、趋势拟合和连续值预测的入门模型。",
    syntax: "LinearRegression().fit(X_train, y_train)",
    code: `import numpy as np
from sklearn.linear_model import LinearRegression

X = np.array([[1], [2], [3], [4], [5]], dtype=float)
y = np.array([12, 14, 17, 19, 22], dtype=float)

model = LinearRegression().fit(X, y)
print(model.predict([[6.0]]))`,
    keywords: ["LinearRegression", "回归模型", "predict continuous", "baseline"],
    related: ["sk-pipeline", "sm-ols", "sk-pca"],
  }),
  createCommand({
    id: "sk-logistic-regression",
    library: "sklearn",
    category: "model",
    title: "LogisticRegression()",
    alias: "逻辑回归分类模型",
    summary: "适合二分类基线建模，配合标准化和阈值分析常常很稳。",
    syntax: "LogisticRegression().fit(X_train, y_train)",
    code: `import numpy as np
from sklearn.linear_model import LogisticRegression

X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)
y = np.array([0, 0, 0, 1, 1, 1])

model = LogisticRegression().fit(X, y)
print(model.predict_proba(X[:2]))`,
    keywords: ["LogisticRegression", "分类模型", "predict_proba", "binary classification"],
    related: ["sk-standardscaler", "sk-confusion-matrix", "sm-logit"],
  }),
  createCommand({
    id: "sk-random-forest",
    library: "sklearn",
    category: "model",
    title: "RandomForestClassifier()",
    alias: "随机森林分类器",
    summary: "适合非线性分类任务，也常用来做特征重要性快速摸底。",
    syntax: "RandomForestClassifier(n_estimators=200, random_state=42)",
    code: `import numpy as np
from sklearn.ensemble import RandomForestClassifier

X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)
y = np.array([0, 0, 0, 1, 1, 1])

model = RandomForestClassifier(n_estimators=200, random_state=42).fit(X, y)
print(model.feature_importances_)`,
    keywords: ["RandomForestClassifier", "随机森林", "feature importance", "tree ensemble"],
    related: ["sk-grid-search", "sk-cross-val-score", "sk-logistic-regression"],
  }),
  createCommand({
    id: "sk-kmeans",
    library: "sklearn",
    category: "model",
    title: "KMeans()",
    alias: "KMeans 聚类",
    summary: "适合做无监督分群、客户分层或快速观察样本结构。",
    syntax: "KMeans(n_clusters=3, random_state=42, n_init='auto')",
    code: `import numpy as np
from sklearn.cluster import KMeans

X = np.array([[1, 20], [2, 22], [3, 25], [20, 80], [21, 82], [22, 84]], dtype=float)
model = KMeans(n_clusters=2, random_state=42, n_init="auto").fit(X)

print(model.labels_)`,
    keywords: ["KMeans", "聚类", "clustering", "n_clusters"],
    related: ["sk-silhouette-score", "sk-standardscaler", "plt-scatter"],
  }),
  createCommand({
    id: "sk-pca",
    library: "sklearn",
    category: "transform",
    title: "PCA()",
    alias: "主成分分析降维",
    summary: "适合压缩高维特征、可视化前降维或观察主要方差方向。",
    syntax: "PCA(n_components=2).fit_transform(X)",
    code: `import numpy as np
from sklearn.decomposition import PCA

X = np.array([
    [1, 20, 300],
    [2, 22, 320],
    [3, 25, 340],
    [4, 28, 360],
], dtype=float)

components = PCA(n_components=2).fit_transform(X)
print(components)`,
    keywords: ["PCA", "降维", "principal components", "explained variance"],
    related: ["np-cov", "sk-standardscaler", "sk-kmeans"],
  }),
  createCommand({
    id: "sk-cross-val-score",
    library: "sklearn",
    category: "evaluate",
    title: "cross_val_score()",
    alias: "交叉验证评分",
    summary: "适合在模型比较阶段更稳地估计泛化表现，而不是只盯单次切分结果。",
    syntax: "cross_val_score(model, X, y, cv=5)",
    code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)
y = np.array([0, 0, 0, 1, 1, 1])

model = LogisticRegression()
scores = cross_val_score(model, X, y, cv=3)
print(scores)`,
    keywords: ["cross_val_score", "交叉验证", "cv", "generalization"],
    related: ["sk-train-test-split", "sk-pipeline", "sk-grid-search"],
  }),
  createCommand({
    id: "sk-grid-search",
    library: "sklearn",
    category: "evaluate",
    title: "GridSearchCV()",
    alias: "网格搜索调参",
    summary: "适合系统比较超参数组合，并结合交叉验证选择更稳的模型配置。",
    syntax: "GridSearchCV(model, param_grid, cv=5)",
    code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV

X = np.array([[1, 20], [2, 22], [3, 25], [4, 28], [5, 30], [6, 35]], dtype=float)
y = np.array([0, 0, 0, 1, 1, 1])

search = GridSearchCV(
    LogisticRegression(max_iter=1000),
    {"C": [0.1, 1, 10]},
    cv=3
)
search.fit(X, y)
print(search.best_params_)`,
    keywords: ["GridSearchCV", "调参", "param_grid", "best_params"],
    related: ["sk-cross-val-score", "sk-pipeline", "sk-random-forest"],
  }),
  createCommand({
    id: "sk-confusion-matrix",
    library: "sklearn",
    category: "evaluate",
    title: "confusion_matrix()",
    alias: "混淆矩阵",
    summary: "适合查看分类模型把正负类错分到了哪里，而不只是看整体准确率。",
    syntax: "confusion_matrix(y_true, y_pred)",
    code: `import numpy as np
from sklearn.metrics import confusion_matrix

y_true = np.array([0, 0, 1, 1, 1])
y_pred = np.array([0, 1, 1, 1, 0])

print(confusion_matrix(y_true, y_pred))`,
    keywords: ["confusion_matrix", "混淆矩阵", "TP FP FN TN", "classification"],
    related: ["sk-classification-report", "sk-roc-auc", "sns-heatmap"],
  }),
  createCommand({
    id: "sk-classification-report",
    library: "sklearn",
    category: "evaluate",
    title: "classification_report()",
    alias: "分类指标报告",
    summary: "适合同时查看 precision、recall、f1-score 等分类指标，不必手算。",
    syntax: "classification_report(y_true, y_pred)",
    code: `import numpy as np
from sklearn.metrics import classification_report

y_true = np.array([0, 0, 1, 1, 1])
y_pred = np.array([0, 1, 1, 1, 0])

print(classification_report(y_true, y_pred))`,
    keywords: ["classification_report", "precision recall f1", "分类评估", "support"],
    related: ["sk-confusion-matrix", "sk-roc-auc", "sk-logistic-regression"],
  }),
  createCommand({
    id: "sk-roc-auc",
    library: "sklearn",
    category: "evaluate",
    title: "roc_auc_score()",
    alias: "ROC AUC 评分",
    summary: "适合在二分类概率输出场景里衡量模型排序能力，尤其在阈值未固定时很有用。",
    syntax: "roc_auc_score(y_true, y_score)",
    code: `import numpy as np
from sklearn.metrics import roc_auc_score

y_true = np.array([0, 0, 1, 1, 1])
y_score = np.array([0.12, 0.63, 0.74, 0.88, 0.44])

print(roc_auc_score(y_true, y_score))`,
    keywords: ["roc_auc_score", "AUC", "概率评分", "ranking quality"],
    related: ["sk-classification-report", "sk-confusion-matrix", "sk-logistic-regression"],
  }),
  createCommand({
    id: "sk-silhouette-score",
    library: "sklearn",
    category: "evaluate",
    title: "silhouette_score()",
    alias: "聚类轮廓系数",
    summary: "适合在无监督聚类里比较簇内紧凑度和簇间分离度。",
    syntax: "silhouette_score(X, labels)",
    code: `import numpy as np
from sklearn.metrics import silhouette_score

X = np.array([[1, 20], [2, 22], [3, 25], [20, 80], [21, 82], [22, 84]], dtype=float)
labels = np.array([0, 0, 0, 1, 1, 1])

print(silhouette_score(X, labels))`,
    keywords: ["silhouette_score", "聚类评估", "轮廓系数", "cluster quality"],
    related: ["sk-kmeans", "plt-scatter", "sns-clustermap"],
  }),
  createCommand({
    id: "keras-sequential",
    library: "keras",
    category: "model",
    title: "keras.Sequential()",
    alias: "顺序式神经网络",
    summary: "适合层按顺序堆叠的网络结构，是 Keras 最常见的入门建模方式。",
    syntax: "keras.Sequential([...])",
    code: `import keras

model = keras.Sequential([
    keras.layers.Dense(16, activation="relu", input_shape=(4,)),
    keras.layers.Dense(1, activation="sigmoid"),
])

model.summary()`,
    keywords: ["Sequential", "顺序模型", "neural network", "keras model"],
    related: ["keras-dense", "keras-compile", "keras-fit"],
  }),
  createCommand({
    id: "keras-dense",
    library: "keras",
    category: "model",
    title: "keras.layers.Dense()",
    alias: "全连接层",
    summary: "神经网络中最常见的基础层之一，适合表格特征和分类/回归头部。",
    syntax: 'keras.layers.Dense(32, activation="relu")',
    code: `import keras

layer = keras.layers.Dense(32, activation="relu")
print(layer)`,
    keywords: ["Dense", "全连接层", "units", "activation"],
    related: ["keras-sequential", "keras-dropout", "keras-compile"],
  }),
  createCommand({
    id: "keras-dropout",
    library: "keras",
    category: "model",
    title: "keras.layers.Dropout()",
    alias: "Dropout 正则化层",
    summary: "适合在训练时随机失活一部分神经元，帮助减轻过拟合。",
    syntax: "keras.layers.Dropout(0.3)",
    code: `import keras

model = keras.Sequential([
    keras.layers.Dense(32, activation="relu", input_shape=(4,)),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(1, activation="sigmoid"),
])

model.summary()`,
    keywords: ["Dropout", "正则化", "过拟合", "random deactivate"],
    related: ["keras-dense", "keras-fit", "keras-earlystopping"],
  }),
  createCommand({
    id: "keras-compile",
    library: "keras",
    category: "model",
    title: "model.compile()",
    alias: "配置优化器、损失和指标",
    summary: "训练前必须完成的配置步骤，决定模型如何学习以及如何反馈指标。",
    syntax: 'model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])',
    code: `model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)`,
    keywords: ["compile", "optimizer", "loss", "metrics"],
    related: ["keras-sequential", "keras-fit", "keras-evaluate"],
  }),
  createCommand({
    id: "keras-fit",
    library: "keras",
    category: "model",
    title: "model.fit()",
    alias: "训练神经网络",
    summary: "适合在给定训练数据后真正启动迭代训练，并返回训练历史。",
    syntax: "model.fit(X, y, epochs=10, batch_size=32)",
    code: `history = model.fit(
    X,
    y,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    verbose=0
)

print(history.history.keys())`,
    keywords: ["fit", "训练", "epochs", "batch_size", "history"],
    related: ["keras-compile", "keras-earlystopping", "keras-modelcheckpoint"],
  }),
  createCommand({
    id: "keras-evaluate",
    library: "keras",
    category: "evaluate",
    title: "model.evaluate()",
    alias: "评估模型性能",
    summary: "适合在验证集或测试集上快速输出损失和指标结果。",
    syntax: "model.evaluate(X_test, y_test)",
    code: `loss, acc = model.evaluate(X_test, y_test, verbose=0)
print(loss, acc)`,
    keywords: ["evaluate", "测试集评估", "loss accuracy", "keras metrics"],
    related: ["keras-fit", "keras-predict", "sk-classification-report"],
  }),
  createCommand({
    id: "keras-predict",
    library: "keras",
    category: "evaluate",
    title: "model.predict()",
    alias: "用训练好的模型做预测",
    summary: "适合在训练完成后输出概率、回归值或中间表示。",
    syntax: "model.predict(X_new)",
    code: `pred = model.predict(X_new, verbose=0)
print(pred[:3])`,
    keywords: ["predict", "预测", "inference", "概率输出"],
    related: ["keras-evaluate", "keras-fit", "sk-logistic-regression"],
  }),
  createCommand({
    id: "keras-earlystopping",
    library: "keras",
    category: "evaluate",
    title: "keras.callbacks.EarlyStopping()",
    alias: "提前停止训练",
    summary: "适合在验证集不再改善时自动停止训练，减少过拟合和无效耗时。",
    syntax: 'keras.callbacks.EarlyStopping(monitor="val_loss", patience=3)',
    code: `import keras

callback = keras.callbacks.EarlyStopping(
    monitor="val_loss",
    patience=3,
    restore_best_weights=True
)`,
    keywords: ["EarlyStopping", "提前停止", "patience", "overfitting"],
    related: ["keras-fit", "keras-modelcheckpoint", "keras-evaluate"],
  }),
  createCommand({
    id: "keras-modelcheckpoint",
    library: "keras",
    category: "evaluate",
    title: "keras.callbacks.ModelCheckpoint()",
    alias: "保存最佳模型权重",
    summary: "适合在训练过程中自动保存最优轮次的模型文件。",
    syntax: 'keras.callbacks.ModelCheckpoint("best.keras", save_best_only=True)',
    code: `import keras

checkpoint = keras.callbacks.ModelCheckpoint(
    "best.keras",
    monitor="val_loss",
    save_best_only=True
)`,
    keywords: ["ModelCheckpoint", "保存最优模型", "best weights", "callbacks"],
    related: ["keras-earlystopping", "keras-fit", "keras-predict"],
  }),
  createCommand({
    id: "keras-conv2d",
    library: "keras",
    category: "model",
    title: "keras.layers.Conv2D()",
    alias: "二维卷积层",
    summary: "适合图像或局部空间结构明显的数据，是卷积神经网络的基础层。",
    syntax: 'keras.layers.Conv2D(32, 3, activation="relu")',
    code: `import keras

model = keras.Sequential([
    keras.layers.Conv2D(16, 3, activation="relu", input_shape=(28, 28, 1)),
    keras.layers.Flatten(),
    keras.layers.Dense(10, activation="softmax"),
])

model.summary()`,
    keywords: ["Conv2D", "卷积层", "CNN", "image model"],
    related: ["keras-sequential", "keras-dense", "keras-fit"],
  }),
  createCommand({
    id: "keras-embedding",
    library: "keras",
    category: "text",
    title: "keras.layers.Embedding()",
    alias: "词嵌入层",
    summary: "适合把离散 token id 映射成可训练的稠密向量表示。",
    syntax: "keras.layers.Embedding(input_dim=5000, output_dim=64)",
    code: `import keras

model = keras.Sequential([
    keras.layers.Embedding(input_dim=5000, output_dim=64, input_length=20),
    keras.layers.GlobalAveragePooling1D(),
    keras.layers.Dense(1, activation="sigmoid"),
])

model.summary()`,
    keywords: ["Embedding", "词向量层", "token id", "text model"],
    related: ["keras-lstm", "gen-word2vec", "gen-dictionary"],
  }),
  createCommand({
    id: "keras-lstm",
    library: "keras",
    category: "model",
    title: "keras.layers.LSTM()",
    alias: "LSTM 循环层",
    summary: "适合处理序列数据和上下文依赖，例如文本序列或简单时间序列。",
    syntax: "keras.layers.LSTM(32)",
    code: `import keras

model = keras.Sequential([
    keras.layers.Embedding(input_dim=5000, output_dim=64),
    keras.layers.LSTM(32),
    keras.layers.Dense(1, activation="sigmoid"),
])

model.summary()`,
    keywords: ["LSTM", "序列模型", "RNN", "context"],
    related: ["keras-embedding", "keras-fit", "sm-arima"],
  }),
  createCommand({
    id: "gen-dictionary",
    library: "gensim",
    category: "text",
    title: "corpora.Dictionary()",
    alias: "从文本集合建立词典",
    summary: "把词语映射为整数 id，是 gensim 语料处理链的起点。",
    syntax: "corpora.Dictionary(texts)",
    code: `from gensim import corpora

texts = [["data", "science", "python"], ["topic", "model", "text"]]
dictionary = corpora.Dictionary(texts)

print(dictionary.token2id)`,
    keywords: ["Dictionary", "词典", "token2id", "gensim corpora"],
    related: ["gen-doc2bow", "gen-tfidfmodel", "gen-phrases"],
  }),
  createCommand({
    id: "gen-doc2bow",
    library: "gensim",
    category: "text",
    title: "dictionary.doc2bow()",
    alias: "把文档转成词袋向量",
    summary: "把一篇分词后的文档转成稀疏的 `(token_id, count)` 表示，是主题模型和 TF-IDF 的基础输入。",
    syntax: 'dictionary.doc2bow(["python", "text", "python"])',
    code: `from gensim import corpora

texts = [["data", "science", "python"], ["topic", "model", "text"]]
dictionary = corpora.Dictionary(texts)
bow = dictionary.doc2bow(["python", "text", "python"])

print(bow)`,
    keywords: ["doc2bow", "词袋", "bow", "token count"],
    related: ["gen-dictionary", "gen-tfidfmodel", "gen-ldamodel"],
  }),
  createCommand({
    id: "gen-tfidfmodel",
    library: "gensim",
    category: "text",
    title: "models.TfidfModel()",
    alias: "构建 TF-IDF 模型",
    summary: "适合把原始词频转成更强调区分度的文本权重表示。",
    syntax: "models.TfidfModel(corpus)",
    code: `from gensim import corpora, models

texts = [["data", "science", "python"], ["topic", "model", "text"]]
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]
tfidf = models.TfidfModel(corpus)

print(tfidf[corpus[0]])`,
    keywords: ["TfidfModel", "TF-IDF", "文本权重", "gensim models"],
    related: ["gen-doc2bow", "gen-ldamodel", "gen-similarities-matrixsimilarity"],
  }),
  createCommand({
    id: "gen-ldamodel",
    library: "gensim",
    category: "text",
    title: "models.LdaModel()",
    alias: "训练 LDA 主题模型",
    summary: "适合从语料中学习潜在主题结构，理解文档在不同主题上的分布。",
    syntax: "models.LdaModel(corpus=corpus, id2word=dictionary, num_topics=3)",
    code: `from gensim import corpora, models

texts = [
    ["data", "science", "python"],
    ["topic", "model", "text"],
    ["python", "machine", "learning"],
]
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]
lda = models.LdaModel(corpus=corpus, id2word=dictionary, num_topics=2, passes=10, random_state=7)

print(lda.get_document_topics(corpus[0]))`,
    keywords: ["LdaModel", "主题模型", "num_topics", "document topics"],
    related: ["gen-tfidfmodel", "gen-ldamodel-print-topics", "gen-doc2bow"],
  }),
  createCommand({
    id: "gen-ldamodel-print-topics",
    library: "gensim",
    category: "text",
    title: "lda.print_topics()",
    alias: "查看主题关键词",
    summary: "适合快速查看每个主题由哪些高权重词组成，帮助做人类可解释的主题命名。",
    syntax: "lda.print_topics()",
    code: `topics = lda.print_topics()
for topic in topics:
    print(topic)`,
    keywords: ["print_topics", "主题关键词", "topic words", "LDA explain"],
    related: ["gen-ldamodel", "gen-tfidfmodel", "sns-barplot"],
  }),
  createCommand({
    id: "gen-word2vec",
    library: "gensim",
    category: "text",
    title: "models.Word2Vec()",
    alias: "训练词向量模型",
    summary: "适合学习词语的分布式表示，用于相似词检索和语义邻近分析。",
    syntax: "Word2Vec(sentences=sentences, vector_size=100)",
    code: `from gensim.models import Word2Vec

sentences = [
    ["data", "science"],
    ["machine", "learning"],
    ["deep", "learning"],
    ["science", "model"],
]

model = Word2Vec(sentences=sentences, vector_size=20, window=2, min_count=1, workers=1, epochs=50)
print(model.wv["science"][:5])`,
    keywords: ["Word2Vec", "词向量", "semantic similarity", "embedding"],
    related: ["gen-keyedvectors-most-similar", "keras-embedding", "gen-phrases"],
  }),
  createCommand({
    id: "gen-keyedvectors-most-similar",
    library: "gensim",
    category: "text",
    title: "model.wv.most_similar()",
    alias: "查找语义最相近的词",
    summary: "适合在训练好词向量后快速查看某个词附近的语义邻居。",
    syntax: 'model.wv.most_similar("learning", topn=5)',
    code: `similar_words = model.wv.most_similar("learning", topn=3)
print(similar_words)`,
    keywords: ["most_similar", "相似词", "word vectors", "semantic neighbors"],
    related: ["gen-word2vec", "gen-similarities-matrixsimilarity", "sp-spatial-cdist"],
  }),
  createCommand({
    id: "gen-similarities-matrixsimilarity",
    library: "gensim",
    category: "text",
    title: "similarities.MatrixSimilarity()",
    alias: "建立文档相似度索引",
    summary: "适合在 TF-IDF 或其它向量空间表示上快速比较查询文本与文档集合的相似度。",
    syntax: "similarities.MatrixSimilarity(tfidf[corpus])",
    code: `from gensim import corpora, models, similarities

texts = [["data", "science", "python"], ["topic", "model", "text"], ["python", "machine", "learning"]]
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]
tfidf = models.TfidfModel(corpus)
index = similarities.MatrixSimilarity(tfidf[corpus])
query = dictionary.doc2bow(["python", "science"])

print(index[tfidf[query]])`,
    keywords: ["MatrixSimilarity", "文档相似度", "information retrieval", "tfidf search"],
    related: ["gen-tfidfmodel", "gen-doc2bow", "gen-keyedvectors-most-similar"],
  }),
  createCommand({
    id: "gen-phrases",
    library: "gensim",
    category: "text",
    title: "models.Phrases()",
    alias: "识别多词短语",
    summary: "适合在分词结果中自动发现像 `new_york` 这种高频搭配短语。",
    syntax: "Phrases(sentences, min_count=2, threshold=5)",
    code: `from gensim.models import Phrases

sentences = [
    ["new", "york", "city"],
    ["machine", "learning", "model"],
    ["new", "york", "times"],
]

phrases = Phrases(sentences, min_count=1, threshold=1)
print(list(phrases[sentences]))`,
    keywords: ["Phrases", "短语发现", "bigram", "collocation"],
    related: ["gen-dictionary", "gen-word2vec", "pd-str-extract"],
  }),
]
