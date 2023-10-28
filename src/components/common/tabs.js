import { Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CustomTabs = styled((props) => (    
    <Tabs {...props} />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
})

export const CustomTab = styled((props) => (
    <Tab {...props} />
))({
    textTransform: 'none',
    fontWeight: '500',
    fontSize: '16px',
    marginRight: '15px',
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
})