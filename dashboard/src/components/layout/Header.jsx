function Header({ title, updatedAt, isLoading }) {
  const date = updatedAt ? new Date(updatedAt).toLocaleString('uk-UA') : null;
  const status = isLoading ? 'Завантаження даних…' : 'Дані недоступні';
  const meta = date ? `Дані станом на ${date} · джерело: disease.sh` : status;

  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <p className="header__meta">{meta}</p>
    </header>
  );
}

export default Header;
