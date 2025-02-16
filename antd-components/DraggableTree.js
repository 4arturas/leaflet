// DraggableTree.js
const { Tree } = antd;

function DraggableTree() {
    const x = 3; // Number of children per node
    const y = 2; // Number of nodes that have children
    const z = 2; // Depth of the tree
    const defaultData = [];
    const generateData = (_level, _preKey, _tns) => {
        const preKey = _preKey || '0';
        const tns = _tns || defaultData;
        const children = [];
        for (let i = 0; i < x; i++) {
            const key = `${preKey}-${i}`;
            tns.push({
                title: key,
                key,
            });
            if (i < y) {
                children.push(key);
            }
        }
        if (_level < 0) {
            return tns;
        }
        const level = _level - 1;
        children.forEach((key, index) => {
            tns[index].children = [];
            generateData(level, key, tns[index].children);
        });
    };

    generateData(z);

    const [gData, setGData] = React.useState(defaultData);
    const [expandedKeys] = React.useState(['0-0', '0-0-0']);

    const onDragEnter = (info) => {
        console.log(info);
        // expandedKeys, set it when controlled is needed
        // setExpandedKeys(info.expandedKeys)
    };

    const onDrop = (info) => {
        console.log(info);
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };

        const data = [...gData];
        let dragObj;

        // Find dragObject
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                item.children.unshift(dragObj);
            });
        } else {
            let ar = [];
            let i;
            loop(data, dropKey, (_item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                // Drop on the top of the drop node
                ar.splice(i, 0, dragObj);
            } else {
                // Drop on the bottom of the drop node
                ar.splice(i + 1, 0, dragObj);
            }
        }

        setGData(data);
    };

    return (
        <div style={{ padding: '16px' }}>
            <h3>Draggable Tree Example</h3>
            <Tree
                className="draggable-tree"
                defaultExpandedKeys={expandedKeys}
                draggable
                blockNode
                onDragEnter={onDragEnter}
                onDrop={onDrop}
                treeData={gData}
            />
        </div>
    );
}