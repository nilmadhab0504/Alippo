import React from "react";

const EditModel = (props: any) => {
  return (
    <div className="w-full my-6">
          <div className="text-xl">Edit Name of {props.Name}</div>
      <input
        onChange={(e) => {
          props.setUpdatedName(e.target.value);
        }}
        value={props.UpdatedName}
        type="text"
        placeholder="Name"
        className="w-full h-8 text-stone-500  my-4 px-4 text-sm bg-white outline-none border-gray-300 border rounded   hover:border hover:border-indigo-400"
      />
    </div>
  );
};
const DeleteModel= (props: any) => {
  return (
    <div className="mt-[24px] ml-[16px] mr-[16px] mb-[32px]">
      <div className="text-black  mb-[12px] text-base font-medium  leading-snug">
        Are You Sure ?
      </div>
      <div className="w-[364px]  text-stone-500 text-sm font-normal  leading-snug">
        You want to delete details of {props.Name}
      </div>
    </div>
  );
};
export { EditModel, DeleteModel };
