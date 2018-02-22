import React from 'react';

export class Ad extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return(
      <div className='ad'>
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          google-ad-client='ca-pub-6315109878837903'
          enable_page_level_ads='true'
        />
      </div>
    );
  }
}
