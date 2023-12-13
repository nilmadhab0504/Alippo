"use client";
import Image from "next/image";
import Axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { EditModel, DeleteModel } from "@/components/EditDeleteModel";
import { BGBlueButton, BGWhiteButton } from "@/components/Buttons";
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
      console.log(UpdatedName);
      const response = await Axios.put("/api/Update", { index: SelectedIndex, newName: UpdatedName
      });
      if (response.status === 200) {
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
    <div className="">
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
            Data.map((value: any, index:any) => (
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
                    <button className=" text-white font-bold rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.0126 1.42663C11.696 0.743207 12.804 0.743209 13.4874 1.42663L14.5732 2.51242C15.2566 3.19583 15.2566 4.30387 14.5732 4.98729L5.96358 13.5969C5.75328 13.8072 5.49286 13.9604 5.2069 14.0421L1.95606 14.9709C1.69416 15.0458 1.41229 14.9727 1.21969 14.7801C1.02709 14.5875 0.954049 14.3057 1.02887 14.0438L1.95769 10.7929C2.03939 10.507 2.19262 10.2465 2.40292 10.0362L11.0126 1.42663ZM12.4268 2.48729C12.3291 2.38966 12.1708 2.38966 12.0732 2.48729L10.8106 3.74985L12.25 5.18919L13.5126 3.92663C13.6102 3.829 13.6102 3.67071 13.5126 3.57308L12.4268 2.48729ZM11.1893 6.24985L9.75002 4.81051L3.46358 11.0969C3.43354 11.1269 3.41165 11.1641 3.39997 11.205L2.84203 13.1578L4.79482 12.5998C4.83567 12.5882 4.87287 12.5663 4.90292 12.5362L11.1893 6.24985Z"
                          fill="#6669EF"
                        />
                      </svg>
                    </button>
                    <div>Edit</div>
                  </div>
                  <div
                    onClick={() => {
                      HandelAction(index, value.name, "Delete");
                    }}
                    className="flex gap-2 cursor-pointer border py-2 px-2 rounded"
                  >
                    <button className=" text-white font-bold  rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.5 1.75C6.5 1.61193 6.61193 1.5 6.75 1.5H9.25C9.38807 1.5 9.5 1.61193 9.5 1.75V3H6.5V1.75ZM11 1.75V3H13.25C13.6642 3 14 3.33579 14 3.75C14 4.16421 13.6642 4.5 13.25 4.5H2.75C2.33579 4.5 2 4.16421 2 3.75C2 3.33579 2.33579 3 2.75 3H5V1.75C5 0.783502 5.7835 0 6.75 0H9.25C10.2165 0 11 0.783502 11 1.75ZM4.49627 6.67537C4.45506 6.26321 4.08753 5.9625 3.67537 6.00372C3.26321 6.04493 2.9625 6.41247 3.00372 6.82462L3.66367 13.4241C3.75313 14.3187 4.50592 15 5.40498 15H10.595C11.4941 15 12.2469 14.3187 12.3363 13.4241L12.9963 6.82462C13.0375 6.41247 12.7368 6.04493 12.3246 6.00372C11.9125 5.9625 11.5449 6.26321 11.5037 6.67537L10.8438 13.2749C10.831 13.4027 10.7234 13.5 10.595 13.5H5.40498C5.27655 13.5 5.169 13.4027 5.15622 13.2749L4.49627 6.67537Z"
                          fill="#FF4538"
                        />
                      </svg>
                    </button>
                    <div>Delete</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
