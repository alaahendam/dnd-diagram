export type TDraggableItem = {
  id: number;
  label?: string;
  property: {
    rounded: string;
    height: number;
    width: number;
    angle: number;
    color: string;
    x: number;
    y: number;
  };
};

export type TRelation = {
  start: string;
  end: string;
};
