import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAdSenseReady = () => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleAdSenseScriptLoad = () => {
      setReady(true);
      setError(null); // 로드 성공 시 에러 상태 초기화
    };

    const handleAdSenseScriptError = (e) => {
      setError(
        e instanceof ErrorEvent
          ? e.error
          : new Error("Failed to load AdSense script")
      );
      setReady(false); // 에러 발생 시 ready 상태를 false로 설정
    };

    const onRouteChangeStart = () => {
      setReady(false);
      setError(null);
    };

    router.events?.on("routeChangeStart", onRouteChangeStart);

    if (!window.adsbygoogle) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = handleAdSenseScriptLoad;
      script.onerror = handleAdSenseScriptError;
      document.head.appendChild(script);
    } else {
      setReady(true);
      setError(null); // 이미 로드된 경우 에러 상태 초기화
    }

    if (typeof window !== "undefined" && !window.adsbygoogle) {
      window.adsbygoogle = {
        loaded: false,
        push: (...args) => {
          if (process.env.NODE_ENV === "development") {
            console.warn("AdSense 처리 대기열에 푸시:", args);
          }
          // 애드센스 로드 전에 푸시된 명령들을 처리하는 로직 (최소 기능만 제공)
        },
      };
    }

    return () => {
      router.events?.off("routeChangeStart", onRouteChangeStart);
      // 스크립트는 document.head에 유지하므로 제거하지 않습니다.
    };
  }, [router.events]);

  return { ready, error };
};

export { useAdSenseReady };
