import { Coordinate } from "../types/types";

const FOOD_SIZE_IN_CELLS = 2; // food is 20px = 2 cells (food.tsx)
const MARGIN = 1;             // empty cells kept between food and the border

export const RandomFoodPosition = (bounds: { xMax: number; yMax: number }): Coordinate => {
    const minX = MARGIN;
    const minY = MARGIN;
    const maxX = bounds.xMax - MARGIN - FOOD_SIZE_IN_CELLS + 1;
    const maxY = bounds.yMax - MARGIN - FOOD_SIZE_IN_CELLS + 1;

    return {
        x: minX + Math.floor(Math.random() * (maxX - minX + 1)),
        y: minY + Math.floor(Math.random() * (maxY - minY + 1)),
    };
};

export default RandomFoodPosition;