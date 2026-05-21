import { Card, CardContent, Skeleton, Box } from '@mui/material';

export function SkeletonCard() {
	return (
		<Card elevation={0} sx={{ borderRadius: 2, height: '100%' }}>
			<Skeleton variant="rectangular" height={260} animation="wave" />
			<CardContent>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Skeleton variant="text" width="80%" animation="wave" />
					<Skeleton variant="text" width="60%" animation="wave" />
				</Box>
			</CardContent>
		</Card>
	);
}