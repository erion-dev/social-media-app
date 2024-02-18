import React, { useState } from "react";
import {
	Avatar,
	Container,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	Box,
	MenuItem,
	Menu,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import SortIcon from "@mui/icons-material/Sort";
import { Header } from "../components/Header";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SearchIcon from "@mui/icons-material/Search";

interface Post {
	id: number;
	user: string;
	avatar: string;
	text: string;
	photo: string;
	likes: number;
	comments: number;
	createdAt: Date;
}

const names = [
	"Sophia",
	"Liam",
	"Olivia",
	"Noah",
	"Ava",
	"Elijah",
	"Emma",
	"William",
	"Isabella",
	"James",
];

const generateFakePosts = (): Post[] => {
	// Generate fake posts with random data
	const posts: Post[] = [];
	for (let i = 1; i <= 10; i++) {
		const post: Post = {
			id: i,
			user: names[i],
			avatar: `https://i.pravatar.cc/150?img=${i}`,
			text: `This is the text of post ${i}`,
			photo: `https://picsum.photos/600/400?random=${i}`,
			likes: Math.floor(Math.random() * 100),
			comments: Math.floor(Math.random() * 50),
			createdAt: new Date(
				Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
			), // Random date in the last 30 days
		};
		posts.push(post);
	}
	return posts;
};

const Posts: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>(generateFakePosts());
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortOption, setSortOption] = useState<string>("");
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSortChange = (option: string) => {
		setSortOption(option);
		const sortedPosts = [...posts];
		if (option === "likes") {
			sortedPosts.sort((a, b) => b.likes - a.likes);
		} else if (option === "recent") {
			sortedPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
		}
		setAnchorEl(null);
		setPosts(sortedPosts);
	};

	const filteredPosts = posts.filter((post) =>
		post?.user?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAnchorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<div style={{ minWidth: "100%" }}>
			<Header />
			<Container maxWidth={"xl"} sx={{ mt: 2 }}>
				<Box display="flex">
					<TextField
						fullWidth
						variant="outlined"
						label="Search"
						value={searchTerm}
						onChange={handleSearchChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Search />
								</InputAdornment>
							),
						}}
						sx={{ mb: 2, mr: 2 }}
					/>
					<Box display="flex">
						<Button
							variant="outlined"
							id="basic-button"
							aria-controls={open ? "basic-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleAnchorClick}
							sx={{ ml: 2, whiteSpace: "nowrap", height: "56px" }}
						>
							<SortIcon /> Sort by: {sortOption}
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<MenuItem onClick={() => handleSortChange("likes")}>
								Likes
							</MenuItem>
							<MenuItem onClick={() => handleSortChange("recent")}>
								Recents
							</MenuItem>
						</Menu>
					</Box>
				</Box>

				<Grid container spacing={3}>
					{!filteredPosts.length ? (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								minHeight: "20vh",
							}}
						>
							<SearchIcon sx={{ mr: 1 }} />
							<Typography variant="h5" align="center" color="textSecondary">
								No posts found with that search criteria.
							</Typography>
						</Box>
					) : (
						filteredPosts.map((post) => (
							<Grid item xs={12} sm={6} md={4} key={post.id}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										minWidth: "260px",
									}}
								>
									<CardMedia
										component="img"
										image={post.photo}
										alt={`Post ${post.id}`}
										sx={{ objectFit: "cover", height: 200 }}
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography gutterBottom variant="h5" component="h2">
											{post.text}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											Posted by {post.user}{" "}
											{Math.floor(
												(Date.now() - post.createdAt.getTime()) /
													(1000 * 60 * 60 * 24)
											)}{" "}
											days ago
										</Typography>
									</CardContent>
									<CardActions
										sx={{ display: "flex", justifyContent: "space-between" }}
									>
										<div>
											<IconButton aria-label="add to favorites">
												<FavoriteBorderIcon /> {post.likes}
											</IconButton>
											<IconButton aria-label="comments">
												<ChatBubbleOutlineIcon />
												{post.comments}
											</IconButton>
										</div>
										<Avatar
											src={post.avatar}
											alt={post.user}
											sx={{ ml: "auto" }}
										/>
									</CardActions>
								</Card>
							</Grid>
						))
					)}
				</Grid>
			</Container>
		</div>
	);
};

export default Posts;
