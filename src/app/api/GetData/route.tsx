import { NextResponse } from "next/server";
import Data from "@/components/data.json";

export const GET = async (req: any) => {
  return NextResponse.json({
    Data
  });
};
