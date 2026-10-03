import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — DoAide Inventory` : "DoAide Inventory";
    return () => { document.title = "DoAide Inventory"; };
  }, [title]);
}
