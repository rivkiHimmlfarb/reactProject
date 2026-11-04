import { useState } from 'react';
import './AddItemForm.css';

/**
 * טופס להוספת מוצר למארז.
 * הנתונים המוקלדים מנוהלים ב-State מקומי של הטופס.
 * רק בלחיצה על "אישור" הפריט נשלח ל-App דרך onAdd.
 */
function AddItemForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const numericPrice = Number(price);

    // בדיקת תקינות: שם לא ריק ומחיר תקין (0 ומעלה)
    if (!trimmedName || !Number.isFinite(numericPrice) || numericPrice < 0) {
      return;
    }

    onAdd(trimmedName, numericPrice);

    // איפוס השדות לאחר הוספה
    setName('');
    setPrice('');
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="שם המוצר"
        aria-label="שם המוצר"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="מחיר"
        aria-label="מחיר"
        min="0"
        step="0.01"
        required
      />
      <button type="submit">אישור</button>
    </form>
  );
}

export default AddItemForm;
