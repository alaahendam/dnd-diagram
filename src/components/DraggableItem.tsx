"use client";
import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TRootState } from "@/stores/redux";

import { deleteDraggableItem, setSelectedItems } from "@/features/dndSlice";
import { TDraggableItem } from "@/types/Dnd";

interface IDraggableItemProps {
  data: TDraggableItem;
}

const DraggableItem = ({ data }: IDraggableItemProps) => {
  const dispatch = useDispatch();
  const { selectedItems } = useSelector((state: TRootState) => state.dnd);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
  });
  const finalTransform = transform
    ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
    : undefined;

  const handleAddToSelectedItems = (e: React.MouseEvent) => {
    if (!selectedItems.includes(data.id)) {
      dispatch(setSelectedItems([...selectedItems, data.id]));
    } else {
      dispatch(
        setSelectedItems(selectedItems.filter((item) => item !== data.id))
      );
    }
  };

  const handleDeleteItem = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.altKey || e.shiftKey) {
      dispatch(deleteDraggableItem(data.id));
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        top: data.property.y,
        left: data.property.x,
        transform: finalTransform,
      }}
      className={selectedItems.includes(data.id) ? " brightness-75" : ""}
    >
      <div
        {...listeners}
        {...attributes}
        className="flex cursor-pointer items-center justify-center"
        onClickCapture={handleDeleteItem}
        onDoubleClick={handleAddToSelectedItems}
      >
        <div
          id={`${data.id}`}
          className="flex items-center justify-center text-xs"
          style={{
            width: data.property.width,
            height: data.property.height,
            rotate: `${data.property.angle}deg`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: data.property.rounded,
            backgroundColor: data.property.color,
          }}
        >
          {data?.label && <p>{data?.label}</p>}
        </div>
      </div>
    </div>
  );
};

export default DraggableItem;
