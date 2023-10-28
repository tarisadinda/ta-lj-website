import { Chip } from '@mui/material'
import { styled } from '@mui/material/styles'

const options = {
    shouldForwardProp: (prop) => prop !== 'bgcolor',
}

export const CustomChip = styled(Chip, options)(({ bgcolor }) => ({
    color: 'white',
    backgroundColor: bgcolor,
}))