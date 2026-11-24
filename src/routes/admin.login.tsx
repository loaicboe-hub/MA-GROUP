import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { getAdminSession, requestPasswordReset, signIn } from "@/lib/admin-auth";
import { getCachedLogoUrl } from "@/lib/admin-branding";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login | MA GROUP" }, { name: "robots", content: "noindex" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setResetting(true);
    await requestPasswordReset(resetEmail);
    setResetting(false);
    setResetSent(true);
    toast.success("If an account exists, a reset link was sent.");
  };

  useEffect(() => {
    getAdminSession().then((session) => {
      if (session?.isAdmin) navigate({ to: "/admin/dashboard" });
    });
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    setLoading(true);
    const error = await signIn(email, password);
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }
    const session = await getAdminSession();
    if (!session?.isAdmin) {
      toast.error("This account does not have admin access.");
      setLoading(false);
      return;
    }
    toast.success("Welcome back");
    navigate({ to: "/admin/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-16 w-auto items-center justify-center">
            <img src={getCachedLogoUrl() ?? "/logo.png"} alt="MA GROUP logo" className="h-full w-auto max-h-full object-contain" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">MA GROUP Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your website</p>
        </div>

        <Card className="border-border/60 shadow-xl">
          <CardHeader>
            <CardTitle>Admin access</CardTitle>
            <CardDescription>
              Sign in to manage your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="admin@magroupexport.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
              </Button>
              {!forgotOpen && (
                <button
                  type="button"
                  onClick={() => {
                    setForgotOpen(true);
                    setResetEmail(email);
                  }}
                  className="w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </form>

            {forgotOpen && (
              <div className="mt-4 rounded-lg border border-border/60 bg-muted/40 p-4">
                {resetSent ? (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      If an account exists for that email, a reset link is on its way. Check your
                      inbox and spam folder.
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setForgotOpen(false);
                        setResetSent(false);
                      }}
                    >
                      Back to Sign In
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgot} className="space-y-3">
                    <Label htmlFor="reset-email" className="text-xs">
                      Enter your email to receive a reset link
                    </Label>
                    <Input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="admin@magroupexport.com"
                      required
                    />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" disabled={resetting}>
                        {resetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send reset link
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => setForgotOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}
