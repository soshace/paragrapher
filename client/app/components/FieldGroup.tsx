"use strict";

import * as React from "react";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

interface Props {
  id: string;
  label: string;
  help?: string;
  validationState?: "success" | "warning" | "error";
}

class FieldGroup extends React.PureComponent<Props, void> {

  render() {
    const { id, label, help, validationState, children } = this.props;
    return (
      <FormGroup controlId={ id }  validationState={ validationState }>
        <ControlLabel>{ label }</ControlLabel>
        { children }
        { help && <HelpBlock>{ help }</HelpBlock> }
      </FormGroup>
    );
  }

}


export default FieldGroup;
