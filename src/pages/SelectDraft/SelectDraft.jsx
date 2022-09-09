import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import { SelectLinks, Wrap } from './SelectDraft.styles';

function SelectDraft() {
    return (
      <Wrap>
        <h1>Select Draft Mode</h1>
        <SelectLinks>
          <Link to="/draft-configuration">Single Player</Link>
          <Link to="#">Multy-User</Link>
        </SelectLinks>
      </Wrap>
    );
}

export default SelectDraft;