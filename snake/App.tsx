import 'react-native-gesture-handler';
import Game from "./src/components/game";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native';


const App = () =>(
 <GestureHandlerRootView style={{ flex: 1 }}>
  <Game/>
 </GestureHandlerRootView> 
  )

export default App;