import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Diamond, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePassword } from "@/lib/admin-auth";
import { getCachedLogoUrl } from "@/lib/admin-branding";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "Reset your password | MA GROUP" },
      {
        name: "description",
        content: "Choose a new password for your MA GROUP admin account.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Reset your password | MA GROUP" },
      {
        property: "og:description",
        content: "Choose a new password for your MA GROUP admin account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 10) {
      toast.error("Password must be at least 10 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("The two passwords do not match");
      return;
    }

    setSaving(true);
    const err = await updatePassword(password);
    setSaving(false);

    if (err) {
      toast.error(err);
      return;
    }

    toast.success("Password updated successfully. Please sign in.");
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-16 w-auto items-center justify-center">
            <img src={getCachedLogoUrl() ?? "/logo.png"} alt="MA GROUP logo" className="h-full w-auto max-h-full object-contain" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">MA GROUP Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Set a new password for your account</p>
        </div>

        <Card className="border-border/60 shadow-xl">
          <CardHeader>
            <CardTitle>Choose a new password</CardTitle>
            <CardDescription>
              Must be at least 10 characters long.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 10 characters"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your new password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
