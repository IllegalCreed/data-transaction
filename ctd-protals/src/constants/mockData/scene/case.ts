import type { IScene } from '@/types/scene'

export const cases: IScene[] = [
  {
    id: 1,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '虽然市场对 AI 的应用还在不断增长，不过各种数据也显示，5 月份后，直接访问 OpenAI 网站的流量一直在下降，Similarweb 的流量统计截至 7 月份下降了 21%。而 Datos 最新的一个统计显示下降幅度达到了 29%，不过要说明的是这里只是统计了 openai.com 网站的流量，那些通过 API 的第三方和移动端数据没有做统计。',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    bannerUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    link: 'https://www.baidu.com',
    content: `
      <div>
        <p>通过 C 端与 B 端的共同发力，<strong>OpenAI 已经接近突破 10 亿美金的 ARR</strong>，比去年增长了 37 倍，并且这两天还推出了 ChatGPT 的企业版，估计会加速整个商业化的进程。</p>
        <p>虽然市场对 AI 的应用还在不断增长，不过各种数据也显示，5 月份后，直接访问 OpenAI 网站的流量一直在下降，Similarweb 的流量统计截至 7 月份下降了 21%。而 Datos 最新的一个统计显示<strong>下降幅度达到了 29%</strong>，不过要说明的是这里只是统计了 openai.com 网站的流量，那些通过 API 的第三方和移动端数据没有做统计。</p>
        <p><img style="width:100%;" src="https://simg.baai.ac.cn/hubview/e5d9c830b4ecbfffcc5446f0ae08a1a7.png"></p>
        <p>对此有多种解释，<strong>一种是专业和常规使用的用户没有怎么变并且还在增长，但是那些只是单纯体验一下没有特别需求的用户在下降；另一个解释则是之前大量用户来自学校的教育领域，这段时间正是学校的放假期间，因而出现了大幅度下降。</strong></p>
        <p>不过通过更为细致的研究，特别是针对来自每个设备的访问次数的统计，基本上排除了第一种假设，如下图所示，无论是偶尔使用的用户还是经常使用的用户，都在下降：</p>
        <p><img style="width:100%;" src="https://simg.baai.ac.cn/hubview/8b17cdef41384b83ab01c7d7db7bc332.png" ></p>
        <p>对于第二个假设，Datos 通过对 7000 多个真实 ChatGPT 用户做了一个更加细致的数据统计，筛掉一些不靠谱的用户后得到了 4098 个最真实的用户数据，下图是使用 prompt 量的一个统计数据，使用 5 个或者以上或者仅使用 1 个 prompt 的占据了快 70%。</p>
        <p><img style="width:50%;" src="https://simg.baai.ac.cn/hubview/9149297369b4405a6a31e6fc47cf1043.png"></p>
        <p>如果再细分的看这些用户都拿 ChatGPT 做啥，可以看到最大的几个应用场景：</p>
        <ul>
        <li>
        <p>排在第一位的是编程，占了快 30%；</p>
        </li>
        <li>
        <p>其次是教育，占了 23.3%</p>
        </li>
        <li>
        <p>第三位则是内容相关，占了快 21%</p>
        </li>
        <li>
        <p>第四位是销售与市场，占据 13.47%</p>
        </li>
        </ul>
        <p>需要注意的是，这里的教育既包括了中小学里的教育，也包含了个人兴趣的知识学习和以工作为目的的专业知识学习。</p>
        <p><img style="width:50%;" src="https://simg.baai.ac.cn/hubview/af55e2152d349e83423c2b0a22909542.png"></p>
        <p>内容和下面的营销与销售也有重叠的地方，如果把这块做更加的细分，那么大概排名是下面的一个情况，<strong>编程仍然是第一，其次是专业教育、专业的内容创作、市场营销以及个人内容创作。</strong></p>
        <p><img style="width:100%;" src="https://simg.baai.ac.cn/hubview/84768f329b462283e644ada8f6eff84a.png"></p>
        <p>由于与学校教育相关的应用场景只占到了不到 10%，因此因为学校放假而导致 ChatGPT 访问下降 29%似乎也说不通。下面是用户使用 ChatGPT 的一些关键词排名，<strong>前三位分别是 Write、Create 和 List</strong>，从这也能看到为何有那么多的 AI 插件类产品都在针对写作相关的应用场景。</p>
        <p><img style="width:100%;" src="https://simg.baai.ac.cn/hubview/58fa99a7e9078e081f17dbf6ccbf0546.png"></p>
        <p>其它一些场景比例虽然看起来比较低，但是以 ChatGPT 目前的月活量，<strong>任何一个小比例的应用场景也有大量的用户需求</strong>，比方说 SEO 这个关键词的比例虽然只有 2.39%，如果以几个月前公布的 ChatGPT 的 1 亿 MAU 来算，那一个月也有 200 多万的 MAU，仍然是一个不小的事情。</p>
        <p>尽管移动端以及第三方的 API 可能都会对整体 ChatGPT 网站的流量有不少分流，不过 29%这么大的降幅似乎也不能用它们来解释。我理解整体肯定有一定幅度的下降，但其它因素也分流了部分流量。</p>
        <p>不过这个报告展示的前几个应用场景，我们确实能感受得非常明显，编程就不说了；在教育这块，OpenAI 或许也感受到了巨大的需求，今天正式发布了一个针对教育领域的 ChatGPT 使用指南<span style="color: #888888;">（Teaching with AI）</span>。</p>
        <p>在这个指南里，包括了建议的 propmts 提示词、ChatGPT 工作原理和局限性的解释、AI 检测和偏见。</p>
        <p>在老师如何使用 ChatGPT 这块，OpenAI 给出了几个场景：角色扮演具有挑战性的对话、从课程材料来做测验、测试和教案、减少非英语学生的学习摩擦、以及如何教学生具有批判性思维。并且还提供了一些入门的提示词<span style="color: #888888;">（prompt）</span>案例。</p>
        <p>另外，OpenAI 之前投资的 AI 学习英语的Speak，刚刚宣布完成了 1600万美金的 B2 轮融资，使其总融资额达到了6300 万美金。由天使投资人 Lachy Groom 领投，Dropbox 的联合创始人 Drew Houston 和 Arash Ferdowsi等跟投。Speak 想打造一个 AI 版的 Duolingo，具体详情可以查看我之前的介绍《<a href="http://mp.weixin.qq.com/s?__biz=MzIyMDA3MjMwNw==&amp;mid=2455850319&amp;idx=1&amp;sn=0b7128ae2aaff30e85475007b21113cc&amp;chksm=80447d53b733f44561badf2b689a0002467d5de45f1b6da14d6b247ca3283ca339b6d12bf156&amp;scene=21#wechat_redirect" target="_blank" rel="noopener" data-itemshowtype="0" data-linktype="2">OpenAI 和 Funders Fund一起投了一个 AI 版 Duolingo</a>》。</p>
      </div>
    `
  },
  {
    id: 2,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    bannerUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 3,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '测试场景描述，测试场景描述，测试场景描述，测试场景描述,测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    bannerUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 4,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    bannerUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 5,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '测试场景描述，测试场景描述，测试场景描述，测试场景描述,测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    bannerUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 6,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    bannerUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 7,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '测试场景描述，测试场景描述，测试场景描述，测试场景描述,测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    bannerUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    id: 8,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    bannerUrl: new URL('@/assets/placeholder/productDefault.png', import.meta.url).href,
    link: 'https://www.baidu.com'
  }
]
