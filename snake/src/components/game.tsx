import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction } from '../types/types';
import Snake from './snake';
import { CheckGameOver } from '../utilis/checkOver';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game() {
    const [direction, setDirection] = React.useState<Direction>(Direction.RIGHT);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!isPaused && !isGameOver) {
            const intervalID = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalID)
        }
    }, [snake, isGameOver, isPaused])

    const moveSnake = () => {
        const snakeHead = snake[0]
        const newHead = { ...snakeHead };

        if(CheckGameOver(newHead,GAME_BOUNDS)){
            setIsGameOver((prev)=>!prev);
            return;
        }

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
        setSnake([newHead,...snake.slice(0,-1)])
        const newSnake = [newHead, ...snake];
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
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Colors.background,
    }
})