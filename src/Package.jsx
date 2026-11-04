import AddItemForm from './AddItemForm';
import './Package.css';

function Package({ target, status, items, onRemove, onAdd, onStart, onClose, index }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const isNew = status === 'ריק';
  // צבע לפי מקום המארז (1–4, חוזר על עצמו מעבר לכך)
  const colorIndex = ((index - 1) % 4) + 1;

  return (
    <article className={`package package--c${colorIndex}`}>
      <header className="package__header">
        <div>
          <h2 className="package__title">מארז מספר {index}</h2>
          <span className="package__target">מיועד ל: {target}</span>
        </div>
        <span className="package__badge">{status}</span>
      </header>

      {isNew ? (
        <button type="button" className="btn btn--primary" onClick={onStart}>
          התחל להרכיב מארז
        </button>
      ) : (
        <>
          {items.length === 0 ? (
            <p className="package__empty">המארז ריק</p>
          ) : (
            <ul className="package__items">
              {items.map((item) => (
                <li key={item.id} className="package__item">
                  <span className="package__item-name">{item.name}</span>
                  <span className="package__item-price">₪{item.price}</span>
                  <button
                    type="button"
                    className="btn btn--icon"
                    onClick={() => onRemove(item.id)}
                    aria-label={`הסרת ${item.name}`}
                    title="הסרת פריט"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="package__total">
            <span>סך הכל</span>
            <strong>₪{total}</strong>
          </p>

          <AddItemForm onAdd={onAdd} />

          <button type="button" className="btn btn--success" onClick={onClose}>
            סגור ושלח מארז
          </button>
        </>
      )}
    </article>
  );
}

export default Package;
