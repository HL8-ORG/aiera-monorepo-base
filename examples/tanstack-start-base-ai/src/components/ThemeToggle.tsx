import { Button } from "@hl8/ui/components/button";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  function toggleTheme() {
    // 判断当前是否是暗色模式：
    // 1. 检查html元素是否包含dark类
    // 2. 或者检查localStorage中没有theme设置且系统偏好是暗色模式
    if (
      document.documentElement.classList.contains("dark") ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      // 如果是暗色模式，则切换到亮色模式
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      // 如果是亮色模式，则切换到暗色模式
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  }

  return (
    <Button variant="outline" size="icon" type="button" onClick={toggleTheme}>
      <SunIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
