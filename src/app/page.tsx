"use client";
import Axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { EditModel, DeleteModel } from "@/components/EditDeleteModel";
import { BGBlueButton, BGWhiteButton,  EditButton, DeleteButton} from "@/components/Buttons";
import Modal from "react-modal";

export default function Home() {
  const [UpdatedName, setUpdatedName] = useState("");
  const [Name, setName] = useState("");
  const [Data,setData]=useState<any[]>([])
  const [SelectedIndex, setSelectedIndex] = useState(0);
  const [Operataion, setOperataion] = useState("");
  const [OpenModel, setOpenModel] = useState(false);
  const CloseModel = () => {
    setOpenModel(false);
    console.log(SelectedIndex);
  };
  const GetData = async () => {
    try {
      const response = await Axios.get("/api/GetData");
      setData(response.data.Data);
    } catch (error:any) {
      console.log("An error occurred while fetching data:", error)
    }
  }
  const HandleDelete = async () => {
    try {
      const response = await Axios.delete("/api/Delete", {
        params: { index: SelectedIndex },
      });
      if (response.status === 200) {
        toast.success(` Details of ${Name} Deleted Successfully !`);
        GetData();
      } else if (response.status === 400) {
        toast.error(`Data is not Available`);
      } else if (response.status === 500)
        toast.error(` Failsed to Delete ${Name} Details`);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while deleting data. Please try again.");
    }
    CloseModel();
  };
  const HandleUpdate = async () => {
    try {
      const response = await Axios.put("/api/Update", { index: SelectedIndex, newName: UpdatedName
      });
      if (response.status == 200) {
        toast.success(` ${Name} Successfully Updated to ${UpdatedName}!`);
        GetData();
      } else if (response.status === 400) {
        toast.error(`Data is not Available`);
      } else if (response.status === 500)
        toast.error(` Failed to Update ${Name} to ${UpdatedName}`);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while Updating Name. Please try again.");
    }
    CloseModel();
  };
  const HandelAction = async (index: any, name: any, operation: any) => {
    setOpenModel(true),
      setOperataion(operation),
      setSelectedIndex(index),
      setUpdatedName(name);
    setName(name);
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <div className="mb-10">
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        isOpen={OpenModel}
        onRequestClose={() => CloseModel}
        style={{
          content: {
            padding: "0",
            top: "0%",
            bottom: "auto",
            width: "444px",
            alignItems: "center",
            margin: "auto",
          },
          overlay: {
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
          },
        }}
      >
        <div className="flex px-6 w-full">
          {Operataion == "Update" ? (
            <EditModel
              Name={Name}
              UpdatedName={UpdatedName}
              setUpdatedName={setUpdatedName}
            />
          ) : (
            <DeleteModel Name={Name} />
          )}
        </div>
        <div className={"py-[16px] border-t  flex gap-3  pl-[24px] "}>
          <BGBlueButton
            value={Operataion}
            HandelonClick={Operataion == "Update" ? HandleUpdate : HandleDelete}
          />
          <BGWhiteButton value={"Cancel"} HandelonClick={CloseModel} />
        </div>
      </Modal>
      <div className="flex w-full bg-indigo-100 py-6 text-2xl items-center justify-center ">
        Alippo-Frontend-Assignment
      </div>
      <div className="flex justify-center">
        <div className=" border border-gray-300 w-[950px] mt-4 rounded">
          <div className="flex w-full h-12">
            <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xm px-8 font-normal">
              Sl. No
            </div>
            <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xm px-8 font-normal">
              Name
            </div>
            <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xm px-8 font-normal">
              Age
            </div>
            <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xm px-8 font-normal">
              City
            </div>{" "}
            <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xm px-8 font-normal">
              PinCode
            </div>
            <div className="h-full w-[200px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xm px-8 font-normal">
              Actions
            </div>
          </div>
          {Array.isArray(Data) &&
            Data.length > 0 &&
            Data.map((value: any, index: any) => (
              <div
                key={index}
                className=" border-t border-gray-300 flex w-full h-12"
              >
                <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xs px-8 font-normal">
                  {index + 1}
                </div>
                <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xs px-8 font-normal">
                  {value.name}
                </div>
                <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xs px-8 font-normal">
                  {value.age}
                </div>
                <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xs px-8 font-normal">
                  {value.city}
                </div>{" "}
                <div className="h-full w-[150px] flex justify-center items-center rounded-lg text-left text-zinc-500 text-xs px-8 font-normal">
                  {value.pinCode}
                </div>
                <div className="h-full w-[200px] flex gap-2 justify-center items-center rounded-lg text-left text-zinc-1000 text-xs px-8 font-normal">
                  <div
                    onClick={() => {
                      HandelAction(index, value.name, "Update");
                    }}
                    className="flex gap-2 border py-2 cursor-pointer px-2 rounded"
                  >
                    <EditButton/>
                  </div>
                  <div
                    onClick={() => {
                      HandelAction(index, value.name, "Delete");
                    }}
                    className="flex gap-2 cursor-pointer border py-2 px-2 rounded"
                  >
                   <DeleteButton/>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
