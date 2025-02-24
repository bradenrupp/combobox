import React from 'react'
import { useCombobox } from 'downshift'

export function ComboBox({ id, options }) {
    const [items, setItems] = React.useState(options)

    function getOptionsFilter(inputValue) {
        const lowerCasedInputValue = inputValue.toLowerCase()
        return (option) =>
            !inputValue ||
            option.label.toLowerCase().includes(lowerCasedInputValue) ||
            option.value.toLowerCase().includes(lowerCasedInputValue)
    }

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        selectedItem,
    } = useCombobox({
        onInputValueChange({ inputValue }) {
            setItems(options.filter(getOptionsFilter(inputValue)))
        },
        items,
        itemToString: (item) => (item ? item.label : ''),
    })

    return (
        <div
            id={id}
            style={{
                position: 'relative',
                width: 300,
                margin: '16px 0',
                fontFamily: 'Roboto, sans-serif',
            }}
        >
            <label
                {...getLabelProps()}
                style={{
                    display: 'block',
                    marginBottom: 4,
                    fontSize: '0.9rem',
                    color: '#757575',
                }}
            >
                Choose an option:
            </label>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #757575',
                    borderRadius: 4,
                    padding: '4px 8px',
                }}
            >
                <input
                    {...getInputProps()}
                    placeholder="Select..."
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: '1rem',
                    }}
                />
                <button
                    type="button"
                    aria-label="toggle menu"
                    {...getToggleButtonProps()}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        color: '#757575',
                    }}
                >
                    {isOpen ? '\u25B2' : '\u25BC'}
                </button>
            </div>
            <ul
                {...getMenuProps()}
                style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: 200,
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 1,
                    display: isOpen && items.length ? 'block' : 'none',
                }}
            >
                {isOpen &&
                    items.map((item, index) => (
                        <li
                            key={item.value}
                            {...getItemProps({ item, index })}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: highlightedIndex === index ? '#eeeeee' : '#fff',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                cursor: 'pointer',
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default ComboBox
