export interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
}

export const navigation: NavItem[] = [
  {
    title: "第 1 章 考试介绍及备考攻略",
    items: [
      { title: "1.1 架构师考试的相关情况", href: "/docs/1-1" },
      { title: "1.2 架构师考试备考攻略", href: "/docs/1-2" }
    ]
  },
  {
    title: "第 2 章 系统工程与信息系统基础",
    items: [
      { title: "2.1 系统工程", href: "/docs/2-1" },
      { title: "2.2 信息系统生命周期", href: "/docs/2-2" },
      { title: "2.3 信息系统开发方法", href: "/docs/2-3" },
      { title: "2.4 信息系统的分类", href: "/docs/2-4" },
      { title: "2.5 政府信息化与电子政务", href: "/docs/2-5" },
      { title: "2.6 企业信息化与电子商务", href: "/docs/2-6" },
      { title: "2.7 数字化转型与智能制造", href: "/docs/2-7" }
    ]
  },
  {
    title: "第 3 章 软件工程",
    items: [
      { title: "3.1 软件过程模型", href: "/docs/3-1" },
      { title: "3.2 基于构件的软件工程", href: "/docs/3-2" },
      { title: "3.3 统一过程", href: "/docs/3-3" },
      { title: "3.4 敏捷方法", href: "/docs/3-4" },
      { title: "3.5 逆向工程", href: "/docs/3-5" },
      { title: "3.6 净室软件工程", href: "/docs/3-6" },
      { title: "3.7 需求工程", href: "/docs/3-7" },
      { title: "3.8 系统分析与设计", href: "/docs/3-8" },
      { title: "3.9 软件测试", href: "/docs/3-9" },
      { title: "3.10 系统运行与软件维护", href: "/docs/3-10" }
    ]
  },
  {
    title: "第 4 章 项目管理",
    items: [
      { title: "4.1 盈亏平衡分析", href: "/docs/4-1" },
      { title: "4.2 进度管理", href: "/docs/4-2" },
      { title: "4.3 软件质量管理", href: "/docs/4-3" },
      { title: "4.4 软件配置管理", href: "/docs/4-4" }
    ]
  },
  {
    title: "第 5 章 软件架构设计",
    items: [
      { title: "5.1 软件架构的概念", href: "/docs/5-1" },
      { title: "5.2 基于架构的软件开发", href: "/docs/5-2" },
      { title: "5.3 软件架构风格", href: "/docs/5-3" },
      { title: "5.4 特定领域软件架构", href: "/docs/5-4" },
      { title: "5.5 软件质量属性", href: "/docs/5-5" },
      { title: "5.6 软件架构评估", href: "/docs/5-6" },
      { title: "5.7 构件与中间件技术", href: "/docs/5-7" },
      { title: "5.8 层次型软件架构风格", href: "/docs/5-8" },
      { title: "5.9 面向服务的软件架构风格", href: "/docs/5-9" },
      { title: "5.10 云原生架构风格", href: "/docs/5-10" },
      { title: "5.11 大型网站系统架构演化", href: "/docs/5-11" }
    ]
  },
  {
    title: "第 6 章 系统可靠性分析与设计",
    items: [
      { title: "6.1 可靠性相关基本概念", href: "/docs/6-1" },
      { title: "6.2 系统可靠性分析", href: "/docs/6-2" },
      { title: "6.3 软件可靠性设计", href: "/docs/6-3" }
    ]
  },
  {
    title: "第 7 章 信息安全技术基础知识",
    items: [
      { title: "7.1 信息安全基础", href: "/docs/7-1" },
      { title: "7.2 信息加解密技术", href: "/docs/7-2" },
      { title: "7.3 访问控制及数字签名技术", href: "/docs/7-3" },
      { title: "7.4 密钥管理技术", href: "/docs/7-4" },
      { title: "7.5 信息安全的保障体系", href: "/docs/7-5" }
    ]
  },
  {
    title: "第 8 章 计算机系统基础",
    items: [
      { title: "8.1 计算机系统组成", href: "/docs/8-1" },
      { title: "8.2 操作系统概述", href: "/docs/8-2" },
      { title: "8.3 进程管理", href: "/docs/8-3" },
      { title: "8.4 存储管理", href: "/docs/8-4" },
      { title: "8.5 磁盘管理", href: "/docs/8-5" },
      { title: "8.6 文件系统", href: "/docs/8-6" },
      { title: "8.7 系统配置与性能评价", href: "/docs/8-7" }
    ]
  },
  {
    title: "第 9 章 嵌入式技术",
    items: [
      { title: "9.1 嵌入式系统概述", href: "/docs/9-1" },
      { title: "9.2 嵌入式硬件", href: "/docs/9-2" },
      { title: "9.3 嵌入式操作系统", href: "/docs/9-3" },
      { title: "9.4 嵌入式数据库", href: "/docs/9-4" },
      { title: "9.5 嵌入式软件开发", href: "/docs/9-5" }
    ]
  },
  {
    title: "第 10 章 计算机网络",
    items: [
      { title: "10.1 通信系统架构", href: "/docs/10-1" },
      { title: "10.2 组网技术", href: "/docs/10-2" },
      { title: "10.3 TCP/IP协议族", href: "/docs/10-3" },
      { title: "10.4 网络规划与设计", href: "/docs/10-4" }
    ]
  },
  {
    title: "第 11 章 数据库系统",
    items: [
      { title: "11.1 数据库模式", href: "/docs/11-1" },
      { title: "11.2 分布式数据库", href: "/docs/11-2" },
      { title: "11.3 数据库设计阶段", href: "/docs/11-3" },
      { title: "11.4 概念结构设计-ER模型", href: "/docs/11-4" },
      { title: "11.5 逻辑结构设计-关系模式", href: "/docs/11-5" },
      { title: "11.6 关系代数", href: "/docs/11-6" },
      { title: "11.7 规范化理论", href: "/docs/11-7" },
      { title: "11.8 并发控制", href: "/docs/11-8" },
      { title: "11.9 数据库的安全性", href: "/docs/11-9" },
      { title: "11.10 数据库性能优化", href: "/docs/11-10" }
    ]
  },
  {
    title: "第 12 章 未来信息综合技术",
    items: [
      { title: "12.1 信息物理系统 CPS", href: "/docs/12-1" },
      { title: "12.2 人工智能技术", href: "/docs/12-2" },
      { title: "12.3 机器人技术", href: "/docs/12-3" },
      { title: "12.4 数字孪生体技术", href: "/docs/12-4" },
      { title: "12.5 大数据技术", href: "/docs/12-5" }
    ]
  },
  {
    title: "第 13 章 知识产权与标准化",
    items: [
      { title: "13.1 保护范围与对象", href: "/docs/13-1" },
      { title: "13.2 保护期限", href: "/docs/13-2" },
      { title: "13.3 知识产权人确定", href: "/docs/13-3" },
      { title: "13.4 侵权判断", href: "/docs/13-4" },
      { title: "13.5 标准化", href: "/docs/13-5" }
    ]
  },
  {
    title: "第 14 章 案例特训专题",
    items: [
      { title: "14.1 考纲分析", href: "/docs/14-1" },
      { title: "14.2 历年试题分析", href: "/docs/14-2" },
      { title: "14.3 如何解答试题", href: "/docs/14-3" }
    ]
  },
  {
    title: "第 15 章 论文写作技巧篇",
    items: [
      { title: "15.1 考试大纲+考情分析", href: "/docs/15-1" },
      { title: "15.2 备考策略", href: "/docs/15-2" },
      { title: "15.3 论文写作四部曲", href: "/docs/15-3" },
      { title: "15.4 论文写作准则", href: "/docs/15-4" }
    ]
  }
]
