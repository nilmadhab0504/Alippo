import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Data from "@/components/data.json";

export const PUT = async (req: any) => {
    const dataFilePath = path.resolve(process.cwd(), "src/components/data.json");

  try {
      const { index, newName } = await req.json();
      console.log("dxuasb",newName)
       const index1 = parseInt(index, 10);
    if (typeof index1 !== "number" || index1 < 0 || index1 >= Data.length) {
      return NextResponse.json(
        {
          message: "Invalid index",
          success: false,
        },
        { status: 400 }
      );
    }
    Data[index1].name = newName;
    fs.writeFileSync(dataFilePath, JSON.stringify(Data, null, 2));

    return NextResponse.json(
      {
        message: "Name updated successfully",
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
