import React from "react";

export const CheckBoxInputSecond = ({
  checked=false,
  onInputChange,
  label,
  nameClass
}) => {
 
  
  return (
    <div className={nameClass}>
        <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onInputChange((prev) => !prev)}
              className={
                checked ? "checked setting-checkbox" : "setting-checkbox"
              }
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 24 24"
              style={{cursor: "pointer"}}
            >
              <polygon
                width={18}
                height={18}
                fill-rule="evenodd"
                points="9.707 14.293 19 5 20.414 6.414 9.707 17.121 4 11.414 5.414 10"
              />
            </svg>
          </label>
          <span>{label}</span>
        </div>
  );
};
