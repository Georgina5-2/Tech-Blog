const deletePostHandler = async(event) => {
    event.preventDefault()
    console.log('clicked')

    console.log(event.target.getAttribute('data-id'))
    const id = event.target.getAttribute('data-id')

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })
    
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Failed to delete post')
    }
}

document.querySelector('#delete-post-btn').addEventListener('click', deletePostHandler)