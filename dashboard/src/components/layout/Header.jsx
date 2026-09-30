function Header({ title, updatedAt }) {
  const date = new Date(updatedAt).toLocaleDateString('uk-UA');

  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <p className="header__meta">Дані станом на {date} (mock)</p>
    </header>
  );
}

export default Header;
