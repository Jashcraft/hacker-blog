const newBlogPostHandler = async (e) => {
  const blogTitle = document.querySelector('#blog-title').value.trim();
  const blogPost = document.querySelector('#blog-post').value.trim();

  const newBlogPost = await fetch('/api/dashboard/', {
    method: "POST",
    body: JSON.stringify({ title: blogTitle, body: blogPost }),
    headers: { 'Content-Type': 'application/json' }
  })

  if(newBlogPost.ok){
    document.location.replace('/dashboard');
  }
}

if(window.location.pathname === '/dashboard/new'){
  document.querySelector('#submit-blog-post').addEventListener('click', newBlogPostHandler);
}