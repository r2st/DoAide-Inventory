export function track(event, data) {
  try {
    if (window.umami) window.umami.track(event, data);
  } catch { /* analytics optional */ }
}
