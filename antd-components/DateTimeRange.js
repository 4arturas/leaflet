// DateTimeRange.js
const { useState } = React;
const { DatePicker, Button, Space } = antd;

function DateTimeRange() {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handleFromChange = (date) => {
        setFromDate(date);
    };

    const handleToChange = (date) => {
        setToDate(date);
    };

    const handleSetDates = () => {
        const today = dayjs(); // Get the current date and time
        const fromDateValue = today.subtract(1, 'day'); // Current date minus one day
        const toDateValue = today.add(1, 'day'); // Current date plus one day

        // Update the state with the new values
        setFromDate(fromDateValue);
        setToDate(toDateValue);
    };

    return (
        <div style={{ padding: '16px' }}>
            <h3>Select a Date and Time Range:</h3>
            {/* Use Space component for compact layout */}
            <Space direction="horizontal" size={8} style={{ marginBottom: '16px' }}>
                <span>From:</span>
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: '200px' }}
                    value={fromDate}
                    onChange={handleFromChange}
                />
                <span>to</span>
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: '200px' }}
                    value={toDate}
                    onChange={handleToChange}
                />
            </Space>
            <Button type="primary" onClick={handleSetDates} style={{ marginBottom: '16px' }}>
                Set Dates (Yesterday - Tomorrow)
            </Button>
            <div>
                <p>
                    Selected From:{' '}
                    {fromDate ? fromDate.format('YYYY-MM-DD HH:mm:ss') : 'Not selected'}
                </p>
                <p>
                    Selected To:{' '}
                    {toDate ? toDate.format('YYYY-MM-DD HH:mm:ss') : 'Not selected'}
                </p>
            </div>
        </div>
    );
}