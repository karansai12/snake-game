import { Coordinate } from "../types/types";


export const RandomFoodPosition = (maxX: number, maxY: number): Coordinate => {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    };
};

export default RandomFoodPosition;