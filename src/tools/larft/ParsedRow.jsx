import React from "react";
import { Accordion } from "./Accordion";
import { ReactComponent as InfoIcon } from "../../filing/images/info.svg"
import { MoreInfo } from "./MoreInfo";
import { buildOptions, getType, toJsDateString } from "./parsedHelpers";
import { log, OR_DELIMITER } from "./utils";
import STATES from "../../data-browser/constants/states";
import tooltip, { Tooltip } from "../../common/Tooltip"

export const ParsedRow = ({
  column,
  highlightClass,
  row,
  onChange,
  onFocus,
}) => {
  const userInput = buildInput(column, row, onChange);
  const moreInfo = <MoreInfo field={column} />;
  const { fieldName, fieldIndex } = column;


  return (
    <tr
      key={fieldName}
      className={highlightClass}
      onClick={() => onFocus(column)}
    >
      <td className={"fieldIndex " + highlightClass}>
        <label htmlFor={fieldName}>{fieldIndex + 1}</label>
      </td>
      <td className={"fieldName " + highlightClass}>
        <label htmlFor={fieldName}>
          <Accordion
            content={moreInfo}
            heading={fieldName}
            id={`${fieldIndex}`}
          />
        </label>
      </td>
      <td className={"fieldValue " + highlightClass}>{userInput}</td>
    </tr>
  );
};

// Helps Credit Score fields from schema to allow an "Other" option
const creditScoreInputHandler = (_row, _col) => {
  // When user input value matches an option from field enumerations then display that option
  if (_col.enumerations.some(e => e.value == _row[_col.fieldName])) {
    return _row[_col.fieldName]
  }
  // Handle "Other" option return value
  else {
    return ""
  }
}

const buildPlaceholder = (exs, descs) => {
  return (exs.length ? exs : descs).join(OR_DELIMITER);
};

function buildInput(_col, _row, _changeFn) {
  log("Building input...");

  if (!_col) return null;
  const { examples = [], enumerations = [], descriptions = [] } = _col;
  const placeholder = buildPlaceholder(examples, descriptions);
  const common = {
    id: _col.fieldName,
    key: _col.fieldName,
    name: _col.fieldName,
    onChange: _changeFn,
    style: {
      border: "1px dotted grey",
      width: "100%",
      height: "100%",
      maxHeight: "3em",
      paddingLeft: "5px",
    },
  };

  // Disables input field if schema has "disable" property
  if (_col.disable == true) {
    common["disabled"] = "disabled"
  }

  // State selector
  if (_col.fieldName?.includes("State")) {
    return (
      <select {...common} value={_row[_col.fieldName] || ""}>
        {buildOptions({
          enumerations: STATES.filter(state => !["NW"].includes(state.id)).map(
            obj => ({
              value: obj.id,
              description: obj.name,
            })
          ),
        })}
      </select>
    )
  }
  // Field allows freeform text but also has enumerated values
  else if (
    examples.length &&
    enumerations.length &&
    // Accepted Enumerations - List will need to be updated with new entries.
    // Buttons or dropdowns are generated from enumerations
    enumerations.some(e =>
      ["NA", "Exempt", "7777", "8888", "9999", "No co-applicant"].includes(
        e.value
      )
    )
  ) {
    const derivedInputField = _col.fieldName.includes("Date") ? (
      <input
        className='date-input'
        {...common}
        type='date'
        onChange={e => {
          _changeFn({
            target: {
              id: e.target.id,
              value: e.target.value?.replaceAll("-", ""),
            },
          })
        }}
        value={toJsDateString(_row[_col.fieldName]?.toString() || "")}
      />
    ) : (
      <input
        className='text-input'
        {...common}
        type={getType(_col)}
        value={_row[_col.fieldName]?.toString() || ""}
        placeholder={placeholder}
      />
    )
    return (
      <div className='enum-entry'>
        {derivedInputField}
        <span className='enums'>
          {/* Generate a dropdown with enumeration options if enumerations length is 3 or larger */}
          {enumerations.length >= 3 ? (
            <select
              {...common}
              value={creditScoreInputHandler(_row, _col)}
            >
              {enumerations.map((e, idx) => {
                return (
                  <option key={`${e.value}-${idx}`} value={e.value}>
                    {e.description}
                  </option>
                )
              })}
            </select>
          ) : (
            enumerations.map((e, idx) => {
              return (
                <button
                  key={`${e.value}-${idx}`}
                  className={
                    e.value === _row[_col.fieldName] ? "enum selected" : "enum"
                  }
                  onClick={() =>
                    _changeFn({
                      target: { id: _col.fieldName, value: e.value },
                    })
                  }
                >
                  {e.description !== e.value ? e.description : e.value}
                </button>
              )
            })
          )}
        </span>
      </div>
    )
  } else if (enumerations.length) {
    // Enumerations only
    return (
      <select {...common} value={_row[_col.fieldName] || ""}>
        {buildOptions(_col)}
      </select>
    )
  }
  // Displays Icon to the right of input field with a tooltip that has the tooltip text from json schemas
  else if (_col.tooltip) {
    return (
      <>
        <Tooltip id={_col.fieldName.toString()} place={"top"} effect={"solid"}>
          {_col.tooltip}
        </Tooltip>
        <div style={{ display: "flex" }}>
          <input
            className='text-input'
            {...common}
            type={getType(_col)}
            value={_row[_col.fieldName]?.toString() || ""}
            placeholder={placeholder}
            style={{ marginRight: "5px" }}
          />

          <div
            data-tip
            data-for={_col.fieldName.toString()}
            style={{ marginTop: "5px" }}
          >
            <InfoIcon
              style={{
                cursor: "pointer",
                height: "18px",
                width: "18px",
                fill: '#0071bc',
              }}
            />
          </div>
        </div>
      </>
    )
  } else {
    // Examples only
    return (
      <input
        {...common}
        type={getType(_col)}
        value={_row[_col.fieldName] || ""}
        placeholder={placeholder}
      />
    )
  }
}
