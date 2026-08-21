import { getImageProps } from "next/image";

/**
 * Art-directed hero portrait (transparent cutouts, no background):
 * the desktop crop serves lg+ viewports, the mobile crop below.
 * Both are presented uncropped at their native aspect ratios,
 * sized by height so they never overflow the viewport.
 */
const DESKTOP_SRC = "/portrait/personal-image-desktop.png";
const MOBILE_SRC = "/portrait/personal-image-mobile.png";

const common = {
  alt: "Yousef Koura — machine learning engineer",
  sizes: "(min-width: 1024px) 24vw, 72vw",
  loading: "eager" as const,
  fetchPriority: "high" as const,
};

export function PortraitObject() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: DESKTOP_SRC,
    width: 365,
    height: 684,
  });

  const {
    props: { srcSet: mobileSrcSet, ...mobileRest },
  } = getImageProps({
    ...common,
    src: MOBILE_SRC,
    width: 394,
    height: 634,
  });

  return (
    <div className="relative mx-auto aspect-[394/634] h-[min(46svh,430px)] lg:aspect-[365/684] lg:h-[min(66svh,600px)]">
      <div className="portrait-reveal absolute inset-0">
        <div className="portrait-settle absolute inset-0">
          <picture>
            <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
            <source media="(max-width: 1023px)" srcSet={mobileSrcSet} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt arrives via mobileRest */}
            <img
              {...mobileRest}
              className="h-full w-full object-contain"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
