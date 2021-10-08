import React, { useState, useEffect } from 'react';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

function DateRangePicker(props) {
  const [from, setFrom] = useState();
  let [to, setTo] = useState();

  useEffect(() => {
    props.fromHandler(new Date(from).toLocaleDateString());
  }, [from, props])

  useEffect(() => {
    props.toHandler(new Date(to.state.month).toLocaleDateString());
  }, [to, props])

  const showFromMonth = () => {
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      to.getDayPicker().showMonth(from);
    }
  }

  const handleFromChange = (from) => {
    // Change the from date and focus the "to" input field
    setFrom(from);
  }

  const handleToChange = (to) => {
    setTo(to);
    showFromMonth();
  }

  const modifiers = { start: from, end: to };

  return (
    <div>
      <span className="InputFromTo input">
        <label className="label">Date : De</label>
        <DayPickerInput
          className="input"
          value={from}
          placeholder="De"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 1,
            onDayClick: () => to.getInput().focus(),
          }}
          onDayChange={handleFromChange}
        />
      </span>
      {' '}
      —{' '}
      <span className="InputFromTo-to input">
        <label className="label">Date : A</label>
        <DayPickerInput
          className="input"
          ref={el => (to = el)}
          value={to}
          placeholder="A"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { before: from },
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 1,
          }}
          onDayChange={handleToChange}
        />
      </span>
    </div>
  );
}

export default DateRangePicker;