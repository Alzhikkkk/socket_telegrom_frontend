import { Routes, Route, useLocation} from "react-router-dom";
import {Provider} from 'react-redux'
import Main from "./pages/main";
import Login from "./pages/login";
import configureStore from './store';
import Registration from "./pages/registration";
import io from "socket.io-client";
const socket = io.connect('https://apitelegram.alzhik.site')

const store = configureStore()
function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration />}/>
          </Routes>
      </div>
    </Provider>
  );
}

export default App;
