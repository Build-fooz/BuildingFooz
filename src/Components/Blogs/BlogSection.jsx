
import './BlogSection.css';

const blogPosts = [
  {
    id: 1,
    imageUrl: '../.././../public/1.png',
    title: 'Discover the Spice Routes: Where Spices are Grown in India',
    date: 'September 2, 2023',
    description: 'Spices have been used since ancient times, and in many different cultures and parts of the world. They have been...',
  },
  {
    id: 2,
    imageUrl: '../.././../public/3.png',
    title: '10 Different Types of Dry Fruits Names List',
    date: 'August 23, 2023',
    description: 'Dry fruits, an embodiment of nature’s bounty, have woven themselves into the tapestry of our diets and cultures across the...',
  },
  {
    id: 3,
    imageUrl: '../.././../public/3.png',
    title: '10 Different Types of Chillies in India: Know All About Them',
    date: 'August 2, 2023',
    description: 'India - The Largest Red-Chili Producer and Consumer. Did you know that Andhra Pradesh is the largest red-chili-producing state in...',
  },
];

const BlogSection = () => {
  return (
    <section className="blog-section">
      <h2 className="blog-heading">From the blog</h2>
      <div className="blog-cards-container">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <img className="blog-image" src={post.imageUrl} alt={post.title} />
            <p className="blog-date">{post.date}</p>
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-description">{post.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
