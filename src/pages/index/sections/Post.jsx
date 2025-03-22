import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";




import { fetchAllProducts, selectAllProducts } from "../../productlist/productlistSlice";
import shuffle from "../../../helpers/shuffle";




function Post () {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  useEffect(() => {
    setRandomPosts(shuffle(allProducts).slice(0, 3));
  }, [allProducts]);

 
  return (
    <div className="container my-7">
      <div className="row">
        {randomPosts.map( post => 
          <div className="col-md-4 d-flex flex-column align-items-center" key={post.id}>
            <img src={post.imageUrl} alt={post.title}
              style={{width: '48px', height: '48px', objectFit: 'cover'}} 
              className="w-25"
            />
            <h4 className="mt-4">{post.title}</h4>
            <p className="text-muted">{post.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;