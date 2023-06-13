const newCommentHandler = async (event) => {
    event.preventDefault()
    console.log('clicked')

    const text_comment = document.querySelector('.comment-input').value.trim()
    const post_id = event.target.getAttribute('data-id')
    console.log(post_id)

    if (text_comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ text_comment, post_id }),
            headers: {
                'Content-Type': 'application/json'
            }        
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to post comment')
        }
    }
}

document.querySelector('.new-comment').addEventListener('submit', newCommentHandler)