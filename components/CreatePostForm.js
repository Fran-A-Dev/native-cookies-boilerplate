import { useMutation, gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(input: { title: $title, content: $content, status: PUBLISH }) {
      post {
        databaseId
      }
    }
  }
`;

export default function CreatePostForm() {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);
  const wasPostCreated = Boolean(data?.createPost?.post?.databaseId);

  function handleSubmit() {
    Event.preventDefault();
    const data = new FormData(Event.currentTarget);
    const values = Object.fromEntries(data);
    createPost({
      variables: values,
    }).catch((error) => {
      console.error(error);
    });
  }

  if (wasPostCreated) {
    return <p>Post successfully created.</p>;
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="create-post-title">Title</label>
        <input id="create-post-title" type="text" name="title" required />
        <label htmlFor="create-post-content">Content</label>
        <textarea id="create-post-content" name="content" required />
        {error ? <p className="error-message">{error.message}</p> : null}
        <button type="submit" disabled={loading}>
          {loading ? "Creating post..." : "Create post"}
        </button>
      </fieldset>
    </form>
  );
}
