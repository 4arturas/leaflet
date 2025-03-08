const { Input, Button, Spin, Alert, Card } = antd;

function ApiCaller() {
    const [inputValue, setInputValue] = React.useState('Could you describe what is philosophy using 10 words, please');
    const [output, setOutput] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleButtonClick = async () => {
        if (!inputValue.trim()) {
            setError('Input cannot be empty.');
            return;
        }

        setLoading(true);
        setError(null);
        setOutput(null);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts":[{"text": `${inputValue}`}]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const result = await jsonata("candidates[*].content.parts[*].text").evaluate(data);
            const output = marked.parse(result);

            setOutput(output);
        } catch (err) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>API Caller Example</h3>

            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Enter a prompt"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ width: '300px', marginRight: '10px' }}
                />
                <Button
                    type="primary"
                    onClick={handleButtonClick}
                    disabled={loading}
                >
                    {loading ? 'Calling API...' : 'Call API'}
                </Button>
            </div>

            {loading && (
                <Spin tip="Loading..." style={{ display: 'block', margin: '20px 0' }} />
            )}

            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ marginBottom: '20px' }}
                />
            )}

            {output && (
                <Card title="API Response" style={{ marginTop: '20px' }}>
                    <div dangerouslySetInnerHTML={{ __html: output }} />
                </Card>
            )}
        </div>
    );
}