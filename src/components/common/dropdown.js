import { Select, MenuItem, FormControl } from '@mui/material'
import styles from '@/styles/components/common/Dropdown.module.scss'

export default function CustomDropdown({
    value,
    onChange,
    data,
    placeholder,
    isMulti
}) {

    const handleSelectChange = (event) => {
        onChange(event); // Mengirim event onChange ke parent component
    };

    return(<>
        <FormControl sx={{ minWidth: 165 }} size="small" className={styles.wrapper}>
            <Select
                value={value}
                onChange={handleSelectChange}
                placeholder={placeholder}
                multiple={isMulti}
                sx={{
                    [`& .css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper`]: { left: '265px !important' },
                }}
            >
                {data?.length > 0 && data?.map((item, index) => (
                    <MenuItem value={item.value} key={index + 1}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    </>)
}