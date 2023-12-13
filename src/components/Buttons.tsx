import React from "react";

const BGBlueButton = (props: any) => {
  return (
    <div
      onClick={() => {
        props.HandelonClick();
      }}
      className="cursor-pointer h-9 px-4 py-1 bg-indigo-500 rounded-md border border-indigo-500 justify-start items-center gap-1.5 inline-flex"
    >
      <div className="text-white text-[13px] font-normal leading-tight">
        {props.value}
      </div>
    </div>
  );
};
const BGWhiteButton = (props: any) => {
  return (
    <div
      onClick={() => {
        props.HandelonClick();
      }}
      className=" h-9 px-4 py-1 cursor-pointer rounded-md border border-zinc-300 justify-start items-center gap-1.5 inline-flex"
    >
      <div className="text-black  text-[13px] font-normal leading-tight">
        {props.value}
      </div>
    </div>
  );
};
export { BGBlueButton, BGWhiteButton };
