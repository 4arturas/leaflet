const { useState } = React;
const { Button } = MaterialUI;

function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Click me!
            </Button>
            <p>Button clicked {count} times</p>
        </div>
    );
}