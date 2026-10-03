export function origin() {
  return typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? window.location.origin
    : "https://inventory.doaide.com";
}

export function fullUrl(path) {
  return `${origin()}${path}`;
}

export function whatsappUrl(text, url) {
  return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
}

export function twitterUrl(text, url) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function embedSnippet(tool) {
  return `<iframe src="${origin()}/embed/${tool}" width="100%" height="500" style="border:none;border-radius:12px" title="DoAide Inventory – ${tool}"></iframe>`;
}
