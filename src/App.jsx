import { useState } from 'react';
import Package from './Package';
import { STATUS, initialPackages } from './data';
import './App.css';

// מחזיר מזהה ייחודי חדש לפי המקסימום הקיים (עמיד למחיקות מהאמצע)
const nextId = (list) =>
  list.length === 0 ? 1 : Math.max(...list.map((item) => item.id)) + 1;

function App() {
  const [packages, setPackages] = useState(initialPackages);

  // מספר המארזים שנמצאים בתהליך הרכבה
  const buildingCount = packages.filter((pkg) => pkg.status === STATUS.BUILDING).length;

  // מעדכן מארז בודד לפי id — משאיר את שאר המערך ללא שינוי
  const updatePackage = (id, updater) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...updater(pkg) } : pkg)),
    );
  };

  const handleStart = (id) => {
    updatePackage(id, () => ({ status: STATUS.BUILDING }));
  };

  const handleRemove = (id, itemId) => {
    updatePackage(id, (pkg) => ({
      items: pkg.items.filter((item) => item.id !== itemId),
    }));
  };

  const handleAdd = (id, name, price) => {
    updatePackage(id, (pkg) => ({
      items: [...pkg.items, { id: nextId(pkg.items), name, price }],
    }));
  };

  // סגירה: ניקוי הפריטים וחזרה למצב "ריק"
  const handleClose = (id) => {
    updatePackage(id, () => ({ status: STATUS.NEW, items: [] }));
  };

  return (
    <main className="app" dir="rtl">
      <header className="app-header">
        <h1>ניהול מארזי שי🎀</h1>
        <div className="header-stats">
          <span>סה״כ מארזים: {packages.length}</span>
          <span>בהרכבה: {buildingCount}</span>
        </div>
      </header>

      <section className="packages-grid">
        {packages.map((pkg) => (
          <Package
            key={pkg.id}
            index={pkg.id}
            target={pkg.target}
            status={pkg.status}
            items={pkg.items}
            onStart={() => handleStart(pkg.id)}
            onRemove={(itemId) => handleRemove(pkg.id, itemId)}
            onAdd={(name, price) => handleAdd(pkg.id, name, price)}
            onClose={() => handleClose(pkg.id)}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
