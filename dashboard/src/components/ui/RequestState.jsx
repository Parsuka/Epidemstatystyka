import Button from './Button';

function RequestState({ isLoading, error, isEmpty, onRetry, emptyText = 'Даних немає', children }) {
  if (isLoading) {
    return (
      <div className="request-state" role="status">
        <span className="spinner" aria-hidden="true" />
        <p>Завантаження даних…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="request-state request-state--error" role="alert">
        <p>Не вдалося завантажити дані: {error.message}</p>
        {onRetry && <Button onClick={onRetry}>Спробувати ще раз</Button>}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="request-state">
        <p>{emptyText}</p>
      </div>
    );
  }

  return children;
}

export default RequestState;
