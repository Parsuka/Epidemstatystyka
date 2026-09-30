function Button({ children, onClick, variant = 'primary', disabled = false, ariaLabel }) {
  return (
    <button
      type="button"
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default Button;
