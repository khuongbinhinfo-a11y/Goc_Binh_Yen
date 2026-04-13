import { useLocaleContext } from "@/components/providers/LocaleProvider";

export function useLocale() {
  return useLocaleContext();
}