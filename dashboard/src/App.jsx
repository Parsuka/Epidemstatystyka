import DashboardLayout from './components/layout/DashboardLayout';
import Widget from './components/layout/Widget';
import KpiCard from './components/widgets/KpiCard';
import Counter from './components/widgets/Counter';
import Toggle from './components/widgets/Toggle';
import FilteredList from './components/widgets/FilteredList';
import {
  continentLabels,
  continents,
  countries,
  globalStats,
  kpiCards,
  topCountries,
} from './data/mockData';
import './App.css';

function App() {
  return (
    <DashboardLayout title="Епідемстатистика" updatedAt={globalStats.updated}>
      <Widget title="Ключові показники" subtitle="COVID-19, світ" className="widget--wide">
        <div className="kpi-grid">
          {kpiCards.map((card) => (
            <KpiCard key={card.id} title={card.title} value={card.value} change={card.change} />
          ))}
        </div>
      </Widget>

      <Widget title="Горизонт аналізу" subtitle="Період ковзного середнього">
        <Counter label="Кількість днів" initialValue={7} min={1} max={30} unit="дн." />
      </Widget>

      <Widget title="Топ-5 країн" subtitle="Перемикання одиниць виміру">
        <Toggle countries={topCountries} />
      </Widget>

      <Widget title="Країни за континентом" subtitle="Фільтрований список">
        <FilteredList items={countries} categories={continents} categoryLabels={continentLabels} />
      </Widget>
    </DashboardLayout>
  );
}

export default App;
