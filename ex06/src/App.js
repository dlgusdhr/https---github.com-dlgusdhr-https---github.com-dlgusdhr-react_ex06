
import './App.css';
import RouterPage from './components/RouterPage';
import any from './images/any.jpg'

function App() {
  return (
    <div className="App">
        <img src={any} width="100%"/>
            <h1>리액트 시작</h1>
            <RouterPage/>
    </div>
  );
}

export default App;
