执行每日AI论文解读自动更新任务：

1. 进入项目目录：cd "/Users/yangjielei/Library/Application Support/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a49ec3fdfbfbc3d3d55a33b"
2. 先执行 git pull 拉取最新代码避免冲突
3. 访问 https://arxiv.org/list/cs.AI/recent 或 https://arxiv.org/list/cs.CL/recent 或 https://arxiv.org/list/cs.LG/recent 获取最新AI论文列表
4. 选择一篇尚未解读过的论文（检查 papers/ 目录下已有文件和 papers-manifest.json 中已登记的论文，避免重复）
5. 为论文确定一个唯一 slug 标识符（如 cosmos3、attention-is-all-you-need，小写短横线连接）
6. 调用 paper-html5-card-explainer skill 为选中的论文生成 HTML5 卡片解读页面，遵循以下规范：
   - HTML 文件保存到 papers/ 目录，文件名格式：<SlugName>-paper-cards.html（如 Cosmos3-paper-cards.html）
   - 论文图片资源保存到 paper-assets/<slug>/ 目录（如 paper-assets/cosmos3/），包括 crop-plan.json 和所有裁剪图片
   - HTML 中所有图片 src 必须使用相对路径 ../paper-assets/<slug>/<asset-name>.png（因为 HTML 在 papers/ 下，图片在 paper-assets/<slug>/ 下）
   - HTML 必须包含站点导航头（site-header），包含返回首页、论文解读（active）、博客、关于我的链接，链接使用相对路径 ../index.html、../papers.html、../blog.html、../about.html
   - HTML 必须包含返回论文列表的链接（<a href="../papers.html" class="back-link">），放在页面顶部 hero 区域之前
   - 导航栏（.nav）的 top 值设为 56px（避免被站点导航头遮挡），section 的 scroll-margin-top 设为 152px
   - thumbnail 缩略图使用 text_to_image API 生成
7. 在 papers-manifest.json 数组中追加新论文条目（不要修改 js/data.js），格式如下：
   {
     "id": "paper-<slug>",
     "htmlFile": "<SlugName>-paper-cards.html",
     "title": "论文完整标题",
     "authors": ["作者1", "作者2"],
     "venue": "会议/期刊",
     "year": 2026,
     "tags": ["标签1", "标签2"],
     "thumbnail": "text_to_image API 生成的缩略图 URL",
     "abstract": "论文摘要"
   }
8. 执行 git add -A
9. 执行 git commit -m "feat: 每日论文解读 - <论文标题>"
10. 执行 git push origin main 推送到 GitHub
11. 推送完成后输出结果报告，告知本次解读了哪篇论文以及访问链接

注意事项：
- 如果 git pull 有冲突则中止任务并报告
- 图片资源目录必须按论文 slug 隔离到 paper-assets/<slug>/ 下，绝不能直接放在 paper-assets/ 根目录，避免多篇论文同名文件互相覆盖
- HTML 中图片路径必须是 ../paper-assets/<slug>/xxx.png，不能是 paper-assets/xxx.png（后者会导致浏览器从 papers/paper-assets/ 查找，路径错误）
- 新论文元数据注册到 papers-manifest.json，不要修改 js/data.js（data.js 中的硬编码论文由列表页 renderPaperCards() 自动与 manifest 合并渲染）
- 如果 arXiv 访问失败则尝试选取一篇已在 data.js 中有数据但尚未创建独立 HTML 的论文作为补充
- 如果 paper-html5-card-explainer skill 生成的 HTML 缺少站点导航头或返回链接，需手动补充