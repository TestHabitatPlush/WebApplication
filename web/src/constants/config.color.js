export const COLORS_HEX = {
  primary: "#1D4ED8",
  secondary: "#6B7280",
  success: "#10B981",
  danger: "#EF4444",
  darkTeal: "#032F3C",
  lime: "#92D050",
  turquoise: "#078BA5",
};

export const COLORS = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  lime: "lime",
  turquoise: "turquoise",
  darkTeal: "darkTeal",
};

export const RING_COLORS = {
  primary: "ring-primary",
  secondary: "ring-secondary",
  success: "ring-success",
  danger: "ring-danger",
  lime: "ring-lime",
  turquoise: "ring-turquoise",
  darkTeal: "ring-darkTeal",
};

export const BORDER_COLORS = {
  primary: "border-primary",
  secondary: "border-secondary",
  success: "border-success",
  danger: "border-danger",
  lime: "border-lime",
  turquoise: "border-turquoise",
  darkTeal: "border-darkTeal",
};

export const BG_COLORS = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  danger: "bg-danger",
  lime: "bg-lime",
  turquoise: "bg-turquoise",
  darkTeal: "bg-darkTeal",
};


export const hexToRgba = (hex, opacity) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
