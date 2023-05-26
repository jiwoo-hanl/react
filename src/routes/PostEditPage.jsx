import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../components/Form";
import { Link } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { getPost, getTags, updatePost, deletePost } from "../apis/api";

const PostEditPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });

  // 기존 post 불러오기
  // useEffect(() => {
  //   const post = posts.find((post) => post.id === parseInt(postId));
  //   const postFormData = { ...post, tags: post.tags.map((tag) => tag.content) };
  //   setFormData(postFormData);
  // }, [postId]);

  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      const postFormData = {
        ...post,
        tags: post.tags.map((tag) => tag.content),
      };
      setFormData(postFormData);
    };
    getPostAPI();
  }, [postId]);
	// post를 받아와서 formData에 넣어주기

  // 기존 태그 불러오기
  // TODO : api call(get all tags)
  // const [tags, setTags] = useState([]);
  // useEffect(() => {
  //   const duplicatedTagList = posts.reduce((acc, post) => {
  //     for (let tag of post.tags) {
  //       acc.add(tag.content);
  //     }

  //     return acc;
  //   }, new Set());

  //   const tagList = [...duplicatedTagList];

  //   setTags([...tagList]);
  // }, []);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
    };
    getTagsAPI();
  }, []);

  // const onSubmit = (e) => {
  //   //TODO : api connect
  //   e.preventDefault();
  //   console.log(formData);

  //   // 지워질코드
  //   const createdPost = {
  //     ...formData,
  //     like_users: [],
  //     tags: formData.tags.map((tag, idx) => {
  //       return { id: idx + 1, content: tag };
  //     }),
  //   };
  //   setFormData(createdPost);
  //   setIsSubmitted(true);
  // };

  const navigate = useNavigate();
  
  const onSubmit = (e) => {
    e.preventDefault();
    updatePost(postId, formData, navigate);
  };

//   return (
//     <>
//       {isSubmitted ? (
//         <div className="flex flex-col items-center w-3/5 p-8">
//           <BigPost post={formData} />
//         </div>
//       ) : (
//         <div className="flex flex-col items-center w-3/5">
//           <div className="flex w-full items-center">
//             <Link to={`/${postId}`}>
//               <button className="w-20">{`< Back`}</button>
//             </Link>
//             <h3 className="flex-1 font-bold text-4xl">Edit Post</h3>
//           </div>
//           <PostForm
//             tags={tags}
//             onSubmit={onSubmit}
//             formData={formData}
//             setFormData={setFormData}
//           />
//         </div>
//       )}
//     </>
//   );
// };

return (
  <div className="flex flex-col items-center w-3/5">
    <div className="flex w-full items-center">
      <Link to={`/${postId}`}>
        <button className="w-20">{`< Back`}</button>
      </Link>
      <h3 className="flex-1 font-bold text-4xl">Edit Post</h3>
    </div>
    <PostForm
      onSubmit={onSubmit}
      tags={tags}
      formData={formData}
      setFormData={setFormData}
    />
  </div>
);
};


export default PostEditPage;
