'use client';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SELECT_INPUT_SIZES = {
  sm: 'text-sm px-2 py-1',
  md: 'text-base px-3 py-2',
  lg: 'text-lg px-4 py-3',
};

const Select = ({
  label,
  name,
  value,
  options,
  onChange,
  color = 'blue',
  size = 'md',
  className = '',
  borderSize = 1,
  hideBorder = false,
  readOnly = false,
}) => {
  const borderColorClass = hideBorder ? 'border-none' : `border-${color}-${borderSize * 100}`;
  const selectClasses = classNames(
    'rounded-md w-full focus:outline-none',
    SELECT_INPUT_SIZES[size],
    borderColorClass,
    className,
    { 'bg-gray-100 cursor-not-allowed': readOnly }
  );

  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="px-4 py-3 text-sm font-medium text-black rounded border-black-700">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={readOnly ? undefined : onChange}
        className={selectClasses}
        disabled={readOnly}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(SELECT_INPUT_SIZES)),
  className: PropTypes.string,
  borderSize: PropTypes.number,
  hideBorder: PropTypes.bool,
  readOnly: PropTypes.bool,
};

Select.defaultProps = {
  color: 'blue',
  size: 'md',
  className: '',
  borderSize: 1,
  hideBorder: false,
  readOnly: false,
};

export default Select;
