import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/admin/PageHeader";
import { useAdminLang } from "@/lib/admin-i18n";
import { toast } from "sonner";
import { Upload, Plus, Trash2, Loader2, Globe } from "lucide-react";
import {
  defaultFooterConfig,
  loadFooterConfig,
  saveFooterConfig,
  type FooterConfig,
  type FooterColumn,
  type FooterLink,
} from "@/lib/admin-footer";
import { getHeroImageUrl, uploadHeroImage } from "@/lib/hero-image";
import { getSectionImageUrl, uploadSectionImage } from "@/lib/section-image";
import {
  defaultSectionsContent,
  loadSiteContent,
  saveAllSectionsContent,
  type SectionContent,
} from "@/lib/site-content";

export const Route = createFileRoute("/admin/_authed/content")({
  component: ContentPage,
});

export function ContentPage() {
  const { t } = useAdminLang();
  const [data, setData] = useState<Record<string, SectionContent>>(defaultSectionsContent);
  const [footer, setFooter] = useState<FooterConfig>(defaultFooterConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contentLang, setContentLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    async function init() {
      try {
        setFooter(loadFooterConfig());
        const content = await loadSiteContent();
        
        // Fetch hero & section images
        const heroUrl = await getHeroImageUrl().catch(() => null);
        if (heroUrl) {
          content.home = { ...(content.home || defaultSectionsContent.home), image: heroUrl };
        }

        const sectionKeys = ["about", "whyUs", "process", "contact", "products", "markets", "certificate", "news"] as const;
        for (const key of sectionKeys) {
          const imgUrl = await getSectionImageUrl(key).catch(() => null);
          if (imgUrl && content[key]) {
            content[key] = { ...content[key], image: imgUrl };
          }
        }

        setData(content);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const update = (key: string, field: keyof SectionContent, value: string) => {
    setData((d) => ({
      ...d,
      [key]: {
        ...(d[key] ?? defaultSectionsContent[key] ?? { id: key }),
        [field]: value,
      },
    }));
  };

  const uploadImage = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (key === "home") {
      const err = await uploadHeroImage(f);
      if (err) {
        toast.error(err);
        return;
      }
      const url = await getHeroImageUrl();
      if (url) update("home", "image", url);
      toast.success("Hero image updated — it now shows on the homepage");
      return;
    }
    const err = await uploadSectionImage(key, f);
    if (err) {
      toast.error(err);
      return;
    }
    const url = await getSectionImageUrl(key);
    if (url) update(key, "image", url);
    toast.success("Image updated — it now shows on the website");
  };

  const save = async () => {
    setSaving(true);
    try {
      saveFooterConfig(footer);
      const err = await saveAllSectionsContent(data);
      if (err) {
        toast.error(`Error saving content: ${err}`);
      } else {
        toast.success("Website content saved successfully and synchronized with live site");
      }
    } catch (e: any) {
      toast.error(e?.message || "Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const setColumn = (ci: number, patch: Partial<FooterColumn>) =>
    setFooter((f) => ({
      ...f,
      columns: f.columns.map((c, i) => (i === ci ? { ...c, ...patch } : c)),
    }));
  const setLink = (ci: number, li: number, patch: Partial<FooterLink>) =>
    setColumn(ci, {
      links: footer.columns[ci].links.map((l, i) => (i === li ? { ...l, ...patch } : l)),
    });
  const addLink = (ci: number) =>
    setColumn(ci, { links: [...footer.columns[ci].links, { label: "New link", href: "#top" }] });
  const removeLink = (ci: number, li: number) =>
    setColumn(ci, { links: footer.columns[ci].links.filter((_, i) => i !== li) });

  const sections: [string, string][] = [
    ["home", "Home / Hero"],
    ["about", "About Us"],
    ["whyUs", "Why Us"],
    ["process", "Process"],
    ["contact", "Contact Info"],
    ["products", "Products"],
    ["markets", "Markets"],
    ["certificate", "Certificate"],
    ["news", "Our News"],
  ];

  const editableSections = ["home", "about", "whyUs", "process", "contact"];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("nav.content")}
        description={t("content.desc")}
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border/80 bg-muted/60 p-1">
              <Button
                variant={contentLang === "en" ? "default" : "ghost"}
                size="sm"
                className="h-8 text-xs font-semibold"
                onClick={() => setContentLang("en")}
              >
                <Globe className="mr-1.5 h-3.5 w-3.5" /> English
              </Button>
              <Button
                variant={contentLang === "ar" ? "default" : "ghost"}
                size="sm"
                className="h-8 text-xs font-semibold"
                onClick={() => setContentLang("ar")}
              >
                <Globe className="mr-1.5 h-3.5 w-3.5" /> عربي
              </Button>
            </div>
            <Button onClick={save} disabled={loading || saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="mb-4 flex w-full flex-wrap justify-start bg-muted/60">
          {sections.map(([k, l]) => (
            <TabsTrigger key={k} value={k}>
              {l}
            </TabsTrigger>
          ))}
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {sections.map(([k, l]) => {
          const sectionData = data[k] ?? defaultSectionsContent[k] ?? { id: k };
          const isEditable = editableSections.includes(k);

          return (
            <TabsContent key={k} value={k}>
              <Card className="rounded-2xl border-border/60 shadow-sm">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardTitle>{l} Section</CardTitle>
                    {isEditable && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Editing {contentLang === "en" ? "English" : "العربية (Arabic)"}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditable && (
                    <div className="grid gap-4 rounded-xl border border-border/50 bg-muted/20 p-4">
                      {contentLang === "en" ? (
                        <>
                          <div className="space-y-2">
                            <Label className="font-semibold text-foreground">Title (English)</Label>
                            <Input
                              value={sectionData.title_en || ""}
                              placeholder="Section title in English"
                              onChange={(e) => update(k, "title_en", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="font-semibold text-foreground">Subtitle / Eyebrow (English)</Label>
                            <Input
                              value={sectionData.subtitle_en || ""}
                              placeholder="Subtitle or tagline in English"
                              onChange={(e) => update(k, "subtitle_en", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="font-semibold text-foreground">Paragraph / Description (English)</Label>
                            <Textarea
                              rows={4}
                              value={sectionData.paragraph_en || ""}
                              placeholder="Section description in English"
                              onChange={(e) => update(k, "paragraph_en", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="font-semibold text-foreground">Button Text (English)</Label>
                            <Input
                              value={sectionData.button_en || ""}
                              placeholder="Button label (e.g. Explore Products)"
                              onChange={(e) => update(k, "button_en", e.target.value)}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2 text-right" dir="rtl">
                            <Label className="font-semibold text-foreground">العنوان الرئيسي (بالعربي)</Label>
                            <Input
                              className="text-right"
                              dir="rtl"
                              value={sectionData.title_ar || ""}
                              placeholder="عنوان السكشن بالعربي"
                              onChange={(e) => update(k, "title_ar", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2 text-right" dir="rtl">
                            <Label className="font-semibold text-foreground">العنوان الفرعي / الشعار (بالعربي)</Label>
                            <Input
                              className="text-right"
                              dir="rtl"
                              value={sectionData.subtitle_ar || ""}
                              placeholder="العنوان الفرعي بالعربي"
                              onChange={(e) => update(k, "subtitle_ar", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2 text-right" dir="rtl">
                            <Label className="font-semibold text-foreground">الفقرة / الوصف (بالعربي)</Label>
                            <Textarea
                              rows={4}
                              className="text-right"
                              dir="rtl"
                              value={sectionData.paragraph_ar || ""}
                              placeholder="وصف السكشن بالتفصيل بالعربي"
                              onChange={(e) => update(k, "paragraph_ar", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2 text-right" dir="rtl">
                            <Label className="font-semibold text-foreground">نص الزرار (بالعربي)</Label>
                            <Input
                              className="text-right"
                              dir="rtl"
                              value={sectionData.button_ar || ""}
                              placeholder="نص الزرار (مثال: استكشف المنتجات)"
                              onChange={(e) => update(k, "button_ar", e.target.value)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="font-semibold">Section Image / Background</Label>
                    <div className="flex items-center gap-4">
                      <img
                        src={sectionData.image || "/placeholder.svg"}
                        alt=""
                        className="h-20 w-24 rounded-lg border object-cover shadow-xs"
                      />
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
                        <Upload className="h-4 w-4" /> Change image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => uploadImage(k, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}

        <TabsContent value="footer" className="space-y-4">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Footer Intro & Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Textarea
                  rows={3}
                  value={footer.tagline}
                  onChange={(e) => setFooter((f) => ({ ...f, tagline: e.target.value }))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {(["facebook", "instagram", "linkedin"] as const).map((s) => (
                  <div key={s} className="space-y-2">
                    <Label className="capitalize">{s}</Label>
                    <Input
                      value={footer.social[s]}
                      onChange={(e) =>
                        setFooter((f) => ({
                          ...f,
                          social: { ...f.social, [s]: e.target.value },
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            {footer.columns.map((col, ci) => (
              <Card key={ci} className="rounded-2xl border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Column {ci + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Column Title</Label>
                    <Input
                      value={col.title}
                      onChange={(e) => setColumn(ci, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    {col.links.map((l, li) => (
                      <div key={li} className="space-y-2 rounded-lg border border-border/60 p-3">
                        <div className="flex items-center gap-2">
                          <Input
                            value={l.label}
                            placeholder="Label"
                            onChange={(e) => setLink(ci, li, { label: e.target.value })}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLink(ci, li)}
                            aria-label="Remove link"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          value={l.href}
                          placeholder="#about or https://..."
                          onChange={(e) => setLink(ci, li, { href: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => addLink(ci)}>
                    <Plus className="mr-1 h-4 w-4" /> Add link
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Use in-page anchors (#top, #about, #products, #why, #process, #markets, #contact) or full URLs.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
