import React from 'react'

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import SettingsList from './SettingsList';
import SideNavigation from '../partials/SideNavigation';


const Settings = () => {
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="settings" />
          <main>
            <Header title="Settings" subtitle="Welcome to Jollibee" />
            <div className='p-5'>
                <SettingsList/>
            </div>
          
            <Footer />
          </main>
        </div>
      </section>
    </>
  );
}

export default Settings
