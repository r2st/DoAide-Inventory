let _token = null;
const _fallback = new Map();
const _listeners = new Set();

function _storage(op, key, val) {
  try {
    if (op === "get") return localStorage.getItem(key);
    if (op === "set") return localStorage.setItem(key, val);
    if (op === "del") return localStorage.removeItem(key);
  } catch {
    if (op === "get") return _fallback.get(key) ?? null;
    if (op === "set") _fallback.set(key, val);
    if (op === "del") _fallback.delete(key);
  }
}

export function getToken() {
  if (_token) return _token;
  _token = _storage("get", "doaide-inv-token");
  return _token;
}

export function setToken(t) {
  _token = t;
  if (t) _storage("set", "doaide-inv-token", t);
  else _storage("del", "doaide-inv-token");
}

export function onUnauthorized(fn) {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}

function _notifyUnauthorized() {
  _listeners.forEach((fn) => fn());
}

export async function request(method, path, body) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(path, opts);

  if (res.status === 401) {
    setToken(null);
    _notifyUnauthorized();
  }

  if (res.status === 204) return { data: null, error: null };

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return { data: null, error: data?.detail || `Error ${res.status}` };
  }
  return { data, error: null };
}

export const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  patch: (path, body) => request("PATCH", path, body),
  delete: (path) => request("DELETE", path),
  postForm: async (path, formData) => {
    const headers = {};
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(path, { method: "POST", headers, body: formData });
    if (res.status === 401) {
      setToken(null);
      _notifyUnauthorized();
    }
    const data = await res.json().catch(() => null);
    if (!res.ok) return { data: null, error: data?.detail || `Error ${res.status}` };
    return { data, error: null };
  },
};
