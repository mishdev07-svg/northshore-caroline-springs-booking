import Script from "next/script";

export function TrackingScripts() {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const googleAdsCallLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const googleTagId = googleAnalyticsId || googleAdsId;

  return (
    <>
      {googleTagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${
                googleAnalyticsId
                  ? `gtag('config', '${escapeForScript(googleAnalyticsId)}');`
                  : ""
              }
              ${
                googleAdsId
                  ? `gtag('config', '${escapeForScript(googleAdsId)}');`
                  : ""
              }
              ${
                googleAdsId && googleAdsCallLabel
                  ? `gtag('config', '${escapeForScript(
                      `${googleAdsId}/${googleAdsCallLabel}`,
                    )}', {
                      'phone_conversion_number': '0403 474 343'
                    });`
                  : ""
              }
            `}
          </Script>
        </>
      ) : null}

      <Script id="campaign-attribution" strategy="afterInteractive">
        {`
          (function () {
            try {
              var params = new URLSearchParams(window.location.search);
              var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
              var campaign = {};
              var hasCampaign = false;

              keys.forEach(function (key) {
                var value = params.get(key);
                if (value) {
                  campaign[key] = value.slice(0, 120);
                  hasCampaign = true;
                }
              });

              if (hasCampaign) {
                window.sessionStorage.setItem('northshore_campaign', JSON.stringify(campaign));
              }
            } catch (_) {}
          })();
        `}
      </Script>

      <Script id="marketing-click-events" strategy="afterInteractive">
        {`
          (function () {
            if (window.__northshoreTrackingBound) return;
            window.__northshoreTrackingBound = true;
            window.dataLayer = window.dataLayer || [];

            document.addEventListener('click', function (event) {
              var origin = event.target;
              var element = origin instanceof Element
                ? origin.closest('[data-track-event]')
                : null;
              if (!element) return;

              var eventName = element.getAttribute('data-track-event');
              if (!eventName) return;

              var details = {
                link_text: (
                  element.getAttribute('data-track-label') ||
                  element.textContent ||
                  ''
                ).trim().slice(0, 80),
                link_location: (
                  element.getAttribute('data-track-location') ||
                  'unknown'
                ).slice(0, 80)
              };

              if (typeof window.gtag === 'function') {
                window.gtag('event', eventName, details);
              } else {
                window.dataLayer.push(Object.assign({ event: eventName }, details));
              }
            });
          })();
        `}
      </Script>

      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${escapeForScript(metaPixelId)}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}

function escapeForScript(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}
