const BrandIcon = ({ fill = "#E8D9C8", width = 706, height = 673 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Lotus flower - symbol of purity in Ayurveda */}
      <path
        d="M50 15 C45 25 35 35 30 50 C35 45 45 40 50 35 C55 40 65 45 70 50 C65 35 55 25 50 15"
        fill={fill}
        opacity="0.9"
      />
      <path
        d="M50 35 C45 45 35 55 25 65 C35 60 45 50 50 45 C55 50 65 60 75 65 C65 55 55 45 50 35"
        fill={fill}
        opacity="0.8"
      />
      <path
        d="M50 45 C40 55 25 65 15 75 C30 70 45 55 50 50 C55 55 70 70 85 75 C75 65 60 55 50 45"
        fill={fill}
        opacity="0.7"
      />
      <path
        d="M30 70 C35 65 45 55 50 50 C55 55 65 65 70 70 C65 75 55 85 50 90 C45 85 35 75 30 70"
        fill={fill}
        opacity="0.6"
      />
      {/* Center circle */}
      <circle cx="50" cy="50" r="8" fill={fill} opacity="0.95" />
    </svg>
  );
};

export default BrandIcon;
