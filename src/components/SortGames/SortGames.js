import React, {Component} from 'react';

export default
class SortGames extends Component {
  render() {
    return (
      <div>
        <span><h4>Aanbevolen koppelingen</h4></span>
        <hr/>
        <ul>
          <li>Laatste Releases</li>
          <li>Verwacht</li>
          <li>Deals En Aanbiedingen</li>
          <li>Populairst</li>
          <li>Ontdek</li>
        </ul>

        <span><h4>Platform</h4></span>
        <hr/>
        <ul>
          <li>PS4</li>
          <li>PS3</li>
          <li>PS Vita</li>
          <li>PSP</li>
        </ul>

        <span><h4>Type content</h4></span>
        <hr/>
        <ul>
          <li>Alle Games</li>
          <li>DLC</li>
          <li>Demo's</li>
          <li>Thema's</li>
          <li>Avatars</li>
        </ul>

        <span><h4>Genres</h4></span>
        <hr/>
        <ul>
          <li>Actie En Adventure</li>
          <li>Arcade</li>
          <li>Rijden En Racen</li>
          <li>Vechten</li>
          <li>Horror</li>
          <li>Kinderne En Familie</li>
          <li>Feest, Muziek En Dans</li>
          <li>Platform</li>
          <li>Puzzelen</li>
          <li>RPG</li>
          <li>Schieten</li>
          <li>Simulatie</li>
          <li>Sport</li>
          <li>Strategie</li>
          <li>Uniek</li>
        </ul>
      </div>
    );
  }
}
