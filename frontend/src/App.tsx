import Header from "./components/Header/Header";
import './App.css';
import InputForm from "./components/InputForm/InputForm";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="left-wrapper">
          <InputForm />
        </div>

        <div className="right-wrapper">
          <table>
            <thead>
              <tr>
                <td>Дата и время</td>
                <td>Тип</td>
                <td>Имя Кл.</td>
                <td>Телефон Кл.</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>18-12-2025-13:00:00</td>
                <td>Маникюр</td>
                <td>Алиса</td>
                <td>8(908)792-92-31</td>
              </tr>
              <tr>
                <td>18-12-2025-13:00:00</td>
                <td>Маникюр</td>
                <td>Алиса</td>
                <td>8(908)792-92-31</td>
              </tr>
              <tr>
                <td>18-12-2025-13:00:00</td>
                <td>Маникюр</td>
                <td>Алиса</td>
                <td>8(908)792-92-31</td>
              </tr>
              <tr>
                <td>18-12-2025-13:00:00</td>
                <td>Маникюр</td>
                <td>Алиса</td>
                <td>8(908)792-92-31</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
