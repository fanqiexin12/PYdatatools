const libraryMeta = {
  all: { label: "全部库", note: "一起检索" },
  pandas: { label: "pandas", note: "表格处理" },
  numpy: { label: "numpy", note: "数值计算" },
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
]

const createCommand = ({ when, tips, keywords, related, ...rest }) => ({
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
    related: ["pd-concat", "pd-drop-duplicates", "pd-groupby-agg"],
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
]
