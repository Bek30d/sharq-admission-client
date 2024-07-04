import icons from "./icons";
import React from "react";

const BaseIcon = ({
  name,
  cn,
  color,
  width = 24,
  height = 24,
  viewBox = "0 0 24 24",
}: {
  name: keyof typeof icons;
  cn?: string;
  color?: string;
  width?: number;
  height?: number;
  viewBox?: string;
}) => {
  return (
    <svg
      dangerouslySetInnerHTML={{ __html: icons[name] }}
      className={cn ?? ""}
      width={width}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      color="#fff"
      stroke={color ? color : "#424A53"}
    />
  );
};

export default BaseIcon;
