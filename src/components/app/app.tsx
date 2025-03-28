import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppBody, AppHeader } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppBody />
  </div>
);

export default App;
