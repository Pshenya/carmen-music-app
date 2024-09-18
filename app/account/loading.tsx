"use client";

import Box from "@/components/ui/Box";
import { BounceLoader } from "react-spinners";


const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <BounceLoader color="#FF5D73" size={40}/>
    </Box>
  )
}

export default Loading
