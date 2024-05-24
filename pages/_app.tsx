import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { useTheme } from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    const { setTheme } = useTheme();

    setTheme('dark')

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
