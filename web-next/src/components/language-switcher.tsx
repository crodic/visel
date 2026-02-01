"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("Languages");

  function onSelectChange(locale: string) {
    const nextLocale = locale as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <Select
      defaultValue={locale}
      onValueChange={onSelectChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((cur) => (
          <SelectItem value={cur} key={cur}>
            {t(cur as "en" | "vi")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
