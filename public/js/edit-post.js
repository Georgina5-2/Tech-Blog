const editPostHandler = async(event) => {
    event.preventDefault()
    console.log('clicked')

    const title = document.querySelector('#post-title').value.trim()
    const content = document.querySelector('#post-content').value.trim()
    const id = event.target.getAttribute('data-id')
    console.log(id, title, content)

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Failed to edit post')
    }
}

document.querySelector('#edit-post-btn').addEventListener('click', editPostHandler)