import Link from "next/link";

const navItems = [
  { label: "首页", href: "/" },
  { label: "服务项目", href: "/services" },
  { label: "试管优势", href: "/advantages" },
  { label: "科普中心", href: "/knowledge" },
  { label: "联系我们", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground">康贝儿</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              专业的生殖健康服务平台
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">快速导航</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">联系方式</h4>
            <p className="text-sm text-muted-foreground">
              电话：400-XXX-XXXX
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              邮箱：info@kangbeier.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 康贝儿. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
