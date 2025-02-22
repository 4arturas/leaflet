const { Table } = antd;

function RecursiveTable({ data }) {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const hasChildren = (record) => Array.isArray(record.children) && record.children.length > 0;

    const expandedRowRender = (record) => {
        if (hasChildren(record)) {
            return (
                <RecursiveTable data={record.children} />
            );
        }
        return null;
    };

    return (
        <Table
            columns={columns}
            dataSource={data}
            expandable={{
                expandedRowRender,
                rowExpandable: (record) => hasChildren(record),
            }}
            pagination={true}
        />
    );
}

function ExpandableTable()
{
    const data = [
        {
            key: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            children: [
                {
                    key: 11,
                    name: 'Jim Green Jr.',
                    age: 10,
                    address: 'New York No. 1 Lake Park',
                    children: [
                        {
                            key: 111,
                            name: 'Jane Doe',
                            age: 5,
                            address: 'New York No. 1 Lake Park',
                        },
                    ],
                },
            ],
        },
        {
            key: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            children: [
                {
                    key: 21,
                    name: 'James Bond',
                    age: 7,
                    address: 'London No. 1 Lake Park',
                },
            ],
        },
        {
            key: 3,
            name: 'Not Expandable',
            age: 29,
            address: 'Jiangsu No. 1 Lake Park',
        },
        {
            key: 4,
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            children: [
                {
                    key: 41,
                    name: 'Emily White',
                    age: 8,
                    address: 'Sydney No. 1 Lake Park',
                },
            ],
        },
    ];

    const { value, setValue } = React.useContext(MyContext);
    return (
        <div style={{ padding: '16px' }}>
            <h3>Infinite Expandable Table Example {value}</h3>
            <RecursiveTable data={data} />
        </div>
    );
}

