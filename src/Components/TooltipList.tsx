import Icon from "@/Components/Icon";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
export interface ITooltipListProps {
  tooltipTitle: string;
  route: string;
  iconPath: string;
  onClick?: () => void;
}
const TooltipList: React.FC<ITooltipListProps> = ({ tooltipTitle, route, iconPath, onClick }) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Tooltip title={tooltipTitle} placement="bottom-start">
      <IconButton onClick={onClick ? onClick : () => router.push(route)}>
        <Icon pathName={iconPath} color={theme.palette.primary.main} />
      </IconButton>
    </Tooltip>
  );
};

export default TooltipList;
