import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("内容管理")
    .items([
      // ── 全局设置 ──
      S.listItem()
        .id("site-settings")
        .title("网站设置")
        .child(
          S.document()
            .id("site-settings-doc")
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .views([S.view.form()])
        ),
      S.listItem()
        .id("contact-info")
        .title("联系方式")
        .child(
          S.document()
            .id("contact-info-doc")
            .schemaType("contactInfo")
            .documentId("contactInfo")
            .views([S.view.form()])
        ),
      S.listItem()
        .id("layout-config")
        .title("布局配置")
        .child(
          S.document()
            .id("layout-config-doc")
            .schemaType("layoutConfig")
            .documentId("layoutConfig")
            .views([S.view.form()])
        ),
      S.divider(),

      // ── 页面配置 ──
      S.listItem()
        .id("page-config")
        .title("页面配置")
        .child(
          S.list()
            .id("page-config-list")
            .title("页面配置")
            .items([
              S.listItem()
                .id("page-config-home")
                .title("首页配置")
                .child(
                  S.document()
                    .id("page-config-home-doc")
                    .schemaType("homePageConfig")
                    .documentId("homePageConfig")
                    .title("首页配置")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-config-contact")
                .title("联系页配置")
                .child(
                  S.document()
                    .id("page-config-contact-doc")
                    .schemaType("contactPageConfig")
                    .documentId("contactPageConfig")
                    .title("联系页配置")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-config-advantages")
                .title("优势页配置")
                .child(
                  S.document()
                    .id("page-config-advantages-doc")
                    .schemaType("advantagesPageConfig")
                    .documentId("advantagesPageConfig")
                    .title("优势页配置")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-config-services")
                .title("服务页配置")
                .child(
                  S.document()
                    .id("page-config-services-doc")
                    .schemaType("servicesPageConfig")
                    .documentId("servicesPageConfig")
                    .title("服务页配置")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-config-knowledge")
                .title("科普页配置")
                .child(
                  S.document()
                    .id("page-config-knowledge-doc")
                    .schemaType("knowledgePageConfig")
                    .documentId("knowledgePageConfig")
                    .title("科普页配置")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-config-consultation-form")
                .title("咨询表单配置")
                .child(
                  S.document()
                    .id("page-config-consultation-form-doc")
                    .schemaType("consultationFormConfig")
                    .documentId("consultationFormConfig")
                    .title("咨询表单配置")
                    .views([S.view.form()])
                ),
            ])
        ),

      // ── 页面 SEO ──
      S.listItem()
        .id("page-seo")
        .title("页面 SEO")
        .child(
          S.list()
            .id("page-seo-list")
            .title("页面 SEO")
            .items([
              S.listItem()
                .id("page-seo-home")
                .title("首页 SEO")
                .child(
                  S.document()
                    .id("page-seo-home-doc")
                    .schemaType("pageSeo")
                    .documentId("pageSeo-home")
                    .title("首页 SEO")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-seo-services")
                .title("服务页 SEO")
                .child(
                  S.document()
                    .id("page-seo-services-doc")
                    .schemaType("pageSeo")
                    .documentId("pageSeo-services")
                    .title("服务页 SEO")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-seo-advantages")
                .title("优势页 SEO")
                .child(
                  S.document()
                    .id("page-seo-advantages-doc")
                    .schemaType("pageSeo")
                    .documentId("pageSeo-advantages")
                    .title("优势页 SEO")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-seo-knowledge")
                .title("科普页 SEO")
                .child(
                  S.document()
                    .id("page-seo-knowledge-doc")
                    .schemaType("pageSeo")
                    .documentId("pageSeo-knowledge")
                    .title("科普页 SEO")
                    .views([S.view.form()])
                ),
              S.listItem()
                .id("page-seo-contact")
                .title("联系页 SEO")
                .child(
                  S.document()
                    .id("page-seo-contact-doc")
                    .schemaType("pageSeo")
                    .documentId("pageSeo-contact")
                    .title("联系页 SEO")
                    .views([S.view.form()])
                ),
            ])
        ),

      // ── Banner 管理 ──
      S.listItem()
        .id("banner-management")
        .title("Banner 管理")
        .child(
          S.list()
            .id("banner-list")
            .title("Banner 管理")
            .items([
              S.listItem()
                .id("banner-home-hero")
                .title("首页 Banner")
                .child(
                  S.documentList()
                    .id("banner-home-hero-list")
                    .title("首页 Banner")
                    .filter('_type == "banner" && position == "homeHero"')
                ),
              S.listItem()
                .id("banner-services-hero")
                .title("服务页 Banner")
                .child(
                  S.documentList()
                    .id("banner-services-hero-list")
                    .title("服务页 Banner")
                    .filter('_type == "banner" && position == "servicesHero"')
                ),
              S.listItem()
                .id("banner-advantages-hero")
                .title("优势页 Banner")
                .child(
                  S.documentList()
                    .id("banner-advantages-hero-list")
                    .title("优势页 Banner")
                    .filter('_type == "banner" && position == "advantagesHero"')
                ),
              S.listItem()
                .id("banner-knowledge-hero")
                .title("科普页 Banner")
                .child(
                  S.documentList()
                    .id("banner-knowledge-hero-list")
                    .title("科普页 Banner")
                    .filter('_type == "banner" && position == "knowledgeHero"')
                ),
              S.listItem()
                .id("banner-contact-hero")
                .title("联系页 Banner")
                .child(
                  S.documentList()
                    .id("banner-contact-hero-list")
                    .title("联系页 Banner")
                    .filter('_type == "banner" && position == "contactHero"')
                ),
            ])
        ),

      // ── 服务管理 ──
      S.listItem()
        .id("services")
        .title("服务管理")
        .child(
          S.list()
            .id("services-list")
            .title("服务管理")
            .items([
              S.listItem()
                .id("services-all")
                .title("全部服务")
                .child(
                  S.documentList()
                    .id("services-all-list")
                    .title("全部服务")
                    .filter('_type == "service"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .id("services-featured")
                .title("首页精选服务")
                .child(
                  S.documentList()
                    .id("services-featured-list")
                    .title("首页精选服务")
                    .filter('_type == "service" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),

      // ── 优势管理 ──
      S.listItem()
        .id("advantages")
        .title("优势管理")
        .child(
          S.list()
            .id("advantages-list")
            .title("优势管理")
            .items([
              S.listItem()
                .id("advantages-all")
                .title("全部优势")
                .child(
                  S.documentList()
                    .id("advantages-all-list")
                    .title("全部优势")
                    .filter('_type == "advantage"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .id("advantages-featured")
                .title("首页展示优势")
                .child(
                  S.documentList()
                    .id("advantages-featured-list")
                    .title("首页展示优势")
                    .filter('_type == "advantage" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),

      // ── 案例管理 ──
      S.listItem()
        .id("cases")
        .title("案例管理")
        .child(
          S.list()
            .id("cases-list")
            .title("案例管理")
            .items([
              S.listItem()
                .id("cases-all")
                .title("全部案例")
                .child(
                  S.documentList()
                    .id("cases-all-list")
                    .title("全部案例")
                    .filter('_type == "case"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .id("cases-featured")
                .title("首页展示案例")
                .child(
                  S.documentList()
                    .id("cases-featured-list")
                    .title("首页展示案例")
                    .filter('_type == "case" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),

      // ── 常见问题 ──
      S.listItem()
        .id("faq")
        .title("常见问题")
        .child(
          S.list()
            .id("faq-list")
            .title("常见问题")
            .items([
              S.listItem()
                .id("faq-all")
                .title("全部问题")
                .child(
                  S.documentList()
                    .id("faq-all-list")
                    .title("全部问题")
                    .filter('_type == "faq"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .id("faq-featured")
                .title("首页展示问题")
                .child(
                  S.documentList()
                    .id("faq-featured-list")
                    .title("首页展示问题")
                    .filter('_type == "faq" && isFeatured == true')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
            ])
        ),

      // ── 科普管理 ──
      S.listItem()
        .id("knowledge")
        .title("科普管理")
        .child(
          S.list()
            .id("knowledge-list")
            .title("科普管理")
            .items([
              S.listItem()
                .id("articles-all")
                .title("全部文章")
                .child(
                  S.documentList()
                    .id("articles-all-list")
                    .title("全部文章")
                    .filter('_type == "article"')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .id("articles-featured")
                .title("首页精选文章")
                .child(
                  S.documentList()
                    .id("articles-featured-list")
                    .title("首页精选文章")
                    .filter('_type == "article" && isFeatured == true')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .id("article-categories")
                .title("文章分类")
                .child(
                  S.documentList()
                    .id("article-categories-list")
                    .title("文章分类")
                    .filter('_type == "articleCategory"')
                    .defaultOrdering([
                      { field: "sortOrder", direction: "asc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .id("videos-all")
                .title("全部视频")
                .child(
                  S.documentList()
                    .id("videos-all-list")
                    .title("全部视频")
                    .filter('_type == "video"')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .id("videos-featured")
                .title("首页精选视频")
                .child(
                  S.documentList()
                    .id("videos-featured-list")
                    .title("首页精选视频")
                    .filter('_type == "video" && isFeatured == true')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
            ])
        ),

      // ── 咨询线索 ──
      S.listItem()
        .id("consultation-leads")
        .title("咨询线索")
        .child(
          S.list()
            .id("consultation-leads-list")
            .title("咨询线索")
            .items([
              S.listItem()
                .id("consultation-leads-all")
                .title("全部线索")
                .child(
                  S.documentList()
                    .id("consultation-leads-all-list")
                    .title("全部线索")
                    .filter('_type == "consultationLead"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .id("consultation-leads-new")
                .title("新线索")
                .child(
                  S.documentList()
                    .id("consultation-leads-new-list")
                    .title("新线索")
                    .filter(
                      '_type == "consultationLead" && status == "new"'
                    )
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .id("consultation-leads-contacted")
                .title("已联系")
                .child(
                  S.documentList()
                    .id("consultation-leads-contacted-list")
                    .title("已联系")
                    .filter(
                      '_type == "consultationLead" && status == "contacted"'
                    )
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
            ])
        ),
      S.divider(),

      // ── 内容文档 ──
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "siteSettings",
            "layoutConfig",
            "homePageConfig",
            "contactPageConfig",
            "advantagesPageConfig",
            "servicesPageConfig",
            "knowledgePageConfig",
            "consultationFormConfig",
            "pageSeo",
            "banner",
            "service",
            "advantage",
            "case",
            "articleCategory",
            "article",
            "video",
            "faq",
            "contactInfo",
            "consultationLead",
          ].includes(listItem.getId() ?? "")
      ),
    ]);
