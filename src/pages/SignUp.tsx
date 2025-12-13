import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState(() => {
    try {
      return localStorage.getItem("joseph:signupEmail") || "";
    } catch {
      return "";
    }
  });
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const googleClientId = import.meta.env?.VITE_GOOGLE_CLIENT_ID as string | undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    // Simulate success and gate bypass
    setTimeout(() => {
      try {
        localStorage.setItem("joseph:signedUp", "true");
      } catch {}
      setLoading(false);
      navigate("/home");
    }, 500);
  }

  // Google Identity Services: load script and render button if client id is provided
  React.useEffect(() => {
    if (!googleClientId) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // @ts-ignore
      if (window.google?.accounts?.id) {
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response: any) => {
            try {
              localStorage.setItem("joseph:signedUp", "true");
              localStorage.setItem("joseph:googleCredential", response?.credential || "");
            } catch {}
            navigate("/home");
          },
        });
        // @ts-ignore
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInBtn"),
          { theme: "outline", size: "large", width: 360 }
        );
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [googleClientId, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold">Create your Joseph account</div>
            <div className="text-sm text-muted-foreground">Access Solutions, Infrastructure, and Learn</div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating account…" : "Create account"}
            </Button>
            <Button type="button" variant="secondary" className="w-full" onClick={() => navigate("/secondlandingpage")}>Skip for now</Button>
          </form>
          <div className="mt-6">
            {googleClientId ? (
              <div id="googleSignInBtn" className="flex justify-center" />
            ) : (
              <div className="text-xs text-muted-foreground text-center">
                Set <b>VITE_GOOGLE_CLIENT_ID</b> in your environment to enable Google sign-in.
              </div>
            )}
          </div>
          <div className="text-[11px] text-muted-foreground mt-4 text-center">
            By continuing you agree to our Terms and acknowledge our Privacy Policy.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
