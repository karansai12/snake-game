import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction } from '../types/types';
import Snake from './snake';
import { CheckGameOver } from '../utilis/checkOver';
import Food from './food';
import CheckEatsFood from '../utilis/checksEatsFood';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 70 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game() {
    const [direction, setDirection] = React.useState<Direction>(Direction.RIGHT);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [score,setScore] = React.useState<number>(0)

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
        if(CheckEatsFood(newHead,food,2)){
            setSnake([newHead,...snake]);
            setFood({x:Math.floor(Math.random()*GAME_BOUNDS.xMax),y:Math.floor(Math.random()*GAME_BOUNDS.yMax)});
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
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <View style={styles.boundaries}>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    boundaries: {
        width: '90%',
        height: '80%',
        borderColor: Colors.tertiary,
        borderWidth: 5,
        backgroundColor: Colors.secondary,
    }
})