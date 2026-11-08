import { useParams } from 'react-router';
import CountryContainer from '../containers/CountryContainer';

function CountryPage() {
  const { code } = useParams();
  return <CountryContainer key={code} code={code} />;
}

export default CountryPage;
