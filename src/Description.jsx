import React from "react";

export default function Description(props) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={(e) => props.editEnabled(e, props.entry)}
        />
      </td>
      <td
        contentEditable={props.entry.isEditable}
        onInput={(e) => props.changeHandler(e.target.innerText, props.entry.id)}
      >
        {props.entry.Description}
      </td>
    </tr>
  );
}
