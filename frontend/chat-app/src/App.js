import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
        <div class="title">
            <div class="column is-4">
                ChatApp
            </div>
        </div>
        
        <form class="box is-half">
            <div class="title">Welcome!</div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" placeholder="e.g. alex@example.com"></input>
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="*******"></input>
                </div>
            </div>
            <button class="button is-primary">Login</button>
        </form>
        
    </div>
  );
}

export default App;
