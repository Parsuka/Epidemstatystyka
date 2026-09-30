import { useState } from 'react';
import Switch from '../ui/Switch';
import { formatNumber, perHundredThousand } from '../../utils/format';

function Toggle({ countries }) {
  const [isRelative, setIsRelative] = useState(false);

  const getCases = (item) =>
    isRelative ? perHundredThousand(item.cases, item.population) : item.cases;

  return (
    <div className="toggle">
      <Switch
        checked={isRelative}
        onChange={setIsRelative}
        leftLabel="Абсолютні"
        rightLabel="На 100 тис."
      />

      <table className="table">
        <thead>
          <tr>
            <th>Країна</th>
            <th className="table__num">
              {isRelative ? 'Випадків на 100 тис.' : 'Усього випадків'}
            </th>
          </tr>
        </thead>
        <tbody>
          {countries.map((item) => (
            <tr key={item.id}>
              <td>{item.country}</td>
              <td className="table__num">{formatNumber(getCases(item))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isRelative && (
        <p className="toggle__note">
          Відносний показник дозволяє порівнювати країни з різним населенням.
        </p>
      )}
    </div>
  );
}

export default Toggle;
