// A single, consistent icon set (stroke = currentColor) so every glyph in the
// app shares one visual language and recolors correctly in light/dark theme.
import { useId } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ size = 20, className, children, title, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
      {...base}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconLogo({ size = 28, className }) {
  const gradientId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#530c77" />
          <stop offset="0.55" stopColor="#6c1deb" />
          <stop offset="1" stopColor="#1dc2eb" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 L19.2 12.8 30 16 19.2 19.2 16 30 12.8 19.2 2 16 12.8 12.8 Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

export function IconUser({ size = 20, className, title }) {
  return (
    <Svg size={size} className={className} title={title}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.6-3.6 4.4-5.4 7.5-5.4s5.9 1.8 7.5 5.4" />
    </Svg>
  );
}

export function IconCompass({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 5-4.5 2L10.5 11 15 9z" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconBulb({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M9 18h6M10 21h4" />
      <path d="M7 10.5a5 5 0 1 1 10 0c0 2-1.2 3-2 4.2-.5.8-.7 1.3-.7 2.3h-4.6c0-1-.2-1.5-.7-2.3-.8-1.2-2-2.2-2-4.2Z" />
    </Svg>
  );
}

export function IconMessage({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z" />
    </Svg>
  );
}

export function IconCode({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M9 8l-4.5 4L9 16" />
      <path d="M15 8l4.5 4-4.5 4" />
    </Svg>
  );
}

export function IconGallery({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3.5" y="3.5" width="14" height="14" rx="4" />
      <circle cx="8.2" cy="8.2" r="1.6" />
      <path d="M6 15.5l3.5-3.5 2 2 3-3.5 3 3.5" />
      <path d="M18.5 8v4M16.5 10h4" />
    </Svg>
  );
}

export function IconMic({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21M9 21h6" />
    </Svg>
  );
}

export function IconSend({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4.5 12 19.5 4l-5.5 16-2.8-6.7L4.5 12Z" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconMenu({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function IconPlus({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function IconQuestion({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 2" />
      <circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconHistory({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 12a8 8 0 1 0 2.6-5.9" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4l3 2" />
    </Svg>
  );
}

export function IconSettings({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2M12 18.5v2M4.9 6.4l1.4 1.4M17.7 16.2l1.4 1.4M3.5 12h2M18.5 12h2M4.9 17.6l1.4-1.4M17.7 7.8l1.4-1.4" />
    </Svg>
  );
}

export function IconSun({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </Svg>
  );
}

export function IconMoon({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconAlert({ size = 20, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 3.5 21 19.5H3L12 3.5Z" strokeLinejoin="round" />
      <path d="M12 10v4" />
      <circle cx="12" cy="16.7" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconTrash({ size = 16, className, title }) {
  return (
    <Svg size={size} className={className} title={title}>
      <path d="M4.5 7h15" />
      <path d="M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" />
      <path d="M6.5 7l.7 12a1.5 1.5 0 0 0 1.5 1.4h6.6a1.5 1.5 0 0 0 1.5-1.4l.7-12" />
      <path d="M10 11v6M14 11v6" />
    </Svg>
  );
}
