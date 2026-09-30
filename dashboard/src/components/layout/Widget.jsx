function Widget({ title, subtitle, actions, children, className = '' }) {
  return (
    <section className={`widget ${className}`}>
      <header className="widget__header">
        <div>
          <h2 className="widget__title">{title}</h2>
          {subtitle && <p className="widget__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="widget__actions">{actions}</div>}
      </header>
      <div className="widget__body">{children}</div>
    </section>
  );
}

export default Widget;
