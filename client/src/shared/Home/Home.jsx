import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	Grid,
	IconButton,
	Paper,
	Rating,
	Typography,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
import {Image} from 'cloudinary-react'
import React, {useEffect, useState} from 'react'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
	image: {
		width: 300,
		height: 200,
	},
})

const Home = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	const [posts, setPosts] = useState([])

	useEffect(() => {
		axios.get('http://localhost:5000/posts/get').then((response) => {
			setPosts(response.data)
		})
	}, [])

	const likePost = (id) => {
		console.log(id)
	}

	return (
		<Container maxWidth='xl'>
			<Paper
				maxWidth='xl'
				sx={{padding: '2rem', marginTop: '2rem'}}
				elevation={2}
				variant='elevation'
			>
				<Grid container direction='row' alignItems='center' justifyContent='start'>
					{posts.length === 0
						? 'Loading...'
						: posts.map((post) => {
								return (
									<Card key={post.id} sx={{maxWidth: 300, marginBottom: '2rem', margin: '1rem'}}>
										<CardHeader
											avatar={
												<Avatar sx={{bgcolor: 'green'}} aria-label='recipe'>
													{post.author.slice(0, 1)}
												</Avatar>
											}
											action={
												post.author === localStorage.getItem('name') ? (
													<HighlightOffIcon color='inherit' />
												) : null
											}
											title={post.title}
											subheader={post.author}
										/>

										<Image cloudName='bsslmves' publicId={post.image} className={classes.image} />
										<CardContent>
											<Typography
												sx={{height: '100px', overflow: 'hidden'}}
												variant='body2'
												color='text.secondary'
											>
												{post.text}
											</Typography>
										</CardContent>
										<CardActions>{post.category}</CardActions>
										<CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
											<Grid>
												<IconButton onClick={() => likePost(post.id)} aria-label='add to favorites'>
													<FavoriteIcon color='error' />
												</IconButton>
												{0}
											</Grid>

											<Rating
												name='simple-controlled'
												value={value}
												defaultValue={value}
												precision={1}
												max={5}
												onChange={(event, newValue) => {
													console.log(newValue)
													setValue(newValue)
												}}
											/>
										</CardActions>
									</Card>
								)
						  })}
				</Grid>
			</Paper>
		</Container>
	)
}

export default Home