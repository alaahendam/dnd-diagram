"use client";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TRootState } from "@/stores/redux";

import { setDraggableItems } from "@/features/dndSlice";

import DraggableItem from "./DraggableItem";
import DroppableArea from "./DroppableArea";

const darkBg =
  "repeating-linear-gradient(to right, #1F1F1F, #1F1F1F 1.5px, transparent 1.5px, transparent 52px), repeating-linear-gradient(to bottom, #1F1F1F, #1F1F1F 1.5px, transparent 1.5px, transparent 52px)";

const lightBg =
  "repeating-linear-gradient(to right, #EEF0F3, #EEF0F3 1.5px, transparent 1.5px, transparent 52px), repeating-linear-gradient(to bottom, #EEF0F3, #EEF0F3 1.5px, transparent 1.5px, transparent 52px)";

const DraggableComponent = () => {
  const dispatch = useDispatch();
  const updateXarrow = useXarrow();
  const [background, setBackground] = useState(lightBg);

  const items = useSelector((state: TRootState) => state.dnd.draggableItems);
  const relations = useSelector((state: TRootState) => state.dnd.relations);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    dispatch(
      setDraggableItems(
        items.map((item) =>
          item.id === active.id
            ? {
                ...item,
                property: {
                  ...item.property,
                  y: Math.max(0, item.property.y + delta.y),
                  x: Math.max(0, item.property.x + delta.x),
                },
              }
            : item
        )
      )
    );
    updateXarrow();
  };

  const handleDragMove = () => {
    updateXarrow();
  };

  return (
    <div
      className="size-full overflow-auto max-sm:mt-96"
      style={{
        background: background,
      }}
    >
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        onDragMove={handleDragMove}
      >
        <Xwrapper>
          <DroppableArea>
            {items.map((item) => (
              <DraggableItem key={item.id} data={item} />
            ))}

            {relations?.map((arrow, index) => (
              <Xarrow
                start={arrow.start}
                end={arrow.end}
                key={index}
                path="grid"
              />
            ))}
          </DroppableArea>
        </Xwrapper>
      </DndContext>
    </div>
  );
};
export default DraggableComponent;
