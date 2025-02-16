const { useState, useEffect, useRef } = React;
const { TextField, Button } = MaterialUI;

function SecondTabComponent() {
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const inputRefFrom = useRef(null);
    const inputRefTo = useRef(null);

    // Initialize flatpickr for "from" date picker with time
    useEffect(() => {
        if (inputRefFrom.current) {
            flatpickr(inputRefFrom.current, {
                enableTime: true,
                dateFormat: "Y-m-d H:i:S",
                time_24hr: true,
                onChange: (selectedDates) => {
                    setDateFrom(formatDateTime(selectedDates[0]));
                },
            });
        }
    }, []);

    // Initialize flatpickr for "to" date picker with time
    useEffect(() => {
        if (inputRefTo.current) {
            flatpickr(inputRefTo.current, {
                enableTime: true,
                dateFormat: "Y-m-d H:i:S",
                time_24hr: true,
                onChange: (selectedDates) => {
                    setDateTo(formatDateTime(selectedDates[0]));
                },
            });
        }
    }, []);

    // Helper function to format date-time with milliseconds
    const formatDateTime = (date) => {
        return `${date.toISOString().replace('T', ' ').split('.')[0]}.${(date.getMilliseconds() + '').padStart(3, '0')}`;
    };

    // Handle button click to display the selected dates with time
    const handleButtonClick = () => {
        if (dateFrom && dateTo) {
            alert(`Selected from ${dateFrom} to ${dateTo}`);
        } else {
            alert('Please select both "from" and "to" dates.');
        }
    };

    // Handle button click to set predefined date-time values
    const handleSetPredefinedDates = () => {
        // Define the predefined date-time values with milliseconds
        const fromDate = new Date("2025-02-16T10:11:12.123Z");
        const toDate = new Date("2025-02-17T20:12:12.321Z");

        // Manually set the milliseconds
        fromDate.setMilliseconds(123);
        toDate.setMilliseconds(321);

        // Format the date-time strings with milliseconds
        const formattedFromDate = formatDateTime(fromDate);
        const formattedToDate = formatDateTime(toDate);

        // Set the state for dateFrom and dateTo
        setDateFrom(formattedFromDate);
        setDateTo(formattedToDate);

        // Update the flatpickr instances with the predefined values
        if (inputRefFrom.current && inputRefTo.current) {
            inputRefFrom.current._flatpickr.setDate(fromDate, true);
            inputRefTo.current._flatpickr.setDate(toDate, true);

            // Override the displayed value in the input fields
            inputRefFrom.current.value = formattedFromDate;
            inputRefTo.current.value = formattedToDate;
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <TextField
                label="From (Date & Time)"
                variant="outlined"
                fullWidth
                value={dateFrom || ''}
                inputRef={inputRefFrom}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    readOnly: true,
                    style: { cursor: 'pointer' },
                }}
                sx={{ mb: 2 }}
            />
            <TextField
                label="To (Date & Time)"
                variant="outlined"
                fullWidth
                value={dateTo || ''}
                inputRef={inputRefTo}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    readOnly: true,
                    style: { cursor: 'pointer' },
                }}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
                disabled={!dateFrom || !dateTo}
                sx={{ mb: 2 }}
            >
                Submit Dates
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleSetPredefinedDates}
            >
                Set Predefined Dates
            </Button>
        </div>
    );
}