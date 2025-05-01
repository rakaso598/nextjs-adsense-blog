"use client";

import React, { useEffect } from "react";
import { useAdSenseReady } from "@/hooks/useAdSenseReady";

function AdSense({
  adSlot,
  adFormat = "auto",
  layout,
  layoutKey,
  style,
  className,
}) {
  const { ready, error } = useAdSenseReady(); // error 상태를 받습니다.

  useEffect(() => {
    if (ready) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (loadError) {
        console.error("AdSense 광고 로드 오류:", loadError);
      }
    }
  }, [ready, adSlot]);

  if (error) {
    return (
      <div className={className} style={style}>
        광고를 로드하는 데 실패했습니다.
      </div>
    );
  }

  if (!ready) {
    return null; // 또는 로딩 중임을 나타내는 UI를 렌더링할 수도 있습니다.
  }

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={{ display: "block", ...style }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      {...(layout && { "data-ad-layout": layout })}
      {...(layoutKey && { "data-ad-layout-key": layoutKey })}
      data-full-width-responsive="true"
    ></ins>
  );
}

export default AdSense;
