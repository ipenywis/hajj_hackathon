import * as React from 'react';

export interface CityInfoProps {
  info : {
    city: string;
    state: string;
    image: string;
  }
}

export default class CityInfo extends React.PureComponent < CityInfoProps > {

  componentWillMount() {
    //Search for an Image for the Place

  }

  render() {
    const {info} = this.props;
    const displayName = `${info.city}, ${info.state}`;

    return (
      <div>
        <div>
          {displayName}
          |
          <a
            target="_new"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}>
            Wikipedia
          </a>
        </div>
        <img width={240} src={info.image}/>
      </div>
    );
  }
}