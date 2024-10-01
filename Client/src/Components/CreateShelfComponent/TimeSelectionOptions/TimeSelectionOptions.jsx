const TimeSelectionOptions = ({ is24Hours, handleRadioChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">Opening Time:</label>
      <div className="flex items-center">
        <input
          type="radio"
          id="24hours"
          name="timeOption"
          value="24hours"
          checked={is24Hours}
          onChange={handleRadioChange}
          className="mr-2"
        />
        <label htmlFor="24hours" className="mr-4">
          24 Hours
        </label>
        <input
          type="radio"
          id="customTime"
          name="timeOption"
          value="customTime"
          checked={!is24Hours}
          onChange={handleRadioChange}
          className="mr-2"
        />
        <label htmlFor="customTime">Custom Time</label>
      </div>
    </div>
  );
};

export default TimeSelectionOptions;
