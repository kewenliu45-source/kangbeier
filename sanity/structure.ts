import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("内容管理")
    .items([
      // ════════════════════════════════════════
      // 网站设置
      // ════════════════════════════════════════
      S.listItem()
        .title("⚙️ 网站设置")
        .child(
          S.list()
            .title("网站设置")
            .items([
              S.listItem()
                .title("网站设置")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                ),
              S.listItem()
                .title("联系方式")
                .child(
                  S.document()
                    .schemaType("contactInfo")
                    .documentId("contactInfo")
                ),
              S.listItem()
                .title("页面 SEO")
                .child(
                  S.list()
                    .title("页面 SEO")
                    .items([
                      S.listItem()
                        .title("首页 SEO")
                        .child(
                          S.document()
                            .schemaType("pageSeo")
                            .documentId("pageSeo-home")
                            .title("首页 SEO")
                        ),
                      S.listItem()
                        .title("服务页 SEO")
                        .child(
                          S.document()
                            .schemaType("pageSeo")
                            .documentId("pageSeo-services")
                            .title("服务页 SEO")
                        ),
                      S.listItem()
                        .title("优势页 SEO")
                        .child(
                          S.document()
                            .schemaType("pageSeo")
                            .documentId("pageSeo-advantages")
                            .title("优势页 SEO")
                        ),
                      S.listItem()
                        .title("科普页 SEO")
                        .child(
                          S.document()
                            .schemaType("pageSeo")
                            .documentId("pageSeo-knowledge")
                            .title("科普页 SEO")
                        ),
                      S.listItem()
                        .title("联系页 SEO")
                        .child(
                          S.document()
                            .schemaType("pageSeo")
                            .documentId("pageSeo-contact")
                            .title("联系页 SEO")
                        ),
                    ])
                ),
            ])
        ),

      // ════════════════════════════════════════
      // 页面内容
      // ════════════════════════════════════════
      S.listItem()
        .title("📄 页面内容")
        .child(
          S.list()
            .title("页面内容")
            .items([
              S.listItem()
                .title("全部 Banner")
                .child(
                  S.documentList()
                    .title("全部 Banner")
                    .filter('_type == "banner"')
                    .defaultOrdering([
                      { field: "position", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("首页 Banner")
                .child(
                  S.documentList()
                    .title("首页 Banner")
                    .filter('_type == "banner" && position == "homeHero"')
                ),
              S.listItem()
                .title("服务页 Banner")
                .child(
                  S.documentList()
                    .title("服务页 Banner")
                    .filter('_type == "banner" && position == "servicesHero"')
                ),
              S.listItem()
                .title("优势页 Banner")
                .child(
                  S.documentList()
                    .title("优势页 Banner")
                    .filter('_type == "banner" && position == "advantagesHero"')
                ),
              S.listItem()
                .title("科普页 Banner")
                .child(
                  S.documentList()
                    .title("科普页 Banner")
                    .filter('_type == "banner" && position == "knowledgeHero"')
                ),
              S.listItem()
                .title("联系页 Banner")
                .child(
                  S.documentList()
                    .title("联系页 Banner")
                    .filter('_type == "banner" && position == "contactHero"')
                ),
              // 首页内容 — 后续 homePage schema 创建后启用
              // S.listItem()
              //   .title("首页内容")
              //   .child(
              //     S.document().schemaType("homePage").documentId("homePage")
              //   ),
            ])
        ),

      // ════════════════════════════════════════
      // 服务
      // ════════════════════════════════════════
      S.listItem()
        .title("🏥 服务")
        .child(
          S.list()
            .title("服务")
            .items([
              S.listItem()
                .title("全部服务")
                .child(
                  S.documentList()
                    .title("全部服务")
                    .filter('_type == "service"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("首页精选服务")
                .child(
                  S.documentList()
                    .title("首页精选服务")
                    .filter('_type == "service" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .title("全部优势")
                .child(
                  S.documentList()
                    .title("全部优势")
                    .filter('_type == "advantage"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("首页展示优势")
                .child(
                  S.documentList()
                    .title("首页展示优势")
                    .filter('_type == "advantage" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .title("全部案例")
                .child(
                  S.documentList()
                    .title("全部案例")
                    .filter('_type == "case"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("首页展示案例")
                .child(
                  S.documentList()
                    .title("首页展示案例")
                    .filter('_type == "case" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),

      // ════════════════════════════════════════
      // 科普
      // ════════════════════════════════════════
      S.listItem()
        .title("📚 科普")
        .child(
          S.list()
            .title("科普")
            .items([
              S.listItem()
                .title("文章分类")
                .child(
                  S.documentList()
                    .title("文章分类")
                    .filter('_type == "articleCategory"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .title("全部文章")
                .child(
                  S.documentList()
                    .title("全部文章")
                    .filter('_type == "article"')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("首页精选文章")
                .child(
                  S.documentList()
                    .title("首页精选文章")
                    .filter('_type == "article" && isFeatured == true')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .title("全部视频")
                .child(
                  S.documentList()
                    .title("全部视频")
                    .filter('_type == "video"')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("首页精选视频")
                .child(
                  S.documentList()
                    .title("首页精选视频")
                    .filter('_type == "video" && isFeatured == true')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .title("常见问题")
                .child(
                  S.documentList()
                    .title("常见问题")
                    .filter('_type == "faq"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),

      // ════════════════════════════════════════
      // 转化内容
      // ════════════════════════════════════════
      S.listItem()
        .title("🎯 转化内容")
        .child(
          S.list()
            .title("转化内容")
            .items([
              S.listItem()
                .title("首页展示 FAQ")
                .child(
                  S.documentList()
                    .title("首页展示 FAQ")
                    .filter('_type == "faq" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("联系方式")
                .child(
                  S.document()
                    .schemaType("contactInfo")
                    .documentId("contactInfo")
                ),
              // 后续 CTA schema 创建后启用
              // S.listItem()
              //   .title("CTA 管理")
              //   .child(
              //     S.documentList()
              //       .title("CTA 管理")
              //       .filter('_type == "cta"')
              //   ),
            ])
        ),
    ]);
