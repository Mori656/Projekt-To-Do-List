import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import type { ElementType } from 'react'

type StatsCardProps = {
  title: string
  value: number
  icon: ElementType
  color: string
  bgColor: string
}

export default function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, backgroundColor: bgColor }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ color }}>
          {title}
        </Typography>
        <Box sx={{ color }}>
          <Icon />
        </Box>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color }}>
        {value}
      </Typography>
    </Paper>
  )
}
