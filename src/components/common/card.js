import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card';

const StyledCard = styled(Card)(() => ({
    width: 'max-content',
    height: 'max-height',
    padding: '15px',
    borderRadius: '10px'
}))

export default function CustomCard({children, sx, className}) {
    return(<>
        <StyledCard 
            variant='outlined' 
            sx={sx}
            className={className}
        >
            {children}
        </StyledCard>
    </>)
}