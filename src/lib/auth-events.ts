// client-only helpers to sync auth state across the app
export type AuthEventType = "login" | "logout";

export function broadcastAuth(type: AuthEventType) {
  try {
    const bc = new BroadcastChannel("nf-auth");
    bc.postMessage({ type });
    bc.close();
  } catch {}

  try {
    localStorage.setItem("nf_auth_event", `${Date.now()}:${type}`);
  } catch {}
}

export function hasJwtCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c.startsWith("nf_jwt="));
}

/** Poll document.cookie (cheap) to detect changes quickly. Returns a cleanup. */
export function watchJwtCookie(cb: (logged: boolean) => void) {
  let last = hasJwtCookie();
  const tick = () => {
    const cur = hasJwtCookie();
    if (cur !== last) {
      last = cur;
      cb(cur);
    }
  };
  // very light: 200ms gives a snappy feel without being heavy
  const id = window.setInterval(tick, 200);
  // first check right away
  tick();
  return () => window.clearInterval(id);
}
