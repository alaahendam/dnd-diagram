"use client";
import { addToDraggableItems } from "@/features/dndSlice";
import { TRootState, useDispatch } from "@/stores/redux";
import { useState } from "react";
import { useSelector } from "react-redux";

const shapes = [
  { name: "circle", width: 50, height: 50, angle: 0, rounded: "50%" },
  { name: "square", width: 50, height: 50, angle: 0, rounded: "0px" },
  { name: "rounded square", width: 50, height: 50, angle: 0, rounded: "7px" },
  { name: "parallelogram", width: 50, height: 50, angle: 45, rounded: "0px" },
  { name: "rectangle", width: 100, height: 50, angle: 0, rounded: "0px" },
];

const DraggableArea = () => {
  const dispatch = useDispatch();
  const [selectedShape, setSelectedShape] = useState(shapes[0].name);
  const [selectedColor, setSelectedColor] = useState("#FF395C");
  const [selectedSize, setSelectedSize] = useState(1);
  const [label, setLabel] = useState<string>("");

  const draggableItems = useSelector(
    (state: TRootState) => state.dnd.draggableItems
  );

  const handleAddItemToArea = () => {
    const shape = shapes.find((item) => item.name === selectedShape);
    if (shape) {
      dispatch(
        addToDraggableItems({
          id: (draggableItems[draggableItems.length - 1]?.id || 0) + 1,
          label: label,
          property: {
            rounded: shape?.rounded,
            height: shape?.height * selectedSize,
            width: shape?.width * selectedSize,
            angle: shape?.angle,
            color: selectedColor,
            x: 50,
            y: 50,
          },
        })
      );
    }
  };

  return (
    <div className="w-1/5 bg-gray-200 h-full flex flex-col px-6 justify-center gap-2">
      <div className="flex gap-1 flex-col">
        <label htmlFor="" className="text-sm text-gray-500 font-bold">
          Shape
        </label>
        <select
          className="h-10 rounded-md focus-visible:outline-none px-4"
          value={selectedShape}
          onChange={(e) => setSelectedShape(e.target.value)}
        >
          {shapes.map((item, index) => {
            return (
              <option
                value={`${item.name}`}
                key={index}
                className=" capitalize"
              >
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="" className="text-sm text-gray-500 font-bold">
          Color
        </label>
        <input
          type="color"
          defaultValue={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="h-12 w-full rounded-md border-none bg-white outline-none"
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="" className="text-sm text-gray-500 font-bold">
          Size
        </label>
        <select
          className="h-10 rounded-md focus-visible:outline-none px-4 w-full"
          value={selectedSize}
          onChange={(e) => setSelectedSize(Number(e.target.value))}
        >
          {Array.from(Array(5).keys()).map((i) => {
            return (
              <option value={`${i + 1}`} key={i} className=" capitalize">
                {(i + 1) * 50}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="" className="text-sm text-gray-500 font-bold">
          Label
        </label>
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="focus-visible:outline-none h-10 rounded-md px-4 w-full"
        />
      </div>
      <button
        className="h-10 rounded-md focus-visible:outline-none px-6 text-white bg-indigo-600 mt-1"
        onClick={handleAddItemToArea}
      >
        Add
      </button>
    </div>
  );
};
export default DraggableArea;
