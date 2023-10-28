import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card';

const CustomCard = styled(Card)(() => ({
    width: 'max-content',
    height: 'max-height',
    border: '1px solid #1C55FF',
    boxShadow: 'none',
    padding: '15px',
    borderRadius: '10px'
}))

export default function BlueCard({children, className}) {
    return (<>
        <CustomCard className={className}>
            {children}
        </CustomCard>
    </>)
}