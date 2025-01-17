import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img 
          className="header__image" 
          src="./images/869d96f64fac176bfd26aef2d3fcc429.png" 
          alt="logo" 
        />

        <ul className="header__list">
          <li className="list__item">
            <a className="list__link" href="">Войти</a>
          </li>
          <li className="list__item">
            <a className="list__link" href="">Регистрация</a>
          </li>
          <li className="list__item">
            <a className="list__link" href="">Приложение</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;