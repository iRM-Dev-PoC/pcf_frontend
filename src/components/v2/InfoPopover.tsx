import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

type InfoPopoverProps = {
  children: ReactNode;
  desc: string;
} 
const InfoPopover = ({children,desc}:InfoPopoverProps) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {children}
        </PopoverTrigger>
        <PopoverContent>
          {desc}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default InfoPopover
