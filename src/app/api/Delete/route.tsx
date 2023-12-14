import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Data from "@/components/data.json";

export const DELETE = async (req: any) => {
  const dataFilePath = path.resolve(process.cwd(), "src/components/data.json");
try {
    const indexString = req.nextUrl.searchParams.get("index");
    const index = parseInt(indexString, 10);

    if (isNaN(index) || index < 0 || index >= Data.length) {
      return NextResponse.json(
        {
          message: "Invalid index",
          success: false,
        },
        { status: 400 }
      );
    }

    console.log(index);

    Data.splice(index, 1);
    fs.writeFileSync(dataFilePath, JSON.stringify(Data, null, 2));

    console.log(index);

    return NextResponse.json(
      {
        message: "Item deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
};
