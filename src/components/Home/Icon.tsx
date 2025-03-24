import { useTheme } from "@mui/material";
import Image, { ImageProps } from "next/image";

interface IconProps {
  src: ImageProps["src"];
  title: ImageProps["title"];
  alt: ImageProps["alt"];
}

const Icon = ({ src, title, alt }: IconProps) => {
  const theme = useTheme();

  return (
    <span
      style={{
        width: theme.spacing(3),
        height: theme.spacing(3),
        position: "relative",
      }}
    >
      <Image
        src={src}
        title={title}
        alt={alt}
        fill
        sizes="100vw"
        style={{
          filter: `brightness(0) invert(${
            theme.palette.mode === "dark" ? 1 : 0
          })`,
        }}
      />
    </span>
  );
};

export default Icon;
