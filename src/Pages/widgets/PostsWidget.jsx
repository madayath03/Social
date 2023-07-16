import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { BASE_URL } from "Services/base_url";


const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const searchy = useSelector((state) => state.search);
  const isDeleted = useSelector((state) => state.deletedpost);


  const getPosts = async (searchy) => {
    let url = `${BASE_URL}/posts`;
    if (searchy) {
      url += `?search=${encodeURIComponent(searchy)}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };


  const getUserPosts = async (searchy) => {
    let url = `${BASE_URL}/posts/${userId}/posts`;
    if (searchy) {
      url += `?search=${encodeURIComponent(searchy)}`;
    }

    const response = await fetch(
      url,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    setTimeout(() => {
      if (isProfile) {
        getUserPosts(searchy);
      } else {
        // getUserPosts();
        getPosts(searchy);
      }
    }, 10);
  }, [searchy, isDeleted]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts && posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          clipPath,
          attachmentPath,
          audioPath,
          userPicturePath,
          likes,
          comments
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            clipPath={clipPath}
            attachmentPath={attachmentPath}
            audioPath={audioPath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isInProfile={isProfile}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
