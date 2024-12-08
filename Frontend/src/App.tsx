import { Fragment } from 'react';
import './assets/scss/index.scss';
import RouteConfig from './routes/routerConfig';
import { App as AntdApp } from 'antd';
// import './App.css'

function App() {
    return (
      <Fragment>
        <AntdApp notification={{ placement: 'topRight' }}>
          <RouteConfig />
        </AntdApp>
      </Fragment>
    );
}

export default App
