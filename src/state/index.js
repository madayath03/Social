import { createSlice } from "@reduxjs/toolkit";

// below states are global ones so we dont have to pass it between compoenents
const initialState = {
    // mode for light and dark
    mode: "light",
    user: null,
    token: null,
    // for all the posts
    posts: [],
    search: "",
    friendSearch: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    // reducers are just functions tht modify the global states
    reducers: {

        // changing light to dark mode or vice versa
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        // user and token to kept at payload
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        // removing user and token from payload
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        // if user is there, then show the friends or else not
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },

        // show the posts
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        // for keeping deleted post id
        setDeletedPostId: (state, action) => {
            state.deletedpost = action.payload.deletedpost;
        },

        // for keeping search query
        setSearch: (state, action) => {
            state.search = action.payload.search;
        },

        // for keeping search query
        setFriendSearch: (state, action) => {
            state.friendSearch = action.payload.friendSearch;
        },


        // updated post once we like or dislike
        // so the updated post will have the changed post
        // we will map thru each post nd compare to post in updated post
        // if we find match, that post is returned
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setSearch, setFriendSearch, setDeletedPostId } =
    authSlice.actions;
export default authSlice.reducer;
