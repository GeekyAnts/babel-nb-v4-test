import './App.css';
import { View, Text } from "react-native-web";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <View style={{ backgroundColor: "red", padding: 16 }}>
          <Text>Awesome</Text>
        </View>

        <Box p="4" bg="red">
          <Text>Awesome</Text>
        </Box>

      </header>
    </div>
  );
}

export default App;
