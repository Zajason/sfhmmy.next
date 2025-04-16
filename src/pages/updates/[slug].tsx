import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { posts } from "../../data/updatesData";

// Example motion variants (you may replace these with your own)
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
  };
};

interface PostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    content: string;
  };
}

const PostPage: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
          <div className="mt-4 text-gray-400">{post.date}</div>
          <div className="flex justify-center space-x-2 mt-4">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold bg-blue-600 text-white rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="prose prose-invert mx-auto text-lg"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <p>{post.content}</p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-10 text-center"
        >
          <Link
            href="/updates"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 shadow-lg inline-block"
          >
            Επιστροφή στις Ανακοινώσεις
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PostPage;
