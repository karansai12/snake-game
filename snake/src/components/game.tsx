import * as React from 'react';
import { StyleSheet, View, SafeAreaView,LayoutChangeEvent, Text } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction } from '../types/types';
import Snake from './snake';
import { CheckGameOver } from '../utilis/checkOver';
import Food from './food';
import CheckEatsFood from '../utilis/checksEatsFood';
import RandomFoodPosition from '../utilis/randomFoodPosition';
import Header from './header';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const CELL_SIZE = 10
const BORDER_WIDTH = 5
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 1;

export default function Game() {
    const [direction, setDirection] = React.useState<Direction>(Direction.RIGHT);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [score,setScore] = React.useState<number>(0)
    const [bounds, setBounds] = React.useState<{ xMin: number; xMax: number; yMin: number; yMax: number } | null>(null);

   React.useEffect(() => {
    if (!bounds || isPaused || isGameOver) return;
    const intervalID = setInterval(() => {
        moveSnake();
    }, MOVE_INTERVAL);
    return () => clearInterval(intervalID);
}, [snake, isGameOver, isPaused, bounds]);

    const moveSnake = () => {
        if(!bounds)return;
        const snakeHead = snake[0]
        const newHead = { ...snakeHead };

        switch (direction) {
            case Direction.UP:
                newHead.y -= 1;
                break;
            case Direction.DOWN:
                newHead.y += 1;
                break;
            case Direction.LEFT:
                newHead.x -= 1;
                break;
            case Direction.RIGHT:
                newHead.x += 1;
                break;  
        }

        if(CheckGameOver(newHead,bounds)){
            setIsGameOver(true);
            return;
        }

        if(CheckEatsFood(newHead,food,2)){
            setSnake([newHead,...snake]);
            setFood(RandomFoodPosition(bounds));
            setScore(score + SCORE_INCREMENT);
        }else{
            setSnake([newHead,...snake.slice(0,-1)])
        }
    }



    const handleGesture = (event: any) => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.RIGHT);
            } else {
                setDirection(Direction.LEFT);
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.DOWN);
            } else {
                setDirection(Direction.UP);
            }
        }
       
    }
    const handleBoardLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    // layout size includes the border; snake cells are positioned inside it
    const innerW = width - BORDER_WIDTH * 2;
    const innerH = height - BORDER_WIDTH * 2;
    setBounds({
        xMin: 0,
        xMax: Math.floor(innerW / CELL_SIZE) - 1,
        yMin: 0,
        yMax: Math.floor(innerH / CELL_SIZE) - 1,
    });
};

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setDirection(Direction.RIGHT);
        setIsGameOver(false);
        setIsPaused(false);
        setScore(0);
    }

    const pauseGame = () => {
        setIsPaused(!isPaused);
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <Header isPaused={isPaused} pauseGame={pauseGame} reloadGame={reloadGame}>
                    <Text>Snake Game</Text>
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>Score: {score}</Text>
                </Header>
                <View style={styles.boundaries} onLayout={handleBoardLayout}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
    },
        boundaries: {
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: Colors.tertiary,
        borderWidth: 5,
        backgroundColor: Colors.secondary,
    },
})